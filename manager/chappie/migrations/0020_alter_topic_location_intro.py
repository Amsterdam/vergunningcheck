# Generated by Django 3.2.4 on 2021-06-30 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chappie', '0019_auto_20210630_1438'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='location_intro',
            field=models.TextField(blank=True, default=None, null=True),
        ),
    ]