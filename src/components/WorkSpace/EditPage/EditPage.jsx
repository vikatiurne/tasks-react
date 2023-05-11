import { useContext, useRef, useState } from 'react';

import styles from './EditPage.module.css';
import TasksContext from '../../../context/TasksContext';

const EditPage = () => {
  const { tasks, id, editTask } = useContext(TasksContext)
  const activeTask = tasks.filter((task) => task.id === id);
  
  const prevText = activeTask[0].title + activeTask[0].text;
  const [updatedTask, setUpdatedTask] = useState(prevText);
  const textarea = useRef();

  const onBlurHandler = () => {
    const text = textarea.current.value;
    if (text.length) editTask(text, id, true);
    setUpdatedTask('');
  };

  return (
    <div className={styles.wrapperTextarea}>
      <textarea
      autoFocus
        ref={textarea}
        value={updatedTask}
        onBlur={onBlurHandler}
        onChange={(e) => {
          setUpdatedTask(e.target.value);
        }}
      />
    </div>
  );
};

export default EditPage;
