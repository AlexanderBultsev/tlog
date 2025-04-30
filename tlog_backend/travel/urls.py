from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TagViewSet, TravelViewSet, CommentViewSet

router = DefaultRouter()

router.register(r"travels", TravelViewSet, basename="travels")
router.register(
    r"travels/(?P<travel_id>\d+)/comments", CommentViewSet, basename="comments"
)
router.register(r"tags", TagViewSet, basename="tags")

urlpatterns = [
    path("", include(router.urls)),
]
