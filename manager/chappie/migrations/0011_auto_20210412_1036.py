# Generated by Django 3.1.3 on 2021-04-12 10:36

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('chappie', '0010_outcome_topic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outcome',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]