from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions

from .models import Travel, Tag
from .serializers import (
    TravelSerializer,
    TagSerializer,
    CommentSerializer,
)
from .permissions import IsOwnerOrReadOnly


def csrf_token_view(request):
    get_token(request)
    return JsonResponse({"csrfToken": get_token(request)})


class TravelViewSet(viewsets.ModelViewSet):
    serializer_class = TravelSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = Travel.objects.all()
        user_id = self.request.query_params.get("user_id")
        tag_id = self.request.query_params.get("tag_id")

        if user_id:
            queryset = queryset.filter(user__id=user_id)
            if (
                not self.request.user.is_authenticated
                or str(self.request.user.id) != user_id
            ):
                queryset = queryset.filter(is_public=True)
        elif not self.request.user.is_authenticated:
            queryset = queryset.filter(is_public=True)

        if tag_id:
            queryset = queryset.filter(tags__id=tag_id)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_travel(self):
        travel_id = self.kwargs.get("travel_id")
        return get_object_or_404(Travel, pk=travel_id)

    def get_queryset(self):
        travel = self.get_travel()
        return travel.comments.all()

    def perform_create(self, serializer):
        serializer.save(travel=self.get_travel(), user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(travel=self.get_travel(), user=self.request.user)


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Tag.objects.all()

