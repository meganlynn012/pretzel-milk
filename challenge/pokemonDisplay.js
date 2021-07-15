let pokemonTeam = [];

function savePokemon() {
    pokeModal.style.display = "none";
    //start with a blank array for the types. Not all pokemon have a type 2, so an array is necessary.
    let pokemonTypes = [];
    let pokeSprite = document.getElementById("sprite").getAttribute("src");
    console.log(pokeSprite);
    let pokeName = document.getElementById("pokemonName").textContent;

    //get the name in lowercase for the url to work
    let pokeNameL = pokeName.toLowerCase();
    //this process adds the types to the pokemonTypes array. 
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNameL}`)
    .then(response => response.json())
    .then(data => {
        //console.log(data.types);
        data.types.forEach(type => {
            pokemonTypes.push(type.type.name)
            //console.log(pokemonTypes);
        })
    })

    //console.log(pokemonTypes);
    let pokeAbility = document.getElementById("abilityNames").value;
    let pokeItem = document.getElementById("heldItem").value;
    let pokeMove1 = document.getElementById("moveName1").value;
    let pokeMove2 = document.getElementById("moveName2").value;
    let pokeMove3 = document.getElementById("moveName3").value;
    let pokeMove4 = document.getElementById("moveName4").value;

    let pokemonBuild = {
        id: Date.now(),
        sprite: pokeSprite,
        name: pokeName,
        type: pokemonTypes,
        ability: pokeAbility,
        heldItem: pokeItem,
        move1: pokeMove1,
        move2: pokeMove2,
        move3: pokeMove3,
        move4: pokeMove4
    }
    console.log(pokemonBuild);
    pokemonTeam.push(pokemonBuild);
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
    pokemonTeam.forEach (pokemon => {
        //create a div for each team
        teamNum++;
        let div = document.createElement("div");
        div.setAttribute("data-key", pokemon.id);
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
        pAbility.innerHTML = pokemon.ability;
        div.appendChild(pAbility);
        //add item
        let pItem = document.createElement("p");
        pItem.innerHTML = pokemon.heldItem;
        div.appendChild(pItem);
        //add moves
        let moveDiv = document.createElement("div");
        moveDiv.setAttribute("class", "moveset");
        div.appendChild(moveDiv);
        /*let i;
        for (i = 1; i < 5; i++) {
            let move = "move" + i;
            pokemon.move = pokemon + move;
            move = document.createElement("p");
            move.innerHTML = pokemon.move;
            moveDiv.appendChild(move);
        }
        }*/
        let move1 = document.createElement("p");
        let move2 = document.createElement("p");
        let move3 = document.createElement("p");
        let move4 = document.createElement("p");
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
            editBtn.innerHTML = "Edit";
            btnDiv.appendChild(editBtn);
        let delBtn = document.createElement("button");
            delBtn.setAttribute("type", "button");
            delBtn.setAttribute("id", "delBtn");
            delBtn.setAttribute("class", "delete");
            delBtn.innerHTML = "Delete";
            btnDiv.appendChild(delBtn);
        
    })
}

getStorage();