from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Tag(models.Model):
    name = models.CharField(max_length=63, verbose_name="Название тега")

    class Meta:
        verbose_name = "Тег"
        verbose_name_plural = "Теги"

    def __str__(self):
        return self.name


class Travel(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название путешествия")
    description = models.TextField(verbose_name="Описание путешествия")
    image = models.ImageField(
        upload_to="travels/images/", null=True, blank=True, verbose_name="Изображение"
    )
    location = models.CharField(max_length=255, verbose_name="Местоположение")
    start_date = models.DateField(verbose_name="Дата начала")
    end_date = models.DateField(verbose_name="Дата окончания")
    is_public = models.BooleanField(default=False, verbose_name="Публичность")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="travels",
        verbose_name="Пользователь",
    )
    tags = models.ManyToManyField(Tag, related_name="travels", verbose_name="Теги")

    class Meta:
        verbose_name = "Путешествие"
        verbose_name_plural = "Путешествия"

    def __str__(self):
        return self.title


class Comment(models.Model):
    travel = models.ForeignKey(
        Travel,
        on_delete=models.CASCADE,
        related_name="comments",
        verbose_name="Путешествие",
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="comments",
        verbose_name="Пользователь",
    )
    description = models.TextField(verbose_name="Описание комментария")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")

    class Meta:
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"

    def __str__(self):
        return f"Комментарий от {self.user.username} к {self.travel.title}"
