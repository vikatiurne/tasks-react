import CreateTask from './CreateTask/CreateTask';
import EditPage from './EditPage/EditPage';
import SingleTask from './SinsleTask/SingleTask';

const WorkSpace = (props) => {
  const { clickedAdd, clickedEdit, clickedSearch, isShowSingleTask } = props;
  return (
    <>
      {clickedAdd && !isShowSingleTask && <CreateTask />}
      {clickedEdit && !clickedAdd && <EditPage />}
      {isShowSingleTask && !clickedSearch && <SingleTask />}
    </>
  );
};

export default WorkSpace;
