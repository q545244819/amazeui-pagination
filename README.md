# 简介

amazeui-pagination 是基于`amazeui`和`jQuery`所造的轮子，因为妹子 UI 官方没有分页相关的`js`组件故自己造了一个。欢迎大家提出问题和贡献代码。

# 如何使用

**HTML:**

```
<script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
<script src="amazeui-pagination.js"></script>

<ul class="am-pagination"></ul>
```

**JavaScript:**

```
var pagination = new Pagination({
  wrap: $('.am-pagination'), // 存放分页内容的容器
  count: 8, // 总页数
  current: 3, // 当前的页数（默认为1）
  prevText: '上一页', // prev 按钮的文本内容
  nextText: '下一页', // next 按钮的文本内容
  callback: function(page) { // 每一个页数按钮的回调事件
    // page 为当前点击的页数
  },
  // 会发送 get 请求到 /api/xxx/page/page_number
  // 或者你可以写成 /api/xxx?page= 插件发送的 url 为 /api/xxx?page=page_number
  // page_number 为当前的页数
  ajax: {
    url: '/api/xxx/page/',
    // 你可以传入你需要的 queryString
    data: {
      xxx: 'xxx',
      yyy: 'yyy',
      zzz: 'zzz'
    }
    success: function(result) {
      // result 成功返回的结果
    },
    error: function(error) {
      // error 失败返回的 message
    }
  }
});
```