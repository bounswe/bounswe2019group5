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
        return result

    def get_operation(self, path, method):
        operation = super().get_operation(path, method)

        # add tags for grouping
        operation['tags'] = [self.view.basename]



        return operation
