import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [collabData, setCollabData] = useState<Record<string, string[]>>({});
  const [contentData, setContentData] = useState<Record<string, string[]>>({});
  const [itemID, setItemID] = useState("");
  const [collabRecommendations, setCollabRecommendations] = useState<string[]>([]);
  const [contentRecommendations, setContentRecommendations] = useState<string[]>([]);
  const [allIDs, setAllIDs] = useState<string[]>([]);

  // Function to clean and extract valid IDs
  const extractIDs = (data: Record<string, string[]>) => {
    return Object.keys(data)
      .map((id) => id.trim()) // Remove spaces around IDs
      .filter((id) => id.length > 0); // Remove empty IDs
  };

  // Load collaborative filtering CSV (renamed file)
  useEffect(() => {
    fetch("/collaborative_article_recommendations.csv") // Updated CSV file name
      .then((response) => response.text())
      .then((data) => {
        const rows = data
          .trim()
          .split("\n")
          .map((row) => row.split(",").map((col) => col.trim())); // Trim all values

        const formattedData: Record<string, string[]> = {};
        rows.slice(1).forEach((row) => {
          formattedData[row[0]] = row.slice(1, 6); // Store first 5 recommendations
        });

        setCollabData(formattedData);
      })
      .catch((error) => console.error("Error loading collaborative CSV:", error));
  }, []);

  // Load content filtering CSV (renamed file)
  useEffect(() => {
    fetch("/article_recommendations.csv") // Updated CSV file name
      .then((response) => response.text())
      .then((data) => {
        const rows = data
          .trim()
          .split("\n")
          .map((row) => row.split(",").map((col) => col.trim())); // Trim all values

        const formattedData: Record<string, string[]> = {};
        rows.slice(1).forEach((row) => {
          formattedData[row[0]] = row.slice(1, 6); // Store first 5 recommendations
        });

        setContentData(formattedData);
      })
      .catch((error) => console.error("Error loading content CSV:", error));
  }, []);

  // Combine all unique IDs from both datasets
  useEffect(() => {
    const collabIDs = extractIDs(collabData);
    const contentIDs = extractIDs(contentData);
    const uniqueIDs = Array.from(new Set([...collabIDs, ...contentIDs])).sort();

    setAllIDs(uniqueIDs);

    if (uniqueIDs.length > 0) {
      setItemID(uniqueIDs[0]); // Set first ID as default
      handleSearch(uniqueIDs[0]); // Load recommendations immediately
    }
  }, [collabData, contentData]);

  // Handle item selection change
  const handleSearch = (selectedID: string) => {
    setItemID(selectedID);
    setCollabRecommendations(collabData[selectedID] || []);
    setContentRecommendations(contentData[selectedID] || []);
  };

  return (
    <div>
      <h1>Item Recommender</h1>
      <div>
        <label>Select an Item ID: </label>
        <select value={itemID} onChange={(e) => handleSearch(e.target.value)}>
          {allIDs.map((id, index) => (
            <option key={index} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>

      {collabRecommendations.length > 0 && (
        <div>
          <h2>Collaborative Recommendations</h2>
          <ul>
            {collabRecommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {contentRecommendations.length > 0 && (
        <div>
          <h2>Content-Based Recommendations</h2>
          <ul>
            {contentRecommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
