import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './MarketDynamics.css'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MarketDynamics = () => {
  const [data, setData] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [allSectors, setAllSectors] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/market-dynamics/')
      .then((response) => {
        setData(response.data);
        const sectors = response.data.map((item) => item.sector);
        const uniqueSectors = Array.from(new Set(sectors));
        setAllSectors(uniqueSectors);
        setSelectedSectors(uniqueSectors); 
      })
      .catch((error) => {
        console.error('Error fetching Market Dynamics:', error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSectors((prev) => [...prev, value]);
    } else {
      setSelectedSectors((prev) => prev.filter((sector) => sector !== value));
    }
  };

  const filteredData = data.filter((item) => selectedSectors.includes(item.sector));

  const chartData = {
    labels: filteredData.map((item) => item.sector),
    datasets: [
      {
        label: 'Total Relevance',
        data: filteredData.map((item) => item.total_relevance),
        backgroundColor: 'rgba(255, 159, 64, 0.6)', 
      },
      {
        label: 'Average Likelihood',
        data: filteredData.map((item) => item.average_likelihood),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF', 
        },
      },
      title: {
        display: true,
        text: 'Market Dynamics',
        color: '#FFFFFF', 
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}`;
          },
        },
        titleColor: '#FFFFFF', 
        bodyColor: '#E0E0E0', 
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#E0E0E0', 
        },
        title: {
          display: true,
          text: 'Sector',
          color: '#FFFFFF', 
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: '#E0E0E0', 
        },
        title: {
          display: true,
          text: 'Value',
          color: '#FFFFFF', 
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h1>Market Dynamics</h1>

      <div className="filter-container">
        <span>Filter by Sector:</span>
        <div className="checkbox-group">
          {allSectors.map((sector, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                value={sector}
                checked={selectedSectors.includes(sector)}
                onChange={handleCheckboxChange}
              />
              {sector}
            </label>
          ))}
        </div>
      </div>

      {filteredData.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>No data available for the selected filters.</p>
      )}
    </div>
  );
};

export default MarketDynamics;
