# MediMemo

## Authors

Hla Htoo and Vicki Diaz

## Project Links

Please refer the links below for more details on the design

Deployed Site:

Walkthrough Video:

Slides:

Design Document:

Class Link: https://johnguerra.co/classes/webDevelopment_fall_2023/

## Project Objective

Medimemo is an online platform designed for healthcare providers to optimize the management of electronic health records, appointment scheduling, and patient billing. This platform ensures secure storage of health records, facilitates effortless scheduling, and significantly reduces the time spent on billing tasks, enhancing overall efficiency in healthcare management.

## Disclaimer

All data in this project is fictitious and for educational and demonstration purposes only. It does not represent real healthcare records or individuals. Please use responsibly and ethically.

## Functionalities

- Landing Page:
  - Welcomes user to application and gives option to login or sign up
- Create an account:
  - user is able to sign up and user credentials to sign back in.
- Patient Page:
  - Lets a user CREATE/add a new patient and create a new health record for the patient
  - Search bar lets you filter through all patients to find specific patient
  - Clicking on a patient takes you to their health record
  - In health record, user is able to UPDATE and DELETE a health record
- Schedual Page:
  - Lets a user create/add a new appointment by clicking a date on the calander and filling out a form
  - Search bar lets you filter through all appointments
    - you can filter by typing the following details:
      - Patient name
      - Doctor name
      - Date
      - Why (reason for appointment)
  - After creating an apointment a card is made and presented at end of page
  - User is able to DELETE and UPDATE appointment

## CRUD OPERATIONS

### Hla Htoo

1. CREATE
   - Whenever a user clicks on "Add new patient" button (on the top right), user is able to create a new patient.
   - Log-in/Sign-up creates users. Added to **\*\***\_\_**\*\*** collections in database
2. READ
   - On the patient page, all the data shown is fetched from collection named "patients" in database.
3. UPDATE
   - Once in a specific helath record page, the "update" button (on top right) lets user update the health record. The update also updates the patient collection in database.
4. DELETE
   - Once in a specific helath record page, the "delete" button (on top right) lets user delete the patient. It also deletes patient collection in database.

We have a collection of 1k health records in our database (meets project rubric requirements)

### Vicki Diaz

1. CREATE
   - Whenever a user click on a date on the calander a form pops up for new appointment details. When submitted, a new appointment is craeted and added to "appointment" collection in data base.
2. READ
   - On the schedualing page, all the data shown is fetched from collection named "appointments" in database.
3. UPDATE
   - The "update" button (found on each appointment card) lets you update the appointment details. The update also updates the appointment collection in database.
4. DELETE
   - Clicking the "delete" button (found on each appointment card) lets user delete the appointment. It also deletes appointment collection in database.

## How to Install

1. Clone repository
2.
3. npm install
4.
5.

## Technologies Used

1. ReactJS
2. JavaScript
3. CSS3
4. Express
5. NodeJs
6. MongoDB

## Screenshots

### Patient Pages

Main Patient Page:

Adding New Patient Feature:

Patient Record Page:

Search Patient Feature Example:

### Schedualing Page

Main Schedualing Page:

Create Appointment Form:

Update Appointment Form Feature:

Search Appointment Feature Example:
