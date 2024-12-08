from django.db import models

# Create your models here.
class Savedprofiles(models.Model):
    saveid = models.AutoField(db_column='SaveID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserID', blank=True, null=True)  # Field name made lowercase.
    savedcandidateid = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='SavedCandidateID', blank=True, null=True)  # Field name made lowercase.
    savedstartupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='SavedStartupID', blank=True, null=True)  # Field name made lowercase.
    savedat = models.DateTimeField(db_column='SavedAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'SavedProfiles'

class Skippedprofiles(models.Model):
    skipid = models.AutoField(db_column='SkipID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Useraccount', models.DO_NOTHING, db_column='UserID', blank=True, null=True)  # Field name made lowercase.
    skippedcandidateid = models.ForeignKey(Candidateprofile, models.DO_NOTHING, db_column='SkippedCandidateID', blank=True, null=True)  # Field name made lowercase.
    skippedstartupid = models.ForeignKey('Startupprofile', models.DO_NOTHING, db_column='SkippedStartupID', blank=True, null=True)  # Field name made lowercase.
    skippedat = models.DateTimeField(db_column='SkippedAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'SkippedProfiles'