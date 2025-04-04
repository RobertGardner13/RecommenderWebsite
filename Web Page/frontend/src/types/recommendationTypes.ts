// Define the type for a Collaborative recommendation
export type CollaborativeRecommendation = {
    id: number;
    ifYouLiked: string;
    recommendation_1: string;
    recommendation_2: string;
    recommendation_3: string;
    recommendation_4: string;
    recommendation_5: string;
  };
  
  // Define the type for a Content recommendation
  export type ContentRecommendation = {
    id: number;
    title: string;
    top_1: string;
    sim_1: number;
    top_2: string;
    sim_2: number;
    top_3: string;
    sim_3: number;
    top_4: string;
    sim_4: number;
    top_5: string;
    sim_5: number;
  };
  