import styles from './Switch.module.css';
// import {  useTheme } from '../ThemeContext';

const Switch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <label htmlFor="theme" className={styles.switch}>
      <input
        type="checkbox"
        id="theme"
        checked={theme === 'light'}
        onChange={toggleTheme}
      />
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  );
};

export default Switch;
