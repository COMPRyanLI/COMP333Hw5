import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';


describe('Login and Registration Functionality', () => {
  it('renders login form with input fields and buttons', () => {
    render(<App />);
    
    // Check if login form is rendered with input fields and buttons
    expect(screen.getByText('Song Rating App')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('navigates from login page to registration page', () => {
    render(<App />);
    
    // Click the 'Register' button to navigate to registration page
    fireEvent.click(screen.getByText('Register'));
    
    // Check if the registration form is rendered after clicking 'Register'
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('simulates user input and registration with incorrect value', () => {
    render(<App />);
    
    // Click the 'Register' button to navigate to registration page
    fireEvent.click(screen.getByText('Register'));

    // Fill in the registration form with incorrect values and submit
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'short' } });
    fireEvent.click(screen.getByText('Register'));

    // Check if the error message is displayed for incorrect registration input
    expect(screen.getByText('Please provide a valid username and a password with more than 8 characters.')).toBeInTheDocument();
  });
});