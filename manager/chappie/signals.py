import requests
from django.conf import settings
from django.db.models.signals import pre_save
from django.dispatch import receiver

from .models import IMTRConfig, Permit


@receiver(pre_save, sender=Permit)
def pre_save_permit(sender, instance, *args, **kwargs):
    # Fetch imtr config from FloLegal
    flo_legal_id = instance.flo_legal_id
    headers = {"x-api-key": settings.STTR_BUILDER_API_KEY}
    data = {
        "activiteitId": flo_legal_id,
    }
    req = requests.post(
        f"{settings.STTR_BUILDER_API_HOST}/api/v2/conclusie/sttr/",
        headers=headers,
        data=data,
    )
    req.raise_for_status()

    if req.status_code == 200:
        doc = req.json()
        imtr_config = IMTRConfig(version=doc["version"], blob=req.text)
        imtr_config.save()

        # Create new entry in imtrConfig table
        if instance.imtr_config == None:
            instance.imtr_config = imtr_config

        return instance
