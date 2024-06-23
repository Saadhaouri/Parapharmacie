namespace Domaine.Entities;

public class Supplier
{
    public Guid SupplierID  { get; set; }
    public required string  Name { get; set; }
    public string ContactPerson { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }

    // Navigation property for orders
    public ICollection<Order> Orders { get; set; }
}
