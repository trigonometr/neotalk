"""neotalk URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from bookmarks.views import BookmarkViewSet, RemoveBookmark
from rates.views import RateViewSet, RemoveRate
from posts.views import BookmarkedPostViewSet, PostViewSet, SearchPostViewSet
from replies.views import ReplyViewSet
from .views import UserViewSet, GetUserID
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = routers.DefaultRouter()
router.register('bookmarks', BookmarkViewSet, basename='bookmarks')
router.register('posts', PostViewSet, basename='posts')
router.register('replies', ReplyViewSet, basename='replies')
router.register('rates', RateViewSet, basename='rates')
router.register('users', UserViewSet, basename='users')
router.register('bookmarked_posts', BookmarkedPostViewSet,
                basename='bookmarked_posts')
router.register('search', SearchPostViewSet, basename='search')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify', TokenVerifyView.as_view(), name='toke_verify'),
    path('api/remove_bookmark/', RemoveBookmark.as_view(), name='destroy_bookmark'),
    path('api/remove_rate/', RemoveRate.as_view(), name='remove_rate'),
    path('api/get_user_id/',
         GetUserID.as_view({'get': 'list'}), name='get_user_id'),
    path('api/', include(router.urls)),
]
