using AutoMapper;
using BetyParaAPI.ViewModel;
using Core.Application.Dto_s;
using Core.Application.Interface.IService;
using Microsoft.AspNetCore.Mvc;

namespace BetyParaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public AccountController(IAccountService accountService, IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] RegisterViewModel registerViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var signUpUserDto = _mapper.Map<SignUpUserDto>(registerViewModel);
            var result = await _accountService.SignUpAsync(signUpUserDto);

            if (result.Succeeded)
            {
                // Registration successful
                return Ok(new { Message = "Registration successful" });
            }
            else
            {
                // Registration failed, return error messages
                var errors = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(new { Errors = errors });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] SignInViewModel signInViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var signInUserDto = new SignInUserDto
            {
                UsernameOrEmail = signInViewModel.UsernameOrEmail,
                Password = signInViewModel.Password
            };

            var token = await _accountService.LoginAsync(signInUserDto);

            if (token == null)
            {
                // Authentication failed
                return Unauthorized(new { Message = "Invalid username or password." });
            }

            // Authentication succeeded, return the token
            return Ok(new { Token = token });
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel changePasswordViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _accountService.ChangePasswordAsync(changePasswordViewModel.UserId, changePasswordViewModel.CurrentPassword, changePasswordViewModel.NewPassword);

            if (result.Succeeded)
            {
                // Password change successful
                return Ok(new { Message = "Password changed successfully" });
            }
            else
            {
                // Password change failed, return error messages
                var errors = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(new { Errors = errors });
            }
        }
    }
}
