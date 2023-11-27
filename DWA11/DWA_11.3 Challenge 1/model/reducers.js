// Reducer function to manage state changes
export const tallyReducer = (state = { count: 0 }, action) => {
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