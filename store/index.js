
export const state = () => ({
    // pokemonEquipe: [{name: 'test'},{name:'test1'},{name:'test2'},{name:'test3'}], //Mock pokemonEquipe
    pokemonEquipe: [],
    pokemonList: []
})

export const mutations = {
    add (state, pokemonName) {
        if (state.pokemonEquipe.length < 6) {
            state.pokemonEquipe.push({'name': pokemonName})
        }
        else{
            window.alert('You can only have 6 pokemons maximum within a group')
        }
    },
    remove (state, name) {
        state.pokemonEquipe.splice(
            state.pokemonEquipe.findIndex( 
                pokemon => pokemon.name === name
        ), 1)
    },
    removeAll(state) {
        state.pokemonEquipe = []
    },
    updatePokemonEquipe(state, newPokemonEquipe){
        // state.pokemonEquipe.splice(0,state.pokemonEquipe.length, ...newPokemonEquipe)
        state.pokemonEquipe = newPokemonEquipe
    }

}

export const getters = {
    getEquipe (state) {
        return state.pokemonEquipe
    }
}