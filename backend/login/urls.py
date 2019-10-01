from django.urls import path
from . import views


app_name = 'login'
urlpatterns = [
    path('login', views.LoginView.as_view(), name='index'),
    path('register', views.RegisterView.as_view(), name='index'),
    path('login/guest', views.GuestView.as_view(), name='index'),
    
]