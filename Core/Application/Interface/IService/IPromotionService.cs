using Core.Application.Dto_s;

namespace Core.Application.Interface.IService
{
    public interface IPromotionService
    {
        IEnumerable<PromotionDto> GetPromotions();
        PromotionDto GetPromotionById(Guid promotionId);
        void AddPromotion(PromotionDto promotion);
        void UpdatePromotion(PromotionDto promotion);
        void DeletePromotion(Guid promotionId);
    }

}
