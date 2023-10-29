import datetime
from django.db import models
import uuid
from simple_history.models import HistoricalRecords
from .parser import sql_parser
from .pyparser_main_3 import py_parser_main
# from simple_history import register
# from author.decorators import with_author
from django.contrib.auth.models import User
from django.conf import settings


class FileAttributes(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4,
                            editable=False,)
    author_id = models.CharField(max_length=125,null=True, blank=True,)
    created_date = models.DateTimeField(auto_now_add=True)
    filename = models.FileField(upload_to='store/')
    filesize = models.CharField(max_length=255,null=True, blank=True,)
    import_new_rows = models.CharField(max_length=255,null=True, blank=True,)
    import_update_rows = models.CharField(max_length=255,null=True, blank=True,)
    import_total_rows = models.CharField(max_length=255,null=True, blank=True,)

    class Meta:
        indexes = [
            models.Index(fields=["created_date"])
        ]
        db_table = "file_attributes"
        verbose_name = "file_attribute"

    def __str__(self) -> str:
        return self.author_id


class ImportedAttributes(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4,
                            editable=False,)
    author_id = models.CharField(max_length=125,)
    created_date = models.DateTimeField(auto_now_add=True)
    inn = models.IntegerField(null=False)
    np_name = models.CharField(max_length=125,)
    report_date = models.DateTimeField()
    on_uch_date = models.DateTimeField()
    status_egrn = models.CharField(max_length=125,)
    foreign_uchred = models.BooleanField(null=True, default=False)
    nedostov = models.IntegerField(null=True)
    sr_chis_thisyear = models.FloatField(null=True, blank=True,)
    sr_chis_lastyear = models.FloatField(null=True, blank=True,)
    bznaper_thisyear = models.FloatField(null=True, blank=True,)
    bznaper_lastyear = models.FloatField(null=True, blank=True,)
    postup_thisyear = models.FloatField(null=True, blank=True,)
    postup_lastyear = models.FloatField(null=True, blank=True,)
    dolg = models.FloatField(null=True, blank=True,)
    dolg_overdue = models.FloatField(null=True, blank=True,)
    npo_2_020_year = models.FloatField(null=True, blank=True,)
    npo_2_030_year = models.FloatField(null=True, blank=True,)
    npo_2_040_year = models.FloatField(null=True, blank=True,)
    npo_2_010_year = models.FloatField(null=True, blank=True,)
    npo_2_020_thisyear = models.FloatField(null=True, blank=True,)
    npo_2_020_lastyear = models.FloatField(null=True, blank=True,)
    npo_2_060_year = models.FloatField(null=True, blank=True,)
    npo_2_060_thisyear = models.FloatField(null=True, blank=True,)
    npo_2_060_lastyear = models.FloatField(null=True, blank=True,)
    npo_4_010 = models.FloatField(null=True, blank=True,)
    npo_5_060 = models.FloatField(null=True, blank=True,)
    nds_3_190_thisyear = models.FloatField(null=True, blank=True,)
    nds_3_190_lastyear = models.FloatField(null=True, blank=True,)
    nds_3_125_thisyear = models.FloatField(null=True, blank=True,)
    nds_3_125_lastyear = models.FloatField(null=True, blank=True,)
    s_1150_4 = models.FloatField(null=True, blank=True,)
    s_1100_4 = models.FloatField(null=True, blank=True,)
    s_1210_4 = models.FloatField(null=True, blank=True,)
    s_1230_4 = models.FloatField(null=True, blank=True,)
    s_1230_5 = models.FloatField(null=True, blank=True,)
    s_1240_4 = models.FloatField(null=True, blank=True,)
    s_1250_4 = models.FloatField(null=True, blank=True,)
    s_1200_4 = models.FloatField(null=True, blank=True,)
    s_1600_4 = models.FloatField(null=True, blank=True,)
    s_1600_5 = models.FloatField(null=True, blank=True,)
    s_1600_4_2yearago = models.FloatField(null=True, blank=True,)
    s_1600_5_2yearago = models.FloatField(null=True, blank=True,)
    s_1310_4 = models.FloatField(null=True, blank=True,)
    s_1300_4 = models.FloatField(null=True, blank=True,)
    s_1300_5 = models.FloatField(null=True, blank=True,)
    s_1410_4 = models.FloatField(null=True, blank=True,)
    s_1450_4 = models.FloatField(null=True, blank=True,)
    s_1400_4 = models.FloatField(null=True, blank=True,)
    s_1510_4 = models.FloatField(null=True, blank=True,)
    s_1520_4 = models.FloatField(null=True, blank=True,)
    s_1520_5 = models.FloatField(null=True, blank=True,)
    s_1530_4 = models.FloatField(null=True, blank=True,)
    s_1550_4 = models.FloatField(null=True, blank=True,)
    s_1500_4 = models.FloatField(null=True, blank=True,)
    s_2110_4 = models.FloatField(null=True, blank=True,)
    s_2110_5 = models.FloatField(null=True, blank=True,)
    s_2120_4 = models.FloatField(null=True, blank=True,)
    s_2200_4 = models.FloatField(null=True, blank=True,)
    s_2210_4 = models.FloatField(null=True, blank=True,)
    s_2220_4 = models.FloatField(null=True, blank=True,)
    s_2310_4 = models.FloatField(null=True, blank=True,)
    s_2320_4 = models.FloatField(null=True, blank=True,)
    s_2330_4 = models.FloatField(null=True, blank=True,)
    s_2340_4 = models.FloatField(null=True, blank=True,)
    s_2350_4 = models.FloatField(null=True, blank=True,)
    s_2410_4 = models.FloatField(null=True, blank=True,)
    s_2400_4 = models.FloatField(null=True, blank=True,)
    s_2400_5 = models.FloatField(null=True, blank=True,)
    s_2400_4_2yearago = models.FloatField(null=True, blank=True,)
    s_2400_5_2yearago = models.FloatField(null=True, blank=True,)
    s_3600_3 = models.FloatField(null=True, blank=True,)
    s_3600_5 = models.FloatField(null=True, blank=True,)
    s_3600_5 = models.FloatField(null=True, blank=True,)
    disqual_uchred = models.BooleanField(null=True, default=False)
    m_11 = models.BooleanField(null=True, default=False)
    m_11_percent = models.FloatField(null=True, blank=True,)
    m_2 = models.BooleanField(null=True, default=False)
    start_ball = models.CharField(max_length=125,)
    vnp_conduct = models.BooleanField(null=True, default=False)
    high_risk_contr_sum = models.FloatField(null=True, blank=True,)
    razryv_1stlink_sum = models.FloatField(null=True, blank=True,)
    subsidiary_risk = models.BooleanField(null=True, default=False)
    challenge_risk = models.BooleanField(null=True, default=False)
    settle_3part_sum = models.FloatField(null=True, blank=True,)
    efrsdul_lender = models.BooleanField(null=True, default=False)
    efrsdul_deptor = models.BooleanField(null=True, default=False)
    bankruptcy_procedure_bool = models.BooleanField(null=True, default=False)
    bankruptcy_procedure = models.CharField(null=True, max_length=250)
    bs_pay_bool = models.BooleanField(null=True, default=False)
    stop_pay = models.BooleanField(null=True, default=False)
    art46_over3month = models.BooleanField(null=True, default=False)
    enforce_ntfinish_sum = models.FloatField(null=True, blank=True,)
    enforce_ntfinish_sum_wthtax = models.FloatField(null=True, blank=True,)
    account_balance_SKUAD = models.FloatField(null=True, blank=True,)
    pru_cad_cost_amt = models.FloatField(null=True, blank=True,)
    pru_cad_cost_amt_6monthago = models.FloatField(null=True, blank=True,)
    lru_cad_cost_amt = models.FloatField(null=True, blank=True,)
    lru_cad_cost_amt_6monthago = models.FloatField(null=True, blank=True,)
    ts_cad_cost_amt = models.FloatField(null=True, blank=True,)
    cad_cost_amt_inpledge = models.FloatField(null=True, blank=True,)
    cad_cost_amt_inpledge_last = models.FloatField(null=True, blank=True,)
    cad_cost_amt_inpledge_6monthago = models.FloatField(null=True, blank=True,)
    stcontract_amount = models.FloatField(null=True, default=0)
    subsidy_sum = models.FloatField(null=True, blank=True,)
    recovery_initiation = models.FloatField(null=True, default=False)
    lastdate_operation = models.DateTimeField(null=True)
    restruct_sum = models.FloatField(null=True, blank=True,)
    early_term_restruct = models.BooleanField(null=True, default=False)
    nwp_russia = models.FloatField(null=True, blank=True,)
    bznaper_year = models.FloatField(null=True, blank=True,)
    sr_chis_year = models.FloatField(null=True, blank=True,)
    sr_chis_3month = models.FloatField(null=True, blank=True,)
    sr_chis_6month = models.FloatField(null=True, blank=True,)
    sr_chis_9month = models.FloatField(null=True, blank=True,)
    sr_chis_12month = models.FloatField(null=True, blank=True,)
    address_change = models.BooleanField(null=True, default=False)
    on_reestr_unscrup_post = models.BooleanField(null=True, default=False)
    high_risk_contr_relation = models.BooleanField(null=True, default=False)
    auto_chain = models.BooleanField(null=True, default=False)
    transit_1day_contr = models.BooleanField(null=True, default=False)
    export_lastyear = models.FloatField(null=True, blank=True,)
    export_thisyear = models.FloatField(null=True, blank=True,)
    nds_3_130_thisyear = models.FloatField(null=True, blank=True,)
    nds_3_130_lastyear = models.FloatField(null=True, blank=True,)
    on_reestr_benef = models.BooleanField(null=True, default=False)
    razryv_2stlink_sum = models.FloatField(null=True, blank=True,)
    challenge_risk_sum = models.FloatField(null=True, blank=True,)
    tax_burden = models.FloatField(null=True, blank=True,)
    ru_tax_burden = models.FloatField(null=True, blank=True,)
    p033001 = models.FloatField(null=True, blank=True,)
    file_id = models.ForeignKey(FileAttributes,
                                on_delete=models.CASCADE)

    class Meta:
        indexes = [
            models.Index(fields=["inn", "created_date", "report_date"])
        ]
        db_table = "imported_attributes"
        verbose_name = "imported_attribute"

    def __str__(self):
        return self.np_name


