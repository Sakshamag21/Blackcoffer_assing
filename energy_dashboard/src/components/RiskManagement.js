import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const RiskManagement = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/risk-management/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Risk Management:', error);
      });
  }, []);

  const chartData = {
    labels: data ? data.map(item => item.impact) : [],
    datasets: [
      {
        label: 'Risk Count',
        data: data ? data.map(item => item.count) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  const options = {
    indexAxis: 'y', 
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
        text: 'Risk Management',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h1>Risk Management</h1>
      {data ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default RiskManagement;
