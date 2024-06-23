using Domaine.Entities;

namespace Core.Application.Interface.IRepositories;
public interface IOrderRepository
{
    Order AddOrder(Order order, List<Guid> productIds);
    Order GetOrderById(Guid orderId);
    IEnumerable<Order> GetAllOrders();
    void UpdateOrder(Order order, List<Guid> productIds);
    void DeleteOrder(Guid orderId);
}