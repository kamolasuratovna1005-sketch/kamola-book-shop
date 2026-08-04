"""
Django settings for kutubxona_loyiha project.
"""

import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

# SECURITY WARNING: keep the secret key used in production secret!
# Lokalda ishlashda pastdagi standart qiymat ishlatiladi; Render'da
# SECRET_KEY muhit o'zgaruvchisi orqali avtomatik generatsiya qilinadi.
SECRET_KEY = os.environ.get(
    'SECRET_KEY',
    'django-insecure-*#7bw82#d1en#%b5uhw3ze8l%4yctq5)^5qvq^haxhu(ppz2+g',
)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = os.environ.get(
    'ALLOWED_HOSTS', '127.0.0.1,localhost,10.247.138.125'
).split(',')

CSRF_TRUSTED_ORIGINS = [
    origin for origin in os.environ.get('CSRF_TRUSTED_ORIGINS', '').split(',') if origin
]


# Application definition
# Eslatma: bu sayt qasddan login/parolsiz - shaxsiy, bir foydalanuvchilik
# kutubxona sifatida ishlaydi. /admin/ panelining o'zi Django'ning standart
# hisob tizimidan foydalanadi (createsuperuser bilan yaratiladi).

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'library',
    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'core.middleware.LanguageThemeMiddleware',
]

ROOT_URLCONF = 'kutubxona_loyiha.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'core.context_processors.i18n_theme',
            ],
        },
    },
]

WSGI_APPLICATION = 'kutubxona_loyiha.wsgi.application'


# Database
# Render'da DATABASE_URL (Postgres) muhit o'zgaruvchisi mavjud bo'ladi va u
# ma'lumotlarni doimiy saqlaydi. Lokalda esa oddiy db.sqlite3 ishlatiladi.

import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    )
}


# Password validation (faqat Django admin uchun ishlatiladi)

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# Internationalization
# NOTE: bu loyihada Django'ning o'zining gettext-asoslangan i18n tizimi o'rniga
# core/translations.py dagi lug'at-asoslangan sodda tarjima tizimi ishlatiladi
# (gettext uchun tizimda alohida kompilyatsiya vositasi kerak bo'lmasin uchun).

LANGUAGE_CODE = 'uz'
TIME_ZONE = 'Asia/Tashkent'
USE_I18N = True
USE_TZ = True


# Static & media files

STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'
STORAGES = {
    'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'},
    'staticfiles': {'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage'},
}

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
