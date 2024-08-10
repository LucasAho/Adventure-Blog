const commentForm = document.getElementById("add-comment");

commentForm.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(commentForm));
    const response = await fetch("/.netlify/functions/add-comment", {
        method: "POST",
        body: JSON.stringify({
            name: formData.name,
            comment: formData.comment,
            last_name: formData.last_name,
            blog_id: formData.id,
            blog_url: window.location.href
        })
    }).then(result => result.json());
    commentForm.reset();
    if (response.status === 429) {
        alert(
            "Whoa there, slow down. Maximum of 2 comments every minute please! 🙏"
        );
    }
    if (response.message !== "Honeypot triggered") {
        getComments();
    }
});

const getComments = async () => {
    const commentsList = document.getElementById("comments-list");
    const commentTemplate = document.getElementById("comment-template");
    commentsList.innerHTML = "";

    const response = await fetch(
        `/.netlify/functions/get-comments?id=${id}`
    ).then(response => response.json());

    response.message
        .sort(
            (a, b) =>
                Number(new Date(b.created_at)) -
                Number(new Date(a.created_at))
        )
        .forEach(comment => {
            const clone = commentTemplate.content.cloneNode(true);
            const author = clone.querySelector(".comment-author");
            const body = clone.querySelector(".comment-body");
            const date = clone.querySelector(".comment-date");
            author.textContent = comment.name;
            body.textContent = comment.comment;
            date.textContent = new Date(comment.created_at).toDateString();
            commentsList.appendChild(clone);
        });
};