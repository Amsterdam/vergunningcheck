# Generated by Django 3.2.4 on 2021-06-30 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chappie', '0022_rename_prequestions_prequestion'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='prequestion',
            name='key',
        ),
        migrations.AlterField(
            model_name='prequestion',
            name='id',
            field=models.CharField(max_length=40, primary_key=True, serialize=False, unique=True),
        ),
    ]
