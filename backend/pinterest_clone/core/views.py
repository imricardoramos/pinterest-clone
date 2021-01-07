from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from .models import Pin, Board
from .serializers import PinSerializer, BoardSerializer
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

class PinViewSet(ModelViewSet):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['author__username', 'author__followers__username', 'boards']
    ordering_fields = ['created_at']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=False, methods=['get'])
    def following(self, request, pk=None):
        following_users = request.user.following.all()
        queryset = self.get_queryset().filter(author__in=following_users)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class BoardViewSet(ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    filterset_fields = ['author__username']
    ordering_fields = ['created_at']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def add_pin(self, request, pk=None):
        board = self.get_object()
        board.pins.add(request.data["id"])
        serializer = self.get_serializer(board)
        return Response(serializer.data)

class CheckAuth(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response("true", 200)
        else:
            return Response("false", 401)
