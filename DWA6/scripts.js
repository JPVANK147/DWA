// Fully working scripts.js file

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1
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
    const container = document.querySelector(containerSelector)
    if (container) {
        container.appendChild(element)
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
    const option = document.createElement('option')
    option.value = value
    option.innerText = text
    return option
}

// Search Overlay button
appendToContainer('[data-list-items]', starting)

const genreHtml = document.createDocumentFragment()
const firstGenreElement = createOptionElement('any', 'All Genres')
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = createOptionElement(id, name)
    genreHtml.appendChild(element)
}

// Search genre
appendToContainer('[data-search-genres]', genreHtml)

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = createOptionElement('any', 'All Authors')
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = createOptionElement(id, name)
    authorsHtml.appendChild(element)
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml)

// Function to set the theme based on media query result
const setThemeBasedOnMediaQuery = () => {
    const themeInput = document.querySelector('[data-settings-theme]')
    const rootTheme = document.documentElement
    const darkColor = '10, 10, 20'
    const lightColor = '255, 255, 255'

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeInput.value = 'night'
        rootTheme.style.setProperty('--color-dark', lightColor)
        rootTheme.style.setProperty('--color-light', darkColor)
    } else {
        themeInput.value = 'day'
        rootTheme.style.setProperty('--color-dark', darkColor)
        rootTheme.style.setProperty('--color-light', lightColor)
    }
}

// Call the function to set the theme
setThemeBasedOnMediaQuery()

/**
 * Updates the "Show more" button's text and disabled state based on the remaining books to display.
 */
function showmoreoftheremainingbook() {
    const rootButton = document.querySelector('[data-list-button]')

    // Set the button text
    rootButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    // Disable the button if there are no more books to show
    rootButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0
}

// Call the Function to see the remaining books
showmoreoftheremainingbook()

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

/**
 * Select the form element with a Overlay form and attach a submit event listener to it.
 *
 * @param {Event} event - The submit event triggered by the form submission.
 */
const settingOverlayForm = document.querySelector('[data-settings-form]')

settingOverlayForm.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior.
    event.preventDefault()

    // Create a FormData object from the submitted form data.
    const formData = new FormData(event.target)

    // Extract the 'theme' property from the form data and assign it to the 'theme' variable.
    const { theme } = Object.fromEntries(formData)

    // Check the selected theme and set CSS custom properties accordingly.
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255')
        document.documentElement.style.setProperty('--color-light', '10, 10, 20')
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20')
        document.documentElement.style.setProperty('--color-light', '255, 255, 255')
    }

    // Close the Overlay
    settingOverlay.open = false
})

/**
 * Handles the form submission for book searching and updates the displayed book list.
 *
 * @param {Event} event - The form submission event.
 */
const searchForm = document.querySelector('[data-search-form]')

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    // Get the form data and apply filters
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    // Iterate through the books and apply filters
    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break
            if (singleGenre === filters.genre) {
                genreMatch = true
            }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === 'any' || book.author === filters.author) &&
            genreMatch
        ) {
            result.push(book)
        }
    }

    // Update page and matches
    page = 1
    matches = result

    // Show or hide the list message based on the search results
    const listMessage = document.querySelector('[data-list-message]')
    if (result.length < 1) {
        listMessage.classList.add('list__message_show')
    } else {
        listMessage.classList.remove('list__message_show')
    }

    // Update the displayed book list
    const listItems = document.querySelector('[data-list-items]')
    listItems.innerHTML = ''
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

    listItems.appendChild(newItems)

    // Update the "Show more" button
    const listButton = document.querySelector('[data-list-button]')
    listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    listButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;

    // Scroll to the top of the page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Close the search overlay
    const searchOverlay = document.querySelector('[data-search-overlay]')
    searchOverlay.open = false
})

// list item
/**
 * Event listener for the "Show more" button that loads and displays additional items.
 */
const listButton = document.querySelector('[data-list-button]')
listButton.addEventListener('click', () => {
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
        `;

        fragment.appendChild(element)
    }

    listItems.appendChild(fragment)
    page += 1
});

/**
 * Event listener for item clicks within the list. Displays item details in an overlay.
 */
const listItems = document.querySelector('[data-list-items]')
const listblurImage = document.querySelector('[data-list-blur]')
const listImage = document.querySelector('[data-list-image]')
const listTitle = document.querySelector('[data-list-title]')
const listSubtitle = document.querySelector('[data-list-subtitle]')
const listDescription = document.querySelector('[data-list-description]')

listItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null

            for (const singleBook of books) {
                if (result) break
                if (singleBook.id === node?.dataset?.preview) result = singleBook;
            }

            active = result;
        }
    }

    if (active) {
        listOverlay.open = true
        listblurImage.src = active.image
        listImage.src = active.image
        listTitle.innerText = active.title
        listSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        listDescription.innerText = active.description
    }
})
