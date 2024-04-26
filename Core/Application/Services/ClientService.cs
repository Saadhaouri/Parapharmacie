using AutoMapper;
using Core.Application.Dto_s; // Update with the actual namespace where your repository interfaces are defined
using Core.Application.Interface.IRepositories;
using Core.Application.Interface.IService;
using Domaine.Entities;

public class ClientService : IClientService
{
    private readonly IClientRepository _clientRepository;
    private readonly IMapper _mapper;
    public ClientService(IClientRepository clientRepository, IMapper mapper)
    {
        _clientRepository = clientRepository;
        _mapper = mapper;
    }

    public IEnumerable<ClientDto> GetClients()
    {
        var clients = _clientRepository.GetClients();
        return _mapper.Map<IEnumerable<ClientDto>>(clients);
    }

    public ClientDto GetClientById(Guid clientId)
    {
        var client = _clientRepository.GetClientById(clientId);
        if (client == null)
        {
            throw new ApplicationException("Client not found.");
        }
        return _mapper.Map<ClientDto>(client);
    }

    public void AddClient(ClientDto clientDto)
    {
        var client = _mapper.Map<Client>(clientDto);

        // You can add more business logic before adding a client
        _clientRepository.InsertClient(client);
        _clientRepository.Save();
    }

    public void UpdateClient(ClientDto clientDto)
    {
        var existingClient = _clientRepository.GetClientById(clientDto.ClientID);
        if (existingClient == null)
        {
            throw new ApplicationException("Client not found.");
        }

        // Mapping the updated values
        _mapper.Map(clientDto, existingClient);
        _clientRepository.UpdateClient(existingClient);
        _clientRepository.Save();
    }

    public void DeleteClient(Guid clientId)
    {
        var client = _clientRepository.GetClientById(clientId);
        if (client == null)
        {
            throw new ApplicationException("Client not found for deletion.");
        }

        _clientRepository.DeleteClient(clientId);
        _clientRepository.Save();
    }
}
