from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Profile, Plan

# Register your models here.


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {
         'fields': ('default_zip', 'tracked_constellations',)}),
    )


admin.site.register(User, CustomUserAdmin)
admin.site.register(Profile)
admin.site.register(Plan)
