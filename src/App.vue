<template>
  <div id="app">
    <div>
      <canvas
        id="game-of-life"
        :width="canvasSize"
        :height="canvasSize"
        style="outline: 1px solid black"
        @click="clickCanvas"
      ></canvas>
    </div>
    <input type="text" v-model="gameSize" maxlength="3">
    <input type="range" min="1" max="500" v-model="speed" class="slider" id="myRange">
    <button @click="generation">Launch</button>
    <button @click="pause">Pause</button>
    <button @click="clear">Clear</button>
    <button @click="randomCells">Random cells</button>
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
      speed: 500
    }
  },

  mounted () {
    this.drawGameOfLife()
  },

  methods: {
    clickCanvas (event) {
      let row = Math.trunc(event.layerY / (this.canvasSize / this.gameOfLife.board.length))
      let col = Math.trunc(event.layerX / (this.canvasSize / this.gameOfLife.board.length))
      this.gameOfLife.setCell(row, col, !this.gameOfLife.board[row][col])
      this.drawGameOfLife()
    },

    drawGameOfLife () {
      let canvas = document.getElementById('game-of-life')
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, this.canvasSize, this.canvasSize)

      let squareSize = this.canvasSize / this.gameOfLife.board.length

      ctx.fillStyle = '#000000'
      for (let i = 0; i < this.gameOfLife.board.length; i++) {
        for (let j = 0; j < this.gameOfLife.board[i].length; j++) {
          if (this.gameOfLife.board[i][j]) {
            ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize)
          }
        }
      }
      ctx.fillStyle = '#FF0000'
      ctx.font = '30px Arial'
      ctx.fillText(this.count, 5, 35)
    },

    generation () {
      this.count += 1
      clearTimeout(this.timeout)
      this.gameOfLife.generation()
      this.drawGameOfLife()
      this.timeout = setTimeout(this.generation, 500 - this.speed)
    },

    pause () {
      clearTimeout(this.timeout)
    },

    clear () {
      clearTimeout(this.timeout)
      this.count = 0
      this.gameOfLife = new GameOfLife(this.gameSize)
      this.drawGameOfLife()
    },

    randomCells () {
      clearTimeout(this.timeout)
      this.count = 0
      this.gameOfLife = new GameOfLife(this.gameSize)
      for (let i = 0; i < this.gameOfLife.board.length; i++) {
        for (let j = 0; j < this.gameOfLife.board.length; j++) {
          this.gameOfLife.setCell(i, j, Math.random() < 0.35)
        }
      }
      this.drawGameOfLife()
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
