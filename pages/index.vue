<template>
  <div>
    <div>
      <!-- <logo /> -->
      <h1 class="title">
        Pokemon List
      </h1>   
    </div>

    <input 
        class="search" 
        type="text" 
        placeholder="search name" 
        v-model="searchTerm" 
        @keyup.enter="filterPokemonList">
    <button @click="clearSearchTerm">clear</button>
    <div class="container">
        <div class="card" v-for="(pokemon, index) in pokemonList" :key="index" >{{pokemon.name}}
          <div v-if="pokemon&&pokemon.sprites">
             <img :src="pokemon.sprites.front_default" alt="sprite" width="96px" height="96px">
          </div>
          <div v-if="!pokemon.sprites">
             <img src="~/assets/images/loading.png" alt="loading" width="96px" height="60px">
          </div>
          <nuxt-link :to="'/'+pokemon.name">
            <b-button class="card-btn" size="sm" variant="outline-dark">detail</b-button>
          </nuxt-link>
            <b-button class="card-btn" size="sm" variant="outline-dark" @click="addToEquipe(pokemon)">add</b-button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const PATH_BASE = 'https://pokeapi.co/api/v2/'
const POKEMON = 'pokemon'
const LIMIT = 'limit='
const OFFSET = 'offset='

export const ls = localStorage
export const POKEMONLIST = POKEMON + '.pokemonList'
export const POKEMONEQUIPE = POKEMON + '.pokemonEquipe'

export const persist = (key, value) => {
  if (!value && value === undefined) {
    return ;
  }
  const arr = JSON.stringify(value);
  ls.setItem(key,arr);
}
export const getList =(key) => {
  const before = ls.getItem(key);
  return before ? JSON.parse(before) : [];
}

const getPokemonData$ = url => {
  return axios.get(url)
}
export const getPokemon$ = (name) =>
  axios.get(`${PATH_BASE+POKEMON}/${name}`).then(res => res.data)

/**
 *  @listNumber range: 1-807
 *  if exceed 807 will get 'null', cause method realised by get id 
 */
export const getPokemons$ = (listNumber) => { 

    const pkList = [];
    for (let index = 1; index <= listNumber; index++) {
      axios.get(`${PATH_BASE+POKEMON}/${index}`).then(
        res => {
          const obj = {};
          obj.name = res.data.name;
          obj.sprites = {};
          obj.sprites.front_default = res.data.sprites.front_default;
          pkList.push(obj)

          if (index ==listNumber) { // when done persist
            try {
              persist(POKEMONLIST,pkList)
            } catch (error) {
              console.error('localstorage: ',error)
            }
          }
        } 
      )
      
    }
    return pkList;
}

export default {
  data() {
    return {
      pokemonList: [],
      searchTerm: "",
    }
  },
  methods: {
    filterPokemonList: function() {
      this.pokemonList = getList(POKEMONLIST)
      this.pokemonList = this.pokemonList.filter(pk =>
        pk.name.includes(this.searchTerm)
      );
    },
    clearSearchTerm() {
      this.searchTerm = ""
      this.filterPokemonList()
    },
    addToEquipe(pokemon){
      this.$store.commit('add',pokemon.name)
      persist(POKEMONEQUIPE,this.$store.state.pokemonEquipe)
    }
  },
  async asyncData (context) {
    if (getList(POKEMONLIST).length !==0) { // if pokemonList stored in localstorage, get from localstorage
      return { pokemonList: getList(POKEMONLIST) }
    }
    const result = await getPokemons$(100)
    return { pokemonList: result }
  },
  
}
</script>

<style scoped>
@media only screen and (min-width: 482px){
    .search {
      margin-left: 15px;
      width: 200px;
    }
}
.card { 
  margin: 2px;
}
.container {
  /* padding: 2px; */
  margin: 10px 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
}
.card-btn {
  max-width: 53px;
  margin-bottom: 2px;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  text-align: center;
  font-weight: 300;
  font-size: 2rem;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
