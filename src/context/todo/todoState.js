import React, { useReducer } from 'react';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import {
  ADD_TODO,
  EDIT_TODO,
  REMOVE_TODO,
  CHANGE_SCREEN,
  SHOW_LOADER,
  HIDE_LOADER,
  HIDE_ERROR,
  SHOW_ERROR,
  FETCH_TODOS,
} from '../type';
import service from '../../service';
import { Alert } from 'react-native';

export const TodoState = ({ children }) => {
  const initState = {
    todos: [],
    todoId: null,
    error: null,
    loader: true,
  };

  const [state, dispatch] = useReducer(todoReducer, initState);
  const changeScreen = (id) => dispatch({ type: CHANGE_SCREEN, id });

  const addTodo = async (title) => {
    hideError();
    try {
      const data = await service.post({ title });
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (e) {
      showError(e);
    }
  };

  const fetchTodos = async () => {
    hideError();
    showLoader();
    try {
      const data = await service.get();
      const todos = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
      dispatch({ type: FETCH_TODOS, todos });
      hideLoader();
    } catch (e) {
      showError('Something got wrong...');
      hideLoader();
    }
  };

  const editTodo = async (title, id) => {
    hideError();
    try {
      await service.patch(id, { title });
      dispatch({ type: EDIT_TODO, title, id });
    } catch (e) {
      showError('Something got wrong...');
    }
  };

  const removeTodo = (id) => {
    const elemById = state.todos.find((todo) => todo.id === id);
    Alert.alert(
      'Delete element',
      `Are you sure you want to delete '${elemById.title}'?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            changeScreen(null);

            hideError();
            try {
              await service.delete(id);
              dispatch({ type: REMOVE_TODO, id });
            } catch (e) {
              showError('Something got wrong...');
            }
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.'
          ),
      }
    );
  };
  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const hideError = () => dispatch({ type: HIDE_ERROR });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  //const fetchTodos = (todos) => dispatch({ type: FETCH_TODOS, todos });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        todoId: state.todoId,
        error: state.error,
        loader: state.loader,
        addTodo,
        editTodo,
        removeTodo,
        changeScreen,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
