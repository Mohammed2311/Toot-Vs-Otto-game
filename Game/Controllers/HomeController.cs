using Game.Models.context;
using Game.Models.DataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Game.Controllers
{
    public class HomeController : Controller
    {

        private MoContext _context = new MoContext();
       
        public IActionResult Index()
        {
            return View();
        }

       
        [HttpGet]
        public IActionResult login()
        {

            return View();
        }
        [HttpPost]
        public IActionResult login(string name , string id)
        {
            var c = _context.Players.Where(p=>p.Name.ToLower() == name.ToLower()).FirstOrDefault();
            if (c==null)
            {
                var player = new Player()
                {
                    Name = name,
                    LastWinningMove = "",
                    TimesOfWinning = 0,
                    NumberOfGames = 1
                };
                _context.Players.Add(player);
                _context.SaveChanges();

            }
            else
            {
                c.NumberOfGames++;
                _context.SaveChanges();
            }
            
            if (id =="cpu")
            {
                return RedirectToAction("cpu");
            }
            else
            {
                return RedirectToAction("login2");
            }
           

            


            
        }
        [HttpGet]
        public IActionResult login2()
        {

            return View();
        }
        [HttpPost]
        public IActionResult login2(string name)
        {
            var c = _context.Players.Where(p => p.Name.ToLower() == name.ToLower()).FirstOrDefault();
            if (c == null)
            {
                var player = new Player()
                {
                    Name = name,
                    LastWinningMove = "",
                    TimesOfWinning = 0,
                    OttoNumber = 0,
                    TootNumber = 0,
                    NumberOfGames = 1
                };
                _context.Players.Add(player);
                _context.SaveChanges();

            }
            else
            {
                c.NumberOfGames++;
                _context.SaveChanges();
            }
            
            return RedirectToAction("twoplaiers");
        }
        [HttpGet]
        public IActionResult twoplaiers()
        {
            return View();
        }
        [HttpGet]
        public IActionResult cpu()
        {
            return View();
        }
        [HttpPost]
        public IActionResult addWinner2Players(string name  ,string Player2Name)
        {
         
                var loser = _context.Players.Where(p => p.Name.ToLower() == Player2Name.ToLower()).FirstOrDefault();
                
                loser.NumberOfGames++;
                var player = _context.Players.Where(p => p.Name == name).FirstOrDefault();
                
                player.NumberOfGames++;
                
                _context.SaveChanges();
                return RedirectToAction("twoplaiers");
            
        }
        [HttpPost]
        public IActionResult addWinnerVsComputer(string name , string player2Name)
        {
            if (name!=null)
            {
                var player = _context.Players.Where(p => p.Name == name).FirstOrDefault();
                player.NumberOfGames++;
            }

            if (player2Name!=null)
            {
                var loser = _context.Players.Where(p => p.Name ==player2Name).FirstOrDefault();
                loser.NumberOfGames++;
            }

                return RedirectToAction("cpu");
            

        }

        [HttpPost]
         
        public JsonResult makeReq(string winnerName, string move, string loser)
        {
            if (winnerName != "null" && move != "null")
            {
                var player = _context.Players.Where(p => p.Name == winnerName).FirstOrDefault();
                player.TimesOfWinning++;
                player.LastWinningMove = move;
                if (move.ToLower() == "toot")
                {
                    player.TootNumber++;
                }
                else
                {
                    player.OttoNumber++;
                }
                _context.SaveChanges();
                return Json(player);
            }

            else
            {
                
                if (loser != "null")
                {
                    var loser1 = _context.Players.Where(p => p.Name == loser).FirstOrDefault();
                    loser1.NumberOfLosses++;
                    _context.SaveChanges();
                }

                return Json("");

            }
        }
        [HttpPost]
        public JsonResult makeReq2(string winnerName, string move, string loser)
        {
            if (winnerName != "null" && move != "null" && loser !="null")
            {
                var player = _context.Players.Where(p => p.Name == winnerName).FirstOrDefault();
                var loser1 = _context.Players.Where(p => p.Name == loser).FirstOrDefault();
                loser1.NumberOfLosses++;
                player.TimesOfWinning++;
                player.LastWinningMove = move;
                if (move.ToLower() == "toot")
                {
                    player.TootNumber++;
                }
                else
                {
                    player.OttoNumber++;
                }
                _context.SaveChanges();
                return Json(player);
            }

            else
            {

                if (loser != "null")
                {
                    var loser1 = _context.Players.Where(p => p.Name == loser).FirstOrDefault();
                    loser1.NumberOfGames++;
                    loser1.NumberOfLosses++;
                    _context.SaveChanges();
                }

                return Json("");

            }
        }
    }
}
