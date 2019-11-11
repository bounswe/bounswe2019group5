from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict

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
    source = serializers.CharField(source='source.id')

    class Meta:
        model = AnnotationTarget
        fields = ('source', 'selector')

    def get_fields(self):
        fields = super().get_fields()
        if self.context.get('view').action == 'create':
            fields['source'].source = None
        return fields

    def validate(self, attrs):
        attrs['source'] = Essay.objects.get(id=attrs['source'])
        return super().validate(attrs)


class AnnotationBodySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AnnotationBody
        fields = ('type', 'purpose', 'value')
        read_only_fields = ('type', 'purpose')

    def validate(self, attrs):
        attrs['type'] = 'TextualBody'
        attrs['purpose'] = 'commenting'
        return super().validate(attrs)


class AnnotationSerializer(serializers.HyperlinkedModelSerializer):

    body = AnnotationBodySerializer(many=False)
    target = AnnotationTargetSerializer(many=False)
    creator = serializers.CharField(read_only=True, source='creator.username')

    class Meta:
        model = Annotation
        fields = ('id', 'context', 'type', 'motivation', 'creator', 'created', 'body', 'target')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['@context'] = instance.context
        del data['context']
        return data


class AnnotationCreateSerializer(serializers.ModelSerializer):

    body = AnnotationBodySerializer()
    target = AnnotationTargetSerializer()
    creator = serializers.CharField(read_only=True, source='creator.username')

    class Meta:
        model = Annotation
        fields = ('id', 'context', 'type', 'motivation', 'creator', 'created', 'body', 'target')
        read_only_fields = ('id', 'context', 'type', 'motivation', 'creator', 'created')

    def validate(self, attrs):
        attrs['type'] = 'annotation'
        attrs['context'] = 'http://www.w3.org/ns/anno.jsonld'
        attrs['creator'] = self.context.get('request').user

        if attrs['creator'] == attrs['target']['source'].reviewer:
            attrs['motivation'] = 'review'
        else:
            attrs['motivation'] = 'revision'

        return super().validate(attrs)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        source = data['target']['source']
        data['target']['source'] = source[source.find("(")+1:source.find(")")]
        data['@context'] = instance.context
        del data['context']
        return data

    def create(self, validated_data):
        target_data = validated_data.pop('target')
        body_data = validated_data.pop('body')
        selector_data = target_data.pop('selector')

        instance: Annotation = super().create(validated_data)

        body_data['annotation'] = instance
        target_data['annotation'] = instance

        # Create Body
        AnnotationBody.objects.create(**body_data)

        # Create Target
        target_instance = AnnotationTarget.objects.create(**target_data)

        # Create selector
        selector_data['target'] = target_instance
        AnnotationSelector.objects.create(**selector_data)

        return instance
