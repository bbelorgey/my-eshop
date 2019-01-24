create database wcs_eshop character set utf8 collate utf8_unicode_ci;
create user 'eshop'@'localhost' identified by 'Eshop123';
grant all privileges on wcs_eshop.* to 'eshop'@'localhost';
flush privileges;