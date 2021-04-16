const createEl = (type,path,property) => {
    const element = document.createElement(type);
    if (type === "img") {
      element.setAttribute("src",path);
    } else {
      element.textContent = path;
      if (property) {
        element.classList.add(property)
      }
    }
    return element;
}
export default createEl;