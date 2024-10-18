# Generated by Django 4.2.16 on 2024-10-18 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('energy_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='energydata',
            name='added',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='country',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='insight',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='intensity',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='likelihood',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='pestle',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='published',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='region',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='relevance',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='sector',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='source',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='title',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='topic',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='energydata',
            name='url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
