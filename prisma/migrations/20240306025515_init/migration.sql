-- CreateTable
CREATE TABLE "datedEvents" (
    "eventID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventName" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "eventPeriodID" INTEGER NOT NULL,
    "eventTypeID" INTEGER NOT NULL,
    CONSTRAINT "datedEvents_eventPeriodID_fkey" FOREIGN KEY ("eventPeriodID") REFERENCES "timelinePeriods" ("periodID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "datedEvents_eventTypeID_fkey" FOREIGN KEY ("eventTypeID") REFERENCES "eventTypes" ("typeID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "timelinePeriods" (
    "periodID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "periodName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "eventTypes" (
    "typeID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "typeName" TEXT NOT NULL
);
