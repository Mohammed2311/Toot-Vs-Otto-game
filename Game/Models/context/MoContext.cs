using Game.Models.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Models.context
{
    public class MoContext:DbContext
    {
        public DbSet<Player> Players { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source = .;Initial Catalog = Game123;Integrated Security = true;");
            
        }
    }
}
