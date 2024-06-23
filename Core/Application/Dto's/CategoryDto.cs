namespace Core.Application.Dto_s
{
    public class CategoryDto
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public ICollection<ProductDto> Products { get; set; }
    }
}
