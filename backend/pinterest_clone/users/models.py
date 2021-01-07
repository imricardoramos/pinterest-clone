from django.contrib.auth.models import AbstractUser
from django.db.models import CharField, ImageField, ManyToManyField
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Default user for Pinterest Clone."""

    #: First and last name do not cover name patterns around the globe
    name = CharField(_("Name of User"), blank=True, max_length=255)
    avatar = ImageField(upload_to='avatars', blank=True)
    followers = ManyToManyField("User", related_name="following")

    @property
    def total_followers(self):
        return self.followers.all().count()

    @property
    def total_following(self):
        return self.following.all().count()

    @property
    def display_name(self):
        if self.name:
            return self.name
        return self.username

    def get_absolute_url(self):
        """Get url for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"username": self.username})
