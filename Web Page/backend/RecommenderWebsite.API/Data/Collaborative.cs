using CsvHelper.Configuration.Attributes;

namespace RecommenderWebsite.API.Data
{
    public class Collaborative
    {
        public float Id { get; set; }
        
        [Name("If you liked")]
        public string IfYouLiked { get; set; }

        [Name("Reccomendation 1")]
        public string recommendation_1 { get; set; }


        [Name("Reccomendation 2")]
        public string recommendation_2 { get; set; }


        [Name("Reccomendation 3")]
        public string recommendation_3 { get; set; }


        [Name("Reccomendation 4")]
        public string recommendation_4 { get; set; }


        [Name("Reccomendation 5")]
        public string recommendation_5 { get; set; }

    }
}
