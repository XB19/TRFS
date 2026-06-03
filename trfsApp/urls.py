from django.urls import path
from . import views


urlpatterns = [

    # CLIENT
    path('', views.index, name='home'),
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('contact/', views.contact, name='contact'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),

    path('dashboard/', views.dashboard, name='dashboard'),
    path('mes-commandes/', views.mes_commandes, name='mes_commandes'),
    path('nouvelle-commande/', views.nouvelle_commande, name='nouvelle_commande'),
    path('tracking/', views.tracking, name='tracking'),
    path('profile/', views.profile, name='profile'),
    path('bon-plan/', views.bon_plan, name='bon_plan'),
    path('newsletter/subscribe/', views.subscribe_newsletter, name='subscribe_newsletter'),
    path('contact/', views.contact, name='contact'),

    # ADMIN CUSTOM
    path('admin-panel/', views.admin_login, name='admin_login'),
    path('admin-panel/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('admin-panel/commandes/', views.admin_commandes, name='admin_commandes'),
    path('admin-panel/users/', views.admin_users, name='admin_users'),
    path('admin-panel/tracking/', views.admin_tracking, name='admin_tracking'),
    path('admin-panel/stats/', views.admin_stats, name='admin_stats'),
    path('admin-panel/newsletters/', views.admin_newsletters, name='admin_newsletters'),
    path('admin-panel/contacts/', views.admin_contacts, name='admin_contacts'),

]