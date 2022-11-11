# 图层功能

这是一个比较全面的可以添加到图层的既定特征的列表。如果你想让其他功能或数值与你的图层相关联，你可以自由添加更多。不过，这些都有特殊的功能。

你可以通过在它的位置上使用一个函数使几乎所有的值都是动态的，包括所有的显示字符串和样式/颜色特征。

## 图层定义的特征

-  layer:**自动分配**。它与本层的名称相同，所以你可以做`player[this.layer].point`或类似的动作来访问保存的值。它使复制代码到新层变得更容易。它也被分配给所有的升级和可购买的东西等等。

- name:**在重置确认中使用（以及默认的信息框标题）。如果没有，它就使用图层的ID。

- startData()。一个函数，用于返回该层的默认保存数据。添加任何你有的变量到它。确保使用`十进制`值而不是普通的数字。

    标准值。
        - 需要。
            - unlocked：一个bool，决定该层是否被解锁。
            - points: 一个小数，该层的主要货币。
        - 可选的。
            - total: 一个小数，追踪主要信誉货币的总量。始终跟踪，但只有在你在这里添加时才显示。
            - 最好的。一个小数，跟踪主要信誉货币的最高数额。总是被追踪，但只有在你添加到这里时才会显示。
            - unlockOrder：用于跟踪在此层之前解锁的相关层。
            - resetTime：一个数字，该层最后一次获得声望后的时间（或被其他层重置）。

