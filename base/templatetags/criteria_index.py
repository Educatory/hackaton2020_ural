from django.template.defaulttags import register
import random
import decimal

from base.models import MunicipalityCriteria


@register.simple_tag(takes_context=True)
def criteria_index(context, municipality, criteria):

    mc = MunicipalityCriteria.objects.filter(municipality=municipality, criteria=criteria)
    if mc.exists():
        sum_index = 0
        for count, item in enumerate(mc):
            sum_index += item.dataset_result
        index = sum_index/len(mc)
    else:
        index = float(decimal.Decimal(random.randrange(356, 589))/100)
    return index
