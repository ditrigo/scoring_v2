# Generated by Django 4.2.5 on 2023-09-28 07:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0011_alter_counted_att_author_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='counted_att_formula',
            name='uuid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='posts.csv_attribute', verbose_name='UUID'),
        ),
    ]
