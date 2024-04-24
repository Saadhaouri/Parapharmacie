using Domaine.Entities;

namespace Core.Application.Interface.IRepositories;
    public interface IClientRepository
    {
    IEnumerable<Client> GetClients();
    Client GetClientById(Guid clientId);
    void InsertClient(Client client);
    void UpdateClient(Client client);
    void DeleteClient(Guid clientId);
    void Save();
}

