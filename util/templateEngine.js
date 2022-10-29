import fs from "fs"

const navComponent = fs.readFileSync("./public/components/navbar/navbar.html").toString()
const footerComponent = fs.readFileSync("./public/components/footer/footer.html").toString()

//Renderpage takes the path as a argument and options. Concatenates the dom
export function renderPage(path, options = {}){
    const page = fs.readFileSync("./public/pages" + path).toString()

    return navComponent
            .replace("%%TAB_TITLE%%", options.tabTitle || "Michaelpedia")
            .replace("%%PAGE_CSS_LINK%%", 
                options.cssLink || ""
            )
            + page
            + footerComponent

}