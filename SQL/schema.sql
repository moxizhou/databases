CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  messageid varchar(10),
  text varchar(255),
  userid varchar(10)
);

CREATE TABLE users (
  userid varchar(10),
  username varchar(30)
);

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




