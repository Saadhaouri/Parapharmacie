using AutoMapper;
using Core.Application.Dto_s;
using Core.Application.Interface.IRepositories;
using Core.Application.Interface.IService;
using Domaine.Entities;

public class SalesService : ISalesService
{
    private readonly IProductRepository _productRepository;
    private readonly ISalesRepository _salesRepository;
    private readonly IPromotionRepository _promotionRepository;
    private readonly IMapper _mapper;

    public SalesService(
        IProductRepository productRepository,
        ISalesRepository salesRepository,
        IPromotionRepository promotionRepository,
        IMapper mapper)
    {
        _productRepository = productRepository;
        _salesRepository = salesRepository;
        _promotionRepository = promotionRepository;
        _mapper = mapper;
    }

    public void AddSale(SaleDto saleDto)
    {
        var sale = _mapper.Map<Sale>(saleDto);
        sale.Id = Guid.NewGuid();
        sale.SaleDate = DateTime.UtcNow;
        var product = _productRepository.GetProductById(sale.ProductId);

        if (product == null || product.Quantity < sale.Quantity)
        {
            throw new InvalidOperationException("Product not available or insufficient stock.");
        }

        // Check for active promotions
        var promotion = _promotionRepository.GetActivePromotionForProduct(sale.ProductId);
        if (promotion != null)
        {
            var discount = (promotion.Discount / 100) * product.Price;
            var discountedPrice = product.Price - discount;
            sale.Price = discountedPrice * sale.Quantity;
        }
        else
        {
            sale.Price = product.Price * sale.Quantity;
        }

        sale.Profit = (product.PriceForSale - product.Price) * sale.Quantity;

        _salesRepository.Add(sale);

        // Update the stock
        product.Quantity -= sale.Quantity;
        _productRepository.Save();
    }

    public IEnumerable<SaleDto> GetDailySales()
    {
        var sales = _salesRepository.GetSales()
            .Where(s => s.SaleDate.Date == DateTime.UtcNow.Date);
        return _mapper.Map<IEnumerable<SaleDto>>(sales);
    }

    public IEnumerable<SaleDto> GetWeeklySales()
    {
        var startDate = DateTime.UtcNow.AddDays(-((int)DateTime.UtcNow.DayOfWeek + 1));
        var sales = _salesRepository.GetSales()
            .Where(s => s.SaleDate.Date >= startDate && s.SaleDate.Date <= DateTime.UtcNow.Date);
        return _mapper.Map<IEnumerable<SaleDto>>(sales);
    }

    public IEnumerable<SaleDto> GetMonthlySales()
    {
        var startDate = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
        var sales = _salesRepository.GetSales()
            .Where(s => s.SaleDate.Date >= startDate && s.SaleDate.Date <= DateTime.UtcNow.Date);
        return _mapper.Map<IEnumerable<SaleDto>>(sales);
    }

    public decimal GetTotalDailyProfit()
    {
        var sales = _salesRepository.GetSales()
            .Where(s => s.SaleDate.Date == DateTime.UtcNow.Date);
        return sales.Sum(s => s.Profit);
    }

    public decimal GetTotalWeeklyProfit()
    {
        var startDate = DateTime.UtcNow.AddDays(-((int)DateTime.UtcNow.DayOfWeek + 1));
        var sales = _salesRepository.GetSales()
            .Where(s => s.SaleDate.Date >= startDate && s.SaleDate.Date <= DateTime.UtcNow.Date);
        return sales.Sum(s => s.Profit);
    }

    public decimal GetTotalMonthlyProfit()
    {
        var startDate = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
        var sales = _salesRepository.GetSales()
            .Where(s => s.SaleDate.Date >= startDate && s.SaleDate.Date <= DateTime.UtcNow.Date);
        return sales.Sum(s => s.Profit);
    }
}
