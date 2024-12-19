
## FOBOH take home assignment

This is the backend application for FOBOH take home assignment written in typescript.

## Tech used
- NodeJS(ExpressJS)
- Typescript
- Swagger documentation tools

## Running the software
To run this software, make sure you have NodeJS installed. 


To run this software locally, 
```
npm run install
npm run dev
```

The application will now be running on `http://localhost:3000`

To get the available routes and the request / response body, please look at the swagger doc available at `/docs`

## Things I have done in this project
- As of writing, all data is stored in memory since there isn't a need for a persistent storage in the requirement. 

- I made a conscious decision to store all monetary values in cents as it is the lowest denominator. 
This is the industry standard used by major payment gateway provider such as Stripe (computers are really bad at fractions). 
I used integer as it is the safest way to store money because by using float and double, I will lose precision. 
The company **WILL** lose a lot of money in the long run. I let the frontend decide how to display the currency for users. 
In the future, I could return currency code, symbol and decimal places(if the currency has decimal places. Currencies such as Indonesian Rupiah does not have decimal places) and let the frontend format them. It works well for now. 

- I did not use enums for adjustment modes and types, instead I use typescript strings for checking. This could be improved as I repeated code in a number of places. 

- I used Postman to manually test the API requests and responses. This could be improved by adding unit tests