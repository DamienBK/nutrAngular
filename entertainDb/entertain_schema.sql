use entertain;

CREATE TABLE users
(
id INTEGER AUTO_INCREMENT,
email TEXT,
password TEXT,
PRIMARY KEY (id)
) COMMENT='This is the users table required for auth';