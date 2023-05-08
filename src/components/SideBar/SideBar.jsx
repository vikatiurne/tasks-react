import ListItem from '../ListItem/ListItem';
import styles from './SideBar.module.css';

const SideBar = ({ allTasks }) => {
  const renderTaskList = allTasks.map((task) => 
     <ListItem sidebar task={task} key={task?.id} />
  );
  return (
    <aside className={styles.aside}>
      <ul>{renderTaskList}</ul>
    </aside>
    
  );
};

export default SideBar;
