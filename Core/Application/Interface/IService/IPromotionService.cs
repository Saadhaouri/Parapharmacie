using Core.Application.Dto_s;

namespace Core.Application.Interface.IServices;

public interface IPromotionService
{
    PromotionDto CreatePromotion(CreatePromotionDto createPromotionDto);
    PromotionDto GetPromotionById(Guid promotionId);
    IEnumerable<PromotionDto> GetAllPromotions();
    void UpdatePromotion(Guid promotionId, CreatePromotionDto updatePromotionDto);
    void DeletePromotion(Guid promotionId);
}
