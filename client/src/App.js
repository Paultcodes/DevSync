import React from 'react';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import GroupPage from './pages/GroupPage/GroupPage'
import SignupPage from './pages/SignupPage/SignupPage';
import CreateGroupPage from './pages/CreateGroup/CreateGroupPage';
import MyGroupsPage from './pages/MyGroups/MyGroupsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Test from './pages/Test/Test';
import UserProfile from './pages/ProfilePage/UserProfile';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/group' element={<GroupPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/creategroup' element={<CreateGroupPage/>}/>
            <Route path='/test' element={<MyGroupsPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/testtwo' element={<Test/>}/>
            <Route path='/profile/:userId' element={<UserProfile/>}/>
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
