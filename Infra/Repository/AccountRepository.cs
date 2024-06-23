using Core.Application.Interface.IRepositories;
using Domaine.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infra.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<User> _userManager1;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public AccountRepository(UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IHttpContextAccessor httpContextAccessor
            )
        {
            _userManager1 = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;

        }


        public async Task<IdentityResult> SignUpAsync(SignUpUser signUpUser)
        {
            var user = new User()
            {
                FirstName = signUpUser.FirstName,
                LastName = signUpUser.LastName,
                Email = signUpUser.Email,
                UserName = signUpUser.Email
            };

            return await _userManager1.CreateAsync(user, signUpUser.Password);

        }

        public async Task<string> LoginAsync(SignInUser signInUser)
        {
            var result = await _signInManager.PasswordSignInAsync(signInUser.UsernameOrEmail, signInUser.Password, false, false);

            if (!result.Succeeded)
            {
                return null;
            }

            // Retrieve the user from the username or email
            var user = await _userManager1.FindByNameAsync(signInUser.UsernameOrEmail) ??
                       await _userManager1.FindByEmailAsync(signInUser.UsernameOrEmail);

            if (user == null)
            {
                return null; // Or handle the error as needed
            }

            var authClaims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, signInUser.UsernameOrEmail),
        new Claim(ClaimTypes.NameIdentifier, user.Id), // Use the user's ID from UserManager
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var authSigninKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"], // Fix potential typo here: "Jwt : Audience" -> "Jwt:Audience"
                expires: DateTime.Now.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<IdentityResult> ChangePasswordAsync(string userId, string currentPassword, string newPassword)
        {
            var user = await _userManager1.FindByIdAsync(userId);
            if (user == null)
            {
                // User not found
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }

            // Attempt to change the password
            return await _userManager1.ChangePasswordAsync(user, currentPassword, newPassword);
        }


    }

}
