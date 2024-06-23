using System.ComponentModel.DataAnnotations;

namespace Core.Application.Dto_s;

public class SignInUserDto
{
    [Required(ErrorMessage = "Username or email is required.")]
    public string UsernameOrEmail { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}
