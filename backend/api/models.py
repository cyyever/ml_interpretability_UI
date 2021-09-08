from django.db import models

# Create your models here.
class Data(models.Model):
    file = models.FileField(blank=False, null=False)
    label = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now=True,auto_now_add=False)
    
    def __str__(self):
        return self.file

