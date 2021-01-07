from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views import defaults as default_views
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from pinterest_clone.core.views import PinViewSet, BoardViewSet, CheckAuth
from pinterest_clone.users.views import UserViewSet

urlpatterns = [
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # Your stuff: custom urls includes go here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

router = DefaultRouter()
router.register('pin', PinViewSet)
router.register('board', BoardViewSet)
router.register('user', UserViewSet)
# API URLS
urlpatterns += [
    # API base url
    path("", include(router.urls)),
    # DRF auth token
    path("auth-token/", obtain_auth_token),
    path("check-auth/", CheckAuth.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))
]
