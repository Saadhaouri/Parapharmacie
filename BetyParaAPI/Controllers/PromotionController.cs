namespace BetyParaAPI.Controllers
{
    using AutoMapper;
    using Core.Application.Dto_s;
    using Core.Application.Interface.IService;
    using Microsoft.AspNetCore.Mvc;
    using ViewModel;

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

        [HttpGet]
        public IActionResult GetPromotions()
        {
            var promotionsDto = _promotionService.GetPromotions();
            var promotionsViewModel = _mapper.Map<IEnumerable<PromotionViewModel>>(promotionsDto);
            return Ok(promotionsViewModel);
        }

        [HttpGet("{promotionId}")]
        public IActionResult GetPromotionById(Guid promotionId)
        {
            var promotionDto = _promotionService.GetPromotionById(promotionId);
            if (promotionDto == null)
            {
                return NotFound("Promotion not found.");
            }
            var promotionViewModel = _mapper.Map<PromotionViewModel>(promotionDto);
            return Ok(promotionViewModel);
        }

        [HttpPost]
        public IActionResult AddPromotion([FromBody] PromotionViewModel promotionViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var promotionDto = _mapper.Map<PromotionDto>(promotionViewModel);
            _promotionService.AddPromotion(promotionDto);
            return Ok("Promotion added successfully");
        }

        [HttpPut("{promotionId}")]
        public IActionResult UpdatePromotion(Guid promotionId, [FromBody] PromotionViewModel promotionViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingPromotionDto = _promotionService.GetPromotionById(promotionId);
            if (existingPromotionDto == null)
            {
                return NotFound("Promotion not found.");
            }
            _mapper.Map(promotionViewModel, existingPromotionDto);
            _promotionService.UpdatePromotion(existingPromotionDto);
            return NoContent();
        }

        [HttpDelete("{promotionId}")]
        public IActionResult DeletePromotion(Guid promotionId)
        {
            var existingPromotionDto = _promotionService.GetPromotionById(promotionId);
            if (existingPromotionDto == null)
            {
                return NotFound("Promotion not found.");
            }
            _promotionService.DeletePromotion(promotionId);
            return NoContent();
        }
    }

}
