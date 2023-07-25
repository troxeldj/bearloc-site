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
("739 E McMillan St", NULL, 1, 1, "Cincinnati", 45206, 1290),
("634 Sycamore St.", NULL, 2, 2, "Cincinnati", 45202, 2065),
("359 Ludlow Ave.", "No. 5", 1, 1, "Cincinnati", 45220, 750),
("260 Ludlow Ave.", NULL, 1, 1, "Cincinnati", 45220, 1025),
("3280 Jefferson Ave.", "No. 2", 3, 2, "Cincinnati", 45220, 2108),
("700 Riddle Rd.", NULL, 1, 1, "Cincinnati", 45220, 860),
("29 W McMillan St.", "No. 3", 3, 1, "Cincinnati", 45219, 2450),
("108 Valencia St.", "No. 3", 1, 1, "Cincinnati", 45219, 775),
("2640 Burnet Ave.", "Apt. 26", 1, 1, "Cincinnati", 45219, 695),
("621 Clemmer Ave.", NULL, 1, 1, "Cincinnati", 45219, 900),
("2714 Jefferson Ave.", "No. 5", 1, 1, "Cincinnati", 45219, 840),
("2512 Highland Ave.", "Apt. 6", 1, 1, "Cincinnati", 45219, 725),
("2532 Highland Ave.", "Apt. 5", 1, 1, "Cincinnati", 45219, 795),
("2512 Highland Ave.", "Apt. 6", 1, 1, "Cincinnati", 45219, 725),
("2058 Auburn Ave.", "Apt. 8", 1, 1, "Cincinnati", 45219, 775),
("302 Oak St.", "Apt 7.", 1, 1, "Cincinnati", 45219, 964),
("131 Kinsey Ave.", NULL, 1, 1, "Cincinnati", 45219, 850),
("519 W McMicken Ave.", "No. 4", 2, 1, "Cincinnati", 45219, 1325),
("2143 West Clifton Ave.", "Apt. 4", 1, 1, "Cincinnati", 45219, 800),
("271 Mohawk St.", "Apt. 1", 2, 1, "Cincinnati", 45214, 1100),
("3138 Bishop St.", "Apt. 7", 1, 1, "Cincinnati", 45220, 895),
("524 Riddle Crest Ln.", "Apt. 4", 2, 1, "Cincinnati", 45220, 995);

