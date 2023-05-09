import React, { useRef, useState } from 'react';
import styles from './Create.module.css'

const CreateTask = ({ addTask, date, time }) => {
  const textarea = useRef();
  const [userText, setUserText] = useState('');

  const onChangeHandler = (e) => {
    setUserText(e.target.value);
  };

  const onBlurHandler = () => {
    const text = textarea.current.value;
    if (text.length) addTask(text, false);
    setUserText('');
  };

  const renderTaskInSingleTask = (
    <div className={styles.wrapperTextarea}>
      <p>{`${date} at ${time}`}</p>
      <div>
        <textarea
          ref={textarea}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          value={userText}
          name="usertext"
        />
      </div>
    </div>
  );
  //   console.log(activeTask);
  return <div>{renderTaskInSingleTask}</div>;
};

export default CreateTask;
