  
import Hikes from './hikes.js';
//import Comments from './commenthike.js';
//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
window.addEventListener('load', () => {
    myHikes.showHikeList();
});

import { storeComment, getComments } from './commenthike.js';
document.querySelector(".commentSubmission").addEventListener("submit", (event) => {
    event.preventDefault();
    const commentBody = document.getElementById("commentBody").value;
    // const hikeName = document.getElementById("hikeName").value;
    const hikeName = document.querySelector('li').dataset.name;
    storeComment(commentBody, hikeName);
    showCommentsList();
});

document.querySelector(".resetBtn").addEventListener("click", () => {
    console.log('Clearing all comments');
    localStorage.clear('comments')
    showCommentsList();
});

function showCommentsList(query = null) {
    const comments = getComments(query);
    const commentList = document.getElementById("commentList");
    commentList.innerHTML = "";
    for (const i in comments) {
        const comment = comments[i];
        let commentListItem = "<li><div>";
        commentListItem += "<h3>" + comment.hikeName + "</h3>";
        commentListItem += comment.date + "<br>";
        commentListItem += comment.content;
        commentListItem += "<span class='deleteBtn'>&#10008;</span>"
        commentListItem += "</div></li>"
        commentList.innerHTML += commentListItem;
    }
}

showCommentsList();