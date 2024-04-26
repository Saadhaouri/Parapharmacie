using Core.Application.Dto_s;

namespace Core.Application.Interface.IService
{
    public interface IAddressService
    {
        IEnumerable<AddressDto> GetAddresses();
        AddressDto GetAddressById(Guid addressId);
        void AddAddress(AddressDto address);
        void UpdateAddress(AddressDto address);
        void DeleteAddress(Guid addressId);
    }

}
