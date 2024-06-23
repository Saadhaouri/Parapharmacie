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
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public OrderDto CreateOrder(CreateOrderDto createOrderDto)
        {
            var order = _mapper.Map<Order>(createOrderDto);
            order.OrderID = Guid.NewGuid();
            order.OrderDate = DateTime.UtcNow;

            var addedOrder = _orderRepository.AddOrder(order, createOrderDto.ProductIds);

            return _mapper.Map<OrderDto>(addedOrder);
        }

        public OrderDto GetOrderById(Guid orderId)
        {
            var order = _orderRepository.GetOrderById(orderId);

            if (order == null)
                throw new ArgumentNullException(nameof(order));

            return _mapper.Map<OrderDto>(order);
        }

        public IEnumerable<OrderDto> GetAllOrders()
        {
            var orders = _orderRepository.GetAllOrders();
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public void UpdateOrder(Guid orderId, CreateOrderDto updateOrderDto)
        {
            var order = _orderRepository.GetOrderById(orderId);

            if (order == null)
                throw new ArgumentNullException(nameof(order));

            // Map the updated properties to the existing order
            order.SupplierId = updateOrderDto.SupplierId;
            order.ClientId = updateOrderDto.ClientId;
            order.Status = updateOrderDto.Status;
            order.TotalAmount = updateOrderDto.TotalAmount;

            // Update OrderProducts
            order.OrderProducts.Clear();
            foreach (var productId in updateOrderDto.ProductIds)
            {
                order.OrderProducts.Add(new OrderProduct { OrderId = order.OrderID, ProductId = productId });
            }

            _orderRepository.UpdateOrder(order, updateOrderDto.ProductIds);
        }

        public void DeleteOrder(Guid orderId)
        {
            _orderRepository.DeleteOrder(orderId);
        }
    }
}
