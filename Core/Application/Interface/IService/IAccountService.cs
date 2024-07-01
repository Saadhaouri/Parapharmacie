using Core.Application.Dto_s;
using Microsoft.AspNetCore.Identity;

namespace Core.Application.Interface.IService
{
    public interface IAccountService
    {
        Task<IdentityResult> SignUpAsync(SignUpUserDto signUpUser);
        Task<string> LoginAsync(SignInUserDto signInUser);
        Task<IdentityResult> ChangePasswordAsync(string userId, string currentPassword, string newPassword);
        Task<string> GeneratePasswordResetTokenAsync(string email);
        Task<IdentityResult> ResetPasswordAsync(string email, string token, string newPassword);
    }
}
