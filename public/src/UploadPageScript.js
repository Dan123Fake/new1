const buttonUpload = document.getElementById("buttonupload")

function uploadPost() {
    const postNameInput = document.getElementById("postname").value;
    const postAuthorInput = document.getElementById("postauthor").value;
    const postContentInput = document.getElementById("postcontent").value;
    const postEmailInput = document.getElementById("postemail").value;

    if (postNameInput != "" && postAuthorInput != "" && postContentInput != "" && postEmailInput != "") {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `http://${window.location.hostname}:3000/api/create_post`);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

        const body = JSON.stringify({
            title: postNameInput,
            author: postAuthorInput,
            content: postContentInput,
            email: postEmailInput
        });

        xhr.onload = () => {
            if (xhr.status === 200) {
                window.location.replace(`http://${window.location.host}/post/${JSON.parse(xhr.responseText)["postid"]}`)
            }
        }

        xhr.send(body);
    } else {
        alert("Please fill all fields");
    }
}

if (buttonUpload) {
    buttonUpload.addEventListener("click", uploadPost);
}