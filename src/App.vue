<template>
  <div id="app">
    <v-app>
      <v-container>
        <game-of-life
          id="1"
        ></game-of-life>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import GameOfLife from './components/GameOfLife/GameOfLife.vue'

export default {
  name: 'App',

  components: {
    GameOfLife
  }
}
</script>

<style>
#app {
  text-align: center
}
</style>
