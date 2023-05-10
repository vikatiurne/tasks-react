import { useEffect, useState } from 'react';
import styles from './SingleTask.module.css';

const SingleTask = ({ tasks, id, isShowSingleTask }) => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const activeTask = tasks.filter((task) => task.id === id);

  useEffect(() => {
    setDate(activeTask[0].date);
    setTime(activeTask[0].time);
    setTask(activeTask[0].title + activeTask[0].text);
  }, [isShowSingleTask, activeTask]);

  useEffect(() => {
    setTask(activeTask[0].title + activeTask[0].text);
  }, [activeTask]);

  return (
    <div className={styles.wrapperTextarea}>
      <p>{`${date} at ${time}`}</p>
      <div>
        <textarea value={task} onChange={(e) => e.preventDefault()} />
      </div>
    </div>
  );
};

export default SingleTask;
