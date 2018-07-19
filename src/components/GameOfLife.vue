<template>
  <div>
    <canvas
      :ref="ref"
      :width="canvasSize"
      :height="canvasSize"
      style="outline: 1px solid black"
    ></canvas>

    <v-layout
      row
      wrap
    >
      <v-flex xs6>
        <v-slider
          v-model="speed"
          label="Speed"
          min="1"
          max="500"
        ></v-slider>
      </v-flex>
    </v-layout>

    <v-bottom-nav
      :value="true"
      absolute
      color="gray"
      app
    >
      <v-btn color="teal">
        <v-icon>skip_previous</v-icon>
      </v-btn>
      <v-btn color="teal" @click="play" v-if="!running">
        <v-icon>play_arrow</v-icon>
      </v-btn>
      <v-btn color="teal" @click="pause" v-else>
        <v-icon>pause</v-icon>
      </v-btn>
      <v-btn color="teal" @click="generation">
        <v-icon>skip_next</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
import GameOfLife from '../js/GameOfLife'
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
      default: 150
    }
  },

  data () {
    return {
      gameOfLife: new GameOfLife(this.gameSize),
      timeout: null,
      count: 0,
      speed: 500,
      running: false
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
