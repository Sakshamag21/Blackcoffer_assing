import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './SocialImpact.css'; 
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

const SocialImpact = () => {
  const [data, setData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/social-impact/')
      .then((response) => {
        setData(response.data);
        const countries = response.data.map((item) => item.country);
        const uniqueCountries = Array.from(new Set(countries));
        setAllCountries(uniqueCountries);
        setSelectedCountries(uniqueCountries); 
      })
      .catch((error) => {
        console.error('Error fetching Social Impact:', error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCountries((prev) => [...prev, value]);
    } else {
      setSelectedCountries((prev) => prev.filter((country) => country !== value));
    }
  };

  const filteredData = data.filter((item) => selectedCountries.includes(item.country));

  const chartData = {
    labels: filteredData.map((item) => item.country),
    datasets: [
      {
        label: 'Total Likelihood',
        data: filteredData.map((item) => item.total_likelihood),
        backgroundColor: 'rgba(255, 99, 132, 0.6)', 
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
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
        text: 'Social and Community Impact',
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
      y: {
        beginAtZero: true,
        ticks: {
          color: '#E0E0E0', 
        },
        title: {
          display: true,
          text: 'Total Likelihood',
          color: '#FFFFFF',
        },
      },
      x: {
        ticks: {
          color: '#E0E0E0', 
        },
        title: {
          display: true,
          text: 'Country',
          color: '#FFFFFF', 
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h1>Social and Community Impact</h1>

      <div className="filter-container">
        <span>Filter by Country:</span>
        <div className="checkbox-group">
          {allCountries.map((country, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                value={country}
                checked={selectedCountries.includes(country)}
                onChange={handleCheckboxChange}
              />
              {country}
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

export default SocialImpact;
