import { useEffect, useReducer } from 'react';
import { TodoList } from '../../components';
import { useInput } from '../../hooks/useInput';
import styles from './index.module.scss';
import type { TodoType } from '../../model';
import services from '../../service';

type ActionType =
  | { type: 'load'; items: TodoType[] }
  | { type: 'create'; item: TodoType }
  | { type: 'update'; item: TodoType }
  | { type: 'delete'; id: TodoType['id'] };

const todoReducer = (state: TodoType[], action: ActionType) => {
  switch (action.type) {
    case 'load':
      return action.items;
    case 'create':
      return state.concat(action.item);
    case 'update':
      return state.map((prev) =>
        prev.id === action.item.id
          ? { ...prev, todo: action.item.todo, isCompleted: action.item.isCompleted }
          : prev
      );
    case 'delete':
      return state.filter((prev) => prev.id !== action.id);
  }
};

export const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [value, handleValueChange, setValue] = useInput('');

  useEffect(() => {
    services
      .getTodos()
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: 'load', items: res.data });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === '') {
      return;
    }

    const body = { todo: value };
    services
      .createTodos(body)
      .then((res) => {
        if (res.status === 201) {
          dispatch({ type: 'create', item: res.data });
          setValue('');
        }
      })
      .catch((err) => console.error(err));
  };

  const updateTodo = (item: TodoType) => {
    const { id, todo, isCompleted } = item;
    const body = { todo, isCompleted };

    services
      .updateTodos(id, body)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: 'update', item });
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteTodo = (id: number) => {
    services
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
      <form className={styles.registerForm} onSubmit={createTodo}>
        <input data-testid='new-todo-input' value={value} onChange={handleValueChange} />
        <button data-testid='new-todo-add-button' type='submit'>
          추가
        </button>
      </form>
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  );
};
