namespace Domaine.Entities;

public class Client
{
    public Guid ClientID { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public string PhoneNumber { get; set; }
    public virtual ICollection<Order> Orders { get; set; }

}

