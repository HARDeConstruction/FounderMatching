from django.db import models

class UserAccount(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True)
    clerkuserid = models.CharField(db_column='ClerkUserID', unique=True, max_length=255)
    email = models.CharField(db_column='Email', unique=True, max_length=255)
    firstname = models.CharField(db_column='FirstName', max_length=50)
    lastname = models.CharField(db_column='LastName', max_length=50)

    class Meta:
        managed = False
        db_table = 'UserAccount'

    def __str__(self):
        return f"{self.firstname} {self.lastname} ({self.email})"
