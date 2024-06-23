using Domaine.Entities;

namespace Core.Application.Interface.IService;

public interface ISalesRepository
{
    void Add(Sale sale);
    IEnumerable<Sale> GetSales();
}
