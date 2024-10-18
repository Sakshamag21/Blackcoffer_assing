import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const RegionalDynamics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/regional-dynamics/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Regional Dynamics:', error);
      });
  }, []);

  const chartData = {
    labels: data ? data.map(item => item.region) : [],
    datasets: [
      {
        label: 'Total Consumption',
        data: data ? data.map(item => item.total_consumption) : [],
        fill: false,
        backgroundColor: '#42A5F5',
        borderColor: '#42A5F5',
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
        text: 'Regional Dynamics',
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
      <h1>Regional Dynamics</h1>
      {data ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default RegionalDynamics;
