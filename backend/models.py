# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Candidateprofile(models.Model):
    candidateid = models.OneToOneField('Useraccount', models.DO_NOTHING, db_column='CandidateID', primary_key=True)  # Field name made lowercase.
    industry = models.CharField(db_column='Industry', blank=True, null=True)  # Field name made lowercase.
    university = models.CharField(db_column='University', blank=True, null=True)  # Field name made lowercase.
    hobbyinterest = models.TextField(db_column='HobbyInterest', blank=True, null=True)  # Field name made lowercase.
    genderid = models.ForeignKey('Gender', models.DO_NOTHING, db_column='GenderID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CandidateProfile'


class Certificate(models.Model):
    certificateid = models.AutoField(db_column='CertificateID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    name = models.CharField(db_column='Name', blank=True, null=True)  # Field name made lowercase.
    skill = models.CharField(db_column='Skill', blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.
    startdate = models.DateField(db_column='StartDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateField(db_column='EndDate', blank=True, null=True)  # Field name made lowercase.
    gpa = models.FloatField(db_column='GPA', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Certificate'


class Country(models.Model):
    countryid = models.AutoField(db_column='CountryID', primary_key=True)  # Field name made lowercase.
    numcode = models.IntegerField(db_column='NumCode', unique=True, blank=True, null=True)  # Field name made lowercase.
    alpha2code = models.CharField(db_column='Alpha2Code', blank=True, null=True)  # Field name made lowercase.
    alpha3code = models.CharField(db_column='Alpha3Code', blank=True, null=True)  # Field name made lowercase.
    enshortname = models.CharField(db_column='EnShortName', blank=True, null=True)  # Field name made lowercase.
    nationality = models.CharField(db_column='Nationality', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Country'


class Experience(models.Model):
    experienceid = models.AutoField(db_column='ExperienceID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    companyname = models.CharField(db_column='CompanyName', blank=True, null=True)  # Field name made lowercase.
    role = models.CharField(db_column='Role', blank=True, null=True)  # Field name made lowercase.
    location = models.CharField(db_column='Location', blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.
    startdate = models.DateField(db_column='StartDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateField(db_column='EndDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Experience'


class Gender(models.Model):
    genderid = models.AutoField(db_column='GenderID', primary_key=True)  # Field name made lowercase.
    gendername = models.CharField(db_column='GenderName', unique=True, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Gender'


class Matching(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    candidateid = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='CandidateID')  # Field name made lowercase.
    startupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='StartupID')  # Field name made lowercase.
    statusid = models.ForeignKey('Matchingstatus', models.DO_NOTHING, db_column='StatusID', blank=True, null=True)  # Field name made lowercase.
    ismatched = models.BooleanField(db_column='IsMatched', blank=True, null=True)  # Field name made lowercase.
    matchdate = models.DateTimeField(db_column='MatchDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Matching'


class Matchingstatus(models.Model):
    statusid = models.AutoField(db_column='StatusID', primary_key=True)  # Field name made lowercase.
    statusname = models.CharField(db_column='StatusName', unique=True, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'MatchingStatus'


class Notification(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    data = models.TextField(db_column='Data', blank=True, null=True)  # Field name made lowercase.
    isread = models.BooleanField(db_column='IsRead', blank=True, null=True)  # Field name made lowercase.
    createddatetime = models.DateTimeField(db_column='CreatedDateTime', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Notification'


class Permission(models.Model):
    permissionid = models.AutoField(db_column='PermissionID', primary_key=True)  # Field name made lowercase.
    permissionname = models.CharField(db_column='PermissionName', unique=True, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Permission'


class Phonenumber(models.Model):
    phonenumberid = models.AutoField(db_column='PhoneNumberID', primary_key=True)  # Field name made lowercase.
    fullnumber = models.CharField(db_column='FullNumber', unique=True)  # Field name made lowercase.
    countrycode = models.CharField(db_column='CountryCode', blank=True, null=True)  # Field name made lowercase.
    areacode = models.CharField(db_column='AreaCode', blank=True, null=True)  # Field name made lowercase.
    number = models.CharField(db_column='Number', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PhoneNumber'


class Privacylevel(models.Model):
    privacylevelid = models.AutoField(db_column='PrivacyLevelID', primary_key=True)  # Field name made lowercase.
    levelname = models.CharField(db_column='LevelName', unique=True, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PrivacyLevel'


class Privacysetting(models.Model):
    privacysettingid = models.AutoField(db_column='PrivacySettingID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', unique=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PrivacySetting'


class Role(models.Model):
    roleid = models.AutoField(db_column='RoleID', primary_key=True)  # Field name made lowercase.
    rolename = models.CharField(db_column='RoleName', unique=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Role'


class Startupmembership(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    startupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='StartupID')  # Field name made lowercase.
    userid = models.ForeignKey(Matchingstatus, models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    permissionid = models.ForeignKey(Privacysetting, models.DO_NOTHING, db_column='PermissionID', blank=True, null=True)  # Field name made lowercase.
    role = models.CharField(db_column='Role', blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'StartupMembership'


class Startupprofile(models.Model):
    startupid = models.AutoField(db_column='StartupID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    name = models.CharField(db_column='Name')  # Field name made lowercase.
    logo = models.CharField(db_column='Logo', blank=True, null=True)  # Field name made lowercase.
    industry = models.CharField(db_column='Industry', blank=True, null=True)  # Field name made lowercase.
    phonenumberid = models.ForeignKey(Phonenumber, models.DO_NOTHING, db_column='PhoneNumberID', blank=True, null=True)  # Field name made lowercase.
    countryid = models.ForeignKey(Country, models.DO_NOTHING, db_column='CountryID', blank=True, null=True)  # Field name made lowercase.
    city = models.CharField(db_column='City', blank=True, null=True)  # Field name made lowercase.
    linkedinid = models.CharField(db_column='LinkedInID', blank=True, null=True)  # Field name made lowercase.
    slogan = models.CharField(db_column='Slogan', blank=True, null=True)  # Field name made lowercase.
    websitelink = models.CharField(db_column='WebsiteLink', blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.
    currentstage = models.TextField(db_column='CurrentStage', blank=True, null=True)  # Field name made lowercase.
    achievement = models.TextField(db_column='Achievement', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'StartupProfile'


class Tag(models.Model):
    tagid = models.AutoField(db_column='TagID', primary_key=True)  # Field name made lowercase.
    value = models.CharField(db_column='Value', unique=True)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Tag'


class Useraccount(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True)  # Field name made lowercase.
    clerkuserid = models.CharField(db_column='ClerkUserID', unique=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', unique=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'UserAccount'


class Userprivacysetting(models.Model):
    userid = models.ForeignKey(Useraccount, models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    privacysettingid = models.ForeignKey(Privacysetting, models.DO_NOTHING, db_column='PrivacySettingID')  # Field name made lowercase.
    privacylevelid = models.ForeignKey(Privacylevel, models.DO_NOTHING, db_column='PrivacyLevelID', blank=True, null=True)  # Field name made lowercase.
    note = models.TextField(db_column='Note', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'UserPrivacySetting'
        unique_together = (('userid', 'privacysettingid'), ('userid', 'privacysettingid'),)


class Userprofile(models.Model):
    userid = models.OneToOneField(Useraccount, models.DO_NOTHING, db_column='UserID', primary_key=True)  # Field name made lowercase.
    firstname = models.CharField(db_column='FirstName')  # Field name made lowercase.
    lastname = models.CharField(db_column='LastName')  # Field name made lowercase.
    phonenumberid = models.ForeignKey(Phonenumber, models.DO_NOTHING, db_column='PhoneNumberID', blank=True, null=True)  # Field name made lowercase.
    countryid = models.ForeignKey(Country, models.DO_NOTHING, db_column='CountryID', blank=True, null=True)  # Field name made lowercase.
    city = models.CharField(db_column='City', blank=True, null=True)  # Field name made lowercase.
    linkedinid = models.CharField(db_column='LinkedInID', blank=True, null=True)  # Field name made lowercase.
    slogan = models.CharField(db_column='Slogan', blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', unique=True, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'UserProfile'


class Userrole(models.Model):
    userid = models.ForeignKey(Useraccount, models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    roleid = models.ForeignKey(Role, models.DO_NOTHING, db_column='RoleID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'UserRole'
        unique_together = (('userid', 'roleid'), ('userid', 'roleid'),)


class Usertag(models.Model):
    userid = models.ForeignKey(Useraccount, models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    tagid = models.ForeignKey(Tag, models.DO_NOTHING, db_column='TagID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'UserTag'
        unique_together = (('userid', 'tagid'), ('userid', 'tagid'),)


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'
