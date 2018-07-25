<template>
  <div style="width: 500px; margin: auto;">
    <canvas
      :ref="ref"
      :width="canvasSize"
      :height="canvasSize"
      style="outline: 1px solid black"
    ></canvas>

    <v-toolbar>
      <v-btn @click="pause" icon v-if="running">
        <v-icon>pause</v-icon>
      </v-btn>
      <v-btn @click="play" icon v-else>
        <v-icon>play_arrow</v-icon>
      </v-btn>
      <v-btn @click="generation" icon>
        <v-icon>skip_next</v-icon>
      </v-btn>
      <v-btn @click="randomCells" icon>
        <v-icon>replay</v-icon>
      </v-btn>
      <v-slider
        v-model="speed"
        min="1"
        max="500"
        hint="Speed"
        persistent-hint
      ></v-slider>
    </v-toolbar>
  </div>
</template>

<script>
import GameOfLife from './GameOfLife.js'

export default {
  name: 'GameOfLife',

  props: {
    id: {
      type: String,
      required: true
    },
    'canvas-size': {
      type: Number,
      required: false,
      default: 500
    },
    'game-size': {
      type: Number,
      required: false,
      default: 250
    }
  },

  data () {
    return {
      gameOfLife: new GameOfLife(this.gameSize),
      timeout: null,
      count: 0,
      speed: 500,
      running: false,
      activeBtn: 0
    }
  },

  computed: {
    ref () {
      return `canvas-${this.id}`
    }
  },

  mounted () {
    this.randomCells()
  },

  methods: {
    drawGameOfLife () {
      const canvas = this.$refs[this.ref]
      const ctx = canvas.getContext('2d')
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
      this.running = false
    },

    play () {
      this.generation()
      this.running = true
      this.timeout = setTimeout(this.play, 500 - this.speed)
    },

    pause () {
      this.running = false
      clearTimeout(this.timeout)
    },

    randomCells () {
      this.pause()
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
