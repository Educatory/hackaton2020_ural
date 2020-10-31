from base.models import Municipality, Criteria
from core.forms import SimpleModelFormBase


class MunicipalityAdminForm(SimpleModelFormBase):
    form_id = 'municipality_form'

    def __init__(self, *args, **kwargs):
        self.form_title = kwargs.pop('form_title', None)

        super(MunicipalityAdminForm, self).__init__(*args, **kwargs)

    class Meta:
        model = Municipality
        fields = ('__all__')


class CriteriaAdminForm(SimpleModelFormBase):
    form_id = 'criteria_form'

    def __init__(self, *args, **kwargs):
        self.form_title = kwargs.pop('form_title', None)
        super(CriteriaAdminForm, self).__init__(*args, **kwargs)

    class Meta:
        model = Criteria
        fields = ('__all__')
