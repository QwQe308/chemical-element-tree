addLayer("h", {
    symbol: "H",
    position: 0,
    startData()
    {
        return{
            unlocked: true,
            points: new ExpantaNum(0),
            bestqingfenzi:n(0),
            qingfenzi:zero,totalqingfenzi:zero,
            fenziHp:n(10),fenziHpnow:n(10),
            power:n(1),total_dmg:n(0),
            qingqi:n(0),qingqiGain:n(0),
            upgrade_1_num:n(0),upgrade_2_num:n(0),
            upgrade_3_num:n(0),upgrade_4_num:n(0),

            unlock_water:zero,
            waterfenzi:zero,totalwaterfenzi:zero,
            water:zero,totalwater:zero,
            waterGain:zero,
            water_1_num:n(0),water_2_num:n(0),
            water_3_num:n(0),water_4_num:n(0),
            water_5_num:n(0),water_6_num:n(0),
            water_7_num:n(0),water_8_num:n(0),
            water_1_mult:n(1),water_2_mult:n(1),
            water_3_mult:n(1),water_4_mult:n(1),
            water_5_mult:n(1),water_6_mult:n(1),
            water_7_mult:n(1),water_8_mult:n(1),
            water_1_extra:n(0),water_2_extra:n(0),
            water_3_extra:n(0),water_4_extra:n(0),
            water_5_extra:n(0),water_6_extra:n(0),
            water_7_extra:n(0),water_8_extra:n(0),
            water_to_power:n(1),water_to_qingqi:n(1),
            water_auto_1_num:n(0),water_auto_2_num:n(0),
            water_upgrade_1_num:n(0),water_upgrade_2_num:n(0),
            water_upgrade_3_num:n(0),water_upgrade_4_num:n(0),
            water_speed:n(0),

            bing:n(0),shuizhengqi:n(0),bingGain:n(0),shuizhengqiGain:n(0),
            wendu_1:n(50),wendu_2:n(50),
            cold_cost:n(10),hot_cost:n(10),

            time_auto_1:n(0),time_auto_2:n(0),
            cost_1:n(200),cost_2:n(200),
            time_from:n(0),
            time_now:n(0),
            time_line:[],

            in_challenge_1:n(0),challenge_1_best:n(0),
            zangshui:n(0),zangshuiGain:n(0),

            has_mini_1:n(0),has_mini_2:n(0),has_mini_3:n(0),has_mini_4:n(0),has_mini_5:n(0),
            has_mini_6:n(0),has_mini_7:n(0),has_mini_8:n(0),has_mini_9:n(0),has_mini_10:n(0),
            on_which:"",
        }
    },
    color: "#6495ED",
    resource: "重置点",
    type: "normal",
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount(){return player.points},
    baseResource:"点数",
    tooltip()
    {
        return ""
    },
    gainMult()
    {
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp()
    {
        var exp = new ExpantaNum(1)
        return exp
    },
    bars:
    {
        HpBar:
        {
            direction: RIGHT,
            width: 400,
            height: 25,
            progress()
            {
                return player.h.fenziHpnow.div(player.h.fenziHp)
            },
            display()
            {
                if(player.h.qingfenzi.gte(3))
                return "耐久 "+format(player.h.fenziHpnow)+' / '+format(player.h.fenziHp)
                return "??? "+format(player.h.fenziHpnow)+' / '+format(player.h.fenziHp)
            },
            fillStyle()
            {
                return {"background-color":"grey"}
            },
        },
    },
    clickables:
    {
        "Fenzi":
        {
            display()
            {
                return '<h1><text style="font-family:Times new rome">H-'+format(player.h.qingfenzi.add(1))
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"100px","width":"200px","height":"200px","min-height":"200px","transition-duration":"0.5s","background-color":"#6495ED",
                        "box-shadow":"0px 0px 30px #6495ED"}},
            canClick(){return true},
            onClick(){
                var x=player.h.power
                x=x.mul(layers.h.upgrades[21].EFFECT())
                player.h.fenziHpnow=player.h.fenziHpnow.sub(x).max(0)
                player.h.total_dmg=player.h.total_dmg.add(x)
                player.h.time_line.push(player.h.time_now)
                if(player.h.fenziHpnow.eq(0))
                {
                    var gain=n(1)
                    gain=gain.mul(layers.h.clickables["Water-Upgrade-1"].EFFECT())
                    player.h.qingfenzi=player.h.qingfenzi.add(gain)
                    player.h.totalqingfenzi=player.h.totalqingfenzi.add(gain)
                    var x=player.h.qingfenzi
                    var y=n(0)
                    if(x.gte(100))x=x.div(100).pow(2).mul(100)
                    var z=n(0.5)
                    if(player.h.in_challenge_1.eq(0))z=z.div(layers.h.clickables["Water-Challenge-1"].EFFECT())
                    if(player.h.in_challenge_1.eq(1))z=z.mul(layers.h.clickables["Water-Challenge-1"].DEBUFF())
                    z=z.add(1)
                    y=n(10).mul(n(z).pow(x))
                    player.h.fenziHp=y
                    player.h.fenziHpnow=player.h.fenziHp
                }
                player.h.time_from=n(0)
            },
        },
        "H-Upgrade-1":
        {
            COST()
            {
                var x=player.h.upgrade_1_num
                if(x.gte(5))x=x.div(5).pow(2).mul(5)
                if(x.gte(100))x=x.div(100).pow(1.5).mul(100)
                var cost=n(10).mul(n(5).pow(x))
                return cost
            },
            EFFECT()
            {
                var x=n(2).add(layers.h.clickables["Water-Upgrade-2"].EFFECT())
                var eff=x.pow(player.h.upgrade_1_num)
                return eff
            },
            display()
            {
                return '强壮<br>吸入足够的氢气 , 变的更强大<br>力量翻倍!<br><br>当前: x'+format(layers.h.clickables["H-Upgrade-1"].EFFECT())
                +'<br>花费: '+format(layers.h.clickables["H-Upgrade-1"].COST())+' 氢气'
            },
            unlocked(){return player.h.totalqingfenzi.gte(3)},
            style(){
                if(layers.h.clickables["H-Upgrade-1"].canClick())
               return {"border-radius":"0px","width":"200px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"#6495ED",}
               return {"border-radius":"0px","width":"200px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.qingqi.gte(layers.h.clickables["H-Upgrade-1"].COST())},
            onClick(){
                player.h.qingqi=player.h.qingqi.sub(layers.h.clickables["H-Upgrade-1"].COST()).max(0)
                player.h.upgrade_1_num=player.h.upgrade_1_num.add(1)
            },
        },
        "H-Upgrade-2":
        {
            COST()
            {
                var x=player.h.upgrade_2_num
                if(x.gte(5))x=x.div(5).pow(2).mul(5)
                if(x.gte(100))x=x.div(100).pow(1.5).mul(100)
                var cost=n(100).mul(n(10).pow(x))
                return cost
            },
            EFFECT()
            {
                var exp=n(0.75).add(layers.h.clickables["Water-Upgrade-3"].EFFECT())
                var eff=player.h.qingfenzi.pow(exp)
                eff=eff.pow(player.h.upgrade_2_num)
                return eff
            },
            display()
            {
                return '噗呲噗呲<br>氢分子之间变的更团结<br>产出更多氢气 (基于你的氢分子)<br><br>当前: x'+format(layers.h.clickables["H-Upgrade-2"].EFFECT())
                +'<br>花费: '+format(layers.h.clickables["H-Upgrade-2"].COST())+' 氢气'
            },
            unlocked(){return player.h.totalqingfenzi.gte(6)},
            style(){
                if(layers.h.clickables["H-Upgrade-2"].canClick())
               return {"border-radius":"0px","width":"200px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"#6495ED",}
               return {"border-radius":"0px","width":"200px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.qingqi.gte(layers.h.clickables["H-Upgrade-2"].COST())},
            onClick(){
                player.h.qingqi=player.h.qingqi.sub(layers.h.clickables["H-Upgrade-2"].COST()).max(0)
                player.h.upgrade_2_num=player.h.upgrade_2_num.add(1)
            },
        },
        "H-Upgrade-3":
        {
            COST()
            {
                var x=player.h.upgrade_3_num
                if(x.gte(5))x=x.div(5).pow(2).mul(5)
                if(x.gte(100))x=x.div(100).pow(1.5).mul(100)
                var cost=n(100000).mul(n(100).pow(x))
                return cost
            },
            EFFECT()
            {
                var eff=player.h.qingqi.add(1).logBase(10).div(2)
                eff=eff.pow(player.h.upgrade_3_num)
                return eff
            },
            display()
            {
                return '浑厚<br>身边全是氢气 !<br>力量更强 (基于你的氢气)<br><br>当前: x'+format(layers.h.clickables["H-Upgrade-3"].EFFECT())
                +'<br>花费: '+format(layers.h.clickables["H-Upgrade-3"].COST())+' 氢气'
            },
            unlocked(){return player.h.totalqingfenzi.gte(15)},
            style(){
                if(layers.h.clickables["H-Upgrade-3"].canClick())
               return {"border-radius":"0px","width":"200px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"#6495ED",}
               return {"border-radius":"0px","width":"200px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.qingqi.gte(layers.h.clickables["H-Upgrade-3"].COST())},
            onClick(){
                player.h.qingqi=player.h.qingqi.sub(layers.h.clickables["H-Upgrade-3"].COST()).max(0)
                player.h.upgrade_3_num=player.h.upgrade_3_num.add(1)
            },
        },
        "H-Upgrade-4":
        {
            COST()
            {
                var x=player.h.upgrade_4_num
                if(x.gte(5))x=x.div(5).pow(2).mul(5)
                if(x.gte(100))x=x.div(100).pow(1.5).mul(100)
                var cost=n(1e10).mul(n(1e5).pow(x))
                return cost
            },
            EFFECT()
            {
                var eff=n(1.5).pow(player.h.total_dmg.add(1).logBase(10).add(1).logBase(10).add(1)).div(10)
                eff=eff.mul(player.h.upgrade_4_num)
                return eff
            },
            display()
            {
                return '威慑<br>在你的高压政策下 , 氢分子更加努力生产氢气<br>提高氢气获取指数 (基于你的总计伤害)<br>总计伤害<text style="color:red">'
                +format(player.h.total_dmg)+'</text><br><br>当前: +'+format(layers.h.clickables["H-Upgrade-4"].EFFECT())
                +'<br>花费: '+format(layers.h.clickables["H-Upgrade-4"].COST())+' 氢气'
            },
            unlocked(){return player.h.totalqingfenzi.gte(45)},
            style(){
                if(layers.h.clickables["H-Upgrade-4"].canClick())
               return {"border-radius":"0px","width":"200px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"#6495ED",}
               return {"border-radius":"0px","width":"200px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.qingqi.gte(layers.h.clickables["H-Upgrade-4"].COST())},
            onClick(){
                player.h.qingqi=player.h.qingqi.sub(layers.h.clickables["H-Upgrade-4"].COST()).max(0)
                player.h.upgrade_4_num=player.h.upgrade_4_num.add(1)
            },
        },
        "Water-Fenzi":
        {
            GAIN()
            {
                if(player.h.qingfenzi.lte(49.5))return n(0)
                if(!hasUpgrade("h",11))return n(1).mul(layers.h.clickables["Water-Upgrade-4"].EFFECT())
                var y=n(0.5)
                if(hasUpgrade("h",23))y=n(1)
                if(hasMilestone("h",5))y=y.add(layers.h.milestones[5].EFFECT())
                var x=player.h.qingfenzi.sub(49).pow(y).add(1).div(2).floor()
                return x.mul(layers.h.clickables["Water-Upgrade-4"].EFFECT())
            },
            display()
            {
                var s=''
                var xxx=layers.h.clickables["Water-Upgrade-4"].EFFECT()
                if(!hasUpgrade("h",11))s='<br><br>(当前获取硬上限为 '+format(xxx)+')'
                if(player.h.totalwaterfenzi.gte(1))
                return '点燃!<br>消耗所有的氢分子 , 但获得 <h1><text style="color:lightblue">'+format(layers.h.clickables["Water-Fenzi"].GAIN())+'</text></h1> 水分子'+s
                return '好热<br>我感觉什么东西要烧着了...'
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"300px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"#FFA500",
                        "border-width":"10px","border-color":"red",
                        "box-shadow":"0px 0px 30px red"}},
            canClick(){return layers.h.clickables["Water-Fenzi"].GAIN().gte(1)},
            onClick(){
                player.h.waterfenzi=player.h.waterfenzi.add(layers.h.clickables["Water-Fenzi"].GAIN())
                player.h.totalwaterfenzi=player.h.totalwaterfenzi.add(layers.h.clickables["Water-Fenzi"].GAIN())
                player.h.water=player.h.water.add(1)
                player.h.totalwater=player.h.totalwater.add(1)

                player.h.qingfenzi=n(0)
                player.h.fenziHp=n(10)
                player.h.fenziHpnow=n(10)
                player.h.qingqi=n(0)
                player.h.qingqiGain=n(0)
                player.h.upgrade_1_num=n(0) 
                player.h.upgrade_2_num=n(0) 
                player.h.upgrade_3_num=n(0) 
                player.h.upgrade_4_num=n(0) 
                player.h.power=n(1)
                player.h.total_dmg=n(0)
            },
        },
        "Water-1":
        {
            COST()
            {
                var x=player.h.water_1_num
                var cost=n(1).mul(n(1.25).pow(x))
                return cost
            },
            display()
            {
                var name='水车'
                if(player.h.has_mini_1.eq(1))s='水龙头'
                return name+' '+format(player.h.water_1_num)+' + '+format(player.h.water_1_extra)
                +' x'+format(player.h.water_1_mult)
                +' 花费 : '+format(layers.h.clickables["Water-1"].COST())+' 水'
            },
            unlocked(){return player.h.totalwaterfenzi.gte(1)},
            style(){
                var s='350px'
                if(layers.h.clickables["Water-1"].canClick())
                return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.water.gte(layers.h.clickables["Water-1"].COST())},
            onClick(){
                player.h.water=player.h.water.sub(layers.h.clickables["Water-1"].COST()).max(0)
                player.h.water_1_num=player.h.water_1_num.add(1)
            },
        },
        "Water-2":
        {
            COST()
            {
                var x=player.h.water_2_num
                var cost=n(100).mul(n(1.5).pow(x))
                return cost
            },
            display()
            {
                return '工人 '+format(player.h.water_2_num)+' + '+format(player.h.water_2_extra)
                +' x'+format(player.h.water_2_mult)
                +' 花费 : '+format(layers.h.clickables["Water-2"].COST())+' 水'
            },
            unlocked(){return hasUpgrade("h",12) || hasMilestone("h",3)},
            style(){
                var s='350px'
                if(layers.h.clickables["Water-2"].canClick())
               return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"lightblue",}
               return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.water.gte(layers.h.clickables["Water-2"].COST()) && hasUpgrade("h",12)},
            onClick(){
                player.h.water=player.h.water.sub(layers.h.clickables["Water-2"].COST()).max(0)
                player.h.water_2_num=player.h.water_2_num.add(1)
            },
        },
        "Water-3":
        {
            COST()
            {
                var x=player.h.water_3_num
                var cost=n(1000).mul(n(1.75).pow(x))
                return cost
            },
            display()
            {
                return '监工 '+format(player.h.water_3_num)+' + '+format(player.h.water_3_extra)
                +' x'+format(player.h.water_3_mult)
                +' 花费 : '+format(layers.h.clickables["Water-3"].COST())+' 水'
            },
            unlocked(){return hasMilestone("h",3)},
            style(){
                var s='350px'
                if(layers.h.clickables["Water-3"].canClick())
               return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"lightblue",}
               return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.water.gte(layers.h.clickables["Water-3"].COST())},
            onClick(){
                player.h.water=player.h.water.sub(layers.h.clickables["Water-3"].COST()).max(0)
                player.h.water_3_num=player.h.water_3_num.add(1)
            },
        },
        "Water-4":
        {
            COST()
            {
                var x=player.h.water_4_num
                var cost=n(100000).mul(n(2).pow(x))
                return cost
            },
            display()
            {
                return '精英 '+format(player.h.water_4_num)+' + '+format(player.h.water_4_extra)
                +' x'+format(player.h.water_4_mult)
                +' 花费 : '+format(layers.h.clickables["Water-4"].COST())+' 水'
            },
            unlocked(){return hasMilestone("h",4)},
            style(){
                var s='350px'
                if(layers.h.clickables["Water-4"].canClick())
               return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"lightblue",}
               return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.water.gte(layers.h.clickables["Water-4"].COST())},
            onClick(){
                player.h.water=player.h.water.sub(layers.h.clickables["Water-4"].COST()).max(0)
                player.h.water_4_num=player.h.water_4_num.add(1)
            },
        },
        "Water-5":
        {
            COST()
            {
                var x=player.h.water_5_num
                var cost=n(1e7).mul(n(3).pow(x))
                return cost
            },
            display()
            {
                return '老板 '+format(player.h.water_5_num)+' + '+format(player.h.water_5_extra)
                +' x'+format(player.h.water_5_mult)
                +' 花费 : '+format(layers.h.clickables["Water-5"].COST())+' 水'
            },
            unlocked(){return hasUpgrade("h",41)},
            style(){
                var s='350px'
                if(layers.h.clickables["Water-5"].canClick())
               return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"lightblue",}
               return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.water.gte(layers.h.clickables["Water-5"].COST())},
            onClick(){
                player.h.water=player.h.water.sub(layers.h.clickables["Water-5"].COST()).max(0)
                player.h.water_5_num=player.h.water_5_num.add(1)
            },
        },
        "Water-Speed":
        {
            COST()
            {
                var x=player.h.water_speed
                if(x.gte(10))x=x.div(10).pow(2).mul(10)
                var cost=n(1e10).mul(n(2).pow(x))
                return cost
            },
            display()
            {
                return '加速器 '+format(player.h.water_speed)
                +' x'+format(n(1.1).pow(player.h.water_speed))
                +' 花费 : '+format(layers.h.clickables["Water-Speed"].COST())+' 水'
            },
            unlocked(){return player.h.has_mini_5.eq(1)},
            style(){
                var s='350px'
                if(layers.h.clickables["Water-Speed"].canClick())
               return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"lightblue",}
               return {"border-radius":"0px","width":s,"height":"50px","min-height":"50px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.water.gte(layers.h.clickables["Water-Speed"].COST())},
            onClick(){
                player.h.water=player.h.water.sub(layers.h.clickables["Water-Speed"].COST()).max(0)
                player.h.water_speed=player.h.water_speed.add(1)
            },
        },
        "Auto-1":
        {
            COST()
            {
                var x=player.h.water_auto_1_num
                var cost=n(10).pow(x.add(1))
                return cost
            },
            EFFECT()
            {
                var x=player.h.water_auto_1_num
                if(x.eq(0))return n(0)
                return x.div(5)
            },
            display()
            {
                return '自动购买升级<br>当前 : '+format(layers.h.clickables["Auto-1"].EFFECT())+' /s<br>花费 : '+format(layers.h.clickables["Auto-1"].COST())+' 水'
            },
            unlocked(){return hasMilestone("h",0)},
            style(){
                if(layers.h.clickables["Auto-1"].canClick())
               return {"border-radius":"0px","width":"200px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"lightblue",}
               return {"border-radius":"0px","width":"200px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.water.gte(layers.h.clickables["Auto-1"].COST())},
            onClick(){
                player.h.water=player.h.water.sub(layers.h.clickables["Auto-1"].COST()).max(0)
                player.h.water_auto_1_num=player.h.water_auto_1_num.add(1)
            },
        },
        "Auto-2":
        {
            COST()
            {
                var x=player.h.water_auto_2_num
                var cost=n(100).pow(x.add(1))
                return cost
            },
            EFFECT()
            {
                var x=player.h.water_auto_2_num
                x=n(1.2).pow(x).sub(1)
                return x
            },
            display()
            {
                return '自动点击<br>当前 : '+format(layers.h.clickables["Auto-2"].EFFECT())+' /s<br>花费 : '+format(layers.h.clickables["Auto-2"].COST())+' 水'
            },
            unlocked(){return hasMilestone("h",1)},
            style(){
                if(layers.h.clickables["Auto-2"].canClick())
               return {"border-radius":"0px","width":"200px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"lightblue",}
               return {"border-radius":"0px","width":"200px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.water.gte(layers.h.clickables["Auto-2"].COST())},
            onClick(){
                player.h.water=player.h.water.sub(layers.h.clickables["Auto-2"].COST()).max(0)
                player.h.water_auto_2_num=player.h.water_auto_2_num.add(1)
            },
        },
        "Water-Upgrade-1":
        {
            COST()
            {
                var x=player.h.water_upgrade_1_num
                var cost=n(1.5).pow(x)
                return cost.floor()
            },
            EFFECT()
            {
                var x=player.h.water_upgrade_1_num
                return x.add(1)
            },
            display()
            {
                return '穿透力<br>一次可以击碎更多的氢分子 !<br>当前 : <text style="color:#6495ED">x'+format(layers.h.clickables["Water-Upgrade-1"].EFFECT())+'</text><br>花费 : '+format(layers.h.clickables["Water-Upgrade-1"].COST())+' 水分子'
            },
            unlocked(){return true},
            style(){
                if(layers.h.clickables["Water-Upgrade-1"].canClick())
               return {"border-radius":"0px","width":"200px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"lightblue",}
               return {"border-radius":"0px","width":"200px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.waterfenzi.gte(layers.h.clickables["Water-Upgrade-1"].COST())},
            onClick(){
                player.h.waterfenzi=player.h.waterfenzi.sub(layers.h.clickables["Water-Upgrade-1"].COST()).max(0)
                player.h.water_upgrade_1_num=player.h.water_upgrade_1_num.add(1)
            },
        },
        "Water-Upgrade-2":
        {
            COST()
            {
                var x=player.h.water_upgrade_2_num
                return n(2.5).pow(x.add(1)).floor()
            },
            EACH()
            {
                var x=player.h.waterfenzi
                x=x.add(1).logBase(2).floor()
                return x
            },
            BACK(xx)
            {
                var x=n(xx)
                x=n(2).pow(x).sub(1)
                return x
            },
            EFFECT()
            {
                var x=player.h.water_upgrade_2_num
                return x.mul(layers.h.clickables["Water-Upgrade-2"].EACH())
            },
            display()
            {
                return '力量校准器<br>吸收氢气的时候 , 力量提升更多 !<br><br>当前每级提供 <text style="color:red">+'
                +format(layers.h.clickables["Water-Upgrade-2"].EACH())+'</text> 基数<br>(下一个在 <text style="color:cyan"><h1>'
                +format(layers.h.clickables["Water-Upgrade-2"].BACK(layers.h.clickables["Water-Upgrade-2"].EACH().add(1)))+'</h1></text> 水分子)<br><br>总计 : <text style="color:red">+'
                +format(layers.h.clickables["Water-Upgrade-2"].EFFECT())+'</text> 基数<br>花费 : '+format(layers.h.clickables["Water-Upgrade-2"].COST())+' 水分子'
            },
            unlocked(){return true},
            style(){
                if(layers.h.clickables["Water-Upgrade-2"].canClick())
               return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"lightblue",}
               return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.waterfenzi.gte(layers.h.clickables["Water-Upgrade-2"].COST())},
            onClick(){
                player.h.waterfenzi=player.h.waterfenzi.sub(layers.h.clickables["Water-Upgrade-2"].COST()).max(0)
                player.h.water_upgrade_2_num=player.h.water_upgrade_2_num.add(1)
            },
        },
        "Water-Upgrade-3":
        {
            COST()
            {
                var x=player.h.water_upgrade_3_num
                return n(2).mul(n(5).pow(x)).floor()
            },
            EFFECT()
            {
                var x=player.h.water_upgrade_3_num
                return n(0.25).mul(x)
            },
            display()
            {
                return '扑通扑通<br>氢分子更更更更更团结 !<br><br>当前 : +'+format(layers.h.clickables["Water-Upgrade-3"].EFFECT())
                +'<br>花费 : '+format(layers.h.clickables["Water-Upgrade-3"].COST())+' 水分子'
            },
            unlocked(){return true},
            style(){
                if(layers.h.clickables["Water-Upgrade-3"].canClick())
               return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"lightblue",}
               return {"border-radius":"0px","width":"250px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.waterfenzi.gte(layers.h.clickables["Water-Upgrade-3"].COST())},
            onClick(){
                player.h.waterfenzi=player.h.waterfenzi.sub(layers.h.clickables["Water-Upgrade-3"].COST()).max(0)
                player.h.water_upgrade_3_num=player.h.water_upgrade_3_num.add(1)
            },
        },
        "Water-Upgrade-4":
        {
            COST()
            {
                var x=player.h.water_upgrade_4_num
                return n(10).mul(n(10).pow(x)).floor()
            },
            EFFECT()
            {
                var x=player.h.water_upgrade_4_num
                return n(2).pow(x)
            },
            display()
            {
                return '更多的水<br>每级获得两倍水分子 !(?<br><br>当前 : x'+format(layers.h.clickables["Water-Upgrade-4"].EFFECT())
                +'<br>花费 : '+format(layers.h.clickables["Water-Upgrade-4"].COST())+' 水分子'
            },
            unlocked(){return true},
            style(){
                if(layers.h.clickables["Water-Upgrade-4"].canClick())
               return {"border-radius":"0px","width":"500px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"lightblue",}
               return {"border-radius":"0px","width":"500px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.waterfenzi.gte(layers.h.clickables["Water-Upgrade-4"].COST())},
            onClick(){
                player.h.waterfenzi=player.h.waterfenzi.sub(layers.h.clickables["Water-Upgrade-4"].COST()).max(0)
                player.h.water_upgrade_4_num=player.h.water_upgrade_4_num.add(1)
            },
        },
        "Bing":
        {
            EFFECT()
            {
                var x=player.h.bing
                x=x.add(1).logBase(1.1)
                x=n(1.02).pow(x)
                return x
            },
            display()
            {
                return '<h1>你有 <text style="color:lightblue">'+format(player.h.bing)+'</text> 冰 (固态 <text style="color:lightblue">水</text>)<br>'
                +'+ <text style="color:lightblue">'+format(player.h.bingGain)+'</text> /s<br>'
                +'温度计 <text style="color:cyan">冷</text> '+format(player.h.wendu_1)+' <sup>o</sup>C<br>'
                +'让你的 "冰水" 变强 x'+format(layers.h.clickables["Bing"].EFFECT())
            },
            unlocked(){return hasUpgrade("h",31) || hasUpgrade("h",32)},
            style(){
               return {"border-radius":"0px","width":"300px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"black","color":"white",}},
            canClick(){return false},
            onClick(){
            },
        },
        "Shuizhengqi":
        {
            EFFECT()
            {
                var x=player.h.shuizhengqi
                x=x.add(1).logBase(1.1)
                x=n(1.04).pow(x)
                return x
            },
            display()
            {
                return '<h1>你有 <text style="color:lightblue">'+format(player.h.shuizhengqi)+'</text> 水蒸气 (气态 <text style="color:lightblue">水</text>)<br>'
                +'+ <text style="color:lightblue">'+format(player.h.shuizhengqiGain)+'</text> /s<br>'
                +'温度计 <text style="color:red">热</text> '+format(player.h.wendu_2)+' <sup>o</sup>C<br>'
                +'让你的 "沸水" 变强 x'+format(layers.h.clickables["Shuizhengqi"].EFFECT())
            },
            unlocked(){return hasUpgrade("h",31) || hasUpgrade("h",32)},
            style(){
               return {"border-radius":"0px","width":"300px","height":"150px","min-height":"150px","transition-duration":"0.5s","background-color":"black","color":"white",}},
            canClick(){return false},
            onClick(){
            },
        },
        "Cold":
        {
            display()
            {
                return '制冷<br><br>温度计 <text style="color:cyan">冷</text> 温度 降低10<sup>o</sup>C<br><br>花费 : '+format(player.h.cold_cost.floor())+' 水分子'
            },
            unlocked(){return hasUpgrade("h",31) || hasUpgrade("h",32)},
            style(){
                if(layers.h.clickables["Cold"].canClick())
                return {"border-radius":"0px","width":"150px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"150px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.waterfenzi.gte(player.h.cold_cost.floor()) && hasUpgrade("h",31)},
            onClick(){
                player.h.waterfenzi=player.h.waterfenzi.sub(player.h.cold_cost.floor()).max(0)
                player.h.wendu_1=player.h.wendu_1.sub(10)
                player.h.cold_cost=player.h.cold_cost.mul(1.5)
            },
        },
        "Hot":
        {
            display()
            {
                return '制热<br><br>温度计 <text style="color:red">热</text> 温度 升高10<sup>o</sup>C<br><br>花费 : '+format(player.h.hot_cost.floor())+' 水分子'
            },
            unlocked(){return hasUpgrade("h",31) || hasUpgrade("h",32)},
            style(){
                if(layers.h.clickables["Hot"].canClick())
                return {"border-radius":"0px","width":"150px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"150px","height":"100px","min-height":"100px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return player.h.waterfenzi.gte(player.h.hot_cost.floor()) && hasUpgrade("h",32)},
            onClick(){
                player.h.waterfenzi=player.h.waterfenzi.sub(player.h.hot_cost.floor()).max(0)
                player.h.wendu_2=player.h.wendu_2.add(10)
                player.h.hot_cost=player.h.hot_cost.mul(1.5)
            },
        },
        "Water-Challenge-1":
        {
            EFFECT()
            {
                var x=player.h.challenge_1_best
                return n(1).add(x.div(100))
            },
            DEBUFF()
            {
                var x=player.h.zangshui
                return n(1).add(x.root(2).div(10))
            },
            display()
            {
                if(player.h.in_challenge_1.eq(0))
                return "<h2>脏水</h2><br>随着水的获取 , 自然也会有一些脏水流入<br><br>你当前挑战中最多击败 <h1><text style='color:#6495ED'>"
                +format(player.h.challenge_1_best)+'</text></h1> 氢分子<br>'
                +"这让你的氢分子硬度 /"+format(layers.h.clickables["Water-Challenge-1"].EFFECT())
                +"<br><br><br><text style='font-size:36px'>进入挑战</text>"
                return "你有 <h1><text style='color:#7F5A58'>"+format(player.h.zangshui)+'</h1></text> 脏水<br>'
                +"+ <text style='color:#7F5A58'>"+format(player.h.zangshuiGain)+"</text> /s<br><br>"
                +"这让你的氢分子硬度 x"+format(layers.h.clickables["Water-Challenge-1"].DEBUFF())+'<br>'
                +"注 : 挑战中 , 穿透力无效<br><br><br>带上你的氢分子!<br><text style='font-size:36px'>离开挑战</text>"
            },
            unlocked(){return hasMilestone("h",5)},
            style(){
                return {"border-radius":"0px","width":"300px","height":"300px","min-height":"300px","transition-duration":"0.5s","background-color":"lightblue",
                        "border-color":"#6495ED","border-width":"10px"}},
            canClick(){return true},
            onClick(){
                if(player.h.in_challenge_1.eq(0))
                {
                    player.h.in_challenge_1=n(1)
                    player.h.zangshui=n(0)
                    layers.h.clickables["Water-Fenzi"].onClick()
                }
                else
                {
                    player.h.in_challenge_1=n(0)
                    player.h.zangshui=n(0)
                    player.h.challenge_1_best=player.h.challenge_1_best.max(player.h.qingfenzi)
                    layers.h.clickables["Water-Fenzi"].onClick()
                }
            },
        },
        "Water-Mini-Upgrade-1":
        {
            EFFECT()
            {
                if(player.h.has_mini_1.eq(0))return n(1)
                var x=player.h.water_1_num.add(player.h.water_1_extra)
                return x.root(4).add(1)
            },
            OUTPUT()
            {
                var s=(player.h.has_mini_1.eq(0)?" <text style='color:lightblue'>(未购买)</text>":" <text style='color:red'>(已购买)</text>")
                return '升级 I'+s+'<br>---------------<br>水车=>水龙头<br>水龙头被水龙头的数量增幅<br>当前 : x'+format(layers.h.clickables["Water-Mini-Upgrade-1"].EFFECT())
                +'<br><br>花费 : 1e9 水'
            },
            display()
            {
                return '<text style="font-family:Times new rome;font-size:24px">I'
            },
            unlocked(){return hasUpgrade("h",41)},
            style(){
                if(player.h.has_mini_1.eq(1))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"gold",}
                if(player.h.water.gte(n(1e9)))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return true},
            onClick(){
                player.h.on_which="Water-Mini-Upgrade-1"
                if(player.h.water.gte(n(1e9)) && player.h.has_mini_1.eq(0))
                {
                    player.h.water=player.h.water.sub(1e9)
                    player.h.has_mini_1=n(1)
                }
            },
        },
        "Water-Mini-Upgrade-2":
        {
            EFFECT()
            {
                if(player.h.has_mini_2.eq(0))return n(1)
                var x=player.h.water_2_num.add(player.h.water_2_extra)
                return x.root(3.5).add(1)
            },
            OUTPUT()
            {
                var s=(player.h.has_mini_2.eq(0)?" <text style='color:lightblue'>(未购买)</text>":" <text style='color:red'>(已购买)</text>")
                return '升级 II'+s+'<br>---------------<br><br>工人被工人的数量增幅<br>当前 : x'+format(layers.h.clickables["Water-Mini-Upgrade-2"].EFFECT())
                +'<br><br>花费 : 1e14 水'
            },
            display()
            {
                return '<text style="font-family:Times new rome;font-size:24px">II'
            },
            unlocked(){return hasUpgrade("h",41)},
            style(){
                if(player.h.has_mini_2.eq(1))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"gold",}
                if(player.h.water.gte(n(1e14)))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return true},
            onClick(){
                player.h.on_which="Water-Mini-Upgrade-2"
                if(player.h.water.gte(n(1e14)) && player.h.has_mini_2.eq(0))
                {
                    player.h.water=player.h.water.sub(1e14)
                    player.h.has_mini_2=n(1)
                }
            },
        },
        "Water-Mini-Upgrade-3":
        {
            EFFECT()
            {
                if(player.h.has_mini_3.eq(0))return n(1)
                var x=player.h.water_3_num.add(player.h.water_3_extra)
                return x.root(3).add(1)
            },
            OUTPUT()
            {
                var s=(player.h.has_mini_3.eq(0)?" <text style='color:lightblue'>(未购买)</text>":" <text style='color:red'>(已购买)</text>")
                return '升级 III'+s+'<br>---------------<br><br>监工被监工的数量增幅<br>当前 : x'+format(layers.h.clickables["Water-Mini-Upgrade-3"].EFFECT())
                +'<br><br>花费 : 1e16 水'
            },
            display()
            {
                return '<text style="font-family:Times new rome;font-size:24px">III'
            },
            unlocked(){return hasUpgrade("h",41)},
            style(){
                if(player.h.has_mini_3.eq(1))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"gold",}
                if(player.h.water.gte(n(1e16)))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return true},
            onClick(){
                player.h.on_which="Water-Mini-Upgrade-3"
                if(player.h.water.gte(n(1e16)) && player.h.has_mini_3.eq(0))
                {
                    player.h.water=player.h.water.sub(1e16)
                    player.h.has_mini_3=n(1)
                }
            },
        },
        "Water-Mini-Upgrade-4":
        {
            EFFECT()
            {
                if(player.h.has_mini_4.eq(0))return n(1)
                var x=player.h.water_4_num.add(player.h.water_4_extra)
                return x.root(2.5).add(1)
            },
            OUTPUT()
            {
                var s=(player.h.has_mini_4.eq(0)?" <text style='color:lightblue'>(未购买)</text>":" <text style='color:red'>(已购买)</text>")
                return '升级 IV'+s+'<br>---------------<br><br>精英被精英的数量增幅<br>当前 : x'+format(layers.h.clickables["Water-Mini-Upgrade-4"].EFFECT())
                +'<br><br>花费 : 1e18 水'
            },
            display()
            {
                return '<text style="font-family:Times new rome;font-size:24px">IV'
            },
            unlocked(){return hasUpgrade("h",41)},
            style(){
                if(player.h.has_mini_4.eq(1))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"gold",}
                if(player.h.water.gte(n(1e18)))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return true},
            onClick(){
                player.h.on_which="Water-Mini-Upgrade-4"
                if(player.h.water.gte(n(1e18)) && player.h.has_mini_4.eq(0))
                {
                    player.h.water=player.h.water.sub(1e18)
                    player.h.has_mini_4=n(1)
                }
            },
        },
        "Water-Mini-Upgrade-5":
        {
            OUTPUT()
            {
                var s=(player.h.has_mini_5.eq(0)?" <text style='color:lightblue'>(未购买)</text>":" <text style='color:red'>(已购买)</text>")
                return '升级 V'+s+'<br>---------------<br><i>>>>>>>>></i><br>解锁 加速器<br><br><br>花费 : 1e21 水'
            },
            display()
            {
                return '<text style="font-family:Times new rome;font-size:24px">V'
            },
            unlocked(){return hasUpgrade("h",41)},
            style(){
                if(player.h.has_mini_5.eq(1))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"gold",}
                if(player.h.water.gte(n(1e21)))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return true},
            onClick(){
                player.h.on_which="Water-Mini-Upgrade-5"
                if(player.h.water.gte(n(1e21)) && player.h.has_mini_5.eq(0))
                {
                    player.h.water=player.h.water.sub(1e21)
                    player.h.has_mini_5=n(1)
                }
            },
        },
        "Water-Mini-Upgrade-6":
        {
            EFFECT()
            {
                if(player.h.has_mini_6.eq(0))return n(1)
                var x=player.h.water_1_num
                return x.add(1).pow(2)
            },
            OUTPUT()
            {
                var s=(player.h.has_mini_6.eq(0)?" <text style='color:lightblue'>(未购买)</text>":" <text style='color:red'>(已购买)</text>")
                return '升级 VI'+s+'<br>---------------<br><i>点击不会白费</i><br>水龙头被(真实)水龙头的数量增幅<br>当前 : x'+format(layers.h.clickables["Water-Mini-Upgrade-6"].EFFECT())
                +'<br><br>花费 : 1e30 水'
            },
            display()
            {
                return '<text style="font-family:Times new rome;font-size:24px">VI'
            },
            unlocked(){return hasUpgrade("h",41) && player.h.has_mini_5.eq(1)},
            style(){
                if(player.h.has_mini_6.eq(1))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"gold",}
                if(player.h.water.gte(n(1e30)))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return true},
            onClick(){
                player.h.on_which="Water-Mini-Upgrade-6"
                if(player.h.water.gte(n(1e30)) && player.h.has_mini_6.eq(0))
                {
                    player.h.water=player.h.water.sub(1e30)
                    player.h.has_mini_6=n(1)
                }
            },
        },
        "Water-Mini-Upgrade-7":
        {
            EFFECT()
            {
                if(player.h.has_mini_7.eq(0))return n(1)
                var x=player.h.water_2_num
                return x.add(1).pow(2)
            },
            OUTPUT()
            {
                var s=(player.h.has_mini_7.eq(0)?" <text style='color:lightblue'>(未购买)</text>":" <text style='color:red'>(已购买)</text>")
                return '升级 VII'+s+'<br>---------------<br><i>点击不会白费</i><br>工人被(真实)工人的数量增幅<br>当前 : x'+format(layers.h.clickables["Water-Mini-Upgrade-7"].EFFECT())
                +'<br><br>花费 : 1e37 水'
            },
            display()
            {
                return '<text style="font-family:Times new rome;font-size:24px">VII'
            },
            unlocked(){return hasUpgrade("h",41) && player.h.has_mini_5.eq(1)},
            style(){
                if(player.h.has_mini_7.eq(1))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"gold",}
                if(player.h.water.gte(n(1e37)))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return true},
            onClick(){
                player.h.on_which="Water-Mini-Upgrade-7"
                if(player.h.water.gte(n(1e37)) && player.h.has_mini_7.eq(0))
                {
                    player.h.water=player.h.water.sub(1e37)
                    player.h.has_mini_7=n(1)
                }
            },
        },
        "Water-Mini-Upgrade-8":
        {
            EFFECT()
            {
                if(player.h.has_mini_8.eq(0))return n(1)
                var x=player.h.water_3_num
                return x.add(1).pow(2)
            },
            OUTPUT()
            {
                var s=(player.h.has_mini_8.eq(0)?" <text style='color:lightblue'>(未购买)</text>":" <text style='color:red'>(已购买)</text>")
                return '升级 VIII'+s+'<br>---------------<br><i>点击不会白费</i><br>监工被(真实)监工的数量增幅<br>当前 : x'+format(layers.h.clickables["Water-Mini-Upgrade-8"].EFFECT())
                +'<br><br>花费 : 1e42 水'
            },
            display()
            {
                return '<text style="font-family:Times new rome;font-size:24px">VIII'
            },
            unlocked(){return hasUpgrade("h",41) && player.h.has_mini_5.eq(1)},
            style(){
                if(player.h.has_mini_8.eq(1))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"gold",}
                if(player.h.water.gte(n(1e42)))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return true},
            onClick(){
                player.h.on_which="Water-Mini-Upgrade-8"
                if(player.h.water.gte(n(1e42)) && player.h.has_mini_8.eq(0))
                {
                    player.h.water=player.h.water.sub(1e42)
                    player.h.has_mini_8=n(1)
                }
            },
        },
        "Water-Mini-Upgrade-9":
        {
            EFFECT()
            {
                if(player.h.has_mini_9.eq(0))return n(1)
                var x=player.h.water_4_num
                return x.add(1).pow(2)
            },
            OUTPUT()
            {
                var s=(player.h.has_mini_9.eq(0)?" <text style='color:lightblue'>(未购买)</text>":" <text style='color:red'>(已购买)</text>")
                return '升级 VIV'+s+'<br>---------------<br><i>点击不会白费</i><br>精英被(真实)精英的数量增幅<br>当前 : x'+format(layers.h.clickables["Water-Mini-Upgrade-9"].EFFECT())
                +'<br><br>花费 : 1e48 水'
            },
            display()
            {
                return '<text style="font-family:Times new rome;font-size:24px">VIV'
            },
            unlocked(){return hasUpgrade("h",41) && player.h.has_mini_5.eq(1)},
            style(){
                if(player.h.has_mini_9.eq(1))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"gold",}
                if(player.h.water.gte(n(1e48)))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return true},
            onClick(){
                player.h.on_which="Water-Mini-Upgrade-9"
                if(player.h.water.gte(n(1e48)) && player.h.has_mini_9.eq(0))
                {
                    player.h.water=player.h.water.sub(1e48)
                    player.h.has_mini_9=n(1)
                }
            },
        },
        "Water-Mini-Upgrade-10":
        {
            EFFECT()
            {
                if(player.h.has_mini_10.eq(0))return n(1)
                var x=player.h.water_5_num
                return x.add(1).pow(4)
            },
            OUTPUT()
            {
                var s=(player.h.has_mini_10.eq(0)?" <text style='color:lightblue'>(未购买)</text>":" <text style='color:red'>(已购买)</text>")
                return '升级 X'+s+'<br>---------------<br><i>点击不会白费</i><br>老板被(真实)老板的数量(大幅度)增幅<br>当前 : x'+format(layers.h.clickables["Water-Mini-Upgrade-10"].EFFECT())
                +'<br><br>花费 : 1e58 水'
            },
            display()
            {
                return '<text style="font-family:Times new rome;font-size:24px">X'
            },
            unlocked(){return hasUpgrade("h",41) && player.h.has_mini_5.eq(1)},
            style(){
                if(player.h.has_mini_10.eq(1))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"gold",}
                if(player.h.water.gte(n(1e58)))
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"lightblue",}
                return {"border-radius":"0px","width":"60px","height":"60px","min-height":"60px","transition-duration":"0.5s","background-color":"grey",}},
            canClick(){return true},
            onClick(){
                player.h.on_which="Water-Mini-Upgrade-10"
                if(player.h.water.gte(n(1e58)) && player.h.has_mini_10.eq(0))
                {
                    player.h.water=player.h.water.sub(1e58)
                    player.h.has_mini_10=n(1)
                }
            },
        },
    },
    upgrades:{
        11:{
            fullDisplay()
            {
                return "突破<br><i>不止一个</i><br>点燃时候 , 可以获得更多的水分子<br>(基于你的氢分子)<br><br>花费 : 5水分子"
            },
            onPurchase()
            {
                player.h.waterfenzi=player.h.waterfenzi.sub(5)
            },
            canAfford()
            {
                return player.h.waterfenzi.gte(5)
            },
            style(){return {"width":"200px","height":"125px","min-height":"125px","border-radius":"0px"}},
            unlocked(){return true},
        },
        12:{
            fullDisplay()
            {
                return "组装<br>解锁工人<br>他们可以帮你组装你的水车<br><br>花费 : 20水分子"
            },
            onPurchase()
            {
                player.h.waterfenzi=player.h.waterfenzi.sub(10)
            },
            canAfford()
            {
                return player.h.waterfenzi.gte(10)
            },
            style(){return {"width":"200px","height":"125px","min-height":"125px","border-radius":"0px"}},
            unlocked(){return true},
        },
        13:{
            EFFECT()
            {
                if(!hasUpgrade("h",13))
                return n(1)
                var x=n(10).pow(player.h.water.add(1).logBase(3).max(1))
                return x
            },
            fullDisplay()
            {
                return "冷水<br>水 增幅 氢气获取<br><br>当前 : x"+format(layers.h.upgrades[13].EFFECT())+"<br>花费 : 100水分子"
            },
            onPurchase()
            {
                player.h.waterfenzi=player.h.waterfenzi.sub(100)
            },
            canAfford()
            {
                return player.h.waterfenzi.gte(100)
            },
            style(){return {"width":"200px","height":"125px","min-height":"125px","border-radius":"0px"}},
            unlocked(){return hasMilestone("h",2)},
            branches:[21],
        },
        14:{
            EFFECT()
            {
                if(!hasUpgrade("h",14))
                return n(1)
                var x=n(3).pow(player.h.water.add(1).logBase(2).max(1))
                return x
            },
            fullDisplay()
            {
                return "热水<br>水 增幅 力量<br><br>当前 : x"+format(layers.h.upgrades[14].EFFECT())+"<br>花费 : 100水分子"
            },
            onPurchase()
            {
                player.h.waterfenzi=player.h.waterfenzi.sub(100)
            },
            canAfford()
            {
                return player.h.waterfenzi.gte(100)
            },
            style(){return {"width":"200px","height":"125px","min-height":"125px","border-radius":"0px"}},
            unlocked(){return hasMilestone("h",2)},
            branches:[22],
        },
        21:{
            EFFECT()
            {
                if(!hasUpgrade("h",21))
                return n(1)
                var xx=n(3).mul(layers.h.clickables["Bing"].EFFECT())
                var x=n(xx).pow(player.h.time_from.add(1).logBase(1.2).max(1))
                return x
            },
            fullDisplay()
            {
                return "冰水 <text style='color:blue'>静态</text><br>距离上次点击时间越久 , 力量越大<br>"+"<text style='color:red'>但会让右边的那个升级更贵哦!!!</text>"
                +"<br><br>当前 : x"+format(layers.h.upgrades[21].EFFECT())+"<br>花费 : "+format(player.h.cost_1)+"水分子"
            },
            onPurchase()
            {
                player.h.waterfenzi=player.h.waterfenzi.sub(player.h.cost_1)
                if(!hasUpgrade("h",22))
                {
                    player.h.cost_2=player.h.cost_2.mul(1000)
                }
            },
            canAfford()
            {
                return player.h.waterfenzi.gte(player.h.cost_1)
            },
            style(){return {"width":"250px","height":"125px","min-height":"125px","border-radius":"0px"}},
            unlocked(){return hasUpgrade("h",13)},
            branches:[23,31],
        },
        22:{
            EFFECT()
            {
                if(!hasUpgrade("h",22))
                return n(1)
                var xx=n(10).mul(layers.h.clickables["Shuizhengqi"].EFFECT())
                var x=n(xx).pow(n(player.h.time_line.length).div(5))
                return x
            },
            fullDisplay()
            {
                return "沸水 <text style='color:red'>动态</text><br>点击越快 , 力量越大<br>"+"<text style='color:blue'>但会让左边的那个升级更贵哦!!!</text>"
                +"<br><br>当前 : x"+format(layers.h.upgrades[22].EFFECT())+"<br>花费 : "+format(player.h.cost_2)+"水分子"
            },
            onPurchase()
            {
                player.h.waterfenzi=player.h.waterfenzi.sub(player.h.cost_2)
                if(!hasUpgrade("h",22))
                {
                    player.h.cost_1=player.h.cost_1.mul(1000)
                }
            },
            canAfford()
            {
                return player.h.waterfenzi.gte(player.h.cost_2)
            },
            style(){return {"width":"250px","height":"125px","min-height":"125px","border-radius":"0px"}},
            unlocked(){return hasUpgrade("h",14)},
            branches:[23,32],
        },
        23:{
            fullDisplay()
            {
                return "纯净水<br>移除水分子获取的平方根因子<br>同时解锁更多升级"
                +"<br><br>花费 : 350水分子"
            },
            onPurchase()
            {
                player.h.waterfenzi=player.h.waterfenzi.sub(350)
            },
            canAfford()
            {
                return player.h.waterfenzi.gte(350)
            },
            style(){return {"width":"300px","height":"125px","min-height":"125px","border-radius":"0px"}},
            unlocked(){return hasUpgrade("h",21) || hasUpgrade("h",22)},
            branches:[41],
        },
        31:{
            fullDisplay()
            {
                return "冰<br>它是水的固体哦<br>解锁冰 !<br><br>花费 : 2500水分子"
            },
            onPurchase()
            {
                player.h.waterfenzi=player.h.waterfenzi.sub(2500)
            },
            canAfford()
            {
                return player.h.waterfenzi.gte(2500) && hasUpgrade("h",21)
            },
            style(){return {"width":"250px","height":"125px","min-height":"125px","border-radius":"0px"}},
            unlocked(){return (hasUpgrade("h",21) || hasUpgrade("h",22)) && hasMilestone("h",4)},
            branches:[41],
        },
        32:{
            fullDisplay()
            {
                return "水蒸气<br>它是水的气体哦<br>解锁水蒸气 !<br><br>花费 : 2500水分子"
            },
            onPurchase()
            {
                player.h.waterfenzi=player.h.waterfenzi.sub(2500)
            },
            canAfford()
            {
                return player.h.waterfenzi.gte(2500) && hasUpgrade("h",22)
            },
            style(){return {"width":"250px","height":"125px","min-height":"125px","border-radius":"0px"}},
            unlocked(){return (hasUpgrade("h",21) || hasUpgrade("h",22)) && hasMilestone("h",4)},
            branches:[41],
        },
        41:{
            fullDisplay()
            {
                return "水-升级<br><i>暂时去玩另外一个游戏吧(?</i><br>解锁 老板<br>同时 为你开启一大堆全新的水-Mini升级<br><br>花费 : 10000水分子"
            },
            onPurchase()
            {
                player.h.waterfenzi=player.h.waterfenzi.sub(10000)
            },
            canAfford()
            {
                return player.h.waterfenzi.gte(10000)
            },
            style(){return {"width":"250px","height":"125px","min-height":"125px","border-radius":"0px"}},
            unlocked(){return (hasUpgrade("h",31) || hasUpgrade("h",32))},
        },
    },
    milestones: {
        0: {
            requirementDescription: "总计 <h2><text style='color:lightblue'>5</h2></text> 水分子",
            effectDescription: `有了一些水 , 生活质量(Qol)就得到了改善<br>解锁 可购买-自动购买升级`,
            unlocked(){return player.h.totalwaterfenzi.gte(1)},
            style(){return {"width":"500px"}},
            done() {return player.h.totalwaterfenzi.gte(5)},
        },
        1: {
            requirementDescription: "总计 <h2><text style='color:lightblue'>15</h2></text> 水分子",
            effectDescription: `更多的水 , 生活质量(Qol)得到了进一步改善<br>解锁 可购买-自动点击`,
            unlocked(){return hasMilestone("h",0)},
            style(){return {"width":"500px"}},
            done() {return player.h.totalwaterfenzi.gte(15)},
        },
        2: {
            requirementDescription: "总计 <h2><text style='color:lightblue'>100</h2></text> 水分子",
            effectDescription: `<i>好多水?</i><br>解锁2个新的升级`,
            unlocked(){return hasMilestone("h",1)},
            style(){return {"width":"500px"}},
            done() {return player.h.totalwaterfenzi.gte(100)},
        },
        3: {
            requirementDescription: "总计 <h2><text style='color:lightblue'>300</h2></text> 水分子",
            effectDescription: `<i>水孕育了新的生命</i><br>解锁 监工`,
            unlocked(){return hasMilestone("h",2)},
            style(){return {"width":"500px"}},
            done() {return player.h.totalwaterfenzi.gte(300)},
        },
        5: {
            EFFECT()
            {
                if(!hasMilestone("h",5))
                {
                    return n(0)
                }
                var x=player.h.bestqingfenzi
                return n(x).div(100).root(2).div(10)
            },
            requirementDescription: "总计 <h2><text style='color:lightblue'>10000</h2></text> 水分子",
            effectDescription:()=>{
                return '更多种类的水 !<br>解锁 水-挑战<br><br>同时 你最多击败 <h2><text style="color:#6495ED">'+format(player.h.bestqingfenzi)+'</h2></text> 氢分子<br>'
                +'令你的水分子获取指数 +'+format(layers.h.milestones[5].EFFECT())
            },
            unlocked(){return hasMilestone("h",3)},
            style(){return {"width":"500px","height":"140px","min-height":"140px"}},
            done() {return player.h.totalwaterfenzi.gte(10000)},
        },
        4: {
            requirementDescription: "最多击败 <h2><text style='color:#6495ED'>250</h2></text> 氢分子",
            effectDescription: `<i>荣耀向你俯首</i><br>解锁 精英 和 新的物质状态 !`,
            unlocked(){return hasMilestone("h",2)},
            style(){return {"width":"500px"}},
            done() {return player.h.bestqingfenzi.gte(250)},
        },
    },
    update(diff)
    {
        // player.h.water_1_num=n(0)
        // player.h.water_2_num=n(0)
        // player.h.water_3_num=n(0)
        // player.h.water_4_num=n(0)
        // player.h.water_5_num=n(0)
        // player.h.water_6_num=n(0)
        // player.h.water_7_num=n(0)
        // player.h.water_8_num=n(0)
        // player.h.water_1_extra=n(0)
        // player.h.water_2_extra=n(0)
        // player.h.water_3_extra=n(0)
        // player.h.water_4_extra=n(0)
        // player.h.water_5_extra=n(0)
        // player.h.water_6_extra=n(0)
        // player.h.water_7_extra=n(0)
        // player.h.water_8_extra=n(0)
        // player.h.water=n(1)
        // player.h.has_mini_1=n(0)
        // player.h.has_mini_2=n(0)
        // player.h.has_mini_3=n(0)
        // player.h.has_mini_4=n(0)
        // player.h.has_mini_5=n(0)

        //挑战-1
        if(player.h.in_challenge_1.eq(1))
        {
            player.h.zangshuiGain=player.h.qingfenzi.add(1).pow(3)
            player.h.zangshui=player.h.zangshui.add(player.h.zangshuiGain.mul(diff))
        }
        if(hasUpgrade("h",31) && player.h.wendu_1.lte(0))
        {
            player.h.bingGain=n(1)
            player.h.bingGain=player.h.bingGain.mul(n(2).pow(n(0).sub(player.h.wendu_1).max(0).div(10).floor()))
        }
        if(hasUpgrade("h",32) && player.h.wendu_2.gte(100))
        {
            player.h.shuizhengqiGain=n(1)
            player.h.shuizhengqiGain=player.h.shuizhengqiGain.mul(n(2).pow(player.h.wendu_2.sub(100).max(0).div(10).floor()))
        }
        player.h.bing=player.h.bing.add(player.h.bingGain.mul(diff))
        player.h.shuizhengqi=player.h.shuizhengqi.add(player.h.shuizhengqiGain.mul(diff))

        player.h.bestqingfenzi=player.h.bestqingfenzi.max(player.h.qingfenzi)
        if(n(player.h.time_line.length).gte(1))
        {
            if(player.h.time_now.sub(player.h.time_line[0]).gte(5))
            {
                player.h.time_line.splice(0,1)
            }
        }
        player.h.time_now=player.h.time_now.add(diff)
        player.h.time_from=player.h.time_from.add(diff)

        var x=n(2).add(layers.h.clickables["H-Upgrade-4"].EFFECT())
        player.h.qingqiGain=player.h.qingfenzi.sub(1).max(0).pow(x)
        player.h.qingqiGain=player.h.qingqiGain.mul(layers.h.clickables["H-Upgrade-2"].EFFECT())
        player.h.qingqiGain=player.h.qingqiGain.mul(player.h.water_to_qingqi)
        player.h.qingqiGain=player.h.qingqiGain.mul(layers.h.upgrades[13].EFFECT())
        player.h.qingqi=player.h.qingqi.add(player.h.qingqiGain.mul(diff))

        player.h.power=n(1)
        player.h.power=player.h.power.mul(layers.h.clickables["H-Upgrade-1"].EFFECT())
        player.h.power=player.h.power.mul(layers.h.clickables["H-Upgrade-3"].EFFECT())
        player.h.power=player.h.power.mul(layers.h.upgrades[14].EFFECT())
        player.h.power=player.h.power.mul(player.h.water_to_power)

        if(player.h.qingfenzi.gte(n(50)))
        {
            player.h.unlock_water=n(1)
        }

        player.h.water_1_mult=n(1)
        player.h.water_1_mult=player.h.water_1_mult.mul(layers.h.clickables["Water-Mini-Upgrade-1"].EFFECT())
        player.h.water_1_mult=player.h.water_1_mult.mul(layers.h.clickables["Water-Mini-Upgrade-6"].EFFECT())
        player.h.water_1_mult=player.h.water_1_mult.mul(n(1.1).pow(player.h.water_speed))

        player.h.water_2_mult=n(1)
        player.h.water_2_mult=player.h.water_2_mult.mul(layers.h.clickables["Water-Mini-Upgrade-2"].EFFECT())
        player.h.water_2_mult=player.h.water_2_mult.mul(layers.h.clickables["Water-Mini-Upgrade-7"].EFFECT())
        player.h.water_2_mult=player.h.water_2_mult.mul(n(1.1).pow(player.h.water_speed))

        player.h.water_3_mult=n(1)
        player.h.water_3_mult=player.h.water_3_mult.mul(layers.h.clickables["Water-Mini-Upgrade-3"].EFFECT())
        player.h.water_3_mult=player.h.water_3_mult.mul(layers.h.clickables["Water-Mini-Upgrade-8"].EFFECT())
        player.h.water_3_mult=player.h.water_3_mult.mul(n(1.1).pow(player.h.water_speed))

        player.h.water_4_mult=n(1)
        player.h.water_4_mult=player.h.water_4_mult.mul(layers.h.clickables["Water-Mini-Upgrade-4"].EFFECT())
        player.h.water_4_mult=player.h.water_4_mult.mul(layers.h.clickables["Water-Mini-Upgrade-9"].EFFECT())
        player.h.water_4_mult=player.h.water_4_mult.mul(n(1.1).pow(player.h.water_speed))

        player.h.water_5_mult=n(1)
        player.h.water_5_mult=player.h.water_5_mult.mul(layers.h.clickables["Water-Mini-Upgrade-10"].EFFECT())
        player.h.water_5_mult=player.h.water_5_mult.mul(n(1.1).pow(player.h.water_speed))

        player.h.water_6_mult=n(1)
        player.h.water_7_mult=n(1)
        player.h.water_8_mult=n(1)

        player.h.waterGain=player.h.water_1_num.add(player.h.water_1_extra).mul(player.h.water_1_mult)
        player.h.water=player.h.water.add(player.h.waterGain.mul(diff))
        player.h.water_1_extra=player.h.water_1_extra.add(player.h.water_2_num.add(player.h.water_2_extra).mul(diff).mul(player.h.water_2_mult))
        player.h.water_2_extra=player.h.water_2_extra.add(player.h.water_3_num.add(player.h.water_3_extra).mul(diff).mul(player.h.water_3_mult))
        player.h.water_3_extra=player.h.water_3_extra.add(player.h.water_4_num.add(player.h.water_4_extra).mul(diff).mul(player.h.water_4_mult))
        player.h.water_4_extra=player.h.water_4_extra.add(player.h.water_5_num.add(player.h.water_5_extra).mul(diff).mul(player.h.water_5_mult))
        player.h.water_5_extra=player.h.water_5_extra.add(player.h.water_6_num.add(player.h.water_6_extra).mul(diff).mul(player.h.water_6_mult))
        player.h.water_6_extra=player.h.water_6_extra.add(player.h.water_7_num.add(player.h.water_7_extra).mul(diff).mul(player.h.water_7_mult))
        player.h.water_7_extra=player.h.water_7_extra.add(player.h.water_8_num.add(player.h.water_8_extra).mul(diff).mul(player.h.water_8_mult))

        player.h.totalwater=player.h.totalwater.add(player.h.waterGain.mul(diff))
        player.h.water_to_power=player.h.totalwaterfenzi.add(1).pow(2)
        player.h.water_to_qingqi=player.h.totalwaterfenzi.mul(2).add(1)

        //自动化
        if(layers.h.clickables["Auto-1"].EFFECT().gte(0.1))
        {
            player.h.time_auto_1=player.h.time_auto_1.add(diff)
            if(player.h.time_auto_1.gte(n(1).div(layers.h.clickables["Auto-1"].EFFECT())))
            {
                player.h.time_auto_1=n(0)
                if(layers.h.clickables["H-Upgrade-1"].canClick())layers.h.clickables["H-Upgrade-1"].onClick()
                if(layers.h.clickables["H-Upgrade-2"].canClick())layers.h.clickables["H-Upgrade-2"].onClick()
                if(layers.h.clickables["H-Upgrade-3"].canClick())layers.h.clickables["H-Upgrade-3"].onClick()
                if(layers.h.clickables["H-Upgrade-4"].canClick())layers.h.clickables["H-Upgrade-4"].onClick()
            }
        }
        if(layers.h.clickables["Auto-2"].EFFECT().gte(0.1))
        {
            if(layers.h.clickables["Auto-2"].EFFECT().gte(20.1))
            {
                var dmg=player.h.power.mul(layers.h.clickables["Auto-2"].EFFECT())
                player.h.fenziHpnow=player.h.fenziHpnow.sub(dmg.mul(diff)).max(0)
                player.h.total_dmg=player.h.total_dmg.add(dmg.mul(diff))
            }
            else
            {
                player.h.time_auto_2=player.h.time_auto_2.add(diff)
                if(player.h.time_auto_2.gte(n(1).div(layers.h.clickables["Auto-2"].EFFECT())))
                {
                    player.h.time_auto_2=n(0)
                    player.h.fenziHpnow=player.h.fenziHpnow.sub(player.h.power).max(0)
                    player.h.total_dmg=player.h.total_dmg.add(player.h.power)
                }
            }
            if(player.h.fenziHpnow.eq(0))
            {
                var gain=n(1)
                gain=gain.mul(layers.h.clickables["Water-Upgrade-1"].EFFECT())
                player.h.qingfenzi=player.h.qingfenzi.add(gain)
                player.h.totalqingfenzi=player.h.totalqingfenzi.add(gain)
                var x=player.h.qingfenzi
                var y=n(0)
                if(x.gte(100))x=x.div(100).pow(2).mul(100)
                var z=n(0.5)
                if(player.h.in_challenge_1.eq(0))z=z.div(layers.h.clickables["Water-Challenge-1"].EFFECT())
                if(player.h.in_challenge_1.eq(1))z=z.mul(layers.h.clickables["Water-Challenge-1"].DEBUFF())
                z=z.add(1)
                y=n(10).mul(n(z).pow(x))
                player.h.fenziHp=y
                player.h.fenziHpnow=player.h.fenziHp
            }
        }
    },
	microtabs:
    {
        "Water":
        {
			"Milestone":
            {
                unlocked(){return player.h.totalwaterfenzi.gte(1)},
                buttonStyle()
                {
                    return {"border-radius":"0px","border-color":"lightblue"}
                },
				content:[
                    "blank",
                    ["row",[["milestone","0"]]],
                    ["row",[["milestone","1"]]],
                    ["row",[["milestone","2"]]],
                    ["row",[["milestone","3"]]],
                    ["row",[["milestone","5"]]],
                    ["row",[["milestone","4"]]],
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
				]
			},
			"Buyable":
            {
                unlocked(){return player.h.totalwaterfenzi.gte(1)},
                buttonStyle()
                {
                    return {"border-radius":"0px","border-color":"lightblue"}
                },
				content:[
                    "blank",
                    ["row",[["clickable","Water-1"]]],
                    ["row",[["clickable","Water-2"]]],
                    ["row",[["clickable","Water-3"]]],
                    ["row",[["clickable","Water-4"]]],
                    ["row",[["clickable","Water-5"]]],
                    "blank",
                    ["row",[["clickable","Water-Speed"]]],
                    "blank",
                    "blank",
                    ["row",[["clickable","Water-Mini-Upgrade-1"],
                            ["clickable","Water-Mini-Upgrade-2"],
                            ["clickable","Water-Mini-Upgrade-3"],
                            ["clickable","Water-Mini-Upgrade-4"],
                            ["clickable","Water-Mini-Upgrade-5"],]],
                    ["row",[["clickable","Water-Mini-Upgrade-6"],
                            ["clickable","Water-Mini-Upgrade-7"],
                            ["clickable","Water-Mini-Upgrade-8"],
                            ["clickable","Water-Mini-Upgrade-9"],
                            ["clickable","Water-Mini-Upgrade-10"],]],
                    "blank",
                    "blank",
                    ["display-text",
                        function() {
                            if(player.h.on_which=="")return "无"
                            return layers.h.clickables[player.h.on_which].OUTPUT()
                        },
                        { "color": "white", "font-size": "28px",}
                    ],
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
				]
			},
			"Upgrade":
            {
                unlocked(){return player.h.totalwaterfenzi.gte(1)},
                buttonStyle()
                {
                    return {"border-radius":"0px","border-color":"lightblue"}
                },
				content:[
                    "blank",
                    ["row",[["clickable","Cold"],["clickable","Water-Upgrade-1"],["clickable","Hot"],]],
                    ["row",[["clickable","Water-Upgrade-2"],["clickable","Water-Upgrade-3"],]],
                    ["row",[["clickable","Water-Upgrade-4"]]],
                    "blank",
                    "blank",
                    ["row",[["upgrade",11],["upgrade",12],]],
                    ["row",[["upgrade",13],["upgrade",14],]],
                    "blank",
                    "blank",
                    ["row",[["upgrade",21],"blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank",["upgrade",22],]],
                    "blank",
                    "blank",
                    ["row",[["upgrade",23],]],
                    "blank",
                    "blank",
                    ["row",[["upgrade",31],"blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank",["upgrade",32],]],
                    "blank",
                    "blank",
                    ["row",[["upgrade",41],]],
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
				]
			},
			"Auto":
            {
                unlocked(){return player.h.totalwaterfenzi.gte(1)},
                buttonStyle()
                {
                    return {"border-radius":"0px","border-color":"lightblue"}
                },
				content:[
                    "blank",
                    ["row",[["clickable","Auto-1"],["clickable","Auto-2"],]],
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
				]
			},
			"Challenge":
            {
                unlocked(){return hasMilestone("h",5)},
                buttonStyle()
                {
                    return {"border-radius":"0px","border-color":"lightblue"}
                },
				content:[
                    "blank",
                    ["row",[["clickable","Water-Challenge-1"],]],
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
				]
			},
        },
    },
    tabFormat:
    {
        "Hydrogen":
        {
            buttonStyle()
            {
                return {"border-radius":"0px"}
            },
            content:
            [
                "blank",
                ["display-text",
                    function() {
                        if(player.h.totalqingfenzi.gte(1))
                        return '你有 <text style="color:#6495ED ; text-shadow:0px 0px 5px #6495ED">'+format(player.h.qingfenzi)+'</text> 个氢分子'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                "blank",
                ["display-text",
                    function() {
                        if(player.h.totalqingfenzi.gte(2))
                        return '你有 <text style="color:#6495ED">'+format(player.h.qingqi)+'</text> 氢气 <text style="color:#6495ED">H<sub>2</text>'
                    },
                    { "color": "white", "font-size": "24px",}
                ],
                ["display-text",
                    function() {
                        if(player.h.totalqingfenzi.gte(2))
                        return '+ <text style="color:#6495ED">'+format(player.h.qingqiGain)+'</text> /s'
                    },
                    { "color": "white", "font-size": "22px",}
                ],
                "blank",
                ["display-text",
                    function() {
                        if(player.h.power.gte(1.01) || player.h.totalwaterfenzi.gte(0.5))
                        return '你的力量为 : <text style="color:red">'+format(player.h.power.mul(layers.h.upgrades[21].EFFECT()))
                    },
                    { "color": "white", "font-size": "24px",}
                ],
                "blank",
                "blank",
                ["row",[["clickable","Fenzi"]]],
                "blank",
                "blank",
                ["row",[["bar","HpBar"]]],
                "blank",
                ["display-text",
                    function() {
                        if(player.h.qingfenzi.gte(100))
                        return '*警告 , H-100后的氢分子似乎变得更加坚硬'
                    },
                    { "color": "white", "font-size": "18px",}
                ],
                "blank",
                ["display-text",
                    function() {
                        if(player.h.totalqingfenzi.lte(0.5))
                        return '哇 , 这里有一个好可爱的氢分子 , 好想碰碰它'
                        if(player.h.totalqingfenzi.lte(1.5))
                        return '天 , 它怎么碎了 , 哦不<br>我不是故意的<br>(顺带着 , 你感觉一股气体冲在你的脸上)'
                        if(player.h.totalqingfenzi.lte(2.5))
                        return '诶 , 它好有趣啊 , 戳爆它好爽'
                        return ""
                    },
                    { "color": "white", "font-size": "24px",}
                ],
                ["row",[["clickable","H-Upgrade-1"],["clickable","H-Upgrade-2"]]],
                ["row",[["clickable","H-Upgrade-3"],["clickable","H-Upgrade-4"]]],
            ]
        },
        "Water":
        {
            unlocked()
            {
                return player.h.unlock_water.gte(0.5)
            },
            buttonStyle()
            {
                return {"border-radius":"0px","border-color":"lightblue"}
            },
            content:
            [
                "blank",
                ["display-text",
                    function() {
                        if(player.h.totalwaterfenzi.gte(1))
                        return '你有 <text style="color:lightblue ; text-shadow:0px 0px 5px lightblue">'+format(player.h.waterfenzi)+'</text> 个水分子'
                        +' 总计 : <text style="color:lightblue ; text-shadow:0px 0px 5px lightblue">'+format(player.h.totalwaterfenzi)
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        if(player.h.totalwaterfenzi.gte(1))
                        return '你的力量因此 <text style="color:red">x'+format(player.h.water_to_power)+'</text>'
                    },
                    { "color": "white", "font-size": "20px",}
                ],
                ["display-text",
                    function() {
                        if(player.h.totalwaterfenzi.gte(1))
                        return '你的氢气获取因此 <text style="color:#6495ED">x'+format(player.h.water_to_qingqi)+'</text>'
                    },
                    { "color": "white", "font-size": "20px",}
                ],
                "blank",
                ["display-text",
                    function() {
                        if(player.h.totalwater.gte(0.01))
                        return '你有 <text style="color:lightblue">'+format(player.h.water)+'</text> 水 <text style="color:#6495ED">H<sub>2</text><text style="color:#0066FF">O</text>'
                    },
                    { "color": "white", "font-size": "24px",}
                ],
                ["display-text",
                    function() {
                        if(player.h.totalwater.gte(0.01))
                        return '+ <text style="color:lightblue">'+format(player.h.waterGain)+'</text> /s'
                    },
                    { "color": "white", "font-size": "24px",}
                ],
                "blank",
                ["row",[["clickable","Bing"],["clickable","Shuizhengqi"],]],
                ["row",[["clickable","Water-Fenzi"]]],
                "blank",
                ["microtabs","Water",{'border-width':'0px'}],
            ]
        }
    },
    row: 1,
    layerShown(){return true},
})
//abpqsui