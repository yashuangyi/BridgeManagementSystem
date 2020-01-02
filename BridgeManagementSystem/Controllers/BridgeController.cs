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
    public class BridgeController : Controller
    {
        public static SqlSugarClient db = DataBase.CreateClient();
        // GET: Data
        public ActionResult Index()
        {
            return View();
        }
    /// <summary>
    /// 
    /// </summary>
    /// <param name="page">页码</param>
    /// <param name="limit">行数</param>
    /// <returns></returns>
        [HttpGet]
        public JsonResult ShowBridge(int page,int limit)
        {
            //须返回数据条数
            int count = db.Queryable<Bridge>().Count();
            //分页操作，Skip()跳过前面数据项
            List<Bridge> list = db.Queryable<Bridge>().Skip((page - 1) * limit).Take(limit).ToList();
            //参数必须一一对应，JsonRequestBehavior.AllowGet一定要加，表单要求code返回0
            return Json( new { code=0,msg="",count,data=list}, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddBridge(Bridge bridge)
        {
            if (bridge.Name == null || bridge.Address == null || bridge.Unit == null || bridge.Type == null)//输入框为空
            {
                return Json(new { code = 401 },JsonRequestBehavior.AllowGet);
            }

            var list = db.Queryable<Bridge>().ToList();
            int id = 0;
            if (list != null)
            {
                id = list[list.Count - 1].Id + 1;
            }

            var listMember = db.Queryable<BridgeMember>().ToList();
            int num = 0;
            if (listMember != null)
            {
                num = listMember[listMember.Count - 1].Id + 1;
            }
            BridgeMember bridgeMember = new BridgeMember
            {
                Id = num,
                BridgeId = id,
                LeftPart = "build",
                RightPart = "build",
                TopPart = "build",
                BottomPart = "build"
            };
            db.Insertable(bridge).ExecuteCommand();
            db.Insertable(bridgeMember).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditBridge(Bridge bridge)
        {
            if (bridge.Name == null || bridge.Address == null || bridge.Unit == null || bridge.Type == null)//输入框为空
            {
                return Json(new { code = 401 }, JsonRequestBehavior.AllowGet);
            }

            db.Updateable(bridge).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteBridge(Bridge bridge)
        {
            db.Deleteable<Bridge>().In(bridge.Id).ExecuteCommand();
            return Json(new { code = 200 }, JsonRequestBehavior.AllowGet);
        }
    }
}