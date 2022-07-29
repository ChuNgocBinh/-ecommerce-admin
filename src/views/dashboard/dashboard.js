import useAuth from 'hook/useAuth';
import React from 'react';

function DashBoard() {
  const user = useAuth();
  console.log(user);
  return (
    <div>DashBoard</div>
  );
}

export default DashBoard;
