from django import forms
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import Book

class NewBookForm(forms.Form):
    book = forms.CharField(label="New book")
    # priority = forms.IntegerField(label="Priority", min_value=1, max_value=5)

# Create your views here.
def index(request):
    books = Book.objects.all()
    return render(request, "books/index.html", {
        "books": books
    })

@login_required
def detail(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, "books/detail.html", {
        "book": book
    })


@login_required
def add(request):
    if request.method == "POST":
        form = NewBookForm(request.POST)
        if form.is_valid():
            book = form.cleaned_data["book"]
            request.session["books"] += [book]
            return HttpResponseRedirect(reverse("books:index"))
        else:
            return render(request, "books/add.html", {
                "form": form
            })
    else:
        return render(request, "books/add.html", {
            "form": NewBookForm()
        })
