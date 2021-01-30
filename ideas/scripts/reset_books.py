from ideas.models import idea

def run():
    ideas = Ideas.objects.all()
    ideas.delete()
