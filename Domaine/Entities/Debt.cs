using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Domaine.Entities
{
    public class Debt
    {
        public Guid DebtID { get; set; }
        public Guid ClientID { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; }

        // Navigation property for related products
        public ICollection<Product> Products { get; set; }
        

    }
}
