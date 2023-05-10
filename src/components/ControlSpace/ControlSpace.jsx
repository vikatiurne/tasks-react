import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import Button from '../UI/Button/Button';

const ControlSpace = ({ deleteTask, editTask, disabled, id }) => {
  return (
    <>
      <Button onClick={() => deleteTask(id)} disabled={disabled}>
        <FaRegTrashAlt />
      </Button>
      <Button onClick={editTask} disabled={disabled}>
        <FaRegEdit />
      </Button>
    </>
  );
};

export default ControlSpace;
