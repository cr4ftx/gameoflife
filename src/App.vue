<template>
  <div id="app">
    <div>
      <canvas
        id="game-of-life"
        :width="canvasSize"
        :height="canvasSize"
        style="border: 1px solid black"
      ></canvas>
    </div>
    <input type="text" v-model="gameSize" maxlength="3">
    <input type="range" min="1" max="500" v-model="speed" class="slider" id="myRange">
    <button @click="generation" :disabled="disabled.launch">Launch</button>
    <button @click="reset" :disabled="disabled.reset">Reset</button>
  </div>
</template>

<script>
import GameOfLife from './js/GameOfLife'

export default {
  name: 'App',

  data () {
    return {
      canvasSize: 500,
      gameSize: 150,
      gameOfLife: new GameOfLife(150),
      timeout: null,
      count: 0,
      speed: 500,
      disabled: {
        launch: false,
        reset: true
      }
    }
  },

  mounted () {
    this.randomCells()
    this.drawGameOfLife()
  },

  methods: {
    drawGameOfLife () {
      let canvas = document.getElementById('game-of-life')
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, this.canvasSize, this.canvasSize)

      let squareSize = this.canvasSize / this.gameOfLife.board.length

      for (let i = 0; i < this.gameOfLife.board.length; i++) {
        for (let j = 0; j < this.gameOfLife.board[i].length; j++) {
          ctx.fillStyle = this.gameOfLife.board[i][j]
            ? '#000000'
            : '#FFFFFF'
          ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize)
        }
      }
      ctx.fillStyle = '#FF0000'
      ctx.font = '30px Arial'
      ctx.fillText(this.count, 5, 35)
    },

    generation () {
      this.disabled.launch = true
      this.disabled.reset = false
      this.count += 1
      clearTimeout(this.timeout)
      this.gameOfLife.generation()
      this.drawGameOfLife()
      this.timeout = setTimeout(this.generation, this.speed)
    },

    reset () {
      this.disabled.launch = false
      this.disabled.reset = true
      this.count = 0
      clearTimeout(this.timeout)
      this.gameOfLife = new GameOfLife(this.gameSize)
      this.randomCells()
      this.drawGameOfLife()
    },

    randomCells () {
      for (let i = 0; i < this.gameOfLife.board.length; i++) {
        for (let j = 0; j < this.gameOfLife.board.length; j++) {
          this.gameOfLife.setCell(i, j, Math.random() < 0.35)
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
