import Hikes from './hikes.js';
import { storeComment, getComments, showCommentsList } from './commenthike.js';
//import Comments from './commenthike.js';
//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
window.addEventListener('load', () => {
    myHikes.showHikeList();
    showCommentsList();
});

document.querySelector(".commentSubmission").addEventListener("submit", (event) => {
    event.preventDefault();
    let commentBody = document.getElementById("commentBody").value;
    // const hikeName = document.getElementById("hikeName").value;
    const hikeName = document.querySelector('li').dataset.name;
    storeComment(commentBody, hikeName);
    document.getElementById("commentBody").value = "";
    showCommentsList(hikeName);
});

document.querySelector(".resetBtn").addEventListener("click", () => {
    console.log('Clearing all comments');
    localStorage.clear('comments')
    showCommentsList();
});