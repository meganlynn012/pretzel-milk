//create variables for commonly used ids
const pokeList = document.getElementById("pokelistContainer");
const pokeSearch = document.getElementById("pokesearch");

//don't load the list until the input box is selected
document.getElementById("pokesearch").addEventListener("click", event => {
    let pokeurl =`https://pokeapi.co/api/v2/pokemon?limit=1200`
    getPokeNames(pokeurl);
});

//get json data
function getPokeNames(pokeurl){
    fetch(pokeurl)
.then(response => response.json())
.then(data => {
    let pokemon = data.results;
    showPokeNames(pokemon);
});
}
//make a list item for each name and append it to the ul container
function showPokeNames(pokemon){
    pokeList.innerHTML = "";
    pokemon.forEach(item => {
        //fix the casing
    let name = casePokemon(item.name);
    const li = document.createElement("li");
    li.setAttribute("onclick", "getLiValue()")
    li.innerHTML = name;
    pokeList.appendChild(li);
    
    })
};

//capitalizes the first letter of each name
function casePokemon(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

document.addEventListener("click", event => {
    hidePokeNames();
})

//hide the huge pokemon list when the user chooses a name or clicks/touches outside of the input box
function hidePokeNames() {    
    if (pokeSearch === document.activeElement) {
        pokeList.style.display = "block";
    }
    else {
        pokeList.style.display = "none";
    }
}
