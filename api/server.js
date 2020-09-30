const session = require('express-session');

// connect-session-knex exports a function. This function takes an
// express-session object as a parameter, and returns a class constructor
// function (which you can use with the "new" keyword, as we do below in the
// sessionOptions object.) When you use this method to create a new object, you
// pass it a JSON object comprised configuration properties that tell it where
// to find our knex config file, and what table and column name to create in our
// database, in order to store session records. The object returned by this
// class function has properties and methods that allow express-session to store
// session data through it. 
const knexSessionStore = require('connect-session-knex')(session);

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const restricted = require('../auth/restricted-middleware.js');

// get our express routers
const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router.js");

// create the server object
const server = express();

const sessionConfig = {
    name: 'sksession',
    secret: 'myspeshulsecret',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false, // should be true in production
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new knexSessionStore(
      {
        knex: require("../database/connection.js"),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
      }
    )
  }
  
  // global middleware
  server.use(helmet());
  server.use(express.json());
  server.use(cors());

  server.use(session(sessionConfig));

  server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "Badges? We don't need no stinkin' badges." });
});

module.exports = server;