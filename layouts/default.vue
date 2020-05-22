<template>
  <div>
    <div class="sidebar">
      <p>My Pokemon Team:</p>
      <div class="equipe">
        <!-- <ul>
          <li v-for="(pokemon, index) in pokemonEquipe" :key="index">
            <span>{{ pokemon.name }}</span>
          </li>
        </ul> -->
        <div v-if="pokemonEquipe.length===0">Empty!</div>
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
              <div>{{ pokemon.name }}</div>
              <b-button 
                size="sm" 
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
    </div>
    <div class="main">
      <nuxt/>
    </div>
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
 .sidebar {
   padding-left: 5px;
 }
@media only screen and (min-width: 482px){
  .sidebar {
    padding-top: 8vh;
    height: 100%;
    width: 210px;
    position: fixed;
    top: 0;
    left: 0;
  }
  .main {
    height: 100%;
    margin-left: 210px
  }
}
@media only screen and (max-width: 425px){
  .main {
    margin-left: 5px;
  }
}

.equipe {
  display: flex;
  flex-direction: column;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

</style>
