from django.urls import path
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view

from . import views

urlpatterns = [
    path('login', views.LoginView.as_view(), name='login'),
    path('register', views.RegisterView.as_view(), name='register'),
    path('login/guest', views.GuestView.as_view(), name='guest'),
    path('proficiency', views.ProficiencyView.as_view(), name='prof'),
    path('profile', views.ProfileView.as_view(), name='profile'),


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
    ), name='openapi-schema')


]
