const links = document.querySelectorAll(".scroll-to");

links.forEach((item) => {
    item.addEventListener("click", ()=> {
        const el = document.getElementById(item.getAttribute("data-link"));
        el.scrollIntoView({behavior:"smooth", block: "start"})
    })
})




//https://www.youtube.com/watch?v=23JQzsz9BlY&ab_channel=%5BSquareBrackets%5D