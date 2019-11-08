from django.urls import path
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r'profile', ProfileView, basename='user')
router.register(r'login', LoginView, basename='user'),
router.register(r'register', RegisterView, basename='user'),
router.register(r'result', ResultView, basename='exercise'),
router.register(r'message', MessageView, basename='message'),
router.register(r'search', SearchView, basename='exercise'),


urlpatterns = [



    path('docs/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='docs'),

    path('redocs/', TemplateView.as_view(
        template_name='redoc.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='redocs'),

    path('openapi/', get_schema_view(
        title="Bonibon",
        description="Bonibon API Schema",
        public=True
    ), name='openapi-schema'),

    *router.urls

]
