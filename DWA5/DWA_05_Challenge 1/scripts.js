// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  if (!dividend || !divider) {
    result.innerHTML = "Division not performed. Both values are required in inputs. Try again";
  } else {
    const dividendValve = parseInt(dividend);
    const dividerValve = parseInt(divider);

    if (isNaN(dividendValve) || isNaN(dividerValve)) {
      alert("Something critical went wrong. Please reload the page");
      console.error("Call stack");
    } else if (dividerValve === -3) {
      result.innerHTML = "Division not performed. Invalid number provided. Try again";
      console.error("Call stack");
    } else {
      const noDecimalNumber = dividendValve / dividerValve;
      result.innerText = Math.floor(noDecimalNumber);
    }
  }
});


/*
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  if (!dividend || !divider) {
    result.innerHTML = "Division not performed. Both values are required in inputs. Try again";
  } else {
    const dividendValve = parseInt(dividend);
    const dividerValve = parseInt(divider);

    if (isNaN(dividendValve) || isNaN(dividerValve) || dividerValve === -3) {
      result.innerHTML = "Division not performed. Invalid number provided. Try again";
      console.error("Call stack");
    } else if (isNaN(dividendValve) || isNaN(dividerValve)) {
      alert("Something critical went wrong. Please reload the page");
      console.error("Call stack");
    } else {
      const noDecimalNumber = dividendValve / dividerValve;
      result.innerText = Math.floor(noDecimalNumber);
    }
  }
});
*/
