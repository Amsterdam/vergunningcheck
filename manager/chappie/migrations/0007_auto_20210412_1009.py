# Generated by Django 3.1.3 on 2021-04-12 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chappie', '0006_auto_20210412_1006'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='permit',
            name='flo_legal_id',
        ),
        migrations.AlterField(
            model_name='permit',
            name='id',
            field=models.CharField(default='', help_text="Dit is het id uit de url in de FloLegal STTR Builder. Bijvoorbeeld 'WKPxKx4YBJ5fqYSni' uit 'https://sttr-builder.flolegal.app/#/activiteit/WKPxKx4YBJ5fqYSni'", max_length=30, primary_key=True, serialize=False),
        ),
    ]
