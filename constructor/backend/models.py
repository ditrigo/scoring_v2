from django.db import models
import uuid
from simple_history.models import HistoricalRecords
from .parser import sql_parser
# from simple_history import register
# from author.decorators import with_author
from django.contrib.auth.models import User
from django.conf import settings


class FileAttributes(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4,
                            editable=False,)
    author_id = models.CharField(max_length=125,)
    created_date = models.DateTimeField(auto_now_add=True)
    filename = models.FileField(upload_to='store/')

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

    def str(self):
        return self.inn


class MainCatalog(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4,
                            editable=False,)
    author_id = models.CharField(max_length=125)
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
    author_id = models.CharField(max_length=125)
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


# TODO переименовать на маркеры - их 40шт
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
        # self.py_query = py_parser(self.attr_formulas)
        super().save(*args, **kwargs)


class InnRes(models.Model):
    id = models.AutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4,
                            editable=False,)
    author_id = models.CharField(max_length=125, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)
    inn = models.IntegerField()
    result_score = models.IntegerField(null=True, blank=True)
    # scoring_model = models.ManyToManyField(ScoringModel, blank=True)

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
    author_id = models.CharField(max_length=125)
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


