import React, { useState } from 'react';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
console.log(onSearch)
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
   
    // if (searchTerm.trim()) {
      onSearch(searchTerm);
  };

  return (
    <section id='searchBar'>
      <TextField onChange={handleInputChange} id="outlined-basic" label="Enter Location" variant="outlined" />
      <Button id='searchBarButton' onClick={handleSubmit} variant="contained">Enter</Button>
    </section>
  );
};

export default SearchBar;

