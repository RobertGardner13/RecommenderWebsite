import React, { useState } from 'react';
import { getCollaborativeRecommendations, getContentRecommendations } from '../services/recommendationService';
import { CollaborativeRecommendation, ContentRecommendation } from '../types/recommendationTypes';

const RecommendationForm: React.FC = () => {
  const [collaborativeRecommendations, setCollaborativeRecommendations] = useState<CollaborativeRecommendation[]>([]);
  const [contentRecommendations, setContentRecommendations] = useState<ContentRecommendation[]>([]);

  const handleGetRecommendations = async () => {
    try {
      // Get collaborative recommendations
      const collaborativeData = await getCollaborativeRecommendations();
      setCollaborativeRecommendations(collaborativeData);

      // Get content-based recommendations
      const contentData = await getContentRecommendations();
      setContentRecommendations(contentData);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <h1>Article Recommendation</h1>
      
      <div>
        <label>Select a User ID or Item ID:</label>
        <input type="text" />
      </div>

      <button onClick={handleGetRecommendations}>Get Recommendations</button>

      <div>
        <h2>Collaborative Recommendations</h2>
        <ul>
          {collaborativeRecommendations.map((item) => (
            <li key={item.id}>
              {item.recommendation_1} {/* Modify as per your need */}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Content-Based Recommendations</h2>
        <ul>
          {contentRecommendations.map((item) => (
            <li key={item.id}>
              {item.title} {/* Modify as per your need */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecommendationForm;
