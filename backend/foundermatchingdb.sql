CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE privacy_type AS ENUM ('public', 'private', 'connections');
CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'rejected');


CREATE TABLE "UserAccount" (
  "UserID" SERIAL PRIMARY KEY,
  "ClerkUserID" uuid UNIQUE NOT NULL,
  "Email" varchar(255) UNIQUE NOT NULL,
  "FirstName" varchar(50) NOT NULL,
  "LastName" varchar(50) NOT NULL
);

CREATE TABLE "PhoneNumber" (
  "PhoneNumberID" SERIAL PRIMARY KEY,
  "CountryCode" varchar(5) NOT NULL,
  "AreaCode" varchar(5) NOT NULL,
  "Number" varchar(15) NOT NULL
);

CREATE TABLE "Countries" (
  "num_code" integer PRIMARY KEY,
  "alpha_2_code" varchar(2) NOT NULL,
  "alpha_3_code" varchar(3) NOT NULL,
  "en_short_name" varchar(100) NOT NULL,
  "nationality" varchar(100) NOT NULL
);

CREATE TABLE "Profile" (
  "ProfileID" SERIAL PRIMARY KEY,
  "UserID" integer NOT NULL,
  "IsStartup" bool NOT NULL DEFAULT false,
  "Name" varchar(100) NOT NULL,
  "Email" varchar(255) UNIQUE NOT NULL,
  "Industry" varchar(100) NOT NULL,
  "PhoneNumberID" integer UNIQUE,
  "CountryID" integer NOT NULL,
  "City" varchar(100),
  "LinkedInURL" varchar(255) UNIQUE,
  "Slogan" varchar(200),
  "WebsiteLink" varchar(255),
  "Achievement" varchar(2000),
  "Avatar" varchar(255),
  "Description" varchar(2000),
  "Gender" gender_type,
  "HobbyInterest" varchar(2000),
  "Education" varchar(200),
  "CurrentStage" varchar(2000)
);

CREATE TABLE "ProfilePrivacySettings" (
  "ProfileID" integer PRIMARY KEY NOT NULL,
  "GenderPrivacy" privacy_type DEFAULT 'public',
  "IndustryPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "PhoneNumberIDPrivacy" privacy_type DEFAULT 'public',
  "CountryIDPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "CityPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "UniversityPrivacy" privacy_type DEFAULT 'public',
  "LinkedInURLPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "SloganPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "CertificatePrivacy" privacy_type DEFAULT 'public',
  "ExperiencePrivacy" privacy_type DEFAULT 'public',
  "HobbyInterestPrivacy" privacy_type DEFAULT 'public',
  "ViewGraphPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "AchievementPrivacy" privacy_type NOT NULL DEFAULT 'public'
);

CREATE TABLE "StartupMembership" (
  "ID" SERIAL PRIMARY KEY,
  "StartupProfileID" integer NOT NULL,
  "UserID" integer NOT NULL,
  "Role" varchar(100) NOT NULL,
  "Description" varchar(2000)
);

CREATE TABLE "Matching" (
  "ID" SERIAL PRIMARY KEY,
  "CandidateProfileID" integer NOT NULL,
  "StartupProfileID" integer NOT NULL,
  "CandidateStatus" match_status NOT NULL DEFAULT 'pending',
  "StartupStatus" match_status NOT NULL DEFAULT 'pending',
  "IsMatched" boolean NOT NULL DEFAULT false,
  "MatchDate" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "CandidateNotification" integer,
  "StartupNotification" integer
);

CREATE TABLE "Notification" (
  "ID" SERIAL PRIMARY KEY,
  "Recipient" integer NOT NULL,
  "Data" varchar(2000),
  "Read" boolean NOT NULL DEFAULT false,
  "CreatedDateTime" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "IsStartupNotified" boolean NOT NULL DEFAULT false
);

CREATE TABLE "Tags" (
  "ID" SERIAL PRIMARY KEY,
  "Value" varchar(50) NOT NULL,
  "Description" varchar(500)
);

CREATE TABLE "ProfileTagInstances" (
  "ProfileOwnerID" integer NOT NULL,
  "TagID" integer NOT NULL,
  PRIMARY KEY ("ProfileOwnerID", "TagID")
);

CREATE TABLE "Experience" (
  "ExperienceID" SERIAL PRIMARY KEY,
  "ProfileOwner" integer NOT NULL,
  "CompanyName" varchar(100) NOT NULL,
  "Role" varchar(100),
  "Location" varchar(100),
  "Description" varchar(2000),
  "StartDate" timestamp,
  "EndDate" timestamp
);

