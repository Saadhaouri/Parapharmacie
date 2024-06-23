using AutoMapper;
using Core.Application.Dto_s;
using Core.Application.Interface.IRepositories;
using Core.Application.Interface.IServices;
using Domaine.Entities;

namespace Core.Application.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;
        private readonly IMapper _mapper;

        public SupplierService(ISupplierRepository supplierRepository, IMapper mapper)
        {
            _supplierRepository = supplierRepository;
            _mapper = mapper;
        }

        public IEnumerable<SupplierDto> GetAllSuppliers()
        {
            var suppliers = _supplierRepository.GetSuppliers();
            return _mapper.Map<IEnumerable<SupplierDto>>(suppliers);
        }

        public SupplierDto GetSupplierById(Guid supplierId)
        {
            var supplier = _supplierRepository.GetSupplierById(supplierId);
            return _mapper.Map<SupplierDto>(supplier);
        }

        public void CreateSupplier(SupplierDto supplierDto)
        {
            var supplier = _mapper.Map<Supplier>(supplierDto);
            _supplierRepository.InsertSupplier(supplier);
            _supplierRepository.Save();
        }

        public void UpdateSupplier(Guid supplierId, SupplierDto supplierDto)
        {
            var existingSupplier = _supplierRepository.GetSupplierById(supplierId);
            if (existingSupplier == null)
            {
                throw new InvalidOperationException("Supplier not found");
            } 
            existingSupplier.Name = supplierDto.Name;
            existingSupplier.ContactPerson = supplierDto.ContactPerson;
            existingSupplier.Email = supplierDto.Email;
            existingSupplier.Phone = supplierDto.Phone;

            
          
            _supplierRepository.Save();
        }

        public void DeleteSupplier(Guid supplierId)
        {
            var existingSupplier = _supplierRepository.GetSupplierById(supplierId);
            if (existingSupplier == null)
            {
                throw new InvalidOperationException("Supplier not found");
            }

            _supplierRepository.DeleteSupplier(supplierId);
            _supplierRepository.Save();
        }
    }
}
