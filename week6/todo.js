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

    if (input !== "") {
        const todoObject = {
            id: Date.now(),
            text: input,
            isDone: false,
        }
        //adds the user input into the array todoList.
        todoList.push(todoObject);
        //console.log(todoList);
        storage(todoList);
        //resets the input line so the user doesn't have to delete the last input
        document.getElementById("addToList").value = "";
    }
};

function storage(todoList){
        //stores inputs in localStorage
        localStorage.setItem("todoList", JSON.stringify(todoList));
        display(todoList);
}
function getStorage(){
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

    todoList.forEach((item) => {
        const checked = item.isDone ? 'checked': null;

        const li = document.createElement("li");
        li.setAttribute("data-key", item.id);
        if(item.isDone === true) {
            li.classList.add('checked');
        }

        li.innerHTML = '<span class="checkbox"></span>' + '<p class="list-item">' + item.text + '</p>' +
        '<span id="x" class="delete"></span>';

        //display the list by appending the li to the ul
        document.getElementById("listContainer").appendChild(li);
    });
}

getStorage();

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

function check(id) {
    todoList.forEach(item => {
        if (item.id == id) {
            item.isDone = !item.isDone;
            //console.log(todoList);
        }
    })
    storage(todoList);
};

function remove(id) {
    const index = todoList.findIndex(item => item.id === Number(id));
    //console.log(index);
    const todo = {
        deleted: true,
        ...todoList[index]
    };
    todoList = todoList.filter( item => item.id !== Number(id));
    //console.log(todoList);
    storage(todoList);
}

function complete() {
    let todoDone = todoList.filter(item => item.isDone);
    //console.log(todoDone);
    display(todoDone);
}

function inProgress() {
    let todoStill = todoList.filter(item => !item.isDone);
    //console.log(todoStill);
    display(todoStill);
}


