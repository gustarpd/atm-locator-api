# ATM locator api
An API to search for ATMs near the user based on their zip code.
## Important Note
This API provides information on ATMs located near the user's location using their zip code. Currently, it is undergoing a review process to be integrated with Mastercard's production host. However, it can still make requests successfully using the sandbox environment. Before testing this API, you will need to request credentials from the Mastercard website to obtain authentication credentials. These credentials will allow you to make authenticated requests and retrieve real data.

## Getting Started

To set up a development or production environment in your project, it's necessary to copy the contents of the .env.example file to the .env file. This procedure is important because the .env file contains sensitive information such as passwords, API keys, and other configuration data.

You need to have <a href="https://nodejs.org/en/download">Node.js</a> and <a href="https://docs.docker.com/get-docker/">Docker<a> installed on your machine.

```
1. Clone repository
git clone https://github.com/gustarpd/atm-locator-api

1. Access the directory
cd atm-locator-api

1. Install depedencieshh
npm install

1. Start the database
docker-compose up

```
### Usage example

Create a new user
```
POST /create-new-user
```
Body request
```json 
{
  "name": "use2r name",
  "email": "esw@mail.com",
  "password": "any_password23"
}

```

Response 

```json 
{
   "user":{
      "name":"use2r name",
      "email":"esw@mail.com",
      "password":"USER PASSWORD HASHAD",
      "id":"646d12b6184ced31a95fe40b"
   },
   "token":"YOUR TOKEN HERE"
}

```

Save user's favorites ATMs
```
POST /favorites
```
Body request

```json
{
  "name": "user name",
  "city": "some city",
  "line": "any line",
  "distance": 0.93,
  "lantitude": 38.76006576913497,
  "longitude": -90.74615107952418
}

```

Get ATMs 

```
GET /atm

**Headers:**
- Authorization: Bearer [token]
```

```json 
{
   "Location":{
      "Name":"Sandbox ATM Location 1",
      "Distance":0.93,
      "DistanceUnit":"MILE",
      "Address":{
         "Line1":"3234 Abner Road",
         "Line2":null,
         "City":"Wausau",
         "PostalCode":"11101",
         "CountrySubdivision":{
            "Name":"NY",
            "Code":"NY"
         },
         "Country":{
            "Name":"USA",
            "Code":"USA",
            "GeoCoding":true
         }
      },
      "Point":{
         "Latitude":38.76006576913497,
         "Longitude":-90.74615107952418
      },
      "GeocodingResult":null,
      "LocationType":{
         "Type":"OTHER"
      }
   },
   "HandicapAccessible":"NO",
   "Camera":"NO",
   "Availability":"UNKNOWN",
   "AccessFees":"UNKNOWN",
   "Owner":"Sandbox ATM 1",
   "SharedDeposit":"NO",
   "SurchargeFreeAlliance":"NO",
   "SurchargeFreeAllianceNetwork":"DOES_NOT_PARTICIPATE_IN_SFA",
   "Sponsor":"Sandbox",
   "SupportEMV":1
}

```
## Tools used to develop this API

- <a href="https://nodejs.org/">NodeJs<a>
- <a href="https://www.typescriptlang.org/">TypeScript<a>
- <a href="https://jestjs.io/">Jest</a>
- <a href="https://www.mongodb.com/">MongoDB</a>