using Core.Application.Interface.IRepositories;
<<<<<<< HEAD
using Core.Application.Interface.IService;
using Core.Application.Services;
=======
>>>>>>> origin/main
using Infra.Database;
using Infra.Repository;
using Microsoft.EntityFrameworkCore;
using Para.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<ParaDbContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection") ??
       throw new InvalidOperationException("Connection string is not found ")
  ));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

<<<<<<< HEAD
// AUTOMAPPER CONFIGURATION 
builder.Services.AddAutoMapper(typeof(Program));


=======
>>>>>>> origin/main
builder.Services.AddScoped<IUserRepository  , UserRepository>();
builder.Services.AddScoped<ICategoryRepository ,  CategoryRepository>();
builder.Services.AddScoped<IClientRepository , ClientRepository>();
builder.Services.AddScoped<IProductRepository , ProductRepository>();
builder.Services.AddScoped<IPromotionRepository, PromotionRepository>();
<<<<<<< HEAD
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IAddressRepository, AddressRepository>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService , ProductService>();
builder.Services.AddScoped<IPromotionService , PromotionService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IClientService , ClientService>();
builder.Services.AddScoped<IAddressService , AddressService>();


=======
>>>>>>> origin/main

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
