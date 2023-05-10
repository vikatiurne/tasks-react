import { useEffect, useState } from 'react';
import styles from './SingleTask.module.css';

const SingleTask = ({ tasks, id, isShowSingleTask }) => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const activeTask = tasks.filter((task) => task.id === id);
  console.log(activeTask[0].date);
  useEffect(() => {
    setDate(
      Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(activeTask[0].date)
    );
    setTime(
      Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(activeTask[0].date)
    );
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
