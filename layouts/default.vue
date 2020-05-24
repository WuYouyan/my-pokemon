<template>
  <div>
    <div class="sidebar">
      <p>My Pokemon Team: 
        <b-button 
          size="sm" 
          variant="outline-dark"
          @click="share()">share</b-button>
      </p>
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
import { POKEMONEQUIPE, persist, getList } from '@/pages/index.vue';

export const copyToClipboard = (string) => {
  if (!navigator.clipboard) {
    alert('Clipboard is not allowed/authorized in your broswer');
  } else {
    navigator.clipboard.writeText(string).then(function() {
      console.log('Copying url to clipboard was successful!');
    }, function(err) {
      console.error('Could not copy url: ', err);
    });
  }
} 

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
  mounted() {
    // console.log(this.$route.fullPath);

    // TODO: can be extracted to a function
    // Check, if query.team exists, get team data 
    if (this.$route.query.team) {  

      // console.log('path: ', this.$route.query.team);
      const teamName = this.$route.query.team.split(',');
      const team = teamName.map(name => ({'name':name }) );
      if (window.confirm("Do you really want to use this pokemon team?")) {
        if( team.length<=6 ){
          this.$store.commit('updatePokemonEquipe', team);
          persist(POKEMONEQUIPE,this.$store.state.pokemonEquipe);
        } else {
          alert('this pokemon team is not valid! please try another pokemon team');
        }
      }
      
      // TODO: add a validation function 
      // here we can add a validate function to check pokemon team
    }
  },
  computed: {
    pokemonEquipe: {
      get() {
        if (getList(POKEMONEQUIPE)) {
          this.$store.commit('updatePokemonEquipe', getList(POKEMONEQUIPE))
          return this.$store.state.pokemonEquipe
        }
        return this.$store.state.pokemonEquipe
      },
      set(value) {
        this.$store.commit('updatePokemonEquipe', value)
        persist(POKEMONEQUIPE,this.$store.state.pokemonEquipe)
      }
    }
  },
  methods: {
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex)
    },
    remove: function(name) {
        this.$store.commit('remove', name)
        console.log('remove', name)
        persist(POKEMONEQUIPE,this.$store.state.pokemonEquipe)
    },
    share: function() {
      console.log('this.$store.state.pokemonEquipe',this.$store.state.pokemonEquipe)
      let query = '?team=';
      let names = this.$store.state.pokemonEquipe.map(pokemon => pokemon.name);
      query += names.join();
      copyToClipboard(query);
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
