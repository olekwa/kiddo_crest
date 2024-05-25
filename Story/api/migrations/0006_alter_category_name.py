
# Generated by Django 5.0.2 on 2024-03-07 06:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_book_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(choices=[('Fairy Tales', 'Fairy Tales'), ('Adventure', 'Adventure'), ('Animals', 'Animals'), ('Fantasy', 'Fantasy'), ('Educational', 'Educational'), ('Bedtime Stories', 'Bedtime Stories')], max_length=100),
        ),
    ]