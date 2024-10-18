from rest_framework import serializers
from .models import EnergyData


class EnergyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnergyData
        fields = '__all__'


class ConsumptionTrendsSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    total_consumption = serializers.IntegerField()

class EconomicImpactSerializer(serializers.Serializer):
    country = serializers.CharField()
    total_intensity = serializers.IntegerField()
    average_relevance = serializers.FloatField()
    total_likelihood = serializers.IntegerField()

class EnvironmentalImpactSerializer(serializers.Serializer):
    country = serializers.CharField()
    total_intensity = serializers.IntegerField()
    average_likelihood = serializers.FloatField()

class PolicyFactorsSerializer(serializers.Serializer):
    pestle = serializers.CharField()
    count = serializers.IntegerField()

class TechnologicalAdvancementsSerializer(serializers.Serializer):
    insight = serializers.CharField()
    impact_score = serializers.FloatField()

class RegionalDynamicsSerializer(serializers.Serializer):
    region = serializers.CharField()
    total_consumption = serializers.IntegerField()

class MarketDynamicsSerializer(serializers.Serializer):
    sector = serializers.CharField()
    total_relevance = serializers.IntegerField()
    average_likelihood = serializers.FloatField()

class StrategicPlanningSerializer(serializers.Serializer):
    projection_year = serializers.IntegerField()
    projected_consumption = serializers.IntegerField()

class PESTLEAnalysisSerializer(serializers.Serializer):
    pestle = serializers.CharField()
    count = serializers.IntegerField()

class InvestmentInsightsSerializer(serializers.Serializer):
    sector = serializers.CharField()
    total_intensity = serializers.IntegerField()
    average_relevance = serializers.FloatField()

class SocialImpactSerializer(serializers.Serializer):
    country = serializers.CharField()
    total_likelihood = serializers.IntegerField()

class RiskManagementSerializer(serializers.Serializer):
    impact = serializers.CharField()
    count = serializers.IntegerField()
