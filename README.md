# Social Network API

## Table of contents
​
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Instructions](#instructions)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
​
​
## Overview
​
### The challenge
​
The Social Network API project is a sample API for a social networking application to interact with a mongoDB database using Mongoose.  It utilizes NodeJs, express, and Mongoose to implement routes that can interact with a Mongo database.  This API can handle basic routes to do CRUD operations that are relevant to social network applications.
​
### User Story
​
```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```
​
### Acceptance Criteria
​
```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

​
​
### Instructions

- App Demo Video: [https://youtu.be/IqdjGDeY-Us](https://youtu.be/IqdjGDeY-Us)
<br>

## My process
​
### Built with
​
- JavaScript
- NodeJS
- NPM express
- NPM mongoose
- Mongo Database
​
### What I learned
​
In this challenge, I leanred how to successfully build my own API that interacts with a mongo database.  It required me to broaden my knowledge of mongoose Object Data Mapping so that I could successfully create, read, update, and delete data from a mongo database using routes that I created.  One challenge that I had to work through was implementing getter methods using mongoose to format timestamps.  Below is a `createdAt` field that was used in the `Thought` model's Schema as well as the `reactionSchema` subdocument:

```js
createdAt: {
    type: Date,
    default: Date.now(),
    get: formatTimestamp,
},
```

When using `type: Date` I learned from mongoose docs that it will be a Javascript Date object.  With this knowledge, I defined a getter method for the `get:` key to format the timestamp upon querying the data.  Below is the getter method:

```js
function formatTimestamp(createdAt) {
    const date = createdAt.toLocaleDateString([], { dateStyle: 'long' });
    const time = createdAt.toLocaleTimeString([], { timeStyle: 'short' });
    return `${date} at ${time}`;
};
```

As seen above, I utilized Javascripts Date API to format the date object how I wanted to present it in the API response body.  Then, I could return a string literal with the formatted dates strings in a visually pleasant structure.  Lastly, the schemas where the getter methods is being utilized must be configured to use getter methods.  Below I show how to set the getter methods to run for `toJSON`.  The docs gave me the impression getters default to true, however, this is not the case.  Like with virtuals, getters must be set to true.

```js
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
}
```
​
### Continued development
​
I am inspired to use this simple social network API as a boilerplate to implement user interaction on my existing applications.  This API is a great spring board to implement a simple social network feature to allow users to interact and create their own content.
​
### Useful resources
​
- [Moongoose unique](https://masteringjs.io/tutorials/mongoose/unique#:~:text=For%20example%2C%20below%20is%20how,('User'%2C%20userSchema)%3B) - This tutorial blog gave me insight on how mongoose's unique key affects the way a field's value will be kept unique for a model.
- [Mongoose Docs Getters/Setters](https://mongoosejs.com/docs/tutorials/getters-setters.html) - Mongoose docs were very helpful in guiding me to setup my getter method to format the timestamps.
- [MDN Docs Intl Date format options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) - This is MDN's docs for the formatting options when using the Date API in JavaScript.


## Author
​
Nolan Spence
- Website - [Nolan Spence](https://unicorn-barf.github.io/Portfolio_Website_HTML_CSS/)
- LinkedIn - [https://www.linkedin.com/in/aerospence/](https://www.linkedin.com/in/aerospence/)
​
## Acknowledgments

Thank you to my classmates Angie Soto and Asha Chakre for talking about concepts and ideas on how to tackle this project.
