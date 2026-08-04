from django import template

register = template.Library()


@register.filter
def genre_label(book, lang):
    return book.genre_label(lang)


@register.filter
def status_label(book, lang):
    return book.status_label(lang)
