import React, { useState } from 'react';
import './Search.css';

const SearchInput = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch(text); 
  };

  return (
    <input
      type="text"
      name="text"
      placeholder="Search 'customer name'"
      className="input"
      value={searchText}
      onChange={handleChange}
    />
  );
};

export default SearchInput;