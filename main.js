/*Select an ol element from your index.html page (This means you need to add the html
for this element to your page. You can't select something that doesn't exist.)

Read a list of links from an array. (You will also need to create this array)

For each of the items in the array of links you should create a li element,
add an a element with the label and url from the list of links, 
and add the new li element into the ol element you grabbed above.

You can keep the structure of your list of links simple, you will need a label that will be
shown to the user, and the URL of the page that should open when the link is clicked. 
It might look something like this:

const links = [
    {
        label: "Week1 notes",
        url: "week1/index.html"
    }
]

Each week you will simply add new item(s) into your array to have them automatically show up in the table of contents.*/


//Create the array
const links = [
    
      '<a href="week1.html">Week 1</a>',
      '<a href="week2.html">Week 2</a>',
      '<a href="week3.html">Week 3</a>',
      '<a href="week4.html">Week 4</a>',
      '<a href="week5.html">Week 5</a>'
    
  ];

//select the element using querySelector
let list = document.querySelector('ol');

//specify how many list items to create
let numContents = links.length;
//console.log(numContents);

//create the loop that will add an li element for each item in the array and display the list
for (i = 0; i < numContents; i++) {
    let li = document.createElement('li');

    //specify what should appear in each li element on the page
    li.innerHTML = links[i];

    //place it in the ol element
    list.appendChild(li);    
}

