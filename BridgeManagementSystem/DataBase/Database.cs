using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BridgeManagementSystem.Database
{
    public class DataBase
    {
        private static SqlSugarClient _db = null;

        public static string ConnectionString = "Data Source=localhost;Initial Catalog=czy;User id=root;Password=asd123456";
        public static SqlSugarClient CreateClient()
        {
            _db = new SqlSugarClient(new ConnectionConfig()
            {
                ConnectionString = ConnectionString,
                DbType = DbType.MySql,//设置数据库类型
                IsAutoCloseConnection = false,//是否自动释放数据事务
                InitKeyType = InitKeyType.Attribute,//从实体特性中读取主键自增列信息
            });
            return _db;
        }
    }
}