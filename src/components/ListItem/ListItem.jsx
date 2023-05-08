import React from 'react';

import styles from './ListItem.module.css';

const ListItem = ({ task, sidebar }) => {

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
        <textarea />
      </div>
    </div>
  );

  return <>{sidebar ? renderTaskInSideBar : renderTaskInSingleTask}</>;
};

export default ListItem;
