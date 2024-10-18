from rest_framework import generics
from .models import EnergyData
from .serializers import EnergyDataSerializer

class EnergyDataListCreateView(generics.ListCreateAPIView):
    queryset = EnergyData.objects.all()
    serializer_class = EnergyDataSerializer

class EnergyDataRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EnergyData.objects.all()
    serializer_class = EnergyDataSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    ConsumptionTrendsSerializer,
    EconomicImpactSerializer,
    EnvironmentalImpactSerializer,
    PolicyFactorsSerializer,
    TechnologicalAdvancementsSerializer,
    RegionalDynamicsSerializer,
    MarketDynamicsSerializer,
    StrategicPlanningSerializer,
    PESTLEAnalysisSerializer,
    InvestmentInsightsSerializer,
    SocialImpactSerializer,
    RiskManagementSerializer,
)
from django.db.models import Sum, Avg, Count
from django.db.models.functions import ExtractYear
import datetime

class ConsumptionTrendsView(APIView):
    def get(self, request):
        trends = (
            EnergyData.objects
            .annotate(year=ExtractYear('published'))
            .values('year')
            .annotate(total_consumption=Sum('intensity'))
            .order_by('year')
        )
        serializer = ConsumptionTrendsSerializer(trends, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EconomicImpactView(APIView):
    def get(self, request):
        impact = (
            EnergyData.objects
            .values('country')
            .annotate(
                total_intensity=Sum('intensity'),
                average_relevance=Avg('relevance'),
                total_likelihood=Sum('likelihood')
            )
            .order_by('-total_intensity')
        )
        serializer = EconomicImpactSerializer(impact, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EnvironmentalImpactView(APIView):
    def get(self, request):
        impact = (
            EnergyData.objects
            .values('country')
            .annotate(
                total_intensity=Sum('intensity'),
                average_likelihood=Avg('likelihood')
            )
            .order_by('-total_intensity')
        )
        serializer = EnvironmentalImpactSerializer(impact, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PolicyFactorsView(APIView):
    def get(self, request):
        policies = (
            EnergyData.objects
            .values('pestle')
            .annotate(count=Count('id'))
            .order_by('-count')
        )
        serializer = PolicyFactorsSerializer(policies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TechnologicalAdvancementsView(APIView):
    def get(self, request):
        advancements = (
            EnergyData.objects
            .values('insight')
            .annotate(impact_score=Avg('intensity'))
            .order_by('-impact_score')
        )
        serializer = TechnologicalAdvancementsSerializer(advancements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RegionalDynamicsView(APIView):
    def get(self, request):
        regions = (
            EnergyData.objects
            .values('region')
            .annotate(total_consumption=Sum('intensity'))
            .order_by('-total_consumption')
        )
        serializer = RegionalDynamicsSerializer(regions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MarketDynamicsView(APIView):
    def get(self, request):
        market = (
            EnergyData.objects
            .values('sector')
            .annotate(
                total_relevance=Sum('relevance'),
                average_likelihood=Avg('likelihood')
            )
            .order_by('-total_relevance')
        )
        serializer = MarketDynamicsSerializer(market, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class StrategicPlanningView(APIView):
    def get(self, request):
        current_year = datetime.datetime.now().year
        projections = (
            EnergyData.objects
            .filter(published__year__gte=current_year)
            .annotate(projection_year=ExtractYear('published'))
            .values('projection_year')
            .annotate(projected_consumption=Sum('intensity'))
            .order_by('projection_year')
        )
        serializer = StrategicPlanningSerializer(projections, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PESTLEAnalysisView(APIView):
    def get(self, request):
        pestle_factors = (
            EnergyData.objects
            .values('pestle')
            .annotate(count=Count('id'))
            .order_by('-count')
        )
        serializer = PESTLEAnalysisSerializer(pestle_factors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class InvestmentInsightsView(APIView):
    def get(self, request):
        investments = (
            EnergyData.objects
            .values('sector')
            .annotate(
                total_intensity=Sum('intensity'),
                average_relevance=Avg('relevance')
            )
            .order_by('-total_intensity')
        )
        serializer = InvestmentInsightsSerializer(investments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SocialImpactView(APIView):
    def get(self, request):
        social = (
            EnergyData.objects
            .values('country')
            .annotate(total_likelihood=Sum('likelihood'))
            .order_by('-total_likelihood')
        )
        serializer = SocialImpactSerializer(social, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RiskManagementView(APIView):
    def get(self, request):
        risks = (
            EnergyData.objects
            .values('impact')
            .annotate(count=Count('id'))
            .order_by('-count')
        )
        serializer = RiskManagementSerializer(risks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
