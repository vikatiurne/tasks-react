import React, { useEffect, useRef, useState } from 'react';
import styles from './Create.module.css';

const CreateTask = ({ addTask }) => {
  const textarea = useRef();
  const [userText, setUserText] = useState('');
  const [date, setDate] = useState('');
  // const [time, setTime] = useState('');

  useEffect(() => {
    setDate(Date.now());
    // setTime(Date.now());
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
