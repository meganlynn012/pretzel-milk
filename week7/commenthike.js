function getComments(query = null) {
    // Return comments as array.
    const commentsString = window.localStorage.getItem("comments");
    const comments = JSON.parse(commentsString);
    return query == null ? comments : comments.filter((_comment) => _comment.hikeName == query);
}

function storeComment(commentBody, hikeName) {
    const comment = {
        content: commentBody,
        hikeName: hikeName,
        date: new Date()
    };
    // Add input to local storage.
    let comments = getComments();
    if (!comments) {
        console.log("Initializing comment array.");
        comments = [];
    }
    comments.push(comment);
    // localStorage only supports strings, so store the array in the form of a JSON string.
    window.localStorage.setItem("comments", JSON.stringify(comments));
}

function showCommentsList(query = null) {
    const liElements = document.querySelectorAll('li');
    liElements.length > 1 ? query = query : query = liElements[0].dataset.name;
    const comments = getComments(query);
    const commentList = document.getElementById("commentList");
    commentList.innerHTML = "";
    for (const i in comments) {
        const comment = comments[i];
        let commentListItem = "<li><div>";
        commentListItem += "<h3>" + comment.hikeName + "</h3>";
        commentListItem += comment.date + "<br>";
        commentListItem += comment.content;
        // commentListItem += "<span class='deleteBtn'>&#10008;</span>"
        commentListItem += "</div></li>"
        commentList.innerHTML += commentListItem;
    }
}
export { storeComment, getComments, showCommentsList }