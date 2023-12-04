import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App'; 
import axios from 'axios';
import "@testing-library/jest-dom";


// Mocking axios requests
jest.mock('axios');

describe('App', () => {
  beforeEach(() => {
    // Your setup code or mock any necessary data
  });

  it('renders all input fields and buttons for the login form', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    // Check if all elements in the login form are present
    expect(getByPlaceholderText('Enter your username')).toBeDefined();
    expect(getByPlaceholderText('Enter your password')).toBeDefined();
    expect(getByText('Login')).toBeDefined();
    expect(getByText('Register')).toBeDefined(); // Assuming there's a 'Register' button/link for registration
  });

  it('navigates to the registration form when "Register" link is clicked', () => {
    const { getByText } = render(<App />);

    // Click on the "Register" link/button to navigate to registration form
    fireEvent.press(getByText('Register'));

    // Check if the registration form elements are present after the click
    expect(getByText('Register')).toBeDefined(); // Assuming there's a title/text for the registration form
    expect(getByPlaceholderText('Enter your username')).toBeDefined();
    expect(getByPlaceholderText('Enter your password')).toBeDefined();
  });

  it('registers a user with valid details', async () => {
    // Mock a successful registration response
    axios.post.mockResolvedValue({ status: 200, data: true });

    const { getByText, getByPlaceholderText } = render(<App />);

    // Simulate user input in the registration form with valid details
    fireEvent.changeText(getByPlaceholderText('Enter your username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'validpassword123');
    fireEvent.press(getByText('Register'));

    // Wait for registration to complete and check for successful registration or redirection
    await waitFor(() => {
      expect(getByText('Login')).toBeTruthy();    
    });
  });

  it('displays an error message for invalid registration details', async () => {
    // Mock a failed registration response
    axios.post.mockRejectedValue(new Error('Registration failed'));

    const { getByText, getByPlaceholderText } = render(<App />);

    // Simulate user input in the registration form with invalid details
    fireEvent.changeText(getByPlaceholderText('Enter your username'), '');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'short');
    fireEvent.press(getByText('Register'));

    // Wait for registration to complete and check if error message is displayed
    await waitFor(() => {
      expect(getByText('Please provide a valid username and a password with more than 10 characters.')).toBeTruthy();
    });
  });

  // Add more tests for login functionality, adding songs, editing, deleting, etc.

});
