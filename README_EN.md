# AutoRia-Clone

API for creating car sale advertisements. With this API, you can register a user, create car sale advertisements, and much more.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mikhail-Chkhan/autoria-clone.git
   cd autoria-clone
   ```

2. **Install dependencies:**:
   ```bash
   npm install
   ```

3. **Create a `.env` configuration file: **:  
   Create a `.env` file in the root of the project and fill it with the necessary values. Example file structure::
   ```env
   PORT=3000
   DB_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the project in development mode:**:
   ```bash
   npm run dev
   ```

5. **Build and start the project in production mode:**:
   ```bash
   npm run build
   npm start
   ```

## Available Commands

- `npm run dev` — Start the project in development mode.
- `npm run build` — Build the project for production.
- `npm start` — Start the project in production mode.

## Key Features

- **User registration and authentication**.
- **Creation and management of advertisements**.
- **Database connection for data storage**.

## Technologies

- Node.js
- Express.js
- MongoDB
- JWT
- TypeScript

## Configuration

Before running the project, ensure all environment variables are correctly specified in the `.env` file

---
# AUTH endpoints

## 1. Registration (Verification, User creation, Creation of 2 roles: default and saler, Token pair generation)

- ### GET `{{API_HOST}}/auth/send-verify-code` - `public`

```json
   {"email":"miha315@gmail.com"}
```
- ### POST: `{{API_HOST}}/auth/verify-code`- `public`
```json
{
    "email": "miha315@gmail.com",
    "verifyCode":"057fdb1e"
}
```
- ### POST: `{{API_HOST}}/auth/verify-code`- `public`
```json
{
    "email": "miha315@gmail.com",
    "verifyCode":"057fdb1e"
}
```
- ### POST: `{{API_HOST}}/auth/sign-up`- `public`
```json
{
   "name": "Misha Chkhan",
   "email": "miha315+3@gmail.com",
   "password": "March!2024",
   "regionId": 5,
   "city": "City Name",
   "phone": "+380662806981",
   "verifyCode": "f29293a4"
}
```
## Authorization:
### POST: `{{API_HOST}}/auth/sign-in`- `public`
```json
{
   "email": "miha315+156@gmail.com",
   "password": "March!2024"
}
```

## 3. Token pair update
### POST: `{{API_HOST}}/auth/sign-in`- `Bearer Token`:{{RefreshToken}}

## 4. Password change:
### POST: `{{API_HOST}}/auth/change-password`- `Bearer Token`:{{AccessToken}}
```json
{
    "email": "miha315+156@gmail.com",
    "password": "March!2024"
}
```
## 5. Forgot password
- ### Generate actionToken (sent to the specified email)
     ### POST: `{{API_HOST}}/auth/verify-code`- `public`
```json
{
    "email": "miha315@gmail.com"
}
```
- ### Set a new password
  ### PUT: `{{API_HOST}}/auth/set-password`- `actionToken in body`
```json
{
   "password": "March!2024new5",
   "token": "{{actionToken}}"
}
```
## 6. Delete current session (Token pair):
### POST: `{{API_HOST}}/auth/logout`- `Bearer Token`:{{AccessToken}}
   _no-body_

## 7. Delete all sessions (All token pairs):
### POST: `{{API_HOST}}/auth/logout/all`- `Bearer Token`:{{AccessToken}}
_no-body_
## Update permissions in the current user role:
### GET: `{{API_HOST}}/auth/update-role-template`- `Bearer Token`:{{AccessToken}}
_no-body_

---
# CARS endpoints
### 1. Create a car sale advertisement
### PUT: `{{API_HOST}}/cars/create` - `Bearer Token`:{{AccessToken}}
```json
{
   "brandId": 3,
   "model": "aaaaaaaaaa",
   "year": 2002,
   "vin": "1G8AN15F07Z174257",
   "fuelType": "diesel",
   "type": "hatchback",
   "engineCapacity": 1.6,
   "stateNumber": "AA1234AA",
   "distance": 12349,
   "new": false,
   "advertType": "privat",
   "regionID": 7,
   "city": "Donetsk",
   "defaultPrice": 10000,
   "defaultCurrency": "USD"
   // "companyId": "companyId"
}
```
### 2. Route to search for car sale advertisements (main)
### GET: ```{{API_HOST}}/cars?``` - `Bearer Token`:{{AccessToken}}
### Query Parameters Table

