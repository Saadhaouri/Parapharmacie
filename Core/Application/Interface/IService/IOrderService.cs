using Core.Application.Dto_s;

namespace Core.Application.Interface.IServices;

public interface IOrderService
{
    OrderDto CreateOrder(CreateOrderDto createOrderDto);
    OrderDto GetOrderById(Guid orderId);
    IEnumerable<OrderDto> GetAllOrders();
    void UpdateOrder(Guid orderId, CreateOrderDto updateOrderDto);
    void DeleteOrder(Guid orderId);
}
