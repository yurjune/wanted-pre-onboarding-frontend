import { TodoType } from '../../model';
import { TodoItem } from '../TodoItem';
import styles from './index.module.scss';

interface TodoListProps {
  todos: TodoType[];
  deleteTodo: (id: number) => void;
  updateTodo: (item: TodoType) => void;
}

export const TodoList = (props: TodoListProps) => {
  const { todos, deleteTodo, updateTodo } = props;

  return (
    <ul className={styles.container}>
      {todos.map((item) => (
        <TodoItem key={item.id} item={item} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      ))}
    </ul>
  );
};
