from django.db import models

# Create your models here.
import uuid
from django.db import models
from django.contrib.auth.models import User


class Commande(models.Model):

    STATUT_CHOICES = [
        ('en_attente', 'En attente'),
        ('validee', 'Validée'),
        ('en_cours', 'En cours'),
        ('livree', 'Livrée'),
    ]

    TYPE_MARCHANDISE = [
        ('colis', 'Colis'),
        ('document', 'Document'),
        ('fragile', 'Fragile'),
        ('industriel', 'Industriel'),
        ('autre', 'Autre'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='commandes'
    )

    reference = models.CharField(
        max_length=100,
        unique=True,
        blank=True
    )

    type_marchandise = models.CharField(
        max_length=20,
        choices=TYPE_MARCHANDISE,
        null=True,
        blank=True
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    poids_kg = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True
    )

    volume_m3 = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True
    )

    lieu_depart = models.CharField(
        max_length=150,
        null=True,
        blank=True
    )

    destination = models.CharField(
        max_length=150,
        null=True,
        blank=True
    )

    date_expedition = models.DateField(
        null=True,
        blank=True
    )

    estimation_cout = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    statut = models.CharField(
        max_length=20,
        choices=STATUT_CHOICES,
        default='en_attente'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):
        if not self.reference:
            self.reference = f"TRFS-{uuid.uuid4().hex[:10].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.reference
    



from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.user.username
    

from django.db import models

class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    




class ContactMessage(models.Model):

    nom = models.CharField(max_length=150)

    email = models.EmailField()

    sujet = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom