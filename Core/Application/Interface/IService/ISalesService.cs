using Core.Application.Dto_s;
using System.Collections.Generic;

namespace Core.Application.Interface.IService
{
    public interface ISalesService
    {
        void AddSale(SaleDto saleDto);
        IEnumerable<SaleDto> GetDailySales();
        IEnumerable<SaleDto> GetWeeklySales();
        IEnumerable<SaleDto> GetMonthlySales();
        decimal GetTotalDailyProfit();
        decimal GetTotalWeeklyProfit();
        decimal GetTotalMonthlyProfit();
    }
}
