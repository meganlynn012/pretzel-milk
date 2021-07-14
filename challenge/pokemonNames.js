//create variables for commonly used ids
const pokeList = document.getElementById("pokelistContainer");
const pokeSearch = document.getElementById("pokesearch");

//don't load the list until the input box is selected
pokeSearch.addEventListener("click", event => {
    let pokeurl = `https://pokeapi.co/api/v2/pokemon?limit=1118`
    getPokeNames(pokeurl);
});

//get json data
async function getPokeNames(pokeurl) {
    try {
        await fetch(pokeurl)
            .then(response => response.json())
            .then(data => {
                let pokemon = data.results;
                pokeArray(pokemon);
                showPokeNames();

            });
    } catch (error) {
        console.log(error);
    }
}

let pokemonArray = [];

function pokeArray(pokemon) {
    pokemon.forEach(name => {
        pokemonArray.push(name.name)
    })
    //console.log(pokemonArray);
}
//make a list item for each name and append it to the ul container
function showPokeNames() {

    pokeList.innerHTML = "";
    pokemonArray.forEach(item => {
        let name = casePokemon(item); //fix the casing
        const li = document.createElement("li");
        li.setAttribute("value", name);
        li.innerHTML = name;
        pokeList.appendChild(li);
        //console.log(numId);
    })
};

//capitalizes the first letter of each name
function casePokemon(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

document.addEventListener("click", event => {
    hidePokeNames();
})

//hide the huge pokemon list when the user chooses a name or clicks/touches outside of the input box
function hidePokeNames() {
    if (pokeSearch === document.activeElement) {
        pokeList.style.display = "block";
    } else {
        pokeList.style.display = "none";
    }
}