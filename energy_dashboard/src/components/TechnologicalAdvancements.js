import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TechnologicalAdvancements.css'; 

const TechnologicalAdvancements = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(10); 
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' }); 

  useEffect(() => {
    axios.get('http://localhost:8000/api/technological-advancements/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Technological Advancements:', error);
      });
  }, []);

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleSort = () => {
    let direction = 'ascending';
    if (sortConfig.key === 'impact_score' && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: 'impact_score', direction });
    setCurrentPage(1); 
  };

  const getSortIndicator = () => {
    if (sortConfig.key === 'impact_score') {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return '';
  };

  return (
    <div className="table-container">
      <h1>Technological Advancements Insights</h1>
      <table className="tech-table">
        <thead>
          <tr>
            <th>Insight</th>
            <th onClick={handleSort} className="sortable">
              Impact Score {getSortIndicator()}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.insight}</td>
                <td>{item.impact_score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No data available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &laquo; Previous
          </button>

          

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default TechnologicalAdvancements;
