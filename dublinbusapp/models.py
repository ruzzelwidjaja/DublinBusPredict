from pyexpat import model
from django.db import models
from django.contrib.auth.models import User

class Stops(models.Model):
    stop_id = models.CharField(primary_key=True, max_length=30)
    stop_name = models.CharField(max_length=255, blank=True, null=True)
    stop_lat = models.FloatField(blank=True, null=True)
    stop_long = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stops'

class Account1(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Favorites = models.CharField(default='',max_length=30)
    birthday = models.DateField()
    gender = models.CharField(
        max_length=7,
        choices=[('MALE', 'MALE'),('FEMALE', 'FEMALE')]
    )

    def __str__(self):
        return self.user.username, self.Favorites.favorites