CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE privacy_type AS ENUM ('public', 'private', 'connections');
CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'rejected');


CREATE TABLE "UserAccount" (
  "UserID" serial PRIMARY KEY,
  "ClerkUserID" uuid NOT NULL UNIQUE,
  "Email" varchar(255) NOT NULL UNIQUE CHECK ("Email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  "FirstName" varchar(50) NOT NULL,
  "LastName" varchar(50) NOT NULL,
  "IsCandidate" boolean NOT NULL DEFAULT false,
  "IsStartup" boolean NOT NULL DEFAULT false
);

CREATE TABLE "PhoneNumber" (
  "PhoneNumberID" serial PRIMARY KEY,
  "CountryCode" varchar(5) NOT NULL CHECK ("CountryCode" ~ '^\+[0-9]{1,4}$'),
  "AreaCode" varchar(5) NOT NULL CHECK ("AreaCode" ~ '^[0-9]{2,5}$'),
  "Number" varchar(15) NOT NULL CHECK ("Number" ~ '^[0-9]{4,12}$')
);

CREATE TABLE "Countries" (
  "num_code" integer PRIMARY KEY,
  "alpha_2_code" varchar(2) NOT NULL,
  "alpha_3_code" varchar(3) NOT NULL,
  "en_short_name" varchar(100) NOT NULL,
  "nationality" varchar(100) NOT NULL
);

CREATE TABLE "CandidateProfile" (
  "CandidateID" serial PRIMARY KEY,
  "UserID" integer NOT NULL REFERENCES "UserAccount" ("UserID") UNIQUE,
  "Gender" gender_type NOT NULL,
  "Industry" varchar(100) NOT NULL,
  "PhoneNumberID" integer NOT NULL REFERENCES "PhoneNumber" ("PhoneNumberID") UNIQUE,
  "CountryID" integer NOT NULL REFERENCES "Countries" ("num_code"),
  "City" varchar(100),
  "University" varchar(200),
  "LinkedInURL" varchar(255) UNIQUE CHECK ("LinkedInURL" ~ '^https?:\/\/(www\.)?linkedin\.com\/.*$'),
  "Slogan" varchar(200),
  "WebsiteLink" varchar(255),
  "HobbyInterest" varchar(2000),
  "Achievement" varchar(2000)
);

CREATE TABLE "StartupProfile" (
  "StartupID" serial PRIMARY KEY,
  "UserOwnerID" integer NOT NULL REFERENCES "UserAccount" ("UserID") UNIQUE,
  "Name" varchar(100) NOT NULL,
  "Email" varchar(255) NOT NULL UNIQUE CHECK ("Email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  "Logo" varchar(255),
  "Industry" varchar(100) NOT NULL,
  "PhoneNumberID" integer NOT NULL REFERENCES "PhoneNumber" ("PhoneNumberID") UNIQUE,
  "CountryID" integer NOT NULL REFERENCES "Countries" ("num_code"),
  "City" varchar(100),
  "LinkedInURL" varchar(255) UNIQUE CHECK ("LinkedInURL" ~ '^https?:\/\/(www\.)?linkedin\.com\/.*$'),
  "Slogan" varchar(200),
  "WebsiteLink" varchar(255),
  "Description" varchar(2000),
  "CurrentStage" varchar(2000),
  "Achievement" varchar(2000)
);

CREATE TABLE "StartupProfilePrivacySettings" (
  "StartupID" integer NOT NULL REFERENCES "StartupProfile" ("StartupID"),
  "IndustryPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "PhoneNumberIDPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "CountryIDPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "CityPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "LinkedInURLPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "SloganPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "WebsiteLinkPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "DescriptionPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "CurrentStagePrivacy" privacy_type NOT NULL DEFAULT 'public',
  "AchievementPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "ViewGraphPrivacy" privacy_type NOT NULL DEFAULT 'public'
);

CREATE TABLE "CandidateProfilePrivacySettings" (
  "CandidateID" integer NOT NULL REFERENCES "CandidateProfile" ("CandidateID"),
  "GenderPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "IndustryPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "PhoneNumberIDPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "CountryIDPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "CityPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "UniversityPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "LinkedInURLPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "SloganPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "EducationPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "ExperiencePrivacy" privacy_type NOT NULL DEFAULT 'public',
  "HobbyInterestPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "ViewGraphPrivacy" privacy_type NOT NULL DEFAULT 'public',
  "AchievementPrivacy" privacy_type NOT NULL DEFAULT 'public'
);

CREATE TABLE "StartupMembership" (
  "ID" integer PRIMARY KEY,
  "StartupID" integer NOT NULL,
  "UserID" integer NOT NULL,
  "Role" varchar(100) NOT NULL,
  "Description" varchar(2000)
);

CREATE TABLE "Matching" (
  "ID" serial PRIMARY KEY,
  "CandidateID" integer NOT NULL,
  "StartupID" integer NOT NULL,
  "CandidateStatus" match_status NOT NULL DEFAULT 'pending',
  "StartupStatus" match_status NOT NULL DEFAULT 'pending',
  "IsMatched" boolean NOT NULL DEFAULT false,
  "MatchDate" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "CandidateNotification" integer,
  "StartupNotification" integer
);

CREATE TABLE "Notification" (
  "ID" serial PRIMARY KEY,
  "Recipient" integer NOT NULL,
  "Data" varchar(2000),
  "Read" boolean NOT NULL DEFAULT false,
  "CreatedDateTime" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "IsStartupNotified" boolean NOT NULL DEFAULT false
);

CREATE TABLE "Tags" (
  "ID" serial PRIMARY KEY,
  "Value" varchar(50) NOT NULL,
  "Description" varchar(2000)
);

CREATE TABLE "TagCandidateInstances" (
  "CandidateOwnerID" integer NOT NULL,
  "TagID" integer NOT NULL,
  PRIMARY KEY ("CandidateOwnerID", "TagID")
);

CREATE TABLE "TagStartupInstances" (
  "StartupOwnerID" integer NOT NULL,
  "TagID" integer NOT NULL,
  PRIMARY KEY ("StartupOwnerID", "TagID")
);

CREATE TABLE "Experience" (
  "ID" serial PRIMARY KEY,
  "CandidateOwner" integer NOT NULL,
  "CompanyName" varchar(100) NOT NULL,
  "Role" varchar(100),
  "Location" varchar(100),
  "Description" varchar(2000),
  "StartDate" timestamp,
  "EndDate" timestamp
);

CREATE TABLE "Certificate" (
  "ID" serial PRIMARY KEY,
  "CandidateOwner" integer NOT NULL,
  "Name" varchar(200) NOT NULL,
  "Skill" varchar(100),
  "Description" varchar(2000),
  "StartDate" timestamp,
  "EndDate" timestamp,
  "GPA" float CHECK ("GPA" >= 0.0 AND "GPA" <= 4.0)
);

CREATE TABLE "ProfileViews" (
  "ViewID" serial PRIMARY KEY,
  "ViewerID" integer NOT NULL,
  "ViewedCandidateID" integer,
  "ViewedStartupID" integer,
  "ViewedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "one_viewed_profile" CHECK (
    (("ViewedCandidateID" IS NOT NULL)::integer + 
     ("ViewedStartupID" IS NOT NULL)::integer) = 1
  ),
  FOREIGN KEY ("ViewerID") REFERENCES "UserAccount" ("UserID"),
  FOREIGN KEY ("ViewedCandidateID") REFERENCES "CandidateProfile" ("CandidateID"),
  FOREIGN KEY ("ViewedStartupID") REFERENCES "StartupProfile" ("StartupID")
);

CREATE TABLE "SavedProfiles" (
  "SaveID" serial PRIMARY KEY,
  "UserID" integer NOT NULL,
  "SavedCandidateID" integer,
  "SavedStartupID" integer,
  "SavedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "one_saved_profile" CHECK (
    (("SavedCandidateID" IS NOT NULL)::integer + 
     ("SavedStartupID" IS NOT NULL)::integer) = 1
  ),
  FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID"),
  FOREIGN KEY ("SavedCandidateID") REFERENCES "CandidateProfile" ("CandidateID"),
  FOREIGN KEY ("SavedStartupID") REFERENCES "StartupProfile" ("StartupID")
);

CREATE TABLE "SkippedProfiles" (
  "SkipID" serial PRIMARY KEY,
  "UserID" integer NOT NULL,
  "SkippedCandidateID" integer,
  "SkippedStartupID" integer,
  "SkippedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "one_skipped_profile" CHECK (
    (("SkippedCandidateID" IS NOT NULL)::integer + 
     ("SkippedStartupID" IS NOT NULL)::integer) = 1
  ),
  FOREIGN KEY ("UserID") REFERENCES "UserAccount" ("UserID"),
  FOREIGN KEY ("SkippedCandidateID") REFERENCES "CandidateProfile" ("CandidateID"),
  FOREIGN KEY ("SkippedStartupID") REFERENCES "StartupProfile" ("StartupID")
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
