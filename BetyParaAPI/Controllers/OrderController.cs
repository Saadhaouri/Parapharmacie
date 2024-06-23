using AutoMapper;
using BetyParaAPI.ViewModel;
using Core.Application.Dto_s;
using Core.Application.Interface.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BetyParaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] CreateOrderViewModel createOrderViewModel)
        {
            if (createOrderViewModel == null)
                return BadRequest();

            var createOrderDto = _mapper.Map<CreateOrderDto>(createOrderViewModel);
            var createdOrder = _orderService.CreateOrder(createOrderDto);

            var orderViewModel = _mapper.Map<OrderViewModel>(createdOrder);

            return Ok(orderViewModel);
        }

        [HttpGet("{orderId}")]
        public IActionResult GetOrderById(Guid orderId)
        {
            var order = _orderService.GetOrderById(orderId);

            if (order == null)
                return NotFound();

            var orderViewModel = _mapper.Map<OrderViewModel>(order);

            return Ok(orderViewModel);
        }

        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var orders = _orderService.GetAllOrders();
            var orderViewModels = _mapper.Map<List<OrderViewModel>>(orders);
            return Ok(orderViewModels);
        }

        [HttpPut("{orderId}")]
        public IActionResult UpdateOrder(Guid orderId, [FromBody] CreateOrderViewModel orderViewModel)
        {
            if (orderViewModel == null)
                return BadRequest();

            var orderDto = _mapper.Map<CreateOrderDto>(orderViewModel);
            _orderService.UpdateOrder(orderId, orderDto);

            return Ok("Order updated successfully");
        }

        [HttpDelete("{orderId}")]
        public IActionResult DeleteOrder(Guid orderId)
        {
            _orderService.DeleteOrder(orderId);
            return NoContent();
        }
    }
}
