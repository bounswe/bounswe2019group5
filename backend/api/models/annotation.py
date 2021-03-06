from django.db import models

from .exercise import Essay
from .user import User


class Annotation(models.Model):

    motivation = [
        ('review', 'review'),
        ('revision', 'revision')
    ]

    context = models.URLField()

    type = models.CharField(max_length=len('annotations'))

    motivation = models.CharField(max_length=8,
                                  choices=motivation)

    creator = models.ForeignKey(User,
                                on_delete=models.CASCADE,
                                related_name='creator')

    created = models.DateTimeField(auto_now_add=True)


class AnnotationBody(models.Model):
    purposes = [
        ('commenting', 'commenting')
    ]

    type = models.CharField(max_length=len('TextualBody'))

    purpose = models.CharField(max_length=len('commenting'),
                               choices=purposes)

    value = models.CharField(max_length=1000)

    annotation = models.OneToOneField(Annotation,
                                      on_delete=models.CASCADE,
                                      related_name='body')


class AnnotationTarget(models.Model):
    annotation = models.OneToOneField(Annotation,
                                      on_delete=models.CASCADE,
                                      related_name='target')
    source = models.ForeignKey(Essay,
                               on_delete=models.CASCADE,
                               related_name='target_essay')


class AnnotationSelector(models.Model):

    class SPECIFICATIONS(object):
        plain_text = 'http://tools.ietf.org/rfc/rfc5147'
        media = 'http://www.w3.org/TR/media-frags/'

        @classmethod
        def to_set(cls):
            return [
                (cls.plain_text, cls.plain_text),
                (cls.media, cls.media)
            ]

    type = models.CharField(max_length=len('FragmentSelector'))
    conformsTo = models.CharField(max_length=1000,
                                  choices=SPECIFICATIONS.to_set())
    value = models.CharField(max_length=1000)
    target = models.OneToOneField(AnnotationTarget,
                                  on_delete=models.CASCADE,
                                  related_name='selector')
