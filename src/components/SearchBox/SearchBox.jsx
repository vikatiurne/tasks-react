import { useState } from 'react';
import styles from './SearchBox.module.css';

const SearchBox = ({ search }) => {
  const [searchText, setSearchText] = useState('');

  const changeHandler = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (text) search(text);
  };
  return (
    <div>
      <input
        className={styles.search}
        type="search"
        placeholder="&#128269; search"
        value={searchText}
        onChange={changeHandler}
      />
    </div>
  );
};

export default SearchBox;
