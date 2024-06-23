namespace BetyParaAPI.ViewModel
{
    public class SaleViewModel
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Profit { get; set; }
        public decimal Price { get; set; }
        public DateTime SaleDate { get; set; }
    }
}
