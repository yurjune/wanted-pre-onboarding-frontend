import { useState } from 'react';
import { TodoType } from '../../model';
import styles from './index.module.scss';
import { useInput } from '../../hooks/useInput';

interface TodoItemProps {
  item: TodoType;
  deleteTodo: (id: number) => void;
  updateTodo: (item: TodoType) => void;
}

export const TodoItem = (props: TodoItemProps) => {
  const { item, deleteTodo, updateTodo } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [checked, setChecked] = useState(item.isCompleted);
  const [value, handleValueChange, setValue] = useInput(item.todo);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo({ ...item, isCompleted: e.target.checked });
    setChecked(e.target.checked);
  };

  const handleModifyButtonClick = () => {
    setIsEdit(true);
  };

  const handleDeleteButtonClick = () => {
    deleteTodo(item.id);
  };

  const handleSubmitButtonClick = () => {
    if (value === '') {
      return;
    }

    setIsEdit(false);
    updateTodo({ ...item, todo: value });
  };

  const handleCancelButtonClick = () => {
    setIsEdit(false);
    setValue(item.todo);
  };

  return (
    <li className={styles.item}>
      <label>
        <input
          className={styles.checkbox}
          type='checkbox'
          checked={checked}
          onChange={handleCheckboxChange}
        />
        {!isEdit ? <span>{value}</span> : null}
      </label>
      {!isEdit ? (
        <div className={styles.buttonWrapper}>
          <button data-testid='modify-button' onClick={handleModifyButtonClick}>
            수정
          </button>
          <button data-testid='delete-button' onClick={handleDeleteButtonClick}>
            삭제
          </button>
        </div>
      ) : (
        <>
          <input
            data-testid='modify-input'
            className={styles.modifyInput}
            type='text'
            value={value}
            onChange={handleValueChange}
          />
          <div className={styles.buttonWrapper}>
            <button data-testid='submit-button' onClick={handleSubmitButtonClick}>
              제출
            </button>
            <button data-testid='cancel-button' onClick={handleCancelButtonClick}>
              취소
            </button>
          </div>
        </>
      )}
    </li>
  );
};
