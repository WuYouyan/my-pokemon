<template>
  <div class="Main">
    <div>
      <!-- <logo /> -->
      <h1 class="title">
        Pokemon List
      </h1>   
    </div>
    <div class="container">
      <ul>
        <li v-for="pokemon in pokemonList" :key="pokemon.name">{{pokemon.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

const PATH_BASE = 'https://pokeapi.co/api/v2/';
const LIMIT = 'limit=';

const getPokemonData$ = (url:string): Promise<any> => {
  return axios.get(url);
}

const getPokemons$ = (listNumber: number): Promise<any[]> => 
  axios.get(`${PATH_BASE}pokemon?${LIMIT}${listNumber}`).then(
    res => {
      let pkList = res.data.results; 
      // for (let index = 0; index < pkList.length; index++) {
      //   getPokemonData$(pkList[index].url).then(res =>
      //     pkList[index].sprites = res.data.sprites
      //   );
      // }
      pkList.map((pk:any) =>
        getPokemonData$(pk.url).then(res =>
          pk.sprites = res.data.sprites
        )
      )
      return pkList;
    } 
  )


export default {

  // asyncData () {
  //   return getPokemons$(2).then(
  //     (res) => {
  //       console.log('res: ', res);
  //       return { pokemonList: res }
  //     }
  //   );
  // }
  async asyncData () {
    const result = await getPokemons$(50);
    return { pokemonList: result }
  }
}
</script>

<style>
.main {
  margin: 0 ;
  padding: 10em ;
  background: #f59944;
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
