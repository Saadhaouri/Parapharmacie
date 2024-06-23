using AutoMapper;
using BetyParaAPI.ViewModel;
using Core.Application.Dto_s;
using Core.Application.Interface.IServices;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionController : ControllerBase
    {
        private readonly IPromotionService _promotionService;
        private readonly IMapper _mapper;

        public PromotionController(IPromotionService promotionService, IMapper mapper)
        {
            _promotionService = promotionService;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult CreatePromotion([FromBody] CreatePromotionViewModel createPromotionViewModel)
        {
            if (createPromotionViewModel == null)
            {
                return BadRequest("Promotion data is null");
            }

            var createPromotionDto = _mapper.Map<CreatePromotionDto>(createPromotionViewModel);
            var promotion = _promotionService.CreatePromotion(createPromotionDto);

            var promotionViewModel = _mapper.Map<PromotionViewModel>(promotion);
            return Ok("Promotion added Succufly");
        }

        [HttpGet("{id}")]
        public IActionResult GetPromotionById(Guid id)
        {
            var promotion = _promotionService.GetPromotionById(id);

            if (promotion == null)
            {
                return NotFound();
            }

            var promotionViewModel = _mapper.Map<PromotionViewModel>(promotion);
            return Ok(promotionViewModel);
        }

        [HttpGet]
        public IActionResult GetAllPromotions()
        {
            var promotions = _promotionService.GetAllPromotions();
            var promotionViewModels = _mapper.Map<IEnumerable<PromotionViewModel>>(promotions);
            return Ok(promotionViewModels);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePromotion(Guid id, [FromBody] CreatePromotionViewModel updatePromotionViewModel)
        {
            if (updatePromotionViewModel == null)
            {
                return BadRequest("Promotion data is null");
            }

            var updatePromotionDto = _mapper.Map<CreatePromotionDto>(updatePromotionViewModel);

            try
            {
                _promotionService.UpdatePromotion(id, updatePromotionDto);
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePromotion(Guid id)
        {
            try
            {
                _promotionService.DeletePromotion(id);
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
