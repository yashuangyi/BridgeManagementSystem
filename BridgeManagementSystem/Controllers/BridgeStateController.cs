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
    public class BridgeStateController : Controller
    {
        public static SqlSugarClient db = DataBase.CreateClient();
        // GET: BridgeState
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ShowBridgeState(int page, int limit)
        {
            //须返回数据条数
            int count = db.Queryable<BridgeState>().Count();

            //分页操作，Skip()跳过前面数据项
            List<BridgeStateDTO> list = db.Queryable<Bridge, BridgeState>((bridge, bridgeState) => new object[]
            {
                JoinType.Inner,bridge.Id==bridgeState.BridgeId
            }
            ).Select((bridge, bridgeState) => new BridgeStateDTO{Id=bridgeState.Id,BridgeName = bridge.Name,Time=bridgeState.Time,
            LeftPart=bridgeState.LeftPart,RightPart=bridgeState.RightPart,TopPart=bridgeState.TopPart,
            BottomPart=bridgeState.BottomPart}).Skip((page - 1) * limit).Take(limit).ToList();

            //参数必须一一对应，JsonRequestBehavior.AllowGet一定要加，表单要求code返回0
            return Json(new { code = 0, msg = "", count, data = list }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditBridgeState(BridgeState bridgeState)
        {
            if (bridgeState.Time == null || bridgeState.TopPart == null || bridgeState.BottomPart == null || bridgeState.LeftPart == null || bridgeState.RightPart == null)//输入框为空
            {
                return Json(new { code = 401 }, JsonRequestBehavior.AllowGet);
            }

            var getBridgeId = db.Queryable<BridgeState>().Where(it => it.Id == bridgeState.Id).ToList();
            BridgeState newBridgeState = new BridgeState
            {
                Id = bridgeState.Id,
                BridgeId = getBridgeId[0].Id,
                Time = bridgeState.Time,
                TopPart = bridgeState.TopPart,
                BottomPart = bridgeState.BottomPart,
                LeftPart = bridgeState.LeftPart,
                RightPart = bridgeState.RightPart
            };
            db.Updateable(newBridgeState).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteBridgeState(BridgeState bridgeState)
        {
            db.Deleteable<BridgeState>().In(bridgeState.Id).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}