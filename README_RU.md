
# AutoRia-Clone

API для создания объявлений о продаже авто. С помощью этого API вы можете зарегистрировать пользователя, создать объявление о продаже авто и многое другое.

## Установка

1. **Клонирование репозитория**:
   ```bash
   git clone https://github.com/Mikhail-Chkhan/autoria-clone.git
   cd autoria-clone
   ```

2. **Установка зависимостей**:
   ```bash
   npm install
   ```

3. **Создание файла конфигурации `.env`**:  
   Создайте файл `.env` в корне проекта и заполните его значениями. Пример структуры файла:
   ```env
   PORT=3000
   DB_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Запуск проекта в режиме разработки**:
   ```bash
   npm run dev
   ```

5. **Сборка и запуск проекта в продакшн-режиме**:
   ```bash
   npm run build
   npm start
   ```

## Доступные команды

- `npm run dev` — Запуск проекта в режиме разработки.
- `npm run build` — Сборка проекта для продакшена.
- `npm start` — Запуск проекта в продакшн-режиме.

## Основные возможности

- **Регистрация и авторизация пользователей**.
- **Создание и управление объявлениями**.
- **Подключение к базе данных для хранения информации**.

## Технологии

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)
- TypeScript (при использовании)

## Конфигурация

Перед запуском убедитесь, что все переменные окружения указаны корректно в файле `.env`.

---
# AUTH endpoints

## 1. Регистрация (Верификация, создание Юзера, Создание 2 ролей `defaul` and `saler`, Создание токен пары)

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
## 2. Авторизация:
### POST: `{{API_HOST}}/auth/sign-in`- `public`
```json
{
   "email": "miha315+156@gmail.com",
   "password": "March!2024"
}
```

## 3. Обновление Токен Пары
### POST: `{{API_HOST}}/auth/sign-in`- `Bearer Token`:{{RefreshToken}}

## 4. Смена пароля:
### POST: `{{API_HOST}}/auth/change-password`- `Bearer Token`:{{AccessToken}}
```json
{
    "email": "miha315+156@gmail.com",
    "password": "March!2024"
}
```
## 5. Забыли пароль
- ### Генерация actionToken (отправляется на указанный email)
   ### POST: `{{API_HOST}}/auth/verify-code`- `public`
```json
{
    "email": "miha315@gmail.com"
}
```
- ### Установка нового пароля
  ### PUT: `{{API_HOST}}/auth/set-password`- `actionToken in body`
```json
{
   "password": "March!2024new5",
   "token": "{{actionToken}}"
}
```
## 6. Удаление текущей сессии(Токен пары):
### POST: `{{API_HOST}}/auth/logout`- `Bearer Token`:{{AccessToken}}
   _no-body_

## 7. Удаление всех сессиий(Всех токен пары):
### POST: `{{API_HOST}}/auth/logout/all`- `Bearer Token`:{{AccessToken}}
_no-body_
## 8. Обновление пермишен в текущей Роли юзера:
### GET: `{{API_HOST}}/auth/update-role-template`- `Bearer Token`:{{AccessToken}}
_no-body_

---
# CARS endpoints
### 1. Создание объяления о продаже авто
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
### 2. Роут поиска объявлений о продаже авто (основной)
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
### 3. Получение данных авто 
### GET: `public`
```http
{{API_HOST}}/cars/6747ac28db53d3be78357982
```

### 4. Получение списка объявление авторизованого юзера
**GET**: `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/cars/my
```

### 5. Редактирование объявления о продаже авто
* все параметры не обзвтельные
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
### 6. Отметить - авто продано
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/cars/sale/{{carId}}
```
### 7. Деактивировать объявление
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/cars/deactivate/{{carId}}
```
### 8. Добавлние изображений к объявлению о продажи авто
* **POST**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/cars/upload/{{carId}}
```
**Query Parameter:**
* name: img
* type: file
* .png or i.mage

### 9. Удаление картинок с объявлений о продаже авто
* **DELETE**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/cars/remove-img/{{filePath}}
```
---
# User endpoints
### 1. Получение публичных данных пользователей
* **GET**
* **Autorization:** not
```http
{{API_HOST}}/users/{{userId}}
```
### 2. Получение приватных данных пользователей
* **GET**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/users/me
```
### 3. Редактирование данных пользователя
* все параметры не обзвтельные
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
### 4. Добавлние лого юзера
* **POST**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/users/logo
```
**Query Parameter:**
* name: img
* type: file
* .png or i.mage

### 5. Удаление картинок с объявлений о продаже авто
* **DELETE**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/users/remove-logo
```
### 5. Изминения email пользователя
* #### 5.1 Отправляем запрос на верификацию для генерации экшен токена
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
* #### 5.2 Проходим верификацию и редактируем email
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
### 1.Список областей Украины с переводами
* **GET**
* **Autorization:** not
```http
{{API_HOST}}/catalog/region
```
### 1.Список брендов авто, которые можно сохранить в обяление
* **GET**
* **Autorization:** not
```http
{{API_HOST}}/catalog/brand
```
---
# REPORT Endpoints
### 1. Получение статистики о просмотрах авто (только для премиум акк)
* **GET**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/reports/{{carId}}/stats
```
### 2. Получение данных о средней цене авто по региону (только для премиум акк)
* **GET**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/reports/average-price/region/{{regionId}}
```
### 3. Получение данных о средней цене авто по Украине (только для премиум акк)
* **GET**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/reports//average-price/national
```
---
# ADMIN Endpoints
### 1. Создание Админ пользователя
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
### 2. Изминения роли:
* _Для создание акк для менеджера, для понижения роли менеджера до любой выбранной роли_
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
### 3. Редактирование данных юзера юзеров
* все параметры обзвтельные
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
### 4. Получение полных данных юзера
* **GET**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/get-user/{{userId}}
```
### 5. Список и поиск всех юзеров
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

### 6. Удаление акк юзера
* **DELETE**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/user/{{userId}}
```
### 7. Изменить акк юзераина на премиум
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/change-acc-type-premium/{{userId}}
```
### 8. Изменить акк юзераина на basic
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/change-acc-type-basic/{{userId}}
```
### 9. Редактирование любых данных юзера юзеров
* все параметры не обзвтельные
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
### 10. Удаление объявления о продаже авто
* **DELETE**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/car/{{carId}}
```
### 11. Добавлние изображений к объявлению о продажи авто
* **POST**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/upload-car-img/{{carId}}
```
**Query Parameter:**
* name: img
* type: file
* .png or i.mage

### 12. Удаление картинок с объявлений о продаже авто
* **DELETE**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/remove-car-img/car/{{filePath}}
```
### 13. Блокирование юзера, оставляем только права на просомтр свои данных и публичной информаци
* **PATCH**
* **Autorization:** `Bearer Token`:{{AccessToken}}
```http
{{API_HOST}}/admin/blocked-user/674b934d1bcf2358677c2de0
```
---