| Parameter    | Type      | Required | Description                                                                         |
|--------------|-----------|----------|-------------------------------------------------------------------------------------|
| `limit`      | `number`  | No       | Default is 10.  (from 1 to 26).                                                     |
| `page`       | `number`  | No       | Default is 1.                                                                       |
| `brand`      | `string`  | No       | Filter results by car brand (CarBrandEnum: `Renault`).                              |
| `year`       | `number`  | No       | Filter results by car production year (from 1900 to 2025)                           |
| `fuelType`   | `string`  | No       | Filter by fuel type (e.g., `lpg`). Possible values depend on `CarFuelTypeEnum`.     |
| `type`       | `string`  | No       | Filter by car body type (e.g., `sedan`). Possible values depend on `CarTypeEnum`.   |
| `advertType` | `string`  | No       | Filter by type of advertisement. Possible values: `privat`or `company`.             |
| `regionID`   | `number`  | No       | Filter by region ID (from 1 to 26).                                                 |
| `new`        | `boolean` | No       | Filter by condition of the car. Use `true` for new cars and `false` for used cars.  |
| `order`      | `string`  | No       | Sort order: `asc` for ascending or `desc` for descending. Default is `asc`.         |
| `orderBy`    | `string`  | No       | Field to order by (e.g., `year`,`distance`, `createdAt`, `regionID`). Default is `createdAt`. |

---

#### Example Usage

**URL:**
```http
GET /cars?limit=3&page=1&brand=Renault&year=2000&fuelType=lpg&type=sedan&advertType=privat&regionID=5&new=false&order=desc&orderBy=year
```
### 3. Get car data
### GET: `public`
```http
{{API_HOST}}/cars/6747ac28db53d3be78357982
```

### 4. Get the list of advertisements of an authorized user
**GET**: `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/cars/my
```

### 5. Edit a car sale advertisement
* all parameters are optional
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/cars/{{carId}}
```
```json
{
    "brandId": 5,
    "model": "model 1",
    "year": 2003,
    "vin": "1G8AN15F07Z174299",
    "fuelType": "electric",
    "type": "coupe",
    "engineCapacity": 1.6,
    "stateNumber": "AA1234AA",
    "distance": 12349,
    "new": false,
    "regionID": 7,
    "city": "Donetsk"
}
```
### 6. Mark the car as sold
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/cars/sale/{{carId}}
```
### 7. Deactivate the advertisement
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/cars/deactivate/{{carId}}
```
### 8. Add images to the car sale advertisement
* **POST**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/cars/upload/{{carId}}
```
**Query Parameter:**
* name: img
* type: file
* .png or i.mage

### 9. Delete images from the car sale advertisement
* **DELETE**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/cars/remove-img/{{filePath}}
```
---
# User endpoints
### 1. Get public user data
* **GET**
* **Autorization:** not
```http
{{API_HOST}}/users/{{userId}}
```
### 2. Get private user data
* **GET**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/users/me
```
### 3. Edit user data
* all parameters are optional
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/users/me
```
```json
{
   "name": "name update 2",
   "phone": "+380440000002",
    "regionId": "12",
   "city": "new sity 2"
}
```
### 4. Add user logo
* **POST**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/users/logo
```
**Query Parameter:**
* name: img
* type: file
* .png or i.mage

