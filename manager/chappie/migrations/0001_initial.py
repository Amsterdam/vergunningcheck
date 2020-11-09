# Generated by Django 3.1.3 on 2020-11-04 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=40)),
                ('name', models.CharField(max_length=80)),
                ('hasIMTR', models.BooleanField()),
                ('intro', models.TextField()),
                ('flow', models.IntegerField(choices=[(1, 'Imtr'), (2, 'Olo'), (3, 'Redirect To Olo')])),
                ('permit_ids', models.CharField(max_length=80)),
            ],
        ),
    ]
