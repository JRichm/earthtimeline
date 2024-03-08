/*
  Warnings:

  - You are about to drop the column `eventPeriodID` on the `datedEvents` table. All the data in the column will be lost.
  - You are about to drop the column `eventTypeID` on the `datedEvents` table. All the data in the column will be lost.
  - Added the required column `eventDetails` to the `datedEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventEndDate` to the `datedEvents` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_datedEvents" (
    "eventID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventName" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "eventEndDate" DATETIME NOT NULL,
    "eventDetails" TEXT NOT NULL
);
INSERT INTO "new_datedEvents" ("eventDate", "eventID", "eventName") SELECT "eventDate", "eventID", "eventName" FROM "datedEvents";
DROP TABLE "datedEvents";
ALTER TABLE "new_datedEvents" RENAME TO "datedEvents";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
