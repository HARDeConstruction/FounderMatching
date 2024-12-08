# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

# enum
class GenderChoices(models.TextChoices):
    MALE = 'male', 'Male'
    FEMALE = 'female', 'Female'
    OTHER = 'other', 'Other'

class PrivacyChoices(models.TextChoices):
    PUBLIC = 'public', 'Public'
    PRIVATE = 'private', 'Private'
    CONNECTIONS = 'connections', 'Connections'

class MatchStatusChoices(models.TextChoices):
    PENDING = 'pending', 'Pending'
    ACCEPTED = 'accepted', 'Accepted'
    REJECTED = 'rejected', 'Rejected'

class Candidateprofile(models.Model):
    candidateid = models.AutoField(db_column='CandidateID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserID', blank=True, null=True)  # Field name made lowercase.
    industry = models.CharField(db_column='Industry', blank=True, null=True)  # Field name made lowercase.
    phonenumberid = models.ForeignKey('Phonenumber', models.DO_NOTHING, db_column='PhoneNumberID', blank=True, null=True)  # Field name made lowercase.
    countryid = models.ForeignKey('Countries', models.DO_NOTHING, db_column='CountryID', blank=True, null=True)  # Field name made lowercase.
    city = models.CharField(db_column='City', blank=True, null=True)  # Field name made lowercase.
    university = models.CharField(db_column='University', blank=True, null=True)  # Field name made lowercase.
    linkedinurl = models.CharField(db_column='LinkedInURL', blank=True, null=True)  # Field name made lowercase.
    slogan = models.CharField(db_column='Slogan', blank=True, null=True)  # Field name made lowercase.
    hobbyinterest = models.TextField(db_column='HobbyInterest', blank=True, null=True)  # Field name made lowercase.
    gender = models.TextField(db_column='Gender', blank=True, null=True)  # Field name made lowercase. This field type is a guess.

    class Meta:
        db_table = 'CandidateProfile'


