import { createStore } from './model/store';
import { tallyReducer } from './model/reducers';
import { add, subtract, reset } from './model/actions';

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