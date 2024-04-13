namespace Domaine.Entities
{
    public class Product
    {
        public Guid ProductID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public Guid CategoryID { get; set; } // Foreign key
        public string ImageURL { get; set; }

        public DateTime DateExp { get; set; }
        public Category Category { get; set; }
        public ICollection<Promotion> Promotions { get; set; }

        public ICollection<Order> Ordres { get; set; }


    }
}
