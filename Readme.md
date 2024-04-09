


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

- {{host}}/profile/create => create new profile
- {{host}}/profile/all => retrieve all profiles
- {{host}}/profile:id => retrieve profile by Id


2. Comment

- {{host}}/comment/post/:profileId => create a new comment
- {{host}}/comment/* => get a comment (you may fill 'mbti' or 'enneagram' or 'zodiac' to filter the comment and sort with 'mostrecent' or 'mostliked' value to sort as a query parametes)
- {{host}}/comment/:commentId/like?profileId=${profileId} => like/unlike the comment
```



## Postman Documentation
Link (https://documenter.getpostman.com/view/9895117/2sA3Bg9v8y)