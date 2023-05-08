import styles from './Button.module.css';

const Button = (props) => {
  const { children} = props;
  return (
    <button
      {...props}
      className={styles.button}
      children={children}
    />
  );
};

export default Button;
