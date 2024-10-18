import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PolarArea } from 'react-chartjs-2';
import './PESTLEAnalysis.css'; 

const PESTLEAnalysis = () => {
  const [data, setData] = useState([]);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All'); 

  useEffect(() => {
    axios.get('http://localhost:8000/api/pestle-analysis/')
      .then(response => {
        setData(response.data);
        setSelectedFactors(response.data.map(item => item.pestle)); 
      })
      .catch(error => {
        console.error('Error fetching PESTLE Analysis:', error);
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

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  let filteredData = data.filter(item => selectedFactors.includes(item.pestle));

  if (filterCategory !== 'All') {
    filteredData = filteredData.filter(item => item.category === filterCategory);
  }

  const chartData = {
    labels: filteredData.map(item => item.pestle),
    datasets: [
      {
        label: 'PESTLE Factors',
        data: filteredData.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',    
          'rgba(54, 162, 235, 0.6)',    
          'rgba(255, 206, 86, 0.6)',    
          'rgba(75, 192, 192, 0.6)',    
          'rgba(153, 102, 255, 0.6)',   
          'rgba(255, 159, 64, 0.6)'     
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF' 
        }
      },
      title: {
        display: true,
        text: 'PESTLE Analysis',
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
        bodyColor: '#E0E0E0',
      }
    },
    scales: {
      r: {
        ticks: {
          color: '#E0E0E0', 
        },
        grid: {
          color: '#424242' 
        },
        angleLines: {
          color: '#424242' 
        },
        pointLabels: {
          color: '#FFFFFF' 
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h1>PESTLE Analysis</h1>

      <div className="filter-container">
        <span>Filter by Factor:</span>
        <div className="checkbox-group">
          {data.map((item, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                value={item.pestle}
                checked={selectedFactors.includes(item.pestle)}
                onChange={handleCheckboxChange}
              />
              {item.pestle}
            </label>
          ))}
        </div>
      </div>

      {filteredData.length > 0 ? <PolarArea data={chartData} options={options} /> : <p>No data available.</p>}
    </div>
  );
};

export default PESTLEAnalysis;
