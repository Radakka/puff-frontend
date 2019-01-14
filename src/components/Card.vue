<template>
  <div class="card" :class="cardClass" @click="cardClick">
      <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'card',
  props: ['card', 'faceDown', 'position', 'source'],
  computed: {
    cardClass: function() {
        if(!this.card || this.faceDown) {
            return 'faceDown'
        }
        let cardClass = this.card.suit + ' n' + this.card.number;
        cardClass = this.card.playable && !this.card.unselectable ? cardClass + ' playable' : cardClass;
        cardClass = this.card.selected ? cardClass + ' selected' : cardClass;
        return cardClass;
    }
  },
  methods: {
    cardClick: function() {
      if(this.card && this.card.playable && !this.card.unselectable) {
        this.$emit('card-click', this.source, this.position, this.selected);
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .player {
      .card {
          opacity: 0.5;

          &.playable {
              opacity: 1.0;
              cursor: pointer;

              &:hover {
                  transform: scale(1.1);
              }  
          }

          &.selected {
              transform: scale(1.1);
          }
      }
  }

  .card {
      width: 80px;
      height: 123px;
      background: url(../assets/baraja.png);
      display: inline-block;    
      vertical-align: middle;
      line-height: 123px;
      font-weight: bold;
      font-size: 30px;
      margin-right: 10px;

      &.OROS {
        background-position-y: 0px;
      }
      &.COPAS {
        background-position-y: -123px;
      }
      &.ESPADAS {
        background-position-y: -246px;
      }
      &.BASTOS {
        background-position-y: -369px;
      }
      
      &.n1 {
        background-position-x: 0px;
      }
      &.n2 {
        background-position-x: -80px;
      }
      &.n3 {
        background-position-x: -160px;
      }
      &.n4 {
        background-position-x: -240px;
      }
      &.n5 {
        background-position-x: -320px;
      }
      &.n6 {
        background-position-x: -400px;
      }
      &.n7 {
        background-position-x: -480px;
      }
      &.n8 {
        background-position-x: -720px;
      }
      &.n9 {
        background-position-x: -800px;
      }
      &.n10 {
        background-position-x: -880px;
      }
      &.faceDown {
        background-position-y: 0px;
        background-position-x: -960px;
      }
  }
</style>