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

export { storeComment, getComments }