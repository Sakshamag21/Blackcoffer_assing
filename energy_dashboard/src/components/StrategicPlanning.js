import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const StrategicPlanning = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/strategic-planning/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Strategic Planning:', error);
      });
  }, []);

  const chartData = {
    labels: data ? data.map(item => item.projection_year) : [],
    datasets: [
      {
        label: 'Projected Consumption',
        data: data ? data.map(item => item.projected_consumption) : [],
        fill: false,
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
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
        text: 'Strategic Planning and Forecasting',
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
      <h1>Strategic Planning and Forecasting</h1>
      {data ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default StrategicPlanning;
