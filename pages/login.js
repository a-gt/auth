import { useState } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import Form from '../components/form';
import LoginForm from '../components/loginForm';

import { Magic } from 'magic-sdk';

const Login = () => {
  return (
    <Layout>
      <div className="login-container">
        <LoginForm />
      </div>

      <style jsx>{`
        .login-container {
          margin: 1em;
        }
      `}</style>
    </Layout>
  );
};

export default Login;
