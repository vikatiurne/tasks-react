import styles from './SearchBox.module.css';

const SearchBox = () => {
  return (
    <div>
      <input
        className={styles.search}
        type="search"
        placeholder="&#128269; search"
      />
    </div>
  );
};

export default SearchBox;
