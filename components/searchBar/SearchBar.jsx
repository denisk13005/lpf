import React, { useState } from 'react';
import styles from './styles.module.scss'
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ filter }, props) => {
  const { tab, fieldsWhereSearch } = props
  const onValueChange = (e) => {
    const value = (e.target.value)

    filter(value)
  }
  return (
    <div className={styles.searchBarContainer}>
      <select name="category" id="category" className={styles.select} placeholder='category'>
        <option value="" disabled selected>catégorie</option>
        <option value="haut">haut</option>
        <option value="bas">bas</option>
        <option value="chaussures">chaussures</option>
        <option value="accessoires">accessoires</option>
      </select>
      <div className={styles.searchPart}>

        <IoIosSearch className={styles.loupe} />
        <input className={styles.input} type="text" name="search" id="search" onChange={onValueChange} />
      </div>

    </div>
  );
};

export default SearchBar;