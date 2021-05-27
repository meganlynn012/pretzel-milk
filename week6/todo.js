let todoList = []

//Gets user input, makes sure user entered something, and passes it to the array function
function addItem(){
let input = document.getElementById("listAdd");
let item = input.value;
if (item !== "") {
    addToArray(item);

    //clears the text box for the user and focuses the element. These are cool.
    input.value = "";
    input.focus();
}
console.log(item);
};

function displayList(listObject){
    const list = document.getElementById("listAdd");
    const done = listObject.checked ? "done": "";
    const node = document.createElement("li");
    node.setAttribute("class", `todo-item ${done}`);
    node.setAttribute("data-key", listObject.id);
    node.innerHTML = `
        <input id="${listObject.id}" type="checkbox"/>
        <label for="${listObject.id}" class="checked js-checked"></label>
        <span>${listObject.item}</span>`;
        list.append(node);
}

//transforms the user input into an object and adds it to an array
function addToArray(item) {
    const listObject = {
        item,
        checked: false,
        id: Date.now()
    }
    todoList.push(listObject);
    console.log(todoList);
};