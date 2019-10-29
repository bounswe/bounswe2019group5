from django.urls import path
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r'profile', ProfileView, basename='profile')
router.register(r'proficiency', ProficiencyView, basename='proficiency'),
router.register(r'login', LoginView, basename='login'),
router.register(r'register', RegisterView, basename='register'),
router.register(r'exercise', ExerciseView, basename='exercise'),

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
    ), name='openapi-schema'),

    *router.urls

]
