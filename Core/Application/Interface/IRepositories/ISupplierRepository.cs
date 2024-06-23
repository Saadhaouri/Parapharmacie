using Domaine.Entities;

namespace Core.Application.Interface.IRepositories;

public interface ISupplierRepository
{

    IEnumerable<Supplier> GetSuppliers();
    Supplier GetSupplierById(Guid supplierId);
    void InsertSupplier(Supplier supplier);
    void UpdateSupplier(Supplier supplier);
    void DeleteSupplier(Guid supplierId);
    void Save();
}
