/**
 * Created by za-wangxiaoming on 2017/7/14.
 */
(function ($) {
    $.fn.extend({
        attr2: function (k, v) {
            if (arguments.length > 1) {
                return this.prop(k, v) || this.attr(k, v);
            }
            return this.prop(k) || this.attr(k);
        }
    });
})(jQuery);
var rx = {
    post: function (url, data, onSuccess, opts) {
        opts = $.extend({
            callTimeout: 30000,
            isJsonContent: false,
            onError: null,
            onBegin: null,
            onEnd: null,
            onDone: null,
            onSuccess: onSuccess
        }, opts);
        try {
            $.ajax({
                type: "POST",
                url: url,
                data: opts.isJsonContent ? JSON.stringify(data) : data,
                dataType: opts.isJsonContent ? "json" : null,
                contentType: opts.isJsonContent ? "application/json" : null,
                success: opts.onSuccess,
                error: function (jqXHR, textStatus, errorThrown) {
                    if ($.isFunction(opts.onError)) {
                        opts.onError(textStatus);
                    }
                    console.error(textStatus + errorThrown);
                },
                timeout: opts.callTimeout,
                beforeSend: opts.onBegin,
                complete: opts.onEnd
            }).always(opts.onDone);
        }
        catch (e) {
            console.log(e);
        }
    },
    validate: function (selector, onFail) {
        onFail = onFail || function (elm, failMsg, failElmId) {
                var failElm = $("#" + failElmId);
                if (!failMsg) {
                    failElm.hide();
                    elm.css("border", "solid 1px #ccc");
                    return;
                }
                if (failElm.text(failMsg).show().length == 0) {
                    $("<b id='" + failElmId + "' class='red'>" + failMsg + "</b>").insertAfter(elm);
                }
                elm.css("border", "dashed 1px red");
            };
        var firstErr = null;
        var func = function (elm, failMsg) {
            elm = $(elm);
            var gid = elm.attr2("_gid");
            if (!gid) {
                elm.attr2("_gid", gid = rx.createId());
            }
            if (onFail) {
                onFail(elm, failMsg, gid + "Fail");
            }
            if (failMsg) {
                firstErr = firstErr || elm;
                console.log("vc", firstErr);
            }
            return true;//checkAll
        };
        var checkL = function (s, len) {
            var l = 0;
            var a = s.split("");
            for (var i = 0; i < a.length; i++) {
                if (a[i].charCodeAt(0) < 299) {
                    l++;
                }
                else {
                    l += 2;
                }
            }
            return l > len;
        };
        $(selector).find("input,select").each(function (i, elm) {
            elm = $(elm);
            var val = elm.val();
            if (!val) {
                if (elm.attr2("required")) {
                    return func(elm, elm.attr2("placeholder") || "此项必填");
                } else {
                    return true;
                }
            }
            var min = elm.attr2("min"), max = elm.attr2("max"), iType = elm.attr2("type").toLowerCase();
            switch (iType) {
                case "number":
                    val = parseFloat(val);
                    if (isNaN(val)) {
                        return func(elm, "请输入数字");
                    }
                    if (min && val < parseFloat(min)) {
                        return func(elm, "请输入大于" + min + "的数字");
                    }
                    if (max && val > parseFloat(max)) {
                        return func(elm, "请输入小于" + max + "的数字");
                    }
                    break;
                case "date":
                    val = Date.parse(val);
                    if (isNaN(val)) {
                        return func(elm, "请输入正确的日期");
                    }
                    if (min && val < Date.parse(min)) {
                        return func(elm, "请输入大于" + min + "的日期");
                    }
                    if (max && val > Date.parse(max)) {
                        return func(elm, "请输入小于" + max + "的日期");
                    }
                    break;
                case "tel":
                    if (elm.attr2("mobile")) {
                        if (!/^0{0,1}1[3|5|7|8]\d{9}$/gi.test(val)) {
                            return func(elm, "请输入正确的手机号");
                        }
                    } else {
                        if (!/(\d+-)?(\d{4}-?\d{7}|\d{3}-?\d{8}|^\d{7,8})(-\d+)?/gi.test(val)) {
                            return func(elm, "请输入正确的座机号");
                        }
                    }
                    break;
                case "email":
                    if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/gi.test(val)) {
                        return func(elm, "请输入正确的邮箱");
                    }
                    break;
                case "url":
                    if (!/^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/gi.test(val)) {
                        return func(elm, "请输入正确的Url");
                    }
                    break;
                default:
                    if (elm.attr2("citizenId") || elm.attr2("citizenid")) {
                        if (!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/gi.test(val)) {
                            return func(elm, "请输入正确的身份证号");
                        }
                    }
                    var s = iType == "password" ? "密码" : "文字";
                    var minl = parseInt(elm.attr2("minlength"));
                    if (minl > -1 && !checkL(val, minl - 1)) {
                        return func(elm, s + "长度应不少于" + minl + "位");
                    }
                    var maxl = parseInt(elm.attr2("maxlength"));
                    if (maxl > -1 && checkL(val, maxl)) {
                        return func(elm, s + "长度应不大于" + maxl + "位");
                    }
                    break;
            }
            func(elm);
        });
        if (firstErr) {
            rx.scrollTo(firstErr);
            firstErr.focus();
        }
        return !firstErr;
    },
    getForm: function (selector, data, preFunc) {
        data = data || {};
        $(selector).find("input,select").each(function (i, elm) {
            elm = $(elm);
            var pn = elm.attr2("id") || elm.attr2("name");
            console.log(pn);
            if (!pn) {
                return;
            }
            if (!preFunc(elm, pn, data)) {
                return;
            }
            data[pn] = elm.val();
        });
        return data;
    },
    setForm: function (selector, data) {
        $(selector).find("input,select,img").each(function (i, elm) {
            elm = $(elm);
            var pn = elm.attr2("id") || elm.attr2("name");
            if (rx.equalsIgnoreCase(elm.attr2("tagName"), "img")) {
                var url = data[pn];
                if (url) {
                    elm.attr2("src", url).show();
                } else {
                    elm.hide();
                }
                return true;
            }
            if (rx.equalsIgnoreCase(elm.attr2("type"), "date")) {
                if (data[pn]) {
                    elm.val($.format.date(data[pn], "yyyy-MM-dd"));
                }
            }
            else {
                elm.val(data[pn]);
            }
        });
    },
    stopEvent: function (e, stopBubble) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
        if (stopBubble) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        }
        return false;
    },
    equalsIgnoreCase: function (s1, s2) {
        return (s1 || "").toUpperCase() == (s2 || "").toUpperCase();
    },
    createId: function (length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < (length || 6); i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },
    toRmb: function (n) {
        var j = ",";
        var s = n + "";
        var l = s.length;
        var m = l % 3;
        if (m == l) return s;
        else if (m == 0) return (s.substring(m).match(/\d{3}/g)).join(j);
        else return [s.substr(0, m)].concat(s.substring(m).match(/\d{3}/g)).join(j);
    },
    scrollTo: function (elm) {
        var offset = $(elm).offset();
        offset.left -= 20;
        offset.top -= 20;
        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
    },
    autoResizeImage: function (imgElm, maxWidth, maxHeight) {
        var img = new Image();
        img.src = imgElm.src;
        var hRatio;
        var wRatio;
        var Ratio = 1;
        var w = img.width;
        var h = img.height;
        wRatio = maxWidth / w;
        hRatio = maxHeight / h;
        if (maxWidth == 0 && maxHeight == 0) {
            Ratio = 1;
        } else if (maxWidth == 0) {
            if (hRatio < 1) Ratio = hRatio;
        } else if (maxHeight == 0) {
            if (wRatio < 1) Ratio = wRatio;
        } else if (wRatio < 1 || hRatio < 1) {
            Ratio = (wRatio <= hRatio ? wRatio : hRatio);
        }
        if (Ratio < 1) {
            w = w * Ratio;
            h = h * Ratio;
        }
        imgElm.height = h;
        imgElm.width = w;
    },
    autoTextarea: function (id, opts) {
        var me = $("#" + id);
        opts = $.extend({
            maxHeight: null,  //文本框是否自动撑高，默认：null，不自动撑高；如果自动撑高必须输入数值，该值作为文本框自动撑高的最大高度
            minHeight: me.height()  //默认最小高度，也就是文本框最初的高度，当内容高度小于这个高度的时候，文本以这个高度显示
        }, opts);
        me.bind("focus blur paste cut keyup change", function () {
            var _this = me[0];
            var height, style = _this.style;
            _this.style.height = opts.minHeight + 'px';
            if (_this.scrollHeight > opts.minHeight) {
                if (opts.maxHeight && _this.scrollHeight > opts.maxHeight) {
                    height = opts.maxHeight;
                    style.overflowY = 'scroll';
                } else {
                    height = _this.scrollHeight;
                    style.overflowY = 'hidden';
                }
                style.height = height + 'px';
            }
        });
    },
    countdown: function (id, num, msg) {
        if (num == 0) {
            $(id).html(msg);
            return;
        }
        $(id).text(num--);
        setTimeout(arguments.callee, 1000, id, num, msg);
    },
    setTemplate: function (id, data, opts) {
        opts = $.extend({
            tempName: id + 'Temp',
            target: null,
            isAppend: false
        }, opts);
        var html = template(opts.tempName, data);
        //console.log("setTemplate", data);
        var me = $("#" + id);
        if (opts.target) {
            $(html).insertBefore($(opts.target));
            return me;
        }
        if (opts.isAppend) {
            me.append(html);
            return me;
        }
        me.html(html);
        return me;
    }
};
