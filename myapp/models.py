# -*- coding: utf-8 -*-
from django.db import models


# Create your models here.
class Mall(models.Model):
    AREA_CHOICES = (
        (u'海淀区', u'海淀区'),
        (u'朝阳区', u'朝阳区'),
        (u'西城区', u'西城区'),
        (u'东城区', u'东城区'),
        (u'丰台区', u'丰台区'),
        (u'昌平区', u'昌平区'),
    )
    mall_name = models.CharField(max_length=255, blank=False, null=False)
    mall_in_area = models.CharField(max_length=255, choices=AREA_CHOICES, blank=False, null=False)
    mall_location = models.CharField(max_length=255, blank=False, null=False)
    mall_longitude = models.FloatField(blank=False, null=False)
    mall_latitude = models.FloatField(blank=False, null=False)
    mall_info = models.TextField(default='', blank=True, null=True)

    def __str__(self):
        return self.mall_name.encode("utf-8")


class User(models.Model):
    SEX_CHOICE = (
        (u'男', u'男'),
        (u'女', u'女'),
        (u'其他', u'其他')
    )
    user_id = models.CharField(max_length=11, blank=False, null=False)
    user_name = models.CharField(max_length=255, blank=False, null=False)
    user_sex = models.CharField(max_length=10, choices=SEX_CHOICE, null=True)
    user_password = models.CharField(max_length=255, blank=False, null=False)
    is_business_user = models.BooleanField(default=False, null=False)

    def __str__(self):
        return self.user_name.encode("utf-8")


class Brand(models.Model):
    brand_name = models.CharField(max_length=255, blank=False, null=False)
    brand_image = models.ImageField(upload_to='./myapp/static/images/brand_images/', blank=True, null=True)
    brand_info = models.TextField(default='', blank=True, null=True)

    def __str__(self):
        return self.brand_name.encode("utf-8")


class Store(models.Model):
    business = models.ForeignKey(User)
    brand = models.ForeignKey(Brand)
    mall = models.ForeignKey(Mall)
    store_name = models.CharField(max_length=255, blank=False, null=False)
    store_location = models.CharField(max_length=255, blank=False, null=False)
    on_discount = models.BooleanField(default=False, blank=False, null=False)
    store_discount = models.FloatField(blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    store_info = models.TextField(blank=True, default='', null=True)
    store_image = models.ImageField(upload_to='./myapp/static/images/store_images/', blank=True, null=True)

    def __str__(self):
        return self.store_name.encode("utf-8")


class User_store(models.Model):
    user = models.ForeignKey(User)
    store = models.ForeignKey(Store)
    