
const template = document.createElement('template')

template.innerHTML = /* html */ `
<style>
        .header-container {
            text-align: center;
            font-size: 24px;
            display: flex;
            align-items: center;
            background-color: grey;
            padding: 10px;
            justify-content: center;
        }

        .books-header {
            background-color: grey;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 24px;
        }

        .header__shape {
            height: 1rem;
            margin-right: 0.75rem;
            fill: rgb(var(--color-blue));
        }
</style>
<div class="header-container">
    <svg class="header__shape" viewBox="0 0 89 68" xmlns="http://www.w3.org/2000/svg">
        <path d="M52.88 57.62 4.126 37.897a3 3 0 0 0-2.25 5.562L58.95 66.55a11.062 11.062 0 0 0 2.1.849l.154.062c.351.142.714.213 1.071.22 5.35.912 10.682-2.253 12.34-7.577l14.27-45.83C90.694 8.473 87.456 2.307 81.654.5c-5.8-1.806-11.966 1.432-13.773 7.233l-8.23 26.429L49.03 4.479a5 5 0 1 0-9.415 3.37l14.04 39.23-31.087-31.085a4 4 0 1 0-5.657 5.656l35.97 35.97Z"></path>
    </svg>
    <div class="books-header"></div>
</div>`

class listofbooks extends HTMLElement {
    /**
     * @type {string}
     */
    title = this.getAttribute("title")

    /**
     * @type {boolean}
     */
    completed = this.getAttribute("completed") !== null

    /**
     * @type {ShadowRoot}
     */
    inner = this.attachShadow({ mode: "closed" })

    constructor() {
        super()
        this.inner.appendChild(template.content)
    }

    connectedCallback() {
        const titleElement = this.inner.querySelector('.books-header')
        titleElement.textContent = this.title
    }
}

customElements.define("list-of-books", listofbooks)


