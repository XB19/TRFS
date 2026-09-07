from django.db import migrations
from django.utils.text import slugify


OFFERS = [
    {
        'title': 'Chauffeur poids lourd',
        'department': 'Transport',
        'location': 'Lomé, Togo',
        'contract_type': 'cdi',
        'description': (
            "TRFS recrute un chauffeur poids lourd expérimenté pour renforcer "
            "son équipe de transport routier de marchandises au Togo et dans "
            "la sous-région."
        ),
        'requirements': (
            "Permis poids lourd valide, minimum 3 ans d'expérience, "
            "connaissance des normes de sécurité routière, disponibilité "
            "pour déplacements longue distance."
        ),
    },
    {
        'title': 'Responsable logistique',
        'department': 'Logistique',
        'location': 'Lomé, Togo',
        'contract_type': 'cdi',
        'description': (
            "Nous recherchons un(e) responsable logistique pour organiser "
            "et superviser les flux de marchandises, optimiser les tournées "
            "et coordonner les équipes de chauffeurs."
        ),
        'requirements': (
            "Bac+3 en logistique/transport, 5 ans d'expérience minimum, "
            "maîtrise des outils de gestion de flotte, sens de l'organisation."
        ),
    },
    {
        'title': 'Stage — Assistant(e) administratif(ve)',
        'department': 'Administration',
        'location': 'Lomé, Togo',
        'contract_type': 'stage',
        'description': (
            "Stage de 3 à 6 mois au sein de notre équipe administrative : "
            "gestion documentaire, suivi des commandes clients, support "
            "aux opérations quotidiennes."
        ),
        'requirements': (
            "Étudiant(e) en gestion, administration ou logistique, "
            "rigueur, bon relationnel, maîtrise des outils bureautiques."
        ),
    },
]


def seed_offers(apps, schema_editor):
    # Historical models from apps.get_model() don't carry the real model's
    # custom save() (which auto-slugs), so the slug is computed here instead.
    JobOffer = apps.get_model('careers', 'JobOffer')
    for data in OFFERS:
        if not JobOffer.objects.filter(title=data['title']).exists():
            JobOffer.objects.create(slug=slugify(data['title']), **data)


def remove_seed_offers(apps, schema_editor):
    JobOffer = apps.get_model('careers', 'JobOffer')
    JobOffer.objects.filter(title__in=[o['title'] for o in OFFERS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('careers', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_offers, remove_seed_offers),
    ]
