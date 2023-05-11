import { useContext, useEffect, useState } from 'react';
import styles from './SingleTask.module.css';
import TasksContext from '../../../context/TasksContext';

const SingleTask = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const { tasks, id } = useContext(TasksContext);

  const activeTask = tasks.filter((task) => task.id === id);

  useEffect(() => {
    setDate(
      Intl.DateTimeFormat('ua', {
        day: 'numeric',
        month: 'long',
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
  }, [activeTask]);

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
