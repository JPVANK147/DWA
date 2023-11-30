import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class TallyApp extends LitElement {
  static styles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: darkred;
    border: 10px solid black; 
  }
  
  .body {
    width: 600px;
    height: 600px;
    padding: 50px;
    border: 10px solid black;
    background-color: silver;
  }

  h1 {
    font-size: 72px;
    text-shadow: 0 0 3px #FF0000;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .counter {
    font-size: 60px;
    display: flex;
    justify-content: center;
    text-shadow: 0 0 3px #FF0000;
  }
  
  .containerButton {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  button {
    font-size: 32px;
    margin: 5px 5px;
    padding: 20px 50px;
    cursor: pointer;
    background-color: darkred;
    border: 0 0 3px;
    color: black;
    text-shadow: 0 0 3px #FF0000;
    text-align: center;
    display: inline-block;
    border-radius: 12px;
    width: 45%;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }
  
  .message {
    font-size: 25px;
    display: flex;
    justify-content: center;
    text-shadow: 0 0 3px #FF0000;
    padding: 50px;
    color: black;
  }
  
  .reached {
    font-size: 25px;
    display: flex;
    justify-content: center;
    color: black;
    text-shadow: 0 0 3px #FF0000;
  }
  `;

  static properties = {
    count: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
  }

  increased() {
    if (this.count < 20) {
      this.count += 1;
      this.requestUpdate();
    }
  }

  decreased() {
    if (this.count > -20) {
      this.count -= 1;
      this.requestUpdate(); // Update the component
    }
  }

  render() {
    return html`
        <div class=body>
          <h1>
            Tally Counter
          </h1>
          <p class="counter">
            ${this.count}
          </p>
          <div class="containerButton">
            <button @click="${this.increased}">+</button>
            <button @click="${this.decreased}">-</button>
          </div>
          <div class="message">
            Thank you for using my Tally Counter
          </div>
          <div class="reached">
            Maximum Reached = 20 Minimum Reached = -20
          </div>
        </div>
      `;
  }
}

customElements.define('tally-app', TallyApp);