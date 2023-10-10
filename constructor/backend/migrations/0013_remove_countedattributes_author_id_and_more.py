# Generated by Django 4.2.5 on 2023-10-10 10:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0012_remove_scoringmodel_author_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='countedattributes',
            name='author_id',
        ),
        migrations.AddField(
            model_name='countedattributes',
            name='author',
            field=models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
