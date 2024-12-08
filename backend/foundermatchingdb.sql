CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE privacy_type AS ENUM ('public', 'private', 'connections');
CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'rejected');


CREATE TABLE "UserAccount" (
  "UserID" serial PRIMARY KEY,
  "ClerkUserID" uuid,
  "Email" varchar,
  "FirstName" varchar,
  "LastName" varchar,
  "IsCandidate" boolean,
  "IsStartup" boolean
);

CREATE TABLE "PhoneNumber" (
  "PhoneNumberID" serial PRIMARY KEY,
  "CountryCode" varchar,
  "AreaCode" varchar,
  "Number" varchar,
  "Privacy" integer
);

CREATE TABLE "Countries" (
  "num_code" integer PRIMARY KEY,
  "alpha_2_code" varchar,
  "alpha_3_code" varchar,
  "en_short_name" varchar,
  "nationality" varchar
);

CREATE TABLE "CandidateProfile" (
  "CandidateID" serial PRIMARY KEY,
  "UserID" integer REFERENCES "UserAccount" ("UserID"),
  "Industry" varchar,
  "PhoneNumberID" integer REFERENCES "PhoneNumber" ("PhoneNumberID"),
  "CountryID" integer REFERENCES "Countries" ("num_code"),
  "City" varchar,
  "University" varchar,
  "LinkedInURL" varchar,
  "Slogan" varchar,
  "HobbyInterest" text,
  "Gender" gender_type
);

CREATE TABLE "StartupProfile" (
  "StartupID" serial PRIMARY KEY,
  "UserOwnerID" integer REFERENCES "UserAccount" ("UserID"),
  "Name" varchar,
  "Email" varchar,
  "Logo" varchar,
  "Industry" varchar,
  "PhoneNumberID" integer REFERENCES "PhoneNumber" ("PhoneNumberID"),
  "CountryID" integer REFERENCES "Countries" ("num_code"),
  "City" varchar,
  "LinkedInURL" varchar,
  "Slogan" varchar,
  "WebsiteLink" varchar,
  "Description" text,
  "CurrentStage" text,
  "Achievement" text
);

CREATE TABLE "StartupProfilePrivacySettings" (
  "StartupID" integer REFERENCES "StartupProfile" ("StartupID"),
  "IndustryPrivacy" privacy_type,
  "PhoneNumberIDPrivacy" privacy_type,
  "CountryIDPrivacy" privacy_type,
  "CityPrivacy" privacy_type,
  "LinkedInURLPrivacy" privacy_type,
  "SloganPrivacy" privacy_type,
  "WebsiteLinkPrivacy" privacy_type,
  "DescriptionPrivacy" privacy_type,
  "CurrentStagePrivacy" privacy_type,
  "AchievementPrivacy" privacy_type,
  "ViewGraphPrivacy" privacy_type
);

CREATE TABLE "CandidateProfilePrivacySettings" (
  "CandidateID" integer REFERENCES "CandidateProfile" ("CandidateID"),
  "IndustryPrivacy" privacy_type,
  "PhoneNumberIDPrivacy" privacy_type,
  "CountryIDPrivacy" privacy_type,
  "CityPrivacy" privacy_type,
  "UniversityPrivacy" privacy_type,
  "LinkedInURLPrivacy" privacy_type,
  "SloganPrivacy" privacy_type,
  "EducationPrivacy" privacy_type,
  "ExperiencePrivacy" privacy_type,
  "HobbyInterestPrivacy" privacy_type,
  "ViewGraphPrivacy" privacy_type
);

CREATE TABLE "StartupMembership" (
  "ID" integer PRIMARY KEY,
  "StartupID" integer,
  "UserID" integer,
  "Role" varchar,
  "Description" integer
);

CREATE TABLE "Matching" (
  "ID" serial PRIMARY KEY,
  "CandidateID" integer,
  "StartupID" integer,
  "CandidateStatus" match_status,
  "StartupStatus" match_status,
  "IsMatched" boolean,
  "MatchDate" timestamp,
  "CandidateNotification" integer,
  "StartupNotification" integer
);

CREATE TABLE "Notification" (
  "ID" serial PRIMARY KEY,
  "Recipient" integer,
  "Data" text,
  "Read" boolean,
  "CreatedDateTime" timestamp,
  "IsStartupNotified" boolean
);

