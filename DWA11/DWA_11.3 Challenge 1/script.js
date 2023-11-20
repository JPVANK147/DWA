// Define action types
const add = 'ADD';
const subtract = 'SUBTRACT';
const reset = 'RESET';

// Reducer function to manage state changes
const tallyReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case add:
      return { count: state.count + 1 };
    case subtract:
      return { count: state.count - 1 };
    case reset:
      return { count: 0 };
    default:
      return state;
  }
};

// Store implementation
const createStore = (reducer) => {
  let state = undefined;
  const subscribers = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((subscriber) => subscriber());
  };

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    };
  };

  // Initialize state
  dispatch({});

  return { getState, dispatch, subscribe };
};

// Create the store with the tallyReducer
const tallyStore = createStore(tallyReducer);

// Scenario: Increment the counter by one
console.log("Scenario 1:");
console.log("State:", tallyStore.getState().count);

// Scenario: Increment the counter by one
console.log("Scenario 2:");
const unsubscribeScenario2 = tallyStore.subscribe(() => {
  console.log("Updated State:", tallyStore.getState().count);
});

tallyStore.dispatch({ type: add });
tallyStore.dispatch({ type: add });

unsubscribeScenario2();

// Scenario: Increment the counter by one
console.log("Scenario 3:");
const unsubscribeScenario3 = tallyStore.subscribe(() => {
  console.log("Updated State:", tallyStore.getState().count);
});
tallyStore.dispatch({ type: subtract });

unsubscribeScenario3();

// Scenario: Resetting the Tally Counter
console.log('Scenario 4:');
const unsubscribeScenario4 = tallyStore.subscribe(() => {
  console.log("Updated State:", tallyStore.getState().count);
});

tallyStore.dispatch({ type: reset });
unsubscribeScenario4();
