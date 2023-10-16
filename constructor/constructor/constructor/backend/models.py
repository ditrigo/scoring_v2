from django.db import models

class Files(models.Model):
    filename = models.FileField() # upload_to='store/'

    # def __str__(self) :
    #     return self.filename
