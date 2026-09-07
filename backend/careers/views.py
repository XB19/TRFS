from django.contrib.auth import authenticate
from rest_framework import generics, permissions, serializers, status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Application, JobOffer
from .serializers import (
    ApplicationAdminSerializer,
    ApplicationSerializer,
    JobOfferAdminSerializer,
    JobOfferDetailSerializer,
    JobOfferListSerializer,
)


# ---------------------------------------------------------------------------
# Public endpoints — consumed by the showcase site, no auth required.
# ---------------------------------------------------------------------------

class JobOfferListView(generics.ListAPIView):
    serializer_class = JobOfferListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return JobOffer.objects.filter(is_published=True)


class JobOfferDetailView(generics.RetrieveAPIView):
    serializer_class = JobOfferDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return JobOffer.objects.filter(is_published=True)


class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]


# ---------------------------------------------------------------------------
# Auth — issues a DRF token for the admin dashboard.
# ---------------------------------------------------------------------------

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            request,
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password'],
        )

        if user is None:
            return Response(
                {'detail': 'Identifiants incorrects.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.is_staff:
            return Response(
                {'detail': "Ce compte n'a pas accès au tableau de bord."},
                status=status.HTTP_403_FORBIDDEN,
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'is_superuser': user.is_superuser,
        })


class MeView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return Response({
            'username': request.user.username,
            'is_superuser': request.user.is_superuser,
        })


# ---------------------------------------------------------------------------
# Admin endpoints — the dashboard's own data source. Staff-only.
# ---------------------------------------------------------------------------

class JobOfferAdminViewSet(viewsets.ModelViewSet):
    queryset = JobOffer.objects.all()
    serializer_class = JobOfferAdminSerializer
    permission_classes = [permissions.IsAdminUser]


class ApplicationAdminViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.select_related('job_offer').all()
    serializer_class = ApplicationAdminSerializer
    permission_classes = [permissions.IsAdminUser]
    http_method_names = ['get', 'patch', 'delete', 'head', 'options']


class StatsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        offers = JobOffer.objects.all()
        applications = Application.objects.all()

        return Response({
            'offers_total': offers.count(),
            'offers_published': offers.filter(is_published=True).count(),
            'applications_total': applications.count(),
            'applications_by_status': {
                choice_value: applications.filter(status=choice_value).count()
                for choice_value, _ in Application.STATUS_CHOICES
            },
        })
