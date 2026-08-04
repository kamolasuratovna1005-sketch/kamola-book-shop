from django.contrib import admin

from library.models import Book


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'genre', 'status', 'created_at')
    list_filter = ('genre', 'status')
    search_fields = ('title', 'author')
