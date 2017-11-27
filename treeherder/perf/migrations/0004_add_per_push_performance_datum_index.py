# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-22 18:14
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('model', '0018_superseded_to_textlogstep_enum'),
        ('perf', '0003_add_performance_signature_alert_change_type'),
    ]

    operations = [
        migrations.AlterIndexTogether(
            name='performancedatum',
            index_together=set([('repository', 'signature', 'push_timestamp'), ('repository', 'signature', 'push')]),
        ),
    ]