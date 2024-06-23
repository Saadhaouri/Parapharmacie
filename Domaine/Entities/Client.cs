namespace Domaine.Entities;

public class Client
{
    public Guid ClientID { get; set; }
    public string Firstname { get; set; }
    public string LastName { get; set; }
    public string CIN  { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public AddressClient Address { get; set; }
    public virtual ICollection<Order> Orders { get; set; }
    public ICollection<Debt> Debts { get; set; } 

}

