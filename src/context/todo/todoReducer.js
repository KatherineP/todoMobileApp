import {
  ADD_TODO,
  REMOVE_TODO,
  EDIT_TODO,
  CHANGE_SCREEN,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  HIDE_ERROR,
  FETCH_TODOS,
} from '../type';

const handlers = {
  [ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todos: [...state.todos, { id, title }],
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter((item) => item.id !== id),
  }),
  [EDIT_TODO]: (state, { title, id }) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    }),
  }),
  [CHANGE_SCREEN]: (state, { id }) => ({
    ...state,
    todoId: id,
  }),
  [SHOW_LOADER]: (state) => ({
    ...state,
    loader: true,
  }),
  [HIDE_LOADER]: (state) => ({
    ...state,
    loader: false,
  }),
  [HIDE_ERROR]: (state) => ({
    ...state,
    error: null,
  }),
  [SHOW_ERROR]: (state, { error }) => ({
    ...state,
    error,
  }),
  [FETCH_TODOS]: (state, { todos }) => ({
    ...state,
    todos,
  }),
  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
