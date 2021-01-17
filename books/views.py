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

@login_required
def detail(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    reviews = book.book_reviews.all()
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


@login_required
def addReview(request):
    if request.method == "POST":
        form = ReviewForm(request.POST)
        if form.is_valid():
            critique = form.cleaned_data["critique"]
            # create a review and it to the DB
        # redirect to detail view
        return render(rreverse("books:detail"), {
                    "book": book,
                    "reviews": reviews
                })
    else:
        # cannot be here
        pass