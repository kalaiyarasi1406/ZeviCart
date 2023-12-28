import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { FilterAlt } from "@mui/icons-material";
import "./SearchSection.css";
import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";

/**
 * Search component represents the search input field 
 *
 * @param {Object} props 
 * @param {function} props.onSearch 
 * @param {boolean} props.onfilterQuery
 * @param {function} props.onFilter 
 *  
 *
 
 */
const Search = ({ onSearch, onfilterQuery, onFilter }) => {
  const [findQuery, setFindQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState(onfilterQuery);

  const handleInput = (event) => {
    setFindQuery(event.target.value);
  };
  useEffect(() => {
    setFilterQuery(onfilterQuery);
  }, [onfilterQuery]);

  const searchFunction = () => {
    onSearch(findQuery);
  };

  const FilterFunction = () => {
    setFilterQuery(!filterQuery);
    onFilter(filterQuery);
  };

  return (
    <div>
      {/* Searching the Larger Screen of this module */}
      <TextField
        placeholder="Search Products here..."
        value={findQuery}
        className="search-desktop"
        onChange={handleInput}
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <Button onClick={searchFunction}>
              <SearchIcon />
            </Button>
          ),
        }}
      />

      {/* Here we are finding Search on Smaller Screen */}
      <TextField
        placeholder="Search Products here..."
        value={findQuery}
        className="search-mobile"
        onChange={handleInput}
        variant="standard"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/*search Button*/}
              <Button onClick={searchFunction}>
                <SearchIcon />
              </Button>
              {/* Filter Button */}
              <Button onClick={FilterFunction}>
                <FilterAlt />
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
