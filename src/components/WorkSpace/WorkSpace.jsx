import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import Button from '../UI/Button/Button';

const WorkSpace = ({ deleteTask, editTask }) => {
  return (
    <>
      <Button onClick={deleteTask}>
        <FaRegTrashAlt />
      </Button>
      <Button onClick={editTask}>
        <FaRegEdit />
      </Button>
    </>
  );
};

export default WorkSpace;
