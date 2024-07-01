using Domaine.Entities;
using Microsoft.AspNetCore.Identity;

namespace Core.Application.Interface.IRepositories
{
    public interface IAccountRepository
    {
        Task<IdentityResult> SignUpAsync(SignUpUser signUpUser);
        Task<string> LoginAsync(SignInUser signInUser);
        Task<IdentityResult> ChangePasswordAsync(string userId, string currentPassword, string newPassword);
        Task<string> GeneratePasswordResetTokenAsync(string email);
        Task<IdentityResult> ResetPasswordAsync(string email, string token, string newPassword);
    }
}
