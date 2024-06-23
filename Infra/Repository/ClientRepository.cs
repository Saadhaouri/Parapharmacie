using Domaine.Entities;
using Infra.DATA;
using Core.Application.Interface.IRepositories;

namespace Para.Infrastructure.Repository
{
    public class ClientRepository : IClientRepository
    {
        private readonly PrDbContext _dbContext;

        public ClientRepository(PrDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Client> GetClients()
        {
            return _dbContext.Clients.ToList();
        }

        public Client GetClientById(Guid clientId)
        {
            return _dbContext.Clients.FirstOrDefault(c => c.ClientID == clientId)
                ?? throw new InvalidOperationException("Client nut found ");
        }

        public void InsertClient(Client client)
        {
            _dbContext.Clients.Add(client);
        }

        public void UpdateClient(Client client)
        {
            _dbContext.Clients.Update(client);
        }

        public void DeleteClient(Guid clientId)
        {
            var client = _dbContext.Clients.FirstOrDefault(c => c.ClientID == clientId);
            if (client != null)
            {
                _dbContext.Clients.Remove(client);
            }
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }
    }

}
