import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const ConsumptionTrends = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/consumption-trends/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Consumption Trends:', error);
      });
  }, []);

  const chartData = {
    labels: data ? data.map(item => item.year) : [],
    datasets: [
      {
        label: 'Total Consumption',
        data: data ? data.map(item => item.total_consumption) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
        text: 'Consumption Trends and Projections',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h1>Consumption Trends and Projections</h1>
      {data ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default ConsumptionTrends;
