function editPokemon(event) {
    //get all the values to pass on to the getPokeDetails function to open the modal
    //this will save all the values the user previously picked.
    let id = event.target.parentElement.parentElement.getAttribute("data-key");
    //console.log(id);
    const index = getPokeIndex(id);
    let pokeName = event.target.parentElement.parentElement.getAttribute("value").toLowerCase();
    let pokeAbility = event.target.parentElement.parentElement.querySelector(".ability").textContent.toLowerCase();
    let pokeItem = event.target.parentElement.parentElement.querySelector(".pokeItem").textContent.toLowerCase();
    let pokeMove1 = event.target.parentElement.parentElement.querySelector(".move1").textContent.toLowerCase();
    let pokeMove2 = event.target.parentElement.parentElement.querySelector(".move2").textContent.toLowerCase();
    let pokeMove3 = event.target.parentElement.parentElement.querySelector(".move3").textContent.toLowerCase();
    let pokeMove4 = event.target.parentElement.parentElement.querySelector(".move4").textContent.toLowerCase();
    let allMoves = [pokeMove1, pokeMove2, pokeMove3, pokeMove4]
    getPokeDetails(pokeName, id, pokeAbility, pokeItem, allMoves);
}

function getPokeIndex(id) {
    return pokemonTeam.findIndex(pokemon => pokemon.id == Number(id));
}

function deletePokemon(event) {
    let id = event.target.parentElement.parentElement.getAttribute("data-key");
    //console.log(id);
    //console.log(pokemonTeam);
    //console.log(Number(id));
    //you have to put the item.id in the Number() or edited pokemon can't be deleted.
    const index = pokemonTeam.findIndex(item => Number(item.id) !== Number(id));
    const remove = {
        deleted: true,
        ...pokemonTeam[index]
    };
    pokemonTeam = pokemonTeam.filter(item => Number(item.id) !== Number(id));
    storage(pokemonTeam);
}