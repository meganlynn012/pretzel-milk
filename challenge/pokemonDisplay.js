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
    console.log(pokeIdTest);
    let pokeId;
    if (pokeIdTest == 'undefined'){
        pokeId = Date.now();
    }
    else {
        pokeId = pokeIdTest;
    }

    //get pokemon ability
    let pokeType1 = document.getElementById("type1").textContent;
    console.log(pokeType1);
    let pokeType2 = "";
    let getType2 = document.getElementById('type2');
        if (getType2 !== null) {
            pokeType2 = getType2.textContent;
        }
    console.log(pokeType2);
    let pokeAbility = document.getElementById("abilityNames").value;
    //get held item
    let pokeItem = document.getElementById("heldItem").value;
    //get the chosen moves
    let pokeMove1 = document.getElementById("moveName1").value;
    let pokeMove2 = document.getElementById("moveName2").value;
    let pokeMove3 = document.getElementById("moveName3").value;
    let pokeMove4 = document.getElementById("moveName4").value;
        //assign all the values to an object
    //assign all the values to an object

    let pokemonBuild = {
        sprite: pokeSprite,
        name: pokeName,
        id: pokeId,
        type1: pokeType1,
        type2: pokeType2,
        ability: pokeAbility,
        heldItem: pokeItem,
        move1: pokeMove1,
        move2: pokeMove2,
        move3: pokeMove3,
        move4: pokeMove4
    }

    console.log(pokeIdTest);
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
    console.log(pokemonBuild.id);
    console.log(index);
    pokemonTeam.splice(index, 1, pokemonBuild)
    console.log(pokemonTeam);
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

        //add ability
        let pAbility = document.createElement("p");
        pAbility.setAttribute("class", "ability");
        pAbility.innerHTML = pokemon.ability;
        div.appendChild(pAbility);

        //add item
        let pItem = document.createElement("p");
        pItem.setAttribute("class", "pokeItem");
        pItem.innerHTML = pokemon.heldItem;
        div.appendChild(pItem);

        //add moves
        let moveDiv = document.createElement("div");
        moveDiv.setAttribute("class", "moveset");
        div.appendChild(moveDiv);
        /*let move = [1, 2, 3, 4]
        let i;
        for (i = 1; i < 5; i++) {
            let move[i] = document.createElement("p")
            move[i].setAttribute("class", "move" + i)
            move[i].innerHTML = pokemon.move[i];
            moveDiv.appendChild(move[i]);
        
        }*/
        let move1 = document.createElement("p");
        let move2 = document.createElement("p");
        let move3 = document.createElement("p");
        let move4 = document.createElement("p");
        move1.setAttribute("class", "move1");
        move2.setAttribute("class", "move2");
        move3.setAttribute("class", "move3");
        move4.setAttribute("class", "move4");
        move1.innerHTML = pokemon.move1;
        move2.innerHTML = pokemon.move2;
        move3.innerHTML = pokemon.move3;
        move4.innerHTML = pokemon.move4;
        moveDiv.appendChild(move1);
        moveDiv.appendChild(move2);
        moveDiv.appendChild(move3);
        moveDiv.appendChild(move4);

        //add buttons
        let btnDiv = document.createElement("div");
        btnDiv.setAttribute("class", "buttons");
        div.appendChild(btnDiv);
        let editBtn = document.createElement("button");
        editBtn.setAttribute("type", "button");
        editBtn.setAttribute("id", "editBtn");
        editBtn.setAttribute("class", "edit");
        editBtn.setAttribute("onclick", "editPokemon(event)")
        editBtn.innerHTML = "Edit";
        btnDiv.appendChild(editBtn);
        let delBtn = document.createElement("button");
        delBtn.setAttribute("type", "button");
        delBtn.setAttribute("id", "delBtn");
        delBtn.setAttribute("class", "delete");
        delBtn.setAttribute("onclick", "deletePokemon(event)")
        delBtn.innerHTML = "Delete";
        btnDiv.appendChild(delBtn);
    })
}

//calls the getStorage() function when the page loads so anything in localStorage will appear on the screen.
getStorage();