CREATE TABLE "ExperienceTagInstances" (
  "ExperienceID" integer NOT NULL,
  "TagID" integer NOT NULL,
  PRIMARY KEY ("ExperienceID", "TagID")
);

CREATE TABLE "Certificate" (
  "CertificateID" SERIAL PRIMARY KEY,
  "ProfileOwner" integer NOT NULL,
  "Name" varchar(200) NOT NULL,
  "Skill" varchar(100),
  "Description" varchar(2000),
  "StartDate" timestamp,
  "EndDate" timestamp,
  "GPA" float
);

CREATE TABLE "CertificateTagInstances" (
  "CertificateID" integer NOT NULL,
  "TagID" integer NOT NULL,
  PRIMARY KEY ("CertificateID", "TagID")
);

CREATE TABLE "Achievement" (
  "AchievementID" SERIAL PRIMARY KEY,
  "ProfileOwner" integer NOT NULL,
  "Name" varchar(200) NOT NULL,
  "Description" varchar(2000),
  "Date" timestamp
);

CREATE TABLE "AchievementTagInstances" (
  "AchievementID" integer NOT NULL,
  "TagID" integer NOT NULL,
  PRIMARY KEY ("AchievementID", "TagID")
);

CREATE TABLE "ProfileViews" (
  "ViewID" SERIAL PRIMARY KEY,
  "FromProfileID" integer,
  "ToProfileID" integer,
  "ViewedAt" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "SavedProfiles" (
  "SaveID" SERIAL PRIMARY KEY,
  "SavedFromProfileID" integer NOT NULL,
  "SavedToProfileID" integer NOT NULL,
  "SavedAt" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "SkippedProfiles" (
  "SkipID" SERIAL PRIMARY KEY,
  "SkippedFromProfileID" integer NOT NULL,
  "SkippedToProfileID" integer NOT NULL,
  "SkippedAt" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE "Profile" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "Profile" ADD FOREIGN KEY ("PhoneNumberID") REFERENCES "PhoneNumber" ("PhoneNumberID");

ALTER TABLE "StartupMembership" ADD FOREIGN KEY ("StartupProfileID") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "Profile" ADD FOREIGN KEY ("CountryID") REFERENCES "Countries" ("num_code");

ALTER TABLE "ProfilePrivacySettings" ADD FOREIGN KEY ("ProfileID") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "ProfileViews" ADD FOREIGN KEY ("FromProfileID") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "ProfileViews" ADD FOREIGN KEY ("ToProfileID") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "SavedProfiles" ADD FOREIGN KEY ("SavedFromProfileID") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "SavedProfiles" ADD FOREIGN KEY ("SavedToProfileID") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "SkippedProfiles" ADD FOREIGN KEY ("SkippedFromProfileID") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "SkippedProfiles" ADD FOREIGN KEY ("SkippedToProfileID") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "StartupMembership" ADD FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "Matching" ADD FOREIGN KEY ("CandidateProfileID") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "Matching" ADD FOREIGN KEY ("StartupProfileID") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "Notification" ADD FOREIGN KEY ("Recipient") REFERENCES "UserAccount" ("UserID");

ALTER TABLE "ProfileTagInstances" ADD FOREIGN KEY ("TagID") REFERENCES "Tags" ("ID");

ALTER TABLE "ProfileTagInstances" ADD FOREIGN KEY ("ProfileOwnerID") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "ExperienceTagInstances" ADD FOREIGN KEY ("TagID") REFERENCES "Tags" ("ID");

ALTER TABLE "ExperienceTagInstances" ADD FOREIGN KEY ("ExperienceID") REFERENCES "Experience" ("ExperienceID");

ALTER TABLE "CertificateTagInstances" ADD FOREIGN KEY ("TagID") REFERENCES "Tags" ("ID");

ALTER TABLE "CertificateTagInstances" ADD FOREIGN KEY ("CertificateID") REFERENCES "Certificate" ("CertificateID");

ALTER TABLE "AchievementTagInstances" ADD FOREIGN KEY ("TagID") REFERENCES "Tags" ("ID");

ALTER TABLE "AchievementTagInstances" ADD FOREIGN KEY ("AchievementID") REFERENCES "Achievement" ("AchievementID");

ALTER TABLE "Experience" ADD FOREIGN KEY ("ProfileOwner") REFERENCES "Profile" ("ProfileID");

ALTER TABLE "Certificate" ADD FOREIGN KEY ("ProfileOwner") REFERENCES "Profile" ("ProfileID");
