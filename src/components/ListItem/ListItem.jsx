import styles from './ListItem.module.css';

const ListItem = ({ task, clickTackHandler }) => {
  const dateInDB = task?.date;
  const currentDay = Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(task.date);
  const startDate = Date.parse(currentDay);
  const deffTime = dateInDB - startDate < 86400000;

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
      <p className={styles.time}>
        <span>
          {deffTime
            ? `${Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              }).format(task?.date)} `
            : `${Intl.DateTimeFormat('en', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              }).format(task?.date)} `}
        </span>
        {` ${
          task?.text.length > 20
            ? `${task?.text.substring(0, 20)}...`
            : task?.text
        }`}
      </p>
      <hr />
    </li>
  );

  return <>{renderTaskInSideBar}</>;
};

export default ListItem;