### 5. Delete images from the car sale advertisement
* **DELETE**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/users/remove-logo
```
### 5. Change user email
* #### 5.1 Send a verification request to generate an action token
* **POST**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/users/change-email-verify
```
```json
{
   "email": "miha315+1@gmail.com" //new email
}
```
* #### 5.2 Pass verification and edit email
* **POST**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/users/change-email
```
```json
{
    "email": "miha315+1@gmail.com",
    "verifyCode":"941dc212"
}
```
---
# CATALOG Endpoints
### 1.List of Ukrainian regions with translations
* **GET**
* **Autorization:** not
```http
{{API_HOST}}/catalog/region
```
### 2.List of car brands that can be saved in an advertisement
* **GET**
* **Autorization:** not
```http
{{API_HOST}}/catalog/brand
```
---
# REPORT Endpoints
### 1. Get car view statistics (for premium accounts only)
* **GET**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/reports/{{carId}}/stats
```
### 2. Get data on the average car price by region (for premium accounts only)
* **GET**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/reports/average-price/region/{{regionId}}
```
### 3. Get data on the average car price across Ukraine (for premium accounts only)
* **GET**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/reports//average-price/national
```
---
# ADMIN Endpoints
### 1. Create an admin user
* **POST**
* **Autorization:** not
```http
{{API_HOST}}/admin/create-admin-user
```
```json
{
   "name": "Misha Chkhan",
   "email": "miha315+4@gmail.com",
   "password": "March!2024",
   "regionId": 5,
   "city": "City Name",
   "phone": "+380662806981",
   "secretKey": {${secretKey}}
}
```
### 2. Change role:
* _For creating an account for a manager, or downgrading a manager's role to any chosen role_
* **POST**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/change-role
```
```json
{
   "userId": "67450eb1436691d478be00e1",
   "role": "manager"
}
```
### 3. Edit user data
* all parameters are required
* **PUT**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/user/{{carId}}
```
```json
{
   "name": "qqqqqqqqqqqqqqqqq",
   "phone": "+3804402323232",
   "email": "m.ch.test@fdfd.sss",
   "regionId": "1",
   "city": "Kiev",
   "accountType": "premium",
   // "companyId": null,
   "isBlocked": true
}
```
### 4. Get full user data
* **GET**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/get-user/{{userId}}
```
### 5. List and search all users
* **GET**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/user-list?orderBy=createdAt&order=desc&limit=5&page=1
```
####  Query Parameters Table

| Parameter    | Type       | Required | Description                                                                                   |
|--------------|------------|----------|-----------------------------------------------------------------------------------------------|
| `limit`      | `number`   | No       | Default is 10.  (from 1 to 26).                                                               |
| `page`       | `number`   | No       | Default is 1.                                                                                 |
| `search`     | `string`   | No       | Any text                                                                                      |
| `order`      | `string`   | No       | Sort order: `asc` for ascending or `desc` for descending. Default is `asc`.                   |
| `orderBy`    | `string`   | No       | Field to order by (e.g., `year`,`distance`, `createdAt`, `regionID`). Default is `createdAt`. |

### 6. Delete user account
* **DELETE**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/user/{{userId}}
```
### 7. Upgrade a user account to premium
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/change-acc-type-premium/{{userId}}
```
### 8. Downgrade a user account to basic
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/change-acc-type-basic/{{userId}}
```
### 9. Edit any user data
* all parameters are optional
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/car/{{userId}}
```
```json
{
   "brandId": 5,
   "model": "model 1",
   "year": 2003,
   "vin": "1G8AN15F07Z174299",
   "fuelType": "electric",
   "type": "coupe",
   "engineCapacity": 1.6,
   "stateNumber": "AA1234AA",
   "distance": 12349,
   "new": false,
   "regionID": 7,
   "city": "Donetsk",
   "isActive":false,
   "isCarSold":true
}
```
### 10. Delete a car sale advertisement
* **DELETE**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/car/{{carId}}
```
### 11. Add images to a car sale advertisement
* **POST**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/upload-car-img/{{carId}}
```
**Query Parameter:**
* name: img
* type: file
* .png or i.mage

### 12. Delete images from a car sale advertisement
* **DELETE**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/remove-car-img/car/{{filePath}}
```
### 13. Block a user, leaving only rights to view their data and public information.
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/blocked-user/674b934d1bcf2358677c2de0
```
---
