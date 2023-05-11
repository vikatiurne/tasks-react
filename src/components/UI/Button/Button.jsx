import { useContext } from 'react';
import styles from './Button.module.css';
import TasksContext from '../../../context/TasksContext';

const Button = (props) => {
  const { disabled } = useContext(TasksContext);
  const { children } = props;
  return (
    <button
      {...props}
      className={styles.button}
      disabled={disabled}
      children={children}
    />
  );
};

export default Button;
