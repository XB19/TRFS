from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

admin.site.site_header = 'TRFS — Administration'
admin.site.site_title = 'TRFS Admin'
admin.site.index_title = 'Gestion du site'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/careers/', include('careers.urls')),
]

# Served directly by Django (not gated behind DEBUG): this admin only needs
# to view/download the occasional CV upload, not serve heavy public traffic.
# For a higher-traffic deployment, move media serving to nginx or S3 instead.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
