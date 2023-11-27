// Store implementation
export const createStore = (reducer) => {
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