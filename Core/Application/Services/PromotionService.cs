using AutoMapper;
using Core.Application.Dto_s;
using Core.Application.Interface.IRepositories;
using Core.Application.Interface.IService;
using Domaine.Entities;

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

        public IEnumerable<PromotionDto> GetPromotions()
        {
            var promotions = _promotionRepository.GetPromotions();
            return _mapper.Map<IEnumerable<PromotionDto>>(promotions);
        }

        public PromotionDto GetPromotionById(Guid promotionId)
        {
            var promotion = _promotionRepository.GetPromotionById(promotionId);
            return _mapper.Map<PromotionDto>(promotion);
        }

        public void AddPromotion(PromotionDto promotion)
        {
            var promotionModel = _mapper.Map<Promotion>(promotion);
            _promotionRepository.InsertPromotion(promotionModel);
            _promotionRepository.Save();
        }

        public void UpdatePromotion(PromotionDto promotion)
        {
            var promotionModel = _mapper.Map<Promotion>(promotion);
            _promotionRepository.UpdatePromotion(promotionModel);
            _promotionRepository.Save();
        }

        public void DeletePromotion(Guid promotionId)
        {
            _promotionRepository.DeletePromotion(promotionId);
            _promotionRepository.Save();
        }
    }

}
