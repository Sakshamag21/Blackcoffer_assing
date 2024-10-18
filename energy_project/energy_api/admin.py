from django.contrib import admin
from .models import EnergyData

@admin.register(EnergyData)
class EnergyDataAdmin(admin.ModelAdmin):
    list_display = ('title', 'country', 'sector', 'published', 'intensity', 'likelihood')
    search_fields = ('title', 'country', 'sector', 'source')
    list_filter = ('sector', 'country', 'pestle', 'region')
    ordering = ('-published',)
    fieldsets = (
        (None, {
            'fields': ('title', 'sector', 'topic', 'insight')
        }),
        ('Details', {
            'fields': ('country', 'region', 'pestle', 'source')
        }),
        ('Metrics', {
            'fields': ('intensity', 'relevance', 'likelihood')
        }),
        ('Dates', {
            'fields': ('added', 'published')
        }),
        ('Additional Information', {
            'fields': ('end_year', 'start_year', 'impact', 'url')
        }),
    )
    readonly_fields = ('added', 'published')
    list_per_page = 25
