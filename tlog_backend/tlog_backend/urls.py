"""
URL configuration for tlog_backend project.
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Travel Journal API",
        default_version="v1",
        description="Документация для API журнала путешествий",
        contact=openapi.Contact(email="admin@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls, name="admin"),
    path("api/", include("travel.urls"), name="api"),
    path("api/", include("djoser.urls"), name="djoser"),
    path("docs/", schema_view.with_ui("swagger", cache_timeout=0), name="docs"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
