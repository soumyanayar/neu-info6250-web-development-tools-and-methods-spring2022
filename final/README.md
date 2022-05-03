# HABITIZER

This is a simple Habit tracking application, allows user to create an account, login to the page and View Habits, Add habits and Add logs.
There are 3 types of habits 
1. Create a Good Habit
2. Limit a Bad Habit
3. Quit Bad Habit

User can also add the logs to the habits created. 

## Backend-Services
### User Related APIs: 
```
1. /v1/user : 
    a. POST() : This api creates an user if doesn't exist. A new user has to create an account with emailId, password, FirstName and LastNames
    When an account is created, a Json file will be created in the server to store the user credentials.
    b. GET() : This api gets information about the user stored in the file.
    c. PUT() : If user want to edit any of his information like FirstName, LastName or Password, He/she can update the information, and the same will be updated in the use_file.

2. /v1/user/login:
    a. POST() : If the user has an account created, then user has to Login with the credentials to legitimately use the web application.

3. /v1/user/logout:
    a. POST() : 

```
