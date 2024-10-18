from django.urls import path
from .views import (
    EnergyDataListCreateView,
    EnergyDataRetrieveUpdateDestroyView,
    ConsumptionTrendsView,
    EconomicImpactView,
    EnvironmentalImpactView,
    PolicyFactorsView,
    TechnologicalAdvancementsView,
    RegionalDynamicsView,
    MarketDynamicsView,
    StrategicPlanningView,
    PESTLEAnalysisView,
    InvestmentInsightsView,
    SocialImpactView,
    RiskManagementView,
)

urlpatterns = [
    path('energy-data/', EnergyDataListCreateView.as_view(), name='energy-data-list-create'),
    path('energy-data/<int:pk>/', EnergyDataRetrieveUpdateDestroyView.as_view(), name='energy-data-detail'),
    path('consumption-trends/', ConsumptionTrendsView.as_view(), name='consumption-trends'),
    path('economic-impact/', EconomicImpactView.as_view(), name='economic-impact'),
    path('environmental-impact/', EnvironmentalImpactView.as_view(), name='environmental-impact'),
    path('policy-factors/', PolicyFactorsView.as_view(), name='policy-factors'),
    path('technological-advancements/', TechnologicalAdvancementsView.as_view(), name='technological-advancements'),
    path('regional-dynamics/', RegionalDynamicsView.as_view(), name='regional-dynamics'),
    path('market-dynamics/', MarketDynamicsView.as_view(), name='market-dynamics'),
    path('strategic-planning/', StrategicPlanningView.as_view(), name='strategic-planning'),
    path('pestle-analysis/', PESTLEAnalysisView.as_view(), name='pestle-analysis'),
    path('investment-insights/', InvestmentInsightsView.as_view(), name='investment-insights'),
    path('social-impact/', SocialImpactView.as_view(), name='social-impact'),
    path('risk-management/', RiskManagementView.as_view(), name='risk-management'),
]
