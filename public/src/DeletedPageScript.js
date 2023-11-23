const homeButton = document.getElementById("home")

function GoToHome() {
    window.location.replace(`http://${window.location.host}/`);
}

if (homeButton) {
    homeButton.addEventListener("click", GoToHome);
}