import { useEffect, useState } from 'react';
import styles from './SingleTask.module.css';

const SingleTask = ({ tasks, id }) => {
  const [task, setTask] = useState('');

  const activeTask = tasks.filter((task) => task.id === id);
  useEffect(() => {
    setTask(activeTask[0].title + activeTask[0].text);
  }, [activeTask]);

  return (
    <div className={styles.wrapperTextarea}>
      <p>{`${activeTask[0].date} at ${activeTask[0].time}`}</p>
      <div>
        <textarea value={task} onChange={(e) => e.preventDefault()} />
      </div>
    </div>
  );
};

export default SingleTask;
