import styles from './index.module.scss';
import { useInput } from '../../hooks/useInput';

interface TodoCreateProps {
  createTodo: (value: string) => void;
}

export const TodoCreate = ({ createTodo }: TodoCreateProps) => {
  const [value, handleValueChange, setValue] = useInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === '') {
      return;
    }

    createTodo(value);
    setValue('');
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <input data-testid='new-todo-input' value={value} onChange={handleValueChange} />
      <button data-testid='new-todo-add-button' type='submit'>
        추가
      </button>
    </form>
  );
};
