
function B_rest_1(){
    player.B.points=new ExpantaNum(0),             // "points" 是这一个 layer 资源的内部名
        player.B.distance= n(0),
        player.B.speed_one=n(1),//速度的基础值
        player.B.speed= n(0),
        player.B.distance_display= 0,
        player.B.distance_1=n(1), //基础耐力
        player.B.distance_1_true=n(1),//一单位距离（计算完成的最终耐力）
        player.B.stamina=n(0), // 体力值
        player.B.stamina_max=new ExpantaNum(1), // 体力最大值
        player.B.stamina_can_use=new ExpantaNum(100), // 是否休息完成可以释放体力,体力的计算方式为每秒恢复最大体力的5%（默认），每行走1单位距离(单位会增加)消耗1体力\
        player.B.no_stamina_times= n(0)
}



addLayer("B", {
    startData() { return {                  // startData 是一个返回玩家初始数据的函数
        unlocked: true,                     // 你可以添加更多的变量，这会成为你的 layer 的变量
        points: new ExpantaNum(0),             // "points" 是这一个 layer 资源的内部名
        distance: n(0),
        speed_one:n(1),//速度的基础值
        speed: n(0),
        distance_display: 0,
        distance_1:n(1), //基础耐力
        distance_1_true:n(1),//一单位距离（计算完成的最终耐力）
        stamina:n(0), // 体力值
        stamina_max:new ExpantaNum(1), // 体力最大值
        stamina_can_use:new ExpantaNum(100), // 是否休息完成可以释放体力,体力的计算方式为每秒恢复最大体力的5%（默认），每行走1单位距离(单位会增加)消耗1体力\
        no_stamina_times: n(0)


    }},

    color: "#750000",                       // 这一 layer 的颜色，会影响很多东西
    resource: "硼",            // 这一 layer 主要声望点的名字
    row: 0,                                 // 这一 layer 所处的行 (0 是第一行)

    baseResource: "距离",                 // 获取这一 layer 主要声望点所需要的资源名
    baseAmount() { return player.B.distance },  // 一个返回当前 layer 基本资源量的函数

    requires: new ExpantaNum(1),              // 获取第一个这一 layer 声望点所需资源数量
    update(diff){
        //决定距离的显示单位0=米，1=1光年，2=1宇宙，3=1多元宇宙
        if(player.B.distance.lt(9460730472580800)){player.B.distance_display = 0}
        if(player.B.distance.gte(9460730472580800)&&player.B.distance.lt(8.79e26)){player.B.distance_display = 1}
        if(player.B.distance.gte(8.79e26)&&player.B.distance.lt("1ee4")){player.B.distance_display = 2}
        if(player.B.distance.gte("1ee4")){player.B.distance_display = 3}
        //距离的获得
        if(player.B.stamina_can_use.eq(1)){player.B.distance = player.B.distance.add(player.B.speed.mul(diff))}
        if(player.B.stamina_can_use.eq(1)){player.B.speed = n(player.B.speed_one)}
        //体力的减少
        if(player.B.stamina.eq(player.B.stamina_max))player.B.stamina_can_use = n(1)//体力到上限休息完毕
        //耐力的计算
        player.B.distance_1_true = player.B.distance_1
        if(hasUpgrade('B', 14))player.B.distance_1_true = player.B.distance_1_true.add(upgradeEffect('B',14))
        
        if(player.B.stamina_can_use.eq(1)){{player.B.stamina = player.B.stamina.sub(player.B.speed.div(player.B.distance_1_true).mul(diff)).max(0)}}//  速度/单位
        if(player.B.stamina.eq(0)){player.B.stamina_can_use = n(0)    ,    player.B.no_stamina_times = player.B.no_stamina_times.add(1)}//体力耗尽执行
        //体力的恢复
        if(player.B.stamina_can_use.eq(0)){player.B.stamina = player.B.stamina.add(player.B.stamina_max.div(20).mul(diff)).min(player.B.stamina_max)}
    },                                  // 同样是解锁这一 layer 所需的资源数量

    type: "normal",                         // 定义这一 layer 声望点获取公式
    exponent: 1,                          // "normal" 获取到的是 (currency^exponent)

    gainMult() {     
        if(player.B.distance.lt(9460730472580800)||!player.B.points.lt(1)){                      // 返回对于这一 layer 声望点获取增益（乘数）
        return new ExpantaNum(0)   }
        else {
            return new ExpantaNum(1).mul(1)  
        }           // 升级或其他地方获取到的乘数因子，在这里生效
    },
    gainExp() {                             // 返回对于这一 layer 声望点获取增益（指数）
        return new ExpantaNum(1)
    },

    layerShown() { return true },          // 返回一个 Boolean，表示这个 layer 的节点是否出现在树上
    
    upgrades: {
        11: {
            title:"体质增强！",
            description:"你意识到想要走的更远就需要锻炼" ,
            cost: new ExpantaNum(0),
            canAfford(){player.B.distance.gte(20)},
            pay(){player.B.distance.gte(0)},
            tooltip: "很简单，体力最大值*2",
            style:{"border-radius":"0px"},
            onPurchase(){return player.B.stamina_max = player.B.stamina_max.mul(2)},
            currencyDisplayName:"距离"
        },
        12: {
            title:"Run Quickly！",
            description:"跑得稍微快一点！" ,
            cost: new ExpantaNum(0),
            canAfford(){player.B.distance.gte(20)},
            pay(){player.B.distance.gte(0)},
            tooltip: "速度+1",
            style:{"border-radius":"0px"},
            onPurchase(){return player.B.speed_one = player.B.speed_one.add(1)},
            currencyDisplayName:"距离"
        },
        13: {
            title:"坚持住！",
            description:"让你的耐力增加" ,
            cost: new ExpantaNum(0),
            canAfford(){player.B.distance.gte(20)},
            pay(){player.B.distance.gte(0)},
            tooltip: "单位距离+0.5",
            style:{"border-radius":"0px"},
            onPurchase(){return player.B.distance_1 = player.B.distance_1.add(0.5)},
            currencyDisplayName:"距离"
        },
        14: {
            title:"该来的还是会来！",
            description:function(){
                return "你每次耗尽体力都会增加0.05以及0.5%的耐力<br>当前 : "+"x"+format(upgradeEffect(this.layer, this.id))
            },
            cost: new ExpantaNum(0),        
            canAfford(){player.B.distance.gte(20)},
            pay(){player.B.distance.gte(0)},
            tooltip: "你已经精疲力尽了不知道多少次了",
            style:{"border-radius":"0px","height": "200px","width": "200px"},
            currencyDisplayName:"距离",
            effect() {
                return n(1).add(new ExpantaNum( 0.05).mul(player.B.no_stamina_times)).mul(new ExpantaNum( 0.005).mul(player.B.no_stamina_times).mul(player.B.distance_1))//用基础耐力进行计算
            },
        },
    

        
    },

    clickables: {
        11: {
            display() {return "Blah"},
            
        }
        
    },
    bars: {
        diatanse_to_1ly: {
            fillStyle : { 'background-color': "#750000"},
            // baseStyle : {'background-color' : "#00AAAA"},
            textStyle : {' color': "#0000FF"},
            direction: RIGHT,
            width: 600,
            height: 20,
            progress() { return player.B.distance.add(1).log(10).div(15.975924670013155221676799569856)},
            display(){return format(player.B.distance.add(1).log(10).div(15.97).mul(100)) + '%'},
            
            
            
        },  
        stamina: {
            fillStyle : { 'background-color': "#00AA88"},
            // baseStyle : {'background-color' : "#00AAAA"},
            textStyle : {' color': "#0000FF"},
            direction: RIGHT,
            width: 600,
            height: 50,
            progress() { return player.B.stamina.div(player.B.stamina_max)},
            display(){return "你剩余"+format(player.B.stamina) +'/'+ format(player.B.stamina_max)+'体力'},
            
            
            
        },  
        
    },
    tabFormat: {
        "硼": {
            content: [
                "main-display",

                {"color": "blue"},
                "blank",
                ["toggle", ["c", "beep"]],
                "milestones",
                "blank",
                "blank",
                
            ],
            
        },
        "伟大的探索": {
            content: [
                "main-display",
                ["display-text",
                function() {if(player.B.distance.lt(9460730472580800)){return '你通过未知的手段知道的硼的存在，但是有一个坏消息:你需要亲自去寻找它。'}else{return''}},
                { "color": "yellow", "font-size": "20px"}],
                ['bar','diatanse_to_1ly'],
                ["display-text",
                function() {if(player.B.distance.gte(9460730472580800)){return '恭喜你找到了硼，你可以开采硼了,这个面板会一直存在'}else{return''}},
                { "color": "yellow", "font-size": "20px"}],
                "blank",
                ["display-text",
                    function() {switch(player.B.distance_display){ 
                        case 0:{return '你已经前进了 <text style="color:yellow">' + format(player.B.distance) + '</text> 米' }
                        case 1:{return '你已经前进了 <text style="color:yellow">' + format(player.B.distance.div(9460730472580800)) + '</text> 光年' }
                        case 2:{return '你已经前进了 <text style="color:yellow">' + format(player.B.distance.div(8.79e26)) + '</text> 宇宙' }
                        case 3:{return '你已经前进了 <text style="color:yellow">' + format(player.B.distance.logbase("1ee4")) + '</text> 多元宇宙' }
                    }},
                    { "color": "white", "font-size": "20px", }
                ],
                ["display-text",
                function() {switch(player.B.distance_display){ 
                    case 0:{return '你当前速度为 <text style="color:yellow">' + format(player.B.speed) + 'm/s</text>' }
                    case 1:{return '你当前速度为 <text style="color:yellow">' + format(player.B.speed.div(9460730472580800)) + 'ly/s</text>' }
                    case 2:{return '你当前速度为 <text style="color:yellow">' + format(player.B.speed.div(8.79e26)) + 'un/s</text>' }
                    case 3:{return '你当前速度为 <text style="color:yellow">' + format(player.B.speed.logbase("1ee4")) + 'mun/s</text>' }
                }},
                { "color": "white", "font-size": "20px", }],
                //#00AA88
                ["display-text",
                function() {return "因为你的耐力(单位距离)为<text style='color:yellow'>"+format(player.B.distance_1_true)+"</text><br>"
                +"所以你现在每秒消耗 <text style='color:#00AA88'>"+format(player.B.speed.div(player.B.distance_1_true))+'</text> 体力'},
                 { "color": "white", "font-size": "20px", }],
                 ["display-text",
                function() {return "公式：体力消耗=速度/单位体力"},
                 { "color": "white", "font-size": "20px", }],
                 "blank",
                ['bar','stamina'],
                "blank",
                ["toggle", ["c", "beep"]],  
                "milestones",
                "blank",
                "blank",
                ["row",["upgrades",[11,12,13]]],
                ["row",["clickables",[11]]],
            ],
            
      },      
    }
    
})