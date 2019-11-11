from rest_framework import serializers

from ..models import *


class AnnotationSelectorSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = AnnotationSelector
        fields = ('type', 'conformsTo', 'value')

        read_only_fields = ('type', 'conformsTo')

    def validate(self, attrs):
        attrs['type'] = 'FragmentSelector'
        if 'xywh' in attrs['value']:
            attrs['conformsTo'] = AnnotationSelector.SPECIFICATIONS.media
        elif 'char'in attrs['value']:
            attrs['conformsTo'] = AnnotationSelector.SPECIFICATIONS.plain_text
        return super().validate(attrs)


class AnnotationTargetSerializer(serializers.HyperlinkedModelSerializer):

    selector = AnnotationSelectorSerializer(many=False)
    source = serializers.CharField(read_only=True,
                                   source='source.id')

    class Meta:
        model = AnnotationTarget
        fields = ('source', 'selector')


class AnnotationTargetCreateSerializer(serializers.HyperlinkedModelSerializer):

    selector = AnnotationSelectorSerializer(many=False)

    class Meta:
        model = AnnotationTarget
        fields = ('source', 'selector')


class AnnotationBodySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AnnotationTarget
        fields = ('type', 'purpose', 'value')

        read_only_fields = ('type',
                            'purpose')

    def validate(self, attrs):
        attrs['type'] = 'TextualBody'
        attrs['purpose'] = 'commenting'
        return super().validate(attrs)


class AnnotationSerializer(serializers.HyperlinkedModelSerializer):

    body = AnnotationBodySerializer()
    target = AnnotationTargetSerializer()
    creator = serializers.CharField(source='creator.username')

    class Meta:
        model = Annotation
        fields = ('id', 'context', 'type', 'motivation', 'creator', 'created', 'body', 'target')


class AnnotationCreateSerializer(serializers.HyperlinkedModelSerializer):

    body = AnnotationBodySerializer()
    target = AnnotationTargetCreateSerializer()

    class Meta:
        model = Annotation
        fields = ('id', 'context', 'type', 'motivation', 'creator', 'created', 'body', 'target')
        read_only_fields = ('id', 'context', 'type', 'motivation', 'creator', 'created')

    def validate(self, attrs):
        attrs['type'] = 'annotation'
        attrs['context'] = 'http://www.w3.org/ns/anno.jsonld'
        attrs['creator'] = self.context.get('request').user
        attrs['motivation'] = 'review'
