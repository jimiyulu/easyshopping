from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.show_index, name='show_index'),
    url(r'^user_register/$', views.user_register, name='user_register'),
    url(r'^women.html', views.show_women, name='show_women'),
    url(r'^women_photos_list/$', views.show_photos_list, name='women_photos_list'),
    url(r'^checkout.html',views.checkout, name = 'checkout'),
    url(r'^map.html',views.show_map, name='show_map'),
    url(r'^details.html',views.show_detail, name='show_detail'),
    url(r'^reconmendation.html',views.show_recommend, name='show_recommend'),
]