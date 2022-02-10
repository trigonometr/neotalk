import React from 'react';
import styles from './Categories.module.css';
import CategoryCell from './CategoryCell/CategoryCell';

const categories = [
  'History',
  'Philosophy',
  'Psychology',
  'Sport',
  'Art',
  'Mathematics',
  'Food',
  'Health',
  'Relationships',
  'Movies',
  'Internet',
  'Education',
  'Society',
  'Literature',
  'Politics',
  'Physics',
  'Finances',
  'Religion',
  'Science',
  'Life',
  'Other',
];

const createCategoryCell = (el) => <CategoryCell key={el} categoryName={el} />;

// for (categoryName in categories) {
//   Category = (
//     <div className={styles['cateogry-pair']}>
//       <CategoryCell key={categoryName} categoryName={categoryName} />
//     </div>
//   );
// }

function Categories() {
  /* TODO */
  return (
    <div className={styles['categories-body']}>
      {/*for (cateogryName in categories) {
        map(createCategoryCell)*/}
    </div>
  );
}

export default Categories;
