from django.http import HttpResponseRedirect
from django.views.decorators.http import require_POST

from core.middleware import VALID_LANG_CODES


@require_POST
def set_language(request):
    lang = request.POST.get('lang', 'uz')
    if lang in VALID_LANG_CODES:
        request.session['lang'] = lang
    next_url = request.POST.get('next') or '/'
    return HttpResponseRedirect(next_url)


@require_POST
def toggle_theme(request):
    current = request.session.get('theme', 'light')
    request.session['theme'] = 'dark' if current == 'light' else 'light'
    next_url = request.POST.get('next') or '/'
    return HttpResponseRedirect(next_url)
