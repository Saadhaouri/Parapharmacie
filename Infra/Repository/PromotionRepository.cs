using Domaine.Entities;
using Infra.Database;
using Core.Application.Interface.IRepositories;

namespace Para.Infrastructure.Repository;

public class PromotionRepository : IPromotionRepository
{

    private readonly ParaDbContext _dbContext; 

    public PromotionRepository(ParaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IEnumerable<Promotion> GetPromotions()
    {
        return _dbContext.Promotions.ToList();
    }

    public Promotion GetPromotionById(Guid promotionId)
    {
        return _dbContext.Promotions.FirstOrDefault(p => p.PromotionID == promotionId) ?? throw new InvalidOperationException("Promotion not found ");
    }

    public void InsertPromotion(Promotion promotion)
    {
        _dbContext.Promotions.Add(promotion);
    }

    public void UpdatePromotion(Promotion promotion)
    {
        _dbContext.Promotions.Update(promotion);
    }

    public void DeletePromotion(Guid promotionId)
    {
        var promotion = _dbContext.Promotions.FirstOrDefault(p => p.PromotionID == promotionId);
        if (promotion != null)
        {
            _dbContext.Promotions.Remove(promotion);
        }
    }

    public void Save()
    {
        _dbContext.SaveChanges();
    }
}
