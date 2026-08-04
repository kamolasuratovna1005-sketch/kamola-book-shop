from django import forms

from core.translations import GENRE_LABELS, STATUS_LABELS
from library.models import Book


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'genre', 'status', 'cover']

    def __init__(self, *args, lang='uz', **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['genre'].choices = [
            (code, labels.get(lang, labels['uz'])) for code, labels in GENRE_LABELS.items()
        ]
        self.fields['status'].choices = [
            (code, labels.get(lang, labels['uz'])) for code, labels in STATUS_LABELS.items()
        ]
        self.fields['title'].required = True
        self.fields['author'].required = False
        self.fields['cover'].required = False