class MainCatalog(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4,
                            editable=False,)
    author_id = models.CharField(max_length=125, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    date_from = models.DateTimeField(null=True)
    origin_name = models.CharField(max_length=250, blank=True)
    description = models.CharField(max_length=250, blank=True)
    active = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=["origin_name", "created_date"])
        ]
        db_table = "main_catalog"
        verbose_name = "main_catalog"

    def __str__(self) -> str:
        return f"{self.origin_name}"


class MainCatalogFields(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4,
                            editable=False,)
    author_id = models.CharField(max_length=125, blank=True, null=True)
    # author = models.ForeignKey(
    #     settings.AUTH_USER_MODEL,
    #     on_delete=models.CASCADE
    # )
    created_date = models.DateTimeField(auto_now_add=True)
    date_from = models.DateTimeField(null=True)
    date_to = models.DateTimeField(null=True)
    # filed_name = models.CharField(max_length=250, blank=True)# TODO Remove this field - origin has the same meaning
    description = models.CharField(max_length=250, blank=True)
    origin = models.CharField(max_length=250, blank=True)
    active = models.BooleanField(default=False)
    main_catalog_id = models.ForeignKey(MainCatalog,
                                        on_delete=models.CASCADE)

    class Meta:
        indexes = [
            models.Index(fields=["origin", "created_date"])
        ]
        db_table = "main_catalog_fileds"
        verbose_name = "main_catalog_filed"

    def __str__(self) -> str:
        return f"{self.origin}"


