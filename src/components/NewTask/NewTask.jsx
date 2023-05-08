import { FaRegPlusSquare } from 'react-icons/fa';
import Button from '../UI/Button/Button';

const NewTask = ({ onclick }) => {
  return (
    <Button onClick={onclick}>
      <FaRegPlusSquare />
    </Button>
  );
};

export default NewTask;
