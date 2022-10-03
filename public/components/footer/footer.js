const footer = document.getElementById("footer");

const footerPTag = document.createElement("p")

footerPTag.innerText = `© ${new Date().getFullYear()}`

footer.appendChild(footerPTag);