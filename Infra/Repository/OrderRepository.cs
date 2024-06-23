using Core.Application.Interface.IRepositories;
using Domaine.Entities;
using Infra.DATA;
using Microsoft.EntityFrameworkCore;

namespace Infra.Repository;

public class OrderRepository : IOrderRepository
{
    private readonly PrDbContext _context;

    public OrderRepository(PrDbContext context)
    {
        _context = context;
    }

    public Order AddOrder(Order order, List<Guid> productIds)
    {
        _context.Orders.Add(order);

        foreach (var productId in productIds)
        {
            _context.OrderProducts.Add(new OrderProduct { Order = order, ProductId = productId });
        }

        _context.SaveChanges();
        return order;
    }

    public Order GetOrderById(Guid orderId)
    {
        return _context.Orders
            .Include(o => o.OrderProducts)
            .FirstOrDefault(o => o.OrderID == orderId);
    }

    public IEnumerable<Order> GetAllOrders()
    {
        return _context.Orders
            .Include(o => o.OrderProducts)
            .ToList();
    }

    public void UpdateOrder(Order order, List<Guid> productIds)
    {
        var existingOrder = _context.Orders
           .Include(o => o.OrderProducts)
           .FirstOrDefault(o => o.OrderID == order.OrderID);

        if (existingOrder != null)
        {
            // Update order details
            existingOrder.SupplierId = order.SupplierId;
            existingOrder.OrderDate = order.OrderDate;
            existingOrder.TotalAmount = order.TotalAmount;
            existingOrder.Status = order.Status;
            existingOrder.ClientId = order.ClientId;

            // Detach existing order products to avoid tracking issues
            foreach (var op in existingOrder.OrderProducts.ToList())
            {
                var trackedEntity = _context.OrderProducts.Local
                    .FirstOrDefault(ep => ep.OrderId == op.OrderId && ep.ProductId == op.ProductId);
                if (trackedEntity != null)
                {
                    _context.Entry(trackedEntity).State = EntityState.Detached;
                }
            }

            // Clear existing order products
            _context.OrderProducts.RemoveRange(existingOrder.OrderProducts);

            // Add new order products
            foreach (var productId in productIds)
            {
                var newOrderProduct = new OrderProduct { OrderId = existingOrder.OrderID, ProductId = productId };

                var trackedEntity = _context.OrderProducts.Local
                    .FirstOrDefault(op => op.OrderId == newOrderProduct.OrderId && op.ProductId == newOrderProduct.ProductId);
                if (trackedEntity != null)
                {
                    _context.Entry(trackedEntity).State = EntityState.Detached;
                }

                _context.OrderProducts.Add(newOrderProduct);
            }

            _context.SaveChanges();
        }
    }

    public void DeleteOrder(Guid orderId)
    {
        var order = _context.Orders.Find(orderId);
        if (order != null)
        {
            _context.Orders.Remove(order);
            _context.SaveChanges();
        }
    }
}
