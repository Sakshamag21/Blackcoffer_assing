import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const InvestmentInsights = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null); 

  useEffect(() => {
    axios.get('http://localhost:8000/api/investment-insights/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Investment Insights:', error);
      });
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const chartData = {
    labels: data ? data.map(item => item.sector) : [],
    datasets: [
      {
        label: 'Average Relevance',
        data: data ? data.map(item => item.average_relevance) : [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Total Intensity',
        data: data ? data.map(item => item.total_intensity) : [],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', 
      },
      title: {
        display: true,
        text: 'Investment and Financial Insights',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Sector',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h1>Investment and Financial Insights</h1>
      {data ? <Bar ref={chartRef} data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default InvestmentInsights;
