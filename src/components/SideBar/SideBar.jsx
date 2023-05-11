import ListItem from '../ListItem/ListItem';
import styles from './SideBar.module.css';

const SideBar = ({
  allTasks,
  addTask,
  clickedAdd,
  clickTackHandler,
  searchText,
}) => {
  allTasks.sort((a, b) => b.date - a.date);
  const searchTasks = allTasks.filter((task) => {
    return (
      task.text.toLowerCase().includes(searchText.toLowerCase()) ||
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  const renderTaskList = searchTasks.map((task) => (
    <ListItem task={task} key={task?.id} />
  ));
  return (
    <aside className={styles.aside}>
      <ul>{renderTaskList}</ul>
    </aside>
  );
};

export default SideBar;
