from django import forms


class SimpleModelFormBase(forms.ModelForm):
    form_id = 'simple_form'
    form_class = ''
    form_method = 'post'
    form_action = ''
    form_title = ''
    enctype = 'multipart/form-data'

    def get_id(self):
        return self.form_id

    def get_class(self):
        return self.form_class

    def get_action(self):
        return self.form_action

    def get_method(self):
        return self.form_method

    def get_enctype(self):
        return self.enctype

    def get_title(self):
        return self.form_title

    class Meta:
        model = None
        fields = []