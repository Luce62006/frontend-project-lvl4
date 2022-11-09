import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import './index.css';
import Login from './components/login.jsx';
import ErrorPage from './error-page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);







