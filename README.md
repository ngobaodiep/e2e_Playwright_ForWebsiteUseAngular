# Project Name: Automation Testing using Playwright Framework
This is an automation testing project that utilizes the Playwright framework to test a website developed using AngularJS. The project follows the Page Object Model design pattern and uses a separate JSON file to store all element selectors.

## Requirements
````
Node.js version 12 or later
Playwright version 1.18.0 or later
````

## Installation
Clone the repository to your local machine.
Install the dependencies by running npm install in the project directory.

## Project Structure
- **env**: This directory contains different configuration files for different enviroment (dev, int, pta, prd)
- **resource**: This directory contains all resources for the project.
    - **element**: contains all selectors for the project. There are multiple files, each file is used for a page, function. There are also some common files that contain common selectors.
    - **login-account**
    - **test-data**
- **scr**: This directory contains utility functions used in the project.


## Usage
Update the config.json file with the URL of the website to be tested.
Create a new test case file in the tests directory using the Page Object Model design pattern.
Use the selectors defined in the selectors.json file in your test cases.
Run the tests using the command npm run test.

## Contributing
Contributions to the project are welcome. Please open an issue or a pull request if you would like to contribute.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


