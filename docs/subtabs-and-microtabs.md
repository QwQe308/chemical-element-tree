# 小标签和微标签

小标签是一个标签的独立部分，你可以通过在标签的顶部选择一个来查看。微型标签是更小的区域，其功能与之基本相同。你也可以在副标签/微型标签中嵌入图层。

小标签是通过使用像这样的标签格式来定义的，其中tabFormat的每个元素都被赋予该小标签的名称。

```js
tabFormat: {
    "Main tab": {
        content: [tab format things],
        *subtab features*
    },
    "Other tab": {
        content: [tab format things],
        *subtab features*
    },
    etc
}
```

微型标签的定义与此类似，使用相同的功能，但在 "微型标签 "功能中被定义。每个条目都是一组标签，将出现在microtabs组件中。第一组，"stuff"，有2个标签，第二组，"otherStuff"，没有。

```js
microtabs: {
    stuff: {
        first: {
            content: [tab format things],
            *subtab features*
        },
        second: {
            content: [tab format things],
            *subtab features*
        }
    },
    otherStuff: {
        // There could be another set of microtabs here
    }
}
```

普通副标签和微型标签副标签都使用相同的特征。

# 功能。

- 内容。副标签的标签布局代码，以[标签布局格式](custom-tab-layouts.md)的形式。

- 样式。**可选**。当切换到子标签时，将CSS应用于整个子标签，以 "CSS对象 "的形式，其中键是CSS属性，值是这些属性的值（都是字符串）。

- buttonStyle。**可选**。一个CSS对象，它影响该子标签的按钮的外观。

- unlocked(): **一个函数，用于确定该子标签的按钮是否应该可见。默认情况下，一个子标签总是被解锁的。你不能在这个函数中使用 "this "关键字。

- shouldNotify()/prestigeNotify()。**可选**，如果为真，标签按钮将被高亮，以通知玩家那里有东西。

- glowColor。**可选**，指定子标签发光的颜色。如果这个子标签导致主层结点发亮
    (否则就不会），该节点也会发出这种颜色。不会被嵌入层所覆盖。

- embedLayer: **重要的**，另一个图层的ID。如果你有这个，它将覆盖 "content"、"style "和 "shouldNotify"。
                而在子标签中显示整个图层。