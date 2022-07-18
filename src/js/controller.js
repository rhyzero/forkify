import * as model from './model.js'
import recipeView from './views/recipeView.js'


import 'core-js/stable'
import 'regenerator-runtime/runtime'

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function() {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return
    console.log(id);
    recipeView.renderSpinner(recipeContainer);
    //1. Getting recipe from API
    await model.loadRecipe(id);
    //2. Rendering recipe
    recipeView.render(model.state.recipe)
  }
  catch(err){
    recipeView.renderError()
  }
};

const init = function() {
  recipeView.addHandlerRender(showRecipe)
}
init();