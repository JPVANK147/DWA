// Fully working scripts.js file

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1
let matches = books

const starting = document.createDocumentFragment()

class BookPreview {
    constructor(matches, starting, booksPerPage) {
        this.matches = matches
        this.starting = starting
        this.booksPerPage = booksPerPage
    }

    renderPreview() {
        const matchesToRender = this.matches.slice(0, this.booksPerPage)

        for (const { author, id, image, title } of matchesToRender) {
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

            this.starting.appendChild(element)
        }
    }
}

const booksPerPage = BOOKS_PER_PAGE

const bookPreviewRenderer = new BookPreview(matches, starting, booksPerPage)
bookPreviewRenderer.renderPreview()

/**
 * Render book previews based on a subset of matches
 *
 * @param {Array} matches - An array of book objects containing author, id, image, and title.
 * @param {number} startIndex - The starting index for slicing the `matches` array.
 * @param {number} endIndex - The ending index for slicing the `matches` array.
 */
/*
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
*/

/**
 * Appends an element to a specified container in the DOM
 *
 * @param {string} containerSelector - The CSS selector for the container
 * @param {HTMLElement} element - The element to be appended to the container
 */
const appendToContainer = (containerSelector, element) => {
    const container = document.querySelector(containerSelector)
    if (container) {
        container.appendChild(element)
    }
}

/**
 * Creates and returns an HTML 'option' element with the specified value and text
 *
 * @param {string} value - The 'value' attribute for the option element
 * @param {string} text - The text to be displayed in the option element
 * @returns {HTMLOptionElement} The created option element
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
 * Updates the "Show more" button's text and disabled state based on the remaining books to display
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

const settingCancelbutton = document.querySelector('[data-settings-cancel]')
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
 * Select the form element with a Overlay form and attach a submit event listener to it
 *
 * @param {Event} event - The submit event triggered by the form submission
 */
const settingOverlayForm = document.querySelector('[data-settings-form]')


settingOverlayForm.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault()

    // Create a FormData object from the submitted form data.
    const formData = new FormData(event.target)

    // Extract the 'theme' property from the form data and assign it to the 'theme' variable
    const { theme } = Object.fromEntries(formData)

    // Update the theme based on the selected option
    updateTheme(theme)

    // Close the Overlay
    settingOverlay.open = false
})

/**
 * Updates the theme of the application based on the selected option
 *
 * @param {string} selectedTheme - The selected theme ('night' or 'day')
 */
const updateTheme = (selectedTheme) => {
    const rootTheme = document.documentElement

    if (selectedTheme === 'night') {
        rootTheme.style.setProperty('--color-dark', '255, 255, 255')
        rootTheme.style.setProperty('--color-light', '10, 10, 20')
    } else {
        rootTheme.style.setProperty('--color-dark', '10, 10, 20')
        rootTheme.style.setProperty('--color-light', '255, 255, 255')
    }
}

/**
 * Handles the form submission for book searching and updates the displayed book list
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

/**
 * Event listener for the "Show more" button that loads and displays additional items
 */
const listButton = document.querySelector('[data-list-button]')
listButton.addEventListener('click', handleShowMoreClick)

/**
 * Handles the "Show more" button click by loading and displaying additional items
 */

function handleShowMoreClick() {
    const fragment = document.createDocumentFragment()
    const startOfPage = page * BOOKS_PER_PAGE
    const endOfPage = (page + 1) * BOOKS_PER_PAGE

    const itemsToDisplay = matches.slice(startOfPage, endOfPage)
    itemsToDisplay.forEach((book) => {
        const element = createPreview(book)
        fragment.appendChild(element)
    })

    listItems.appendChild(fragment)
    page += 1
}


/**
 * Creates a button element representing a book preview.
 *
 * @param {object} book - The book data to create the preview for
 * @returns {HTMLButtonElement} The created button element.
 */
function createPreview(book) {
    // Destructuring the book object to extract specific properties
    const { author, id, image, title } = book

    // Create a new button element
    const element = document.createElement('button')

    // Add the 'preview' class to the button element
    element.classList = 'preview'

    // Set the 'data-preview' attribute to the book's ID for identification
    element.setAttribute('data-preview', id)

    // Create the HTML structure for the preview element using template literals
    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        >

        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        `

    // Return the created element
    return element
}

// Selecting elements from the DOM using attribute selectors
const listItems = document.querySelector('[data-list-items]')
const listblurImage = document.querySelector('[data-list-blur]')
const listImage = document.querySelector('[data-list-image]')
const listTitle = document.querySelector('[data-list-title]')
const listSubtitle = document.querySelector('[data-list-subtitle]')
const listDescription = document.querySelector('[data-list-description]')

// Adding a click event listener to the 'listItems' element
listItems.addEventListener('click', (event) => {
    // Create an array of DOM elements from the event path
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null

            // Search for the book that matches the preview value in the 'books' array
            for (const singleBook of books) {
                if (result) break
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            }

            active = result
        }
    }

    // If an active book is found, display its details
    if (active) {
        displayBookDetails(active)
    }
})

// Function to display book details
const displayBookDetails = (active) => {
    listOverlay.open = true

    // Update the source of the blur and main book images, and set the title, subtitle, and description
    listblurImage.src = active.image
    listImage.src = active.image
    listTitle.innerText = active.title
    listSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    listDescription.innerText = active.description
}
