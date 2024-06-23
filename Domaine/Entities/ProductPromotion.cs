namespace Domaine.Entities;

public class ProductPromotion
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; }
    public Guid PromotionId { get; set; }
    public Promotion Promotion { get; set; }
}
