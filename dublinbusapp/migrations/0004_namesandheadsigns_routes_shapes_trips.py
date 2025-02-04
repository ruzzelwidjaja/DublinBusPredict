# Generated by Django 3.2.4 on 2022-08-08 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dublinbusapp', '0003_todo'),
    ]

    operations = [
        migrations.CreateModel(
            name='NamesAndHeadsigns',
            fields=[
                ('route_short_name', models.CharField(blank=True, max_length=10, null=True)),
                ('route_id', models.CharField(max_length=30)),
                ('trip_headsign', models.CharField(blank=True, max_length=255, null=True)),
                ('shape_id', models.CharField(max_length=30, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'names_and_headsigns',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Routes',
            fields=[
                ('route_id', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('agency_id', models.CharField(blank=True, max_length=10, null=True)),
                ('route_short_name', models.CharField(blank=True, max_length=10, null=True)),
                ('route_long_name', models.CharField(blank=True, max_length=255, null=True)),
                ('route_type', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'routes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Shapes',
            fields=[
                ('shape_id', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('shape_pt_lat', models.FloatField(blank=True, null=True)),
                ('shape_pt_lon', models.FloatField(blank=True, null=True)),
                ('shape_pt_sequence', models.SmallIntegerField()),
                ('shape_dist_traveled', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'shapes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Trips',
            fields=[
                ('service_id', models.CharField(blank=True, max_length=30, null=True)),
                ('trip_id', models.CharField(max_length=60, primary_key=True, serialize=False)),
                ('trip_headsign', models.CharField(blank=True, max_length=255, null=True)),
                ('direction_id', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'trips',
                'managed': False,
            },
        ),
    ]
