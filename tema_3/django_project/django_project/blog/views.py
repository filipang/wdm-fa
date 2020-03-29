from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView
)
from .models import Post, Comment


def home(request):
    context = {
        'posts': Post.objects.all()
    }
    return render(request, 'blog/home.html', context)


class PostListView(ListView):
    model = Post
    template_name = 'blog/home.html'  # <app>/<model>_<viewtype>.html
    context_object_name = 'posts'
    ordering = ['-date_posted']
    paginate_by = 5


class UserPostListView(ListView):
    model = Post
    template_name = 'blog/user_posts.html'  # <app>/<model>_<viewtype>.html
    context_object_name = 'posts'
    paginate_by = 5

    def get_queryset(self):
        user = get_object_or_404(User, username=self.kwargs.get('username'))
        return Post.objects.filter(author=user).order_by('-date_posted')


class PostDetailView(DetailView):
    model = Post
    def get_number_of_comments(self):
        thispost = get_object_or_404(Post, id=self.kwargs.get('pk'))
        return Comment.objects.filter(post=thispost).count()


class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = ['title', 'content']
    labels = {
            'title': 'titlu',
            'content': 'conținut'
    }

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)


class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title', 'content']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)


class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    success_url = '/'

class CommentDetailView(DetailView):
    model = Comment

class PostCommentListView(ListView):
    model = Comment
    template_name = 'blog/post_comments.html'  # <app>/<model>_<viewtype>.html
    context_object_name = 'comments'
    paginate_by = 5

    def get_queryset(self):
        thispost = get_object_or_404(Post, id=self.kwargs.get('pk'))
        return Comment.objects.filter(post=thispost).order_by('-date_posted')

class CommentCreateView(LoginRequiredMixin, CreateView):
    model = Comment
    fields = ['content']
    labels = {
            'content': 'conținut',
    }
    def form_valid(self, form):
        form.instance.author = self.request.user
        form.instance.post = Post.objects.get(pk=self.kwargs.get('pk'))
        return super().form_valid(form)


def about(request):
    return render(request, 'blog/about.html', {'title': 'About'})