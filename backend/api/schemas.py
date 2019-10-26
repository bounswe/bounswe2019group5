import re
from rest_framework.schemas import openapi


class AutoSchema(openapi.AutoSchema):
    """
    Adds tags
    """

    def get_operation(self, path, method):
        operation = super().get_operation(path, method)

        # add tags for grouping
        operation['tags'] = [self.view.basename]

        return operation
