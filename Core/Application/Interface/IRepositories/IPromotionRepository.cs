using Domaine.Entities;

namespace Core.Application.Interface.IRepositories;

public interface IPromotionRepository
{
    Promotion AddPromotion(Promotion promotion, List<Guid> productIds);
    Promotion GetPromotionById(Guid promotionId);
    IEnumerable<Promotion> GetAllPromotions();
    void UpdatePromotion(Promotion promotion, List<Guid> productIds);
    void DeletePromotion(Guid promotionId);
    Promotion GetActivePromotionForProduct(Guid productId);

}
