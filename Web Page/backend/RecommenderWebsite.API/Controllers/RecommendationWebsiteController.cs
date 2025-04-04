using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using RecommenderWebsite.API.Data;

namespace RecommenderWebsite.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RecommendationWebsiteController : ControllerBase
    {
        [HttpGet("content-data")]
        public IActionResult GetCsvData()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "article_recommendations.csv");

            if (!System.IO.File.Exists(filePath))
                return NotFound("Content CSV file not found.");

            using var reader = new StreamReader(filePath);
            using var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture));

            var records = csv.GetRecords<Content>().ToList(); // Ensure records are read into a list
            return Ok(records);
        }

        [HttpGet("collaborative-data")]
        public IActionResult GetCollaborativeData()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "collaborative_article_recommendations.csv");

            if (!System.IO.File.Exists(filePath))
                return NotFound("Collaborative CSV file not found.");

            using var reader = new StreamReader(filePath);
            using var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture));

            var records = csv.GetRecords<Collaborative>().ToList(); // Using Collaborative model
            return Ok(records);
        }
    }

}
