DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id varchar(32) PRIMARY KEY,
  username varchar(30) NOT NULL,
  password varchar(255) NOT NULL
);
CREATE INDEX idx_username ON user (username);
-- xiaohuohumax password: 1234567890
INSERT INTO user (id, username, password)
VALUES (
    'b41e45593e484fcab833a003ddd502f7',
    'xiaohuohumax',
    '$2b$12$bbH2otM4yLkeipoDvuQwsucxbMNXYbQA2DzBrKFNtkjKntix77dmy'
  );