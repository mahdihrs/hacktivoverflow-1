# hacktivoverflow

**List of user routes:**

|   Route       | HTTP  |Header(s) |Body    | Description | Res: Success | Res: Error |
|---------------|:------|:---------|:-------|:-----------|:------------|:---------|
|/users     |POST    | none     | email:String (**Required**), password:String (**Required**), name:String(**Required**), birthday:Date(**String**)   | User registration | Status(201), Data: {msg: ..., newUser: {...}} | Status(400), Data: {msg: ...}
|/users/login |POST    | none | email:String (**Required**), password:String (**Required**)   | User login | Status(200), Data: {msg: ..., token: '...', user: {...}} | Status(422), Data: {msg: ...}
|/users     |GET   | none     | none | Get all users | Status(200), Data: [{...}] | Status(500), Data: {msg: ..., err: [{...}]}
|/users/:id |GET    | none     | access_token | Get certain user by Id | Status(200), Data: {...} | Status(500), Data: {msg: ..., err: [{...}]}
|/users//my-articles-based-on-watched-tags |GET    | access_token | none | Get articles based on user's watched tags |Status(200), Data: [{...}] | Status(500), Data: {msg: ..., err: [{...}]}
|/users/edit-watched-tags |POST | access_token | tags: [{...}]  (**Required**) | Edit user's watched tags | Status(200), Data: {msg: ...} | Status(500), Data: {msg: ..., err: [{...}]}
|/users/edit-my-watched-tags |PATCH | access_token | tags: [{...}]  (**Required**) | Edit user's watched tags | Status(200), Data: {msg: ...} | Status(500), Data: {msg: ..., err: [{...}]}


**List of Question routes:**

|   Route       | HTTP  |Header(s) |Body    | Description | Res: Success | Res: Error |
|---------------|:------|:---------|:-------|:-----------|:------------|:---------|
|/questions    |GET   | none     | none   | Get all question list | Status(200), Data: [{...}] | Status(500), Data: {msg: ..., err: [{...}]} |
|/questions    |POST   | access_token | title:String, description:String | Add a Question | Status(201), Data: {msg: ...} | Status(400), Data: {msg: {...}} |
|/questions/:id    |GET   | none     | none | Get a single question by id | Status(200), {...} | Status(500), Data: {msg: ..., err: [{...}]} |
|/questions/:id    |PUT   | access_token  | title:String, description:String | Edit a question | Status(200), Data: {...} | Status(500), Data: {msg: ..., err: [{...}]} |
|/questions/vote/:id    |PUT   | access_token  | direction | Vote a question (upvote and downvote) | Status(200), Data: {...} | Status(500), Data: {msg: ..., err: [{...}]} |
|/questions/profile/getQuestions    |GET   | access_token  | none | Get questions owned by login user | Status(200), Data: [{...}] | Status(500), Data: {msg: ..., err: [{...}]} |
|/questions/:id    |DELETE   | access_token  | none | Delete a question | Status(200), Data: [{...}] | Status(500), Data: {msg: ..., err: [{...}]} |
|/questions/user-view-question/:id    |DELETE   | access_token  | none | Count questions viewed by user | Status(200), Data: {...} | Status(500), Data: {msg: ..., err: [{...}]} |
|/questions/search-tag/:tagId  |GET   | none  | none | Get questions by tag | Status(200), Data: [{...}] | Status(500), Data: {msg: ..., err: [{...}]} |

**List of Answers routes:**

|   Route       | HTTP  |Header(s) |Body    | Description | Res: Success | Res: Error |
|---------------|:------|:---------|:-------|:-----------|:------------|:---------|
|/answers/profile/getAnswers    |GET   | access_token | none | Get answers owned by login user | Status(200), Data: [{...}] | Status(500), Data: {msg: ..., err: [{...}]} |
|/answers    |POST   | access_token | title:String, description:String | Create an answer | Status(201), Data: [{...}] | Status(500), Data: {msg: {...}} |
|/answers/vote/:id  | PUT | access_token | title:String, description:String | Vote an answer (up and down vote) | Status(200), Data: {...} | Status(500), Data: {msg: ..., err: [{...}]} |
|/answers/:id  | PUT | access_token | title:String, description:String | Edit an answer by Id | Status(200), Data: {...} | Status(500), Data: {msg: ..., err: [{...}]} |
|/answers/:id  |DELETE   | access_token | none | Delete an answer | Status(200), Data: {...} | Status(500), Data: {msg: ..., err: [{...}]} |
|/answers/get-question/:answerId  | DELETE | access_token | none | Get question by answer id | Status(200), Data: {...} | Status(500), Data: {msg: ..., err: [{...}]} |

**List of Tag routes:**

|   Route       | HTTP  |Header(s) |Body    | Description | Res: Success | Res: Error |
|---------------|:------|:---------|:-------|:-----------|:------------|:---------|
|/tags  | GET | none | none | Get all tags | Status(200), Data: [{...}] | Status(500), Data: {msg: ..., err: [{...}]} |

# Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

$ npm install <br/>
$ npm start <br/>
$ npm run dev

Access the API via http://localhost:8080