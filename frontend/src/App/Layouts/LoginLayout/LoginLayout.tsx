/* eslint-disable react/prop-types */
import { Container, CssBaseline } from '@material-ui/core';
import React from 'react';

const LoginLayout: React.FC = ({ children }) => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    {children}
  </Container>
);
export default LoginLayout;
