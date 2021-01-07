from rest_framework.serializers import ModelSerializer, ReadOnlyField, SerializerMethodField
from .models import Pin, Board
from pinterest_clone.users.models import User

class UserSerializer(ModelSerializer):
    total_followers = ReadOnlyField()
    total_following = ReadOnlyField()
    display_name = ReadOnlyField()
    is_following = SerializerMethodField()
    class Meta:
        model = User
        fields = ["username", "avatar", "email", "name", "total_followers", "total_following", "display_name", "is_following"]

    def get_is_following(self, obj):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if obj.followers.filter(id=user.id).exists():
                return True

        return False

class PinSerializer(ModelSerializer):
    author = UserSerializer(required=False)
    class Meta:
        model = Pin
        fields = "__all__"

class BoardSerializer(ModelSerializer):
    total_pins = ReadOnlyField()
    pins = PinSerializer(many=True, required=False)
    class Meta:
        model = Board
        fields = "__all__"
