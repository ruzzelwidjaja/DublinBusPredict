# Generated by Django 3.2.4 on 2022-07-19 11:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dublinbusapp', '0004_alter_stops_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('occupation', models.CharField(blank=True, max_length=150, null=True)),
                ('phone', models.CharField(blank=True, max_length=30, null=True)),
                ('address', models.CharField(blank=True, max_length=250, null=True)),
                ('city', models.CharField(blank=True, max_length=150, null=True)),
                ('country', models.CharField(blank=True, max_length=150, null=True)),
                ('image', models.ImageField(blank=True, max_length=255, null=True, upload_to='pictures/%Y/%m/%d/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
