using Core.Application.Dto_s;

namespace Core.Application.Interface.IService
{
    public interface IOrderService
    {
        IEnumerable<OrderDto> GetOrders();
        OrderDto GetOrderById(Guid orderId);
        void AddOrder(OrderDto order);
        void UpdateOrder(OrderDto order);
        void DeleteOrder(Guid orderId);
    }

}