class MarkersAttributes(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4,
                            editable=False,)
    author_id = models.CharField(max_length=125, blank=True)
    # author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, editable=False, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)
    name_marker_attr = models.CharField(max_length=125, unique=True)
    # scoring_name = models.ManyToManyField(ScoringModel, blank=True)
    # From CountedAttrFormula
    attr_formulas = models.CharField(max_length=250)
    description = models.CharField(max_length=250)
    sql_query = models.TextField(blank=True, null=True)
    py_query = models.TextField(blank=True, null=True)
    nested_level = models.IntegerField()

    class Meta:
        indexes = [
            models.Index(fields=["name_marker_attr",
                         "attr_formulas", "created_date"])
        ]
        db_table = "marker_attributes"
        verbose_name = "marker_attribute"

    def __str__(self) -> str:
        return f"{self.name_marker_attr}"

    # From CountedAttrFormula
    def save(self, *args, **kwargs):
        self.sql_query = sql_parser(self.attr_formulas)
        self.py_query = py_parser_main(self.attr_formulas)
        super().save(*args, **kwargs)


class InnRes(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4,
                            editable=False,)
    author_id = models.CharField(max_length=125, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)
    inn = models.IntegerField()
    result_score = models.JSONField(null=True, blank=True)
    # scoring_model = models.ManyToManyField(ScoringModel, blank=True)
    # markers_json = models.JSONField()

    class Meta:
        indexes = [
            models.Index(fields=["inn", "created_date"])
        ]
        db_table = "inn_res"
        verbose_name = "inn_re"

    def __str__(self) -> str:
        return f"{self.inn}"


