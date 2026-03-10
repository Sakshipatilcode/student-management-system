from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [

path('admin/',admin.site.urls),

path('api/register/',views.register_user),
path('api/login/',views.login_user),
path('api/logout/',views.logout_user),

path('api/students/',views.student_list),
path('api/students/<int:id>/',views.delete_student),
path('api/students/update/<int:id>/',views.update_student),

]