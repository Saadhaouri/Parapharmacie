using Domaine.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Infra.Database;

public class ParaDbContext : DbContext
{



    public ParaDbContext(DbContextOptions<ParaDbContext> options) : base(options)
    {
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }

    public DbSet<Promotion> Promotions { get; set; }


  

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Add entity configurations here if needed
        // Example: modelBuilder.ApplyConfiguration(new ProductConfiguration());
    }


}

