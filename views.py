from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['POST'])
def register_user(request):

    username=request.data.get("username")
    password=request.data.get("password")

    if User.objects.filter(username=username).exists():
        return Response({"error":"Username already exists"})

    User.objects.create(
        username=username,
        password=make_password(password)
    )

    return Response({"message":"User created"})


@csrf_exempt
@api_view(['POST'])
def login_user(request):

    username=request.data.get("username")
    password=request.data.get("password")

    user=authenticate(username=username,password=password)

    if user:
        login(request,user)
        return Response({"message":"Login successful"})

    return Response({"error":"Invalid credentials"})


@csrf_exempt
@api_view(['POST'])
def logout_user(request):

    logout(request)
    return Response({"message":"Logged out"})


@api_view(['GET','POST'])
def student_list(request):

    if request.method=='GET':

        students=Student.objects.all()
        serializer=StudentSerializer(students,many=True)

        return Response(serializer.data)


    if request.method=='POST':

        serializer=StudentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)



@api_view(['DELETE'])
def delete_student(request,id):

    student=Student.objects.get(id=id)
    student.delete()

    return Response({"message":"Deleted"})


@api_view(['PUT'])
def update_student(request,id):

    student=Student.objects.get(id=id)

    serializer=StudentSerializer(student,data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)