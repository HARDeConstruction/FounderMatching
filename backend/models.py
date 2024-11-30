from django.db import models

class Notification(models.Model):
    id = models.AutoField(primary_key=True)
    recipient = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    data = models.TextField()
    read = models.BooleanField(default=False)
    created_date_time = models.DateTimeField(auto_now_add=True)
    is_startup_notified = models.BooleanField(default=False)


class CandidateProfile(models.Model):
    candidate_id = models.IntegerField()
    user_id = models.IntegerField()
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    industry = models.CharField(max_length=64)
    phone_number_id = models.IntegerField()
    country_id = models.IntegerField()
    city = models.CharField(max_length=256)
    university = models.CharField(max_length=256)
    linkedln_id = models.CharField(max_length=256)
    slogan = models.CharField(max_length=512)
    hobby_interest = models.CharField(max_length=2048)
    gender = models.CharField(max_length=1)  # Assuming enum values are single characters
    email = models.CharField(max_length=256)


