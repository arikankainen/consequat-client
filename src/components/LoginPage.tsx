import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  background-color: #000;
`;

const LoginPage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        username<br />
        <input onChange={handleUsernameChange}/><br />
        password<br />
        <input onChange={handlePasswordChange} /><br />
        <button type='submit'>Login</button>
      </form>
    </Container>
  );
};

export default LoginPage;