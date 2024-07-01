using Domaine.Entities;
using System.Collections.Generic;

namespace Core.Application.Interface.IRepositories
{
    public interface ISalesRepository
    {
        void Add(Sale sale);
        IEnumerable<Sale> GetSales();
        void DeleteAllSales();  // Method to delete all sales
    }
}
