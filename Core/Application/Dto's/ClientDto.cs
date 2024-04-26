namespace Core.Application.Dto_s;
public class ClientDto
{
    public Guid ClientID { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public virtual ICollection<OrderDto> Orders { get; set; }

}

