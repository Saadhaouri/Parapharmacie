using AutoMapper;
using Core.Application.Dto_s;
using Core.Application.Interface.IRepositories;
using Core.Application.Interface.IServices;
using Domaine.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Core.Application.Services
{
    public class PromotionService : IPromotionService
    {
        private readonly IPromotionRepository _promotionRepository;
        private readonly IMapper _mapper;

        public PromotionService(IPromotionRepository promotionRepository, IMapper mapper)
        {
            _promotionRepository = promotionRepository;
            _mapper = mapper;
        }

        public PromotionDto CreatePromotion(CreatePromotionDto createPromotionDto)
        {
            var promotion = _mapper.Map<Promotion>(createPromotionDto);
            promotion.PromotionID = Guid.NewGuid();

            var addedPromotion = _promotionRepository.AddPromotion(promotion, createPromotionDto.ProductIds);

            return _mapper.Map<PromotionDto>(addedPromotion);
        }

        public PromotionDto GetPromotionById(Guid promotionId)
        {
            var promotion = _promotionRepository.GetPromotionById(promotionId);

            if (promotion == null)
                throw new ArgumentNullException(nameof(promotion));

            return _mapper.Map<PromotionDto>(promotion);
        }

        public IEnumerable<PromotionDto> GetAllPromotions()
        {
            var promotions = _promotionRepository.GetAllPromotions();
            return _mapper.Map<IEnumerable<PromotionDto>>(promotions);
        }

        public void UpdatePromotion(Guid promotionId, CreatePromotionDto updatePromotionDto)
        {
            var promotion = _promotionRepository.GetPromotionById(promotionId);

            if (promotion == null)
                throw new ArgumentNullException(nameof(promotion));

            // Map the updated properties to the existing promotion
            promotion.Code = updatePromotionDto.Code;
            promotion.Discount = updatePromotionDto.Discount;
            promotion.StartDate = updatePromotionDto.StartDate; 
            promotion.EndDate = updatePromotionDto.EndDate;

            // Update ProductPromotions
            promotion.ProductPromotions.Clear();
            foreach (var productId in updatePromotionDto.ProductIds)
            {
                promotion.ProductPromotions.Add(new ProductPromotion { PromotionId = promotion.PromotionID, ProductId = productId });
            }

            _promotionRepository.UpdatePromotion(promotion, updatePromotionDto.ProductIds);
        }

        public void DeletePromotion(Guid promotionId)
        {
            _promotionRepository.DeletePromotion(promotionId);
        }
    }
}
