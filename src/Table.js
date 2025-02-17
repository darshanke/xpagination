import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [originalData, setOriginalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfRow = 10;
  const [loading, setLoading] = useState(true); 

  const talbedata = async () => {
    try {
      const response = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      setOriginalData(response.data);
    } catch (e) {
      setLoading(false);
      alert("failed to fetch data");
      console.log("failed to fetch data", e.message);
    }
  
  };

  useEffect(() => {
    const loader = async () => {
      await talbedata();
    };
    loader();
  }, []);

  const startIndex = (currentPage - 1) * numberOfRow;
  const endIndex = startIndex + numberOfRow;
  const sliceData = originalData?.slice(startIndex, endIndex);
  //   console.log(sliceData);

  const totalPages = Math.ceil(originalData.length / numberOfRow);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div style={{ fontFamily: "Ubuntu" }}>
      <h1 style={{ margin: "1rem" }}>Employee Data Table</h1>
      <table
        style={{
          width: "100%",
          border: "1px 0px 1px 0px",
          borderBottom: "2px solid #04AA6D",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{ backgroundColor: "#04AA6D", color: "white", height: "50px" }}
        >
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        {sliceData && sliceData.length > 0 ? (
          <tbody>
            {sliceData.map((item) => (
              <tr style={{ height: "50px" }} key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr style={{height: '300px'}}>
              <td colSpan="4" style={{ textAlign: "center" }}>
              failed to fetch data
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          margin: "1rem",
        }}
      >
        <button
          onClick={handlePrevious}
          style={{
            marginRight: "20px",
            backgroundColor: "#04AA6D",
            color: "#FFFFFF",
            borderStyle: "none",
            borderRadius: "2px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <button
          style={{
            backgroundColor: "#04AA6D",
            color: "#FFFFFF",
            borderStyle: "none",
            borderRadius: "2px",
            height: "30px",
            width: "30px",
          }}
        >
          {currentPage}
        </button>
        <button
          onClick={handleNext}
          style={{
            marginLeft: "20px",
            backgroundColor: "#04AA6D",
            color: "#FFFFFF",
            borderRadius: "2px",
            borderStyle: "none",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
