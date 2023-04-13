# auth-api
JS 401 lab 08

```
auth-api

├─ .gitignore
├─ LICENSE
├─ README.md
├─ api-server
│  ├─ index.js
│  ├─ package.json
│  └─ src
│     ├─ error-handlers
│     │  ├─ 404.js
│     │  └─ 500.js
│     ├─ middleware
│     │  └─ logger.js
│     ├─ models
│     │  ├─ clothes
│     │  │  └─ model.js
│     │  ├─ data-collection.js
│     │  ├─ food
│     │  │  └─ model.js
│     │  └─ index.js
│     ├─ routes
│     │  └─ v1.js
│     └─ server.js
└─ auth-server
   ├─ .gitignore
   ├─ index.js
   ├─ package.json
   └─ src
      ├─ auth
      │  ├─ middleware
      │  │  ├─ acl.js
      │  │  ├─ basic.js
      │  │  └─ bearer.js
      │  ├─ models
      │  │  ├─ index.js
      │  │  └─ users.js
      │  └─ routes.js
      ├─ error-handlers
      └─ server.js

```