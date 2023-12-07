# COMP333Hw5
Hw5 testing homework


## Problem 6
One way that generative AI can be helpful in a project like this is by utilizing its learning abilities to debug and compare code. For example, we used ChatGPT to debug one of our jest test functions by giving it the error message we were receiving and asking it how to resolve the issue. Heres the issue in context:

test('renders login form and interacts with it', async () => {
    render(<App />);
    // check if the login form is rendered
    expect(getByRole('heading', { name: 'Login' })).toBeInTheDocument(); 
    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
  
    // Simulate user input
    fireEvent.change(getByLabelText('Username:'), { target: { value: 'username' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password' } });
  
    // Simulate form submission
    fireEvent.click(getByRole('button', { name: 'Login' }));

    // Expect the login function to be called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.anything(), { username: 'username', password: 'password' });
    });
});


Ask ChatGPT how to resolve the error message you will receive from terminal when trying to run this. Based on our experience, ChatGPT first told us what was wrong (the lack of screen. ) and then proceeded to show us how to fix it. We were left with:

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

What makes this interesting is that if I were to ask ChatGPT if anything was wrong with my initial code, without any context as to what the issue was, they would tell me nothing is wrong with it. However, giving context to ChatGPT allows for you to guide generative AI down the right path for a solution. 