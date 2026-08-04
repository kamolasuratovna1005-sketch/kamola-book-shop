from core.translations import LANGUAGES, T


def i18n_theme(request):
    lang = getattr(request, 'lang', 'uz')
    return {
        'T': T(lang),
        'CUR_LANG': lang,
        'LANGUAGES': LANGUAGES,
        'TEXT_DIR': getattr(request, 'text_dir', 'ltr'),
        'THEME': getattr(request, 'theme', 'light'),
    }
