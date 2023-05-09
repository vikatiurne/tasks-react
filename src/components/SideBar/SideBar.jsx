import ListItem from '../ListItem/ListItem';
import styles from './SideBar.module.css';

const SideBar = ({ allTasks, addTask, clickedAdd, clickTackHandler }) => {
  const renderTaskList = allTasks.map((task) => (
    <ListItem
      addTask={addTask}
      clickedAdd={clickedAdd}
      clickTackHandler={clickTackHandler}
      task={task}
      key={task?.id}
    />
  ));
  return (
    <aside className={styles.aside}>
      <ul>{renderTaskList}</ul>
    </aside>
  );
};

export default SideBar;
