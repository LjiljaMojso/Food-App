import createEl from "./helper.js";

const createPagination = data => {
    const pagesDiv = document.querySelector(".pagination");
    const allPages = Math.round(data.count / 10);
    const activePage = data.from / 10;
    pagesDiv.innerHTML = "";
  
    if (allPages > 10) allPages = 10;
  
    for (let page = 1; page <= allPages; page++) {
      if (page - 1 === activePage) {
        const active = document.createElement("button", page);
        active.setAttribute("disabled", true);
        pagesDiv.append(active);
        continue;
      }
      const someButton = createEl("button", page);
      pagesDiv.append(someButton);
    }
  
    paginationOnClick();
}
const paginationOnClick = () => {
    const paginationBtns = document.querySelectorAll(".pagination button");
  
    paginationBtns.forEach(function (btn, i) {
      const index = i * 10;
      btn.addEventListener("click", () => {
        getData(index);
        window.scrollTo({ left: 0, top: 500, behavior: "smooth" });
      });
    });
}

export { createPagination, paginationOnClick} ;