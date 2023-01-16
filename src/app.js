const navBar = document.getElementById("nav-bar");
const navigation = document.getElementById("navigations");
const closeNav = document.getElementById("close-nav");
const categoryList = document.getElementById("category-list");
const closeModal = document.getElementById("close-modal");
const resultPopup = document.getElementById("result-popup");
const trendySec = document.getElementById("trendy-sec");
const reloadBtn = document.getElementById("reload-btn");
const resultSec = document.getElementById("result-sec");
const trendypage = document.getElementById("trendy-page")
const categorySec = document.getElementById("category")
const searchResultPage = document.getElementById("search-result-page")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")

//const key = "64157ccb604f4f0b852cea396943b821"
const key = "511de10d001d49949024c9f254766ee1"

// function to reload page on logo click
const logos = document.querySelectorAll(".logo");

const reload = () => {
  location.reload();
}

logos.forEach(logo =>{
  logo.addEventListener("click", reload);
})
//search recipe function

window.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById("search-input"); 
  const searchBtn = document.getElementById("search-btn");

  const getInputValue = () => {
    let userInput = searchInput.value;
    return userInput
  }

  searchBtn.addEventListener('click', () => {
    getInputValue()
    getSearchResult(getInputValue(), 0)
    trendypage.classList.add("hidden")
    categorySec.classList.add("hidden")
    searchResultPage.classList.remove("hidden")
  });

  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      getInputValue()
      getSearchResult(getInputValue(), 0)
      trendypage.classList.add("hidden")
      categorySec.classList.add("hidden")
      searchResultPage.classList.remove("hidden")
    }
});

  let offset = 0

  nextBtn.addEventListener("click", ()=> {
    const nextTen = () => {
      offset += 10
      return offset
    }
    getSearchResult(getInputValue(), nextTen())
    prevBtn.classList.remove("hidden")
  })

  prevBtn.addEventListener("click", ()=> {

  const prevTen = () => {
    offset -= 10
    return offset
  }
    getSearchResult(getInputValue(), prevTen())
  })
  
});

const getSummary = () => {
  detailBtn = document.querySelectorAll("#detail-btn")
  detailBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.target.classList.add("hidden")
      btn.nextElementSibling.classList.remove("hidden")
      btn.nextElementSibling.nextElementSibling.classList.remove("hidden")
    })
  })

  closeDetailBtn = document.querySelectorAll("#close-detail-button")
  closeDetailBtn.forEach(closeBtn => {
    closeBtn.addEventListener("click", (e) => {
      e.target.classList.add("hidden")
      closeBtn.previousElementSibling.classList.add("hidden")
      closeBtn.previousElementSibling.previousElementSibling.classList.remove("hidden")
    })
  })
}

