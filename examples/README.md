# ES6 example of express-routes-mapper

## Getting started

### 1. Install dependencies
```bash
$ npm i
```

OR 
```bash
$ yarn
```

### 2. Transpile and run application
```bash
$ npm start
```

### 3. Test API

  Open [Postman](https://www.getpostman.com/)

  #### a. `POST /user`

    select `POST` method and type `localhost:3338/user`

    click on body, select `x-www-form-urlencoded`

    type name for `key` and something for `value`

    hit `send` button. you should get `create user: something` as respond

  #### b. `GET /user/:id`

    select `GET` method and type (for example) `localhost:3338/user/id`

    hit `send` button. you should get response text `user with id: 1`
