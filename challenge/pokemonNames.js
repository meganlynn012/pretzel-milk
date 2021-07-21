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
                showPokeNames(pokemon);

            });
    } catch (error) {
        console.log(error);
    }
}

//creates an array of all the names. This is used to compare that the user actually typed in a pokemon from the array
let pokemonArray = [];

function pokeArray(pokemon) {
    pokemon.forEach(name => {
        pokemonArray.push(name.name)
    })
}

//make a list item for each name and append it to the ul container
function showPokeNames(pokemon) {

    pokeList.innerHTML = "";
    pokemon.forEach (item => {
        let name = casePokemon(item.name); //fix the casing
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
        pokeList.classList.add("openListContainer");
    } else {
        pokeList.classList.remove("openListContainer");
    }
}