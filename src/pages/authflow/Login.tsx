/** @format */

import { Formik } from 'formik';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Colors from '../../common/Colors';
import Header from '../../components/ui/Header';
import auth from '../../api/auth';

// TICKETS: Add loading animation to button. Validate email on landing page?

interface FormValues {
  email: string;
  password: string;
}

const Headline = styled.h1`
  padding-top: 7%;
  font-family: 'Avenir';
  font-size: 33px;
  text-align: center;
  color: white;
  margin-block-end: 0em;
`;

const Background = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 100%;
  background-color: ${Colors.pink};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputField = styled.input`
  width: 200px;
  border-radius: 12px;
  color: black;
  background-color: #f5f6f8;
  padding: 8px 16px;
  font-family: 'Avenir';
  font-weight: 400;
  font-size: 14px;
  border: 3px solid #f5f6f8;
  margin: auto;
  margin-top: 20px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  &:focus {
    outline: none;
    background: white;
    border: 3px solid #ddd;
    color: black;
  }
`;

const ErrorText = styled.p`
  font-family: 'Avenir';
  font-weight: 500;
  font-size: 14px;
  color: #8b0000;
  margin: 5px auto 0 auto;
`;

const Login = () => {
  const history = useHistory();

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const validateSignUp = (values: FormValues) => {
    const errors = {} as any;
    if (!values.email) {
      errors.email = 'Email address required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSubmit = (values: FormValues) => {
    auth.login(values);
  };

  const loginComplete = ({ error }: { error?: string }) => {
    if (!error) {
      history.push('/links');
    } else {
      alert(error);
      console.error(error);
    }
  };

  auth.addLoginSubscribers(loginComplete);

  return (
    <Background>
      <Header color={'white'} />
      <>
        <Headline>Welcome Back</Headline>
        <Formik
          initialValues={initialValues}
          validate={validateSignUp}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }: /* and other goodies */
          {
            values: any;
            errors: any;
            touched: any;
            handleChange: {
              (e: React.ChangeEvent<any>): void;
            };
            handleBlur: {
              (e: React.ChangeEvent<any>): void;
            };
            handleSubmit: {
              (e: React.ChangeEvent<any>): void;
            };
            isSubmitting: boolean;
          }) => (
            <>
              <FormContainer onSubmit={handleSubmit}>
                <InputField
                  type='text'
                  name='email'
                  value={values.email}
                  placeholder='janedoe@gmail.com'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <ErrorText>{errors.email}</ErrorText>
                )}
                <InputField
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}
                <ButtonContainer>
                  <button
                    type='submit'
                    className='button is-info'
                    style={{ margin: '15px auto 0 auto' }}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Get Started
                  </button>
                </ButtonContainer>
              </FormContainer>
            </>
          )}
        </Formik>
      </>
    </Background>
  );
};

export default Login;
