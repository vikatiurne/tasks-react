import { FaRegPlusSquare } from 'react-icons/fa';
import Button from '../UI/Button/Button';

const NewTask = ({ addTask }) => {
  return (
    <Button onClick={addTask}>
      <FaRegPlusSquare />
    </Button>
  );
};

export default NewTask;
