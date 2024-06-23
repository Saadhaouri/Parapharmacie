using Domaine.Entities;

namespace Core.Application.Dto_s
{
    public class DebtDto
    {
        public Guid ClientID { get; set; }
        public List<Guid> ProductIDs { get; set; }  // List of product IDs
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; }
    }
}
