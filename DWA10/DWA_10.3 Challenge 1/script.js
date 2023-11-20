let count = 0;
const number = document.querySelector('[data-key="counter"]');
const increase = document.querySelector('[data-key="add"]');
const decrease = document.querySelector('[data-key="subtract"]');
const reset = document.querySelector('[data-key="reset"]');

const increaseHandler = () => {
    count = count + 1
    updateCounter();
}

const decreaseHandler = () => {
    // if (count > 0) {
    //    count = count - 1 
    //    updateCounter();
    count = count - 1
    updateCounter();
}

const updateCounter = () => {
    number.textContent = count;
}

const resetHandler = () => {
    if (count !== 0) {
        const confirmedMessage = confirm('Are you sure you want to reset the counter?')
        if (confirmedMessage) {
            count = 0;
            updateCounter();
        }
    } else {
        alert('Counter is already at 0');
    }
}

increase.addEventListener('click', increaseHandler);
decrease.addEventListener('click', decreaseHandler);
reset.addEventListener('click', resetHandler);