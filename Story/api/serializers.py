
from django.contrib.auth.models import User
from .models import Profile, Category, Book


from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password 

#Serializer to Get User Details using Django Token Authentication
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "first_name", "last_name", "username", "email", "last_login"]


 
#Serializer to Register User
class RegisterSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)
  last_login = serializers.DateTimeField(read_only=True, required=False)
  class Meta:
    model = User
    fields = ('id', 'username', 'password', 'password2',
         'email', 'first_name', 'last_name', 'last_login')
    extra_kwargs = {
      'first_name': {'required': True},
      'last_name': {'required': True},
      'email': {'required': True},
    }

   

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})
    return attrs

  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name']
    )
    user.set_password(validated_data['password'])
    user.save()
    return user
  
  #Serializer to Update User Profile
class UserProfileSerializer(serializers.ModelSerializer):

    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.CharField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    last_login = serializers.ReadOnlyField(source='user.last_login')
    
    class Meta:
        model = Profile
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'last_login', 'profile_picture',  'birth_date', 'updated_at', 'phone_number', 'address']
    
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.save()
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.email = user_data.get('email', user.email)
        user.id = user_data.get('id', user.id)
        user.save()
        return instance
    

class BookSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    created_at = serializers.ReadOnlyField()

    class Meta:
        model = Book
        fields = ['id', 'user', 'title', 'author', 'category', 'description', 'book_cover_image', 'audio', 'content', 'created_at']
        read_only_fields = ['created_at']
      
    def create(self, validated_data):
        return Book.objects.create(**validated_data)