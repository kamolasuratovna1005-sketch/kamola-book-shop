import hashlib

from django.db import models

from core.translations import GENRE_LABELS, STATUS_LABELS

GENRE_CHOICES = [(code, labels['uz']) for code, labels in GENRE_LABELS.items()]
STATUS_CHOICES = [(code, labels['uz']) for code, labels in STATUS_LABELS.items()]

SPINE_COLORS = [
    '#6B1F2A',  # maroon
    '#C9A35C',  # gold
    '#3F6B4A',  # forest green
    '#4A6B8A',  # navy blue
    '#8A5A3F',  # brown
    '#7A4A6B',  # plum
    '#2F4F4F',  # teal/charcoal
    '#B5532C',  # rust
    '#5A6B3F',  # olive
    '#4A3F6B',  # indigo
    '#8A3F4A',  # wine
    '#6B5A3F',  # brass
]


class Book(models.Model):
    title = models.CharField("Kitob nomi", max_length=255)
    author = models.CharField("Muallif", max_length=255, blank=True)
    genre = models.CharField(
        "Janr", max_length=20, choices=GENRE_CHOICES, default='boshqa'
    )
    status = models.CharField(
        "Holati", max_length=10, choices=STATUS_CHOICES, default='planned'
    )
    cover = models.ImageField("Muqova", upload_to='covers/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

    def genre_label(self, lang='uz'):
        return GENRE_LABELS.get(self.genre, {}).get(lang, self.genre)

    def status_label(self, lang='uz'):
        return STATUS_LABELS.get(self.status, {}).get(lang, self.status)

    @property
    def spine_color(self):
        digest = hashlib.md5(self.title.encode('utf-8')).hexdigest()
        idx = int(digest, 16) % len(SPINE_COLORS)
        return SPINE_COLORS[idx]
