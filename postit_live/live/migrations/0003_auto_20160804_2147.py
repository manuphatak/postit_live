# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-08-04 21:47
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('live', '0002_auto_20160804_2143'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='livechannel',
            options={'default_permissions': ('add',), 'permissions': (('full_channel', 'Can manage channel'), ('change_channel_close', 'Can permanently close live channel'), ('change_channel_messages', 'Can strike and delete live channel messages'), ('change_channel_contributors', 'Can add, change, delete permissions of other contributors'), ('change_channel_settings', 'Can change title and description of live channel'), ('add_channel_messages', 'Can post channel messages')), 'verbose_name': 'channel'},
        ),
    ]
