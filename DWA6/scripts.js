// Fully working scripts.js file

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books

const starting = document.createDocumentFragment()
/**
 * Render book previews based on a subset of `matches`.
 *
 * @param {Array} matches - An array of book objects containing author, id, image, and title.
 * @param {number} startIndex - The starting index for slicing the `matches` array.
 * @param {number} endIndex - The ending index for slicing the `matches` array.
 */
for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `

    starting.appendChild(element)
}

/**
 * Appends an element to a specified container in the DOM.
 *
 * @param {string} containerSelector - The CSS selector for the container.
 * @param {HTMLElement} element - The element to be appended to the container.
 */
const appendToContainer = (containerSelector, element) => {
    const container = document.querySelector(containerSelector);
    if (container) {
        container.appendChild(element);
    }
}

/**
 * Creates and returns an HTML 'option' element with the specified value and text.
 *
 * @param {string} value - The 'value' attribute for the option element.
 * @param {string} text - The text to be displayed in the option element.
 * @returns {HTMLOptionElement} The created option element.
 */
const createOptionElement = (value, text) => {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = text;
    return option;
}

// Search Overlay button
appendToContainer('[data-list-items]', starting);

const genreHtml = document.createDocumentFragment();
const firstGenreElement = createOptionElement('any', 'All Genres');
genreHtml.appendChild(firstGenreElement);

for (const [id, name] of Object.entries(genres)) {
    const element = createOptionElement(id, name);
    genreHtml.appendChild(element);
}

// Search Overlay button
/*
document.querySelector('[data-list-items]').appendChild(starting)

const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    genreHtml.appendChild(element)
}
*/

// Search genre
appendToContainer('[data-search-genres]', genreHtml);

const authorsHtml = document.createDocumentFragment();
const firstAuthorElement = createOptionElement('any', 'All Authors');
authorsHtml.appendChild(firstAuthorElement);

for (const [id, name] of Object.entries(authors)) {
    const element = createOptionElement(id, name);
    authorsHtml.appendChild(element);
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml)

// search genre
/*
document.querySelector('[data-search-genres]').appendChild(genreHtml)

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml)
*/

// Function to set the theme based on media query result
const setThemeBasedOnMediaQuery = () => {
    const themeInput = document.querySelector('[data-settings-theme]');
    const rootTheme = document.documentElement;
    const darkColor = '10, 10, 20';
    const lightColor = '255, 255, 255';

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeInput.value = 'night';
        rootTheme.style.setProperty('--color-dark', lightColor);
        rootTheme.style.setProperty('--color-light', darkColor);
    } else {
        themeInput.value = 'day';
        rootTheme.style.setProperty('--color-dark', darkColor);
        rootTheme.style.setProperty('--color-light', lightColor);
    }
}

// Call the function to set the theme
setThemeBasedOnMediaQuery();


// Setting theme - to dark and day
/*
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('[data-settings-theme]').value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    document.querySelector('[data-settings-theme]').value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}
*/

/**
 * Updates the "Show more" button's text and disabled state based on the remaining books to display.
 */
function showmoreoftheremainingbook() {
    const rootButton = document.querySelector('[data-list-button]');

    // Set the button text
    rootButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;

    // Disable the button if there are no more books to show
    rootButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0;
}

// Call the Function to see the remaining books
showmoreoftheremainingbook()

// show more button
/*
document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
*/

const searchCancelButton = document.querySelector('[data-search-cancel]')
const searchOverlay = document.querySelector('[data-search-overlay]')

searchCancelButton.addEventListener('click', () => {
    searchOverlay.open = false
})

const settingCancelbutton =  document.querySelector('[data-settings-cancel]')
const settingOverlay = document.querySelector('[data-settings-overlay]')

settingCancelbutton.addEventListener('click', () => {
    settingOverlay.open = false
})

const headerSearchButton = document.querySelector('[data-header-search]')
const searchTitle = document.querySelector('[data-search-title]')

headerSearchButton.addEventListener('click', () => {
    searchOverlay.open = true 
    searchTitle.focus()
})

const headerSettingButton = document.querySelector('[data-header-settings]')

headerSettingButton.addEventListener('click', () => {
    settingOverlay.open = true 
})

const listCloseButton = document.querySelector('[data-list-close]')
const listOverlay = document.querySelector('[data-list-active]')

listCloseButton.addEventListener('click', () => {
    listOverlay.open = false
})


// all the event listeners
/*
document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false
})

document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true 
    document.querySelector('[data-search-title]').focus()
})

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true 
})

document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false
})
*/

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    document.querySelector('[data-settings-overlay]').open = false
})

// Search
document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }

    document.querySelector('[data-list-items]').innerHTML = ''
    const newItems = document.createDocumentFragment()

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        newItems.appendChild(element)
    }

    document.querySelector('[data-list-items]').appendChild(newItems)
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        fragment.appendChild(element)
    }

    document.querySelector('[data-list-items]').appendChild(fragment)
    page += 1
})

// list item
document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        document.querySelector('[data-list-active]').open = true
        document.querySelector('[data-list-blur]').src = active.image
        document.querySelector('[data-list-image]').src = active.image
        document.querySelector('[data-list-title]').innerText = active.title
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})