# Interview Scheduler
A React application that allows users to book, edit and cancel their interviews. 

## Deployment
Follow the instructions below to get set up with the scheduler-api


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

Running Cypress Visual Testbed

```sh
npm run cypress
```

## Walkthrough
#### Select Day:
Click on the day you would like to book/edit your appoimtnet using the left sidebar. The day you selected will show as "white" unless it is fully booked (the day will appear as a translucent white).
![Select Day](./public/images/select.png)

#### Select Appointment Time:
Any empty appointment slots have a '+' button. Click on this to book the interview.
![Select Day](./public/images/add-screenshot.png)

#### Schedule Appointment:
Please fill in your name and select an interviewer. Once these mandatory fields are completed, you can save your appointment.
![Select Day](./public/images/form.png)

#### View Appointment:
Appointments that are successfully saved will be visible in the schedule on the right of the screen.

#### Edit Appoinment:
Hovering over an appointment will allow you to click the edit button and update the interviewer or the name.:
![Select Day](./public/images/edit-screenshot.png)

#### Delete Appointment:
Hovering over an appointment will allow you to click the delete button to remove the interview from view.
![Select Day](./public/images/delete-screenshot.png)

#### Error Messages:
If, for some reason, booking or saving an interview was not successful, you will see a yellow error message on the screen.
![Select Day](./public/images/error.png)

## Dependencies
1. axios
2. @testing-library/react-hooks
3. react-test-renderer

## Sever
The server side code is available at https://github.com/HiloSolutions/scheduler-api