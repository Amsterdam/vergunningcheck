# Generated by Django 3.2.4 on 2021-06-23 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chappie', '0017_alter_permit_imtr_config'),
    ]

    operations = [
        migrations.AddField(
            model_name='topic',
            name='location_intro',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='topic',
            name='user_might_not_need_permit',
            field=models.BooleanField(default=True),
        ),
    ]
