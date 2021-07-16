function editPokemon(event) {
    //event.target.parentElement.parentElement.style.display = "none";
    let id = event.target.parentElement.parentElement.getAttribute("data-key");
    const index = getPokeIndex(id);
    let pokeName = event.target.parentElement.parentElement.getAttribute("value").toLowerCase();
    let pokeAbility = event.target.parentElement.parentElement.querySelector(".ability").textContent;
    let pokeItem = event.target.parentElement.parentElement.querySelector(".pokeItem").textContent;
    let pokeMove1 = event.target.parentElement.parentElement.querySelector(".move1").textContent;
    let pokeMove2 = event.target.parentElement.parentElement.querySelector(".move2").textContent;
    let pokeMove3 = event.target.parentElement.parentElement.querySelector(".move3").textContent;
    let pokeMove4 = event.target.parentElement.parentElement.querySelector(".move4").textContent;
    let allMoves = [pokeMove1, pokeMove2, pokeMove3, pokeMove4]
    getPokeDetails(pokeName, id, pokeAbility, pokeItem, allMoves);    
}

function getPokeIndex(id) {
    return pokemonTeam.findIndex(pokemon => pokemon.id == Number(id));
}

function spliceTeam(pokemonBuild) {
    let index = getPokeIndex(pokemonBuild.id);
    pokemonTeam.splice(index, 1, pokemonBuild)
    console.log(pokemonTeam);
    storage(pokemonTeam);
}

function deletePokemon(event) {
    let id = event.target.parentElement.parentElement.getAttribute("data-key");
    console.log(id);
    console.log(pokemonTeam);
    const index = pokemonTeam.findIndex(item => item.id !== Number(id));
    const remove = {
        deleted: true,
        ...pokemonTeam[index]
    };
    pokemonTeam = pokemonTeam.filter(item => item.id !== Number(id));
    storage(pokemonTeam);
}

/*function deleteEditPokemon(event) {
    let id = event.target.parentElement.parentElement.getAttribute("data-key");
    console.log(id);
    console.log(pokemonTeam);
    const index = getPokeIndex(id)
    pokemonTeam = pokemonTeam.filter(item => item.id !== id);
    storage(pokemonTeam);
}*/