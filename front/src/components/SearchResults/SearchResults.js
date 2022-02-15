import React from 'react';
import { useSelector } from 'react-redux';
import ShortNeoTalk from '../NeoTalk/ShortNeoTalk/ShortNeoTalk';

const createShortNeoTalk = (el) => <ShortNeoTalk key={el.id} feed_element={el} />;

function SearchResults() {
  const searchResults = useSelector((state) => state.getSearchResults.results);
  return <div className="neotalks">{searchResults.map(createShortNeoTalk)}</div>;
}

export default SearchResults;
