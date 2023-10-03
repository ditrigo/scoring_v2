from rest_framework import exceptions


class ExportError(exceptions.APIException):
    status_code = 400
    default_detail = ("Export error")
    default_code = "export_error"


class ImportError(exceptions.APIException):
    status_code = 500
    default_detail = ("Import error")
    default_code = "import_error"