import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { login } from 'services/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUserInfo } from 'redux/slice';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const data = {
        email,
        password,
      };
      const res = await login(data);
      localStorage.setItem('AuthToken', JSON.stringify(`Bearer ${res?.data?.token}`));
      dispatch(changeUserInfo(res?.data?.data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-80">
        <div className="text-center">
          <h1 className="text-4xl">Login</h1>
        </div>
        <div className="my-5">
          <TextField label="Email" size="small" fullWidth color="primary" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-5">
          <TextField label="Password" size="small" fullWidth color="primary" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="float-right">
          <Button variant="contained" onClick={onSubmit}>Login</Button>
        </div>
      </div>

    </div>
  );
}

export default Login;
