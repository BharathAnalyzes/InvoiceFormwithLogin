// src/components/auth/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../utils/AuthContext';
import { loginValidationSchema } from '../utils/validation';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/invoice');
    }
  }, [user, navigate]);

  const handleSubmit = (values, { setSubmitting }) => {
    if (values.username === 'qwerty' && values.password === 'qwerty') {
      login(values);
      navigate('/invoice');
    } else {
      setLoginError('Invalid username or password');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        {/* Login credentials helper text */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-600 text-sm">
            Use these credentials to login:<br />
            Username: <span className="font-semibold">qwerty</span><br />
            Password: <span className="font-semibold">qwerty</span>
          </p>
        </div>
        
        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{loginError}</span>
          </div>
        )}

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div>
                <Field
                  name="username"
                  type="text"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;