import { CollaborativeRecommendation, ContentRecommendation } from '../types/recommendationTypes';

const baseUrl = 'http://localhost:5000'; // Adjust this if your backend runs on a different URL/port

// Fetch collaborative recommendations
export const getCollaborativeRecommendations = async (): Promise<CollaborativeRecommendation[]> => {
  try {
    const response = await fetch(`${baseUrl}/RecommendationWebsite/collaborative-data`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch collaborative recommendations');
    }

    const data: CollaborativeRecommendation[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching collaborative recommendations:', error);
    throw error;
  }
};

// Fetch content recommendations
export const getContentRecommendations = async (): Promise<ContentRecommendation[]> => {
  try {
    const response = await fetch(`${baseUrl}/RecommendationWebsite/content-data`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch content recommendations');
    }

    const data: ContentRecommendation[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching content recommendations:', error);
    throw error;
  }
};
