<template>
  <div class="player">
      <div class="turn" v-if="turn">Your turn</div>
      <div class="username">{{username}} <div class="button" :class="{ active: cardSelected}"><a @click="playCards">PLAY</a></div></div>
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
  data: function() {
      return  {
          source: "HAND",
          faceDown: []
      }
  },
  computed: {
      tableCards: function () {
          let tableCards = this.faceUp.slice();
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

        return handSelected || faceUpSelected;
      }
  },
  created: function() {
    const faceDownPlayable = this.faceUp.length === 0;
    for(var i = 0;i < this.faceDownSize;i++) {
        this.faceDown.push({suit: "faceDown", number: 0, source: "FACE_DOWN", playable: faceDownPlayable});
    }

    for(var j = 0;j < this.faceUp.length;j++) {
        this.faceUp[j].source = "FACE_UP";
    }
  },
  methods: {
    cardClick(source, position) {
        this.source = source;
        let cardSource = this.hand;

        if(source === 'FACE_UP') {
            cardSource = this.faceUp;
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
        }
    },
    playCards() {
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
  },
  props: ['username', 'hand', 'faceUp', 'faceDownSize', 'turn']
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