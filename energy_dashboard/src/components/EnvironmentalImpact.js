import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import './EnvironmentalImpact.css'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const EnvironmentalImpact = () => {
  const [data, setData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/environmental-impact/')
      .then(response => {
        setData(response.data);
        const countries = response.data.map(item => item.country);
        const uniqueCountries = Array.from(new Set(countries));
        setAllCountries(uniqueCountries);
        setSelectedCountries(uniqueCountries); 
      })
      .catch(error => {
        console.error('Error fetching Environmental Impact:', error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCountries(prev => [...prev, value]);
    } else {
      setSelectedCountries(prev => prev.filter(country => country !== value));
    }
  };

  const filteredData = data.filter(item => selectedCountries.includes(item.country));

  const chartData = {
    labels: filteredData.map(item => item.country),
    datasets: [
      {
        label: 'Total Intensity',
        data: filteredData.map(item => item.total_intensity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',    
          'rgba(54, 162, 235, 0.6)',    
          'rgba(255, 206, 86, 0.6)',    
          'rgba(75, 192, 192, 0.6)',    
          'rgba(153, 102, 255, 0.6)',   
          'rgba(255, 159, 64, 0.6)',   
          'rgba(201, 203, 207, 0.6)'     
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',      
          'rgba(54, 162, 235, 1)',      
          'rgba(255, 206, 86, 1)',     
          'rgba(75, 192, 192, 1)',     
          'rgba(153, 102, 255, 1)',    
          'rgba(255, 159, 64, 1)',      
          'rgba(201, 203, 207, 1)'       
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF' 
        }
      },
      title: {
        display: true,
        text: 'Environmental Impact per Country',
        color: '#FFFFFF' 
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}`;
          }
        },
        titleColor: '#FFFFFF', 
        bodyColor: '#E0E0E0'   
      }
    },
  };

  return (
    <div className="chart-container">
      <h1>Environmental Impact</h1>

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
        <Pie data={chartData} options={options} />
      ) : (
        <p>No data available for the selected filters.</p>
      )}
    </div>
  );
};

export default EnvironmentalImpact;
