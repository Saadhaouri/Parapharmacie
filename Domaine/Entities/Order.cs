namespace Domaine.Entities
{
    public class Order
    {
        public Guid OrderID { get; set; }
        public Guid ClientID { get; set; } // Foreign key
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }

        public ICollection<Product> Products { get; set; }
        public virtual Client Client { get; set; } // Navigation property
    }
}
