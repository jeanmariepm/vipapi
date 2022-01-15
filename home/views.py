from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse('Use vipveed.herokuapp.com to access')
