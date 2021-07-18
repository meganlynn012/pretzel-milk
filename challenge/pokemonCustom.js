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

        //console.log(pokeurl);
        getPokeDetails(pokeName);
        //reset the search box so the user doesn't have to
        pokeSearch.value = "";
    }

    //most of these parameters are passed from the editPokemon() function
    async function getPokeDetails(pokeurl, id, pokeAbility, pokeItem, allMoves) {
        //display the modal
        pokeModal.style.display = "flex";
        //console.log(id);
        try {
            await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeurl}`)
                .then(response => response.json())
                .then(data => {
                    //console.log(data.name);
                    //console.log(data.abilities);
                    //console.log(data.types);
                    //console.log(data.moves);

                    //pass the correct parameters on to remember values the user already picked if editing
                    displayName(data.name, id);
                    displayType(data.types);
                    displaySprite(data.sprites, data.name);
                    displayAbilities(data.abilities, id, pokeAbility);
                    getPokeItems(id, pokeItem);
                    displayMoveset(data.moves, id, allMoves);
            
                })
        } catch (error) {
            console.log(error);
        }
    }

    //POPULATES THE DATA IN THE MODAL TO CUSTOMIZE THE POKEMON

    function displayName(name, id) {
        //capitalize the first letter of the name
        let pokemon = casePokemon(name);
        
        //console.log(pokemon);
        document.getElementById("pokemonName").innerHTML = pokemon;
        //put the data key in the modal so it can be retrieved in the savePokemon() function
        document.getElementById("pokemonName").setAttribute("data-key", id);
    }

    function displayType(types) {
        let typeDiv = document.getElementById("types");
        typeDiv.innerHTML = "";
        //console.log(types)
        let typeNum = 0;
        types.forEach(type => {
            //console.log(type.type.name);
            //pokemonTypes.push(type.type.name);
            typeNum++;
            let pokeTypes = casePokemon(type.type.name);
            const h3 = document.createElement("h3");
            h3.innerText = "Type " + typeNum + " ";
            const p = document.createElement("p");
            p.setAttribute("id", "type" + typeNum);
            p.innerHTML = pokeTypes;
            typeDiv.appendChild(h3);
            typeDiv.appendChild(p);
        })
    }

    function displaySprite(sprite, name) {
        //console.log(sprite.front_default);
        document.getElementById("sprite").setAttribute("src", sprite.front_default);
        document.getElementById("sprite").setAttribute("alt", name + " sprite");
        //console.log(name + " sprite");
    }

    function displayAbilities(abilities, id, pokeAbility) {
        //console.log(abilities);
        //console.log(id);
        //console.log(pokeAbility);
        document.getElementById("ability").innerHTML = "";
        let labelLang = "Ability ";
        let idName = "abilityNames";
        let nameValue = "ability";
        //this will check for an existing value if the pokemon is being edited. If there is one, the selected attribute will be added next to the value passed through.
        let selectValue = (id == undefined) ? "" : pokeAbility;
        let location = document.getElementById("ability")
        let data = [];
        abilities.forEach(ability => {
            data.push(ability.ability.name);
        })
        dropDown(labelLang, idName, nameValue, location, data, selectValue);
    }

    async function getPokeItems(id, pokeItem) {
        try {
            await fetch(`https://pokeapi.co/api/v2/item?limit=954&offset=111`)
                .then(response => response.json())
                .then(data => {
                    let items = data.results;
                    displayItems(items, id, pokeItem);

                })
        } catch (error) {
            console.log(error);
        }
    }

    function displayItems(items, id, pokeItem) {
        document.getElementById("item").innerHTML = "";
        let labelLang = "Held Item ";
        let idName = "heldItem";
        let nameValue = "heldItem";
        let selectValue = (id == undefined) ? "" : pokeItem;
        let location = document.getElementById("item")
        let data = ['None'];
        items.forEach(item => {
            data.push(item.name);
        })
        dropDown(labelLang, idName, nameValue, location, data, selectValue);
    }

    function displayMoveset(moveset, id, allMoves) {
        document.getElementById("moveset").innerHTML = "";;
        let i;
        for (i = 1; i < 5; i++) {
            let labelLang = "Move " + i;
            let idName = "moveName" + i;
            let nameValue = "move" + i;
            let selectValue = (id == undefined) ? "" : allMoves[i-1];
            let location = document.getElementById("moveset")
            let data = ['None'];
            moveset.forEach(move => {
                data.push(move.move.name);
            })
            dropDown(labelLang, idName, nameValue, location, data, selectValue);
        }
    }

    //Creates the drop down selections for the ability, item, and moves
    function dropDown(labelLang, idName, nameValue, location, data, selectValue) {
        let label = document.createElement("label");
        //label.innerHTML = labelLang
        let select = document.createElement("select")
        select.setAttribute("id", idName);
        select.setAttribute("name", nameValue);
        location.appendChild(label);
        label.appendChild(select);
        data.forEach(item => {
            let option = document.createElement("option");
            //when editing, this will check what the user previously selected and set it as the default
            if (selectValue == item) {
                option.setAttribute("selected", "")
            }
            //Capitalize the first letter
            let caseData = casePokemon(item);
            //creates a way to obtain the value of the selection to display it
            option.setAttribute("value", item);
            option.innerHTML = caseData;
            select.appendChild(option);
        })
    }

    //Closes the modal when the close button is clicked.
    function closeModal() {
        pokeModal.style.display = "none";
    }