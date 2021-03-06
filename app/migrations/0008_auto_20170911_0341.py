# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-11 03:41
from __future__ import unicode_literals

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0007_auto_20170911_0334'),
    ]

    operations = [
        migrations.AddField(
            model_name='channelmembers',
            name='channel',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='app.Channel'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='channelmembers',
            name='date_joined',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='channelmembers',
            name='date_updated',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2017, 9, 11, 3, 40, 46, 413624, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='channelmembers',
            name='member',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='channels', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='channelmembers',
            unique_together=set([('channel', 'member')]),
        ),
    ]
