import React from 'react';
import styles from '../Categories.module.css';

function CategoryCell(props) {
  return <div className={styles['cell-container']}>{props.categoryName}</div>;
}

export default CategoryCell;
