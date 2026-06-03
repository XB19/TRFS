from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

def index(request):
    return render(request, 'clients/index.html')

def about(request):
    return render(request, 'clients/about.html')

def services(request):
    return render(request, 'clients/services.html')

def contact(request):
    return render(request, 'clients/contact.html')

from django.contrib.auth.decorators import login_required



from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

def register_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        if password1 != password2:
            messages.error(request, "Les mots de passe ne correspondent pas")
            return redirect('register')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Nom d'utilisateur déjà utilisé")
            return redirect('register')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password1
        )
        user.save()

        messages.success(request, "Compte créé avec succès")
        return redirect('login')

    return render(request, 'clients/register.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            
            if user.is_staff:
                return redirect('admin_dashboard')
            else:
                return redirect('dashboard')

        else:
            messages.error(request, "Identifiants invalides")
            return redirect('login')

    return render(request, 'clients/login.html')

def logout_view(request):
    logout(request)
    return redirect('home')


@login_required
def dashboard(request):

    if request.user.is_staff:
        return redirect('admin_dashboard')

    return render(request, 'clients/dashboard.html')


from django.shortcuts import render, redirect
from .models import Commande
from django.contrib.auth.decorators import login_required

@login_required
def mes_commandes(request):
    commandes = Commande.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'clients/mes_commandes.html', {
        'commandes': commandes
    })


@login_required
def nouvelle_commande(request):
    if request.method == 'POST':
        reference = request.POST.get('reference')
        destination = request.POST.get('destination')
        description = request.POST.get('description')

        Commande.objects.create(
            user=request.user,
            reference=reference,
            destination=destination,
            description=description
        )

        return redirect('mes_commandes')

    return render(request, 'clients/nouvelle_commande.html')

from .models import Commande

def tracking(request):
    commande = None

    ref = request.GET.get('reference')

    if ref:
        try:
            commande = Commande.objects.get(reference=ref)
        except Commande.DoesNotExist:
            commande = None

    return render(request, 'clients/tracking.html', {
        'commande': commande
    })

from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib import messages

from .forms import UserUpdateForm, ProfileUpdateForm
from .models import Profile


@login_required
def profile(request):

    Profile.objects.get_or_create(user=request.user)

    edit_mode = request.GET.get('edit') == 'true'

    if request.method == 'POST':
        user_form = UserUpdateForm(request.POST, instance=request.user)
        profile_form = ProfileUpdateForm(
            request.POST,
            request.FILES,
            instance=request.user.profile
        )

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            return redirect('profile')  # retour mode affichage

    else:
        user_form = UserUpdateForm(instance=request.user)
        profile_form = ProfileUpdateForm(instance=request.user.profile)

    return render(request, 'clients/profile.html', {
        'user_form': user_form,
        'profile_form': profile_form,
        'edit_mode': edit_mode
    })




from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages

def admin_login(request):
    if request.user.is_authenticated and request.user.is_staff:
        return redirect('admin_dashboard')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None and user.is_staff:
            login(request, user)
            return redirect('admin_dashboard')
        else:
            messages.error(request, "Accès refusé")

        if not request.user.is_staff:
            return redirect('dashboard')

    return render(request, 'admin/login.html')


from django.contrib.auth.decorators import login_required, user_passes_test

def admin_required(view_func):
    decorated_view = login_required(
        user_passes_test(lambda u: u.is_staff)(view_func)
    )
    return decorated_view

@admin_required
def admin_dashboard(request):

    commandes = Commande.objects.all().order_by('-created_at')[:5]

    context = {
        'total_commandes': Commande.objects.count(),
        'en_attente': Commande.objects.filter(statut='en_attente').count(),
        'en_cours': Commande.objects.filter(statut='en_cours').count(),
        'livrees': Commande.objects.filter(statut='livree').count(),
        'commandes': commandes,
    }

    return render(request, 'admin/dashboard.html', context)

@admin_required
def admin_commandes(request):
    commandes = Commande.objects.all().order_by('-created_at')

    return render(request, 'admin/commandes.html', {
        'commandes': commandes
    })


@admin_required
def admin_users(request):
    users = User.objects.all()

    return render(request, 'admin/users.html', {
        'users': users
    })

@admin_required
def admin_tracking(request):
    commandes = Commande.objects.all()

    return render(request, 'admin/tracking.html', {
        'commandes': commandes
    })

from django.db.models import Count

@admin_required
def admin_stats(request):

    stats = Commande.objects.values('statut').annotate(total=Count('id'))

    return render(request, 'admin/stats.html', {
        'stats': stats
    })



from django.shortcuts import redirect
from django.contrib import messages
from .models import NewsletterSubscriber


def subscribe_newsletter(request):

    if request.method == "POST":

        email = request.POST.get("email")

        if NewsletterSubscriber.objects.filter(email=email).exists():

            messages.warning(
                request,
                "Cet email est déjà inscrit à la newsletter."
            )

        else:

            NewsletterSubscriber.objects.create(email=email)

            messages.success(
                request,
                "Merci pour votre inscription à notre newsletter."
            )

    return redirect('home')



from django.shortcuts import render, redirect
from django.contrib import messages

from .models import ContactMessage


def contact(request):

    if request.method == "POST":

        nom = request.POST.get("nom")
        email = request.POST.get("email")
        sujet = request.POST.get("sujet")
        message_text = request.POST.get("message")

        # ENREGISTREMENT

        ContactMessage.objects.create(
            nom=nom,
            email=email,
            sujet=sujet,
            message=message_text
        )

        # MESSAGE SUCCESS

        messages.success(
            request,
            "Votre message a été envoyé avec succès."
        )

        return redirect('contact')

    return render(
        request,
        'clients/contact.html'
    )



def bon_plan(request):
    return render(request, 'clients/bon_plan.html')




from .models import NewsletterSubscriber

@admin_required
def admin_newsletters(request):

    subscribers = NewsletterSubscriber.objects.all().order_by('-id')

    return render(request, 'admin/newsletters.html', {
        'subscribers': subscribers
    })


from .models import ContactMessage

@admin_required
def admin_contacts(request):

    messages_list = ContactMessage.objects.all().order_by('-id')

    return render(request, 'admin/contacts.html', {
        'messages': messages_list
    })