using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BridgeManagementSystem.Models
{
    [SugarTable("bridge")]
    public class Bridge
    {
        public Bridge()
        {

        }

        /// <summary>
        /// Desc:地址
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Address { get; set; }

        /// <summary>
        /// Desc:管理单位
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Unit { get; set; }

        /// <summary>
        /// Desc:桥梁类型
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Type { get; set; }

        /// <summary>
        /// Desc:桥梁编号
        /// Default:
        /// Nullable:False
        /// </summary>           
        [SugarColumn(IsPrimaryKey = true)]
        public int Id { get; set; }

        /// <summary>
        /// Desc:桥梁名称
        /// Default:
        /// Nullable:True
        /// </summary>           
        public string Name { get; set; }
    }
}