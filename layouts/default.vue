<template>
  <div class='head'>
    <p>My Pokemon Equipe:</p>
    <div class="equipe">
      <!-- <ul>
        <li v-for="(pokemon, index) in pokemonEquipe" :key="index">
          <span>{{ pokemon.name }}</span>
        </li>
      </ul> -->
      <draggable
        v-model="pokemonEquipe"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
          <b-list-group-item class="d-flex justify-content-between align-items-center"
          v-for="(pokemon,index) in pokemonEquipe"
          :key="index">
            {{ pokemon.name }}
            <b-button 
              size="sm" 
              class="remove" 
              variant="outline-dark"
              @click="remove(pokemon.name)">remove</b-button>
          </b-list-group-item>
        <!-- <div class="list-group-item"
          v-for="(pokemon,index) in pokemonEquipe"
          :key="index"
        >
          <span>{{ pokemon.name }}</span>
          <b-button class="remove" variant="outline-dark">Light</b-button>
        </div> -->
      </draggable>
    </div>
    <nuxt />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data() {
    return {
       enabled: true,
       dragging: false,
    }
  },
  computed: {
    pokemonEquipe: {
      get() {
        return this.$store.state.pokemonEquipe
      },
      set(value) {
        this.$store.commit('updatePokemonEquipe', value)
        // console.log('set: ',value) 
      }
    }
  },
  methods: {
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex)
    },
    remove: function(name) {
        this.$store.commit('remove', name)
    }
  }
}
</script>
<style scoped>
.head {
  margin-left: 1vw;
}

.equipe {
  display: flex;
  flex-direction: row;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.remove {
  margin-left: 2vw;
}
</style>
