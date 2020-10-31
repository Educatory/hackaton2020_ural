from base.models import Municipality
from core.forms import SimpleModelFormBase


class MunicipalityAdminForm(SimpleModelFormBase):
    form_id = 'event_form'

    def __init__(self, *args, **kwargs):
        self.form_title = kwargs.pop('form_title', None)

        super(MunicipalityAdminForm, self).__init__(*args, **kwargs)

    class Meta:
        model = Municipality
        fields = ('__all__')
