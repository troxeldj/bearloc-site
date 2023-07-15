CREATE TABLE LIST_LISTINGS (
  PROPERTYID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ADDRESSONE Varchar(50),
  ADDRESSTWO Varchar(30),
  NUMBEDROOMS int NOT NULL,
  NUMBATHROOMS int NOT NULL,
  CITY Varchar(15) NOT NULL,
  ZIPCODE Char(5),
  PRICE Varchar(6) NOT NULL,
  LASTUPDATE Date
);

