<template>
  <div class="Main">
    <div>
      <!-- <logo /> -->
      <h1 class="title">
        Pokemon List
      </h1>   
    </div>

    <input type="text" placeholder="search name" v-model="searchTerm" @keyup.enter="filterPokemonList">
    <button @click="clearSearchTerm">clear</button>
    <div class="container">
      <ul>
        <li v-for="(pokemon, index) in pokemonList" :key="index" >{{pokemon.name}}
          <!-- TODO: fixed the image loading  -->
          <div v-if="pokemon&&pokemon.sprites">
             <img :src="pokemon.sprites.front_default" alt="sprite" width="96px" height="96px">
          </div>
          <div v-if="!pokemon.sprites">
             <img src="~/assets/images/loading.png" alt="loading" width="96px" height="60px">
          </div>
          <nuxt-link :to="'/'+pokemon.name">detail</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const PATH_BASE = 'https://pokeapi.co/api/v2/'
const POKEMON = 'pokemon'
const LIMIT = 'limit='
const OFFSET = 'offset='


const getPokemonData$ = url => {
  return axios.get(url)
}
export const getPokemon$ = (name) =>
  axios.get(`${PATH_BASE+POKEMON}/${name}`).then(res => res.data)

export const getPokemons$ = (listNumber) => 
  axios.get(`${PATH_BASE+POKEMON}?${LIMIT+listNumber}`).then(
    res => {
      let pkList = res.data.results
      pkList.map((pk) =>
        getPokemonData$(pk.url).then(res =>
          pk.sprites = res.data.sprites
        )
      )
      return pkList
    } 
  )

export default {
  data() {
    return {
      entirePokemonsCache: [],
      pokemonList: [],
      searchTerm: "",
    }
  },
  methods: {
    filterPokemonList: function() {
      if(this.entirePokemonsCache.length===0){
        this.entirePokemonsCache = this.pokemonList
      }
      console.log('enter up!')
      this.pokemonList = [...this.entirePokemonsCache]
      this.pokemonList = this.pokemonList.filter(pk =>
        pk.name.includes(this.searchTerm)
      );
    },
    clearSearchTerm() {
      this.searchTerm = ""
      this.filterPokemonList()
    }

  },
  async asyncData (context) {
    const result = await getPokemons$(50)
    console.log('result: ', result)
    // this.entirePokemonsCache = result;
    return { pokemonList: result }
  },
  mounted () {

  }
}
</script>

<style scoped>

.main {
  margin: 0 ;
  padding: 10em ;
}

.container {
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  text-align: center;
  font-weight: 300;
  font-size: 8vh;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
