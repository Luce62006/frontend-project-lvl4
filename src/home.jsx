// @ts-check

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from './routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

function PrivatePage() {
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get(routes.usersPath(), { headers: getAuthHeader() })
      .then((response) => {
        console.log(response);
        setUser(response.data);
      });
  }, []);
  return (
    <div>
      {user}
    </div>
  );
}

export default PrivatePage;
