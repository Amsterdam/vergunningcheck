# Generated by Django 3.1.3 on 2021-04-12 10:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chappie', '0007_auto_20210412_1009'),
    ]

    operations = [
        migrations.RenameField(
            model_name='permit',
            old_name='id',
            new_name='flo_legal_id',
        ),
    ]
