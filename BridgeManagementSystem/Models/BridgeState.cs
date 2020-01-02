using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BridgeManagementSystem.Models
{
    [SugarTable("bridge_state")]
    public class BridgeState
    {
        public BridgeState()
        {

        }

        /// <summary>
        /// Desc:登记年份
        /// Default:
        /// Nullable:True
        /// </summary>           
        public int? Time { get; set; }

        /// <summary>
        /// Desc:左幅健康情况
        /// Default:
        /// Nullable:True
        /// </summary>           
        public int? LeftPart { get; set; }

        /// <summary>
        /// Desc:右幅健康情况
        /// Default:
        /// Nullable:True
        /// </summary>           
        public int? RightPart { get; set; }

        /// <summary>
        /// Desc:上部结构健康情况
        /// Default:
        /// Nullable:True
        /// </summary>           
        public int? TopPart { get; set; }

        /// <summary>
        /// Desc:下部结构健康情况
        /// Default:
        /// Nullable:True
        /// </summary>           
        public int? BottomPart { get; set; }

        /// <summary>
        /// Desc:管养信息编号
        /// Default:
        /// Nullable:False
        /// </summary>           
        [SugarColumn(IsPrimaryKey = true)]
        public int Id { get; set; }

        /// <summary>
        /// Desc:桥梁编号
        /// Default:
        /// Nullable:True
        /// </summary>           
        public int? BridgeId { get; set; }
    }
}