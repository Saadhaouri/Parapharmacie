namespace BetyParaAPI.Controllers
{
    using AutoMapper;
    using Core.Application.Dto_s;
    using Core.Application.Interface.IService;
    using Microsoft.AspNetCore.Mvc;
    using ViewModel;

    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly IMapper _mapper;

        public ClientController(IClientService clientService, IMapper mapper)
        {
            _clientService = clientService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetClients()
        {
            var clientDtos = _clientService.GetClients();
            var clientViewModels = _mapper.Map<IEnumerable<ClientViewModel>>(clientDtos);
            return Ok(clientViewModels);
        }

        [HttpGet("{clientId}")]
        public IActionResult GetClientById(Guid clientId)
        {
            var clientDto = _clientService.GetClientById(clientId);
            if (clientDto == null)
            {
                return NotFound("Client not found.");
            }
            var clientViewModel = _mapper.Map<ClientViewModel>(clientDto);
            return Ok(clientViewModel);
        }

        [HttpPost]
        public IActionResult AddClient([FromBody] CreateClientViewModel clientViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var clientDto = _mapper.Map<ClientDto>(clientViewModel);
            _clientService.AddClient(clientDto);
            return  Ok("Client added successfully");
        }

        [HttpPut("{clientId}")]
        public IActionResult UpdateClient(Guid clientId, [FromBody] CreateClientViewModel clientViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingClientDto = _clientService.GetClientById(clientId);
            if (existingClientDto == null)
            {
                return NotFound("Client not found.");
            }
            _mapper.Map(clientViewModel, existingClientDto);
            _clientService.UpdateClient( clientId,existingClientDto);
            return NoContent();
        }

        [HttpDelete("{clientId}")]
        public IActionResult DeleteClient(Guid clientId)
        {
            var existingClientDto = _clientService.GetClientById(clientId);
            if (existingClientDto == null)
            {
                return NotFound("Client not found.");
            }
            _clientService.DeleteClient(clientId);
            return NoContent();
        }
    }

}
