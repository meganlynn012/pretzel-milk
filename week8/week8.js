const pokeurl = `https://pokeapi.co/api/v2/pokemon/umbreon`;
fetch(pokeurl)
.then(response => response.json())
.then(data => console.log(data));

let requesturl = `https://swapi.dev/api/people/`;

fetch(requesturl)
.then(response => response.json())
.then(data => {
    for (i=0; i < data.results.length;i++)
    {
        //console.log(data.results[i]["name"])
        document.getElementById("starWarsNames").innerHTML += data.results[i]["name"] + "<br>";
        
    }

})
