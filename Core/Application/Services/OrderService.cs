using AutoMapper;
using Core.Application.Dto_s;
using Core.Application.Interface.IRepositories;
using Core.Application.Interface.IService;
using Domaine.Entities;

namespace Core.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public IEnumerable<OrderDto> GetOrders()
        {
            var orders = _orderRepository.GetOrders();
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public OrderDto GetOrderById(Guid orderId)
        {
            var order = _orderRepository.GetOrderById(orderId);
            return _mapper.Map<OrderDto>(order);
        }

        public void AddOrder(OrderDto order)
        {
            var orderModel = _mapper.Map<Order>(order);
            _orderRepository.InsertOrder(orderModel);
            _orderRepository.Save();
        }

        public void UpdateOrder(OrderDto order)
        {
            var orderModel = _mapper.Map<Order>(order);
            _orderRepository.UpdateOrder(orderModel);
            _orderRepository.Save();
        }

        public void DeleteOrder(Guid orderId)
        {
            _orderRepository.DeleteOrder(orderId);
            _orderRepository.Save();
        }
    }

}
