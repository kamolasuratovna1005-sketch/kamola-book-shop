from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST

from core.translations import GENRE_LABELS, STATUS_LABELS, get_dict
from library.forms import BookForm
from library.models import Book


def _build_context(request):
    lang = request.lang
    books = Book.objects.all()

    genre_filter = request.GET.get('genre', '')
    status_filter = request.GET.get('status', '')
    if genre_filter:
        books = books.filter(genre=genre_filter)
    if status_filter:
        books = books.filter(status=status_filter)

    query = request.GET.get('q', '').strip()
    result = None
    if query:
        q_norm = query.lower()
        match = None
        for b in Book.objects.all():
            name = b.title.lower()
            if name == q_norm or q_norm in name or name in q_norm:
                match = b
                break
        d = get_dict(lang)
        if match:
            result = {'found': True, 'text': d['found_text'], 'sub': d['found_sub'](match.title, match.author)}
        else:
            result = {'found': False, 'text': d['missing_text'], 'sub': d['missing_sub']}

    d = get_dict(lang)
    return {
        'books': books,
        'form': BookForm(lang=lang),
        'genre_filter': genre_filter,
        'status_filter': status_filter,
        'genre_options': [(code, l.get(lang, l['uz'])) for code, l in GENRE_LABELS.items()],
        'status_options': [(code, l.get(lang, l['uz'])) for code, l in STATUS_LABELS.items()],
        'query': query,
        'result': result,
        'count_label': d['count'](books.count()),
    }


def dashboard(request):
    return render(request, 'library/dashboard.html', _build_context(request))


@require_POST
def add_book(request):
    lang = request.lang
    form = BookForm(request.POST, request.FILES, lang=lang)
    if form.is_valid():
        form.save()
        return redirect('library:dashboard')
    context = _build_context(request)
    context['form'] = form
    return render(request, 'library/dashboard.html', context)


@require_POST
def delete_book(request, pk):
    book = get_object_or_404(Book, pk=pk)
    book.delete()
    return redirect('library:dashboard')
