let nextURL = "https://swapi.dev/api/people";
let previousURL = null;

// Fetch a list of people from the Star Wars API.
// The "next" parameter tells the function whether to fetch the next list of 10 people,
// or the previous list of 10 people.
function fetchPeople(next=true)
{
    let url = "";
    if (next)
    {
        url = nextURL;
    }
    else
    {
        url = previousURL;
    }
    fetch(url).then(response => response.json()).then(json => {
       previousURL = json["previous"];
        nextURL = json["next"];
        // Disable "next" & "previous" buttons if there is no use for them.
        document.getElementById("next").disabled = nextURL ? false : true;
        document.getElementById("previous").disabled = previousURL ? false : true;
        return displayPeople(json["results"]);
    });
}
// Displays the list of people fetched by fetchPeople.
function displayPeople(peopleList)
{
    document.getElementById("descriptionDiv").innerHTML = "";
    for (const i in peopleList)
    {
        const person = peopleList[i];
        const personDisplayElement = document.createElement("p");
        personDisplayElement.innerHTML = person["name"];
        document.getElementById("descriptionDiv").appendChild(personDisplayElement);
    }
}