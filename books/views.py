from django import forms
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import Book, Review

class ReviewForm(forms.Form):
    comment = forms.CharField(label="Your Review")

# Create your views here.
def index(request):
    books = Book.objects.all()
    return render(request, "books/index.html", {
        "books": books
    })

def detail(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if request.method == "POST":
        form = ReviewForm(request.POST)
        if form.is_valid():
            comment = form.cleaned_data["comment"]
            review = Review(book = book, 
                        critic = request.user, 
                        comment = comment)
            review.save()
    else:
        form = ReviewForm()

    reviews = book.book_reviews.all()
    return render(request, "books/detail.html", {
        "book": book,
        "reviews": reviews,
        "form": form
    })


