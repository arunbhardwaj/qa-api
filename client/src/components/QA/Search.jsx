import { StyledInput, SearchContainer } from '../styles/QA/Search.styled';
import { InvisibleLabel } from '../styles/QA/Label.styled';
import React, { useContext } from 'react';
import { QAContext } from './QAContext.jsx';
import SearchIcon from '../../assets/images/search.svg';

const Search = () => {
  const { search, setSearch } = useContext(QAContext);

  return (
    <div>
      <form>
        <InvisibleLabel htmlFor="search">Search</InvisibleLabel>
        <SearchContainer>
          <StyledInput
            id="search"
            value={search}
            onChange={e => setSearch(e)}
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            autoComplete="off"
          ></StyledInput>
          {/* TODO: THIS IS THE SEARCH ICON, WE SHOULD PROBABLY IMPORT instead of using src directly? */}
          <img
            src={SearchIcon}
            alt="search bar"
            height="15"
            width="15"
          />
        </SearchContainer>
      </form>
    </div>
  );
};

export default Search;