//search input result function
const getSearchResult = (a,b) => {
  let url = `https://api.spoonacular.com/recipes/complexSearch?query=${a}&apiKey=${key}&addRecipeInformation=true&number=10&offset=${b}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let html = ""
    data.results.forEach((result, index) => {
    html += ` <div class="flex flex-col justify-center items-center" data-recipe-id="${result.id}" data-recipe-title="${result.title}" data-recipe-image="${result.image}" data-recipe-sourceUrl="${result.sourceUrl}" data-recipe-instruction="${result.instructions}">
    <div
      class="mb-4"
    >
      <img
        src="${result.image}"
        alt="recipe"
        class="rounded-full object-cover mt-8 trendy-img"
      />
    </div>
    <p class="mb-3 text-xl text-center font-bold">${result.title}</p>
    <button class=" text-orange-600 mt-2 font-sm hover:text-orange-400" id="detail-btn">Show Detail</button>
    <p class="text-sm px-2 hidden" id="summary">${result.summary}</p>
    <button class=" text-orange-600 mt-2 font-sm hover:text-orange-400 hidden" id="close-detail-button">Close Detail</button>
    <button class="bg-orange-600 text-white rounded-xl px-4 mt-2 font-sm hover:bg-orange-400" id="get-recipe-btn">Get Recipe</button>
    </div>
    </div>`

    resultSec.innerHTML = html

    getSummary()
    openRecipeModal(index)
   // getRecipeData(`${result.instruction}`)
  })}
  )
}


// open and close nave bar on mobil view function
navBar.addEventListener("click", () => {
  navigation.classList.remove("hidden")
  navBar.classList.add("hidden")
})

closeNav.addEventListener("click", () => {
  navigation.classList.add("hidden")
  navBar.classList.remove("hidden")
})



// get random recipe function
const getRandomData = (a) => {
  let url = `https://api.spoonacular.com/recipes/random?apiKey=${key}&number=${a}`

  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let html = ""
    data.recipes.forEach((recipe, index) => {
    
    html += ` <div class="flex flex-col justify-center items-center" id="resultDiv" data-recipe-id="${recipe.id}" data-recipe-title="${recipe.title}" data-recipe-image="${recipe.image}" data-recipe-sourceUrl="${recipe.sourceUrl}" data-recipe-instruction="${recipe.instructions}">
    <div
      class="mb-4"
    >
      <img
        src="${recipe.image}"
        alt="recipe"
        class="rounded-full object-cover h-20 w-20 mt-8 trendy-img"
      />
    </div>
    <p class="mb-3 text-xl text-center font-bold">${recipe.title}</p>
    <button class=" text-orange-600 mt-2 font-sm hover:text-orange-400" id="detail-btn">Show Detail</button>
    <p class="text-sm px-2 hidden" id="summary">${recipe.summary}</p>
    <button class=" text-orange-600 mt-2 font-sm hover:text-orange-400 hidden" id="close-detail-button">Close Detail</button>
    <button class="bg-orange-600 text-white rounded-xl px-4 mt-2 font-sm hover:bg-orange-400" id="get-recipe-btn">Get Recipe</button>
    </div>
    </div>`
    trendySec.innerHTML = html
    getSummary()
    openRecipeModal(index)
  }
  )}
  )
} 

getRandomData(10)

reloadBtn.addEventListener("click", () => {
  getRandomData(10)
})


//modal function
const openRecipeModal = (index) => { 
  
  getRecipeBtn = document.querySelectorAll("#get-recipe-btn")
  getRecipeBtn.forEach(recipeBtn => {
    recipeBtn.addEventListener("click", (e) => {
      let recipeId = e.target.parentNode.getAttribute("data-recipe-id");
      let recipeTitle = e.target.parentNode.getAttribute("data-recipe-title");
      let recipeImage = e.target.parentNode.getAttribute("data-recipe-image");
      //let recipeInstrution = e.target.parentNode.getAttribute("data-recipe-instruction");
      let recipeSourceUrl = e.target.parentNode.getAttribute("data-recipe-sourceUrl");

      let modalInstruction = document.getElementById("instruction");
      let modalIngredients = document.getElementById("ingredients");
      let resultTitle = document.getElementById("result-title");
      let resultImage = document.getElementById("result-image");
      let goToSourceUrl = document.getElementById("go-to-source");

      resultImage.src = `${recipeImage}`
      resultTitle.innerText = `${recipeTitle}`
      
      goToSourceUrl.href = `${recipeSourceUrl}`

      fetch(`https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=${key}`)
      .then(res => res.json())
      .then(data => {
        let ingredients = data.ingredients.map(ingredent => ingredent.name).join(", ");
        modalIngredients.innerHTML = `<span class="text-orange-600 font-bold text-lg">Ingredients:</span> ${ingredients}`;
      })

      fetch(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${key}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        let instruction = data[0].steps.map(step => step.step).join("<br> ");
        modalInstruction.innerHTML = `<span class="text-orange-600 font-bold text-lg">Instruction:</span> ${instruction}`;
      })

      resultPopup.classList.remove("hidden");
  })
});
}


// modal close function
closeModal.addEventListener("click", () => {
  resultPopup.classList.add("hidden")
  modalInstruction.innerHTML = ""
  modalIngredients.innerHTML = ""
})

//window.addEventListener("click", (e) => {
 // if(e.target = resultPopup){
  //  resultPopup.classList.add("hidden")
  //}
//})
