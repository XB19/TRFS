from django.db import models
from django.utils.text import slugify


class JobOffer(models.Model):

    CONTRACT_CHOICES = [
        ('cdi', 'CDI'),
        ('cdd', 'CDD'),
        ('stage', 'Stage'),
        ('alternance', 'Alternance'),
        ('interim', 'Intérim'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)

    department = models.CharField(
        max_length=120,
        blank=True,
        help_text="Ex : Transport, Logistique, Administration"
    )

    location = models.CharField(max_length=150, default='Lomé, Togo')

    contract_type = models.CharField(
        max_length=20,
        choices=CONTRACT_CHOICES,
        default='cdi',
    )

    description = models.TextField()

    requirements = models.TextField(
        blank=True,
        help_text="Profil recherché, compétences, expérience..."
    )

    is_published = models.BooleanField(
        default=True,
        help_text="Décochez pour retirer l'offre du site sans la supprimer."
    )

    deadline = models.DateField(
        null=True,
        blank=True,
        help_text="Date limite de candidature (optionnel)."
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)[:200]
            slug = base_slug
            i = 2
            while JobOffer.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{i}"
                i += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Application(models.Model):

    STATUS_CHOICES = [
        ('recue', 'Reçue'),
        ('en_cours', "En cours d'examen"),
        ('retenue', 'Retenue'),
        ('refusee', 'Refusée'),
    ]

    job_offer = models.ForeignKey(
        JobOffer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='applications',
        help_text="Laisser vide pour une candidature spontanée.",
    )

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)

    message = models.TextField(
        blank=True,
        help_text="Lettre de motivation / message du candidat."
    )

    cv = models.FileField(upload_to='cv/%Y/%m/', blank=True, null=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='recue',
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        target = self.job_offer.title if self.job_offer else 'Candidature spontanée'
        return f"{self.full_name} — {target}"
