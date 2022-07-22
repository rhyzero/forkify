import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime'

// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function() {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return
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

const controlSearchResults = async function() {
  try{
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return
    
    await model.loadSearchResults(query)

    //resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultPage())
    paginationView.render(model.state.search)
  }catch(err){
    throw err;
    console.error(err)
  }
}

controlSearchResults();

const controlPagination = function(goToPage) {
    resultsView.render(model.getSearchResultPage(goToPage))
    paginationView.render(model.state.search)
}

const init = function() {
  recipeView.addHandlerRender(showRecipe)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init();