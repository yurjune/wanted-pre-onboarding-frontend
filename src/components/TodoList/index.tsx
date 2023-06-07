import { TodoType } from '../../model';
import { TodoItem } from '../TodoItem';

interface TodoListProps {
  todos: TodoType[];
}

export const TodoList = (props: TodoListProps) => {
  const { todos } = props;

  return (
    <>
      {todos.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </>
  );
};
