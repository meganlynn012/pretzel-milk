let todoList = []

//calls the add function when user hits enter.
document.querySelector(".inputContainer").addEventListener("submit", (event) => {
    //stops the browser from submitting the form to a server
    event.preventDefault();
    add();
})
//calls the add function when user clicks/touches the plus button.
document.getElementById("addButton").addEventListener("click", (event) => {
    event.preventDefault();
    add();
})

function add() {
    const input = document.getElementById("addToList").value;
    //console.log(input);

    //verifies the user actually typed something
    if (input !== "") {
        const todoObject = {
            id: Date.now(),
            text: input,
            isDone: false,
        }
        //adds the user input into the array todoList. Unshift instead of push would make the items appear at the bottom.
        todoList.push(todoObject);
        //console.log(todoList);
        storage(todoList);
        //resets the input line so the user doesn't have to delete the last input
        document.getElementById("addToList").value = "";
    }
};

function storage(todoList) {
    //stores inputs in localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
    display(todoList);
}

function getStorage() {
    const reference = localStorage.getItem("todoList");
    if (reference) {
        todoList = JSON.parse(reference);

        //calls the display function to display the array in localStorage
        display(todoList);
    }
};

function display(todoList) {
    //clears everything in the ul so it doesn't repeat the entire array each time.
    document.getElementById("listContainer").innerHTML = "";

    //check whether isDone = true
    todoList.forEach((item) => {
        const checked = item.isDone ? 'checked' : null;

        const li = document.createElement("li");
        li.setAttribute("data-key", item.id);

        //add checked class to list item if isDone = true. Has to have === because == just won't cut it :P
        if (item.isDone === true) {
            li.classList.add('checked');
        }

        li.innerHTML = '<span class="checkbox"></span>' + '<p class="list-item">' + item.text + '</p>' +
            '<span id="x" class="delete"></span>';

        //display the list by appending the li to the ul
        document.getElementById("listContainer").appendChild(li);
    });
}

//calls the getStorage function right away to display whatever array is in there when the page loads
getStorage();

//Listens for the user to click the circle or X button
document.querySelector("#listContainer").addEventListener("click", (event) => {
    if (event.target.classList.contains('checkbox')) {
        let selectedId = event.target.parentElement.getAttribute('data-key');
        //console.log(selectedId);
        check(selectedId);
    }

    if (event.target.classList.contains('delete')) {
        let deleteId = event.target.parentElement.getAttribute('data-key');
        //console.log(deleteId);
        remove(deleteId);
    }
})

//changes the isDone value to true and vice versa then stores it in the localStorage
function check(id) {
    todoList.forEach(item => {
        if (item.id == id) {
            item.isDone = !item.isDone;
            //console.log(todoList);
        }
    })
    storage(todoList);
};

//deletes the list item and stores the new array in the localStorage
function remove(id) {
    const index = todoList.findIndex(item => item.id === Number(id));
    //console.log(index);
    const todo = {
        deleted: true,
        ...todoList[index]
    };
    todoList = todoList.filter(item => item.id !== Number(id));
    //console.log(todoList);
    storage(todoList);
}

//filters the list for only the checked items
function complete() {
    let todoDone = todoList.filter(item => item.isDone);
    //console.log(todoDone);
    display(todoDone);
}

//filters the list for items not checked
function inProgress() {
    let todoStill = todoList.filter(item => !item.isDone);
    //console.log(todoStill);
    display(todoStill);
}