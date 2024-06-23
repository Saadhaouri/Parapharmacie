using AutoMapper;
using BetyParaAPI.ViewModel;
using Core.Application.Dto_s;
using Core.Application.Interface.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SupplierController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly ISupplierService _supplierService;

    public SupplierController(ISupplierService supplierService, IMapper mapper)
    {
        _mapper = mapper;
        _supplierService = supplierService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<SupplierViewModel>> GetAllSuppliers()
    {
        var supplierDtos = _supplierService.GetAllSuppliers();
        var supplierViewModels = _mapper.Map<IEnumerable<SupplierViewModel>>(supplierDtos);
        return Ok(supplierViewModels);
    }

    [HttpGet("{id}")]
    public ActionResult<SupplierViewModel> GetSupplierById(Guid id)
    {
        var supplierDto = _supplierService.GetSupplierById(id);
        if (supplierDto == null)
        {
            return NotFound();
        }
        var supplierViewModel = _mapper.Map<SupplierViewModel>(supplierDto);
        return Ok(supplierViewModel);
    }

    [HttpPost]
    public IActionResult CreateSupplier(ACsupplierViewModel supplierViewModel)
    {
        var supplierDto = _mapper.Map<SupplierDto>(supplierViewModel);
        _supplierService.CreateSupplier(supplierDto);
        return Ok("Supplier Inserted Succufly ");
    }

    [HttpPut("{id}")]
    public IActionResult UpdateSupplier(Guid id, ACsupplierViewModel supplierViewModel)
    {
        var supplierDto = _mapper.Map<SupplierDto>(supplierViewModel);
        try
        {
            _supplierService.UpdateSupplier(id, supplierDto);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteSupplier(Guid id)
    {
        try
        {
            _supplierService.DeleteSupplier(id);
            return Ok("supplier deleted with succes ");
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
    }
}
