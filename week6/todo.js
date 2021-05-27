let todoList = []

//transforms the user input into an object and adds it to an array
function addToArray(item) {
    const listText = {
        item,
        checked: false,
        id: Date.now()
    }
    todoList.push(listText);
    console.log(todoList);
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