namespace Domaine.Entities
{
    public class Promotion
    {
        public Guid PromotionID { get; set; }
        public string Code { get; set; }
        public decimal Discount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ICollection<Product> Product { get; set; }

    }
}
