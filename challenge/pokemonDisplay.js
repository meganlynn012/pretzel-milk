//this is the main array that will be saved to localStorage and displayed on the screen.
let pokemonTeam = [];

function savePokemon() {
    //makes the custom window go away
    pokeModal.style.display = "none";
    //get image address
    let pokeSprite = document.getElementById("sprite").getAttribute("src");
    //get pokemon name
    let pokeName = document.getElementById("pokemonName").textContent;
    //assign a value
    let pokeIdTest = document.getElementById("pokemonName").getAttribute("data-key")
    //console.log(pokeIdTest);

    //Don't assign a new id if one already exists from being edited
    let pokeId;
    if (pokeIdTest == 'undefined'){
        pokeId = Date.now();
    }
    else {
        pokeId = pokeIdTest;
    }
    //console.log(pokeId);

    //get pokemon types
    let pokeType1 = document.getElementById("type1").textContent;
    //console.log(pokeType1);
    //not all pokemon have a type 2. This declares a "" value if a type 2 doesn't exist.
    let pokeType2 = "";
    let getType2 = document.getElementById('type2');
        if (getType2 !== null) {
            pokeType2 = getType2.textContent;
        }
    //console.log(pokeType2);

    //get pokemon abiltiy
    let pokeAbility = document.getElementById("abilityNames").value;
    //get held item
    let pokeItem = document.getElementById("heldItem").value;
    //get the chosen moves
    let pokeMoves = [];
    let pokeMove1 = document.getElementById("moveName1").value;
    pokeMoves.push(pokeMove1);
    let pokeMove2 = document.getElementById("moveName2").value;
    pokeMoves.push(pokeMove2);
    let pokeMove3 = document.getElementById("moveName3").value;
    pokeMoves.push(pokeMove3);
    let pokeMove4 = document.getElementById("moveName4").value;
    pokeMoves.push(pokeMove4);
    //console.log(pokeMoves);

    //assign all the values to an object
    let pokemonBuild = {
        sprite: pokeSprite,
        name: pokeName,
        id: pokeId,
        type1: pokeType1,
        type2: pokeType2,
        ability: pokeAbility,
        heldItem: pokeItem,
        moveset: pokeMoves
    }

    //replace the pokemon if edited or push to array if adding the first time
    //console.log(pokeIdTest);
if (pokeIdTest !== 'undefined') {
    spliceTeam(pokemonBuild);
}
else{
    pokemonTeam.push(pokemonBuild);
    storage(pokemonTeam);
}
}

function spliceTeam(pokemonBuild) {
    let index = getPokeIndex(pokemonBuild.id);
    //console.log(pokemonBuild.id);
    //console.log(index);
    pokemonTeam.splice(index, 1, pokemonBuild)
    //console.log(pokemonTeam);
    storage(pokemonTeam);
}

function storage(pokemonTeam) {
    //stores inputs in localStorage
    localStorage.setItem("pokemonTeam", JSON.stringify(pokemonTeam));
    displayTeam(pokemonTeam);
}

function getStorage() {
    const reference = localStorage.getItem("pokemonTeam");
    if (reference) {
        pokemonTeam = JSON.parse(reference);

        //calls the display function to display the array in localStorage
        displayTeam(pokemonTeam);
    }
};

function displayTeam(pokemonTeam) {
    //clear the section every time
    let pokeDisplay = document.getElementById("pokeDisplay");
    pokeDisplay.innerHTML = "";
    let teamNum = 0;
    pokemonTeam.forEach(pokemon => {
        //create a div for each team
        teamNum++;
        let div = document.createElement("div");
        div.setAttribute("data-key", pokemon.id);
        div.setAttribute("value", pokemon.name);
        div.setAttribute("id", "pokemon" + teamNum);
        div.setAttribute("class", "pokeDisplay");
        pokeDisplay.appendChild(div);

        //add the image
        let img = document.createElement("img");
        img.setAttribute("src", pokemon.sprite);
        img.setAttribute("alt", pokemon.name + " sprite");
        div.appendChild(img);

        //add the name
        let h2 = document.createElement("h2");
        h2.innerHTML = pokemon.name;
        div.appendChild(h2);

        //add the types
        let typeP = document.createElement("p")
        typeP.setAttribute("class", "pokeTypes");
        if (pokemon.type2 !== "") {
        typeP.innerHTML = "<strong>Type: </strong> <br>" + pokemon.type1 + "/" + pokemon.type2;
        }
        else {
            typeP.innerHTML = "<strong>Type: </strong> <br>" + pokemon.type1;
        }
        div.appendChild(typeP);

        //add ability
        let abilityH = document.createElement("p");
        abilityH.setAttribute("class", "label")
        abilityH.innerHTML = "<strong>Ability: </strong>";
        div.appendChild(abilityH);
        let abilityP = document.createElement("p");
        abilityP.setAttribute("class", "ability");
        abilityP.innerHTML = casePokemon(pokemon.ability);
        div.appendChild(abilityP);

        //add item
        let itemH = document.createElement("p");
        itemH.setAttribute("class", "label")
        itemH.innerHTML = "<strong>Held Item: </strong>";
        div.appendChild(itemH);
        let itemP = document.createElement("p");
        itemP.setAttribute("class", "pokeItem");
        itemP.innerHTML = casePokemon(pokemon.heldItem);
        div.appendChild(itemP);

        //add moves
        let moveDiv = document.createElement("div");
        moveDiv.setAttribute("class", "moveset");
        moveH = document.createElement("p");
        moveH.setAttribute("class", "moveLabel label");
        moveH.innerHTML = "<strong>Moveset: </strong>";
        moveDiv.appendChild(moveH);
        div.appendChild(moveDiv);
        let moveNum = 0;
        pokemon.moveset.forEach(move => {
            moveNum++;
            let moveP = document.createElement("p");
            moveP.setAttribute("class", "move" + moveNum)
            moveP.innerHTML = casePokemon(move);
            moveDiv.appendChild(moveP);
        })

        //add buttons
        let btnDiv = document.createElement("div");
        btnDiv.setAttribute("class", "displayBtn")
        div.appendChild(btnDiv);
        let editBtn = document.createElement("button");
        editBtn.setAttribute("type", "button");
        editBtn.setAttribute("id", "editBtn");
        editBtn.setAttribute("class", "buttons");
        editBtn.setAttribute("onclick", "editPokemon(event)")
        editBtn.innerHTML = "Edit";
        btnDiv.appendChild(editBtn);
        let delBtn = document.createElement("button");
        delBtn.setAttribute("type", "button");
        delBtn.setAttribute("id", "delBtn");
        delBtn.setAttribute("class", "buttons");
        delBtn.setAttribute("onclick", "deletePokemon(event)")
        delBtn.innerHTML = "Delete";
        btnDiv.appendChild(delBtn);
    })
}

//calls the getStorage() function when the page loads so anything in localStorage will appear on the screen.
getStorage();