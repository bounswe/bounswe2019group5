from django.urls import path
from . import views


app_name = 'login'
urlpatterns = [
    path('login', views.LoginView.as_view(), name='login'),
    path('register', views.RegisterView.as_view(), name='register'),
    path('login/guest', views.GuestView.as_view(), name='guest'),
    path('proficiency', views.ProficiencyView.as_view(), name='prof'),
]
