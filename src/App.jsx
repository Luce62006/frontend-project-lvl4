import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import Login from './Login.jsx';
import PrivatePage from './home.jsx';

import AuthContext from './context/index.jsx';
import useAuth from './hooks/index.jsx';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  //  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="./login" state={{ from: location }} />
  );
}

function AuthButton() {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="./login" state={{ from: location }}>Log in</Button>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="./home">Chat</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="./home">Private page</Nav.Link>
          </Nav>
          <AuthButton />
        </Navbar>

        <div className="container p-3">
          <h1 className="text-center mt-5 mb-4"> Войти</h1>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<PrivatePage />} />
            <Route
              path="/private"
              element={(
                <PrivateRoute>
                  <PrivatePage />
                </PrivateRoute>
              )}
            />
          </Routes>
        </div>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
