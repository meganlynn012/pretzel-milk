let pokeModal = document.getElementById("pokeModal");

//calls the function when the user hits enter
document.querySelector(".formContainer").addEventListener("submit", event => {
    event.preventDefault();
    pokeList.style.display = "none"; //hides the list
    getURL()
})

//if the user hits enter, then starts typing again, brings the list back
pokeSearch.addEventListener("keydown", event => {
    pokeList.style.display = "block";
})

//calls the function if the user clicks the pokeball
document.getElementById("searchBtn").addEventListener("click", event => {
    getURL()
})

function getURL() {
    let pokeName = pokeSearch.value.toLowerCase();

    //makes sure the user entered a pokemon from the list
    if (pokeName == "") {
        alert("You need to enter a Pokemon");
        return;
    } else if (!pokemonArray.includes(pokeName)) {
        alert("Enter a valid name");
        return;
    }

    pokeModal.style.display = "block";
    let pokeurl = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    //console.log(pokeurl);
    getPokeDetails(pokeurl);
}

function closeModal() {
    pokeModal.style.display = "none";
}

async function getPokeDetails(pokeurl) {
    try {
        await fetch(pokeurl)
            .then(response => response.json())
            .then(data => {
                //console.log(data.name);
                //console.log(data.abilities);
                //console.log(data.types);
                //console.log(data.moves);
                displayName(data.name);
                displayType(data.types);
                displaySprite(data.sprites, data.name);
                displayAbilities(data.abilities);
                getPokeItems();
                displayMoveset(data.moves);
            })
    } catch (error) {
        console.log(error);
    }
}

function displayName(name) {
    //capitalize the first letter of the name
    let pokemon = casePokemon(name);
    //console.log(pokemon);
    document.getElementById("pokemonName").innerHTML = pokemon;
}

function displayType(types) {
    document.getElementById("types").innerHTML = "";
    console.log(types)
    let typeNum = 0;
    types.forEach(type => {
        //console.log(type.type.name);
        typeNum++;
        let pokeTypes = casePokemon(type.type.name);
        const p = document.createElement("p");
        p.innerHTML = 'Type ' + typeNum + " " + pokeTypes;
        document.getElementById("types").appendChild(p);
    })
}

function displaySprite(sprite, name) {
    //console.log(sprite.front_default);
    document.getElementById("sprite").setAttribute("src", sprite.front_default);
    document.getElementById("sprite").setAttribute("alt", name + " sprite");
    //console.log(name + " sprite");
}

function displayAbilities(abilities) {
    //console.log(abilities);
    document.getElementById("ability").innerHTML = "";
    let labelLang = "Ability ";
    let idName = "abilityNames";
    let nameValue = "ability";
    let location = document.getElementById("ability")
    let data = [];
    abilities.forEach(ability => {
        //console.log(ability.ability.name);
        data.push(ability.ability.name);
    })
    //console.log(data);
    dropDown(labelLang, idName, nameValue, location, data);
}

async function getPokeItems() {
    try {
        await fetch(`https://pokeapi.co/api/v2/item?limit=954&offset=111`)
            .then(response => response.json())
            .then(data => {
                let items = data.results;
                //console.log(items);
                displayItems(items);

            })
    } catch (error) {
        console.log(error);
    }
}

function displayItems(items) {
    document.getElementById("item").innerHTML = "";
    let labelLang = "Held Item ";
    let idName = "heldItem";
    let nameValue = "heldItem";
    let location = document.getElementById("item")
    let data = ['None'];
    items.forEach(item => {
        //console.log(ability.ability.name);
        data.push(item.name);
    })
    //console.log(data);
    dropDown(labelLang, idName, nameValue, location, data);
}

function displayMoveset(moveset) {
    //console.log(moveset);
    document.getElementById("moveset").innerHTML = "";
    let i;
    for (i = 1; i < 5; i++) {
        let labelLang = "Move " + i;
        let idName = "moveName" + i;
        let nameValue = "move" + i;
        let location = document.getElementById("moveset")
        let data = ['None'];
        moveset.forEach(move => {
            //console.log(move.move.name);
            data.push(move.move.name);
        })
        //console.log(data);
        dropDown(labelLang, idName, nameValue, location, data);
    }
}

function dropDown(labelLang, idName, nameValue, location, data) {
    let label = document.createElement("label");
    label.innerHTML = labelLang
    let select = document.createElement("select")
    select.setAttribute("id", idName);
    select.setAttribute("name", nameValue);
    location.appendChild(label);
    label.appendChild(select);
    data.forEach(item => {
        let option = document.createElement("option");
        let caseData = casePokemon(item);
        option.setAttribute("value", item);
        option.innerHTML = caseData;
        select.appendChild(option);
    })
}