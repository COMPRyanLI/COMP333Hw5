import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from './App';

jest.mock('axios');

describe('User Login and Registration', () => {
  beforeEach(() => {
    // we need to setup mock axios
    axios.get.mockResolvedValue({ data: [] }); // a function provided by Jest when you mock a module
    axios.post.mockResolvedValue({ status: 200, data: true });
  });

  test('renders login form and interacts with it', async () => {
    render(<App />);
    // check if the login form is rendered
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument(); 
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  
    // Simulate user input
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'username' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
  
    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Expect the login function to be called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.anything(), { username: 'username', password: 'password' });
    });
  });

  test('renders registration form when register button is clicked', async () => {
    render(<App />);
  // Click the Register button to switch to the registration form
  fireEvent.click(screen.getByRole('button', { name: 'Register' }));

  // Verify registration form is rendered
  expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
  expect(screen.getByLabelText('Username:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();

  // Simulate user input for registration
  fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'newuser' } });
  fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'newpassword' } });

  // Simulate form submission for registration
  fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    // Expect the registration function to be called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.anything(), { username: 'newuser', password: 'newpassword' });
    });
  });

  test('navigates from login to registration page', () => {
    render(<App />);
    // Assume clicking 'Register' navigates to the registration form
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  test('simulates typing into the username and password input boxes', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });

    expect(screen.getByLabelText('Username:').value).toBe('testuser');
    expect(screen.getByLabelText('Password:').value).toBe('password123');
  });

  test('detects an incorrect username input value', async () => {
    axios.post.mockResolvedValueOnce({ status: 200, data: false }); // Mock a failed login
    render(<App />);
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      // Check for an error message after a failed login attempt
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });

  test('detects password too short during registration', async () => {
    axios.post.mockResolvedValueOnce({ status: 200, data: false }); // Assert registration failed
    render(<App />);
    
    // display the registration form
    const registerButton = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(registerButton);
    
    // Simulate user input for registration with short password that is less than 10
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 's' } }); // let password be shorter than 10
    
    // Simulate form submission
    const submitButton = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(submitButton);
    
    // Await and assert that the error message is displayed
    // Replace '/password is too short/' with the actual error message text expected
    await waitFor(() => {
      expect(screen.getByText(/Please provide a valid username and a password with more than 10 characters./i)).toBeInTheDocument();
    });
  });
  

 
});
