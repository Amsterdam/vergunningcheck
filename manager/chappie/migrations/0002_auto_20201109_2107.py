# Generated by Django 3.1.3 on 2020-11-09 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chappie', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='topic',
            name='hasIMTR',
        ),
        migrations.AddField(
            model_name='topic',
            name='url',
            field=models.CharField(default='', max_length=200),
        ),
    ]
