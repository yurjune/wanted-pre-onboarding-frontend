import { useEffect, useReducer } from 'react';
import { TodoCreate, TodoList } from '../../components';
import styles from './index.module.scss';
import type { TodoType } from '../../model';
import api from '../../api';

type ActionType =
  | { type: 'load'; todos: TodoType[] }
  | { type: 'create'; todo: TodoType }
  | { type: 'update'; todo: TodoType }
  | { type: 'delete'; id: TodoType['id'] };

const todoReducer = (state: TodoType[], action: ActionType) => {
  switch (action.type) {
    case 'load':
      return action.todos;
    case 'create':
      return state.concat(action.todo);
    case 'update':
      return state.map((prevTodo) =>
        prevTodo.id === action.todo.id
          ? { ...prevTodo, todo: action.todo.todo, isCompleted: action.todo.isCompleted }
          : prevTodo
      );
    case 'delete':
      return state.filter((prevTodo) => prevTodo.id !== action.id);
  }
};

export const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    api
      .getTodos()
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: 'load', todos: res.data });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const createTodo = (value: string) => {
    const body = { todo: value };
    api
      .createTodos(body)
      .then((res) => {
        if (res.status === 201) {
          dispatch({ type: 'create', todo: res.data });
        }
      })
      .catch((err) => console.error(err));
  };

  const updateTodo = (item: TodoType) => {
    const { id, todo, isCompleted } = item;
    const body = { todo, isCompleted };

    api
      .updateTodos(id, body)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: 'update', todo: item });
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteTodo = (id: number) => {
    api
      .deleteTodos(id)
      .then((res) => {
        if (res.status === 204) {
          dispatch({ type: 'delete', id });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.container}>
      <h2>할일 목록</h2>
      <TodoCreate createTodo={createTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  );
};
