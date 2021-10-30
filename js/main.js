var colors = new Array(
   [62, 35, 255],
   [60, 255, 60],
   [255, 35, 98],
   [45, 175, 230],
   [255, 0, 255],
   [255, 128, 0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient() {

   if ($ === undefined) return;

   var c0_0 = colors[colorIndices[0]];
   var c0_1 = colors[colorIndices[1]];
   var c1_0 = colors[colorIndices[2]];
   var c1_1 = colors[colorIndices[3]];

   var istep = 1 - step;
   var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
   var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
   var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
   var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

   var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
   var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
   var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
   var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

   $('.animate-bg').css({
      background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
   }).css({
      background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
   });

   step += gradientSpeed;
   if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];

      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

   }
}

setInterval(updateGradient, 10);

function _instanceof(e, n) {
   return null != n && "undefined" != typeof Symbol && n[Symbol.hasInstance] ? !!n[Symbol.hasInstance](e) : e instanceof n;
}
function _classCallCheck(e, n) {
   if (!_instanceof(e, n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, n) {
   for (var t = 0; t < n.length; t++) {
      var a = n[t];
      (a.enumerable = a.enumerable || !1), (a.configurable = !0), "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
   }
}
function _createClass(e, n, t) {
   return n && _defineProperties(e.prototype, n), t && _defineProperties(e, t), e;
}
var minTimer = (function () {
   function n(e) {
      _classCallCheck(this, n),
         (this.hour = document.querySelectorAll("".concat(e.hour))),
         (this.min = document.querySelectorAll("".concat(e.min))),
         (this.sec = document.querySelectorAll("".concat(e.sec))),
         (this.separation = e.separation);
   }
   return (
      _createClass(n, [
         {
            key: "start",
            value: function () {
               var s = this;
               setInterval(function () {
                  var e, n, t, a, r, i, o;
                  (e = new Date()),
                     (n = e.getTimezoneOffset()),
                     (t = Math.floor(e / 1e3 - 60 * n)),
                     (a = 60 * Math.ceil((e / 1e3 / 60 - n) / 60 / 24) * 60 * 24 - t),
                     (r = ("0" + ~~(a / 60 / 60)).slice(-2)),
                     (i = ("0" + ~~((a / 60) % 60)).slice(-2)),
                     (o = ("0" + ~~(a % 60)).slice(-2)),
                     s.separation
                        ? (function () {
                           for (var e = 0; e < s.min.length; e++)
                              (s.hour[e].innerHTML = "<span>".concat(r[0], "</span><span>").concat(r[1], "</span>")),
                                 (s.min[e].innerHTML = "<span>".concat(i[0], "</span><span>").concat(i[1], "</span>")),
                                 (s.sec[e].innerHTML = "<span>".concat(o[0], "</span><span>").concat(o[1], "</span>"));
                        })()
                        : (function () {
                           for (var e = 0; e < s.min.length; e++) (s.hour[e].innerHTML = r), (s.min[e].innerHTML = i), (s.sec[e].innerHTML = o);
                        })();
               }, 1e3);
            },
         },
      ]),
      n
   );
})(),
   timer = new minTimer({ hour: ".t-hour", min: ".t-min", sec: ".t-sec", separation: !0 }).start();

// slider

$(document).ready(function () {

   $('a[href^="#"]').click(function () {
         var elementClick = $(this).attr("href");
         var destination = $(elementClick).offset().top;
         jQuery("html:not(:animated), body:not(:animated)").animate({ scrollTop: destination }, 800);
         return false;
      });

   $('.slider').slick({
      arrows: true,
      dots: true,
      adaptiveHeight: true
   });

   let controlsInfo = document.querySelectorAll('.slider .slick-dots li');
   for (var i = 0; i < controlsInfo.length; i++) {
      let itemText = controlsInfo[i].innerText;
      controlsInfo[i].innerText = itemText + '/5';
   }
});