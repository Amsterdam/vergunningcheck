from django.apps import AppConfig


class ChappieConfig(AppConfig):
    name = "chappie"

    def ready(self):
        import chappie.signals  # noqa