class Candidateprofileprivacysettings(models.Model):
    candidateid = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='CandidateID', blank=True, null=True)  # Field name made lowercase.
    industryprivacy = models.TextField(db_column='IndustryPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    phonenumberidprivacy = models.TextField(db_column='PhoneNumberIDPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    countryidprivacy = models.TextField(db_column='CountryIDPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    cityprivacy = models.TextField(db_column='CityPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    universityprivacy = models.TextField(db_column='UniversityPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    linkedinurlprivacy = models.TextField(db_column='LinkedInURLPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    sloganprivacy = models.TextField(db_column='SloganPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    educationprivacy = models.TextField(db_column='EducationPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    experienceprivacy = models.TextField(db_column='ExperiencePrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    hobbyinterestprivacy = models.TextField(db_column='HobbyInterestPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    viewgraphprivacy = models.TextField(db_column='ViewGraphPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.

    class Meta:
        managed = False
        db_table = 'CandidateProfilePrivacySettings'


class Certificate(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    candidateowner = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='CandidateOwner', blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', blank=True, null=True)  # Field name made lowercase.
    skill = models.CharField(db_column='Skill', blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.
    startdate = models.DateTimeField(db_column='StartDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateTimeField(db_column='EndDate', blank=True, null=True)  # Field name made lowercase.
    gpa = models.FloatField(db_column='GPA', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Certificate'


class Countries(models.Model):
    num_code = models.IntegerField(primary_key=True)
    alpha_2_code = models.CharField(blank=True, null=True)
    alpha_3_code = models.CharField(blank=True, null=True)
    en_short_name = models.CharField(blank=True, null=True)
    nationality = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Countries'


class Experience(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    candidateowner = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='CandidateOwner', blank=True, null=True)  # Field name made lowercase.
    companyname = models.CharField(db_column='CompanyName', blank=True, null=True)  # Field name made lowercase.
    role = models.CharField(db_column='Role', blank=True, null=True)  # Field name made lowercase.
    location = models.CharField(db_column='Location', blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.
    startdate = models.DateTimeField(db_column='StartDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateTimeField(db_column='EndDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Experience'


class Matching(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    candidateid = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='CandidateID', blank=True, null=True)  # Field name made lowercase.
    startupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='StartupID', blank=True, null=True)  # Field name made lowercase.
    candidatestatus = models.TextField(db_column='CandidateStatus', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    startupstatus = models.TextField(db_column='StartupStatus', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    ismatched = models.BooleanField(db_column='IsMatched', blank=True, null=True)  # Field name made lowercase.
    matchdate = models.DateTimeField(db_column='MatchDate', blank=True, null=True)  # Field name made lowercase.
    candidatenotification = models.IntegerField(db_column='CandidateNotification', blank=True, null=True)  # Field name made lowercase.
    startupnotification = models.IntegerField(db_column='StartupNotification', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Matching'


class Notification(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    recipient = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='Recipient', blank=True, null=True)  # Field name made lowercase.
    data = models.TextField(db_column='Data', blank=True, null=True)  # Field name made lowercase.
    read = models.BooleanField(db_column='Read', blank=True, null=True)  # Field name made lowercase.
    createddatetime = models.DateTimeField(db_column='CreatedDateTime', blank=True, null=True)  # Field name made lowercase.
    isstartupnotified = models.BooleanField(db_column='IsStartupNotified', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Notification'


class Phonenumber(models.Model):
    phonenumberid = models.AutoField(db_column='PhoneNumberID', primary_key=True)  # Field name made lowercase.
    countrycode = models.CharField(db_column='CountryCode', blank=True, null=True)  # Field name made lowercase.
    areacode = models.CharField(db_column='AreaCode', blank=True, null=True)  # Field name made lowercase.
    number = models.CharField(db_column='Number', blank=True, null=True)  # Field name made lowercase.
    privacy = models.IntegerField(db_column='Privacy', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PhoneNumber'


class Startupmembership(models.Model):
    id = models.IntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    startupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='StartupID', blank=True, null=True)  # Field name made lowercase.
    userid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserID', blank=True, null=True)  # Field name made lowercase.
    role = models.CharField(db_column='Role', blank=True, null=True)  # Field name made lowercase.
    description = models.IntegerField(db_column='Description', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'StartupMembership'


class Startupprofile(models.Model):
    startupid = models.AutoField(db_column='StartupID', primary_key=True)  # Field name made lowercase.
    userownerid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserOwnerID', blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', blank=True, null=True)  # Field name made lowercase.
    logo = models.CharField(db_column='Logo', blank=True, null=True)  # Field name made lowercase.
    industry = models.CharField(db_column='Industry', blank=True, null=True)  # Field name made lowercase.
    phonenumberid = models.ForeignKey(Phonenumber, models.DO_NOTHING, db_column='PhoneNumberID', blank=True, null=True)  # Field name made lowercase.
    countryid = models.ForeignKey(Countries, models.DO_NOTHING, db_column='CountryID', blank=True, null=True)  # Field name made lowercase.
    city = models.CharField(db_column='City', blank=True, null=True)  # Field name made lowercase.
    linkedinurl = models.CharField(db_column='LinkedInURL', blank=True, null=True)  # Field name made lowercase.
    slogan = models.CharField(db_column='Slogan', blank=True, null=True)  # Field name made lowercase.
    websitelink = models.CharField(db_column='WebsiteLink', blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.
    currentstage = models.TextField(db_column='CurrentStage', blank=True, null=True)  # Field name made lowercase.
    achievement = models.TextField(db_column='Achievement', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'StartupProfile'


class Startupprofileprivacysettings(models.Model):
    startupid = models.ForeignKey(Startupprofile, models.DO_NOTHING, db_column='StartupID', blank=True, null=True)  # Field name made lowercase.
    industryprivacy = models.TextField(db_column='IndustryPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    phonenumberidprivacy = models.TextField(db_column='PhoneNumberIDPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    countryidprivacy = models.TextField(db_column='CountryIDPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    cityprivacy = models.TextField(db_column='CityPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    linkedinurlprivacy = models.TextField(db_column='LinkedInURLPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    sloganprivacy = models.TextField(db_column='SloganPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    websitelinkprivacy = models.TextField(db_column='WebsiteLinkPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    descriptionprivacy = models.TextField(db_column='DescriptionPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    currentstageprivacy = models.TextField(db_column='CurrentStagePrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    achievementprivacy = models.TextField(db_column='AchievementPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    viewgraphprivacy = models.TextField(db_column='ViewGraphPrivacy', blank=True, null=True)  # Field name made lowercase. This field type is a guess.

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
    value = models.CharField(db_column='Value', blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Tags'


class Useraccount(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True)  # Field name made lowercase.
    clerkuserid = models.UUIDField(db_column='ClerkUserID', blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', blank=True, null=True)  # Field name made lowercase.
    firstname = models.CharField(db_column='FirstName', blank=True, null=True)  # Field name made lowercase.
    lastname = models.CharField(db_column='LastName', blank=True, null=True)  # Field name made lowercase.
    iscandidate = models.BooleanField(db_column='IsCandidate', blank=True, null=True)  # Field name made lowercase.
    isstartup = models.BooleanField(db_column='IsStartup', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'UserAccount'
