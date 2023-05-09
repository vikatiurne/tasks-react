import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import Button from '../UI/Button/Button';

const WorkSpace = ({ deleteTask, editTask, disabled }) => {
  return (
    <>
      <Button onClick={deleteTask} disabled={disabled}>
        <FaRegTrashAlt />
      </Button>
      <Button onClick={editTask} disabled={disabled}>
        <FaRegEdit />
      </Button>
    </>
  );
};

export default WorkSpace;
