# Generated by Django 3.2 on 2022-01-18 19:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0007_auto_20211103_2126'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('saved_date', models.DateField(auto_now_add=True)),
                ('deal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='games.deal')),
                ('reviewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviewed_deals', to='games.player')),
            ],
        ),
    ]