import { Route, Routes } from 'react-router-dom';
import {
  Album,
  Search, Login, Favorites, Profile, ProfileEdit, NotFound, Layout } from './index';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
        <Route path="/*" element={ <NotFound /> } />
      </Route>
    </Routes>
  );
}

export default App;
