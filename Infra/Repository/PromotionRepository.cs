using Core.Application.Interface.IRepositories;
using Domaine.Entities;
using Infra.DATA;
using Microsoft.EntityFrameworkCore;

namespace Infra.Repository
{
    public class PromotionRepository : IPromotionRepository
    {
        private readonly PrDbContext _context;

        public PromotionRepository(PrDbContext context)
        {
            _context = context;
        }

        public Promotion AddPromotion(Promotion promotion, List<Guid> productIds)
        {
            _context.Promotions.Add(promotion);

            foreach (var productId in productIds)
            {
                _context.ProductPromotions.Add(new ProductPromotion { Promotion = promotion, ProductId = productId });
            }

            _context.SaveChanges();
            return promotion;
        }

        public Promotion GetPromotionById(Guid promotionId)
        {
            return _context.Promotions
                .Include(p => p.ProductPromotions)
                .ThenInclude(pp => pp.Product)
                .FirstOrDefault(p => p.PromotionID == promotionId);
        }

        public IEnumerable<Promotion> GetAllPromotions()
        {
            return _context.Promotions
                .Include(p => p.ProductPromotions)
                .ThenInclude(pp => pp.Product)
                .ToList();
        }

        public void UpdatePromotion(Promotion promotion, List<Guid> productIds)
        {
            var existingPromotion = _context.Promotions
               .Include(p => p.ProductPromotions)
               .FirstOrDefault(p => p.PromotionID == promotion.PromotionID);

            if (existingPromotion != null)
            {
                // Update promotion details
                existingPromotion.Code = promotion.Code;
                existingPromotion.Discount = promotion.Discount;
                existingPromotion.StartDate = promotion.StartDate;
                existingPromotion.EndDate = promotion.EndDate;

                // Detach existing product promotions to avoid tracking issues
                foreach (var pp in existingPromotion.ProductPromotions.ToList())
                {
                    var trackedEntity = _context.ProductPromotions.Local
                        .FirstOrDefault(ep => ep.PromotionId == pp.PromotionId && ep.ProductId == pp.ProductId);
                    if (trackedEntity != null)
                    {
                        _context.Entry(trackedEntity).State = EntityState.Detached;
                    }
                }

                // Clear existing product promotions
                _context.ProductPromotions.RemoveRange(existingPromotion.ProductPromotions);

                // Add new product promotions
                foreach (var productId in productIds)
                {
                    var newProductPromotion = new ProductPromotion { PromotionId = existingPromotion.PromotionID, ProductId = productId };

                    var trackedEntity = _context.ProductPromotions.Local
                        .FirstOrDefault(pp => pp.PromotionId == newProductPromotion.PromotionId && pp.ProductId == newProductPromotion.ProductId);
                    if (trackedEntity != null)
                    {
                        _context.Entry(trackedEntity).State = EntityState.Detached;
                    }

                    _context.ProductPromotions.Add(newProductPromotion);
                }

                _context.SaveChanges();
            }
        }
        public Promotion GetActivePromotionForProduct(Guid productId)
        {
            return _context.Promotions
                .Include(p => p.ProductPromotions)
                .FirstOrDefault(p => p.ProductPromotions.Any(pp => pp.ProductId == productId) && p.StartDate <= DateTime.UtcNow && p.EndDate >= DateTime.UtcNow) ;
        }

        public void DeletePromotion(Guid promotionId)
        {
            var promotion = _context.Promotions.Find(promotionId);
            if (promotion != null)
            {
                // Remove related product promotions
                var productPromotions = _context.ProductPromotions.Where(pp => pp.PromotionId == promotionId).ToList();
                _context.ProductPromotions.RemoveRange(productPromotions);

                _context.Promotions.Remove(promotion);
                _context.SaveChanges();
            }
        }
    }
}
