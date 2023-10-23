# Generated by Django 4.2.5 on 2023-10-23 06:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CountedAttributesNew',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('author_id', models.CharField(max_length=125)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('active', models.BooleanField(default=False)),
                ('inn', models.IntegerField()),
                ('other_property', models.FloatField(blank=True, default=0, null=True)),
                ('clr', models.FloatField(blank=True, default=0, null=True)),
                ('solvency_ratio', models.FloatField(blank=True, default=0, null=True)),
                ('autonomy_ratio', models.FloatField(blank=True, default=0, null=True)),
                ('perc_coverage_ratio', models.FloatField(blank=True, default=0, null=True)),
                ('assets_return', models.FloatField(blank=True, default=0, null=True)),
                ('dolg_in_balance', models.FloatField(blank=True, default=0, null=True)),
                ('return_on_equity', models.FloatField(blank=True, default=0, null=True)),
                ('fin_leverage', models.FloatField(blank=True, default=0, null=True)),
                ('dolg_ebit', models.FloatField(blank=True, default=0, null=True)),
                ('turnover', models.FloatField(blank=True, default=0, null=True)),
                ('turnover_in_credit', models.FloatField(blank=True, default=0, null=True)),
                ('repay_fund', models.FloatField(blank=True, default=0, null=True)),
                ('invest_coverage_ratio', models.FloatField(blank=True, default=0, null=True)),
                ('equity_capital_ratio', models.FloatField(blank=True, default=0, null=True)),
                ('stock_avail_ration', models.FloatField(blank=True, default=0, null=True)),
                ('quick_liquid_ratio', models.FloatField(blank=True, default=0, null=True)),
                ('asset_dinam_1', models.FloatField(blank=True, default=0, null=True)),
                ('asset_dinam_2', models.FloatField(blank=True, default=0, null=True)),
                ('asset_dinam_3', models.FloatField(blank=True, default=0, null=True)),
                ('profit_dinam_1', models.FloatField(blank=True, default=0, null=True)),
                ('profit_dinam_2', models.FloatField(blank=True, default=0, null=True)),
                ('profit_dinam_3', models.FloatField(blank=True, default=0, null=True)),
                ('k_5_154', models.FloatField(blank=True, default=0, null=True)),
                ('k_6_155', models.FloatField(blank=True, default=0, null=True)),
                ('k_7_156', models.FloatField(blank=True, default=0, null=True)),
                ('k_8_157', models.FloatField(blank=True, default=0, null=True)),
                ('k_9_158', models.FloatField(blank=True, default=0, null=True)),
                ('k_10_159', models.FloatField(blank=True, default=0, null=True)),
                ('property_sum', models.FloatField(blank=True, default=0, null=True)),
                ('k_1_161', models.FloatField(blank=True, default=0, null=True)),
                ('k_2_162', models.FloatField(blank=True, default=0, null=True)),
                ('k_3_163', models.FloatField(blank=True, default=0, null=True)),
                ('k_4_164', models.FloatField(blank=True, default=0, null=True)),
                ('revenue_dinam', models.FloatField(blank=True, default=0, null=True)),
                ('current_business_value', models.FloatField(blank=True, default=0, null=True)),
                ('liquid_business_value', models.FloatField(blank=True, default=0, null=True)),
                ('repay_fund_lender', models.FloatField(blank=True, default=0, null=True)),
                ('need_capital', models.FloatField(blank=True, default=0, null=True)),
                ('need_capital_dp', models.FloatField(blank=True, default=0, null=True)),
                ('ebitda', models.FloatField(blank=True, default=0, null=True)),
                ('dolg_score', models.FloatField(blank=True, default=0, null=True)),
                ('dolg_dp', models.FloatField(blank=True, default=0, null=True)),
                ('need_capital_rub', models.FloatField(blank=True, default=0, null=True)),
                ('need_capital_dp_rub', models.FloatField(blank=True, default=0, null=True)),
            ],
            options={
                'verbose_name': 'counted_attributes_new',
                'db_table': 'counted_attributes_new',
            },
        ),
        migrations.CreateModel(
            name='FileAttributes',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('author_id', models.CharField(max_length=125)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('filename', models.FileField(upload_to='store/')),
            ],
            options={
                'verbose_name': 'file_attribute',
                'db_table': 'file_attributes',
            },
        ),
        migrations.CreateModel(
            name='ImportedAttributes',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('author_id', models.CharField(max_length=125)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('inn', models.IntegerField()),
                ('np_name', models.CharField(max_length=125)),
                ('report_date', models.DateTimeField()),
                ('on_uch_date', models.DateTimeField()),
                ('status_egrn', models.CharField(max_length=125)),
                ('foreign_uchred', models.BooleanField(default=False, null=True)),
                ('nedostov', models.IntegerField(null=True)),
                ('sr_chis_thisyear', models.FloatField(blank=True, null=True)),
                ('sr_chis_lastyear', models.FloatField(blank=True, null=True)),
                ('bznaper_thisyear', models.FloatField(blank=True, null=True)),
                ('bznaper_lastyear', models.FloatField(blank=True, null=True)),
                ('postup_thisyear', models.FloatField(blank=True, null=True)),
                ('postup_lastyear', models.FloatField(blank=True, null=True)),
                ('dolg', models.FloatField(blank=True, null=True)),
                ('dolg_overdue', models.FloatField(blank=True, null=True)),
                ('npo_2_020_year', models.FloatField(blank=True, null=True)),
                ('npo_2_030_year', models.FloatField(blank=True, null=True)),
                ('npo_2_040_year', models.FloatField(blank=True, null=True)),
                ('npo_2_010_year', models.FloatField(blank=True, null=True)),
                ('npo_2_020_thisyear', models.FloatField(blank=True, null=True)),
                ('npo_2_020_lastyear', models.FloatField(blank=True, null=True)),
                ('npo_2_060_year', models.FloatField(blank=True, null=True)),
                ('npo_2_060_thisyear', models.FloatField(blank=True, null=True)),
                ('npo_2_060_lastyear', models.FloatField(blank=True, null=True)),
                ('npo_4_010', models.FloatField(blank=True, null=True)),
                ('npo_5_060', models.FloatField(blank=True, null=True)),
                ('nds_3_190_thisyear', models.FloatField(blank=True, null=True)),
                ('nds_3_190_lastyear', models.FloatField(blank=True, null=True)),
                ('nds_3_125_thisyear', models.FloatField(blank=True, null=True)),
                ('nds_3_125_lastyear', models.FloatField(blank=True, null=True)),
                ('s_1150_4', models.FloatField(blank=True, null=True)),
                ('s_1100_4', models.FloatField(blank=True, null=True)),
                ('s_1210_4', models.FloatField(blank=True, null=True)),
                ('s_1230_4', models.FloatField(blank=True, null=True)),
                ('s_1230_5', models.FloatField(blank=True, null=True)),
                ('s_1240_4', models.FloatField(blank=True, null=True)),
                ('s_1250_4', models.FloatField(blank=True, null=True)),
                ('s_1200_4', models.FloatField(blank=True, null=True)),
                ('s_1600_4', models.FloatField(blank=True, null=True)),
                ('s_1600_5', models.FloatField(blank=True, null=True)),
                ('s_1600_4_2yearago', models.FloatField(blank=True, null=True)),
                ('s_1600_5_2yearago', models.FloatField(blank=True, null=True)),
                ('s_1310_4', models.FloatField(blank=True, null=True)),
                ('s_1300_4', models.FloatField(blank=True, null=True)),
                ('s_1300_5', models.FloatField(blank=True, null=True)),
                ('s_1410_4', models.FloatField(blank=True, null=True)),
                ('s_1450_4', models.FloatField(blank=True, null=True)),
                ('s_1400_4', models.FloatField(blank=True, null=True)),
                ('s_1510_4', models.FloatField(blank=True, null=True)),
                ('s_1520_4', models.FloatField(blank=True, null=True)),
                ('s_1520_5', models.FloatField(blank=True, null=True)),
                ('s_1530_4', models.FloatField(blank=True, null=True)),
                ('s_1550_4', models.FloatField(blank=True, null=True)),
                ('s_1500_4', models.FloatField(blank=True, null=True)),
                ('s_2110_4', models.FloatField(blank=True, null=True)),
                ('s_2110_5', models.FloatField(blank=True, null=True)),
                ('s_2120_4', models.FloatField(blank=True, null=True)),
                ('s_2200_4', models.FloatField(blank=True, null=True)),
                ('s_2210_4', models.FloatField(blank=True, null=True)),
                ('s_2220_4', models.FloatField(blank=True, null=True)),
                ('s_2310_4', models.FloatField(blank=True, null=True)),
                ('s_2320_4', models.FloatField(blank=True, null=True)),
                ('s_2330_4', models.FloatField(blank=True, null=True)),
                ('s_2340_4', models.FloatField(blank=True, null=True)),
                ('s_2350_4', models.FloatField(blank=True, null=True)),
                ('s_2410_4', models.FloatField(blank=True, null=True)),
                ('s_2400_4', models.FloatField(blank=True, null=True)),
                ('s_2400_5', models.FloatField(blank=True, null=True)),
                ('s_2400_4_2yearago', models.FloatField(blank=True, null=True)),
                ('s_2400_5_2yearago', models.FloatField(blank=True, null=True)),
                ('s_3600_3', models.FloatField(blank=True, null=True)),
                ('s_3600_5', models.FloatField(blank=True, null=True)),
                ('disqual_uchred', models.BooleanField(default=False, null=True)),
                ('m_11', models.BooleanField(default=False, null=True)),
                ('m_11_percent', models.FloatField(blank=True, null=True)),
                ('m_2', models.BooleanField(default=False, null=True)),
                ('start_ball', models.CharField(max_length=125)),
                ('vnp_conduct', models.BooleanField(default=False, null=True)),
                ('high_risk_contr_sum', models.FloatField(blank=True, null=True)),
                ('razryv_1stlink_sum', models.FloatField(blank=True, null=True)),
                ('subsidiary_risk', models.BooleanField(default=False, null=True)),
                ('challenge_risk', models.BooleanField(default=False, null=True)),
                ('settle_3part_sum', models.FloatField(blank=True, null=True)),
                ('efrsdul_lender', models.BooleanField(default=False, null=True)),
                ('efrsdul_deptor', models.BooleanField(default=False, null=True)),
                ('bankruptcy_procedure_bool', models.BooleanField(default=False, null=True)),
                ('bankruptcy_procedure', models.CharField(max_length=250, null=True)),
                ('bs_pay_bool', models.BooleanField(default=False, null=True)),
                ('stop_pay', models.BooleanField(default=False, null=True)),
                ('art46_over3month', models.BooleanField(default=False, null=True)),
                ('enforce_ntfinish_sum', models.FloatField(blank=True, null=True)),
                ('enforce_ntfinish_sum_wthtax', models.FloatField(blank=True, null=True)),
                ('account_balance_SKUAD', models.FloatField(blank=True, null=True)),
                ('pru_cad_cost_amt', models.FloatField(blank=True, null=True)),
                ('pru_cad_cost_amt_6monthago', models.FloatField(blank=True, null=True)),
                ('lru_cad_cost_amt', models.FloatField(blank=True, null=True)),
                ('lru_cad_cost_amt_6monthago', models.FloatField(blank=True, null=True)),
                ('ts_cad_cost_amt', models.FloatField(blank=True, null=True)),
                ('cad_cost_amt_inpledge', models.FloatField(blank=True, null=True)),
                ('cad_cost_amt_inpledge_last', models.FloatField(blank=True, null=True)),
                ('cad_cost_amt_inpledge_6monthago', models.FloatField(blank=True, null=True)),
                ('stcontract_amount', models.FloatField(default=0, null=True)),
                ('subsidy_sum', models.FloatField(blank=True, null=True)),
                ('recovery_initiation', models.FloatField(default=False, null=True)),
                ('lastdate_operation', models.DateTimeField(null=True)),
                ('restruct_sum', models.FloatField(blank=True, null=True)),
                ('early_term_restruct', models.BooleanField(default=False, null=True)),
                ('nwp_russia', models.FloatField(blank=True, null=True)),
                ('bznaper_year', models.FloatField(blank=True, null=True)),
                ('sr_chis_year', models.FloatField(blank=True, null=True)),
                ('sr_chis_3month', models.FloatField(blank=True, null=True)),
                ('sr_chis_6month', models.FloatField(blank=True, null=True)),
                ('sr_chis_9month', models.FloatField(blank=True, null=True)),
                ('sr_chis_12month', models.FloatField(blank=True, null=True)),
                ('address_change', models.BooleanField(default=False, null=True)),
                ('on_reestr_unscrup_post', models.BooleanField(default=False, null=True)),
                ('high_risk_contr_relation', models.BooleanField(default=False, null=True)),
                ('auto_chain', models.BooleanField(default=False, null=True)),
                ('transit_1day_contr', models.BooleanField(default=False, null=True)),
                ('export_lastyear', models.FloatField(blank=True, null=True)),
                ('export_thisyear', models.FloatField(blank=True, null=True)),
                ('nds_3_130_thisyear', models.FloatField(blank=True, null=True)),
                ('nds_3_130_lastyear', models.FloatField(blank=True, null=True)),
                ('on_reestr_benef', models.BooleanField(default=False, null=True)),
                ('razryv_2stlink_sum', models.FloatField(blank=True, null=True)),
                ('challenge_risk_sum', models.FloatField(blank=True, null=True)),
                ('tax_burden', models.FloatField(blank=True, null=True)),
                ('ru_tax_burden', models.FloatField(blank=True, null=True)),
                ('p033001', models.FloatField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'imported_attribute',
                'db_table': 'imported_attributes',
            },
        ),
        migrations.CreateModel(
            name='InnRes',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('author_id', models.CharField(blank=True, max_length=125)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('active', models.BooleanField(default=False)),
                ('inn', models.IntegerField()),
                ('result_score', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'inn_re',
                'db_table': 'inn_res',
            },
        ),
        migrations.CreateModel(
            name='MainCatalog',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('author_id', models.CharField(max_length=125)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('date_from', models.DateTimeField(null=True)),
                ('origin_name', models.CharField(blank=True, max_length=250)),
                ('description', models.CharField(blank=True, max_length=250)),
                ('active', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'main_catalog',
                'db_table': 'main_catalog',
            },
        ),
        migrations.CreateModel(
            name='MainCatalogFields',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('author_id', models.CharField(max_length=125)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('date_from', models.DateTimeField(null=True)),
                ('date_to', models.DateTimeField(null=True)),
                ('description', models.CharField(blank=True, max_length=250)),
                ('origin', models.CharField(blank=True, max_length=250)),
                ('active', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'main_catalog_filed',
                'db_table': 'main_catalog_fileds',
            },
        ),
        migrations.CreateModel(
            name='MarkersAttributes',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('author_id', models.CharField(blank=True, max_length=125)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('active', models.BooleanField(default=False)),
                ('name_marker_attr', models.CharField(max_length=125, unique=True)),
                ('attr_formulas', models.CharField(max_length=250)),
                ('description', models.CharField(max_length=250)),
                ('sql_query', models.TextField(blank=True, null=True)),
                ('py_query', models.TextField(blank=True, null=True)),
                ('nested_level', models.IntegerField()),
            ],
            options={
                'verbose_name': 'marker_attribute',
                'db_table': 'marker_attributes',
            },
        ),
        migrations.CreateModel(
            name='ScoringModelHistory',
            fields=[
                ('id', models.IntegerField(blank=True, db_index=True)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('author_id', models.CharField(blank=True, max_length=125)),
                ('created_date', models.DateTimeField(blank=True, editable=False, verbose_name='created_date')),
                ('version', models.IntegerField(blank=True)),
                ('active', models.BooleanField(default=False)),
                ('model_name', models.CharField(blank=True, db_index=True, max_length=250)),
                ('status', models.CharField(choices=[('DF', 'Draft'), ('AP', 'Approved')], default='DF', max_length=2)),
                ('description', models.CharField(blank=True, max_length=250)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical scoring_model',
                'verbose_name_plural': 'historical scoring_models',
                'db_table': 'scoring_model_history',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='ScoringModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('author_id', models.CharField(blank=True, max_length=125)),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='created_date')),
                ('version', models.IntegerField(blank=True)),
                ('active', models.BooleanField(default=False)),
                ('model_name', models.CharField(blank=True, max_length=250, unique=True)),
                ('status', models.CharField(choices=[('DF', 'Draft'), ('AP', 'Approved')], default='DF', max_length=2)),
                ('description', models.CharField(blank=True, max_length=250)),
                ('inns', models.ManyToManyField(blank=True, to='backend.innres')),
                ('marker_id', models.ManyToManyField(blank=True, to='backend.markersattributes')),
            ],
            options={
                'verbose_name': 'scoring_model',
                'db_table': 'scoring_model',
            },
        ),
        migrations.AddIndex(
            model_name='markersattributes',
            index=models.Index(fields=['name_marker_attr', 'attr_formulas', 'created_date'], name='marker_attr_name_ma_5c2797_idx'),
        ),
        migrations.AddField(
            model_name='maincatalogfields',
            name='main_catalog_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.maincatalog'),
        ),
        migrations.AddIndex(
            model_name='maincatalog',
            index=models.Index(fields=['origin_name', 'created_date'], name='main_catalo_origin__c632a4_idx'),
        ),
        migrations.AddIndex(
            model_name='innres',
            index=models.Index(fields=['inn', 'created_date'], name='inn_res_inn_5769c8_idx'),
        ),
        migrations.AddField(
            model_name='importedattributes',
            name='file_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.fileattributes'),
        ),
        migrations.AddIndex(
            model_name='fileattributes',
            index=models.Index(fields=['created_date'], name='file_attrib_created_621805_idx'),
        ),
        migrations.AddIndex(
            model_name='countedattributesnew',
            index=models.Index(fields=['id', 'created_date'], name='counted_att_id_e2b353_idx'),
        ),
        migrations.AddIndex(
            model_name='scoringmodel',
            index=models.Index(fields=['status', 'created_date'], name='scoring_mod_status_1178c6_idx'),
        ),
        migrations.AddIndex(
            model_name='maincatalogfields',
            index=models.Index(fields=['origin', 'created_date'], name='main_catalo_origin_604885_idx'),
        ),
        migrations.AddIndex(
            model_name='importedattributes',
            index=models.Index(fields=['inn', 'created_date', 'report_date'], name='imported_at_inn_a20a2d_idx'),
        ),
    ]
