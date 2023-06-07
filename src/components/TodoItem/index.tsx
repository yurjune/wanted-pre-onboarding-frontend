import { TodoType } from '../../model';
import styles from './index.module.scss';

interface TodoItemProps {
  item: TodoType;
}

export const TodoItem = (props: TodoItemProps) => {
  const { item } = props;

  return (
    <li className={styles.item}>
      <label>
        <input type='checkbox' />
        <span>{item.todo}</span>
      </label>
      <button data-testid='modify-button'>수정</button>
      <button data-testid='delete-button'>삭제</button>
    </li>
  );
};
