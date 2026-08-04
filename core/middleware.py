from core.translations import LANGUAGES, RTL_LANGS

VALID_LANG_CODES = {code for code, _ in LANGUAGES}


class LanguageThemeMiddleware:
    """Reads language/theme preference from the session (falls back to sane defaults)
    and stashes it on the request so views/templates don't each re-derive it."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        lang = request.session.get('lang', 'uz')
        if lang not in VALID_LANG_CODES:
            lang = 'uz'
        request.lang = lang
        request.text_dir = 'rtl' if lang in RTL_LANGS else 'ltr'
        request.theme = request.session.get('theme', 'light')
        return self.get_response(request)
