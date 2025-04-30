from rest_framework import serializers
from .models import Tag, Travel, Comment
from djoser.serializers import UserSerializer
from django.core.files.base import ContentFile
import base64
from uuid import uuid4

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "travel", "user", "description", "created_at", "updated_at"]
        read_only_fields = ["travel", "user", "created_at", "updated_at"]


class TravelSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        many=True,
        required=False,
    )

    image = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Travel
        fields = [
            "id",
            "title",
            "description",
            "image",
            "location",
            "start_date",
            "end_date",
            "is_public",
            "created_at",
            "updated_at",
            "user",
            "tags",
            "comments",
            "tag_ids",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "user",
            "tags",
            "comments",
        ]
        write_only_fields = ["tag_ids"]

    def create(self, validated_data):
        tags = validated_data.pop("tag_ids", [])
        image_data = validated_data.pop('image', None)
        if image_data:
            validated_data['image'] = self.process_image(image_data)
        
        travel = Travel.objects.create(**validated_data)
        travel.tags.set(tags)
        return travel

    def update(self, instance, validated_data):
        tags = validated_data.pop("tag_ids", None)
        image_data = validated_data.pop('image', None)
        if image_data:
            instance.image = self.process_image(image_data)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if tags is not None:
            instance.tags.set(tags)
        return instance

    def process_image(self, image_data):
        format, image_str = image_data.split(';base64,')  # Разделяем формат и данные
        image = ContentFile(base64.b64decode(image_str))  # Декодируем base64 в бинарные данные
        filename = f"{uuid4()}.jpg"  # Генерация уникального имени для файла
        image.name = filename
        return image