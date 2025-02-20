import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
  background-color: #f0f0f0;

  input {
    width: 300px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 5px;
    outline: none;

    &:focus {
      border-color: #007bff;
    }
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const SearchBar = ({ onSearch }) => {
  return (
    <SearchBarContainer>
      <input
        type="text"
        placeholder="Search for cars..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <button>Search</button>
    </SearchBarContainer>
  );
};

export default SearchBar;
