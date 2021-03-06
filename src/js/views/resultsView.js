import View from './view'
import icons from 'url:../../img/icons.svg'

class resultsView extends View{
    _parentElement = document.querySelector('.results')
    _errorMessage = 'No recipes found for your search. Please try again!'
    _message = ''
    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('')
        
    }
    _generateMarkupPreview(results) {
        return `
        <li class="preview">
            <a class="preview__link " href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
              </div>
            </a>
          </li>
        `
    }
}

export default new resultsView()