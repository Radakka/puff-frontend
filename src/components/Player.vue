<template>
  <div class="player" :class="{turn: turn}">
      <div class="turn" v-if="turn">Your turn</div>
      <div class="username">
          {{username}} 
          <div class="button" :class="{ active: cardSelected}">
              <a v-if="tableDraw" @click="playCards">DRAW</a>
              <a v-else @click="playCards">PLAY</a>
          </div>
        </div>
      <div class="hand">
          <Card v-for="(card, index) in hand" :card="card" source="HAND" :position="index" @card-click="cardClick"></Card>
      </div>
      <div class="table">
          <Card v-for="(card, index) in tableCards" :card="card" :source="card.source" :position="index" @card-click="cardClick"></Card>
      </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'player',
  components: {
      Card
  },
  props: ['username', 'hand', 'faceUp', 'faceDownSize', 'turn'],
  data: function() {
      return  {
          source: "HAND",
          faceDown: []
      }
  },
  computed: {
      tableDraw: function () {
          if (this.hand && this.hand.length > 0) {
              return false;
          }

          if(this.faceUp.length === 0 && this.hand.length === 0) {
              return false;
          }

          return this.faceUp.filter(card => {
              return card.playable;
          }).length == 0;
      },
      tableCards: function () {
          const tableDraw = this.tableDraw;
          let tableCards = JSON.parse(JSON.stringify(this.faceUp));
            for(var i = 0; i < tableCards.length;i++) {
                if(tableDraw) {
                    tableCards[i].playable = true;
                }
                tableCards[i].source = "FACE_UP";
            }
          for(var j = tableCards.length;j < this.faceDown.length;j++) {
            tableCards.push(this.faceDown[j]);
          }
          return tableCards;
      },
      cardSelected: function () {
        const handSelected = this.hand.filter(card => {
            return !!card.selected;
        }).length > 0;

        const faceUpSelected = this.faceUp.filter(card => {
            return !!card.selected;
        }).length > 0;

        const faceDownSelected = this.faceDown.filter(card => {
            return !!card.selected;
        }).length > 0;

        return handSelected || faceUpSelected || faceDownSelected;
      }
  },
  watch: {
      faceDownSize: function () {
          this.faceDown = [];
          const faceDownPlayable = this.faceUp.length === 0 && this.hand.length === 0;
          for(var i = 0;i < this.faceDownSize;i++) {
            this.faceDown.push({suit: "faceDown", number: 0, source: "FACE_DOWN", playable: faceDownPlayable});
          }
      },
      hand: function () {
          this.faceDown = [];
          const faceDownPlayable = this.faceUp.length === 0 && this.hand.length === 0;
          for(var i = 0;i < this.faceDownSize;i++) {
            this.faceDown.push({suit: "faceDown", number: 0, source: "FACE_DOWN", playable: faceDownPlayable});
          }
      },
      faceUp: function () {
          this.faceDown = [];
          const faceDownPlayable = this.faceUp.length === 0 && this.hand.length === 0;
          for(var i = 0;i < this.faceDownSize;i++) {
            this.faceDown.push({suit: "faceDown", number: 0, source: "FACE_DOWN", playable: faceDownPlayable});
          }
      }
  },
  created: function () {
    const faceDownPlayable = this.faceUp.length === 0 && this.hand.length === 0;
    for(var i = 0;i < this.faceDownSize;i++) {
        this.faceDown.push({suit: "faceDown", number: 0, source: "FACE_DOWN", playable: faceDownPlayable});
    }
  },
  methods: {
    cardClick(source, position) {
        if(!this.turn) {
            return;
        }
        this.source = source;
        let cardSource = this.hand;

        if(source === 'FACE_UP') {
            cardSource = this.faceUp;
        }

        if(source === 'FACE_DOWN') {
            cardSource = this.faceDown;
        }

        if(source === 'HAND' || source === 'FACE_UP') {
          let card = cardSource[position];
          let selected = !card.selected;
          this.$set(card, 'selected', selected);
          let anySelected = cardSource.filter(card => {
            return !!card.selected;
          }).length > 0;
          for(var i = 0; i < cardSource.length;i++) {
            if(selected && cardSource[i].number != card.number) {
              this.$set(cardSource[i], 'unselectable', true);
            } else if(!selected && !anySelected) {
              this.$set(cardSource[i], 'unselectable', false);
            }
          }
        } else {
          let card = cardSource[position];
          let selected = !card.selected;
          this.$set(card, 'selected', selected);
          for(var i = 0; i < cardSource.length;i++) {
            if(selected && i !== position) {
              this.$set(cardSource[i], 'unselectable', true);
            } else {
              this.$set(cardSource[i], 'unselectable', false);
            }
          }
        }
    },
    playCards() {
        if(this.cardSelected) {
            let cardSource = this.hand;

            if(this.source === 'FACE_UP') {
                cardSource = this.faceUp;
            } else if (this.source === 'FACE_DOWN') {
                cardSource = this.faceDown;
            }

            let cardsPositions = [];

            for(var i = 0; i < cardSource.length;i++) {
                if(cardSource[i].selected) {
                    cardsPositions.push(i);
                };
            }

            this.$emit("play-cards", this.source, cardsPositions);
        }
    }
  }
}
</script>

<style scoped lang="scss">
  .player {
    border: 1px solid #333;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 30px;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #b3b300;

    .turn {
      display: inline-block;
      margin-right:5px;
    }

    .username {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 10px;
      display: inline-block;
    }

    .button {
        display: inline-block;
        margin: 10px;
        
      a {
        background-color: #004d00;
        border-radius: 5px;
        padding: 10px 20px;
        width: 90%;
        color: #EEEEEE;
        opacity: 0.5;
      }

      &.active {
        a {
          cursor: pointer;
          opacity: 1;
        }
      }
    }
  
    .hand {
      margin-bottom: 10px;
    }
  }
</style>