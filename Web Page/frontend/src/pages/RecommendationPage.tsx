import './RecommendationPage.css';
import React, { useState } from "react";

const RecommendationPage: React.FC = () => {
  const [id, setId] = useState("");
  const [recommendations, setRecommendations] = useState<{ 
    collaborative: number[], 
    content: number[], 
    azure: number[] 
  }>({ collaborative: [], content: [], azure: [] });

  const fetchRecommendations = async () => {
    if (!id) return;

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) throw new Error("Failed to fetch recommendations");
      
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold mb-4">News Article Recommender</h1>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter userID or itemID"
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={fetchRecommendations}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Get Recommendations
      </button>

      <div className="mt-6">
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
            <th style={{ padding: "10px" }} className="border border-gray-300">
            Collaborative Filtering
            </th>
            <th style={{ padding: "10px" }} className="border border-gray-300">
            Content-Based Filtering
            </th>
            <th style={{ padding: "10px" }} className="border border-gray-300">
            Azure ML Recommender
            </th>

            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {recommendations.collaborative[index] || "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {recommendations.content[index] || "-"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {recommendations.azure[index] || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecommendationPage;
