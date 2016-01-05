/* global jQuery */
; (function (window, undefined, $) {
  'use strict';

  var Pagination = function (json) {
    this.wrap = json.wrap; // 分页控件的父容器
    this.count = json.count; // 页数，通过用后台传回
    this.callback = json.callback; // 点击页数的回调函数
    this.prevText = json.prevText || '&laquo;'; // prev 按钮的文本内容
    this.nextText = json.nextText || '&raquo;'; // next 按钮的文本内容
    this.differNumber = 3;
    this.current = json.current || 1; // 当前处于第几页
    /**
     * ajax.url 要访问的路径
     * ajax.success 成功回调函数
     * ajax.error 失败回调函数
     */
    this.ajax = json.ajax; // 点击页数调一个 get 异步请求

    // 调用初始化函数
    this.init();
  };

  window.Pagination = Pagination;

  Pagination.prototype.init = function () {
    var _self = this,
      wrap = _self.wrap,
      current = _self.current,
      callback = _self.callback,
      ajax = _self.ajax,
      get = _self.get,
      render = _self.render;

    $(wrap)
      .html(render.call(_self, current))
      .off()
      .on('click', 'li', function () {
        var $this = $(this),
          num = parseInt($this.text()),
          ruler = $this.data('ruler');

        // 如果当前点击的是页数的按钮的话，current 就赋值当前页数
        if ($.isNumeric(num)) {
          current = num;
        }

        if (($.isNumeric(num) || ruler) && !$this.hasClass('am-disabled')) {

          // 通过 data-ruler 的值来判断是上一页或下一页按钮
          switch (ruler) {
            case 'prev':
              current -= 1;
              break;
            case 'next':
              current += 1;
              break;
          }

          // 渲染分页内容
          $(_self.wrap).html(render.call(_self, current));
        }

        // 如果是有设置 ajax 的选项的话
        if (ajax) {
          get.call(_self, current);
        }

        // 如果有 callback 函数的话
        if (typeof callback === 'function') {
          callback(current);
        }
      })
      .on('click', 'a', function(e) {
        e.preventDefault();
      });
  };

  Pagination.prototype.get = function (num) {
    var _self = this,
      ajax = _self.ajax,
      url = ajax.url + num,
      data = ajax.data,
      success = ajax.success,
      error = ajax.error;

    $.get(url, data)
      .success(function (result) {
        if (typeof success === 'function') {
          success(result);
        }
      })
      .error(function (err) {
        if (typeof error === 'function') {
          error(err);
        }
      });
  };

  Pagination.prototype.render = function (num) {
    // 如果传入的不是一个数字的话就直接返回
    if (!num) {
      return;
    }

    var template = [],
      _self = this,
      count = _self.count,
      differNumber = _self.differNumber,
      prevText = _self.prevText,
      nextText = _self.nextText,
      base = (differNumber * 2) + 1,
      number, number2, number3;

    if (count > base) {
      number = (num - differNumber) <= 0 ? 1 : num - differNumber,
      number2 = (num + differNumber) >= count ? num - ((num + differNumber + 1) - count) : number,
      number3 = (number2 + (differNumber + 2)) >= count ? count : number2 + differNumber + 1;
    } else {
      number2 = 1;
      number3 = count;
    }

    // 如果当前是第一页的话，上一按钮不可用
    num > 1 ?
      template.push('<li data-ruler="prev"><a href="#">' + prevText + '</a></li>') :
      template.push('<li data-ruler="prev" class="am-disabled"><a href="#">' + prevText + '</a></li>');

    // 距离第一页页数过长就省略
    if (number3 > base && num + differNumber >= count) {
      template.push('<li><a href="#">1</a></li>');
      template.push('<li class="am-disabled"><a href="#">...</a></li>');
    }

    for (var i = number2; i <= number3; i++) {
      num === i ?
        template.push('<li class="am-active"><a href="#">' + i + '</a></li>') :
        template.push('<li><a href="#">' + i + '</a></li>');
    }

    // 距离最后一页页数过长就省略
    if (count > base && num + differNumber < count) {
      template.push('<li class="am-disabled"><a href="#">...</a></li>');
      template.push('<li><a href="#">' + count + '</a></li>');
    }

    // 如果当前是最后一页的话，下一页按钮不可用
    num === count ?
      template.push('<li data-ruler="next" class="am-disabled"><a href="#">' + nextText + '</a></li>') :
      template.push('<li data-ruler="next"><a href="#">' + nextText + '</a></li>');

    // 最后把 template 数组拼接成字符串
    return template.join('');
  };

})(window, undefined, jQuery);
