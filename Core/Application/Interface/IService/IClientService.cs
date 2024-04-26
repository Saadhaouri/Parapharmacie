using Core.Application.Dto_s;

namespace Core.Application.Interface.IService
{
    public interface IClientService
    {
        IEnumerable<ClientDto> GetClients();
        ClientDto GetClientById(Guid clientId);
        void AddClient(ClientDto client);
        void UpdateClient(ClientDto client);
        void DeleteClient(Guid clientId);
    }

}
