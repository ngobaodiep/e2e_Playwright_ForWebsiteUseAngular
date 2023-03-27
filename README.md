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

## Usage
Update the config.json file with the URL of the website to be tested.
Create a new test case file in the tests directory using the Page Object Model design pattern.
Use the selectors defined in the selectors.json file in your test cases.
Run the tests using the command npm run test.

## Project Structure
- **selectors.json**: This file contains all of the element selectors used in the project.
- **config.json**: This file contains configuration information such as the URL of the website to be tested.
- **pages**: This directory contains the page objects used in the project.
- **tests**: This directory contains the test cases used in the project.
- **utils**: This directory contains utility functions used in the project.
- **index.js**: This is the main file that runs the tests.

## Contributing
Contributions to the project are welcome. Please open an issue or a pull request if you would like to contribute.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


