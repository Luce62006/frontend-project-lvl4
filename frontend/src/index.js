import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/login.jsx';

const  App = () => (
    <div className="container">
            <div className="form-wrapper">

                <Login />

            </div>
        </div>
)

export default App;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
