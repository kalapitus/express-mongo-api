## Table of Contents
- **[Getting Started](#getting-started)**<br>
- **[Installing](#installing)**<br>
- **[Overview](#overview)**<br>
- **[Back-end](#back-end)**<br>
- **[API Endpoints](#api-endpoints)**<br>
- **[Signup Endpoint](#signup-endpoint)**<br>
- **[Login Endpoint](#login-endpoint)**<br>
- **[Client Endpoints](#client-endpoints)**<br>
- **[Driver Endpoints](#driver-endpoints)**<br>
- **[Ride Endpoints](#ride-endpoints)**<br>

# Backend-api
Back-end RESTful API built using Node.js, Express and MongoDB Atlas

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

# Installing

A step by step series of instructions on how to get a development environment running.

1. **Navigate to your local server folder**

2. **Clone the repository:**

    ```
    git clone https://github.com/kalapitus/express-mongo-api.git
    ```
    
3. **Install dependencies:**
    - Open your terminal and install the dependencies. The list of dependencies can be found in the `package.json` file under the `dependencies` section.
      
    ```
    npm install {dependency-name}
    ```

4. **Create a .env file:**
    - In the project root, create a `.env` file and add the following environment variables:

    ```env
    DB_USER="your-database-username"
    DB_PASSWORD="your-database-password"
    DB_NAME="your-database-name"
    PORT="your-server-port"
    JWT_KEY="your-secret-json-web-token-key"
    ```

5. **Set up MongoDB connection**
    - In `app.js`, paste your MongoDB Atlas connection string and replace the username, password, and database name with `process.env.DB_USER`, `process.env.DB_PASSWORD`, and `process.env.DB_NAME`

    ```javascript
    mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    ```

6. **Start the server**
    - Run the server using terminal

    ```
    nodemon server.js
    ```

# Overview

The project is a uber-like transportation system that manages drivers, clients and rides.

- **Client Management**: Create, read, update and delete client records with personal details and location

- **Driver Management**: Create, read, update and delete driver records with personal details, car information and location

- **Ride Management**: Create, read, update and delete rides with driver, client details, start/end locations, price and status

- **User Authentication**: Secure user registration and login using *JSON Web Token* for authentication and *bcrypt* for password hashing

# Back-end 

**Architecture**
- Follows and *MVC (Model-View-Controller)* pattern to seperate and organise code

- Each resource (clients, drivers, rides) has it's own set of routes, controllers and models

**Authentication**

- Secure user authentication is implemented using *JSON Web Tokens (JWT)*

- Passwords are encrypted using *bcrypt* before storage to ensure security.

**Database**

- *MongoDB Atlas (cloud)* is used as the database for storing application data

- Database schemas and models are created with *Mongoose* 

# API Endpoints
Use Base URL: https://localhost:3000/

**Register & Login**
| Method | Route                        | Description                                      |
|--------|------------------------------|--------------------------------------------------|
| POST   | /auth/signup                 | registers new users                              |
| POST   | /auth/login                  | logins into user account                         |

**Clients**
| Method | Route                        | Description                                      |
|--------|------------------------------|--------------------------------------------------|
| GET    | /api/clients                 | returns array of clients in database             |
| GET    | /api/clients/:clientId       | returns client specified by :clientId            |
| PUT    | /api/clients/:clientId       | updates client specified by :clientId            |
| POST   | /api/clients                 | creates & returns new client                     |
| DELETE | /api/clients/:clientId       | deletes client specified by :clientId            |


**Drivers**
| Method | Route                        | Description                                      |
|--------|------------------------------|--------------------------------------------------|
| GET    | /api/drivers                 | returns array of drivers in database             |
| GET    | /api/drivers/:driverId       | returns driver specified by :driverId            |
| PUT    | /api/drivers/:driverId       | updates driver specified by :driverId            |
| POST   | /api/drivers                 | creates & returns new driver                     |
| DELETE | /api/drivers/:driverId       | deletes driver specified by :driverId            |


**Rides**
| Method | Route                        | Description                                      |
|--------|------------------------------|--------------------------------------------------|
| GET    | /api/rides                   | returns array of rides in database               |
| GET    | /api/rides/:rideId           | returns ride specified by :rideId                |
| PUT    | /api/rides/:rideId           | updates ride specified by :rideId                |
| POST   | /api/rides                   | creates & returns new ride                       |
| DELETE | /api/rides/:rideId           | deletes ride specified by :rideId                |


## Signup Endpoint
```js
POST /api/auth/signup
```
Expected Body 
```js
{
    "email": "user-email"       // string
    "password": "user-password" // string
}
```

Expected Response
```js
{
    "STATUS": "ADDED NEW USER"
}
```

## Login Endpoint
```js
POST /auth/login
```
Expected Body
```js
{
    "email": "user-email"        // string
    "password": "user-password"  // string
}
```
Expected Response
```js
{
    "STATUS": "LOGIN SUCCESSFUL",
    "token": "example-token"
}
```


## Client Endpoints

### GET - all clients
```js
GET /api/clients
```

Expected Response: returns array of clients in database 

```javascript
"STATUS": "ALL CLIENTS",
    "clients": [
        {
            "location": {
                "latitude": 50.0,
                "longitude": 50.0
            },
            "_id": "example-id",
            "name": "example-name",
            "surname": "example-surname",
            "email": "example@example.com",
            "phoneNumber": "123456789",
            "__v": 0
        }
    ]
```

### POST - client
```javascript
POST /api/clients
```

Expected Body: 
```javascript
{
    "name": "example-name",          // string
    "surname": "example-surname",    // string
    "email": "example@example.com",  // string
    "phoneNumber": "123456789",      // string
    "location":{
        "latitude": 50.0,           // number
        "longitude": 50.0           // number
    }
}
```

Expected Response: returns object of created client in database 
```javascript
{
    "STATUS": "ADDED NEW CLIENT",
    "client": {
        "_id": "example-id",
        "name": "example-name",
        "surname": "example-surname",
        "email": "example@example.com",
        "phoneNumber": "123456789",
        "location": {
            "latitude": 50.0,
            "longitude": 50.0
        },
        "__v": 0
    }
}
```

### PUT - client by id
```javascript
PUT /api/clients/:clientId
```

Expected Body:
```javascript
{
    "name": "example-name",          // string
    "surname": "example-surname",    // string
    "email": "example@example.com",  // string
    "phoneNumber": "123456789",      // string
    "location":{
        "latitude": 50.0,           // number
        "longitude": 50.0           // number
    }
}
```

Expected Response: updates client specified by :clientId and returns object of updated client in database 
```javascript
{
    "STATUS": "CLIENT WITH ID: example-id WAS UPDATED",
    "updatedClient": {
        "location": {
            "latitude": 50.0,
            "longitude": 50.0
        },
        "_id": "example-id",
        "name": "example-name",
        "surname": "example-surname",
        "email": "example@example.com",
        "phoneNumber": "123456789",
        "__v": 0
    }
}
```

### DELETE - client by id
```javascript
DELETE /api/clients/:clientId
```
Expected Response: deletes client specified by :clientId
```javascript
{
    "STATUS": "CLIENT WITH ID: example-id WAS DELETED"
}
```


## Driver Endpoints

### GET - all drivers
```javascript
GET /api/drivers
```

**Expected Response**: returns array of drivers in the database

```javascript
"STATUS": "ALL DRIVERS",
    "drivers": [
        {
            "location": {
                "latitude": 50.0,
                "longitude": 50.0
            },
            "_id": "example-id",
            "name": "example-name",
            "surname": "example-surname",
            "email": "example@example.com",
            "phoneNumber": "123456789",
            "car": {
                "brand": "example-brand",
                "model": "example-model",
                "registrationPlate": "ABC1234"
            },
            "__v": 0
        }
    ]
```

### POST - driver
```javascript
POST /api/drivers
```

**Expected Body**:
```javascript
{
    "name": "example-name",          // string
    "surname": "example-surname",    // string
    "email": "example@example.com",  // string
    "phoneNumber": "123456789",      // string
    "car": {
        "brand": "example-brand",    // string
        "model": "example-model",    // string
        "registrationPlate": "ABC1234" // string
    },
    "location": {
        "latitude": 50.0,           // number
        "longitude": 50.0           // number
    }
}
```

**Expected Response**: returns object of created driver in database

```javascript
{
    "STATUS": "ADDED NEW DRIVER",
    "driver": {
        "_id": "example-id",
        "name": "example-name",
        "surname": "example-surname",
        "email": "example@example.com",
        "phoneNumber": "123456789",
        "car": {
            "brand": "example-brand",
            "model": "example-model",
            "registrationPlate": "ABC1234"
        },
        "location": {
            "latitude": 50.0,
            "longitude": 50.0
        },
        "__v": 0
    }
}
```

### PUT - driver by id
```javascript
PUT /api/drivers/:driverId
```

**Expected Body**:
```javascript
{
    "name": "example-name",          // string
    "surname": "example-surname",    // string
    "email": "example@example.com",  // string
    "phoneNumber": "123456789",      // string
    "car": {
        "brand": "example-brand",    // string
        "model": "example-model",    // string
        "registrationPlate": "ABC1234" // string
    },
    "location": {
        "latitude": 50.0,           // number
        "longitude": 50.0           // number
    }
}
```

**Expected Response**: updates driver specified by :driverId and returns object of updated driver in database

```javascript
{
    "STATUS": "DRIVER WITH ID: example-id WAS UPDATED",
    "updatedDriver": {
        "location": {
            "latitude": 50.0,
            "longitude": 50.0
        },
        "_id": "example-id",
        "name": "example-name",
        "surname": "example-surname",
        "email": "example@example.com",
        "phoneNumber": "123456789",
        "car": {
            "brand": "example-brand",
            "model": "example-model",
            "registrationPlate": "ABC1234"
        },
        "__v": 0
    }
}
```

### DELETE - driver by id
```javascript
DELETE /api/drivers/:driverId
```

**Expected Response**: deletes driver specified by :driverId

```javascript
{
    "STATUS": "DRIVER WITH ID: example-id WAS DELETED"
}
```


## Ride Endpoints

### GET - all rides
```javascript
GET /api/rides
```

**Expected Response**: returns array of rides in the database

```javascript
"STATUS": "ALL RIDES",
    "rides": [
        {
            "startLocation": {
                "latitude": 50.0,
                "longitude": 50.0
            },
            "endLocation": {
                "latitude": 50.0,
                "longitude": 50.0
            },
            "_id": "example-id",
            "price": 100,
            "status": "completed",
            "driver": "example-driver-id",
            "client": "example-client-id",
            "__v": 0
        }
    ]
```

### POST - ride
```javascript
POST /api/rides
```

**Expected Body**:
```javascript
{
    "driver": "example-driver-id",   // ObjectId (reference to Driver)
    "client": "example-client-id",   // ObjectId (reference to Client)
    "startLocation": {
        "latitude": 50.0,            // number
        "longitude": 50.0            // number
    },
    "endLocation": {
        "latitude": 50.0,            // number
        "longitude": 50.0            // number
    },
    "price": 100,                    // number
    "status": "completed"            // string
}
```

**Expected Response**: returns object of created ride in the database

```javascript
{
    "STATUS": "ADDED NEW RIDE",
    "ride": {
        "_id": "example-id",
        "driver": "example-driver-id",
        "client": "example-client-id",
        "startLocation": {
            "latitude": 50.0,
            "longitude": 50.0
        },
        "endLocation": {
            "latitude": 50.0,
            "longitude": 50.0
        },
        "price": 100,
        "status": "completed",
        "__v": 0
    }
}
```

### PUT - ride by id
```javascript
PUT /api/rides/:rideId
```

**Expected Body**:
```javascript
{
    "driver": "example-driver-id",   // ObjectId (reference to Driver)
    "client": "example-client-id",   // ObjectId (reference to Client)
    "startLocation": {
        "latitude": 50.0,            // number
        "longitude": 50.0            // number
    },
    "endLocation": {
        "latitude": 50.0,            // number
        "longitude": 50.0            // number
    },
    "price": 100,                    // number
    "status": "completed"            // string
}
```

**Expected Response**: updates ride specified by :rideId and returns object of updated ride in the database

```javascript
{
    "STATUS": "RIDE WITH ID: example-id WAS UPDATED",
    "updatedRide": {
        "_id": "example-id",
        "driver": "example-driver-id",
        "client": "example-client-id",
        "startLocation": {
            "latitude": 50.0,
            "longitude": 50.0
        },
        "endLocation": {
            "latitude": 50.0,
            "longitude": 50.0
        },
        "price": 100,
        "status": "completed",
        "__v": 0
    }
}
```

### DELETE - ride by id
```javascript
DELETE /api/rides/:rideId
```

**Expected Response**: deletes ride specified by :rideId

```javascript
{
    "STATUS": "RIDE WITH ID: example-id WAS DELETED"
}
```
