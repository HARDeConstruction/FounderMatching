from django.db import models

# Create your models here.
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

class Profileviews(models.Model):
    viewid = models.AutoField(db_column='ViewID', primary_key=True)  # Field name made lowercase.
    viewerid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='ViewerID', blank=True, null=True)  # Field name made lowercase.
    viewedcandidateid = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='ViewedCandidateID', blank=True, null=True)  # Field name made lowercase.
    viewedstartupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='ViewedStartupID', blank=True, null=True)  # Field name made lowercase.
    viewedat = models.DateTimeField(db_column='ViewedAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ProfileViews'