- color：一个与此层相关的颜色，在很多地方使用。(一个带#的十六进制格式的字符串)

- row:这将影响节点在标准树上出现的位置，以及哪些重置会影响该层。

    使用 "side"而不是数字将导致该层作为一个较小的节点出现在边上（对成就和统计有用）。侧面层不会受到重置的影响，除非你给它们添加一个doReset。

- displayRow。**OVERRIDE** 改变图层节点出现的位置，而不改变它在重置顺序中的位置。

- resource:你在这个层上重置获得的主要货币的名称。

- effect(): **可选**。一个函数，计算并返回主货币固有的任何奖金的当前值。可以返回一个值或一个包含多个值的对象。*你还必须在应用它的地方实现效果。

- effectDescription。**可选择**。一个函数，返回这个效果的描述。如果文本保持不变，它可以只是一个字符串。

- layerShown(): **可选**，一个返回bool的函数，决定这个层的节点是否应该在树上可见。它也可以返回 "ghost"，这将隐藏该层，但它的节点仍将在树上占据空间。
    默认为true。

- hotkeys: **可选**。一个数组，包含与该层相关的任何热键的信息。

通过www.DeepL.com/Translator（免费版）翻译

    ```js
    hotkeys: [
        {
            key: "p", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "p: reset your points for prestige points", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.p.unlocked) doReset("p") },
            unlocked() {return hasMilestone('p', 3)} // Determines if you can use the hotkey, optional
        }
    ]
    ```

- style:**一个 "CSS对象"，其中的键是CSS属性，包含任何应该影响这个层的整个标签的CSS。

- tabFormat。**如果你想给你的标签添加额外的东西或改变布局，就用这个。[更多信息见这里](custom-tab-layouts.md)

- midsection:**optional**，是`tabFormat'的替代品，在标准标签布局中，它被插入到Milestones和Buyables之间。(不能做副标签)

## 大功能（都是可选的）

- upgrades:一组一次性购买的东西，可以有独特的升级条件、货币成本和奖金。[更多信息见这里]( upgrades.md)

- milestones:达到某种资源的特定阈值后获得的奖金列表。通常用于自动化/QOL。[更多信息见这里](milestones.md)

- challenges:玩家可以进入挑战，这使得游戏更难。如果他们达到目标并战胜挑战，他们就会获得奖励。[见这里获取更多信息。](challenges.md)

-  buyables:有效的升级，可以多次购买，并且可以选择重新设定。有许多用途。[更多信息见这里。](buyables.md)

- clickables。极其通用的通用按钮，只能在某些时候被点击。[更多信息见这里](clickables.md)

- microtabs。一个区域，其功能类似于一组小标签，顶部的按钮可以改变其中的内容。(高级） [更多信息见这里](subtabs-and-microtabs.md)

- bars: 以进度条、图示或类似方式显示一些信息。它们是高度可定制的，而且也可以是垂直的。[更多信息见这里。](bar.md)

- achievements:有点像里程碑，但有不同的显示风格和其他一些区别。额外的功能将在以后的日子里出现! [更多信息请看这里。](achievements.md)

- achievementPopups, milestonePopups: **可选**，如果是假的，当你获得成就/里程碑时，将禁用弹出信息。默认为真。

- infoboxes:（infoboxes）。在一个可以显示或隐藏的框中显示一些文本。[更多信息见这里](infoboxes.md)

- grid。一个行为相同的按钮网格，但有自己的数据。[更多信息见这里](grids.md)

## Prestige公式的特点

通过www.DeepL.com/Translator（免费版）翻译

- type:**可选**。决定你使用哪种威望公式。默认为 "无"。

    - "normal": 你获得的货币数量与它的当前数量无关（如声望）。奖金前的公式是基于`baseResource^exponent`。
    - "static": 费用取决于你重置后的总数。奖金前的公式是基于`base^(x^exponent)`。
    - "custom": 你可以自己定义一切，从计算到按钮上的文字。(更多内容见底部)
    - "none": 这一层没有声望，因此不需要本节中的任何其他特征。

- baseResource: The name of the resource that determines how much of the main currency you gain on reset.

- baseAmount(): A function that gets the current value of the base resource.

- requires: A Decimal, the amount of the base needed to gain 1 of the prestige currency. Also the amount required to unlock the layer. You can instead make this a function, to make it harder if another layer was unlocked first (based on unlockOrder).

- exponent: Used as described above.

- base: **sometimes required**. required for "static" layers, used as described above. If absent, defaults to 2. Must be greater than 1.

- roundUpCost: **optional**. a bool, which is true if the resource cost needs to be rounded up. (use if the base resource is a "static" currency.)

- gainMult(), gainExp(): **optional**. For normal layers, these functions calculate the multiplier and exponent on resource gain from upgrades and boosts and such. Plug in most bonuses here.
    For static layers, they instead multiply and roots the cost of the resource. (So to make a boost you want to make gainMult smaller and gainExp larger.)

- directMult(): **optional**. Directly multiplies the resource gain, after exponents and softcaps. For static layers, actually multiplies resource gain instead of reducing the cost.

- softcap, softcapPower: **optional**. For normal layers, gain beyond [softcap] points is put to the [softcapPower]th power
    Default for softcap is e1e7, and for power is 0.5.

## Other prestige-related features

- canBuyMax(): **sometimes required**. required for static layers, function used to determine if buying max is permitted.

- onPrestige(gain): **optional**. A function that triggers when this layer prestiges, just before you gain the currency.  Can be used to have secondary resource gain on prestige, or to recalculate things or whatnot.

- resetDescription: **optional**. Use this to replace "Reset for " on the Prestige button with something else.

- prestigeButtonText(): **sometimes required**. Use this to make the entirety of the text a Prestige button contains. Only required for custom layers, but usable by all types.

- passiveGeneration(): **optional**, returns a regular number. You automatically generate your gain times this number every second (does nothing if absent)
        This is good for automating Normal layers.

- autoPrestige(): **optional**, returns a boolean, if true, the layer will always automatically do a prestige if it can.
        This is good for automating Static layers.

## Tree/node features

- symbol: **optional**. The text that appears on this layer's node. Default is the layer id with the first letter capitalized.

- image: **override**. The url (local or global) of an image that goes on the node. (Overrides symbol)

- position: **optional**. Determines the horizontal position of the layer in its row in a standard tree. By default, it uses the layer id, and layers are sorted in alphabetical order.

- branches: **optional**. An array of layer/node ids. On a tree, a line will appear from this layer to all of the layers in the list. Alternatively, an entry in the array can be a 2-element array consisting of the layer id and a color value. The color value can either be a string with a hex color code, or a number from 1-3 (theme-affected colors). A third element in the array optionally specifies line width.

- nodeStyle: **optional**. A CSS object, where the keys are CSS attributes, which styles this layer's node on the tree.

- tooltip() / tooltipLocked(): **optional**. Functions that return text, which is the tooltip for the node when the layer is unlocked or locked, respectively. By default the tooltips behave the same as in the original Prestige Tree.
    If the value is "", the tooltip will be disabled.

- marked: **optional** Adds a mark to the corner of the node. If it's "true" it will be a star, but it can also be an image URL.

## Other features

- doReset(resettingLayer): **optional**. Is triggered when a layer on a row greater than or equal to this one does a reset. The default behavior is to reset everything on the row, but only if it was triggered by a layer in a higher row. `doReset` is always called for side layers, but for these the default behavior is to reset nothing.
                
    If you want to keep things, determine what to keep based on `resettingLayer`, `milestones`, and such, then call `layerDataReset(layer, keep)`, where `layer` is this layer, and `keep` is an array of the names of things to keep. It can include things like "points", "best", "total" (for this layer's prestige currency), "upgrades",  any unique variables like "generatorPower", etc. If you want to only keep specific upgrades or something like that, save them in a separate variable, then call `layerDataReset`, and then set `player[this.layer].upgrades` to the saved upgrades.

- update(diff): **optional**. This function is called every game tick. Use it for any passive resource production or time-based things. `diff` is the time since the last tick. 

- autoUpgrade: **optional**, a boolean value, if true, the game will attempt to buy this layer's upgrades every tick. Defaults to false.

- automate(): **optional**. This function is called every game tick, after production. Use it to activate automation things that aren't otherwise supported. 

- resetsNothing: **optional**. Returns true if this layer shouldn't trigger any resets when you prestige.

- increaseUnlockOrder: **optional**. An array of layer ids. When this layer is unlocked for the first time, the `unlockOrder` value for any not-yet-unlocked layers in this list increases. This can be used to make them harder to unlock.

- shouldNotify: **optional**. A function to return true if this layer should be highlighted in the tree. The layer will automatically be highlighted if you can buy an upgrade whether you have this or not.

- glowColor: **optional**. The color that this layer will be highlighted if it should notify. The default is red. You can use this if you want several different notification types!

- componentStyles: **optional**. An object that contains a set of functions returning CSS objects. Each of these will be applied to any components on the layer with the type of its id. Example:

```js
componentStyles: {
    "challenge"() { return {'height': '200px'} },
    "prestige-button"() { return {'color': '#AA66AA'} }
}
```

- leftTab: **optional**, if true, this layer will use the left tab instead of the right tab.

- previousTab: **optional**, a layer's id. If a layer has a previousTab, the layer will always have a back arrow and pressing the back arrow on this layer will take you to the layer with this id. 

- deactivated: **optional**, if this is true, hasUpgrade, hasChallenge, hasAchievement, and hasMilestone will return false for things in the layer, and you will be unable to buy or click things on the layer. You will have to disable effects of buyables, the innate layer effect, and possibly other things yourself.

## Custom Prestige type  
(All of these can also be used by other prestige types)

- getResetGain(): **mostly for custom prestige type**. Returns how many points you should get if you reset now. You can call `getResetGain(this.layer, useType = "static")` or similar to calculate what your gain would be under another prestige type (provided you have all of the required features in the layer).

- getNextAt(canMax=false): **mostly for custom prestige type**. Returns how many of the base currency you need to get to the next point. `canMax` is an optional variable used with Static-ish layers to differentiate between if it's looking for the first point you can reset at, or the requirement for any gain at all (Supporting both is good). You can also call `getNextAt(this.layer, canMax=false, useType = "static")` or similar to calculate what your next at would be under another prestige type (provided you have all of the required features in the layer).

- canReset(): **mostly for custom prestige type**. Return true only if you have the resources required to do a prestige here.

- prestigeNotify(): **mostly for custom prestige types**, returns true if this layer should be subtly highlighted to indicate you
        can prestige for a meaningful gain.