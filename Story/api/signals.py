from django.db.models.signals import pre_save, post_save
from .models import Profile
from django.dispatch import receiver
from django.contrib.auth.models import User


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    function that create the user profile
    when the user is creatd with some data
    """
    if created:
        Profile.objects.create(
            user=instance,
            email=instance.email,
            first_name=instance.first_name,
            last_name=instance.last_name,
        )
