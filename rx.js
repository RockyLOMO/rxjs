var DateFormat = {};
!function (e) {
    var a = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        r = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        t = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        s = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        u = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
        }, n = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[Z\-+]?(\d{2}:?\d{2})?/;
    e.format = function () {
        function e(e) {
            return a[parseInt(e, 10)] || e
        }

        function o(e) {
            return r[parseInt(e, 10)] || e
        }

        function l(e) {
            var a = parseInt(e, 10) - 1;
            return t[a] || e
        }

        function i(e) {
            var a = parseInt(e, 10) - 1;
            return s[a] || e
        }

        function c(e) {
            return u[e] || e
        }

        function b(e) {
            var a, r, t, s, u, n = e, o = "";
            return -1 !== n.indexOf(".") && (s = n.split("."), n = s[0], o = s[1]), u = n.split(":"), 3 === u.length ? (a = u[0], r = u[1], t = u[2].replace(/\s.+/, "").replace(/[a-z]/gi, ""), n = n.replace(/\s.+/, "").replace(/[a-z]/gi, ""), {
                time: n,
                hour: a,
                minute: r,
                second: t,
                millis: o
            }) : {time: "", hour: "", minute: "", second: "", millis: ""}
        }

        function h(e, a) {
            for (var r = a - String(e).length, t = 0; r > t; t++) e = "0" + e;
            return e
        }

        return {
            parseDate: function (e) {
                var a = {date: null, year: null, month: null, dayOfMonth: null, dayOfWeek: null, time: null};
                if ("number" == typeof e) return this.parseDate(new Date(e));
                if ("function" == typeof e.getFullYear) a.year = String(e.getFullYear()), a.month = String(e.getMonth() + 1), a.dayOfMonth = String(e.getDate()), a.time = b(e.toTimeString() + "." + e.getMilliseconds()); else if (-1 != e.search(n)) values = e.split(/[T\+-]/), a.year = values[0], a.month = values[1], a.dayOfMonth = values[2], a.time = b(values[3].split(".")[0]); else switch (values = e.split(" "), 6 === values.length && isNaN(values[5]) && (values[values.length] = "()"), values.length) {
                    case 6:
                        a.year = values[5], a.month = c(values[1]), a.dayOfMonth = values[2], a.time = b(values[3]);
                        break;
                    case 2:
                        subValues = values[0].split("-"), a.year = subValues[0], a.month = subValues[1], a.dayOfMonth = subValues[2], a.time = b(values[1]);
                        break;
                    case 7:
                    case 9:
                    case 10:
                        a.year = values[3], a.month = c(values[1]), a.dayOfMonth = values[2], a.time = b(values[4]);
                        break;
                    case 1:
                        subValues = values[0].split(""), a.year = subValues[0] + subValues[1] + subValues[2] + subValues[3], a.month = subValues[5] + subValues[6], a.dayOfMonth = subValues[8] + subValues[9], a.time = b(subValues[13] + subValues[14] + subValues[15] + subValues[16] + subValues[17] + subValues[18] + subValues[19] + subValues[20]);
                        break;
                    default:
                        return null
                }
                return a.date = new Date(a.year, a.month - 1, a.dayOfMonth), a.dayOfWeek = String(a.date.getDay()), a
            }, date: function (a, r) {
                try {
                    var t = this.parseDate(a);
                    if (null === t) return a;
                    for (var s = (t.date, t.year), u = t.month, n = t.dayOfMonth, c = t.dayOfWeek, b = t.time, d = "", y = "", f = "", m = !1, p = 0; p < r.length; p++) {
                        var g = r.charAt(p), k = r.charAt(p + 1);
                        if (m) "'" == g ? (y += "" === d ? "'" : d, d = "", m = !1) : d += g; else switch (d += g, f = "", d) {
                            case"ddd":
                                y += e(c), d = "";
                                break;
                            case"dd":
                                if ("d" === k) break;
                                y += h(n, 2), d = "";
                                break;
                            case"d":
                                if ("d" === k) break;
                                y += parseInt(n, 10), d = "";
                                break;
                            case"D":
                                n = 1 == n || 21 == n || 31 == n ? parseInt(n, 10) + "st" : 2 == n || 22 == n ? parseInt(n, 10) + "nd" : 3 == n || 23 == n ? parseInt(n, 10) + "rd" : parseInt(n, 10) + "th", y += n, d = "";
                                break;
                            case"MMMM":
                                y += i(u), d = "";
                                break;
                            case"MMM":
                                if ("M" === k) break;
                                y += l(u), d = "";
                                break;
                            case"MM":
                                if ("M" === k) break;
                                y += h(u, 2), d = "";
                                break;
                            case"M":
                                if ("M" === k) break;
                                y += parseInt(u, 10), d = "";
                                break;
                            case"y":
                            case"yyy":
                                if ("y" === k) break;
                                y += d, d = "";
                                break;
                            case"yy":
                                if ("y" === k) break;
                                y += String(s).slice(-2), d = "";
                                break;
                            case"yyyy":
                                y += s, d = "";
                                break;
                            case"HH":
                                y += h(b.hour, 2), d = "";
                                break;
                            case"H":
                                if ("H" === k) break;
                                y += parseInt(b.hour, 10), d = "";
                                break;
                            case"hh":
                                hour = 0 === parseInt(b.hour, 10) ? 12 : b.hour < 13 ? b.hour : b.hour - 12, y += h(hour, 2), d = "";
                                break;
                            case"h":
                                if ("h" === k) break;
                                hour = 0 === parseInt(b.hour, 10) ? 12 : b.hour < 13 ? b.hour : b.hour - 12, y += parseInt(hour, 10), d = "";
                                break;
                            case"mm":
                                y += h(b.minute, 2), d = "";
                                break;
                            case"m":
                                if ("m" === k) break;
                                y += b.minute, d = "";
                                break;
                            case"ss":
                                y += h(b.second.substring(0, 2), 2), d = "";
                                break;
                            case"s":
                                if ("s" === k) break;
                                y += b.second, d = "";
                                break;
                            case"S":
                            case"SS":
                                if ("S" === k) break;
                                y += d, d = "";
                                break;
                            case"SSS":
                                y += b.millis.substring(0, 3), d = "";
                                break;
                            case"a":
                                y += b.hour >= 12 ? "PM" : "AM", d = "";
                                break;
                            case"p":
                                y += b.hour >= 12 ? "p.m." : "a.m.", d = "";
                                break;
                            case"E":
                                y += o(c), d = "";
                                break;
                            case"'":
                                d = "", m = !0;
                                break;
                            default:
                                y += g, d = ""
                        }
                    }
                    return y += f
                } catch (M) {
                    return console && console.log && console.log(M), a
                }
            }, prettyDate: function (e) {
                var a, r, t;
                return ("string" == typeof e || "number" == typeof e) && (a = new Date(e)), "object" == typeof e && (a = new Date(e.toString())), r = ((new Date).getTime() - a.getTime()) / 1e3, t = Math.floor(r / 86400), isNaN(t) || 0 > t ? void 0 : 60 > r ? "just now" : 120 > r ? "1 minute ago" : 3600 > r ? Math.floor(r / 60) + " minutes ago" : 7200 > r ? "1 hour ago" : 86400 > r ? Math.floor(r / 3600) + " hours ago" : 1 === t ? "Yesterday" : 7 > t ? t + " days ago" : 31 > t ? Math.ceil(t / 7) + " weeks ago" : t >= 31 ? "more than 5 weeks ago" : void 0
            }, toBrowserTimeZone: function (e, a) {
                return this.date(new Date(e), a || "MM/dd/yyyy HH:mm:ss")
            }
        }
    }()
}(DateFormat), function (e) {
    e.format = DateFormat.format
}(jQuery), $.getDateDiff = function (e, a) {
    var r = $.format.date(e, "yyyy-MM-dd HH:mm");
    dateTime = Date.parse(r.replace(/-/gi, "/"));
    var t, s, u, n, o, l = dateTime / 1e3, i = parseInt((new Date).getTime() / 1e3), c = new Date(1e3 * l),
        b = c.getFullYear(), h = c.getMonth() + 1, d = c.getDate(), y = c.getHours(), f = c.getMinutes(),
        m = c.getSeconds();
    return 10 > h && (h = "0" + h), 10 > d && (d = "0" + d), 10 > y && (y = "0" + y), 10 > f && (f = "0" + f), 10 > m && (m = "0" + m), o = i - l, n = parseInt(o / 86400), u = parseInt(o / 3600), s = parseInt(o / 60), t = parseInt(o), n > 0 && 3 > n ? n + "天前" : 0 >= n && u > 0 ? u + "小时前" : 0 >= u && s > 0 ? s + "分钟前" : 60 > t ? 0 >= t ? "刚刚" : t + "秒前" : n >= 3 && 30 > n ? h + "-" + d + "&nbsp;" + y + ":" + f : n >= 30 ? b + "-" + h + "-" + d + "&nbsp;" + y + ":" + f : void 0
};
var rx = {
    _postMap: {},
    post: function (url, data, onSuccess, opts) {
        opts = $.extend({
            callTimeout: 30000,
            isJsonContent: false,
            isSingleMode: false,
            onError: null,
            onBegin: null,
            onEnd: null,
            onDone: null,
            onSuccess: onSuccess
        }, opts);
        try {
            if (rx._postMap[url]) {
                return false;
            }
            $.ajax({
                type: "POST",
                url: url,
                data: opts.isJsonContent ? JSON.stringify(data) : data,
                dataType: opts.isJsonContent ? "json" : null,
                contentType: opts.isJsonContent ? "application/json" : "application/x-www-form-urlencoded",
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
            }).always(function () {
                rx._postMap[url] = false;
                if (opts.onDone) {
                    opts.onDone();
                }
            });
            return rx._postMap[url] = true;
        }
        catch (e) {
            console.log(e);
        }
    },
    getParameter: function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    parseParameter: function () {
        var qs = location.search;
        if (!qs) {
            return {};
        }
        qs = qs.substring(1);
        return JSON.parse('{"' + qs.replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    },
    validate: function (selector, onFail) {
        onFail = onFail || function (elm, failMsg, failElmId) {
            var x = "_x", failElm = $("#" + failElmId);
            if (!failMsg) {
                failElm.hide();
                if (elm.attr2(x)==x) {
                    elm.css("border", "1px solid #ccc");
                }
                return;
            }
            if (failElm.text(failMsg).show().length == 0) {
                $("<b id='" + failElmId + "' class='red'>" + failMsg + "</b>").insertAfter(elm);
            }
            elm.css("border", "1px dashed red").attr2(x, x);
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
                    if (elm.attr2("mobile") != undefined) {
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
                    if (elm.attr2("citizenId") != undefined || elm.attr2("citizenid") != undefined) {
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
        $(selector).find("input,select,textarea").each(function (i, elm) {
            elm = $(elm);
            var pn = elm.attr2("id") || elm.attr2("name"), pv = elm.val();
            // console.log(pn, ": ", pv);
            if (!pn || !pv || (preFunc && !preFunc(elm, pn, data))) {
                return;
            }
            if (elm.attr2("timestamp") != undefined) {
                data[pn] = new Date(pv).getTime();
                console.log("timestamp", elm.attr2("timestamp"), pv, data[pn]);
            }
            data[pn] = pv;
        });
        return data;
    },
    setForm: function (selector, data, mapFunc) {
        $(selector).find("input,select,textarea,img").each(function (i, elm) {
            elm = $(elm);
            var pn = elm.attr2("id") || elm.attr2("name"), pv = mapFunc ? mapFunc(pn, data) : data[pn];
            if (!pn || !pv) {
                return true;
            }
            // console.log(pn, ": ", pv);
            if (rx.equalsIgnoreCase(elm.attr2("tagName"), "img")) {
                if (pv) {
                    elm.attr2("src", pv).show();
                } else {
                    elm.hide();
                }
                return true;
            }
            if (rx.equalsIgnoreCase(elm.attr2("type"), "date")) {
                if (pv) {
                    elm.val($.format.date(pv, "yyyy-MM-dd"));
                }
            }
            else {
                elm.val(pv);
            }
        });
    },
    call: function (func) {
        if (!jQuery.isFunction(func)) {
            return null;
        }
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return func(args);
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
    singleTimeout: function (func, delay, args) {
        if (!func) {
            return;
        }
        if (func._k) {
            clearTimeout(func._k);
        }
        func._k = setTimeout(func, delay, args);
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
    setTemplate: function (elm, data, opts) {
        elm = $(elm);
        opts = $.extend({
            tempName: elm.attr2("id") + 'Temp',
            action: 0,  //0 html,1 append,2 insertBefore,3 insertAfter
            onDataEmpty: null
        }, opts);
        var cd;
        if (opts.onDataEmpty && (!data || ((cd = data["data"]) && cd["length"] == 0) )) {
            opts.onDataEmpty(elm);
            return elm;
        }
        var html = template(opts.tempName, data);
        //console.log(opts.tempName, html);
        switch (opts.action) {
            case 1:
                elm.append(html);
                break;
            case 2:
                $(html).insertBefore(elm);
                break;
            case 3:
                $(html).insertAfter(elm);
                break;
            default:
                elm.html(html);
                break;
        }
        return elm;
    }
};
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
