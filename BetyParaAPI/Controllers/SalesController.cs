using AutoMapper;
using BetyParaAPI.ViewModel;
using Core.Application.Dto_s;
using Core.Application.Interface.IService;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BetyParaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ISalesService _salesService;
        private readonly IMapper _mapper;

        public SalesController(ISalesService salesService, IMapper mapper)
        {
            _salesService = salesService;
            _mapper = mapper;
        }

        [HttpGet("daily-sales")]
        public IActionResult GetDailySales()
        {
            var salesDto = _salesService.GetDailySales();
            var salesViewModel = _mapper.Map<IEnumerable<SaleViewModel>>(salesDto);
            return Ok(salesViewModel);
        }

        [HttpGet("weekly-sales")]
        public IActionResult GetWeeklySales()
        {
            var salesDto = _salesService.GetWeeklySales();
            var salesViewModel = _mapper.Map<IEnumerable<SaleViewModel>>(salesDto);
            return Ok(salesViewModel);
        }

        [HttpGet("monthly-sales")]
        public IActionResult GetMonthlySales()
        {
            var salesDto = _salesService.GetMonthlySales();
            var salesViewModel = _mapper.Map<IEnumerable<SaleViewModel>>(salesDto);
            return Ok(salesViewModel);
        }

        [HttpGet("total-daily-profit")]
        public IActionResult GetTotalDailyProfit()
        {
            var totalProfit = _salesService.GetTotalDailyProfit();
            return Ok(new { TotalDailyProfit = totalProfit });
        }

        [HttpGet("total-weekly-profit")]
        public IActionResult GetTotalWeeklyProfit()
        {
            var totalProfit = _salesService.GetTotalWeeklyProfit();
            return Ok(new { TotalWeeklyProfit = totalProfit });
        }

        [HttpGet("total-monthly-profit")]
        public IActionResult GetTotalMonthlyProfit()
        {
            var totalProfit = _salesService.GetTotalMonthlyProfit();
            return Ok(new { TotalMonthlyProfit = totalProfit });
        }

        [HttpPost]
        public IActionResult AddSale([FromBody] AddSaleViewModel saleViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var saleDto = _mapper.Map<SaleDto>(saleViewModel);
            _salesService.AddSale(saleDto);

            return Ok("Sale added successfully");
        }

        [HttpDelete("delete-all-sales")]
        public IActionResult DeleteAllSales()
        {
            try
            {
                _salesService.DeleteAllSales();
                return Ok("All sales deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
