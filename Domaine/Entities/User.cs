
using Microsoft.AspNetCore.Identity;

namespace Domaine.Entities;

public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string ?ProfileImage { get; set; }
    public string ?Status { get; set; }
    public virtual Address ?Address { get; set; }
}
