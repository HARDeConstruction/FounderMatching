CREATE TABLE "UserAccount" (
  "UserID" serial PRIMARY KEY,
  "ClerkUserID" varchar UNIQUE NOT NULL,
  "Email" varchar UNIQUE NOT NULL
);

CREATE TABLE "UserRole" (
  "UserID" integer NOT NULL,
  "RoleID" integer NOT NULL
);

CREATE TABLE "Role" (
  "RoleID" serial PRIMARY KEY,
  "RoleName" varchar UNIQUE NOT NULL
);

CREATE TABLE "UserProfile" (
  "UserID" integer PRIMARY KEY,
  "FirstName" varchar NOT NULL,
  "LastName" varchar NOT NULL,
  "PhoneNumberID" integer,
  "CountryID" integer,
  "City" varchar,
  "LinkedInID" varchar,
  "Slogan" varchar,
  "Email" varchar UNIQUE
);

CREATE TABLE "CandidateProfile" (
  "CandidateID" integer PRIMARY KEY,
  "Industry" varchar,
  "University" varchar,
  "HobbyInterest" text,
  "GenderID" integer
);

CREATE TABLE "StartupProfile" (
  "StartupID" serial PRIMARY KEY,
  "UserID" integer NOT NULL,
  "Name" varchar NOT NULL,
  "Logo" varchar,
  "Industry" varchar,
  "PhoneNumberID" integer,
  "CountryID" integer,
  "City" varchar,
  "LinkedInID" varchar,
  "Slogan" varchar,
  "WebsiteLink" varchar,
  "Description" text,
  "CurrentStage" text,
  "Achievement" text
);

CREATE TABLE "Gender" (
  "GenderID" serial PRIMARY KEY,
  "GenderName" varchar UNIQUE
);

CREATE TABLE "PhoneNumber" (
  "PhoneNumberID" serial PRIMARY KEY,
  "FullNumber" varchar UNIQUE NOT NULL,
  "CountryCode" varchar,
  "AreaCode" varchar,
  "Number" varchar
);

CREATE TABLE "Country" (
  "CountryID" serial PRIMARY KEY,
  "NumCode" integer UNIQUE,
  "Alpha2Code" varchar,
  "Alpha3Code" varchar,
  "EnShortName" varchar,
  "Nationality" varchar
);

CREATE TABLE "StartupMembership" (
  "ID" serial PRIMARY KEY,
  "StartupID" integer NOT NULL,
  "UserID" integer NOT NULL,
  "PermissionID" integer,
  "Role" varchar,
  "Description" text
);

CREATE TABLE "Permission" (
  "PermissionID" serial PRIMARY KEY,
  "PermissionName" varchar UNIQUE
);

CREATE TABLE "Matching" (
  "ID" serial PRIMARY KEY,
  "CandidateID" integer NOT NULL,
  "StartupID" integer NOT NULL,
  "StatusID" integer,
  "IsMatched" boolean,
  "MatchDate" timestamptz
);

CREATE TABLE "MatchingStatus" (
  "StatusID" serial PRIMARY KEY,
  "StatusName" varchar UNIQUE
);

CREATE TABLE "Notification" (
  "ID" serial PRIMARY KEY,
  "UserID" integer NOT NULL,
  "Data" text,
  "IsRead" boolean,
  "CreatedDateTime" timestamptz
);

CREATE TABLE "PrivacySetting" (
  "PrivacySettingID" serial PRIMARY KEY,
  "Name" varchar UNIQUE NOT NULL,
  "Description" text
);

CREATE TABLE "PrivacyLevel" (
  "PrivacyLevelID" serial PRIMARY KEY,
  "LevelName" varchar UNIQUE
);

CREATE TABLE "UserPrivacySetting" (
  "UserID" integer NOT NULL,
  "PrivacySettingID" integer NOT NULL,
  "PrivacyLevelID" integer,
  "Note" text
);

CREATE TABLE "Tag" (
  "TagID" serial PRIMARY KEY,
  "Value" varchar UNIQUE NOT NULL,
  "Description" text
);

CREATE TABLE "UserTag" (
  "UserID" integer NOT NULL,
  "TagID" integer NOT NULL
);

CREATE TABLE "Experience" (
  "ExperienceID" serial PRIMARY KEY,
  "UserID" integer NOT NULL,
  "CompanyName" varchar,
  "Role" varchar,
  "Location" varchar,
  "Description" text,
  "StartDate" date,
  "EndDate" date
);

CREATE TABLE "Certificate" (
  "CertificateID" serial PRIMARY KEY,
  "UserID" integer NOT NULL,
  "Name" varchar,
  "Skill" varchar,
  "Description" text,
  "StartDate" date,
  "EndDate" date,
  "GPA" float
);

CREATE UNIQUE INDEX ON "UserRole" ("UserID", "RoleID");

CREATE UNIQUE INDEX ON "UserPrivacySetting" ("UserID", "PrivacySettingID");

CREATE UNIQUE INDEX ON "UserTag" ("UserID", "TagID");

ALTER TABLE "UserRole" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "UserRole" ADD FOREIGN KEY ("RoleID") REFERENCES "Role" ("RoleID");

ALTER TABLE "UserProfile" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "CandidateProfile" ADD FOREIGN KEY ("CandidateID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "CandidateProfile" ADD FOREIGN KEY ("GenderID") REFERENCES "Gender" ("GenderID");

ALTER TABLE "StartupProfile" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "StartupProfile" ADD FOREIGN KEY ("PhoneNumberID") REFERENCES "PhoneNumber" ("PhoneNumberID");

ALTER TABLE "StartupProfile" ADD FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID");

ALTER TABLE "UserProfile" ADD FOREIGN KEY ("PhoneNumberID") REFERENCES "PhoneNumber" ("PhoneNumberID");

ALTER TABLE "UserProfile" ADD FOREIGN KEY ("CountryID") REFERENCES "Country" ("CountryID");

ALTER TABLE "StartupMembership" ADD FOREIGN KEY ("StartupID") REFERENCES "StartupProfile" ("StartupID");

ALTER TABLE "StartupMembership" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "StartupMembership" ADD FOREIGN KEY ("PermissionID") REFERENCES "Permission" ("PermissionID");

ALTER TABLE "Matching" ADD FOREIGN KEY ("CandidateID") REFERENCES "CandidateProfile" ("CandidateID");

ALTER TABLE "Matching" ADD FOREIGN KEY ("StartupID") REFERENCES "StartupProfile" ("StartupID");

ALTER TABLE "Matching" ADD FOREIGN KEY ("StatusID") REFERENCES "MatchingStatus" ("StatusID");

ALTER TABLE "Notification" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "UserPrivacySetting" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "UserPrivacySetting" ADD FOREIGN KEY ("PrivacySettingID") REFERENCES "PrivacySetting" ("PrivacySettingID");

ALTER TABLE "UserPrivacySetting" ADD FOREIGN KEY ("PrivacyLevelID") REFERENCES "PrivacyLevel" ("PrivacyLevelID");

ALTER TABLE "UserTag" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "UserTag" ADD FOREIGN KEY ("TagID") REFERENCES "Tag" ("TagID");

ALTER TABLE "Experience" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "Certificate" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "StartupMembership" ADD FOREIGN KEY ("UserID") REFERENCES "MatchingStatus" ("StatusID");

ALTER TABLE "StartupMembership" ADD FOREIGN KEY ("PermissionID") REFERENCES "PrivacySetting" ("PrivacySettingID");

