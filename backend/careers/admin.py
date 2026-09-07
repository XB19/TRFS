from django.contrib import admin
from django.utils.html import format_html

from .models import Application, JobOffer


@admin.register(JobOffer)
class JobOfferAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'department', 'location', 'contract_type',
        'is_published', 'deadline', 'applications_count', 'created_at',
    )
    list_filter = ('is_published', 'contract_type', 'department')
    search_fields = ('title', 'description', 'department', 'location')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'

    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'department', 'location', 'contract_type')
        }),
        ('Contenu de l\'offre', {
            'fields': ('description', 'requirements')
        }),
        ('Publication', {
            'fields': ('is_published', 'deadline')
        }),
    )

    @admin.display(description='Candidatures')
    def applications_count(self, obj):
        return obj.applications.count()


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        'full_name', 'email', 'target_offer', 'status', 'cv_link', 'created_at',
    )
    list_filter = ('status', 'job_offer')
    search_fields = ('full_name', 'email', 'phone')
    date_hierarchy = 'created_at'

    # Les candidatures arrivent depuis le site public : seul le statut de
    # traitement est modifiable depuis l'admin, le reste vient du candidat.
    readonly_fields = ('job_offer', 'full_name', 'email', 'phone', 'message', 'cv_preview', 'created_at')

    fieldsets = (
        ('Candidat', {
            'fields': ('full_name', 'email', 'phone', 'job_offer')
        }),
        ('Candidature', {
            'fields': ('message', 'cv_preview', 'created_at')
        }),
        ('Traitement', {
            'fields': ('status',)
        }),
    )

    @admin.display(description='Offre visée')
    def target_offer(self, obj):
        return obj.job_offer.title if obj.job_offer else 'Candidature spontanée'

    @admin.display(description='CV')
    def cv_link(self, obj):
        if obj.cv:
            return format_html('<a href="{}" target="_blank">Voir le CV</a>', obj.cv.url)
        return '—'

    @admin.display(description='CV joint')
    def cv_preview(self, obj):
        return self.cv_link(obj)
