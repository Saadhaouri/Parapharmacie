using Core.Application.Interface.IRepositories;
using Domaine.Entities;
using Infra.Database;

namespace Infra.Repository
{
    public class AddressRepository : IAddressRepository
    {
        private readonly ParaDbContext _context; // Replace AppDbContext with your actual DbContext class name

        public AddressRepository(ParaDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Address> GetAddresses()
        {
            return _context.Addresses.ToList();
        }

        public Address GetAddressById(Guid addressId)
        {
            // This method returns null if the address is not found, which is generally preferred over throwing an exception
            return _context.Addresses.FirstOrDefault(a => a.AddressID == addressId) ?? throw new InvalidOperationException("Address Not Found ");
        }

        public void InsertAddress(Address address)
        {
            _context.Addresses.Add(address);
        }

        public void UpdateAddress(Address address)
        {
            _context.Addresses.Update(address);
        }

        public void DeleteAddress(Guid addressId)
        {
            var address = GetAddressById(addressId);
            if (address != null)
            {
                _context.Addresses.Remove(address);
            }
            else
            {
                throw new InvalidOperationException("Address not found");
            }
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
