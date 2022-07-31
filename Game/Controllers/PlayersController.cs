using Game.Models.context;
using Microsoft.AspNetCore.Mvc;
using System;

using System.Linq;

namespace Game.Controllers
{
    public class PlayersController : Controller
    {
        MoContext _context = new MoContext();
        public IActionResult Index()
        {
            ViewBag.x = _context.Players.Select(p => p.TootNumber).Sum();
            ViewBag.y = _context.Players.Select(p => p.OttoNumber).Sum();
            var heighScore = _context.Players.Select(p => p.TimesOfWinning).Max();
            ViewBag.z = heighScore;
            var lowScore = _context.Players.Select(p => p.TimesOfWinning).Min();
            ViewBag.lowest = lowScore;
            ViewBag.loser = _context.Players.Where(p => p.TimesOfWinning == lowScore).Select(p => p.Name).FirstOrDefault();

            ViewBag.t = _context.Players.Where(p => p.TimesOfWinning == heighScore).Select(p=>p.Name).FirstOrDefault();
            var data = _context.Players.ToList();
            return View(data);
        }
    }
}
