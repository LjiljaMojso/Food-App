import { appId, appKey,submitBtn,searchInput,recipesSection,minCal,maxCal} from "./data.js";
import createLoader from "./loader.js";
import { createPagination } from "./pagination.js"


const  getData = (showResults = 0) => { 
  let loader = createLoader();
  let diet = document.querySelector('select[name="diet"]');
  let dietType = diet.value ? "&diet=" + diet.value : "";
  let health = document.querySelector('select[name="health"]');
  let healthType = health.value ? "&health=" + health.value : "";
  let url;

  url =
  `https://api.edamam.com/search?q=${searchInput.value}&app_id=${appId}&app_key=${appKey}&from=${showResults}&calories=${minCal.value}-${maxCal.value}${dietType}${healthType}`;

  fetch(url)
    .then((data) => (data.ok ? data.json() : console.log("Api response error")))
    .then((res) => {
      createContent(res);
      loader.innerHTML = "";
    })
    .catch((err) => console.error("Error:", err));
};
// Content
const createContent = data => {
  const allResults = document.querySelector(".recipe-count-number");
  allResults.textContent = data.count;

  recipesSection.innerHTML = "";
  if (data.count) {
    data.hits.forEach(function (article) {
      createRecipe(article);
    });
    createPagination(data);
  } else {
    var erorParagraf = document.createElement("p");
    erorParagraf.textContent ="No search results found. Please try again";
    recipesSection.append(erorParagraf);
  }
}

const createRecipe = article => {
  const recipesSection = document.getElementById("recipes");
  const recipeDiv = createEl("article","","recipe-element");

  recipeDiv.addEventListener("click", () => {
    window.open(article.recipe.url, "_blank");
  });
  const recipeImg = createEl("img",article.recipe.image);
  recipeDiv.appendChild(recipeImg);

  const h3 = createEl("h3",article.recipe.label);
  recipeDiv.appendChild(h3);

  const paragraf = document.createElement("p");
  paragraf.textContent =  Math.round(article.recipe.calories / article.recipe.yield) + " kcal";
  paragraf.classList.add("calories");
  recipeDiv.appendChild(paragraf);

  recipeDiv.appendChild(getLabels(article.recipe.healthLabels))
    
  recipesSection.appendChild(recipeDiv);
}

const getLabels = (labels) => {
  let labelsDiv = createEl("div","","labels");

  labels.forEach( (label) => labelsDiv.appendChild(createEl("p",label,"label")));

  return labelsDiv
};
const activeBtn = () => {
  searchInput.value && minCal.value && maxCal.value
    ? submitBtn.removeAttribute("disabled")
    : submitBtn.setAttribute("disabled", true);
}

const setMinMaxInputNum = (e, element, attribute, callback) => {
  const number = Math.abs(e.target.value);

  element.setAttribute(attribute, number);
  callback();
}

searchInput.addEventListener("input", activeBtn);

minCal.addEventListener("input", (e) => {
  setMinMaxInputNum(e, maxCal, "min", activeBtn);
});

maxCal.addEventListener("input", (e) => {
  setMinMaxInputNum(e, minCal, "max", activeBtn);
});

submitBtn.addEventListener("click", () => getData());

export default getData;