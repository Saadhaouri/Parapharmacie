using Core.Application.Dto_s;

namespace Core.Application.Interface.IServices;

public interface ISupplierService
{
    IEnumerable<SupplierDto> GetAllSuppliers();
    SupplierDto GetSupplierById(Guid supplierId);
    void CreateSupplier(SupplierDto supplierDto);
    void UpdateSupplier(Guid supplierId, SupplierDto supplierDto);
    void DeleteSupplier(Guid supplierId);
}
