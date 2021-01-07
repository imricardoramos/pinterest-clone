from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer, ReadOnlyField, SerializerMethodField
from pinterest_clone.core.serializers import BoardSerializer, PinSerializer

User = get_user_model()


class UserSerializer(ModelSerializer):
    boards = BoardSerializer(many=True)
    pins = PinSerializer(many=True)
    total_followers = ReadOnlyField()
    total_following = ReadOnlyField()
    display_name = ReadOnlyField()
    is_following = SerializerMethodField()
    class Meta:
        model = User
        fields = ["username", "avatar", "email", "name", "boards", "total_followers", "total_following", "display_name", "is_following", "pins"]

    def get_is_following(self, obj):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if obj.followers.filter(id=user.id).exists():
                return True

        return False

class UserSerializerWithFollowing(UserSerializer):
    following = UserSerializer(many=True)
    class Meta:
        model = User
        fields = ["username", "avatar", "email", "name", "boards", "total_followers", "total_following", "following", "display_name"]

