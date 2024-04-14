using Domaine.Entities;

namespace Para.Core.Application.Interface.IRepositories;

    public interface IPromotionRepository
    {
        IEnumerable<Promotion> GetPromotions();
        Promotion GetPromotionById(Guid promotionId);
        void InsertPromotion(Promotion promotion);
        void UpdatePromotion(Promotion promotion);
        void DeletePromotion(Guid promotionId);
        void Save();
    }
