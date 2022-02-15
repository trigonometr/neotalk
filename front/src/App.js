import React, { Redirect /*, { useState }*/, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';

import styles from './App.module.css';

import Main from './components/Main/Main';

import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';
import Feed from './components/Feed/Feed';
import Categories from './components/Categories/Categories';
import Bookmarks from './components/Bookmarks/Bookmarks';
import Profile from './components/Profile/Profile';
import More from './components/More/More';
import NotFound from './components/NotFound/NotFound';
import CreateNeoTalkForm from './components/CreateNeoTalkForm/CreateNeoTalkForm';
import SearchResults from './components/SearchResults/SearchResults';
import { initStore } from './store';
import { isAuthorized } from './services/api';
import NeoTalk from './components/NeoTalk/NeoTalk';

function App() {
  // TODO: use Redux to set active heart when on bookmarks

  return (
    <Provider store={initStore()}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route element={<Main />}>
          <Route path="/home" element={<Feed />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/create-neo-talk" element={<CreateNeoTalkForm />} />
          <Route path="/neotalk/:neotalkID" element={<NeoTalk />} />
          <Route path="/more" element={<More />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
