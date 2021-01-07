from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .serializers import UserSerializer, UserSerializerWithFollowing

User = get_user_model()


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "username"

    # def get_queryset(self, *args, **kwargs):
    #     return self.queryset.filter(id=self.request.user.id)

    @action(detail=False, methods=["GET"])
    def me(self, request):
        serializer = UserSerializerWithFollowing(request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    @action(detail=True, methods=["POST"])
    def follow(self, request, *args, **kwargs):
        user_to_follow = self.get_object()
        user_to_follow.followers.add(request.user)
        user_to_follow.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=["POST"])
    def unfollow(self, request, *args, **kwargs):
        user_to_unfollow = self.get_object()
        user_to_unfollow.followers.remove(request.user)
        user_to_unfollow.save()
        return Response(status=status.HTTP_200_OK)
