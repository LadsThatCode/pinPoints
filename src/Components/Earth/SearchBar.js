import React, {useState} from 'react';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './SearchBar.css'

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (searchTerm.trim()){
    onSearch(searchTerm);
  }
};

return(
  <section>
  <TextField id="outlined-basic" label="Enter Location" variant="outlined" />
  <Button variant="contained">Contained</Button> 
  </section>
);
};

export default SearchBar;