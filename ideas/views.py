from django import forms
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import Idea, Comment

class ReviewForm(forms.Form):
    remark = forms.Field(widget=forms.Textarea(attrs={'rows':4, 'cols':75}), label="Your Comment")

class IdeaForm(forms.Form):
    title = forms.CharField(label="Your Idea")
    description = forms.Field(widget=forms.Textarea(attrs={'rows':4, 'cols':75}),label="Long Description")

# Create your views here.
def index(request):
    if request.method == "POST":
        form = IdeaForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data["title"]
            description = form.cleaned_data["description"]

            idea = Idea(title = title, description=description,
                        posted_by= request.user
                        )
            idea.save()
    
    form = IdeaForm()
    ideas = Idea.objects.all()

    return render(request, "ideas/index.html", {
        "ideas": ideas,
        "form": form
    })

def detail(request, idea_id):
    idea = get_object_or_404(Idea, id=idea_id)
    if request.method == "POST":
        form = ReviewForm(request.POST)
        if form.is_valid():
            remark = form.cleaned_data["remark"]
            comment = Comment(idea = idea, 
                        commented_by = request.user, 
                        remark = remark)
            comment.save()

    form = ReviewForm()
    comments = idea.idea_comments.all()
    return render(request, "ideas/detail.html", {
        "idea": idea,
        "comments": comments,
        "form": form
    })


