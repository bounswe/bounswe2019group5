import re
from rest_framework.schemas import openapi


class AutoSchema(openapi.AutoSchema):
    """
    Adds tags
    """

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

        # add tags for grouping
        operation['tags'] = [self.view.basename]

        return operation
