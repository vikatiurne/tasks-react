import CreateTask from './CreateTask/CreateTask';
import EditPage from './EditPage/EditPage';
import SingleTask from './SinsleTask/SingleTask';

const WorkSpace = (props) => {
  const {
    addTask,
    clickedAdd,
    tasks,
    id,
    clickedEdit,
    clickedSearch,
    isShowSingleTask,
    editTask,
  } = props;
  return (
    <>
      {clickedAdd && <CreateTask addTask={addTask} />}
      {clickedEdit && <EditPage tasks={tasks} id={id} editTask={editTask} />}
      {isShowSingleTask && !clickedSearch && (
        <SingleTask tasks={tasks} id={id} />
      )}
    </>
  );
};

export default WorkSpace;
