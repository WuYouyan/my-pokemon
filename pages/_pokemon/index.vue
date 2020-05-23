<template>
    <div class="Main">
        <img :src="pokemon.sprites.front_default" alt="sprite" width="96px" height="96px"><br>
        <label>Name:</label>
        <div>{{pokemon.name}}</div>
        <label>Abilities:</label>
        <div v-for="(ability, idx) in pokemon.abilities" :key="idx">{{ability.ability.name}}</div>
        <label>Base experience:</label>
        <div>{{pokemon.base_experience}}</div>
        <label>height:</label>
        <div>{{pokemon.height}}</div>
        <label>weight:</label>
        <div>{{pokemon.weight}}</div>
        <nuxt-link :to="'/'">back</nuxt-link>
    </div>
</template>
<script>
import axios from 'axios'
import { getPokemon$ } from '../index';

export default {
    data() {
        return {
            pokemon: {}
        }
    },
    async asyncData (context) {
        let name = context.params.pokemon
        // let res = await axios.get(PATH_BASE+POKEMON+'/'+context.params.pokemon)
        let res = await getPokemon$(name)
        return { pokemon: res }
    }
}
</script>
<style scoped>
    .Main {
        padding-left: 20px;
    }
</style>