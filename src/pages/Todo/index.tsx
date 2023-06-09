import { useEffect, useReducer } from 'react';
import { TodoCreate, TodoList } from '../../components';
import styles from './index.module.scss';
import type { TodoType } from '../../model';
import api from '../../api';

type ActionType =
  | { type: 'LOAD'; todos: TodoType[] }
  | { type: 'CREATE'; todo: TodoType }
  | { type: 'UPDATE'; todo: TodoType }
  | { type: 'DELETE'; id: TodoType['id'] };

const todoReducer = (state: TodoType[], action: ActionType) => {
  switch (action.type) {
    case 'LOAD':
      return action.todos;
    case 'CREATE':
      return state.concat(action.todo);
    case 'UPDATE':
      return state.map((prevTodo) =>
        prevTodo.id === action.todo.id
          ? { ...prevTodo, todo: action.todo.todo, isCompleted: action.todo.isCompleted }
          : prevTodo
      );
    case 'DELETE':
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
          dispatch({ type: 'LOAD', todos: res.data });
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
          dispatch({ type: 'CREATE', todo: res.data });
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
          dispatch({ type: 'UPDATE', todo: item });
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteTodo = (id: number) => {
    api
      .deleteTodos(id)
      .then((res) => {
        if (res.status === 204) {
          dispatch({ type: 'DELETE', id });
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
