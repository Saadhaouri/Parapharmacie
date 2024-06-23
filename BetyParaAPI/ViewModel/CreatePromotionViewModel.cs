namespace BetyParaAPI.ViewModel
{
    public class CreatePromotionViewModel
    {
        public string Code { get; set; }
        public decimal Discount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public List<Guid> ProductIds { get; set; }
    }
}
