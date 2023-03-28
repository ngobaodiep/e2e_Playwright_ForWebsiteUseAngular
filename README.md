# Project Name: Automation Testing using Playwright Framework
This is an automation testing project that utilizes the Playwright framework to test a website developed using AngularJS. The project follows the Page Object Model design pattern and uses a separate JSON file to store all element selectors.

## Requirements
````
Node.js version 12 or later
Playwright version 1.18.0 or later
````

## Installation
Clone the repository to your local machine.
Install the dependencies by running npm install in the project directory. You also need to install playwright browsers
````
npm install
npx playwright install
````

## Project Structure
- **env**: This directory contains different configuration files for different enviroment (dev, int, pta, prd)
- **resource**: This directory contains all resources for the project.
    - **element**: contains all selectors for the project. There are multiple files, each file is used for a page, function. There are also some common files that contain common selectors.
    - **login-account**: account.json file includes all credentials to login system (for multiple enviroments dev, int, pta, prd). 
    - **test-data**: includes test data for all test cases. User can modify a test case easily or can add a new test case without modifying source code.
- **scr**: 
    - **base**: base classes of page object
    - **e2e**: contains test files
    - **pages**: contains all page object model classes
    - **utils**: contains utils class (for example login, save sessions, etc.)


## Usage
- Update the config files in the env folder with the URL of the website to be tested.
- Create a new test case file in the scr/e2e directory. Page Object Files should be put in scr/pages folder.
- Define selectors in separate json file in resource/element folder. Create test data in json file in resource/test-data folder.
- Use the corresponding command that is defined in package.json file to run the test in different enviroments.

## Contributing
Contributions to the project are welcome. Please open an issue or a pull request if you would like to contribute.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