class ScoringModel(models.Model):

    class Status(models.TextChoices):
        DRAFT = 'DF', 'Draft'
        APPROVED = 'AP', 'Approved'

    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4,
                            editable=False,)
    author_id = models.CharField(max_length=125, blank=True)
    # author = models.ForeignKey( User, on_delete=models.CASCADE, blank=True, null=True) # TODO Подправить авторизацию
    created_date = models.DateTimeField("created_date", auto_now_add=True)
    version = models.IntegerField(blank=True)
    active = models.BooleanField(default=False)
    model_name = models.CharField(max_length=250, blank=True, unique=True)
    status = models.CharField(max_length=2,
                              choices=Status.choices,
                              default=Status.DRAFT)
    description = models.CharField(max_length=250, blank=True)
    marker_id = models.ManyToManyField(MarkersAttributes, blank=True)
    inns = models.ManyToManyField(InnRes, blank=True)
    history = HistoricalRecords(
        custom_model_name='ScoringModelHistory',
        table_name='scoring_model_history',
        inherit=True,
    )

    class Meta:
        indexes = [
            models.Index(fields=["status", "created_date"])
        ]
        db_table = "scoring_model"
        verbose_name = "scoring_model"

    def __str__(self) -> str:
        return f"{self.model_name}"

    def save(self, *args, **kwargs):
        if self.pk:
            original_version = self.__class__.objects.get(pk=self.pk).version
            if original_version == self.version:
                self.version += 1
        else:
            self.version = 1
        super(ScoringModel, self).save(*args, **kwargs)


