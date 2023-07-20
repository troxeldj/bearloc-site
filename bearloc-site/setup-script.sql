CREATE TABLE LIST_LISTINGS (
  PROPERTYID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ADDRESSONE Varchar(50) NOT NULL,
  ADDRESSTWO Varchar(30),
  NUMBEDROOMS int NOT NULL,
  NUMBATHROOMS int NOT NULL,
  CITY Varchar(15) NOT NULL,
  ZIPCODE Char(5),
  PRICE Varchar(6) NOT NULL
);


INSERT INTO LIST_LISTINGS (ADDRESSONE, ADDRESSTWO, NUMBEDROOMS, NUMBATHROOMS, CITY, ZIPCODE, PRICE) VALUES
("759 Ridgeway Ave.", NULL, 1, 1, "Cincinnati", 45229, 775),
("137 Glenridge Pl.", "No. 4", 1, 1, "Cincinnati", 45217, 775),
("735 Elberon Ave.", "No. 3", 1, 1, "Cincinnati", 45205, 795),
("3338 Hillside Ave.", NULL, 2, 1, "Cincinnati", 45204, 850),
("5144 Montgomery Rd.", "Apt. 7", 1, 1, "Norwood", 45212, 850),
("4201 Victory Pkwy", NULL, 2, 1, "Cincinnati", 45229, 1155),



INSERT INTO LIST_LISTINGS (ADDRESSONE, ADDRESSTWO, NUMBEDROOMS, NUMBATHROOMS, CITY, ZIPCODE, PRICE) VALUES
("739 E McMillan St", NULL, 1, 1, "Cincinnati", 45206, 1290),
("2312 Ohio Ave.", NULL, 1, 1, "Cincinnati", 45219, 905),
("634 Sycamore St.", NULL, 2, 2, "Cincinnati", 45202, 2065),
("359 Ludlow Ave.", "No. 5", 1, 1, "Cincinnati", 45220, 750),
("260 Ludlow Ave.", NULL, 1, 1, "Cincinnati", 45220, 1025),
("3280 Jefferson Ave.", "No. 2", 3, 2, "Cincinnati", 45220, 2108);