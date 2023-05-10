import React, { useEffect, useRef, useState } from 'react';
import styles from './Create.module.css';

const CreateTask = ({ addTask }) => {
  const textarea = useRef();
  const [userText, setUserText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    setDate(
      new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    );
    setTime(
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }, []);

  const onChangeHandler = (e) => {
    setUserText(e.target.value);
  };

  const onBlurHandler = () => {
    const text = textarea.current.value;
    if (text.length) addTask(text, date, time);
    setUserText('');
  };

  const renderTaskInSingleTask = (
    <>
      {/* <p>{`${date} at ${time}`}</p> */}
      <div>
        <textarea
          ref={textarea}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          value={userText}
          name="userupdatedtext"
        />
      </div>
    </>
  );
  return <div className={styles.wrapperTextarea}>{renderTaskInSingleTask}</div>;
};

export default CreateTask;
