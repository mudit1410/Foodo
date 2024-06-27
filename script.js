const searchBox = document.querySelector('.search-box')
const searchBtn = document.querySelector('.btn')
const recipeContainer = document.querySelector('.recipe-container')
const recipeDetailContent = document.querySelector('.recipe-detail-content')
const recipeCloseBtn = document.querySelector(".recipe-close-btn")


async function fetchRecipes(query) {
    try{
        recipeContainer.innerHTML="<h2>Fetching recipes......<h2>";
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const data = await response.json();
        recipeContainer.innerHTML="";
        data.meals.forEach(meal => {
            const recipeDiv = document.createElement('div')
            recipeDiv.classList.add('recipe')
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea}</p>
            <p>${meal.strCategory}</p>
            `
            recipeContainer.appendChild(recipeDiv)

        const button = document.createElement('button')
        button.textContent = "View Recipe"
        recipeDiv.appendChild(button) 

        button.addEventListener('click' , () =>{
            openRecipePopup(meal);
        })
        })
    }catch(error){
        recipeContainer.innerHTML="<h2>Error in fetching recipes....<h2"
    }
}

const fetchIngredients = (meal)  =>{
    let ingredientsList = ""
    for ( let i=1;i<=20;i++){
        const ingredients = meal[`strIngredient${i}`]
        if(ingredients){
            const measure = meal[`strMeasure${i}`]
            ingredientsList += `<li>${measure} ${ingredients}</li>`
        }
        else{
            break
        }
    }
    return ingredientsList
}

const openRecipePopup = (meal) =>{
    recipeDetailContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 class="ingredients">Ingredients:</h3>
    <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
    <div>
        <h3 class="instructions">Instructions:</h3>
        <p class="instructionsDetails">${meal.strInstructions}</p>
    </div>
    `
    recipeDetailContent.parentElement.style.display='block'
}

recipeCloseBtn.addEventListener('click', () =>{
    recipeDetailContent.parentElement.style.display="none"
})

searchBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    const searchInput = searchBox.value;  
    if(!searchInput){
        recipeContainer.innerHTML="<h2>Enter the meal name in the search box</h2>"
        return
    }  
    fetchRecipes(searchInput)
    console.log('button clicked')
})