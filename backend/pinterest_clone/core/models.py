from django.db.models import Model, ImageField, CharField, TextField, URLField, ForeignKey, ManyToManyField, CASCADE, FileField
from pinterest_clone.users.models import User
from pinterest_clone.utils.mixins import TimeStampMixin

class Pin(TimeStampMixin, Model):
    image = ImageField(upload_to='pins')
    title = CharField(max_length=100)
    description = TextField()
    link = URLField(blank=True, null=True)
    author = ForeignKey(User, on_delete=CASCADE, blank=True, related_name="pins")

class Board(TimeStampMixin, Model):
    name = CharField(max_length=100)
    description = TextField(blank=True, null=True)
    cover = FileField(upload_to='board_covers', blank=True)
    author = ForeignKey(User, on_delete=CASCADE, blank=True, related_name="boards")
    pins = ManyToManyField(Pin, blank=True, related_name='boards')

    @property
    def total_pins(self):
        return self.pins.all().count()
