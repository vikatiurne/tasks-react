import styles from './ListItem.module.css';

const ListItem = ({ task, clickTackHandler }) => {
  const renderTaskInSideBar = (
    <li
      onClick={() => clickTackHandler(task.id)}
      className={task.isActive ? styles.active : null}
    >
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

  return <>{renderTaskInSideBar}</>;
};

export default ListItem;
