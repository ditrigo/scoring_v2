# Generated by Django 4.2.5 on 2023-09-29 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_innres_countedattrformula'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='countedattributes',
            options={'verbose_name': 'counted_attribute'},
        ),
        migrations.AlterModelOptions(
            name='csvattributes',
            options={'verbose_name': 'csv_attribute'},
        ),
        migrations.AlterModelOptions(
            name='fileattributes',
            options={'verbose_name': 'file_attribute'},
        ),
        migrations.AlterModelOptions(
            name='innres',
            options={'verbose_name': 'inn_re'},
        ),
        migrations.AlterModelOptions(
            name='maincatalogfields',
            options={'verbose_name': 'main_catalog_filed'},
        ),
        migrations.RemoveIndex(
            model_name='csvattributes',
            name='csv_attribu_inn_2c9839_idx',
        ),
        migrations.AddIndex(
            model_name='csvattributes',
            index=models.Index(fields=['inn', 'created_date', 'report_date'], name='csv_attribu_inn_b61acb_idx'),
        ),
    ]
