from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.files.base import File
from django.core.management.base import BaseCommand
from pinterest_clone.core.models import Pin, Board

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        # Users
        profile_pics_filepaths = settings.ROOT_DIR.glob("seeds/profile_pics/*")
        users = []
        for index, profile_pics_filepath in enumerate(profile_pics_filepaths):
            with open(profile_pics_filepath, "rb") as f:
                image = File(f, name=f"{profile_pics_filepath.name}")
                user = User.objects.create(name=f"User {index}", username=f"user_{index}", email=f"user{index}@example.com", avatar=image)
            user.set_password("12345")
            user.save()
            users.append(user)

        user = User.objects.create(name="User No Image", username="user_ni", email="userni@example.com")
        user.set_password("12345")
        user.save()
        users.append(user)

        # Boards
        for user in users:
            print(f"Seeding for {user}:")
            furniture_board = Board.objects.create(name="Furniture", description="Description", author=user)
            people_board = Board.objects.create(name="People", description="Description", author=user)
            places_board = Board.objects.create(name="Places", description="Description", author=user)

            # Pins
            furniture_filenames = settings.ROOT_DIR.glob("seeds/furniture/*")
            people_filenames = settings.ROOT_DIR.glob("seeds/people/*")
            places_filenames = settings.ROOT_DIR.glob("seeds/places/*")

            print("`-- Seeding furniture pins: ", end="")
            for index, furniture_filename in enumerate(furniture_filenames):
                with open(furniture_filename, "rb") as f:
                    image = File(f, name=f"{furniture_filename.name}")
                    pin = Pin.objects.create(title=f"Furniture {index}",
                                       description=f"Description {index}",
                                       link=f"https://link{index}.com",
                                       image=image,
                                       author=user)
                    furniture_board.pins.add(pin)
                    furniture_board.save()
                    print(".", end="")
            print()

            print("`-- Seeding people pins: ", end="")
            for index, people_filename in enumerate(people_filenames):
                with open(people_filename, "rb") as f:
                    image = File(f, name=f"{people_filename.name}")
                    pin = Pin.objects.create(title=f"People {index}",
                                       description=f"Description {index}",
                                       link=f"https://link{index}.com",
                                       image=image,
                                       author=user)
                    people_board.pins.add(pin)
                    people_board.save()
                    print(".", end="")
            print()

            print("`-- Seeding places pins: ", end="")
            for index, places_filename in enumerate(places_filenames):
                with open(places_filename, "rb") as f:
                    image = File(f, name=f"{places_filename.name}")
                    pin = Pin.objects.create(title=f"Places {index}",
                                       description=f"Description {index}",
                                       link=f"https://link{index}.com",
                                       image=image,
                                       author=user)
                    places_board.pins.add(pin)
                    places_board.save()
                    print(".", end="")
            print()
