
from django.db import models
from django.contrib.auth.models import User
from django.utils.deconstruct import deconstructible
import os

# Model to store user profile
from django.contrib.auth.models import User

class FileGeneratorPath(object):
    def __init__(self, is_audio=False):
        self.is_audio = is_audio

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        audio_ext = ['mp3', 'wav', 'ogg']  # Define valid audio extensions

        if self.is_audio:
            # If the file is an audio file, save it in the audio folder
            path = f"account/{instance.user.id}/audio"
            name = f"{instance.title}.{ext}"
        else:
            # Otherwise, save it in the books or images folder based on the file type
            image_ext = ['jpg', 'jpeg', 'png', 'gif']
            if ext.lower() in image_ext:
                path = f"account/{instance.user.id}/images"
            else:
                path = f"account/{instance.user.id}/books"
            name = f"{instance.title}.{ext}"

        return os.path.join(path, name)
    

@deconstructible
class ProfileImagePathGenerator(object):
    def __init__(self):
        pass

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        path =  f"media/account/{instance.user.username}/profile_images/"
        name = f"profile_image.{ext}"
        return os.path.join(path, name)






class Profile(models.Model):
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=150, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    profile_picture = models.ImageField(upload_to=ProfileImagePathGenerator(), blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.name
    

class Book(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='books', default=1)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    description = models.TextField()
    content = models.FileField(upload_to=FileGeneratorPath(), blank=True, null=True)
    audio = models.FileField(upload_to=FileGeneratorPath(), blank=True, null=True)
    category = models.CharField(max_length=100)
    book_cover_image = models.ImageField(upload_to=FileGeneratorPath(), blank=True, null=True)
    created_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.title
    

class Category(models.Model):
    name = models.CharField(max_length=100)
    books = models.ManyToManyField(Book, related_name='categories')

    def __str__(self):
        return self.name