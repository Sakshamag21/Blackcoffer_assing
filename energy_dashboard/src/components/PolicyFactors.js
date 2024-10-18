// src/components/PolicyFactors.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import './PolicyFactors.css'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PolicyFactors = () => {
  const [data, setData] = useState([]);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [allFactors, setAllFactors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/policy-factors/')
      .then(response => {
        setData(response.data);
        const factors = response.data.map(item => item.pestle);
        const uniqueFactors = Array.from(new Set(factors));
        setAllFactors(uniqueFactors);
        setSelectedFactors(uniqueFactors); 
      })
      .catch(error => {
        console.error('Error fetching Policy Factors:', error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFactors(prev => [...prev, value]);
    } else {
      setSelectedFactors(prev => prev.filter(factor => factor !== value));
    }
  };

  const filteredData = data.filter(item => selectedFactors.includes(item.pestle));

  const chartData = {
    labels: filteredData.map(item => item.pestle),
    datasets: [
      {
        label: 'Policy Factors',
        data: filteredData.map(item => item.count),
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
        text: 'Policy and Regulatory Factors',
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
      <h1>Policy and Regulatory Factors</h1>

      <div className="filter-container">
        <span>Filter by Policy Factor:</span>
        <div className="checkbox-group">
          {allFactors.map((factor, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                value={factor}
                checked={selectedFactors.includes(factor)}
                onChange={handleCheckboxChange}
              />
              {factor}
            </label>
          ))}
        </div>
      </div>

      {filteredData.length > 0 ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <p>No data available for the selected filters.</p>
      )}
    </div>
  );
};

export default PolicyFactors;
