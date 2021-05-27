let todoList = []

function displayList(listText) {

const list = document.querySelector(".listContainer");
const isChecked = listText.checked ? "done": "";
const node = document.createElement("li");
node.setAttribute("class", "todo-item ${isChecked}");
node.setAttribute("data-key", listText.id);

//adds a checkbox next to each item and shows the item.
node.innerHTML = `
    <input id="${listText.id}" type="checkbox"/>
    <label for="${listText.id}" class="tick js-tick"></label>
    <span>${listText.item}</span>
`

//puts the list into the ul element
list.append(node);
console.log(todoList);
}

//transforms the user input into an object and adds it to an array
function addToArray(item) {
    const listText = {
        item,
        checked: false,
        id: Date.now()
    }
    //this syntax adds the user input to the array by pushing to it.
    todoList.push(listText);

    //calls the displayList function and sends the array to it.
    displayList(listText);
};

//Checks for the user to submit something by pressing enter
const form = document.querySelector(".todo-form");
form.addEventListener('submit', event => {
    //this stops the browser from trying to submit the data to a server
    event.preventDefault();
    //gets the user input and assigns to usable variables
    const input = document.querySelector(".todo-input");
    const item = input.value;

    //makes sure user entered something, and passes it to the array function
if (item !== "") {
    addToArray(item);

    //clears the text box for the user and focuses the element. These are cool.
    input.value = "";
    input.focus();
}
console.log(item);
});