from rest_framework import serializers

from .models import Application, JobOffer


class JobOfferListSerializer(serializers.ModelSerializer):
    contract_type_display = serializers.CharField(source='get_contract_type_display', read_only=True)

    class Meta:
        model = JobOffer
        fields = [
            'id', 'title', 'slug', 'department', 'location',
            'contract_type', 'contract_type_display', 'deadline', 'created_at',
        ]


class JobOfferDetailSerializer(JobOfferListSerializer):
    class Meta(JobOfferListSerializer.Meta):
        fields = JobOfferListSerializer.Meta.fields + ['description', 'requirements']


class ApplicationSerializer(serializers.ModelSerializer):
    job_offer = serializers.SlugRelatedField(
        slug_field='slug',
        queryset=JobOffer.objects.filter(is_published=True),
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Application
        fields = ['job_offer', 'full_name', 'email', 'phone', 'message', 'cv']

    def validate_cv(self, value):
        if value and value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("Le CV ne doit pas dépasser 5 Mo.")
        return value


# ---------------------------------------------------------------------------
# Admin-facing serializers (used by the authenticated dashboard, not the
# public site) — full read/write access, including unpublished offers.
# ---------------------------------------------------------------------------

class JobOfferAdminSerializer(serializers.ModelSerializer):
    contract_type_display = serializers.CharField(source='get_contract_type_display', read_only=True)
    applications_count = serializers.IntegerField(source='applications.count', read_only=True)

    class Meta:
        model = JobOffer
        fields = [
            'id', 'title', 'slug', 'department', 'location',
            'contract_type', 'contract_type_display', 'description', 'requirements',
            'is_published', 'deadline', 'applications_count', 'created_at', 'updated_at',
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']


class ApplicationAdminSerializer(serializers.ModelSerializer):
    job_offer_title = serializers.CharField(source='job_offer.title', read_only=True, default=None)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id', 'job_offer', 'job_offer_title', 'full_name', 'email', 'phone',
            'message', 'cv', 'status', 'status_display', 'created_at',
        ]
        # Only the triage status is meant to be edited from the dashboard —
        # everything else came from the candidate's own submission.
        read_only_fields = [
            'job_offer', 'job_offer_title', 'full_name', 'email', 'phone',
            'message', 'cv', 'created_at',
        ]
