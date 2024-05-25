
# Generated by Django 5.0.2 on 2024-03-07 06:44

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_profile_birth_date_profile_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='book_cover_image',
            field=models.ImageField(blank=True, null=True, upload_to=api.models.FileGeneratorPath),
        ),
        migrations.AlterField(
            model_name='profile',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to=api.models.ProfileImagePathGenerator()),
        ),
    ]