# Это истинные вычисляемые атрибуты с 131 по 171
class CountedAttributesNew(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4,
                            editable=False,)
    author_id = models.CharField(max_length=125, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)
    inn = models.IntegerField(null=False)
    other_property = models.FloatField(null=True, blank=True, default=0)
    clr = models.FloatField(null=True, blank=True, default=0)
    solvency_ratio = models.FloatField(null=True, blank=True, default=0)
    autonomy_ratio = models.FloatField(null=True, blank=True, default=0)
    perc_coverage_ratio = models.FloatField(null=True, blank=True, default=0)
    assets_return = models.FloatField(null=True, blank=True, default=0)
    dolg_in_balance = models.FloatField(null=True, blank=True, default=0)
    return_on_equity = models.FloatField(null=True, blank=True, default=0)
    fin_leverage = models.FloatField(null=True, blank=True, default=0)
    dolg_ebit = models.FloatField(null=True, blank=True, default=0)
    turnover = models.FloatField(null=True, blank=True, default=0)
    turnover_in_credit = models.FloatField(null=True, blank=True, default=0)
    repay_fund = models.FloatField(null=True, blank=True, default=0)
    invest_coverage_ratio = models.FloatField(null=True, blank=True, default=0)
    equity_capital_ratio = models.FloatField(null=True, blank=True, default=0)
    stock_avail_ration = models.FloatField(null=True, blank=True, default=0)
    quick_liquid_ratio = models.FloatField(null=True, blank=True, default=0)
    asset_dinam_1 = models.FloatField(null=True, blank=True, default=0)
    asset_dinam_2 = models.FloatField(null=True, blank=True, default=0)
    asset_dinam_3 = models.FloatField(null=True, blank=True, default=0)
    profit_dinam_1 = models.FloatField(null=True, blank=True, default=0)
    profit_dinam_2 = models.FloatField(null=True, blank=True, default=0)
    profit_dinam_3 = models.FloatField(null=True, blank=True, default=0)
    k_5_154 = models.FloatField(null=True, blank=True, default=0)
    k_6_155 = models.FloatField(null=True, blank=True, default=0)
    k_7_156 = models.FloatField(null=True, blank=True, default=0)
    k_8_157 = models.FloatField(null=True, blank=True, default=0)
    k_9_158 = models.FloatField(null=True, blank=True, default=0)
    k_10_159 = models.FloatField(null=True, blank=True, default=0)
    property_sum = models.FloatField(null=True, blank=True, default=0)
    k_1_161 = models.FloatField(null=True, blank=True, default=0)
    k_2_162 = models.FloatField(null=True, blank=True, default=0)
    k_3_163 = models.FloatField(null=True, blank=True, default=0)
    k_4_164 = models.FloatField(null=True, blank=True, default=0)
    revenue_dinam = models.FloatField(null=True, blank=True, default=0)
    current_business_value = models.FloatField(null=True, blank=True, default=0)
    liquid_business_value = models.FloatField(null=True, blank=True, default=0)
    repay_fund_lender = models.FloatField(null=True, blank=True, default=0)
    need_capital = models.FloatField(null=True, blank=True, default=0)
    need_capital_dp = models.FloatField(null=True, blank=True, default=0)
    ebitda = models.FloatField(null=True, blank=True, default=0)
    dolg_score = models.FloatField(null=True, blank=True, default=0)
    dolg_dp = models.FloatField(null=True, blank=True, default=0)
    need_capital_rub = models.FloatField(null=True, blank=True, default=0)
    need_capital_dp_rub = models.FloatField(null=True, blank=True, default=0)

    class Meta:
        indexes = [
            models.Index(fields=["id", "created_date"])
        ]
        db_table = "counted_attributes_new"
        verbose_name = "counted_attributes_new"

    def __str__(self) -> str:
        return f"{self.author_id}"


# class CountedAttrFormula(models.Model):
#     id = models.AutoField(primary_key=True)
#     uuid = models.UUIDField(default = uuid.uuid4,
#                             editable = False,)
#     author_id = models.CharField(max_length=125)
#     created_date = models.DateTimeField(auto_now_add=True)
#     active = models.BooleanField(default=False)
#     attr_formulas = models.CharField(max_length=250)
#     description = models.CharField(max_length=250)
#     cntd_attr_id = models.ForeignKey(CountedAttributes,
#                                      on_delete=models.CASCADE)
#     sql_query = models.TextField(blank=True, null=True)
#     nested_level = models.IntegerField()

#     class Meta:
#         indexes = [
#             models.Index(fields=["attr_formulas","created_date"])
#         ]
#         db_table  = "counted_attr_formula"
#         verbose_name = "counted_attr_formula"

#     def __str__(self) -> str:
#         return f"{self.attr_formulas}"

#     def save(self, *args, **kwargs):
#         self.sql_query = parser(self.attr_formulas)
#         super().save(*args, **kwargs)


# class ScoringModelHistory(models.Model):
#     class Status(models.TextChoices):
#         DRAFT = 'DF', 'Draft'
#         APPROVED = 'AP', 'Approved'

#     id = models.AutoField(primary_key=True)
#     uuid = models.UUIDField(default = uuid.uuid4,
#                             editable = False,)
#     author_id = models.CharField(max_length=125)
#     created_date = models.DateTimeField(auto_now_add=True)
#     scoring_model_id = models.ForeignKey(ScoringModel,
#                                          on_delete=models.CASCADE)
#     date_from = models.DateTimeField(null=True)
#     date_to = models.DateTimeField(null=True)
#     version = models.IntegerField()
#     active = models.BooleanField(default=False)
#     model_name = models.CharField(max_length=250, blank=True)
#     status = models.CharField(max_length=2,
#                               choices=Status.choices,
#                               default=Status.DRAFT)

