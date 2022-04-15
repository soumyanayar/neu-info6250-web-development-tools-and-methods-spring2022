export const initialState = {
  isPageLoading: false,
  isLoggedIn: false,
  username: "",
  todos: {},
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_PAGE_LOADING":
      return {
        ...state,
        isPageLoading: !state.isPageLoading,
      };
    case "FETCH_TODOS":
      return {
        ...state,
        todos: action.fetchedTodos,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.todo.id]: action.todo,
        },
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: {
          ...state.todos,
          todos: state.todos.filter((todo) => todo.id !== action.id),
        },
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.todos]: {
            ...state.todos[action.id],
            done: !state.todos[action.id].done,
          },
        },
      };
    case "LOGOUT":
      return {
        ...state,
        username: "",
        todos: [],
        isLoggedIn: false,
      };
    case "LOGIN":
      return {
        ...state,
        todos: action.todos,
        isLoggedIn: true,
      };

    case "FETCH_USER":
      return {
        ...state,
        username: action.user,
        // todos: action.todos,
        isLoggedIn: true,
      };
    default:
      return state;
  }
}
