todoList = [];

class Todo {
    constructor(item) {
        this.ulElement = item;
    }

    add() {
        const input = document.querySelector("#addToList").value;

        //check to make sure the user input something. If not, nothing will happen.
        if (input !== "") {
            const todoObject = {
                id: todoList.length,
                todoText: input,
                isDone: false,
            }

            //push will add an item to the bottom of the array
            //unshift will add it to the top
            todoList.push(todoObject);
            this.display();
            //resets the text
            document.querySelector("#addToList").value = "";
        }

    }

    check(index) {
        //finds the matching index number of the array when the list item is clicked.
        const selectedIndex = todoList.findIndex((item) => item.id == index);
        todoList[selectedIndex].isDone == false ? todoList[selectedIndex].isDone = true :
            todoList[selectedIndex].isDone = false;
        this.display();
    }

    delete(index) {
        const selectedDelIndex = todoList.findIndex((item) => item.id == index);
        todoList.splice(selectedDelIndex, 1);
        this.display();

    }

    filter() {
        todoList.showDone == false ? todoList.showDone = true : todoList.showDone = false;
        //console.log(todoList.showDone);
        if (todoList.showDone == false) {
            let doneList = todoList.filter(done => done.isDone == true);
            console.log(doneList);
        }
    };

    display() {
        //clears the content of the array so it doesn't display the entire array each time.
        this.ulElement.innerHTML = "";

        todoList.forEach((objectItem) => {
            const li = document.createElement("li");

            const delBtn = document.createElement("span");

            li.innerText = objectItem.todoText;
            li.setAttribute("dataId", objectItem.id);

            delBtn.setAttribute("dataId", objectItem.id);
            delBtn.classList.add("x");

            //append the delete button to the list item
            li.appendChild(delBtn);

            //delete the list item when the icon is clicked.
            delBtn.addEventListener("click", function (e) {
                const deleteId = e.target.getAttribute("dataId");
                mytodoList.delete(deleteId);
            })

            li.addEventListener("click", function (e) {
                const selectedId = e.target.getAttribute("dataId");
                mytodoList.check(selectedId);
            })

            //add the checked class to an item if the object property 'isDone' is true
            if (objectItem.isDone) {
                li.classList.add("checked");
            }


            //appends the list item to the ul list.
            this.ulElement.appendChild(li);

            document.querySelector("#completeBtn").addEventListener("click", function (e) {
                mytodoList.filter();

            });
        })
    }
}

//assigns the ul element to listSection
const listSection = document.querySelector("#listContainer");

//assigns the entire class Todo to a variable and passes the ul element to it as a parameter
mytodoList = new Todo(listSection);

document.querySelector(".addBtn").addEventListener("click", function () {
    mytodoList.add()

});

//this will allow the user to add items by pressing enter
document.querySelector(".inputContainer").addEventListener("submit", event => {
    //stops the browser from trying to submit the form to a server
    event.preventDefault();
    mytodoList.add()


});