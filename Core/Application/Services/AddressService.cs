using AutoMapper;
using Core.Application.Dto_s;
using Core.Application.Interface.IRepositories;
using Core.Application.Interface.IService;
using Domaine.Entities;

namespace Core.Application.Services
{
    public class AddressService : IAddressService
    {
        private readonly IAddressRepository _addressRepository;
        private readonly IMapper _mapper;

        public AddressService(IAddressRepository addressRepository, IMapper mapper)
        {
            _addressRepository = addressRepository;
            _mapper = mapper;
        }

        public IEnumerable<AddressDto> GetAddresses()
        {
            var addresses = _addressRepository.GetAddresses();
            return _mapper.Map<IEnumerable<AddressDto>>(addresses);
        }

        public AddressDto GetAddressById(Guid addressId)
        {
            var address = _addressRepository.GetAddressById(addressId);
            return _mapper.Map<AddressDto>(address);
        }

        public void AddAddress(AddressDto address)
        {
            var addressModel = _mapper.Map<Address>(address);
            _addressRepository.InsertAddress(addressModel);
            _addressRepository.Save();
        }

        public void UpdateAddress(AddressDto address)
        {
            var addressModel = _mapper.Map<Address>(address);
            _addressRepository.UpdateAddress(addressModel);
            _addressRepository.Save();
        }

        public void DeleteAddress(Guid addressId)
        {
            _addressRepository.DeleteAddress(addressId);
            _addressRepository.Save();
        }
    }

}
