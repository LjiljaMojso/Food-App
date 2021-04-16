import createEl from "./helper.js";
 
const createLoader = () => {
    const loader = document.querySelector(".loader");
    const loaderImage = createEl("img","./img/loader.gif");
  
    loader.appendChild(loaderImage);
    return loader;

}
export default createLoader;