from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

admin_router = DefaultRouter()
admin_router.register('offers', views.JobOfferAdminViewSet, basename='admin-offer')
admin_router.register('applications', views.ApplicationAdminViewSet, basename='admin-application')

urlpatterns = [
    # Public
    path('offers/', views.JobOfferListView.as_view(), name='job-offer-list'),
    path('offers/<slug:slug>/', views.JobOfferDetailView.as_view(), name='job-offer-detail'),
    path('applications/', views.ApplicationCreateView.as_view(), name='application-create'),

    # Auth
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/me/', views.MeView.as_view(), name='me'),

    # Admin dashboard (staff-only, token auth)
    path('admin/stats/', views.StatsView.as_view(), name='admin-stats'),
    path('admin/', include(admin_router.urls)),
]