#     class Meta:
#         indexes = [
#             models.Index(fields=["status","created_date"])
#         ]
#         db_table  = "scoring_model_history"
#         verbose_name = "scoring_model_history"

#     def __str__(self) -> str:
#         return f"{self.model_name}"



### CRM DATA MODELS ###########################################################################################

#----------------
# СПРАВОЧНИКИ

class Manager(models.Model):   # Manager - Менеджер площадки
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    second_name = models.CharField(max_length=255, blank=True, null=True)
    patronymic = models.CharField(max_length=255, blank=True, null=True)
    job_title = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table ='manager'

    def __str__(self):
        return f"{self.first_name} {self.second_name}"


class Region(models.Model):   # Region - Регион
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    region = models.CharField(max_length=255, blank=True, null=True)
    region_number = models.IntegerField()

    class Meta:
        db_table ='region'
        
    def __str__(self):
        return f"{self.region_number} - {self.region}"
    

class SupportMeasure(models.Model):   # SupportMeasure мера поддержки
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    category_type = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table ='supp_measure'
 
    def __str__(self):
        return self.category_type


class ReviewStage(models.Model): # ReviewStage - Стадия рассмотрения
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    stage = models.CharField(max_length=255, blank=True, null=True)  

    class Meta:
        db_table ='review_stage'
 
    def __str__(self):
        return self.stage
    

class DebtType(models.Model):   #  DebtType - тип долга
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table ='debt_type'
 
    def __str__(self):
        return self.type


class Category(models.Model):   # Category - Категория
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table ='category'
 
    def __str__(self):
        return self.type


class ApplicantStatus(models.Model):    #  ApplicantStatus - Статус заявителя
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table ='appl_status'
 
    def __str__(self):
        return self.status


class InformationSourceType(models.Model):   # InformationSource - Тип источника
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table ='inform_source_type'
 
    def __str__(self):
        return self.type
    

class PositiveDecision(models.Model):    # KPI -> PositiveDecision
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    positive_decision = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table ='pos_decision'
 
    def __str__(self):
        return self.positive_decision
    

class NegativeDecision(models.Model):    # KPI -> PositiveDecision
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    negative_decision = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table ='neg_decision'
 
    def __str__(self):
        return self.negative_decision

#---------------------

#---------------------
# MAIN

class ClientRepresentative(models.Model): # Представитель клиента
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    representative_first_name = models.CharField(max_length=255, blank=True, null=True)
    representative_second_name = models.CharField(max_length=255, blank=True, null=True)
    representative_patronymic = models.CharField(max_length=255, blank=True, null=True)
    representative_position = models.CharField(max_length=255, blank=True, null=True) # Должность представителя
    representative_phone = models.CharField(max_length=20) # Телефон представителя
    representative_email = models.CharField(max_length=255, blank=True, null=True) # Почта представителя
    control_point = models.CharField(max_length=255, blank=True, null=True) # Контрольная точка

    class Meta:
        db_table ='client_representative'
 
    def __str__(self):
        return f"{self.first_name} {self.second_name}"
    

