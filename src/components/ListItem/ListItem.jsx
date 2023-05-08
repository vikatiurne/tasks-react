import React, { useRef, useState } from 'react';

import styles from './ListItem.module.css';

const ListItem = ({ task, sidebar, addTask, clickedAdd }) => {
  console.log(addTask);
  const [userText, setUserText] = useState('');
  const textarea = useRef();

  const onChangeHandler = (e) => {
    setUserText(e.target.value);
  };

  const onBlurHandler = () => {
    const text = textarea.current.value;
    if (userText.length) addTask(text);
  };

  const renderTaskInSideBar = (
    <li>
      <p>
        <b>
          {task?.title.length > 20
            ? task?.title.substring(0, 20) + '...'
            : task?.title}
        </b>
      </p>
      <p className={styles.time}>{`${task?.time} ${
        task?.text.length > 20
          ? `${task?.text.substring(0, 20)}...`
          : task?.text
      }`}</p>
      <hr />
    </li>
  );

  const renderTaskInSingleTask = (
    <div className={styles.wrapperTextarea}>
      <p>{`${task?.date} at ${task?.time}`}</p>
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

  return (
    <>
      {sidebar
        ? renderTaskInSideBar
        : clickedAdd
        ? renderTaskInSingleTask
        : null}
    </>
  );
};

export default ListItem;
