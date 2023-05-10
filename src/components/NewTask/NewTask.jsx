import { FaRegPlusSquare } from 'react-icons/fa';
import Button from '../UI/Button/Button';

const NewTask = ({ onclick, disabled }) => {
  return (
    <Button onClick={onclick} disabled={disabled}>
      <FaRegPlusSquare />
    </Button>
  );
};

export default NewTask;
