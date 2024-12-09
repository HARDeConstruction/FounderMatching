# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Candidateprofile(models.Model):
    candidateid = models.AutoField(db_column='CandidateID', primary_key=True)  # Field name made lowercase.
    userid = models.OneToOneField('Useraccount', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    gender = models.TextField(db_column='Gender')  # Field name made lowercase. This field type is a guess.
    industry = models.CharField(db_column='Industry', max_length=100)  # Field name made lowercase.
    phonenumberid = models.OneToOneField('Phonenumber', models.DO_NOTHING, db_column='PhoneNumberID')  # Field name made lowercase.
    countryid = models.ForeignKey('Countries', models.DO_NOTHING, db_column='CountryID')  # Field name made lowercase.
    city = models.CharField(db_column='City', max_length=100, blank=True, null=True)  # Field name made lowercase.
    university = models.CharField(db_column='University', max_length=200, blank=True, null=True)  # Field name made lowercase.
    linkedinurl = models.CharField(db_column='LinkedInURL', unique=True, max_length=255, blank=True, null=True)  # Field name made lowercase.
    slogan = models.CharField(db_column='Slogan', max_length=200, blank=True, null=True)  # Field name made lowercase.
    websitelink = models.CharField(db_column='WebsiteLink', max_length=255, blank=True, null=True)  # Field name made lowercase.
    hobbyinterest = models.CharField(db_column='HobbyInterest', max_length=2000, blank=True, null=True)  # Field name made lowercase.
    achievement = models.CharField(db_column='Achievement', max_length=2000, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CandidateProfile'


class Candidateprofileprivacysettings(models.Model):
    candidateid = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='CandidateID')  # Field name made lowercase.
    genderprivacy = models.TextField(db_column='GenderPrivacy')  # Field name made lowercase. This field type is a guess.
    industryprivacy = models.TextField(db_column='IndustryPrivacy')  # Field name made lowercase. This field type is a guess.
    phonenumberidprivacy = models.TextField(db_column='PhoneNumberIDPrivacy')  # Field name made lowercase. This field type is a guess.
    countryidprivacy = models.TextField(db_column='CountryIDPrivacy')  # Field name made lowercase. This field type is a guess.
    cityprivacy = models.TextField(db_column='CityPrivacy')  # Field name made lowercase. This field type is a guess.
    universityprivacy = models.TextField(db_column='UniversityPrivacy')  # Field name made lowercase. This field type is a guess.
    linkedinurlprivacy = models.TextField(db_column='LinkedInURLPrivacy')  # Field name made lowercase. This field type is a guess.
    sloganprivacy = models.TextField(db_column='SloganPrivacy')  # Field name made lowercase. This field type is a guess.
    educationprivacy = models.TextField(db_column='EducationPrivacy')  # Field name made lowercase. This field type is a guess.
    experienceprivacy = models.TextField(db_column='ExperiencePrivacy')  # Field name made lowercase. This field type is a guess.
    hobbyinterestprivacy = models.TextField(db_column='HobbyInterestPrivacy')  # Field name made lowercase. This field type is a guess.
    viewgraphprivacy = models.TextField(db_column='ViewGraphPrivacy')  # Field name made lowercase. This field type is a guess.
    achievementprivacy = models.TextField(db_column='AchievementPrivacy')  # Field name made lowercase. This field type is a guess.

    class Meta:
        managed = False
        db_table = 'CandidateProfilePrivacySettings'


class Certificate(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    candidateowner = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='CandidateOwner')  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200)  # Field name made lowercase.
    skill = models.CharField(db_column='Skill', max_length=100, blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=2000, blank=True, null=True)  # Field name made lowercase.
    startdate = models.DateTimeField(db_column='StartDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateTimeField(db_column='EndDate', blank=True, null=True)  # Field name made lowercase.
    gpa = models.FloatField(db_column='GPA', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Certificate'


class Countries(models.Model):
    num_code = models.IntegerField(primary_key=True)
    alpha_2_code = models.CharField(max_length=2)
    alpha_3_code = models.CharField(max_length=3)
    en_short_name = models.CharField(max_length=100)
    nationality = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'Countries'


class Experience(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    candidateowner = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='CandidateOwner')  # Field name made lowercase.
    companyname = models.CharField(db_column='CompanyName', max_length=100)  # Field name made lowercase.
    role = models.CharField(db_column='Role', max_length=100, blank=True, null=True)  # Field name made lowercase.
    location = models.CharField(db_column='Location', max_length=100, blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=2000, blank=True, null=True)  # Field name made lowercase.
    startdate = models.DateTimeField(db_column='StartDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateTimeField(db_column='EndDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Experience'


class Matching(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    candidateid = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='CandidateID')  # Field name made lowercase.
    startupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='StartupID')  # Field name made lowercase.
    candidatestatus = models.TextField(db_column='CandidateStatus')  # Field name made lowercase. This field type is a guess.
    startupstatus = models.TextField(db_column='StartupStatus')  # Field name made lowercase. This field type is a guess.
    ismatched = models.BooleanField(db_column='IsMatched')  # Field name made lowercase.
    matchdate = models.DateTimeField(db_column='MatchDate')  # Field name made lowercase.
    candidatenotification = models.IntegerField(db_column='CandidateNotification', blank=True, null=True)  # Field name made lowercase.
    startupnotification = models.IntegerField(db_column='StartupNotification', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Matching'


class Notification(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    recipient = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='Recipient')  # Field name made lowercase.
    data = models.CharField(db_column='Data', max_length=2000, blank=True, null=True)  # Field name made lowercase.
    read = models.BooleanField(db_column='Read')  # Field name made lowercase.
    createddatetime = models.DateTimeField(db_column='CreatedDateTime')  # Field name made lowercase.
    isstartupnotified = models.BooleanField(db_column='IsStartupNotified')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Notification'


class Phonenumber(models.Model):
    phonenumberid = models.AutoField(db_column='PhoneNumberID', primary_key=True)  # Field name made lowercase.
    countrycode = models.CharField(db_column='CountryCode', max_length=5)  # Field name made lowercase.
    areacode = models.CharField(db_column='AreaCode', max_length=5)  # Field name made lowercase.
    number = models.CharField(db_column='Number', max_length=15)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PhoneNumber'


class Profileviews(models.Model):
    viewid = models.AutoField(db_column='ViewID', primary_key=True)  # Field name made lowercase.
    viewerid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='ViewerID')  # Field name made lowercase.
    viewedcandidateid = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='ViewedCandidateID', blank=True, null=True)  # Field name made lowercase.
    viewedstartupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='ViewedStartupID', blank=True, null=True)  # Field name made lowercase.
    viewedat = models.DateTimeField(db_column='ViewedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ProfileViews'


class Savedprofiles(models.Model):
    saveid = models.AutoField(db_column='SaveID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    savedcandidateid = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='SavedCandidateID', blank=True, null=True)  # Field name made lowercase.
    savedstartupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='SavedStartupID', blank=True, null=True)  # Field name made lowercase.
    savedat = models.DateTimeField(db_column='SavedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'SavedProfiles'


class Skippedprofiles(models.Model):
    skipid = models.AutoField(db_column='SkipID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    skippedcandidateid = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='SkippedCandidateID', blank=True, null=True)  # Field name made lowercase.
    skippedstartupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='SkippedStartupID', blank=True, null=True)  # Field name made lowercase.
    skippedat = models.DateTimeField(db_column='SkippedAt')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'SkippedProfiles'


class Startupmembership(models.Model):
    id = models.IntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    startupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='StartupID')  # Field name made lowercase.
    userid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    role = models.CharField(db_column='Role', max_length=100)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=2000, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'StartupMembership'


class Startupprofile(models.Model):
    startupid = models.AutoField(db_column='StartupID', primary_key=True)  # Field name made lowercase.
    userownerid = models.OneToOneField('Useraccount', models.DO_NOTHING, db_column='UserOwnerID')  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100)  # Field name made lowercase.
    email = models.CharField(db_column='Email', unique=True, max_length=255)  # Field name made lowercase.
    logo = models.CharField(db_column='Logo', max_length=255, blank=True, null=True)  # Field name made lowercase.
    industry = models.CharField(db_column='Industry', max_length=100)  # Field name made lowercase.
    phonenumberid = models.OneToOneField(Phonenumber, models.DO_NOTHING, db_column='PhoneNumberID')  # Field name made lowercase.
    countryid = models.ForeignKey(Countries, models.DO_NOTHING, db_column='CountryID')  # Field name made lowercase.
    city = models.CharField(db_column='City', max_length=100, blank=True, null=True)  # Field name made lowercase.
    linkedinurl = models.CharField(db_column='LinkedInURL', unique=True, max_length=255, blank=True, null=True)  # Field name made lowercase.
    slogan = models.CharField(db_column='Slogan', max_length=200, blank=True, null=True)  # Field name made lowercase.
    websitelink = models.CharField(db_column='WebsiteLink', max_length=255, blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=2000, blank=True, null=True)  # Field name made lowercase.
    currentstage = models.CharField(db_column='CurrentStage', max_length=2000, blank=True, null=True)  # Field name made lowercase.
    achievement = models.CharField(db_column='Achievement', max_length=2000, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'StartupProfile'


class Startupprofileprivacysettings(models.Model):
    startupid = models.ForeignKey(Startupprofile, models.DO_NOTHING, db_column='StartupID')  # Field name made lowercase.
    industryprivacy = models.TextField(db_column='IndustryPrivacy')  # Field name made lowercase. This field type is a guess.
    phonenumberidprivacy = models.TextField(db_column='PhoneNumberIDPrivacy')  # Field name made lowercase. This field type is a guess.
    countryidprivacy = models.TextField(db_column='CountryIDPrivacy')  # Field name made lowercase. This field type is a guess.
    cityprivacy = models.TextField(db_column='CityPrivacy')  # Field name made lowercase. This field type is a guess.
    linkedinurlprivacy = models.TextField(db_column='LinkedInURLPrivacy')  # Field name made lowercase. This field type is a guess.
    sloganprivacy = models.TextField(db_column='SloganPrivacy')  # Field name made lowercase. This field type is a guess.
    websitelinkprivacy = models.TextField(db_column='WebsiteLinkPrivacy')  # Field name made lowercase. This field type is a guess.
    descriptionprivacy = models.TextField(db_column='DescriptionPrivacy')  # Field name made lowercase. This field type is a guess.
    currentstageprivacy = models.TextField(db_column='CurrentStagePrivacy')  # Field name made lowercase. This field type is a guess.
    achievementprivacy = models.TextField(db_column='AchievementPrivacy')  # Field name made lowercase. This field type is a guess.
    viewgraphprivacy = models.TextField(db_column='ViewGraphPrivacy')  # Field name made lowercase. This field type is a guess.

    class Meta:
        managed = False
        db_table = 'StartupProfilePrivacySettings'


class Tagcandidateinstances(models.Model):
    candidateownerid = models.OneToOneField(Candidateprofile, models.DO_NOTHING, db_column='CandidateOwnerID', primary_key=True)  # Field name made lowercase. The composite primary key (CandidateOwnerID, TagID) found, that is not supported. The first column is selected.
    tagid = models.ForeignKey('Tags', models.DO_NOTHING, db_column='TagID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'TagCandidateInstances'
        unique_together = (('candidateownerid', 'tagid'),)


class Tagstartupinstances(models.Model):
    startupownerid = models.OneToOneField(Startupprofile, models.DO_NOTHING, db_column='StartupOwnerID', primary_key=True)  # Field name made lowercase. The composite primary key (StartupOwnerID, TagID) found, that is not supported. The first column is selected.
    tagid = models.ForeignKey('Tags', models.DO_NOTHING, db_column='TagID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'TagStartupInstances'
        unique_together = (('startupownerid', 'tagid'),)


class Tags(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    value = models.CharField(db_column='Value', max_length=50)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=2000, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Tags'


class Useraccount(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True)  # Field name made lowercase.
    clerkuserid = models.UUIDField(db_column='ClerkUserID', unique=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', unique=True, max_length=255)  # Field name made lowercase.
    firstname = models.CharField(db_column='FirstName', max_length=50)  # Field name made lowercase.
    lastname = models.CharField(db_column='LastName', max_length=50)  # Field name made lowercase.
    iscandidate = models.BooleanField(db_column='IsCandidate')  # Field name made lowercase.
    isstartup = models.BooleanField(db_column='IsStartup')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'UserAccount'
