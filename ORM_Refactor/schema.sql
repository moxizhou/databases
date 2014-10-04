CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  messageid integer(10),
  text varchar(255),
  userid integer(10)
);

CREATE TABLE users (
  userid integer(10),
  username varchar(30)
);

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




