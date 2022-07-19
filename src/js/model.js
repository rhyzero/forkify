import {async} from 'regenerator-runtime'
import { api_URL } from './config'
import { getJSON } from './helpers'
import recipeView from './views/recipeView'

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
    },
}

export const loadRecipe = async function(id) {
    try{
        const data = await getJSON(`${api_URL}/${id}`)

        const {recipe} = data.data
        state.recipe = {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients
        }
    }
    catch(err) {
        console.error(`${err} 🗿`)
        throw err;
    }
}

export const loadSearchResults = async function(search) {
    try{
        state.search.query = search
        const data = await getJSON(`${api_URL}?search=${search}`)
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url
            }
        })
    }catch(err) {
        throw err;
    }
}

