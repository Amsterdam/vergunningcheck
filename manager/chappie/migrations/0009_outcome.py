# Generated by Django 3.1.3 on 2021-04-12 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chappie', '0008_auto_20210412_1018'),
    ]

    operations = [
        migrations.CreateModel(
            name='Outcome',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flo_legal_outcomes', models.CharField(help_text='Komma gescheiden veld met uitkomsten die moeten matchen. Sorteer alfabetisch op naam???', max_length=100)),
                ('intro', models.TextField()),
            ],
        ),
    ]
