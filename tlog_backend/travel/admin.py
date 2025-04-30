from django.contrib import admin
from .models import Travel, Comment, Tag


@admin.register(Travel)
class TravelAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "user",
        "location",
        "start_date",
        "end_date",
        "is_public",
        "created_at",
    )
    list_filter = ("is_public", "created_at")
    search_fields = ("title", "description", "location", "user__username")
    autocomplete_fields = ["tags"]


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("user", "travel", "description", "created_at")
    list_filter = ("created_at",)
    search_fields = ("description", "user__username")


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
