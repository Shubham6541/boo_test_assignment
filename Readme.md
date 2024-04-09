


## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Endpoints
```sh
1. Profile

- {{host}}/:id => retrieve profile by Id

2. User

- {{host}}/user/createUser => create new user
- {{host}}/user/getAll => retrieve all registered users

3. Comment

- {{host}}/comment/postComment/:userId => create a new comment
- {{host}}/comment/getComment => get a comment (you may fill 'mbti' or 'enneagram' or 'zodiac' to filter the comment and sort with 'mostrecent' or 'mostliked' value to sort as a query parametes)
- {{host}}/comment/likeComment => like/unlike the comment
```



## Postman Documentation
Link (https://documenter.getpostman.com/view/9895117/2sA3Bg9v8y)