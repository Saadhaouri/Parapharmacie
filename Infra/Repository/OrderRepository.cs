using Core.Application.Interface.IRepositories;
using Domaine.Entities;
using Infra.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ParaDbContext _dbContext;  // Replace 'YourDbContext' with the name of your actual DbContext

        public OrderRepository(ParaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Order> GetOrders()
        {
            return _dbContext.Orders.ToList();
        }

        public Order GetOrderById(Guid orderId)
        {
            return _dbContext.Orders.FirstOrDefault(o => o.OrderID == orderId)
                   ?? throw new InvalidOperationException("Order not found");
        }

        public void InsertOrder(Order order)
        {
            _dbContext.Orders.Add(order);
        }

        public void UpdateOrder(Order order)
        {
            _dbContext.Orders.Update(order);
        }

     

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void DeleteOrder(Guid orderId)
        {
            var order = _dbContext.Orders.FirstOrDefault(o => o.OrderID == orderId);
            if (order != null)
            {
                _dbContext.Orders.Remove(order);
            }
            else
            {
                throw new InvalidOperationException("Order to delete not found");
            }
        }
    }

}
