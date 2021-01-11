from django import forms
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

class NewBookForm(forms.Form):
    book = forms.CharField(label="New book")
    # priority = forms.IntegerField(label="Priority", min_value=1, max_value=5)

# Create your views here.
def index(request):
    if "books" not in request.session:
        request.session["books"] = []
    return render(request, "books/index.html", {
        "books": request.session["books"]
    })

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
