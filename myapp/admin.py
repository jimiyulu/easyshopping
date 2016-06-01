from django.contrib import admin
from .models import Mall, User, Brand, Store, User_store


# Register your models here.
class MallAdmin(admin.ModelAdmin):
    list_display = ('mall_name', 'mall_in_area', 'mall_location', 'mall_longitude', 'mall_latitude')


class UserAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'user_sex', 'is_business_user')


class BrandAdmin(admin.ModelAdmin):
    list_display = ('brand_name', 'brand_image', )
    search_fields = ('brand_name', )


class StoreAdmin(admin.ModelAdmin):
    list_display = ('store_name', 'store_location', 'on_discount', 'store_discount', 'store_image',  )


class User_storeAdmin(admin.ModelAdmin):
    list_display = ('user', 'store')


admin.site.register(Mall, MallAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Brand, BrandAdmin)
admin.site.register(Store, StoreAdmin)
admin.site.register(User_store, User_storeAdmin)
