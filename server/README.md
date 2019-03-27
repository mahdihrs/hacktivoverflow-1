# hacktivoverflow

List of user routes:

|   Route       | HTTP  |Header(s) |Body    | Description
|---------------|:------|:---------|:-------|:-----------
|/users     |POST    | none     | email:String (**Required**), password:String (**Required**), full_name:String(**Required**)   | User registration
|/users/login |POST    | none     | email:String (**Required**), password:String (**Required**)   | User login
|/users     |GET   | none     | none | Get all users
|/users/:id |GET    | none     | none | Get certain user by Id
|/users/users/:id |PUT    | none     | email:String (**Required**), password:String (**Required**), full_name:String (**Required**) | Update a user with new data by Id
|/users/users/:id |DELETE | access_token     | none   | Delete a user by Id
|/questions    |GET   | none     | none   | Get all question list
|/questions    |POST   | access_token, role:Admin     | title:String, description:String | Add a Question
|/questions/:id    |GET   | none     | none | Get a single queestion by id
|/questions/:id    |PUT   | access_token  | title:String, description:String | Edit a question
|/questions/vote/:id    |PUT   | access_token  | direction | Vote a question (upvote and downvote)
|/questions/profile/getQuestions    |GET   | access_token  | none | Get questions owned by login user
|/questions/:id    |DELETE   | access_token  | none | Delete a question
|/answers/profile/getAnswers    |GET   | access_token | none | Get answers owned by login user
|/answers    |POST   | access_token | title:String, description:String | Create an answer
|/answers/vote/:id  | PUT | access_token | title:String, description:String | Vote an answer (up and down vote)
|/answers/:id  | PUT | access_token | title:String, description:String | Edit an answer by Id
|/answers/:id  |DELETE   | access_token | none | Delete an answer

# Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

$ npm install <br/>
$ npm start <br/>
$ npm run dev

Access the API via http://localhost:8080