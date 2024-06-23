using System.ComponentModel.DataAnnotations;
namespace Domaine.Entities;


public class SignInUser : User
{
    [Required(ErrorMessage = "Username or email is required.")]
    public required string UsernameOrEmail { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    [DataType(DataType.Password)]
    public required string Password { get; set; }
}