CREATE TABLE "Tags" (
  "ID" serial PRIMARY KEY,
  "Value" varchar,
  "Description" text
);

CREATE TABLE "TagCandidateInstances" (
  "CandidateOwnerID" integer,
  "TagID" integer,
  PRIMARY KEY ("CandidateOwnerID", "TagID")
);

CREATE TABLE "TagStartupInstances" (
  "StartupOwnerID" integer,
  "TagID" integer,
  PRIMARY KEY ("StartupOwnerID", "TagID")
);

CREATE TABLE "Experience" (
  "ID" serial PRIMARY KEY,
  "CandidateOwner" integer,
  "CompanyName" varchar,
  "Role" varchar,
  "Location" varchar,
  "Description" text,
  "StartDate" timestamp,
  "EndDate" timestamp
);

CREATE TABLE "Certificate" (
  "ID" serial PRIMARY KEY,
  "CandidateOwner" integer,
  "Name" varchar,
  "Skill" varchar,
  "Description" text,
  "StartDate" timestamp,
  "EndDate" timestamp,
  "GPA" float
);

CREATE TABLE "ProfileViews" (
  "ViewID" serial PRIMARY KEY,
  "ViewerID" integer,
  "ViewedCandidateID" integer,
  "ViewedStartupID" integer,
  "ViewedAt" timestamp
);

CREATE TABLE "SavedProfiles" (
  "SaveID" serial PRIMARY KEY,
  "UserID" integer,
  "SavedCandidateID" integer,
  "SavedStartupID" integer,
  "SavedAt" timestamp
);

CREATE TABLE "SkippedProfiles" (
  "SkipID" serial PRIMARY KEY,
  "UserID" integer,
  "SkippedCandidateID" integer,
  "SkippedStartupID" integer,
  "SkippedAt" timestamp
);

ALTER TABLE "StartupMembership" ADD FOREIGN KEY ("StartupID") REFERENCES "StartupProfile" ("StartupID");

ALTER TABLE "StartupMembership" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "Matching" ADD FOREIGN KEY ("CandidateID") REFERENCES "CandidateProfile" ("CandidateID");

ALTER TABLE "Matching" ADD FOREIGN KEY ("StartupID") REFERENCES "StartupProfile" ("StartupID");

ALTER TABLE "Notification" ADD FOREIGN KEY ("Recipient") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "TagCandidateInstances" ADD FOREIGN KEY ("TagID") REFERENCES "Tags" ("ID");

ALTER TABLE "TagStartupInstances" ADD FOREIGN KEY ("StartupOwnerID") REFERENCES "StartupProfile" ("StartupID");

ALTER TABLE "TagStartupInstances" ADD FOREIGN KEY ("TagID") REFERENCES "Tags" ("ID");

ALTER TABLE "Experience" ADD FOREIGN KEY ("CandidateOwner") REFERENCES "CandidateProfile" ("CandidateID");

ALTER TABLE "Certificate" ADD FOREIGN KEY ("CandidateOwner") REFERENCES "CandidateProfile" ("CandidateID");

ALTER TABLE "TagCandidateInstances" ADD FOREIGN KEY ("CandidateOwnerID") REFERENCES "CandidateProfile" ("CandidateID");
ALTER TABLE "ProfileViews" ADD FOREIGN KEY ("ViewerID") REFERENCES "UserAccount" ("UserID");
ALTER TABLE "ProfileViews" ADD FOREIGN KEY ("ViewedCandidateID") REFERENCES "CandidateProfile" ("CandidateID");
ALTER TABLE "ProfileViews" ADD FOREIGN KEY ("ViewedStartupID") REFERENCES "StartupProfile" ("StartupID");

ALTER TABLE "SavedProfiles" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");
ALTER TABLE "SavedProfiles" ADD FOREIGN KEY ("SavedCandidateID") REFERENCES "CandidateProfile" ("CandidateID");
ALTER TABLE "SavedProfiles" ADD FOREIGN KEY ("SavedStartupID") REFERENCES "StartupProfile" ("StartupID");

ALTER TABLE "SkippedProfiles" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");
ALTER TABLE "SkippedProfiles" ADD FOREIGN KEY ("SkippedCandidateID") REFERENCES "CandidateProfile" ("CandidateID");
ALTER TABLE "SkippedProfiles" ADD FOREIGN KEY ("SkippedStartupID") REFERENCES "StartupProfile" ("StartupID");
