# Generated by Django 3.2.4 on 2021-06-30 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chappie', '0023_auto_20210630_1530'),
    ]

    operations = [
        migrations.AddField(
            model_name='prequestion',
            name='key',
            field=models.CharField(default='x', max_length=40, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='prequestion',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
