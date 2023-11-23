const buttonCreatepost = document.getElementById("createPostButton")
const buttonAPIDocs = document.getElementById("apiDocs")
const buttonHome = document.getElementById("home")

function GoToUploadPost() {
    window.location.replace(`http://${window.location.host}/upload`);
}

function GoToHome() {
    window.location.replace(`http://${window.location.host}/`);
}

function GoToApiDocs() {

}

if (buttonCreatepost) {
    buttonCreatepost.addEventListener("click", GoToUploadPost);
}

if (buttonAPIDocs) {
    buttonAPIDocs.addEventListener("click", GoToApiDocs);
}

if (buttonHome) {
    buttonHome.addEventListener("click", GoToHome);
}