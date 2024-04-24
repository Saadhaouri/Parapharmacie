using Core.Application.Interface.IRepositories;
using Infra.Database;
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

builder.Services.AddScoped<IUserRepository  , UserRepository>();
builder.Services.AddScoped<ICategoryRepository ,  CategoryRepository>();
builder.Services.AddScoped<IClientRepository , ClientRepository>();
builder.Services.AddScoped<IProductRepository , ProductRepository>();
builder.Services.AddScoped<IPromotionRepository, PromotionRepository>();

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
