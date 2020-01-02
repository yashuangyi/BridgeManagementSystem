using BridgeManagementSystem.Database;
using BridgeManagementSystem.Models;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BridgeManagementSystem.Controllers
{
    public class StateRegisterController : Controller
    {
        public static SqlSugarClient db = DataBase.CreateClient();
        // GET: StateRegister
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ShowChoice()
        {
            List<Bridge> all = db.Queryable<Bridge>().ToList();
            List<string> choice = new List<string>();
            foreach(Bridge bridge in all)
            {
                choice.Add(bridge.Id + "  " + bridge.Name);
            }
            return Json(new { code = 200,choice },JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        public ActionResult Submit(BridgeStateDTO inform)
        {
            if (inform.BridgeName == null || inform.Time == null)//输入框为空
            {
                return Json(new { code = 401 }, JsonRequestBehavior.AllowGet);
            }
            var bridgeId = Convert.ToInt32(inform.BridgeName.Split(' ')[0]);

            var ifExist = db.Queryable<BridgeState>().Where(it => it.BridgeId == bridgeId && it.Time == inform.Time).ToList();
            if (ifExist.Count != 0)//已存在同桥梁同时间的记录
            {
                return Json(new { code = 404 }, JsonRequestBehavior.AllowGet);
            }

            var list = db.Queryable<BridgeState>().ToList();
            int id = 0;
            if (list != null)
            {
                id = list[list.Count - 1].Id + 1;
            }

            BridgeState bridgeState = new BridgeState
            {
                Id = id,
                BridgeId = bridgeId,
                Time = inform.Time,
                LeftPart = inform.LeftPart,
                RightPart = inform.RightPart,
                TopPart = inform.TopPart,
                BottomPart = inform.BottomPart
            };
            db.Insertable(bridgeState).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}