from django.apps import AppConfig


class TrfsappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'trfsApp'

    def ready(self):
        import trfsApp.signals