using Core.Application.Interface.IRepositories;
using Domaine.Entities;
using Infra.DATA;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class SalesRepository : ISalesRepository
    {
        private readonly PrDbContext _context;

        public SalesRepository(PrDbContext context)
        {
            _context = context;
        }

        public void Add(Sale sale)
        {
            _context.Sales.Add(sale);
            _context.SaveChanges();
        }

        public IEnumerable<Sale> GetSales()
        {
            return _context.Sales.Include(s => s.Product).ToList();
        }
    }
}
