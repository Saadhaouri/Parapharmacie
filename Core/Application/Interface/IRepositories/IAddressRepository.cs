using Domaine.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Interface.IRepositories
{
    public interface IAddressRepository
    {
        IEnumerable<Address> GetAddresses();
        Address GetAddressById(Guid addressId);
        void InsertAddress(Address address);
        void UpdateAddress(Address address);
        void DeleteAddress(Guid addressId);
        void Save();
    }
}
