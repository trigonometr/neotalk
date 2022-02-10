from django.db.models import Count, F, Q


def add_likes_to_replies(replies):
    return replies.annotate(likes=Count('rated_reply', filter=Q(rated_reply__type__exact=True)))


def add_dislikes_to_replies(replies):
    return replies.annotate(dislikes=Count('rated_reply', filter=Q(rated_reply__type__exact=False)))


def add_rate_to_replies(replies):
    liked_replies = add_likes_to_replies(replies)
    q = add_dislikes_to_replies(liked_replies)
    return q.annotate(rate=F('likes') - F('dislikes'))


def add_likes_to_posts(posts):
    return posts.annotate(likes=Count('bookmarked_post'))
