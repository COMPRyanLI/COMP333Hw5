# COMP333Hw5
Hw5 testing homework

## Problem 1
The code of problem 1 is unit_testing.py

## Problem 2
The code for pytest problem is pyunit_test.py.
Run in your terminal:

`pip3 install pytest`

Let us follow the steps shown below −

Create a new directory named automation and navigate into the directory in your
command line.

```shell
mkdir automation
```

Then copy the pyunit_test.py and unit_testing_sample_code.py to the automation folder. 
```shell
cd automation
pytest
```
Then the result would should the part that fails the test.

## Problem 3
The code for problem 3 is StackTest.php and we change certain codes in the original backend code for homework3(UserController). So we uploaded the updated backend files in this repo. Please copy these three folders Controller, Model and inc and php file index.php to htdocs folder of your XAMPP folder. 


1. If you do not have it yet, install [homebrew](https://brew.sh/) with:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install PHPUnit with:

   ```bash
   brew install phpunit
   ```

3. Install Composer with:

   ```bash
   brew install composer
   ```

4. If necessary, you can install PHP with:

   ```bash
   brew install php
   ```

5. In the root folder(htdocs) of your music rating backend code, which contains your
   `index.php`, create a new folder, say, `test-project` (the name does not matter).
   From inside `test-project` folder start Composer by running:

   ```bash
   composer init
   ```

  I make the choices,define my dev dependencies, accept the prompt and type `phpunit/phpunit` as the instruction of testing-setup.md tutorial 

6. Install Guzzle with:

   ```bash
   composer require guzzlehttp/guzzle
   ```

7. Once you have finished the Composer config, create a new folder called `tests`
   in your `test-project`. The `tests` folder will be the place where your PHP
   test files live. Copy StackTest.php file to the tests folder.

8. In StackTest.php, I use the port number:80, which is the localhost port number of my XAMMP environment. Also I hardcode certain username and password and id for update test, login test and delete test.

9. From within the `test-project` folder you can run your unit tests with:

   ```bash
   php vendor/bin/phpunit tests
   ```

   This will run the full test suite and output the test results to the terminal.

## Problem 4
The code of problem 4 is App.test.js, which tests the login and registration of React app of homework 3. Since the view of login and registration is included in App.js file, we can only have one file for App.js. And We update some codes in App.js. So we uploaded all the frontend codes to this repo, which includes App.js,addSong.js, delete.js,edit.js,index.js,searchSong.js, jest.config.js,package-lock.json,package.json,babel.config.js.

### Setup
1. In your React App folder, copy the jest.config.js,package-lock.json,package.json,babel.config.js to your App folder. And put the rest of js files: App.js,addSong.js, delete.js,edit.js,index.js,searchSong.js, to the src folder of your App folder. 

2. Also copy teh App.test.js file into your src folder.

3.  Run your tests from within your frontend root folder(app folder) with:

   ```bash
   npm run test
   ```

   You should now see that all tests for your Jest test suite pass.

!!! Although there might be some warnings in the test result, all the tests passed. 

## Problem 5
continuous integration (CI) for the frontend unit tests from problem 4 has been set in the repo. 

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

# Contribution rate for this homework
Ryan (55%)
Lance(45%)