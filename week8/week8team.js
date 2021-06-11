let nexturl = `https://swapi.dev/api/people`;
let previousurl = null;

function fetchPeople(next=true) {
    let url="";
    if (next) {
        url = nexturl;
    }
    else {
        url = previousurl
    }
    fetch(url)
    .then(response => response.json())
    .then(json => {
        previousurl = json["previous"];
        nexturl = json["next"];

        document.getElementById("next").disabled = nexturl ? false: true;
        document.getElementById("previous").disabled = previousurl ? false : true;
        return displayPeople(json["results"]);
    })
    }
    function displayPeople(peopleList) {
        document.getElementById("descriptionDiv").innerHTML = "";
        for (const i in peopleList) {
        const person = peopleList[i];
        const personDisplayElement = document.createElement("p");
        personDisplayElement.innerHTML = `${person["name"]}`
        document.getElementById("descriptionDiv").appendChild(personDisplayElement);
    }
};