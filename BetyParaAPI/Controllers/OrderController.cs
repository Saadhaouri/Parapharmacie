namespace BetyParaAPI.Controllers
{
    using AutoMapper;
    using Core.Application.Dto_s;
    using Core.Application.Interface.IService;
    using Microsoft.AspNetCore.Mvc;
    using ViewModel;

    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            var orderDtos = _orderService.GetOrders();
            var orderViewModels = _mapper.Map<IEnumerable<OrderViewModel>>(orderDtos);
            return Ok(orderViewModels);
        }

        [HttpGet("{orderId}")]
        public IActionResult GetOrderById(Guid orderId)
        {
            var orderDto = _orderService.GetOrderById(orderId);
            if (orderDto == null)
            {
                return NotFound("Order not found.");
            }
            var orderViewModel = _mapper.Map<OrderViewModel>(orderDto);
            return Ok(orderViewModel);
        }

        [HttpPost]
        public IActionResult AddOrder([FromBody] OrderViewModel orderViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var orderDto = _mapper.Map<OrderDto>(orderViewModel);
            _orderService.AddOrder(orderDto);
             return Ok("Order added successfully");
        }

        [HttpPut("{orderId}")]
        public IActionResult UpdateOrder(Guid orderId, [FromBody] OrderViewModel orderViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingOrderDto = _orderService.GetOrderById(orderId);
            if (existingOrderDto == null)
            {
                return NotFound("Order not found.");
            }
            _mapper.Map(orderViewModel, existingOrderDto);
            _orderService.UpdateOrder(existingOrderDto);
            return NoContent();
        }

        [HttpDelete("{orderId}")]
        public IActionResult DeleteOrder(Guid orderId)
        {
            var existingOrderDto = _orderService.GetOrderById(orderId);
            if (existingOrderDto == null)
            {
                return NotFound("Order not found.");
            }
            _orderService.DeleteOrder(orderId);
            return NoContent();
        }
    }

}
