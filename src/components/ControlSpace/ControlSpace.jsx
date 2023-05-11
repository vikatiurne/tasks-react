import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import Button from '../UI/Button/Button';

const ControlSpace = ({
  deleteTask,
  editTask,

  id,
}) => {
  return (
    <>
      <Button onClick={() => deleteTask(id)}>
        <FaRegTrashAlt />
      </Button>
      <Button onClick={editTask}>
        <FaRegEdit />
      </Button>
    </>
  );
};

export default ControlSpace;