class InformationSource(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    info_source_type_id = models.ForeignKey(InformationSourceType, on_delete=models.CASCADE)
    info_source_date = models.DateTimeField()
    info_source_number = models.CharField(max_length=255, blank=True, null=True)
    
    class Meta:
        db_table ='inform_source'
 
    def __str__(self):
        return self.info_source_number


class ComplianceCriteria(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    debt_amount = models.IntegerField() # Сумма задолженности
    debt_type = models.ForeignKey(DebtType, on_delete=models.CASCADE) # Тип долга
    category = models.ForeignKey(Category, on_delete=models.CASCADE) # Категория
    support_measure = models.ForeignKey(SupportMeasure, on_delete=models.CASCADE) # Мера поддержки
    note = models.TextField() # Примечание к гр. 23
    support_duration = models.IntegerField() # Срок предоставления меры

    class Meta:
        db_table ='compliance_criteria'
 
    def __str__(self):
        return f"{self.client.name} - {self.debt_type}"


class KPI(models.Model): # KPI вид решения
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    positive_decision_type = models.ForeignKey(PositiveDecision, on_delete=models.CASCADE)  # Вид положительного решения
    positive_decision_date = models.DateField(blank=True, null=True)  # Дата положительного решения
    measure_provided_duration = models.IntegerField(blank=True, null=True)  # На сколько предоставлена мера
    oiv_request_sender = models.CharField(max_length=255, blank=True, null=True)  # От кого ходатайство ОИВ (для МС)
    negative_decision_type = models.ForeignKey(NegativeDecision, on_delete=models.CASCADE)  # Вид отрицательного решения
    settled_debt_amount = models.IntegerField(blank=True, null=True)  # Сумма урегулированной задолженности
    
    received_amount_budget = models.IntegerField(blank=True, null=True)  # Сумма поступившая в бюджет
    overdue_debt_amount = models.IntegerField(blank=True, null=True)  # Просроченная задолженность сумма
    technical_overdue_debt_amount = models.IntegerField(blank=True, null=True)  # Сумма технической просроченной задолженности

    # next_commitment_date = models.DateField()  # Ближайший срок исполнения обязательства - пойдет на СВЯЗКУ
    # installment_delayed_amount = models.IntegerField()  # Не вступило в силу рассрочка/отсрочка - пойдет на СВЯЗКУ

    class Meta:
        db_table ='kpi'
 
    def __str__(self):
        return f"{self.oiv_request_sender} - KPI"


class FieldsOfPositiveDecisions(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    origin = models.CharField(max_length=255, blank=True, null=True) # Название в БД
    description = models.CharField(max_length=255, blank=True, null=True) # Название в реальности
    positive_decision = models.ForeignKey(PositiveDecision, on_delete=models.CASCADE) # К какому решению пренадлежат поля
    type_of_fields = models.CharField(max_length=255, blank=True, null=True) # значения 0 - string 1 - datetime, 2 - int, 3 - float, 4 - boolean

    class Meta:
        db_table ='positive_decision_fields'
 
    def __str__(self):
        return f"{self.origin}"


class KpiPositiveDecisionFields(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    kpi = models.ForeignKey(KPI, on_delete=models.CASCADE)
    fields_of_pos_decision = models.ForeignKey(FieldsOfPositiveDecisions, on_delete=models.CASCADE)
    value = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table ='kpi_positive_decision_fields'
 
    def __str__(self):
        return f"{self.value}"


# TODO На юзера навесить ресурс для дальнейшего скачивания данных
class Client(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default = uuid.uuid4,
                            editable = False,)
    created_date = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    second_name = models.CharField(max_length=255, blank=True, null=True)
    patronymic = models.CharField(max_length=255, blank=True, null=True)
    inn = models.IntegerField() # ИНН
    # registration_date = models.DateTimeField() это, наверное,  ClientRepresentative.control_point 
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    manager = models.ForeignKey(Manager, on_delete=models.CASCADE)
    applicant_status = models.ForeignKey(ApplicantStatus, on_delete=models.CASCADE) # Статус заявителя
    information_source = models.ForeignKey(InformationSource, on_delete=models.CASCADE) # Источник информации
    representitive_client = models.ForeignKey(ClientRepresentative, on_delete=models.CASCADE) # Представитель клиента
    # support_measure = models.ForeignKey(SupportMeasure, on_delete=models.CASCADE) # Мера поддержки
    compliance_criteria = models.ForeignKey(ComplianceCriteria, on_delete=models.CASCADE) # Мера поддержки
    first_meeting_date = models.DateField(blank=True, null=True) # Дата первой встречи
    event_date = models.DateTimeField(blank=True, null=True) # Дата наступления события
    event_description = models.TextField(blank=True, null=True) # Описание события
    kpi = models.ForeignKey(KPI, on_delete=models.CASCADE) # 
    
    class Meta:
        db_table ='client'
 
    def __str__(self):
        return f"{self.first_name} - {self.second_name}"


#---------------------