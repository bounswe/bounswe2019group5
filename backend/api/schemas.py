import re
from rest_framework.schemas import openapi


class SchemaGenerator(openapi.SchemaGenerator):
    def get_paths(self, request=None):
        paths = super().get_paths(request)
        paths['/suggest/{id}/'].pop('put')
        return paths


class AutoSchema(openapi.AutoSchema):

    def _map_field(self, field):
        result = super()._map_field(field)
        if 'enum' in result:
            result['type'] = 'string' if isinstance(result['enum'][0], str) else 'integer'

        if 'correct_answer' == field.field_name:
            result = {
                'type': 'array',
                'items': {
                    'type': 'string'
                }
            }

        return result

    def _get_responses(self, path, method):
        s = super()._get_responses(path, method)
        if path == '/profile/':
            schema = s.get('200').get('content').get('application/json').get('schema')
            schema = schema.get('items')
            s.get('200').get('content').get('application/json')['schema'] = schema
        return s

    def get_operation(self, path, method):

        operation = super().get_operation(path, method)

        if 'suggest' in path:
            if method == 'PATCH':
                for i in list(operation['requestBody']['content']['application/json']['schema']['properties']):
                    if i != 'is_published':
                        operation['requestBody']['content']['application/json']['schema']['properties'].pop(i)

        # add tags for grouping
        operation['tags'] = [self.view.basename]

        return operation
