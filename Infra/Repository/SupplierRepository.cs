using Core.Application.Interface.IRepositories;
using Domaine.Entities;
using Infra.DATA;

namespace Para.Infrastructure.Repository;

public class SupplierRepository : ISupplierRepository
{
    private readonly PrDbContext _dbContext;

    public SupplierRepository(PrDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IEnumerable<Supplier> GetSuppliers()
    {
        return _dbContext.Suppliers.ToList();
    }

    public Supplier GetSupplierById(Guid supplierId)
    {
        return _dbContext.Suppliers.FirstOrDefault(s => s.SupplierID == supplierId)
            ?? throw new InvalidOperationException("Supplier not found");
    }

    public void InsertSupplier(Supplier supplier)
    {
        _dbContext.Suppliers.Add(supplier);
    }

    public void UpdateSupplier(Supplier supplier)
    {
        _dbContext.Suppliers.Update(supplier);
    }

    public void DeleteSupplier(Guid supplierId)
    {
        var supplier = _dbContext.Suppliers.FirstOrDefault(s => s.SupplierID == supplierId);
        if (supplier != null)
        {
            _dbContext.Suppliers.Remove(supplier);
        }
    }

    public void Save()
    {
        _dbContext.SaveChanges();
    }
}
