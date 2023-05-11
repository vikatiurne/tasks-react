import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Create.module.css';
import TasksContext from '../../../context/TasksContext';

const CreateTask = () => {
  const textarea = useRef();
  const [userText, setUserText] = useState('');
  const [date, setDate] = useState('');
  const { addTask } = useContext(TasksContext);

  useEffect(() => {
    setDate(Date.now());
  }, []);

  const onChangeHandler = (e) => {
    setUserText(e.target.value);
  };

  const onBlurHandler = () => {
    const text = textarea.current.value;
    if (text.length) addTask(text, date);
    setUserText('');
  };

  const renderTaskInSingleTask = (
    <>
      <textarea
        ref={textarea}
        autoFocus
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        value={userText}
        name="userupdatedtext"
      />
    </>
  );
  return <div className={styles.wrapperTextarea}>{renderTaskInSingleTask}</div>;
};

export default CreateTask;
