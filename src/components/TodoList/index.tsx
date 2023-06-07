import { TodoType } from '../../model';
import { TodoItem } from '../TodoItem';
import styles from './index.module.scss';

interface TodoListProps {
  todos: TodoType[];
}

export const TodoList = (props: TodoListProps) => {
  const { todos } = props;

  return (
    <ul className={styles.container}>
      {todos.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
