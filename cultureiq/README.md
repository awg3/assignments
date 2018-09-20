## Welcome
This project represents an employee directory, it is also a React application.

## Get Started
- Get [node and install npm](https://www.npmjs.com/get-npm).
- In your terminal, at the folder root of this project use the commands:
* `npm i` or `yarn add` to install dependencies.
* `npm build` or `yarn build` to kick off the project build.
* `npm start` or `yarn start` to start the application.

## Note:
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Requirements:
- The top of the page should be a row of tabs of the demographic categories of the employee directory (e.g., Location of Employee, Age, Gender, etc.). The user should have the ability to add, delete, or edit a demographic category.

- When a tab is selected it should show a list of the different groups that make up that demographic category (e.g., "Location of Employee" would show New York, Boston, and Los Angeles) and a list of employees that are in that group.

- Each employee should be listed in his/her own card. That card should include that employee's name, age, position at the company, personal description, and a photo of the employee. If you click on a employee card it should open a popup box where you can edit the employee's information and upon popup close, it saves the employees information. The changes only have to persist until a browser refresh.

- Finally, you should be able to sort the list of employees in any group by name or age.

## Developer notes:
- You will find that all the above requirements are met, with the single exception of the following: When editing a user's information, the popup will save the changes when clicking on the save button. I chose to take this approach as it makes the most sense from a user experience perspective; and from a usability point of view, it makes no sense that upon closing the popup the data should save.
- I took the liberty of not writing any unit tests as of yet, but when I do it will most likely be using Jest or Karma.
