import { useEffect, useReducer } from 'react';
import { TodoList } from '../../components/TodoList';
import { useInput } from '../../hooks/useInput';
import styles from './index.module.scss';
import type { TodoType } from '../../model';
import services from '../../service';

type ActionType =
  | { type: 'load'; todos: TodoType[] }
  | { type: 'create'; todo: TodoType }
  | { type: 'delete'; todo: TodoType }
  | { type: 'toggle'; todo: TodoType };

const todoReducer = (state: TodoType[], action: ActionType) => {
  switch (action.type) {
    case 'load':
      return action.todos;
    case 'create':
      return state.concat(action.todo);
    case 'delete':
      return state.filter((todo) => todo.id !== action.todo.id);
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.todo.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
  }
};

export const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [value, handleValueChange] = useInput('');

  useEffect(() => {
    services
      .getTodos()
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: 'load', todos: res.data });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = { todo: value };
    services
      .createTodos(body)
      .then((res) => {
        if (res.status === 201) {
          dispatch({ type: 'create', todo: res.data });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.container}>
      <form className={styles.register} onSubmit={createTodo}>
        <input data-testid='new-todo-input' value={value} onChange={handleValueChange} />
        <button data-testid='new-todo-add-button' type='submit'>
          추가
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
