import { Button, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { firebaseAuth } from '../Providers/AuthProvider';

const SignIn = () => {
  const {
    handleSignin, inputs, setInputs, errors,
  } = useContext(firebaseAuth);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('handleSubmit');
    await handleSignin();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(inputs);
    setInputs((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <TextField label="email" onChange={handleChange} name="email" value={inputs.email} />
      <TextField label="password" onChange={handleChange} name="password" value={inputs.password} />
      <Button variant="contained" onClick={handleSubmit}>Singin</Button>
      {errors.length > 0 ? errors.map((error: any) => <p style={{ color: 'red' }}>{error}</p>) : null}
    </form>
  );
};

export default SignIn;
