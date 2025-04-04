namespace RecommenderWebsite.API.Data
{
    public class Content
    {
        public int id {  get; set; }
        public string title { get; set; }
        public string top_1 { get; set; }
        public float sim_1 { get; set; }

        public string top_2 { get; set; }
        public float sim_2 { get; set; }
        public string top_3 { get; set; }
        public float sim_3 { get; set; }
        public string top_4 { get; set; }
        public float sim_4 { get; set; }
        public string top_5 { get; set; }
        public float sim_5 { get; set; }

    }
}
