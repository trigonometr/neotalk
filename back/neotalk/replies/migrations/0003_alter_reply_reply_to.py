# Generated by Django 4.0.1 on 2022-01-06 23:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('replies', '0002_alter_reply_reply_to'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reply',
            name='reply_to',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reply_to_user', to='replies.reply'),
        ),
    ]
