using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Models.DataBase
{
    public class Player
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string LastWinningMove { get; set; }
        public  int TimesOfWinning { get; set; }
        public int TootNumber { get; set; }
        public int OttoNumber { get; set; }
        public int NumberOfGames { get; set; }
        public string Player2Name { get; set; }
        public int NumberOfLosses { get; set; }
    }
}
