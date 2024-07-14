function Xy(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const i in r)
        if (i !== "default" && !(i in e)) {
          const o = Object.getOwnPropertyDescriptor(r, i);
          o &&
            Object.defineProperty(
              e,
              i,
              o.get ? o : { enumerable: !0, get: () => r[i] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
function Yy(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ih = { exports: {} },
  Ns = {},
  Rh = { exports: {} },
  U = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ui = Symbol.for("react.element"),
  Zy = Symbol.for("react.portal"),
  ev = Symbol.for("react.fragment"),
  tv = Symbol.for("react.strict_mode"),
  nv = Symbol.for("react.profiler"),
  rv = Symbol.for("react.provider"),
  iv = Symbol.for("react.context"),
  ov = Symbol.for("react.forward_ref"),
  sv = Symbol.for("react.suspense"),
  av = Symbol.for("react.memo"),
  lv = Symbol.for("react.lazy"),
  Zc = Symbol.iterator;
function uv(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Zc && e[Zc]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Ph = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Nh = Object.assign,
  Oh = {};
function xr(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Oh),
    (this.updater = n || Ph);
}
xr.prototype.isReactComponent = {};
xr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
xr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function bh() {}
bh.prototype = xr.prototype;
function Eu(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Oh),
    (this.updater = n || Ph);
}
var Su = (Eu.prototype = new bh());
Su.constructor = Eu;
Nh(Su, xr.prototype);
Su.isPureReactComponent = !0;
var ed = Array.isArray,
  Ah = Object.prototype.hasOwnProperty,
  ku = { current: null },
  Lh = { key: !0, ref: !0, __self: !0, __source: !0 };
function Dh(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Ah.call(t, r) && !Lh.hasOwnProperty(r) && (i[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    for (var l = Array(a), u = 0; u < a; u++) l[u] = arguments[u + 2];
    i.children = l;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
  return {
    $$typeof: Ui,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: ku.current,
  };
}
function cv(e, t) {
  return {
    $$typeof: Ui,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Cu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ui;
}
function dv(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var td = /\/+/g;
function fa(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? dv("" + e.key)
    : t.toString(36);
}
function So(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (o) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Ui:
          case Zy:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (i = i(s)),
      (e = r === "" ? "." + fa(s, 0) : r),
      ed(i)
        ? ((n = ""),
          e != null && (n = e.replace(td, "$&/") + "/"),
          So(i, t, n, "", function (u) {
            return u;
          }))
        : i != null &&
          (Cu(i) &&
            (i = cv(
              i,
              n +
                (!i.key || (s && s.key === i.key)
                  ? ""
                  : ("" + i.key).replace(td, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), ed(e)))
    for (var a = 0; a < e.length; a++) {
      o = e[a];
      var l = r + fa(o, a);
      s += So(o, t, n, l, i);
    }
  else if (((l = uv(e)), typeof l == "function"))
    for (e = l.call(e), a = 0; !(o = e.next()).done; )
      (o = o.value), (l = r + fa(o, a++)), (s += So(o, t, n, l, i));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return s;
}
function Zi(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    So(e, r, "", "", function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function fv(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var we = { current: null },
  ko = { transition: null },
  hv = {
    ReactCurrentDispatcher: we,
    ReactCurrentBatchConfig: ko,
    ReactCurrentOwner: ku,
  };
function Uh() {
  throw Error("act(...) is not supported in production builds of React.");
}
U.Children = {
  map: Zi,
  forEach: function (e, t, n) {
    Zi(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Zi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Zi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Cu(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
U.Component = xr;
U.Fragment = ev;
U.Profiler = nv;
U.PureComponent = Eu;
U.StrictMode = tv;
U.Suspense = sv;
U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = hv;
U.act = Uh;
U.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Nh({}, e.props),
    i = e.key,
    o = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (s = ku.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (l in t)
      Ah.call(t, l) &&
        !Lh.hasOwnProperty(l) &&
        (r[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    a = Array(l);
    for (var u = 0; u < l; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  return { $$typeof: Ui, type: e.type, key: i, ref: o, props: r, _owner: s };
};
U.createContext = function (e) {
  return (
    (e = {
      $$typeof: iv,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: rv, _context: e }),
    (e.Consumer = e)
  );
};
U.createElement = Dh;
U.createFactory = function (e) {
  var t = Dh.bind(null, e);
  return (t.type = e), t;
};
U.createRef = function () {
  return { current: null };
};
U.forwardRef = function (e) {
  return { $$typeof: ov, render: e };
};
U.isValidElement = Cu;
U.lazy = function (e) {
  return { $$typeof: lv, _payload: { _status: -1, _result: e }, _init: fv };
};
U.memo = function (e, t) {
  return { $$typeof: av, type: e, compare: t === void 0 ? null : t };
};
U.startTransition = function (e) {
  var t = ko.transition;
  ko.transition = {};
  try {
    e();
  } finally {
    ko.transition = t;
  }
};
U.unstable_act = Uh;
U.useCallback = function (e, t) {
  return we.current.useCallback(e, t);
};
U.useContext = function (e) {
  return we.current.useContext(e);
};
U.useDebugValue = function () {};
U.useDeferredValue = function (e) {
  return we.current.useDeferredValue(e);
};
U.useEffect = function (e, t) {
  return we.current.useEffect(e, t);
};
U.useId = function () {
  return we.current.useId();
};
U.useImperativeHandle = function (e, t, n) {
  return we.current.useImperativeHandle(e, t, n);
};
U.useInsertionEffect = function (e, t) {
  return we.current.useInsertionEffect(e, t);
};
U.useLayoutEffect = function (e, t) {
  return we.current.useLayoutEffect(e, t);
};
U.useMemo = function (e, t) {
  return we.current.useMemo(e, t);
};
U.useReducer = function (e, t, n) {
  return we.current.useReducer(e, t, n);
};
U.useRef = function (e) {
  return we.current.useRef(e);
};
U.useState = function (e) {
  return we.current.useState(e);
};
U.useSyncExternalStore = function (e, t, n) {
  return we.current.useSyncExternalStore(e, t, n);
};
U.useTransition = function () {
  return we.current.useTransition();
};
U.version = "18.3.1";
Rh.exports = U;
var C = Rh.exports;
const Tu = Yy(C),
  tl = Xy({ __proto__: null, default: Tu }, [C]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var pv = C,
  mv = Symbol.for("react.element"),
  gv = Symbol.for("react.fragment"),
  yv = Object.prototype.hasOwnProperty,
  vv = pv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  wv = { key: !0, ref: !0, __self: !0, __source: !0 };
function Mh(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (r in t) yv.call(t, r) && !wv.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: mv,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: vv.current,
  };
}
Ns.Fragment = gv;
Ns.jsx = Mh;
Ns.jsxs = Mh;
Ih.exports = Ns;
var w = Ih.exports,
  nl = {},
  jh = { exports: {} },
  Me = {},
  Fh = { exports: {} },
  Bh = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(N, A) {
    var D = N.length;
    N.push(A);
    e: for (; 0 < D; ) {
      var Y = (D - 1) >>> 1,
        ie = N[Y];
      if (0 < i(ie, A)) (N[Y] = A), (N[D] = ie), (D = Y);
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var A = N[0],
      D = N.pop();
    if (D !== A) {
      N[0] = D;
      e: for (var Y = 0, ie = N.length, Xi = ie >>> 1; Y < Xi; ) {
        var mn = 2 * (Y + 1) - 1,
          da = N[mn],
          gn = mn + 1,
          Yi = N[gn];
        if (0 > i(da, D))
          gn < ie && 0 > i(Yi, da)
            ? ((N[Y] = Yi), (N[gn] = D), (Y = gn))
            : ((N[Y] = da), (N[mn] = D), (Y = mn));
        else if (gn < ie && 0 > i(Yi, D)) (N[Y] = Yi), (N[gn] = D), (Y = gn);
        else break e;
      }
    }
    return A;
  }
  function i(N, A) {
    var D = N.sortIndex - A.sortIndex;
    return D !== 0 ? D : N.id - A.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var s = Date,
      a = s.now();
    e.unstable_now = function () {
      return s.now() - a;
    };
  }
  var l = [],
    u = [],
    c = 1,
    d = null,
    f = 3,
    v = !1,
    g = !1,
    y = !1,
    E = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(N) {
    for (var A = n(u); A !== null; ) {
      if (A.callback === null) r(u);
      else if (A.startTime <= N)
        r(u), (A.sortIndex = A.expirationTime), t(l, A);
      else break;
      A = n(u);
    }
  }
  function _(N) {
    if (((y = !1), m(N), !g))
      if (n(l) !== null) (g = !0), ua(k);
      else {
        var A = n(u);
        A !== null && ca(_, A.startTime - N);
      }
  }
  function k(N, A) {
    (g = !1), y && ((y = !1), h(R), (R = -1)), (v = !0);
    var D = f;
    try {
      for (
        m(A), d = n(l);
        d !== null && (!(d.expirationTime > A) || (N && !Re()));

      ) {
        var Y = d.callback;
        if (typeof Y == "function") {
          (d.callback = null), (f = d.priorityLevel);
          var ie = Y(d.expirationTime <= A);
          (A = e.unstable_now()),
            typeof ie == "function" ? (d.callback = ie) : d === n(l) && r(l),
            m(A);
        } else r(l);
        d = n(l);
      }
      if (d !== null) var Xi = !0;
      else {
        var mn = n(u);
        mn !== null && ca(_, mn.startTime - A), (Xi = !1);
      }
      return Xi;
    } finally {
      (d = null), (f = D), (v = !1);
    }
  }
  var x = !1,
    I = null,
    R = -1,
    F = 5,
    L = -1;
  function Re() {
    return !(e.unstable_now() - L < F);
  }
  function Dr() {
    if (I !== null) {
      var N = e.unstable_now();
      L = N;
      var A = !0;
      try {
        A = I(!0, N);
      } finally {
        A ? Ur() : ((x = !1), (I = null));
      }
    } else x = !1;
  }
  var Ur;
  if (typeof p == "function")
    Ur = function () {
      p(Dr);
    };
  else if (typeof MessageChannel < "u") {
    var Yc = new MessageChannel(),
      Qy = Yc.port2;
    (Yc.port1.onmessage = Dr),
      (Ur = function () {
        Qy.postMessage(null);
      });
  } else
    Ur = function () {
      E(Dr, 0);
    };
  function ua(N) {
    (I = N), x || ((x = !0), Ur());
  }
  function ca(N, A) {
    R = E(function () {
      N(e.unstable_now());
    }, A);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (N) {
      N.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      g || v || ((g = !0), ua(k));
    }),
    (e.unstable_forceFrameRate = function (N) {
      0 > N || 125 < N
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (F = 0 < N ? Math.floor(1e3 / N) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(l);
    }),
    (e.unstable_next = function (N) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var A = 3;
          break;
        default:
          A = f;
      }
      var D = f;
      f = A;
      try {
        return N();
      } finally {
        f = D;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (N, A) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var D = f;
      f = N;
      try {
        return A();
      } finally {
        f = D;
      }
    }),
    (e.unstable_scheduleCallback = function (N, A, D) {
      var Y = e.unstable_now();
      switch (
        (typeof D == "object" && D !== null
          ? ((D = D.delay), (D = typeof D == "number" && 0 < D ? Y + D : Y))
          : (D = Y),
        N)
      ) {
        case 1:
          var ie = -1;
          break;
        case 2:
          ie = 250;
          break;
        case 5:
          ie = 1073741823;
          break;
        case 4:
          ie = 1e4;
          break;
        default:
          ie = 5e3;
      }
      return (
        (ie = D + ie),
        (N = {
          id: c++,
          callback: A,
          priorityLevel: N,
          startTime: D,
          expirationTime: ie,
          sortIndex: -1,
        }),
        D > Y
          ? ((N.sortIndex = D),
            t(u, N),
            n(l) === null &&
              N === n(u) &&
              (y ? (h(R), (R = -1)) : (y = !0), ca(_, D - Y)))
          : ((N.sortIndex = ie), t(l, N), g || v || ((g = !0), ua(k))),
        N
      );
    }),
    (e.unstable_shouldYield = Re),
    (e.unstable_wrapCallback = function (N) {
      var A = f;
      return function () {
        var D = f;
        f = A;
        try {
          return N.apply(this, arguments);
        } finally {
          f = D;
        }
      };
    });
})(Bh);
Fh.exports = Bh;
var _v = Fh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ev = C,
  Le = _v;
function T(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var zh = new Set(),
  di = {};
function Bn(e, t) {
  hr(e, t), hr(e + "Capture", t);
}
function hr(e, t) {
  for (di[e] = t, e = 0; e < t.length; e++) zh.add(t[e]);
}
var St = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  rl = Object.prototype.hasOwnProperty,
  Sv =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  nd = {},
  rd = {};
function kv(e) {
  return rl.call(rd, e)
    ? !0
    : rl.call(nd, e)
    ? !1
    : Sv.test(e)
    ? (rd[e] = !0)
    : ((nd[e] = !0), !1);
}
function Cv(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Tv(e, t, n, r) {
  if (t === null || typeof t > "u" || Cv(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function _e(e, t, n, r, i, o, s) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = s);
}
var ce = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ce[e] = new _e(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ce[t] = new _e(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ce[e] = new _e(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ce[e] = new _e(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ce[e] = new _e(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ce[e] = new _e(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ce[e] = new _e(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ce[e] = new _e(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ce[e] = new _e(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var xu = /[\-:]([a-z])/g;
function Iu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(xu, Iu);
    ce[t] = new _e(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(xu, Iu);
    ce[t] = new _e(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(xu, Iu);
  ce[t] = new _e(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ce[e] = new _e(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ce.xlinkHref = new _e(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ce[e] = new _e(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ru(e, t, n, r) {
  var i = ce.hasOwnProperty(t) ? ce[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Tv(t, n, i, r) && (n = null),
    r || i === null
      ? kv(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Rt = Ev.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  eo = Symbol.for("react.element"),
  Kn = Symbol.for("react.portal"),
  Gn = Symbol.for("react.fragment"),
  Pu = Symbol.for("react.strict_mode"),
  il = Symbol.for("react.profiler"),
  $h = Symbol.for("react.provider"),
  Hh = Symbol.for("react.context"),
  Nu = Symbol.for("react.forward_ref"),
  ol = Symbol.for("react.suspense"),
  sl = Symbol.for("react.suspense_list"),
  Ou = Symbol.for("react.memo"),
  Dt = Symbol.for("react.lazy"),
  Vh = Symbol.for("react.offscreen"),
  id = Symbol.iterator;
function Mr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (id && e[id]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var G = Object.assign,
  ha;
function Gr(e) {
  if (ha === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ha = (t && t[1]) || "";
    }
  return (
    `
` +
    ha +
    e
  );
}
var pa = !1;
function ma(e, t) {
  if (!e || pa) return "";
  pa = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var i = u.stack.split(`
`),
          o = r.stack.split(`
`),
          s = i.length - 1,
          a = o.length - 1;
        1 <= s && 0 <= a && i[s] !== o[a];

      )
        a--;
      for (; 1 <= s && 0 <= a; s--, a--)
        if (i[s] !== o[a]) {
          if (s !== 1 || a !== 1)
            do
              if ((s--, a--, 0 > a || i[s] !== o[a])) {
                var l =
                  `
` + i[s].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    l.includes("<anonymous>") &&
                    (l = l.replace("<anonymous>", e.displayName)),
                  l
                );
              }
            while (1 <= s && 0 <= a);
          break;
        }
    }
  } finally {
    (pa = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Gr(e) : "";
}
function xv(e) {
  switch (e.tag) {
    case 5:
      return Gr(e.type);
    case 16:
      return Gr("Lazy");
    case 13:
      return Gr("Suspense");
    case 19:
      return Gr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = ma(e.type, !1)), e;
    case 11:
      return (e = ma(e.type.render, !1)), e;
    case 1:
      return (e = ma(e.type, !0)), e;
    default:
      return "";
  }
}
function al(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Gn:
      return "Fragment";
    case Kn:
      return "Portal";
    case il:
      return "Profiler";
    case Pu:
      return "StrictMode";
    case ol:
      return "Suspense";
    case sl:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Hh:
        return (e.displayName || "Context") + ".Consumer";
      case $h:
        return (e._context.displayName || "Context") + ".Provider";
      case Nu:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Ou:
        return (
          (t = e.displayName || null), t !== null ? t : al(e.type) || "Memo"
        );
      case Dt:
        (t = e._payload), (e = e._init);
        try {
          return al(e(t));
        } catch {}
    }
  return null;
}
function Iv(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return al(t);
    case 8:
      return t === Pu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function sn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Wh(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Rv(e) {
  var t = Wh(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (s) {
          (r = "" + s), o.call(this, s);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = "" + s;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function to(e) {
  e._valueTracker || (e._valueTracker = Rv(e));
}
function Kh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Wh(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Bo(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ll(e, t) {
  var n = t.checked;
  return G({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function od(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = sn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Gh(e, t) {
  (t = t.checked), t != null && Ru(e, "checked", t, !1);
}
function ul(e, t) {
  Gh(e, t);
  var n = sn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? cl(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && cl(e, t.type, sn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function sd(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function cl(e, t, n) {
  (t !== "number" || Bo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var qr = Array.isArray;
function ir(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + sn(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function dl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(T(91));
  return G({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function ad(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(T(92));
      if (qr(n)) {
        if (1 < n.length) throw Error(T(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: sn(n) };
}
function qh(e, t) {
  var n = sn(t.value),
    r = sn(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function ld(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Jh(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function fl(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Jh(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var no,
  Qh = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        no = no || document.createElement("div"),
          no.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = no.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function fi(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var ei = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Pv = ["Webkit", "ms", "Moz", "O"];
Object.keys(ei).forEach(function (e) {
  Pv.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ei[t] = ei[e]);
  });
});
function Xh(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (ei.hasOwnProperty(e) && ei[e])
    ? ("" + t).trim()
    : t + "px";
}
function Yh(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = Xh(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var Nv = G(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function hl(e, t) {
  if (t) {
    if (Nv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(T(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(T(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(T(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(T(62));
  }
}
function pl(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ml = null;
function bu(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var gl = null,
  or = null,
  sr = null;
function ud(e) {
  if ((e = Fi(e))) {
    if (typeof gl != "function") throw Error(T(280));
    var t = e.stateNode;
    t && ((t = Ds(t)), gl(e.stateNode, e.type, t));
  }
}
function Zh(e) {
  or ? (sr ? sr.push(e) : (sr = [e])) : (or = e);
}
function ep() {
  if (or) {
    var e = or,
      t = sr;
    if (((sr = or = null), ud(e), t)) for (e = 0; e < t.length; e++) ud(t[e]);
  }
}
function tp(e, t) {
  return e(t);
}
function np() {}
var ga = !1;
function rp(e, t, n) {
  if (ga) return e(t, n);
  ga = !0;
  try {
    return tp(e, t, n);
  } finally {
    (ga = !1), (or !== null || sr !== null) && (np(), ep());
  }
}
function hi(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Ds(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(T(231, t, typeof n));
  return n;
}
var yl = !1;
if (St)
  try {
    var jr = {};
    Object.defineProperty(jr, "passive", {
      get: function () {
        yl = !0;
      },
    }),
      window.addEventListener("test", jr, jr),
      window.removeEventListener("test", jr, jr);
  } catch {
    yl = !1;
  }
function Ov(e, t, n, r, i, o, s, a, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var ti = !1,
  zo = null,
  $o = !1,
  vl = null,
  bv = {
    onError: function (e) {
      (ti = !0), (zo = e);
    },
  };
function Av(e, t, n, r, i, o, s, a, l) {
  (ti = !1), (zo = null), Ov.apply(bv, arguments);
}
function Lv(e, t, n, r, i, o, s, a, l) {
  if ((Av.apply(this, arguments), ti)) {
    if (ti) {
      var u = zo;
      (ti = !1), (zo = null);
    } else throw Error(T(198));
    $o || (($o = !0), (vl = u));
  }
}
function zn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function ip(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function cd(e) {
  if (zn(e) !== e) throw Error(T(188));
}
function Dv(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = zn(e)), t === null)) throw Error(T(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return cd(i), e;
        if (o === r) return cd(i), t;
        o = o.sibling;
      }
      throw Error(T(188));
    }
    if (n.return !== r.return) (n = i), (r = o);
    else {
      for (var s = !1, a = i.child; a; ) {
        if (a === n) {
          (s = !0), (n = i), (r = o);
          break;
        }
        if (a === r) {
          (s = !0), (r = i), (n = o);
          break;
        }
        a = a.sibling;
      }
      if (!s) {
        for (a = o.child; a; ) {
          if (a === n) {
            (s = !0), (n = o), (r = i);
            break;
          }
          if (a === r) {
            (s = !0), (r = o), (n = i);
            break;
          }
          a = a.sibling;
        }
        if (!s) throw Error(T(189));
      }
    }
    if (n.alternate !== r) throw Error(T(190));
  }
  if (n.tag !== 3) throw Error(T(188));
  return n.stateNode.current === n ? e : t;
}
function op(e) {
  return (e = Dv(e)), e !== null ? sp(e) : null;
}
function sp(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = sp(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ap = Le.unstable_scheduleCallback,
  dd = Le.unstable_cancelCallback,
  Uv = Le.unstable_shouldYield,
  Mv = Le.unstable_requestPaint,
  Z = Le.unstable_now,
  jv = Le.unstable_getCurrentPriorityLevel,
  Au = Le.unstable_ImmediatePriority,
  lp = Le.unstable_UserBlockingPriority,
  Ho = Le.unstable_NormalPriority,
  Fv = Le.unstable_LowPriority,
  up = Le.unstable_IdlePriority,
  Os = null,
  ct = null;
function Bv(e) {
  if (ct && typeof ct.onCommitFiberRoot == "function")
    try {
      ct.onCommitFiberRoot(Os, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Ze = Math.clz32 ? Math.clz32 : Hv,
  zv = Math.log,
  $v = Math.LN2;
function Hv(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((zv(e) / $v) | 0)) | 0;
}
var ro = 64,
  io = 4194304;
function Jr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Vo(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var a = s & ~i;
    a !== 0 ? (r = Jr(a)) : ((o &= s), o !== 0 && (r = Jr(o)));
  } else (s = n & ~i), s !== 0 ? (r = Jr(s)) : o !== 0 && (r = Jr(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Ze(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function Vv(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Wv(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var s = 31 - Ze(o),
      a = 1 << s,
      l = i[s];
    l === -1
      ? (!(a & n) || a & r) && (i[s] = Vv(a, t))
      : l <= t && (e.expiredLanes |= a),
      (o &= ~a);
  }
}
function wl(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function cp() {
  var e = ro;
  return (ro <<= 1), !(ro & 4194240) && (ro = 64), e;
}
function ya(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Mi(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Ze(t)),
    (e[t] = n);
}
function Kv(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Ze(n),
      o = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
  }
}
function Lu(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Ze(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var j = 0;
function dp(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var fp,
  Du,
  hp,
  pp,
  mp,
  _l = !1,
  oo = [],
  Kt = null,
  Gt = null,
  qt = null,
  pi = new Map(),
  mi = new Map(),
  Mt = [],
  Gv =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function fd(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Kt = null;
      break;
    case "dragenter":
    case "dragleave":
      Gt = null;
      break;
    case "mouseover":
    case "mouseout":
      qt = null;
      break;
    case "pointerover":
    case "pointerout":
      pi.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      mi.delete(t.pointerId);
  }
}
function Fr(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = Fi(t)), t !== null && Du(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function qv(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (Kt = Fr(Kt, e, t, n, r, i)), !0;
    case "dragenter":
      return (Gt = Fr(Gt, e, t, n, r, i)), !0;
    case "mouseover":
      return (qt = Fr(qt, e, t, n, r, i)), !0;
    case "pointerover":
      var o = i.pointerId;
      return pi.set(o, Fr(pi.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (o = i.pointerId), mi.set(o, Fr(mi.get(o) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function gp(e) {
  var t = En(e.target);
  if (t !== null) {
    var n = zn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = ip(n)), t !== null)) {
          (e.blockedOn = t),
            mp(e.priority, function () {
              hp(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Co(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = El(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (ml = r), n.target.dispatchEvent(r), (ml = null);
    } else return (t = Fi(n)), t !== null && Du(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function hd(e, t, n) {
  Co(e) && n.delete(t);
}
function Jv() {
  (_l = !1),
    Kt !== null && Co(Kt) && (Kt = null),
    Gt !== null && Co(Gt) && (Gt = null),
    qt !== null && Co(qt) && (qt = null),
    pi.forEach(hd),
    mi.forEach(hd);
}
function Br(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    _l ||
      ((_l = !0),
      Le.unstable_scheduleCallback(Le.unstable_NormalPriority, Jv)));
}
function gi(e) {
  function t(i) {
    return Br(i, e);
  }
  if (0 < oo.length) {
    Br(oo[0], e);
    for (var n = 1; n < oo.length; n++) {
      var r = oo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Kt !== null && Br(Kt, e),
      Gt !== null && Br(Gt, e),
      qt !== null && Br(qt, e),
      pi.forEach(t),
      mi.forEach(t),
      n = 0;
    n < Mt.length;
    n++
  )
    (r = Mt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Mt.length && ((n = Mt[0]), n.blockedOn === null); )
    gp(n), n.blockedOn === null && Mt.shift();
}
var ar = Rt.ReactCurrentBatchConfig,
  Wo = !0;
function Qv(e, t, n, r) {
  var i = j,
    o = ar.transition;
  ar.transition = null;
  try {
    (j = 1), Uu(e, t, n, r);
  } finally {
    (j = i), (ar.transition = o);
  }
}
function Xv(e, t, n, r) {
  var i = j,
    o = ar.transition;
  ar.transition = null;
  try {
    (j = 4), Uu(e, t, n, r);
  } finally {
    (j = i), (ar.transition = o);
  }
}
function Uu(e, t, n, r) {
  if (Wo) {
    var i = El(e, t, n, r);
    if (i === null) Ia(e, t, r, Ko, n), fd(e, r);
    else if (qv(i, e, t, n, r)) r.stopPropagation();
    else if ((fd(e, r), t & 4 && -1 < Gv.indexOf(e))) {
      for (; i !== null; ) {
        var o = Fi(i);
        if (
          (o !== null && fp(o),
          (o = El(e, t, n, r)),
          o === null && Ia(e, t, r, Ko, n),
          o === i)
        )
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else Ia(e, t, r, null, n);
  }
}
var Ko = null;
function El(e, t, n, r) {
  if (((Ko = null), (e = bu(r)), (e = En(e)), e !== null))
    if (((t = zn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = ip(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Ko = e), null;
}
function yp(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (jv()) {
        case Au:
          return 1;
        case lp:
          return 4;
        case Ho:
        case Fv:
          return 16;
        case up:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Ht = null,
  Mu = null,
  To = null;
function vp() {
  if (To) return To;
  var e,
    t = Mu,
    n = t.length,
    r,
    i = "value" in Ht ? Ht.value : Ht.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
  return (To = i.slice(e, 1 < r ? 1 - r : void 0));
}
function xo(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function so() {
  return !0;
}
function pd() {
  return !1;
}
function je(e) {
  function t(n, r, i, o, s) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = s),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(o) : o[a]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? so
        : pd),
      (this.isPropagationStopped = pd),
      this
    );
  }
  return (
    G(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = so));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = so));
      },
      persist: function () {},
      isPersistent: so,
    }),
    t
  );
}
var Ir = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  ju = je(Ir),
  ji = G({}, Ir, { view: 0, detail: 0 }),
  Yv = je(ji),
  va,
  wa,
  zr,
  bs = G({}, ji, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Fu,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== zr &&
            (zr && e.type === "mousemove"
              ? ((va = e.screenX - zr.screenX), (wa = e.screenY - zr.screenY))
              : (wa = va = 0),
            (zr = e)),
          va);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : wa;
    },
  }),
  md = je(bs),
  Zv = G({}, bs, { dataTransfer: 0 }),
  e0 = je(Zv),
  t0 = G({}, ji, { relatedTarget: 0 }),
  _a = je(t0),
  n0 = G({}, Ir, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  r0 = je(n0),
  i0 = G({}, Ir, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  o0 = je(i0),
  s0 = G({}, Ir, { data: 0 }),
  gd = je(s0),
  a0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  l0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  u0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function c0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = u0[e]) ? !!t[e] : !1;
}
function Fu() {
  return c0;
}
var d0 = G({}, ji, {
    key: function (e) {
      if (e.key) {
        var t = a0[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = xo(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? l0[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fu,
    charCode: function (e) {
      return e.type === "keypress" ? xo(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? xo(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  f0 = je(d0),
  h0 = G({}, bs, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  yd = je(h0),
  p0 = G({}, ji, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fu,
  }),
  m0 = je(p0),
  g0 = G({}, Ir, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  y0 = je(g0),
  v0 = G({}, bs, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  w0 = je(v0),
  _0 = [9, 13, 27, 32],
  Bu = St && "CompositionEvent" in window,
  ni = null;
St && "documentMode" in document && (ni = document.documentMode);
var E0 = St && "TextEvent" in window && !ni,
  wp = St && (!Bu || (ni && 8 < ni && 11 >= ni)),
  vd = " ",
  wd = !1;
function _p(e, t) {
  switch (e) {
    case "keyup":
      return _0.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Ep(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var qn = !1;
function S0(e, t) {
  switch (e) {
    case "compositionend":
      return Ep(t);
    case "keypress":
      return t.which !== 32 ? null : ((wd = !0), vd);
    case "textInput":
      return (e = t.data), e === vd && wd ? null : e;
    default:
      return null;
  }
}
function k0(e, t) {
  if (qn)
    return e === "compositionend" || (!Bu && _p(e, t))
      ? ((e = vp()), (To = Mu = Ht = null), (qn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return wp && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var C0 = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function _d(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!C0[e.type] : t === "textarea";
}
function Sp(e, t, n, r) {
  Zh(r),
    (t = Go(t, "onChange")),
    0 < t.length &&
      ((n = new ju("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var ri = null,
  yi = null;
function T0(e) {
  Ap(e, 0);
}
function As(e) {
  var t = Xn(e);
  if (Kh(t)) return e;
}
function x0(e, t) {
  if (e === "change") return t;
}
var kp = !1;
if (St) {
  var Ea;
  if (St) {
    var Sa = "oninput" in document;
    if (!Sa) {
      var Ed = document.createElement("div");
      Ed.setAttribute("oninput", "return;"),
        (Sa = typeof Ed.oninput == "function");
    }
    Ea = Sa;
  } else Ea = !1;
  kp = Ea && (!document.documentMode || 9 < document.documentMode);
}
function Sd() {
  ri && (ri.detachEvent("onpropertychange", Cp), (yi = ri = null));
}
function Cp(e) {
  if (e.propertyName === "value" && As(yi)) {
    var t = [];
    Sp(t, yi, e, bu(e)), rp(T0, t);
  }
}
function I0(e, t, n) {
  e === "focusin"
    ? (Sd(), (ri = t), (yi = n), ri.attachEvent("onpropertychange", Cp))
    : e === "focusout" && Sd();
}
function R0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return As(yi);
}
function P0(e, t) {
  if (e === "click") return As(t);
}
function N0(e, t) {
  if (e === "input" || e === "change") return As(t);
}
function O0(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var rt = typeof Object.is == "function" ? Object.is : O0;
function vi(e, t) {
  if (rt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!rl.call(t, i) || !rt(e[i], t[i])) return !1;
  }
  return !0;
}
function kd(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Cd(e, t) {
  var n = kd(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = kd(n);
  }
}
function Tp(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Tp(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function xp() {
  for (var e = window, t = Bo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Bo(e.document);
  }
  return t;
}
function zu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function b0(e) {
  var t = xp(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Tp(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && zu(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        (r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = Cd(n, o));
        var s = Cd(n, r);
        i &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var A0 = St && "documentMode" in document && 11 >= document.documentMode,
  Jn = null,
  Sl = null,
  ii = null,
  kl = !1;
function Td(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  kl ||
    Jn == null ||
    Jn !== Bo(r) ||
    ((r = Jn),
    "selectionStart" in r && zu(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (ii && vi(ii, r)) ||
      ((ii = r),
      (r = Go(Sl, "onSelect")),
      0 < r.length &&
        ((t = new ju("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Jn))));
}
function ao(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Qn = {
    animationend: ao("Animation", "AnimationEnd"),
    animationiteration: ao("Animation", "AnimationIteration"),
    animationstart: ao("Animation", "AnimationStart"),
    transitionend: ao("Transition", "TransitionEnd"),
  },
  ka = {},
  Ip = {};
St &&
  ((Ip = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Qn.animationend.animation,
    delete Qn.animationiteration.animation,
    delete Qn.animationstart.animation),
  "TransitionEvent" in window || delete Qn.transitionend.transition);
function Ls(e) {
  if (ka[e]) return ka[e];
  if (!Qn[e]) return e;
  var t = Qn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Ip) return (ka[e] = t[n]);
  return e;
}
var Rp = Ls("animationend"),
  Pp = Ls("animationiteration"),
  Np = Ls("animationstart"),
  Op = Ls("transitionend"),
  bp = new Map(),
  xd =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function cn(e, t) {
  bp.set(e, t), Bn(t, [e]);
}
for (var Ca = 0; Ca < xd.length; Ca++) {
  var Ta = xd[Ca],
    L0 = Ta.toLowerCase(),
    D0 = Ta[0].toUpperCase() + Ta.slice(1);
  cn(L0, "on" + D0);
}
cn(Rp, "onAnimationEnd");
cn(Pp, "onAnimationIteration");
cn(Np, "onAnimationStart");
cn("dblclick", "onDoubleClick");
cn("focusin", "onFocus");
cn("focusout", "onBlur");
cn(Op, "onTransitionEnd");
hr("onMouseEnter", ["mouseout", "mouseover"]);
hr("onMouseLeave", ["mouseout", "mouseover"]);
hr("onPointerEnter", ["pointerout", "pointerover"]);
hr("onPointerLeave", ["pointerout", "pointerover"]);
Bn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Bn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Bn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Bn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Bn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Bn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Qr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  U0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Qr));
function Id(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Lv(r, t, void 0, e), (e.currentTarget = null);
}
function Ap(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var a = r[s],
            l = a.instance,
            u = a.currentTarget;
          if (((a = a.listener), l !== o && i.isPropagationStopped())) break e;
          Id(i, a, u), (o = l);
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((a = r[s]),
            (l = a.instance),
            (u = a.currentTarget),
            (a = a.listener),
            l !== o && i.isPropagationStopped())
          )
            break e;
          Id(i, a, u), (o = l);
        }
    }
  }
  if ($o) throw ((e = vl), ($o = !1), (vl = null), e);
}
function $(e, t) {
  var n = t[Rl];
  n === void 0 && (n = t[Rl] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Lp(t, e, 2, !1), n.add(r));
}
function xa(e, t, n) {
  var r = 0;
  t && (r |= 4), Lp(n, e, r, t);
}
var lo = "_reactListening" + Math.random().toString(36).slice(2);
function wi(e) {
  if (!e[lo]) {
    (e[lo] = !0),
      zh.forEach(function (n) {
        n !== "selectionchange" && (U0.has(n) || xa(n, !1, e), xa(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[lo] || ((t[lo] = !0), xa("selectionchange", !1, t));
  }
}
function Lp(e, t, n, r) {
  switch (yp(t)) {
    case 1:
      var i = Qv;
      break;
    case 4:
      i = Xv;
      break;
    default:
      i = Uu;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !yl ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, { passive: i })
      : e.addEventListener(t, n, !1);
}
function Ia(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var a = r.stateNode.containerInfo;
        if (a === i || (a.nodeType === 8 && a.parentNode === i)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var l = s.tag;
            if (
              (l === 3 || l === 4) &&
              ((l = s.stateNode.containerInfo),
              l === i || (l.nodeType === 8 && l.parentNode === i))
            )
              return;
            s = s.return;
          }
        for (; a !== null; ) {
          if (((s = En(a)), s === null)) return;
          if (((l = s.tag), l === 5 || l === 6)) {
            r = o = s;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  rp(function () {
    var u = o,
      c = bu(n),
      d = [];
    e: {
      var f = bp.get(e);
      if (f !== void 0) {
        var v = ju,
          g = e;
        switch (e) {
          case "keypress":
            if (xo(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = f0;
            break;
          case "focusin":
            (g = "focus"), (v = _a);
            break;
          case "focusout":
            (g = "blur"), (v = _a);
            break;
          case "beforeblur":
          case "afterblur":
            v = _a;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = md;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = e0;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = m0;
            break;
          case Rp:
          case Pp:
          case Np:
            v = r0;
            break;
          case Op:
            v = y0;
            break;
          case "scroll":
            v = Yv;
            break;
          case "wheel":
            v = w0;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = o0;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = yd;
        }
        var y = (t & 4) !== 0,
          E = !y && e === "scroll",
          h = y ? (f !== null ? f + "Capture" : null) : f;
        y = [];
        for (var p = u, m; p !== null; ) {
          m = p;
          var _ = m.stateNode;
          if (
            (m.tag === 5 &&
              _ !== null &&
              ((m = _),
              h !== null && ((_ = hi(p, h)), _ != null && y.push(_i(p, _, m)))),
            E)
          )
            break;
          p = p.return;
        }
        0 < y.length &&
          ((f = new v(f, g, null, n, c)), d.push({ event: f, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((f = e === "mouseover" || e === "pointerover"),
          (v = e === "mouseout" || e === "pointerout"),
          f &&
            n !== ml &&
            (g = n.relatedTarget || n.fromElement) &&
            (En(g) || g[kt]))
        )
          break e;
        if (
          (v || f) &&
          ((f =
            c.window === c
              ? c
              : (f = c.ownerDocument)
              ? f.defaultView || f.parentWindow
              : window),
          v
            ? ((g = n.relatedTarget || n.toElement),
              (v = u),
              (g = g ? En(g) : null),
              g !== null &&
                ((E = zn(g)), g !== E || (g.tag !== 5 && g.tag !== 6)) &&
                (g = null))
            : ((v = null), (g = u)),
          v !== g)
        ) {
          if (
            ((y = md),
            (_ = "onMouseLeave"),
            (h = "onMouseEnter"),
            (p = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((y = yd),
              (_ = "onPointerLeave"),
              (h = "onPointerEnter"),
              (p = "pointer")),
            (E = v == null ? f : Xn(v)),
            (m = g == null ? f : Xn(g)),
            (f = new y(_, p + "leave", v, n, c)),
            (f.target = E),
            (f.relatedTarget = m),
            (_ = null),
            En(c) === u &&
              ((y = new y(h, p + "enter", g, n, c)),
              (y.target = m),
              (y.relatedTarget = E),
              (_ = y)),
            (E = _),
            v && g)
          )
            t: {
              for (y = v, h = g, p = 0, m = y; m; m = Vn(m)) p++;
              for (m = 0, _ = h; _; _ = Vn(_)) m++;
              for (; 0 < p - m; ) (y = Vn(y)), p--;
              for (; 0 < m - p; ) (h = Vn(h)), m--;
              for (; p--; ) {
                if (y === h || (h !== null && y === h.alternate)) break t;
                (y = Vn(y)), (h = Vn(h));
              }
              y = null;
            }
          else y = null;
          v !== null && Rd(d, f, v, y, !1),
            g !== null && E !== null && Rd(d, E, g, y, !0);
        }
      }
      e: {
        if (
          ((f = u ? Xn(u) : window),
          (v = f.nodeName && f.nodeName.toLowerCase()),
          v === "select" || (v === "input" && f.type === "file"))
        )
          var k = x0;
        else if (_d(f))
          if (kp) k = N0;
          else {
            k = R0;
            var x = I0;
          }
        else
          (v = f.nodeName) &&
            v.toLowerCase() === "input" &&
            (f.type === "checkbox" || f.type === "radio") &&
            (k = P0);
        if (k && (k = k(e, u))) {
          Sp(d, k, n, c);
          break e;
        }
        x && x(e, f, u),
          e === "focusout" &&
            (x = f._wrapperState) &&
            x.controlled &&
            f.type === "number" &&
            cl(f, "number", f.value);
      }
      switch (((x = u ? Xn(u) : window), e)) {
        case "focusin":
          (_d(x) || x.contentEditable === "true") &&
            ((Jn = x), (Sl = u), (ii = null));
          break;
        case "focusout":
          ii = Sl = Jn = null;
          break;
        case "mousedown":
          kl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (kl = !1), Td(d, n, c);
          break;
        case "selectionchange":
          if (A0) break;
        case "keydown":
        case "keyup":
          Td(d, n, c);
      }
      var I;
      if (Bu)
        e: {
          switch (e) {
            case "compositionstart":
              var R = "onCompositionStart";
              break e;
            case "compositionend":
              R = "onCompositionEnd";
              break e;
            case "compositionupdate":
              R = "onCompositionUpdate";
              break e;
          }
          R = void 0;
        }
      else
        qn
          ? _p(e, n) && (R = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (R = "onCompositionStart");
      R &&
        (wp &&
          n.locale !== "ko" &&
          (qn || R !== "onCompositionStart"
            ? R === "onCompositionEnd" && qn && (I = vp())
            : ((Ht = c),
              (Mu = "value" in Ht ? Ht.value : Ht.textContent),
              (qn = !0))),
        (x = Go(u, R)),
        0 < x.length &&
          ((R = new gd(R, e, null, n, c)),
          d.push({ event: R, listeners: x }),
          I ? (R.data = I) : ((I = Ep(n)), I !== null && (R.data = I)))),
        (I = E0 ? S0(e, n) : k0(e, n)) &&
          ((u = Go(u, "onBeforeInput")),
          0 < u.length &&
            ((c = new gd("onBeforeInput", "beforeinput", null, n, c)),
            d.push({ event: c, listeners: u }),
            (c.data = I)));
    }
    Ap(d, t);
  });
}
function _i(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Go(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = hi(e, n)),
      o != null && r.unshift(_i(e, o, i)),
      (o = hi(e, t)),
      o != null && r.push(_i(e, o, i))),
      (e = e.return);
  }
  return r;
}
function Vn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Rd(e, t, n, r, i) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n,
      l = a.alternate,
      u = a.stateNode;
    if (l !== null && l === r) break;
    a.tag === 5 &&
      u !== null &&
      ((a = u),
      i
        ? ((l = hi(n, o)), l != null && s.unshift(_i(n, l, a)))
        : i || ((l = hi(n, o)), l != null && s.push(_i(n, l, a)))),
      (n = n.return);
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var M0 = /\r\n?/g,
  j0 = /\u0000|\uFFFD/g;
function Pd(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      M0,
      `
`
    )
    .replace(j0, "");
}
function uo(e, t, n) {
  if (((t = Pd(t)), Pd(e) !== t && n)) throw Error(T(425));
}
function qo() {}
var Cl = null,
  Tl = null;
function xl(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Il = typeof setTimeout == "function" ? setTimeout : void 0,
  F0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Nd = typeof Promise == "function" ? Promise : void 0,
  B0 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Nd < "u"
      ? function (e) {
          return Nd.resolve(null).then(e).catch(z0);
        }
      : Il;
function z0(e) {
  setTimeout(function () {
    throw e;
  });
}
function Ra(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), gi(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  gi(t);
}
function Jt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Od(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Rr = Math.random().toString(36).slice(2),
  at = "__reactFiber$" + Rr,
  Ei = "__reactProps$" + Rr,
  kt = "__reactContainer$" + Rr,
  Rl = "__reactEvents$" + Rr,
  $0 = "__reactListeners$" + Rr,
  H0 = "__reactHandles$" + Rr;
function En(e) {
  var t = e[at];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[kt] || n[at])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Od(e); e !== null; ) {
          if ((n = e[at])) return n;
          e = Od(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Fi(e) {
  return (
    (e = e[at] || e[kt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Xn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(T(33));
}
function Ds(e) {
  return e[Ei] || null;
}
var Pl = [],
  Yn = -1;
function dn(e) {
  return { current: e };
}
function H(e) {
  0 > Yn || ((e.current = Pl[Yn]), (Pl[Yn] = null), Yn--);
}
function z(e, t) {
  Yn++, (Pl[Yn] = e.current), (e.current = t);
}
var an = {},
  pe = dn(an),
  ke = dn(!1),
  Pn = an;
function pr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return an;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Ce(e) {
  return (e = e.childContextTypes), e != null;
}
function Jo() {
  H(ke), H(pe);
}
function bd(e, t, n) {
  if (pe.current !== an) throw Error(T(168));
  z(pe, t), z(ke, n);
}
function Dp(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(T(108, Iv(e) || "Unknown", i));
  return G({}, n, r);
}
function Qo(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || an),
    (Pn = pe.current),
    z(pe, e),
    z(ke, ke.current),
    !0
  );
}
function Ad(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(T(169));
  n
    ? ((e = Dp(e, t, Pn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      H(ke),
      H(pe),
      z(pe, e))
    : H(ke),
    z(ke, n);
}
var pt = null,
  Us = !1,
  Pa = !1;
function Up(e) {
  pt === null ? (pt = [e]) : pt.push(e);
}
function V0(e) {
  (Us = !0), Up(e);
}
function fn() {
  if (!Pa && pt !== null) {
    Pa = !0;
    var e = 0,
      t = j;
    try {
      var n = pt;
      for (j = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (pt = null), (Us = !1);
    } catch (i) {
      throw (pt !== null && (pt = pt.slice(e + 1)), ap(Au, fn), i);
    } finally {
      (j = t), (Pa = !1);
    }
  }
  return null;
}
var Zn = [],
  er = 0,
  Xo = null,
  Yo = 0,
  Be = [],
  ze = 0,
  Nn = null,
  gt = 1,
  yt = "";
function yn(e, t) {
  (Zn[er++] = Yo), (Zn[er++] = Xo), (Xo = e), (Yo = t);
}
function Mp(e, t, n) {
  (Be[ze++] = gt), (Be[ze++] = yt), (Be[ze++] = Nn), (Nn = e);
  var r = gt;
  e = yt;
  var i = 32 - Ze(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var o = 32 - Ze(t) + i;
  if (30 < o) {
    var s = i - (i % 5);
    (o = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (i -= s),
      (gt = (1 << (32 - Ze(t) + i)) | (n << i) | r),
      (yt = o + e);
  } else (gt = (1 << o) | (n << i) | r), (yt = e);
}
function $u(e) {
  e.return !== null && (yn(e, 1), Mp(e, 1, 0));
}
function Hu(e) {
  for (; e === Xo; )
    (Xo = Zn[--er]), (Zn[er] = null), (Yo = Zn[--er]), (Zn[er] = null);
  for (; e === Nn; )
    (Nn = Be[--ze]),
      (Be[ze] = null),
      (yt = Be[--ze]),
      (Be[ze] = null),
      (gt = Be[--ze]),
      (Be[ze] = null);
}
var Ae = null,
  Ne = null,
  V = !1,
  Xe = null;
function jp(e, t) {
  var n = $e(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Ld(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ae = e), (Ne = Jt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ae = e), (Ne = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Nn !== null ? { id: gt, overflow: yt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = $e(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ae = e),
            (Ne = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Nl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ol(e) {
  if (V) {
    var t = Ne;
    if (t) {
      var n = t;
      if (!Ld(e, t)) {
        if (Nl(e)) throw Error(T(418));
        t = Jt(n.nextSibling);
        var r = Ae;
        t && Ld(e, t)
          ? jp(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (V = !1), (Ae = e));
      }
    } else {
      if (Nl(e)) throw Error(T(418));
      (e.flags = (e.flags & -4097) | 2), (V = !1), (Ae = e);
    }
  }
}
function Dd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ae = e;
}
function co(e) {
  if (e !== Ae) return !1;
  if (!V) return Dd(e), (V = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !xl(e.type, e.memoizedProps))),
    t && (t = Ne))
  ) {
    if (Nl(e)) throw (Fp(), Error(T(418)));
    for (; t; ) jp(e, t), (t = Jt(t.nextSibling));
  }
  if ((Dd(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(T(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ne = Jt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ne = null;
    }
  } else Ne = Ae ? Jt(e.stateNode.nextSibling) : null;
  return !0;
}
function Fp() {
  for (var e = Ne; e; ) e = Jt(e.nextSibling);
}
function mr() {
  (Ne = Ae = null), (V = !1);
}
function Vu(e) {
  Xe === null ? (Xe = [e]) : Xe.push(e);
}
var W0 = Rt.ReactCurrentBatchConfig;
function $r(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(T(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(T(147, e));
      var i = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (s) {
            var a = i.refs;
            s === null ? delete a[o] : (a[o] = s);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(T(284));
    if (!n._owner) throw Error(T(290, e));
  }
  return e;
}
function fo(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      T(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Ud(e) {
  var t = e._init;
  return t(e._payload);
}
function Bp(e) {
  function t(h, p) {
    if (e) {
      var m = h.deletions;
      m === null ? ((h.deletions = [p]), (h.flags |= 16)) : m.push(p);
    }
  }
  function n(h, p) {
    if (!e) return null;
    for (; p !== null; ) t(h, p), (p = p.sibling);
    return null;
  }
  function r(h, p) {
    for (h = new Map(); p !== null; )
      p.key !== null ? h.set(p.key, p) : h.set(p.index, p), (p = p.sibling);
    return h;
  }
  function i(h, p) {
    return (h = Zt(h, p)), (h.index = 0), (h.sibling = null), h;
  }
  function o(h, p, m) {
    return (
      (h.index = m),
      e
        ? ((m = h.alternate),
          m !== null
            ? ((m = m.index), m < p ? ((h.flags |= 2), p) : m)
            : ((h.flags |= 2), p))
        : ((h.flags |= 1048576), p)
    );
  }
  function s(h) {
    return e && h.alternate === null && (h.flags |= 2), h;
  }
  function a(h, p, m, _) {
    return p === null || p.tag !== 6
      ? ((p = Ua(m, h.mode, _)), (p.return = h), p)
      : ((p = i(p, m)), (p.return = h), p);
  }
  function l(h, p, m, _) {
    var k = m.type;
    return k === Gn
      ? c(h, p, m.props.children, _, m.key)
      : p !== null &&
        (p.elementType === k ||
          (typeof k == "object" &&
            k !== null &&
            k.$$typeof === Dt &&
            Ud(k) === p.type))
      ? ((_ = i(p, m.props)), (_.ref = $r(h, p, m)), (_.return = h), _)
      : ((_ = Ao(m.type, m.key, m.props, null, h.mode, _)),
        (_.ref = $r(h, p, m)),
        (_.return = h),
        _);
  }
  function u(h, p, m, _) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== m.containerInfo ||
      p.stateNode.implementation !== m.implementation
      ? ((p = Ma(m, h.mode, _)), (p.return = h), p)
      : ((p = i(p, m.children || [])), (p.return = h), p);
  }
  function c(h, p, m, _, k) {
    return p === null || p.tag !== 7
      ? ((p = xn(m, h.mode, _, k)), (p.return = h), p)
      : ((p = i(p, m)), (p.return = h), p);
  }
  function d(h, p, m) {
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return (p = Ua("" + p, h.mode, m)), (p.return = h), p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case eo:
          return (
            (m = Ao(p.type, p.key, p.props, null, h.mode, m)),
            (m.ref = $r(h, null, p)),
            (m.return = h),
            m
          );
        case Kn:
          return (p = Ma(p, h.mode, m)), (p.return = h), p;
        case Dt:
          var _ = p._init;
          return d(h, _(p._payload), m);
      }
      if (qr(p) || Mr(p))
        return (p = xn(p, h.mode, m, null)), (p.return = h), p;
      fo(h, p);
    }
    return null;
  }
  function f(h, p, m, _) {
    var k = p !== null ? p.key : null;
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return k !== null ? null : a(h, p, "" + m, _);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case eo:
          return m.key === k ? l(h, p, m, _) : null;
        case Kn:
          return m.key === k ? u(h, p, m, _) : null;
        case Dt:
          return (k = m._init), f(h, p, k(m._payload), _);
      }
      if (qr(m) || Mr(m)) return k !== null ? null : c(h, p, m, _, null);
      fo(h, m);
    }
    return null;
  }
  function v(h, p, m, _, k) {
    if ((typeof _ == "string" && _ !== "") || typeof _ == "number")
      return (h = h.get(m) || null), a(p, h, "" + _, k);
    if (typeof _ == "object" && _ !== null) {
      switch (_.$$typeof) {
        case eo:
          return (h = h.get(_.key === null ? m : _.key) || null), l(p, h, _, k);
        case Kn:
          return (h = h.get(_.key === null ? m : _.key) || null), u(p, h, _, k);
        case Dt:
          var x = _._init;
          return v(h, p, m, x(_._payload), k);
      }
      if (qr(_) || Mr(_)) return (h = h.get(m) || null), c(p, h, _, k, null);
      fo(p, _);
    }
    return null;
  }
  function g(h, p, m, _) {
    for (
      var k = null, x = null, I = p, R = (p = 0), F = null;
      I !== null && R < m.length;
      R++
    ) {
      I.index > R ? ((F = I), (I = null)) : (F = I.sibling);
      var L = f(h, I, m[R], _);
      if (L === null) {
        I === null && (I = F);
        break;
      }
      e && I && L.alternate === null && t(h, I),
        (p = o(L, p, R)),
        x === null ? (k = L) : (x.sibling = L),
        (x = L),
        (I = F);
    }
    if (R === m.length) return n(h, I), V && yn(h, R), k;
    if (I === null) {
      for (; R < m.length; R++)
        (I = d(h, m[R], _)),
          I !== null &&
            ((p = o(I, p, R)), x === null ? (k = I) : (x.sibling = I), (x = I));
      return V && yn(h, R), k;
    }
    for (I = r(h, I); R < m.length; R++)
      (F = v(I, h, R, m[R], _)),
        F !== null &&
          (e && F.alternate !== null && I.delete(F.key === null ? R : F.key),
          (p = o(F, p, R)),
          x === null ? (k = F) : (x.sibling = F),
          (x = F));
    return (
      e &&
        I.forEach(function (Re) {
          return t(h, Re);
        }),
      V && yn(h, R),
      k
    );
  }
  function y(h, p, m, _) {
    var k = Mr(m);
    if (typeof k != "function") throw Error(T(150));
    if (((m = k.call(m)), m == null)) throw Error(T(151));
    for (
      var x = (k = null), I = p, R = (p = 0), F = null, L = m.next();
      I !== null && !L.done;
      R++, L = m.next()
    ) {
      I.index > R ? ((F = I), (I = null)) : (F = I.sibling);
      var Re = f(h, I, L.value, _);
      if (Re === null) {
        I === null && (I = F);
        break;
      }
      e && I && Re.alternate === null && t(h, I),
        (p = o(Re, p, R)),
        x === null ? (k = Re) : (x.sibling = Re),
        (x = Re),
        (I = F);
    }
    if (L.done) return n(h, I), V && yn(h, R), k;
    if (I === null) {
      for (; !L.done; R++, L = m.next())
        (L = d(h, L.value, _)),
          L !== null &&
            ((p = o(L, p, R)), x === null ? (k = L) : (x.sibling = L), (x = L));
      return V && yn(h, R), k;
    }
    for (I = r(h, I); !L.done; R++, L = m.next())
      (L = v(I, h, R, L.value, _)),
        L !== null &&
          (e && L.alternate !== null && I.delete(L.key === null ? R : L.key),
          (p = o(L, p, R)),
          x === null ? (k = L) : (x.sibling = L),
          (x = L));
    return (
      e &&
        I.forEach(function (Dr) {
          return t(h, Dr);
        }),
      V && yn(h, R),
      k
    );
  }
  function E(h, p, m, _) {
    if (
      (typeof m == "object" &&
        m !== null &&
        m.type === Gn &&
        m.key === null &&
        (m = m.props.children),
      typeof m == "object" && m !== null)
    ) {
      switch (m.$$typeof) {
        case eo:
          e: {
            for (var k = m.key, x = p; x !== null; ) {
              if (x.key === k) {
                if (((k = m.type), k === Gn)) {
                  if (x.tag === 7) {
                    n(h, x.sibling),
                      (p = i(x, m.props.children)),
                      (p.return = h),
                      (h = p);
                    break e;
                  }
                } else if (
                  x.elementType === k ||
                  (typeof k == "object" &&
                    k !== null &&
                    k.$$typeof === Dt &&
                    Ud(k) === x.type)
                ) {
                  n(h, x.sibling),
                    (p = i(x, m.props)),
                    (p.ref = $r(h, x, m)),
                    (p.return = h),
                    (h = p);
                  break e;
                }
                n(h, x);
                break;
              } else t(h, x);
              x = x.sibling;
            }
            m.type === Gn
              ? ((p = xn(m.props.children, h.mode, _, m.key)),
                (p.return = h),
                (h = p))
              : ((_ = Ao(m.type, m.key, m.props, null, h.mode, _)),
                (_.ref = $r(h, p, m)),
                (_.return = h),
                (h = _));
          }
          return s(h);
        case Kn:
          e: {
            for (x = m.key; p !== null; ) {
              if (p.key === x)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === m.containerInfo &&
                  p.stateNode.implementation === m.implementation
                ) {
                  n(h, p.sibling),
                    (p = i(p, m.children || [])),
                    (p.return = h),
                    (h = p);
                  break e;
                } else {
                  n(h, p);
                  break;
                }
              else t(h, p);
              p = p.sibling;
            }
            (p = Ma(m, h.mode, _)), (p.return = h), (h = p);
          }
          return s(h);
        case Dt:
          return (x = m._init), E(h, p, x(m._payload), _);
      }
      if (qr(m)) return g(h, p, m, _);
      if (Mr(m)) return y(h, p, m, _);
      fo(h, m);
    }
    return (typeof m == "string" && m !== "") || typeof m == "number"
      ? ((m = "" + m),
        p !== null && p.tag === 6
          ? (n(h, p.sibling), (p = i(p, m)), (p.return = h), (h = p))
          : (n(h, p), (p = Ua(m, h.mode, _)), (p.return = h), (h = p)),
        s(h))
      : n(h, p);
  }
  return E;
}
var gr = Bp(!0),
  zp = Bp(!1),
  Zo = dn(null),
  es = null,
  tr = null,
  Wu = null;
function Ku() {
  Wu = tr = es = null;
}
function Gu(e) {
  var t = Zo.current;
  H(Zo), (e._currentValue = t);
}
function bl(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function lr(e, t) {
  (es = e),
    (Wu = tr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Se = !0), (e.firstContext = null));
}
function We(e) {
  var t = e._currentValue;
  if (Wu !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), tr === null)) {
      if (es === null) throw Error(T(308));
      (tr = e), (es.dependencies = { lanes: 0, firstContext: e });
    } else tr = tr.next = e;
  return t;
}
var Sn = null;
function qu(e) {
  Sn === null ? (Sn = [e]) : Sn.push(e);
}
function $p(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), qu(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Ct(e, r)
  );
}
function Ct(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Ut = !1;
function Ju(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Hp(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Et(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Qt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), M & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      Ct(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), qu(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Ct(e, n)
  );
}
function Io(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Lu(e, n);
  }
}
function Md(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (i = o = s) : (o = o.next = s), (n = n.next);
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function ts(e, t, n, r) {
  var i = e.updateQueue;
  Ut = !1;
  var o = i.firstBaseUpdate,
    s = i.lastBaseUpdate,
    a = i.shared.pending;
  if (a !== null) {
    i.shared.pending = null;
    var l = a,
      u = l.next;
    (l.next = null), s === null ? (o = u) : (s.next = u), (s = l);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (a = c.lastBaseUpdate),
      a !== s &&
        (a === null ? (c.firstBaseUpdate = u) : (a.next = u),
        (c.lastBaseUpdate = l)));
  }
  if (o !== null) {
    var d = i.baseState;
    (s = 0), (c = u = l = null), (a = o);
    do {
      var f = a.lane,
        v = a.eventTime;
      if ((r & f) === f) {
        c !== null &&
          (c = c.next =
            {
              eventTime: v,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var g = e,
            y = a;
          switch (((f = t), (v = n), y.tag)) {
            case 1:
              if (((g = y.payload), typeof g == "function")) {
                d = g.call(v, d, f);
                break e;
              }
              d = g;
              break e;
            case 3:
              g.flags = (g.flags & -65537) | 128;
            case 0:
              if (
                ((g = y.payload),
                (f = typeof g == "function" ? g.call(v, d, f) : g),
                f == null)
              )
                break e;
              d = G({}, d, f);
              break e;
            case 2:
              Ut = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (f = i.effects),
          f === null ? (i.effects = [a]) : f.push(a));
      } else
        (v = {
          eventTime: v,
          lane: f,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          c === null ? ((u = c = v), (l = d)) : (c = c.next = v),
          (s |= f);
      if (((a = a.next), a === null)) {
        if (((a = i.shared.pending), a === null)) break;
        (f = a),
          (a = f.next),
          (f.next = null),
          (i.lastBaseUpdate = f),
          (i.shared.pending = null);
      }
    } while (!0);
    if (
      (c === null && (l = d),
      (i.baseState = l),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (s |= i.lane), (i = i.next);
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    (bn |= s), (e.lanes = s), (e.memoizedState = d);
  }
}
function jd(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(T(191, i));
        i.call(r);
      }
    }
}
var Bi = {},
  dt = dn(Bi),
  Si = dn(Bi),
  ki = dn(Bi);
function kn(e) {
  if (e === Bi) throw Error(T(174));
  return e;
}
function Qu(e, t) {
  switch ((z(ki, t), z(Si, e), z(dt, Bi), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : fl(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = fl(t, e));
  }
  H(dt), z(dt, t);
}
function yr() {
  H(dt), H(Si), H(ki);
}
function Vp(e) {
  kn(ki.current);
  var t = kn(dt.current),
    n = fl(t, e.type);
  t !== n && (z(Si, e), z(dt, n));
}
function Xu(e) {
  Si.current === e && (H(dt), H(Si));
}
var W = dn(0);
function ns(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Na = [];
function Yu() {
  for (var e = 0; e < Na.length; e++)
    Na[e]._workInProgressVersionPrimary = null;
  Na.length = 0;
}
var Ro = Rt.ReactCurrentDispatcher,
  Oa = Rt.ReactCurrentBatchConfig,
  On = 0,
  K = null,
  ne = null,
  oe = null,
  rs = !1,
  oi = !1,
  Ci = 0,
  K0 = 0;
function de() {
  throw Error(T(321));
}
function Zu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!rt(e[n], t[n])) return !1;
  return !0;
}
function ec(e, t, n, r, i, o) {
  if (
    ((On = o),
    (K = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ro.current = e === null || e.memoizedState === null ? Q0 : X0),
    (e = n(r, i)),
    oi)
  ) {
    o = 0;
    do {
      if (((oi = !1), (Ci = 0), 25 <= o)) throw Error(T(301));
      (o += 1),
        (oe = ne = null),
        (t.updateQueue = null),
        (Ro.current = Y0),
        (e = n(r, i));
    } while (oi);
  }
  if (
    ((Ro.current = is),
    (t = ne !== null && ne.next !== null),
    (On = 0),
    (oe = ne = K = null),
    (rs = !1),
    t)
  )
    throw Error(T(300));
  return e;
}
function tc() {
  var e = Ci !== 0;
  return (Ci = 0), e;
}
function st() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return oe === null ? (K.memoizedState = oe = e) : (oe = oe.next = e), oe;
}
function Ke() {
  if (ne === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ne.next;
  var t = oe === null ? K.memoizedState : oe.next;
  if (t !== null) (oe = t), (ne = e);
  else {
    if (e === null) throw Error(T(310));
    (ne = e),
      (e = {
        memoizedState: ne.memoizedState,
        baseState: ne.baseState,
        baseQueue: ne.baseQueue,
        queue: ne.queue,
        next: null,
      }),
      oe === null ? (K.memoizedState = oe = e) : (oe = oe.next = e);
  }
  return oe;
}
function Ti(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ba(e) {
  var t = Ke(),
    n = t.queue;
  if (n === null) throw Error(T(311));
  n.lastRenderedReducer = e;
  var r = ne,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var s = i.next;
      (i.next = o.next), (o.next = s);
    }
    (r.baseQueue = i = o), (n.pending = null);
  }
  if (i !== null) {
    (o = i.next), (r = r.baseState);
    var a = (s = null),
      l = null,
      u = o;
    do {
      var c = u.lane;
      if ((On & c) === c)
        l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var d = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        l === null ? ((a = l = d), (s = r)) : (l = l.next = d),
          (K.lanes |= c),
          (bn |= c);
      }
      u = u.next;
    } while (u !== null && u !== o);
    l === null ? (s = r) : (l.next = a),
      rt(r, t.memoizedState) || (Se = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = l),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (o = i.lane), (K.lanes |= o), (bn |= o), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Aa(e) {
  var t = Ke(),
    n = t.queue;
  if (n === null) throw Error(T(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = (i = i.next);
    do (o = e(o, s.action)), (s = s.next);
    while (s !== i);
    rt(o, t.memoizedState) || (Se = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function Wp() {}
function Kp(e, t) {
  var n = K,
    r = Ke(),
    i = t(),
    o = !rt(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (Se = !0)),
    (r = r.queue),
    nc(Jp.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (oe !== null && oe.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      xi(9, qp.bind(null, n, r, i, t), void 0, null),
      se === null)
    )
      throw Error(T(349));
    On & 30 || Gp(n, t, i);
  }
  return i;
}
function Gp(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function qp(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Qp(t) && Xp(e);
}
function Jp(e, t, n) {
  return n(function () {
    Qp(t) && Xp(e);
  });
}
function Qp(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !rt(e, n);
  } catch {
    return !0;
  }
}
function Xp(e) {
  var t = Ct(e, 1);
  t !== null && et(t, e, 1, -1);
}
function Fd(e) {
  var t = st();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ti,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = J0.bind(null, K, e)),
    [t.memoizedState, e]
  );
}
function xi(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Yp() {
  return Ke().memoizedState;
}
function Po(e, t, n, r) {
  var i = st();
  (K.flags |= e),
    (i.memoizedState = xi(1 | t, n, void 0, r === void 0 ? null : r));
}
function Ms(e, t, n, r) {
  var i = Ke();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ne !== null) {
    var s = ne.memoizedState;
    if (((o = s.destroy), r !== null && Zu(r, s.deps))) {
      i.memoizedState = xi(t, n, o, r);
      return;
    }
  }
  (K.flags |= e), (i.memoizedState = xi(1 | t, n, o, r));
}
function Bd(e, t) {
  return Po(8390656, 8, e, t);
}
function nc(e, t) {
  return Ms(2048, 8, e, t);
}
function Zp(e, t) {
  return Ms(4, 2, e, t);
}
function em(e, t) {
  return Ms(4, 4, e, t);
}
function tm(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function nm(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Ms(4, 4, tm.bind(null, t, e), n)
  );
}
function rc() {}
function rm(e, t) {
  var n = Ke();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Zu(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function im(e, t) {
  var n = Ke();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Zu(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function om(e, t, n) {
  return On & 21
    ? (rt(n, t) || ((n = cp()), (K.lanes |= n), (bn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Se = !0)), (e.memoizedState = n));
}
function G0(e, t) {
  var n = j;
  (j = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Oa.transition;
  Oa.transition = {};
  try {
    e(!1), t();
  } finally {
    (j = n), (Oa.transition = r);
  }
}
function sm() {
  return Ke().memoizedState;
}
function q0(e, t, n) {
  var r = Yt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    am(e))
  )
    lm(t, n);
  else if (((n = $p(e, t, n, r)), n !== null)) {
    var i = ve();
    et(n, e, r, i), um(n, t, r);
  }
}
function J0(e, t, n) {
  var r = Yt(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (am(e)) lm(t, i);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var s = t.lastRenderedState,
          a = o(s, n);
        if (((i.hasEagerState = !0), (i.eagerState = a), rt(a, s))) {
          var l = t.interleaved;
          l === null
            ? ((i.next = i), qu(t))
            : ((i.next = l.next), (l.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = $p(e, t, i, r)),
      n !== null && ((i = ve()), et(n, e, r, i), um(n, t, r));
  }
}
function am(e) {
  var t = e.alternate;
  return e === K || (t !== null && t === K);
}
function lm(e, t) {
  oi = rs = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function um(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Lu(e, n);
  }
}
var is = {
    readContext: We,
    useCallback: de,
    useContext: de,
    useEffect: de,
    useImperativeHandle: de,
    useInsertionEffect: de,
    useLayoutEffect: de,
    useMemo: de,
    useReducer: de,
    useRef: de,
    useState: de,
    useDebugValue: de,
    useDeferredValue: de,
    useTransition: de,
    useMutableSource: de,
    useSyncExternalStore: de,
    useId: de,
    unstable_isNewReconciler: !1,
  },
  Q0 = {
    readContext: We,
    useCallback: function (e, t) {
      return (st().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: We,
    useEffect: Bd,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Po(4194308, 4, tm.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Po(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Po(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = st();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = st();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = q0.bind(null, K, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = st();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Fd,
    useDebugValue: rc,
    useDeferredValue: function (e) {
      return (st().memoizedState = e);
    },
    useTransition: function () {
      var e = Fd(!1),
        t = e[0];
      return (e = G0.bind(null, e[1])), (st().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = K,
        i = st();
      if (V) {
        if (n === void 0) throw Error(T(407));
        n = n();
      } else {
        if (((n = t()), se === null)) throw Error(T(349));
        On & 30 || Gp(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        Bd(Jp.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        xi(9, qp.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = st(),
        t = se.identifierPrefix;
      if (V) {
        var n = yt,
          r = gt;
        (n = (r & ~(1 << (32 - Ze(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Ci++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = K0++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  X0 = {
    readContext: We,
    useCallback: rm,
    useContext: We,
    useEffect: nc,
    useImperativeHandle: nm,
    useInsertionEffect: Zp,
    useLayoutEffect: em,
    useMemo: im,
    useReducer: ba,
    useRef: Yp,
    useState: function () {
      return ba(Ti);
    },
    useDebugValue: rc,
    useDeferredValue: function (e) {
      var t = Ke();
      return om(t, ne.memoizedState, e);
    },
    useTransition: function () {
      var e = ba(Ti)[0],
        t = Ke().memoizedState;
      return [e, t];
    },
    useMutableSource: Wp,
    useSyncExternalStore: Kp,
    useId: sm,
    unstable_isNewReconciler: !1,
  },
  Y0 = {
    readContext: We,
    useCallback: rm,
    useContext: We,
    useEffect: nc,
    useImperativeHandle: nm,
    useInsertionEffect: Zp,
    useLayoutEffect: em,
    useMemo: im,
    useReducer: Aa,
    useRef: Yp,
    useState: function () {
      return Aa(Ti);
    },
    useDebugValue: rc,
    useDeferredValue: function (e) {
      var t = Ke();
      return ne === null ? (t.memoizedState = e) : om(t, ne.memoizedState, e);
    },
    useTransition: function () {
      var e = Aa(Ti)[0],
        t = Ke().memoizedState;
      return [e, t];
    },
    useMutableSource: Wp,
    useSyncExternalStore: Kp,
    useId: sm,
    unstable_isNewReconciler: !1,
  };
function Je(e, t) {
  if (e && e.defaultProps) {
    (t = G({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Al(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : G({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var js = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? zn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ve(),
      i = Yt(e),
      o = Et(r, i);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = Qt(e, o, i)),
      t !== null && (et(t, e, i, r), Io(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ve(),
      i = Yt(e),
      o = Et(r, i);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = Qt(e, o, i)),
      t !== null && (et(t, e, i, r), Io(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ve(),
      r = Yt(e),
      i = Et(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = Qt(e, i, r)),
      t !== null && (et(t, e, r, n), Io(t, e, r));
  },
};
function zd(e, t, n, r, i, o, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, s)
      : t.prototype && t.prototype.isPureReactComponent
      ? !vi(n, r) || !vi(i, o)
      : !0
  );
}
function cm(e, t, n) {
  var r = !1,
    i = an,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = We(o))
      : ((i = Ce(t) ? Pn : pe.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? pr(e, i) : an)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = js),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function $d(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && js.enqueueReplaceState(t, t.state, null);
}
function Ll(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = {}), Ju(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (i.context = We(o))
    : ((o = Ce(t) ? Pn : pe.current), (i.context = pr(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Al(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && js.enqueueReplaceState(i, i.state, null),
      ts(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function vr(e, t) {
  try {
    var n = "",
      r = t;
    do (n += xv(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function La(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Dl(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Z0 = typeof WeakMap == "function" ? WeakMap : Map;
function dm(e, t, n) {
  (n = Et(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      ss || ((ss = !0), (Wl = r)), Dl(e, t);
    }),
    n
  );
}
function fm(e, t, n) {
  (n = Et(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        Dl(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        Dl(e, t),
          typeof r != "function" &&
            (Xt === null ? (Xt = new Set([this])) : Xt.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : "",
        });
      }),
    n
  );
}
function Hd(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Z0();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = hw.bind(null, e, t, n)), t.then(e, e));
}
function Vd(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Wd(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Et(-1, 1)), (t.tag = 2), Qt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var ew = Rt.ReactCurrentOwner,
  Se = !1;
function ye(e, t, n, r) {
  t.child = e === null ? zp(t, null, n, r) : gr(t, e.child, n, r);
}
function Kd(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    lr(t, i),
    (r = ec(e, t, n, r, o, i)),
    (n = tc()),
    e !== null && !Se
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Tt(e, t, i))
      : (V && n && $u(t), (t.flags |= 1), ye(e, t, r, i), t.child)
  );
}
function Gd(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !dc(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), hm(e, t, o, r, i))
      : ((e = Ao(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var s = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : vi), n(s, r) && e.ref === t.ref)
    )
      return Tt(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = Zt(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function hm(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (vi(o, r) && e.ref === t.ref)
      if (((Se = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
        e.flags & 131072 && (Se = !0);
      else return (t.lanes = e.lanes), Tt(e, t, i);
  }
  return Ul(e, t, n, r, i);
}
function pm(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        z(rr, Pe),
        (Pe |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          z(rr, Pe),
          (Pe |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        z(rr, Pe),
        (Pe |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      z(rr, Pe),
      (Pe |= r);
  return ye(e, t, i, n), t.child;
}
function mm(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Ul(e, t, n, r, i) {
  var o = Ce(n) ? Pn : pe.current;
  return (
    (o = pr(t, o)),
    lr(t, i),
    (n = ec(e, t, n, r, o, i)),
    (r = tc()),
    e !== null && !Se
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Tt(e, t, i))
      : (V && r && $u(t), (t.flags |= 1), ye(e, t, n, i), t.child)
  );
}
function qd(e, t, n, r, i) {
  if (Ce(n)) {
    var o = !0;
    Qo(t);
  } else o = !1;
  if ((lr(t, i), t.stateNode === null))
    No(e, t), cm(t, n, r), Ll(t, n, r, i), (r = !0);
  else if (e === null) {
    var s = t.stateNode,
      a = t.memoizedProps;
    s.props = a;
    var l = s.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = We(u))
      : ((u = Ce(n) ? Pn : pe.current), (u = pr(t, u)));
    var c = n.getDerivedStateFromProps,
      d =
        typeof c == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function";
    d ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((a !== r || l !== u) && $d(t, s, r, u)),
      (Ut = !1);
    var f = t.memoizedState;
    (s.state = f),
      ts(t, r, s, i),
      (l = t.memoizedState),
      a !== r || f !== l || ke.current || Ut
        ? (typeof c == "function" && (Al(t, n, c, r), (l = t.memoizedState)),
          (a = Ut || zd(t, n, a, r, f, l, u))
            ? (d ||
                (typeof s.UNSAFE_componentWillMount != "function" &&
                  typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = l)),
          (s.props = r),
          (s.state = l),
          (s.context = u),
          (r = a))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (s = t.stateNode),
      Hp(e, t),
      (a = t.memoizedProps),
      (u = t.type === t.elementType ? a : Je(t.type, a)),
      (s.props = u),
      (d = t.pendingProps),
      (f = s.context),
      (l = n.contextType),
      typeof l == "object" && l !== null
        ? (l = We(l))
        : ((l = Ce(n) ? Pn : pe.current), (l = pr(t, l)));
    var v = n.getDerivedStateFromProps;
    (c =
      typeof v == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((a !== d || f !== l) && $d(t, s, r, l)),
      (Ut = !1),
      (f = t.memoizedState),
      (s.state = f),
      ts(t, r, s, i);
    var g = t.memoizedState;
    a !== d || f !== g || ke.current || Ut
      ? (typeof v == "function" && (Al(t, n, v, r), (g = t.memoizedState)),
        (u = Ut || zd(t, n, u, r, f, g, l) || !1)
          ? (c ||
              (typeof s.UNSAFE_componentWillUpdate != "function" &&
                typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" &&
                s.componentWillUpdate(r, g, l),
              typeof s.UNSAFE_componentWillUpdate == "function" &&
                s.UNSAFE_componentWillUpdate(r, g, l)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" ||
              (a === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = g)),
        (s.props = r),
        (s.state = g),
        (s.context = l),
        (r = u))
      : (typeof s.componentDidUpdate != "function" ||
          (a === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Ml(e, t, n, r, o, i);
}
function Ml(e, t, n, r, i, o) {
  mm(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return i && Ad(t, n, !1), Tt(e, t, o);
  (r = t.stateNode), (ew.current = t);
  var a =
    s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = gr(t, e.child, null, o)), (t.child = gr(t, null, a, o)))
      : ye(e, t, a, o),
    (t.memoizedState = r.state),
    i && Ad(t, n, !0),
    t.child
  );
}
function gm(e) {
  var t = e.stateNode;
  t.pendingContext
    ? bd(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && bd(e, t.context, !1),
    Qu(e, t.containerInfo);
}
function Jd(e, t, n, r, i) {
  return mr(), Vu(i), (t.flags |= 256), ye(e, t, n, r), t.child;
}
var jl = { dehydrated: null, treeContext: null, retryLane: 0 };
function Fl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function ym(e, t, n) {
  var r = t.pendingProps,
    i = W.current,
    o = !1,
    s = (t.flags & 128) !== 0,
    a;
  if (
    ((a = s) ||
      (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    a
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    z(W, i & 1),
    e === null)
  )
    return (
      Ol(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (s = { mode: "hidden", children: s }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = s))
                : (o = zs(s, r, 0, null)),
              (e = xn(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Fl(n)),
              (t.memoizedState = jl),
              e)
            : ic(t, s))
    );
  if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
    return tw(e, t, s, r, a, i, n);
  if (o) {
    (o = r.fallback), (s = t.mode), (i = e.child), (a = i.sibling);
    var l = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = l),
          (t.deletions = null))
        : ((r = Zt(i, l)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      a !== null ? (o = Zt(a, o)) : ((o = xn(o, s, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? Fl(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (o.memoizedState = s),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = jl),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = Zt(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function ic(e, t) {
  return (
    (t = zs({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function ho(e, t, n, r) {
  return (
    r !== null && Vu(r),
    gr(t, e.child, null, n),
    (e = ic(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function tw(e, t, n, r, i, o, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = La(Error(T(422)))), ho(e, t, s, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (i = t.mode),
        (r = zs({ mode: "visible", children: r.children }, i, 0, null)),
        (o = xn(o, i, s, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && gr(t, e.child, null, s),
        (t.child.memoizedState = Fl(s)),
        (t.memoizedState = jl),
        o);
  if (!(t.mode & 1)) return ho(e, t, s, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (o = Error(T(419))), (r = La(o, r, void 0)), ho(e, t, s, r);
  }
  if (((a = (s & e.childLanes) !== 0), Se || a)) {
    if (((r = se), r !== null)) {
      switch (s & -s) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | s) ? 0 : i),
        i !== 0 &&
          i !== o.retryLane &&
          ((o.retryLane = i), Ct(e, i), et(r, e, i, -1));
    }
    return cc(), (r = La(Error(T(421)))), ho(e, t, s, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = pw.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Ne = Jt(i.nextSibling)),
      (Ae = t),
      (V = !0),
      (Xe = null),
      e !== null &&
        ((Be[ze++] = gt),
        (Be[ze++] = yt),
        (Be[ze++] = Nn),
        (gt = e.id),
        (yt = e.overflow),
        (Nn = t)),
      (t = ic(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Qd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), bl(e.return, t, n);
}
function Da(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function vm(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((ye(e, t, r.children, n), (r = W.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Qd(e, n, t);
        else if (e.tag === 19) Qd(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((z(W, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && ns(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          Da(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && ns(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        Da(t, !0, n, null, o);
        break;
      case "together":
        Da(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function No(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Tt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (bn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(T(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Zt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Zt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function nw(e, t, n) {
  switch (t.tag) {
    case 3:
      gm(t), mr();
      break;
    case 5:
      Vp(t);
      break;
    case 1:
      Ce(t.type) && Qo(t);
      break;
    case 4:
      Qu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      z(Zo, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (z(W, W.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? ym(e, t, n)
          : (z(W, W.current & 1),
            (e = Tt(e, t, n)),
            e !== null ? e.sibling : null);
      z(W, W.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return vm(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        z(W, W.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), pm(e, t, n);
  }
  return Tt(e, t, n);
}
var wm, Bl, _m, Em;
wm = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Bl = function () {};
_m = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), kn(dt.current);
    var o = null;
    switch (n) {
      case "input":
        (i = ll(e, i)), (r = ll(e, r)), (o = []);
        break;
      case "select":
        (i = G({}, i, { value: void 0 })),
          (r = G({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (i = dl(e, i)), (r = dl(e, r)), (o = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = qo);
    }
    hl(n, r);
    var s;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var a = i[u];
          for (s in a) a.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (di.hasOwnProperty(u)
              ? o || (o = [])
              : (o = o || []).push(u, null));
    for (u in r) {
      var l = r[u];
      if (
        ((a = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && l !== a && (l != null || a != null))
      )
        if (u === "style")
          if (a) {
            for (s in a)
              !a.hasOwnProperty(s) ||
                (l && l.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ""));
            for (s in l)
              l.hasOwnProperty(s) &&
                a[s] !== l[s] &&
                (n || (n = {}), (n[s] = l[s]));
          } else n || (o || (o = []), o.push(u, n)), (n = l);
        else
          u === "dangerouslySetInnerHTML"
            ? ((l = l ? l.__html : void 0),
              (a = a ? a.__html : void 0),
              l != null && a !== l && (o = o || []).push(u, l))
            : u === "children"
            ? (typeof l != "string" && typeof l != "number") ||
              (o = o || []).push(u, "" + l)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (di.hasOwnProperty(u)
                ? (l != null && u === "onScroll" && $("scroll", e),
                  o || a === l || (o = []))
                : (o = o || []).push(u, l));
    }
    n && (o = o || []).push("style", n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Em = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Hr(e, t) {
  if (!V)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function fe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function rw(e, t, n) {
  var r = t.pendingProps;
  switch ((Hu(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return fe(t), null;
    case 1:
      return Ce(t.type) && Jo(), fe(t), null;
    case 3:
      return (
        (r = t.stateNode),
        yr(),
        H(ke),
        H(pe),
        Yu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (co(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Xe !== null && (ql(Xe), (Xe = null)))),
        Bl(e, t),
        fe(t),
        null
      );
    case 5:
      Xu(t);
      var i = kn(ki.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        _m(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(T(166));
          return fe(t), null;
        }
        if (((e = kn(dt.current)), co(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[at] = t), (r[Ei] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              $("cancel", r), $("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              $("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Qr.length; i++) $(Qr[i], r);
              break;
            case "source":
              $("error", r);
              break;
            case "img":
            case "image":
            case "link":
              $("error", r), $("load", r);
              break;
            case "details":
              $("toggle", r);
              break;
            case "input":
              od(r, o), $("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                $("invalid", r);
              break;
            case "textarea":
              ad(r, o), $("invalid", r);
          }
          hl(n, o), (i = null);
          for (var s in o)
            if (o.hasOwnProperty(s)) {
              var a = o[s];
              s === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (o.suppressHydrationWarning !== !0 &&
                      uo(r.textContent, a, e),
                    (i = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (o.suppressHydrationWarning !== !0 &&
                      uo(r.textContent, a, e),
                    (i = ["children", "" + a]))
                : di.hasOwnProperty(s) &&
                  a != null &&
                  s === "onScroll" &&
                  $("scroll", r);
            }
          switch (n) {
            case "input":
              to(r), sd(r, o, !0);
              break;
            case "textarea":
              to(r), ld(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = qo);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (s = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Jh(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = s.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = s.createElement(n, { is: r.is }))
                : ((e = s.createElement(n)),
                  n === "select" &&
                    ((s = e),
                    r.multiple
                      ? (s.multiple = !0)
                      : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[at] = t),
            (e[Ei] = r),
            wm(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((s = pl(n, r)), n)) {
              case "dialog":
                $("cancel", e), $("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                $("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Qr.length; i++) $(Qr[i], e);
                i = r;
                break;
              case "source":
                $("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                $("error", e), $("load", e), (i = r);
                break;
              case "details":
                $("toggle", e), (i = r);
                break;
              case "input":
                od(e, r), (i = ll(e, r)), $("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = G({}, r, { value: void 0 })),
                  $("invalid", e);
                break;
              case "textarea":
                ad(e, r), (i = dl(e, r)), $("invalid", e);
                break;
              default:
                i = r;
            }
            hl(n, i), (a = i);
            for (o in a)
              if (a.hasOwnProperty(o)) {
                var l = a[o];
                o === "style"
                  ? Yh(e, l)
                  : o === "dangerouslySetInnerHTML"
                  ? ((l = l ? l.__html : void 0), l != null && Qh(e, l))
                  : o === "children"
                  ? typeof l == "string"
                    ? (n !== "textarea" || l !== "") && fi(e, l)
                    : typeof l == "number" && fi(e, "" + l)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (di.hasOwnProperty(o)
                      ? l != null && o === "onScroll" && $("scroll", e)
                      : l != null && Ru(e, o, l, s));
              }
            switch (n) {
              case "input":
                to(e), sd(e, r, !1);
                break;
              case "textarea":
                to(e), ld(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + sn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? ir(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      ir(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = qo);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return fe(t), null;
    case 6:
      if (e && t.stateNode != null) Em(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(T(166));
        if (((n = kn(ki.current)), kn(dt.current), co(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[at] = t),
            (o = r.nodeValue !== n) && ((e = Ae), e !== null))
          )
            switch (e.tag) {
              case 3:
                uo(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  uo(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[at] = t),
            (t.stateNode = r);
      }
      return fe(t), null;
    case 13:
      if (
        (H(W),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (V && Ne !== null && t.mode & 1 && !(t.flags & 128))
          Fp(), mr(), (t.flags |= 98560), (o = !1);
        else if (((o = co(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(T(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(T(317));
            o[at] = t;
          } else
            mr(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          fe(t), (o = !1);
        } else Xe !== null && (ql(Xe), (Xe = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || W.current & 1 ? re === 0 && (re = 3) : cc())),
          t.updateQueue !== null && (t.flags |= 4),
          fe(t),
          null);
    case 4:
      return (
        yr(), Bl(e, t), e === null && wi(t.stateNode.containerInfo), fe(t), null
      );
    case 10:
      return Gu(t.type._context), fe(t), null;
    case 17:
      return Ce(t.type) && Jo(), fe(t), null;
    case 19:
      if ((H(W), (o = t.memoizedState), o === null)) return fe(t), null;
      if (((r = (t.flags & 128) !== 0), (s = o.rendering), s === null))
        if (r) Hr(o, !1);
        else {
          if (re !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = ns(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    Hr(o, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (s = o.alternate),
                    s === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = s.childLanes),
                        (o.lanes = s.lanes),
                        (o.child = s.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = s.memoizedProps),
                        (o.memoizedState = s.memoizedState),
                        (o.updateQueue = s.updateQueue),
                        (o.type = s.type),
                        (e = s.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return z(W, (W.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            Z() > wr &&
            ((t.flags |= 128), (r = !0), Hr(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ns(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Hr(o, !0),
              o.tail === null && o.tailMode === "hidden" && !s.alternate && !V)
            )
              return fe(t), null;
          } else
            2 * Z() - o.renderingStartTime > wr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Hr(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = o.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (o.last = s));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = Z()),
          (t.sibling = null),
          (n = W.current),
          z(W, r ? (n & 1) | 2 : n & 1),
          t)
        : (fe(t), null);
    case 22:
    case 23:
      return (
        uc(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Pe & 1073741824 && (fe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : fe(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(T(156, t.tag));
}
function iw(e, t) {
  switch ((Hu(t), t.tag)) {
    case 1:
      return (
        Ce(t.type) && Jo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        yr(),
        H(ke),
        H(pe),
        Yu(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Xu(t), null;
    case 13:
      if ((H(W), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(T(340));
        mr();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return H(W), null;
    case 4:
      return yr(), null;
    case 10:
      return Gu(t.type._context), null;
    case 22:
    case 23:
      return uc(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var po = !1,
  he = !1,
  ow = typeof WeakSet == "function" ? WeakSet : Set,
  P = null;
function nr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        q(e, t, r);
      }
    else n.current = null;
}
function zl(e, t, n) {
  try {
    n();
  } catch (r) {
    q(e, t, r);
  }
}
var Xd = !1;
function sw(e, t) {
  if (((Cl = Wo), (e = xp()), zu(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            a = -1,
            l = -1,
            u = 0,
            c = 0,
            d = e,
            f = null;
          t: for (;;) {
            for (
              var v;
              d !== n || (i !== 0 && d.nodeType !== 3) || (a = s + i),
                d !== o || (r !== 0 && d.nodeType !== 3) || (l = s + r),
                d.nodeType === 3 && (s += d.nodeValue.length),
                (v = d.firstChild) !== null;

            )
              (f = d), (d = v);
            for (;;) {
              if (d === e) break t;
              if (
                (f === n && ++u === i && (a = s),
                f === o && ++c === r && (l = s),
                (v = d.nextSibling) !== null)
              )
                break;
              (d = f), (f = d.parentNode);
            }
            d = v;
          }
          n = a === -1 || l === -1 ? null : { start: a, end: l };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Tl = { focusedElem: e, selectionRange: n }, Wo = !1, P = t; P !== null; )
    if (((t = P), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (P = e);
    else
      for (; P !== null; ) {
        t = P;
        try {
          var g = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (g !== null) {
                  var y = g.memoizedProps,
                    E = g.memoizedState,
                    h = t.stateNode,
                    p = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : Je(t.type, y),
                      E
                    );
                  h.__reactInternalSnapshotBeforeUpdate = p;
                }
                break;
              case 3:
                var m = t.stateNode.containerInfo;
                m.nodeType === 1
                  ? (m.textContent = "")
                  : m.nodeType === 9 &&
                    m.documentElement &&
                    m.removeChild(m.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(T(163));
            }
        } catch (_) {
          q(t, t.return, _);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (P = e);
          break;
        }
        P = t.return;
      }
  return (g = Xd), (Xd = !1), g;
}
function si(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        (i.destroy = void 0), o !== void 0 && zl(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Fs(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function $l(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Sm(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Sm(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[at], delete t[Ei], delete t[Rl], delete t[$0], delete t[H0])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function km(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Yd(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || km(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Hl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = qo));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Hl(e, t, n), e = e.sibling; e !== null; ) Hl(e, t, n), (e = e.sibling);
}
function Vl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Vl(e, t, n), e = e.sibling; e !== null; ) Vl(e, t, n), (e = e.sibling);
}
var le = null,
  Qe = !1;
function Ot(e, t, n) {
  for (n = n.child; n !== null; ) Cm(e, t, n), (n = n.sibling);
}
function Cm(e, t, n) {
  if (ct && typeof ct.onCommitFiberUnmount == "function")
    try {
      ct.onCommitFiberUnmount(Os, n);
    } catch {}
  switch (n.tag) {
    case 5:
      he || nr(n, t);
    case 6:
      var r = le,
        i = Qe;
      (le = null),
        Ot(e, t, n),
        (le = r),
        (Qe = i),
        le !== null &&
          (Qe
            ? ((e = le),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : le.removeChild(n.stateNode));
      break;
    case 18:
      le !== null &&
        (Qe
          ? ((e = le),
            (n = n.stateNode),
            e.nodeType === 8
              ? Ra(e.parentNode, n)
              : e.nodeType === 1 && Ra(e, n),
            gi(e))
          : Ra(le, n.stateNode));
      break;
    case 4:
      (r = le),
        (i = Qe),
        (le = n.stateNode.containerInfo),
        (Qe = !0),
        Ot(e, t, n),
        (le = r),
        (Qe = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !he &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var o = i,
            s = o.destroy;
          (o = o.tag),
            s !== void 0 && (o & 2 || o & 4) && zl(n, t, s),
            (i = i.next);
        } while (i !== r);
      }
      Ot(e, t, n);
      break;
    case 1:
      if (
        !he &&
        (nr(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          q(n, t, a);
        }
      Ot(e, t, n);
      break;
    case 21:
      Ot(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((he = (r = he) || n.memoizedState !== null), Ot(e, t, n), (he = r))
        : Ot(e, t, n);
      break;
    default:
      Ot(e, t, n);
  }
}
function Zd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new ow()),
      t.forEach(function (r) {
        var i = mw.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function qe(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          s = t,
          a = s;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (le = a.stateNode), (Qe = !1);
              break e;
            case 3:
              (le = a.stateNode.containerInfo), (Qe = !0);
              break e;
            case 4:
              (le = a.stateNode.containerInfo), (Qe = !0);
              break e;
          }
          a = a.return;
        }
        if (le === null) throw Error(T(160));
        Cm(o, s, i), (le = null), (Qe = !1);
        var l = i.alternate;
        l !== null && (l.return = null), (i.return = null);
      } catch (u) {
        q(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Tm(t, e), (t = t.sibling);
}
function Tm(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((qe(t, e), ot(e), r & 4)) {
        try {
          si(3, e, e.return), Fs(3, e);
        } catch (y) {
          q(e, e.return, y);
        }
        try {
          si(5, e, e.return);
        } catch (y) {
          q(e, e.return, y);
        }
      }
      break;
    case 1:
      qe(t, e), ot(e), r & 512 && n !== null && nr(n, n.return);
      break;
    case 5:
      if (
        (qe(t, e),
        ot(e),
        r & 512 && n !== null && nr(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          fi(i, "");
        } catch (y) {
          q(e, e.return, y);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          s = n !== null ? n.memoizedProps : o,
          a = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), l !== null))
          try {
            a === "input" && o.type === "radio" && o.name != null && Gh(i, o),
              pl(a, s);
            var u = pl(a, o);
            for (s = 0; s < l.length; s += 2) {
              var c = l[s],
                d = l[s + 1];
              c === "style"
                ? Yh(i, d)
                : c === "dangerouslySetInnerHTML"
                ? Qh(i, d)
                : c === "children"
                ? fi(i, d)
                : Ru(i, c, d, u);
            }
            switch (a) {
              case "input":
                ul(i, o);
                break;
              case "textarea":
                qh(i, o);
                break;
              case "select":
                var f = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var v = o.value;
                v != null
                  ? ir(i, !!o.multiple, v, !1)
                  : f !== !!o.multiple &&
                    (o.defaultValue != null
                      ? ir(i, !!o.multiple, o.defaultValue, !0)
                      : ir(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Ei] = o;
          } catch (y) {
            q(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((qe(t, e), ot(e), r & 4)) {
        if (e.stateNode === null) throw Error(T(162));
        (i = e.stateNode), (o = e.memoizedProps);
        try {
          i.nodeValue = o;
        } catch (y) {
          q(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (qe(t, e), ot(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          gi(t.containerInfo);
        } catch (y) {
          q(e, e.return, y);
        }
      break;
    case 4:
      qe(t, e), ot(e);
      break;
    case 13:
      qe(t, e),
        ot(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (ac = Z())),
        r & 4 && Zd(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((he = (u = he) || c), qe(t, e), (he = u)) : qe(t, e),
        ot(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !c && e.mode & 1)
        )
          for (P = e, c = e.child; c !== null; ) {
            for (d = P = c; P !== null; ) {
              switch (((f = P), (v = f.child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  si(4, f, f.return);
                  break;
                case 1:
                  nr(f, f.return);
                  var g = f.stateNode;
                  if (typeof g.componentWillUnmount == "function") {
                    (r = f), (n = f.return);
                    try {
                      (t = r),
                        (g.props = t.memoizedProps),
                        (g.state = t.memoizedState),
                        g.componentWillUnmount();
                    } catch (y) {
                      q(r, n, y);
                    }
                  }
                  break;
                case 5:
                  nr(f, f.return);
                  break;
                case 22:
                  if (f.memoizedState !== null) {
                    tf(d);
                    continue;
                  }
              }
              v !== null ? ((v.return = f), (P = v)) : tf(d);
            }
            c = c.sibling;
          }
        e: for (c = null, d = e; ; ) {
          if (d.tag === 5) {
            if (c === null) {
              c = d;
              try {
                (i = d.stateNode),
                  u
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((a = d.stateNode),
                      (l = d.memoizedProps.style),
                      (s =
                        l != null && l.hasOwnProperty("display")
                          ? l.display
                          : null),
                      (a.style.display = Xh("display", s)));
              } catch (y) {
                q(e, e.return, y);
              }
            }
          } else if (d.tag === 6) {
            if (c === null)
              try {
                d.stateNode.nodeValue = u ? "" : d.memoizedProps;
              } catch (y) {
                q(e, e.return, y);
              }
          } else if (
            ((d.tag !== 22 && d.tag !== 23) ||
              d.memoizedState === null ||
              d === e) &&
            d.child !== null
          ) {
            (d.child.return = d), (d = d.child);
            continue;
          }
          if (d === e) break e;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === e) break e;
            c === d && (c = null), (d = d.return);
          }
          c === d && (c = null), (d.sibling.return = d.return), (d = d.sibling);
        }
      }
      break;
    case 19:
      qe(t, e), ot(e), r & 4 && Zd(e);
      break;
    case 21:
      break;
    default:
      qe(t, e), ot(e);
  }
}
function ot(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (km(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(T(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (fi(i, ""), (r.flags &= -33));
          var o = Yd(e);
          Vl(e, o, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            a = Yd(e);
          Hl(e, a, s);
          break;
        default:
          throw Error(T(161));
      }
    } catch (l) {
      q(e, e.return, l);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function aw(e, t, n) {
  (P = e), xm(e);
}
function xm(e, t, n) {
  for (var r = (e.mode & 1) !== 0; P !== null; ) {
    var i = P,
      o = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || po;
      if (!s) {
        var a = i.alternate,
          l = (a !== null && a.memoizedState !== null) || he;
        a = po;
        var u = he;
        if (((po = s), (he = l) && !u))
          for (P = i; P !== null; )
            (s = P),
              (l = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? nf(i)
                : l !== null
                ? ((l.return = s), (P = l))
                : nf(i);
        for (; o !== null; ) (P = o), xm(o), (o = o.sibling);
        (P = i), (po = a), (he = u);
      }
      ef(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (P = o)) : ef(e);
  }
}
function ef(e) {
  for (; P !== null; ) {
    var t = P;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              he || Fs(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !he)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Je(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && jd(t, o, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                jd(t, s, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var l = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l.autoFocus && n.focus();
                    break;
                  case "img":
                    l.src && (n.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var d = c.dehydrated;
                    d !== null && gi(d);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(T(163));
          }
        he || (t.flags & 512 && $l(t));
      } catch (f) {
        q(t, t.return, f);
      }
    }
    if (t === e) {
      P = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (P = n);
      break;
    }
    P = t.return;
  }
}
function tf(e) {
  for (; P !== null; ) {
    var t = P;
    if (t === e) {
      P = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (P = n);
      break;
    }
    P = t.return;
  }
}
function nf(e) {
  for (; P !== null; ) {
    var t = P;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Fs(4, t);
          } catch (l) {
            q(t, n, l);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (l) {
              q(t, i, l);
            }
          }
          var o = t.return;
          try {
            $l(t);
          } catch (l) {
            q(t, o, l);
          }
          break;
        case 5:
          var s = t.return;
          try {
            $l(t);
          } catch (l) {
            q(t, s, l);
          }
      }
    } catch (l) {
      q(t, t.return, l);
    }
    if (t === e) {
      P = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (P = a);
      break;
    }
    P = t.return;
  }
}
var lw = Math.ceil,
  os = Rt.ReactCurrentDispatcher,
  oc = Rt.ReactCurrentOwner,
  He = Rt.ReactCurrentBatchConfig,
  M = 0,
  se = null,
  te = null,
  ue = 0,
  Pe = 0,
  rr = dn(0),
  re = 0,
  Ii = null,
  bn = 0,
  Bs = 0,
  sc = 0,
  ai = null,
  Ee = null,
  ac = 0,
  wr = 1 / 0,
  ht = null,
  ss = !1,
  Wl = null,
  Xt = null,
  mo = !1,
  Vt = null,
  as = 0,
  li = 0,
  Kl = null,
  Oo = -1,
  bo = 0;
function ve() {
  return M & 6 ? Z() : Oo !== -1 ? Oo : (Oo = Z());
}
function Yt(e) {
  return e.mode & 1
    ? M & 2 && ue !== 0
      ? ue & -ue
      : W0.transition !== null
      ? (bo === 0 && (bo = cp()), bo)
      : ((e = j),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : yp(e.type))),
        e)
    : 1;
}
function et(e, t, n, r) {
  if (50 < li) throw ((li = 0), (Kl = null), Error(T(185)));
  Mi(e, n, r),
    (!(M & 2) || e !== se) &&
      (e === se && (!(M & 2) && (Bs |= n), re === 4 && jt(e, ue)),
      Te(e, r),
      n === 1 && M === 0 && !(t.mode & 1) && ((wr = Z() + 500), Us && fn()));
}
function Te(e, t) {
  var n = e.callbackNode;
  Wv(e, t);
  var r = Vo(e, e === se ? ue : 0);
  if (r === 0)
    n !== null && dd(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && dd(n), t === 1))
      e.tag === 0 ? V0(rf.bind(null, e)) : Up(rf.bind(null, e)),
        B0(function () {
          !(M & 6) && fn();
        }),
        (n = null);
    else {
      switch (dp(r)) {
        case 1:
          n = Au;
          break;
        case 4:
          n = lp;
          break;
        case 16:
          n = Ho;
          break;
        case 536870912:
          n = up;
          break;
        default:
          n = Ho;
      }
      n = Lm(n, Im.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Im(e, t) {
  if (((Oo = -1), (bo = 0), M & 6)) throw Error(T(327));
  var n = e.callbackNode;
  if (ur() && e.callbackNode !== n) return null;
  var r = Vo(e, e === se ? ue : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ls(e, r);
  else {
    t = r;
    var i = M;
    M |= 2;
    var o = Pm();
    (se !== e || ue !== t) && ((ht = null), (wr = Z() + 500), Tn(e, t));
    do
      try {
        dw();
        break;
      } catch (a) {
        Rm(e, a);
      }
    while (!0);
    Ku(),
      (os.current = o),
      (M = i),
      te !== null ? (t = 0) : ((se = null), (ue = 0), (t = re));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = wl(e)), i !== 0 && ((r = i), (t = Gl(e, i)))), t === 1)
    )
      throw ((n = Ii), Tn(e, 0), jt(e, r), Te(e, Z()), n);
    if (t === 6) jt(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !uw(i) &&
          ((t = ls(e, r)),
          t === 2 && ((o = wl(e)), o !== 0 && ((r = o), (t = Gl(e, o)))),
          t === 1))
      )
        throw ((n = Ii), Tn(e, 0), jt(e, r), Te(e, Z()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(T(345));
        case 2:
          vn(e, Ee, ht);
          break;
        case 3:
          if (
            (jt(e, r), (r & 130023424) === r && ((t = ac + 500 - Z()), 10 < t))
          ) {
            if (Vo(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              ve(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = Il(vn.bind(null, e, Ee, ht), t);
            break;
          }
          vn(e, Ee, ht);
          break;
        case 4:
          if ((jt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - Ze(r);
            (o = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~o);
          }
          if (
            ((r = i),
            (r = Z() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * lw(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Il(vn.bind(null, e, Ee, ht), r);
            break;
          }
          vn(e, Ee, ht);
          break;
        case 5:
          vn(e, Ee, ht);
          break;
        default:
          throw Error(T(329));
      }
    }
  }
  return Te(e, Z()), e.callbackNode === n ? Im.bind(null, e) : null;
}
function Gl(e, t) {
  var n = ai;
  return (
    e.current.memoizedState.isDehydrated && (Tn(e, t).flags |= 256),
    (e = ls(e, t)),
    e !== 2 && ((t = Ee), (Ee = n), t !== null && ql(t)),
    e
  );
}
function ql(e) {
  Ee === null ? (Ee = e) : Ee.push.apply(Ee, e);
}
function uw(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!rt(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function jt(e, t) {
  for (
    t &= ~sc,
      t &= ~Bs,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Ze(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function rf(e) {
  if (M & 6) throw Error(T(327));
  ur();
  var t = Vo(e, 0);
  if (!(t & 1)) return Te(e, Z()), null;
  var n = ls(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = wl(e);
    r !== 0 && ((t = r), (n = Gl(e, r)));
  }
  if (n === 1) throw ((n = Ii), Tn(e, 0), jt(e, t), Te(e, Z()), n);
  if (n === 6) throw Error(T(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    vn(e, Ee, ht),
    Te(e, Z()),
    null
  );
}
function lc(e, t) {
  var n = M;
  M |= 1;
  try {
    return e(t);
  } finally {
    (M = n), M === 0 && ((wr = Z() + 500), Us && fn());
  }
}
function An(e) {
  Vt !== null && Vt.tag === 0 && !(M & 6) && ur();
  var t = M;
  M |= 1;
  var n = He.transition,
    r = j;
  try {
    if (((He.transition = null), (j = 1), e)) return e();
  } finally {
    (j = r), (He.transition = n), (M = t), !(M & 6) && fn();
  }
}
function uc() {
  (Pe = rr.current), H(rr);
}
function Tn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), F0(n)), te !== null))
    for (n = te.return; n !== null; ) {
      var r = n;
      switch ((Hu(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Jo();
          break;
        case 3:
          yr(), H(ke), H(pe), Yu();
          break;
        case 5:
          Xu(r);
          break;
        case 4:
          yr();
          break;
        case 13:
          H(W);
          break;
        case 19:
          H(W);
          break;
        case 10:
          Gu(r.type._context);
          break;
        case 22:
        case 23:
          uc();
      }
      n = n.return;
    }
  if (
    ((se = e),
    (te = e = Zt(e.current, null)),
    (ue = Pe = t),
    (re = 0),
    (Ii = null),
    (sc = Bs = bn = 0),
    (Ee = ai = null),
    Sn !== null)
  ) {
    for (t = 0; t < Sn.length; t++)
      if (((n = Sn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var s = o.next;
          (o.next = i), (r.next = s);
        }
        n.pending = r;
      }
    Sn = null;
  }
  return e;
}
function Rm(e, t) {
  do {
    var n = te;
    try {
      if ((Ku(), (Ro.current = is), rs)) {
        for (var r = K.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        rs = !1;
      }
      if (
        ((On = 0),
        (oe = ne = K = null),
        (oi = !1),
        (Ci = 0),
        (oc.current = null),
        n === null || n.return === null)
      ) {
        (re = 1), (Ii = t), (te = null);
        break;
      }
      e: {
        var o = e,
          s = n.return,
          a = n,
          l = t;
        if (
          ((t = ue),
          (a.flags |= 32768),
          l !== null && typeof l == "object" && typeof l.then == "function")
        ) {
          var u = l,
            c = a,
            d = c.tag;
          if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var f = c.alternate;
            f
              ? ((c.updateQueue = f.updateQueue),
                (c.memoizedState = f.memoizedState),
                (c.lanes = f.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var v = Vd(s);
          if (v !== null) {
            (v.flags &= -257),
              Wd(v, s, a, o, t),
              v.mode & 1 && Hd(o, u, t),
              (t = v),
              (l = u);
            var g = t.updateQueue;
            if (g === null) {
              var y = new Set();
              y.add(l), (t.updateQueue = y);
            } else g.add(l);
            break e;
          } else {
            if (!(t & 1)) {
              Hd(o, u, t), cc();
              break e;
            }
            l = Error(T(426));
          }
        } else if (V && a.mode & 1) {
          var E = Vd(s);
          if (E !== null) {
            !(E.flags & 65536) && (E.flags |= 256),
              Wd(E, s, a, o, t),
              Vu(vr(l, a));
            break e;
          }
        }
        (o = l = vr(l, a)),
          re !== 4 && (re = 2),
          ai === null ? (ai = [o]) : ai.push(o),
          (o = s);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var h = dm(o, l, t);
              Md(o, h);
              break e;
            case 1:
              a = l;
              var p = o.type,
                m = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof p.getDerivedStateFromError == "function" ||
                  (m !== null &&
                    typeof m.componentDidCatch == "function" &&
                    (Xt === null || !Xt.has(m))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var _ = fm(o, a, t);
                Md(o, _);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Om(n);
    } catch (k) {
      (t = k), te === n && n !== null && (te = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Pm() {
  var e = os.current;
  return (os.current = is), e === null ? is : e;
}
function cc() {
  (re === 0 || re === 3 || re === 2) && (re = 4),
    se === null || (!(bn & 268435455) && !(Bs & 268435455)) || jt(se, ue);
}
function ls(e, t) {
  var n = M;
  M |= 2;
  var r = Pm();
  (se !== e || ue !== t) && ((ht = null), Tn(e, t));
  do
    try {
      cw();
      break;
    } catch (i) {
      Rm(e, i);
    }
  while (!0);
  if ((Ku(), (M = n), (os.current = r), te !== null)) throw Error(T(261));
  return (se = null), (ue = 0), re;
}
function cw() {
  for (; te !== null; ) Nm(te);
}
function dw() {
  for (; te !== null && !Uv(); ) Nm(te);
}
function Nm(e) {
  var t = Am(e.alternate, e, Pe);
  (e.memoizedProps = e.pendingProps),
    t === null ? Om(e) : (te = t),
    (oc.current = null);
}
function Om(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = iw(n, t)), n !== null)) {
        (n.flags &= 32767), (te = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (re = 6), (te = null);
        return;
      }
    } else if (((n = rw(n, t, Pe)), n !== null)) {
      te = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      te = t;
      return;
    }
    te = t = e;
  } while (t !== null);
  re === 0 && (re = 5);
}
function vn(e, t, n) {
  var r = j,
    i = He.transition;
  try {
    (He.transition = null), (j = 1), fw(e, t, n, r);
  } finally {
    (He.transition = i), (j = r);
  }
  return null;
}
function fw(e, t, n, r) {
  do ur();
  while (Vt !== null);
  if (M & 6) throw Error(T(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(T(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (Kv(e, o),
    e === se && ((te = se = null), (ue = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      mo ||
      ((mo = !0),
      Lm(Ho, function () {
        return ur(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = He.transition), (He.transition = null);
    var s = j;
    j = 1;
    var a = M;
    (M |= 4),
      (oc.current = null),
      sw(e, n),
      Tm(n, e),
      b0(Tl),
      (Wo = !!Cl),
      (Tl = Cl = null),
      (e.current = n),
      aw(n),
      Mv(),
      (M = a),
      (j = s),
      (He.transition = o);
  } else e.current = n;
  if (
    (mo && ((mo = !1), (Vt = e), (as = i)),
    (o = e.pendingLanes),
    o === 0 && (Xt = null),
    Bv(n.stateNode),
    Te(e, Z()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (ss) throw ((ss = !1), (e = Wl), (Wl = null), e);
  return (
    as & 1 && e.tag !== 0 && ur(),
    (o = e.pendingLanes),
    o & 1 ? (e === Kl ? li++ : ((li = 0), (Kl = e))) : (li = 0),
    fn(),
    null
  );
}
function ur() {
  if (Vt !== null) {
    var e = dp(as),
      t = He.transition,
      n = j;
    try {
      if (((He.transition = null), (j = 16 > e ? 16 : e), Vt === null))
        var r = !1;
      else {
        if (((e = Vt), (Vt = null), (as = 0), M & 6)) throw Error(T(331));
        var i = M;
        for (M |= 4, P = e.current; P !== null; ) {
          var o = P,
            s = o.child;
          if (P.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var l = 0; l < a.length; l++) {
                var u = a[l];
                for (P = u; P !== null; ) {
                  var c = P;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      si(8, c, o);
                  }
                  var d = c.child;
                  if (d !== null) (d.return = c), (P = d);
                  else
                    for (; P !== null; ) {
                      c = P;
                      var f = c.sibling,
                        v = c.return;
                      if ((Sm(c), c === u)) {
                        P = null;
                        break;
                      }
                      if (f !== null) {
                        (f.return = v), (P = f);
                        break;
                      }
                      P = v;
                    }
                }
              }
              var g = o.alternate;
              if (g !== null) {
                var y = g.child;
                if (y !== null) {
                  g.child = null;
                  do {
                    var E = y.sibling;
                    (y.sibling = null), (y = E);
                  } while (y !== null);
                }
              }
              P = o;
            }
          }
          if (o.subtreeFlags & 2064 && s !== null) (s.return = o), (P = s);
          else
            e: for (; P !== null; ) {
              if (((o = P), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    si(9, o, o.return);
                }
              var h = o.sibling;
              if (h !== null) {
                (h.return = o.return), (P = h);
                break e;
              }
              P = o.return;
            }
        }
        var p = e.current;
        for (P = p; P !== null; ) {
          s = P;
          var m = s.child;
          if (s.subtreeFlags & 2064 && m !== null) (m.return = s), (P = m);
          else
            e: for (s = p; P !== null; ) {
              if (((a = P), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Fs(9, a);
                  }
                } catch (k) {
                  q(a, a.return, k);
                }
              if (a === s) {
                P = null;
                break e;
              }
              var _ = a.sibling;
              if (_ !== null) {
                (_.return = a.return), (P = _);
                break e;
              }
              P = a.return;
            }
        }
        if (
          ((M = i), fn(), ct && typeof ct.onPostCommitFiberRoot == "function")
        )
          try {
            ct.onPostCommitFiberRoot(Os, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (j = n), (He.transition = t);
    }
  }
  return !1;
}
function of(e, t, n) {
  (t = vr(n, t)),
    (t = dm(e, t, 1)),
    (e = Qt(e, t, 1)),
    (t = ve()),
    e !== null && (Mi(e, 1, t), Te(e, t));
}
function q(e, t, n) {
  if (e.tag === 3) of(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        of(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Xt === null || !Xt.has(r)))
        ) {
          (e = vr(n, e)),
            (e = fm(t, e, 1)),
            (t = Qt(t, e, 1)),
            (e = ve()),
            t !== null && (Mi(t, 1, e), Te(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function hw(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = ve()),
    (e.pingedLanes |= e.suspendedLanes & n),
    se === e &&
      (ue & n) === n &&
      (re === 4 || (re === 3 && (ue & 130023424) === ue && 500 > Z() - ac)
        ? Tn(e, 0)
        : (sc |= n)),
    Te(e, t);
}
function bm(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = io), (io <<= 1), !(io & 130023424) && (io = 4194304))
      : (t = 1));
  var n = ve();
  (e = Ct(e, t)), e !== null && (Mi(e, t, n), Te(e, n));
}
function pw(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), bm(e, n);
}
function mw(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(T(314));
  }
  r !== null && r.delete(t), bm(e, n);
}
var Am;
Am = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || ke.current) Se = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Se = !1), nw(e, t, n);
      Se = !!(e.flags & 131072);
    }
  else (Se = !1), V && t.flags & 1048576 && Mp(t, Yo, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      No(e, t), (e = t.pendingProps);
      var i = pr(t, pe.current);
      lr(t, n), (i = ec(null, t, r, e, i, n));
      var o = tc();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ce(r) ? ((o = !0), Qo(t)) : (o = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            Ju(t),
            (i.updater = js),
            (t.stateNode = i),
            (i._reactInternals = t),
            Ll(t, r, e, n),
            (t = Ml(null, t, r, !0, o, n)))
          : ((t.tag = 0), V && o && $u(t), ye(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (No(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = yw(r)),
          (e = Je(r, e)),
          i)
        ) {
          case 0:
            t = Ul(null, t, r, e, n);
            break e;
          case 1:
            t = qd(null, t, r, e, n);
            break e;
          case 11:
            t = Kd(null, t, r, e, n);
            break e;
          case 14:
            t = Gd(null, t, r, Je(r.type, e), n);
            break e;
        }
        throw Error(T(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Je(r, i)),
        Ul(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Je(r, i)),
        qd(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((gm(t), e === null)) throw Error(T(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (i = o.element),
          Hp(e, t),
          ts(t, r, null, n);
        var s = t.memoizedState;
        if (((r = s.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (i = vr(Error(T(423)), t)), (t = Jd(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = vr(Error(T(424)), t)), (t = Jd(e, t, r, n, i));
            break e;
          } else
            for (
              Ne = Jt(t.stateNode.containerInfo.firstChild),
                Ae = t,
                V = !0,
                Xe = null,
                n = zp(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((mr(), r === i)) {
            t = Tt(e, t, n);
            break e;
          }
          ye(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Vp(t),
        e === null && Ol(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (s = i.children),
        xl(r, i) ? (s = null) : o !== null && xl(r, o) && (t.flags |= 32),
        mm(e, t),
        ye(e, t, s, n),
        t.child
      );
    case 6:
      return e === null && Ol(t), null;
    case 13:
      return ym(e, t, n);
    case 4:
      return (
        Qu(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = gr(t, null, r, n)) : ye(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Je(r, i)),
        Kd(e, t, r, i, n)
      );
    case 7:
      return ye(e, t, t.pendingProps, n), t.child;
    case 8:
      return ye(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ye(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (s = i.value),
          z(Zo, r._currentValue),
          (r._currentValue = s),
          o !== null)
        )
          if (rt(o.value, s)) {
            if (o.children === i.children && !ke.current) {
              t = Tt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var a = o.dependencies;
              if (a !== null) {
                s = o.child;
                for (var l = a.firstContext; l !== null; ) {
                  if (l.context === r) {
                    if (o.tag === 1) {
                      (l = Et(-1, n & -n)), (l.tag = 2);
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null
                          ? (l.next = l)
                          : ((l.next = c.next), (c.next = l)),
                          (u.pending = l);
                      }
                    }
                    (o.lanes |= n),
                      (l = o.alternate),
                      l !== null && (l.lanes |= n),
                      bl(o.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  l = l.next;
                }
              } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((s = o.return), s === null)) throw Error(T(341));
                (s.lanes |= n),
                  (a = s.alternate),
                  a !== null && (a.lanes |= n),
                  bl(s, n, t),
                  (s = o.sibling);
              } else s = o.child;
              if (s !== null) s.return = o;
              else
                for (s = o; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((o = s.sibling), o !== null)) {
                    (o.return = s.return), (s = o);
                    break;
                  }
                  s = s.return;
                }
              o = s;
            }
        ye(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        lr(t, n),
        (i = We(i)),
        (r = r(i)),
        (t.flags |= 1),
        ye(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = Je(r, t.pendingProps)),
        (i = Je(r.type, i)),
        Gd(e, t, r, i, n)
      );
    case 15:
      return hm(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Je(r, i)),
        No(e, t),
        (t.tag = 1),
        Ce(r) ? ((e = !0), Qo(t)) : (e = !1),
        lr(t, n),
        cm(t, r, i),
        Ll(t, r, i, n),
        Ml(null, t, r, !0, e, n)
      );
    case 19:
      return vm(e, t, n);
    case 22:
      return pm(e, t, n);
  }
  throw Error(T(156, t.tag));
};
function Lm(e, t) {
  return ap(e, t);
}
function gw(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function $e(e, t, n, r) {
  return new gw(e, t, n, r);
}
function dc(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function yw(e) {
  if (typeof e == "function") return dc(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Nu)) return 11;
    if (e === Ou) return 14;
  }
  return 2;
}
function Zt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = $e(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Ao(e, t, n, r, i, o) {
  var s = 2;
  if (((r = e), typeof e == "function")) dc(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case Gn:
        return xn(n.children, i, o, t);
      case Pu:
        (s = 8), (i |= 8);
        break;
      case il:
        return (
          (e = $e(12, n, t, i | 2)), (e.elementType = il), (e.lanes = o), e
        );
      case ol:
        return (e = $e(13, n, t, i)), (e.elementType = ol), (e.lanes = o), e;
      case sl:
        return (e = $e(19, n, t, i)), (e.elementType = sl), (e.lanes = o), e;
      case Vh:
        return zs(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case $h:
              s = 10;
              break e;
            case Hh:
              s = 9;
              break e;
            case Nu:
              s = 11;
              break e;
            case Ou:
              s = 14;
              break e;
            case Dt:
              (s = 16), (r = null);
              break e;
          }
        throw Error(T(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = $e(s, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function xn(e, t, n, r) {
  return (e = $e(7, e, r, t)), (e.lanes = n), e;
}
function zs(e, t, n, r) {
  return (
    (e = $e(22, e, r, t)),
    (e.elementType = Vh),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Ua(e, t, n) {
  return (e = $e(6, e, null, t)), (e.lanes = n), e;
}
function Ma(e, t, n) {
  return (
    (t = $e(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function vw(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = ya(0)),
    (this.expirationTimes = ya(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = ya(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function fc(e, t, n, r, i, o, s, a, l) {
  return (
    (e = new vw(e, t, n, a, l)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = $e(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Ju(o),
    e
  );
}
function ww(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Kn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Dm(e) {
  if (!e) return an;
  e = e._reactInternals;
  e: {
    if (zn(e) !== e || e.tag !== 1) throw Error(T(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ce(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(T(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ce(n)) return Dp(e, n, t);
  }
  return t;
}
function Um(e, t, n, r, i, o, s, a, l) {
  return (
    (e = fc(n, r, !0, e, i, o, s, a, l)),
    (e.context = Dm(null)),
    (n = e.current),
    (r = ve()),
    (i = Yt(n)),
    (o = Et(r, i)),
    (o.callback = t ?? null),
    Qt(n, o, i),
    (e.current.lanes = i),
    Mi(e, i, r),
    Te(e, r),
    e
  );
}
function $s(e, t, n, r) {
  var i = t.current,
    o = ve(),
    s = Yt(i);
  return (
    (n = Dm(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Et(o, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Qt(i, t, s)),
    e !== null && (et(e, i, s, o), Io(e, i, s)),
    s
  );
}
function us(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function sf(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function hc(e, t) {
  sf(e, t), (e = e.alternate) && sf(e, t);
}
function _w() {
  return null;
}
var Mm =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function pc(e) {
  this._internalRoot = e;
}
Hs.prototype.render = pc.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(T(409));
  $s(e, t, null, null);
};
Hs.prototype.unmount = pc.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    An(function () {
      $s(null, e, null, null);
    }),
      (t[kt] = null);
  }
};
function Hs(e) {
  this._internalRoot = e;
}
Hs.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = pp();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Mt.length && t !== 0 && t < Mt[n].priority; n++);
    Mt.splice(n, 0, e), n === 0 && gp(e);
  }
};
function mc(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Vs(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function af() {}
function Ew(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var u = us(s);
        o.call(u);
      };
    }
    var s = Um(t, r, e, 0, null, !1, !1, "", af);
    return (
      (e._reactRootContainer = s),
      (e[kt] = s.current),
      wi(e.nodeType === 8 ? e.parentNode : e),
      An(),
      s
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var u = us(l);
      a.call(u);
    };
  }
  var l = fc(e, 0, !1, null, null, !1, !1, "", af);
  return (
    (e._reactRootContainer = l),
    (e[kt] = l.current),
    wi(e.nodeType === 8 ? e.parentNode : e),
    An(function () {
      $s(t, l, n, r);
    }),
    l
  );
}
function Ws(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof i == "function") {
      var a = i;
      i = function () {
        var l = us(s);
        a.call(l);
      };
    }
    $s(t, s, e, i);
  } else s = Ew(n, t, e, i, r);
  return us(s);
}
fp = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Jr(t.pendingLanes);
        n !== 0 &&
          (Lu(t, n | 1), Te(t, Z()), !(M & 6) && ((wr = Z() + 500), fn()));
      }
      break;
    case 13:
      An(function () {
        var r = Ct(e, 1);
        if (r !== null) {
          var i = ve();
          et(r, e, 1, i);
        }
      }),
        hc(e, 1);
  }
};
Du = function (e) {
  if (e.tag === 13) {
    var t = Ct(e, 134217728);
    if (t !== null) {
      var n = ve();
      et(t, e, 134217728, n);
    }
    hc(e, 134217728);
  }
};
hp = function (e) {
  if (e.tag === 13) {
    var t = Yt(e),
      n = Ct(e, t);
    if (n !== null) {
      var r = ve();
      et(n, e, t, r);
    }
    hc(e, t);
  }
};
pp = function () {
  return j;
};
mp = function (e, t) {
  var n = j;
  try {
    return (j = e), t();
  } finally {
    j = n;
  }
};
gl = function (e, t, n) {
  switch (t) {
    case "input":
      if ((ul(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Ds(r);
            if (!i) throw Error(T(90));
            Kh(r), ul(r, i);
          }
        }
      }
      break;
    case "textarea":
      qh(e, n);
      break;
    case "select":
      (t = n.value), t != null && ir(e, !!n.multiple, t, !1);
  }
};
tp = lc;
np = An;
var Sw = { usingClientEntryPoint: !1, Events: [Fi, Xn, Ds, Zh, ep, lc] },
  Vr = {
    findFiberByHostInstance: En,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  kw = {
    bundleType: Vr.bundleType,
    version: Vr.version,
    rendererPackageName: Vr.rendererPackageName,
    rendererConfig: Vr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Rt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = op(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Vr.findFiberByHostInstance || _w,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var go = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!go.isDisabled && go.supportsFiber)
    try {
      (Os = go.inject(kw)), (ct = go);
    } catch {}
}
Me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Sw;
Me.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!mc(t)) throw Error(T(200));
  return ww(e, t, null, n);
};
Me.createRoot = function (e, t) {
  if (!mc(e)) throw Error(T(299));
  var n = !1,
    r = "",
    i = Mm;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = fc(e, 1, !1, null, null, n, !1, r, i)),
    (e[kt] = t.current),
    wi(e.nodeType === 8 ? e.parentNode : e),
    new pc(t)
  );
};
Me.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(T(188))
      : ((e = Object.keys(e).join(",")), Error(T(268, e)));
  return (e = op(t)), (e = e === null ? null : e.stateNode), e;
};
Me.flushSync = function (e) {
  return An(e);
};
Me.hydrate = function (e, t, n) {
  if (!Vs(t)) throw Error(T(200));
  return Ws(null, e, t, !0, n);
};
Me.hydrateRoot = function (e, t, n) {
  if (!mc(e)) throw Error(T(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = "",
    s = Mm;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = Um(t, null, e, 1, n ?? null, i, !1, o, s)),
    (e[kt] = t.current),
    wi(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new Hs(t);
};
Me.render = function (e, t, n) {
  if (!Vs(t)) throw Error(T(200));
  return Ws(null, e, t, !1, n);
};
Me.unmountComponentAtNode = function (e) {
  if (!Vs(e)) throw Error(T(40));
  return e._reactRootContainer
    ? (An(function () {
        Ws(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[kt] = null);
        });
      }),
      !0)
    : !1;
};
Me.unstable_batchedUpdates = lc;
Me.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Vs(n)) throw Error(T(200));
  if (e == null || e._reactInternals === void 0) throw Error(T(38));
  return Ws(e, t, n, !1, r);
};
Me.version = "18.3.1-next-f1338f8080-20240426";
function jm() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jm);
    } catch (e) {
      console.error(e);
    }
}
jm(), (jh.exports = Me);
var Cw = jh.exports,
  lf = Cw;
(nl.createRoot = lf.createRoot), (nl.hydrateRoot = lf.hydrateRoot);
/**
 * @remix-run/router v1.17.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ri() {
  return (
    (Ri = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ri.apply(this, arguments)
  );
}
var Wt;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(Wt || (Wt = {}));
const uf = "popstate";
function Tw(e) {
  e === void 0 && (e = {});
  function t(r, i) {
    let { pathname: o, search: s, hash: a } = r.location;
    return Jl(
      "",
      { pathname: o, search: s, hash: a },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default"
    );
  }
  function n(r, i) {
    return typeof i == "string" ? i : cs(i);
  }
  return Iw(t, n, null, e);
}
function ee(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Fm(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function xw() {
  return Math.random().toString(36).substr(2, 8);
}
function cf(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Jl(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Ri(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? Pr(t) : t,
      { state: n, key: (t && t.key) || r || xw() }
    )
  );
}
function cs(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function Pr(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function Iw(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: i = document.defaultView, v5Compat: o = !1 } = r,
    s = i.history,
    a = Wt.Pop,
    l = null,
    u = c();
  u == null && ((u = 0), s.replaceState(Ri({}, s.state, { idx: u }), ""));
  function c() {
    return (s.state || { idx: null }).idx;
  }
  function d() {
    a = Wt.Pop;
    let E = c(),
      h = E == null ? null : E - u;
    (u = E), l && l({ action: a, location: y.location, delta: h });
  }
  function f(E, h) {
    a = Wt.Push;
    let p = Jl(y.location, E, h);
    u = c() + 1;
    let m = cf(p, u),
      _ = y.createHref(p);
    try {
      s.pushState(m, "", _);
    } catch (k) {
      if (k instanceof DOMException && k.name === "DataCloneError") throw k;
      i.location.assign(_);
    }
    o && l && l({ action: a, location: y.location, delta: 1 });
  }
  function v(E, h) {
    a = Wt.Replace;
    let p = Jl(y.location, E, h);
    u = c();
    let m = cf(p, u),
      _ = y.createHref(p);
    s.replaceState(m, "", _),
      o && l && l({ action: a, location: y.location, delta: 0 });
  }
  function g(E) {
    let h = i.location.origin !== "null" ? i.location.origin : i.location.href,
      p = typeof E == "string" ? E : cs(E);
    return (
      (p = p.replace(/ $/, "%20")),
      ee(
        h,
        "No window.location.(origin|href) available to create URL for href: " +
          p
      ),
      new URL(p, h)
    );
  }
  let y = {
    get action() {
      return a;
    },
    get location() {
      return e(i, s);
    },
    listen(E) {
      if (l) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(uf, d),
        (l = E),
        () => {
          i.removeEventListener(uf, d), (l = null);
        }
      );
    },
    createHref(E) {
      return t(i, E);
    },
    createURL: g,
    encodeLocation(E) {
      let h = g(E);
      return { pathname: h.pathname, search: h.search, hash: h.hash };
    },
    push: f,
    replace: v,
    go(E) {
      return s.go(E);
    },
  };
  return y;
}
var df;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(df || (df = {}));
function Rw(e, t, n) {
  return n === void 0 && (n = "/"), Pw(e, t, n, !1);
}
function Pw(e, t, n, r) {
  let i = typeof t == "string" ? Pr(t) : t,
    o = gc(i.pathname || "/", n);
  if (o == null) return null;
  let s = Bm(e);
  Nw(s);
  let a = null;
  for (let l = 0; a == null && l < s.length; ++l) {
    let u = zw(o);
    a = Fw(s[l], u, r);
  }
  return a;
}
function Bm(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let i = (o, s, a) => {
    let l = {
      relativePath: a === void 0 ? o.path || "" : a,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: s,
      route: o,
    };
    l.relativePath.startsWith("/") &&
      (ee(
        l.relativePath.startsWith(r),
        'Absolute route path "' +
          l.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (l.relativePath = l.relativePath.slice(r.length)));
    let u = en([r, l.relativePath]),
      c = n.concat(l);
    o.children &&
      o.children.length > 0 &&
      (ee(
        o.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + u + '".')
      ),
      Bm(o.children, t, c, u)),
      !(o.path == null && !o.index) &&
        t.push({ path: u, score: Mw(u, o.index), routesMeta: c });
  };
  return (
    e.forEach((o, s) => {
      var a;
      if (o.path === "" || !((a = o.path) != null && a.includes("?"))) i(o, s);
      else for (let l of zm(o.path)) i(o, s, l);
    }),
    t
  );
}
function zm(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return i ? [o, ""] : [o];
  let s = zm(r.join("/")),
    a = [];
  return (
    a.push(...s.map((l) => (l === "" ? o : [o, l].join("/")))),
    i && a.push(...s),
    a.map((l) => (e.startsWith("/") && l === "" ? "/" : l))
  );
}
function Nw(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : jw(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const Ow = /^:[\w-]+$/,
  bw = 3,
  Aw = 2,
  Lw = 1,
  Dw = 10,
  Uw = -2,
  ff = (e) => e === "*";
function Mw(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(ff) && (r += Uw),
    t && (r += Aw),
    n
      .filter((i) => !ff(i))
      .reduce((i, o) => i + (Ow.test(o) ? bw : o === "" ? Lw : Dw), r)
  );
}
function jw(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function Fw(e, t, n) {
  let { routesMeta: r } = e,
    i = {},
    o = "/",
    s = [];
  for (let a = 0; a < r.length; ++a) {
    let l = r[a],
      u = a === r.length - 1,
      c = o === "/" ? t : t.slice(o.length) || "/",
      d = hf(
        { path: l.relativePath, caseSensitive: l.caseSensitive, end: u },
        c
      ),
      f = l.route;
    if (
      (!d &&
        u &&
        n &&
        !r[r.length - 1].route.index &&
        (d = hf(
          { path: l.relativePath, caseSensitive: l.caseSensitive, end: !1 },
          c
        )),
      !d)
    )
      return null;
    Object.assign(i, d.params),
      s.push({
        params: i,
        pathname: en([o, d.pathname]),
        pathnameBase: Ww(en([o, d.pathnameBase])),
        route: f,
      }),
      d.pathnameBase !== "/" && (o = en([o, d.pathnameBase]));
  }
  return s;
}
function hf(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = Bw(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let o = i[0],
    s = o.replace(/(.)\/+$/, "$1"),
    a = i.slice(1);
  return {
    params: r.reduce((u, c, d) => {
      let { paramName: f, isOptional: v } = c;
      if (f === "*") {
        let y = a[d] || "";
        s = o.slice(0, o.length - y.length).replace(/(.)\/+$/, "$1");
      }
      const g = a[d];
      return (
        v && !g ? (u[f] = void 0) : (u[f] = (g || "").replace(/%2F/g, "/")), u
      );
    }, {}),
    pathname: o,
    pathnameBase: s,
    pattern: e,
  };
}
function Bw(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Fm(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    i =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (s, a, l) => (
            r.push({ paramName: a, isOptional: l != null }),
            l ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (i += "\\/*$")
      : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, t ? void 0 : "i"), r]
  );
}
function zw(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Fm(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function gc(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function $w(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: i = "",
  } = typeof e == "string" ? Pr(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : Hw(n, t)) : t,
    search: Kw(r),
    hash: Gw(i),
  };
}
function Hw(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((i) => {
      i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function ja(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Vw(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function yc(e, t) {
  let n = Vw(e);
  return t
    ? n.map((r, i) => (i === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function vc(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == "string"
    ? (i = Pr(e))
    : ((i = Ri({}, e)),
      ee(
        !i.pathname || !i.pathname.includes("?"),
        ja("?", "pathname", "search", i)
      ),
      ee(
        !i.pathname || !i.pathname.includes("#"),
        ja("#", "pathname", "hash", i)
      ),
      ee(!i.search || !i.search.includes("#"), ja("#", "search", "hash", i)));
  let o = e === "" || i.pathname === "",
    s = o ? "/" : i.pathname,
    a;
  if (s == null) a = n;
  else {
    let d = t.length - 1;
    if (!r && s.startsWith("..")) {
      let f = s.split("/");
      for (; f[0] === ".."; ) f.shift(), (d -= 1);
      i.pathname = f.join("/");
    }
    a = d >= 0 ? t[d] : "/";
  }
  let l = $w(i, a),
    u = s && s !== "/" && s.endsWith("/"),
    c = (o || s === ".") && n.endsWith("/");
  return !l.pathname.endsWith("/") && (u || c) && (l.pathname += "/"), l;
}
const en = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Ww = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Kw = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Gw = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function qw(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const $m = ["post", "put", "patch", "delete"];
new Set($m);
const Jw = ["get", ...$m];
new Set(Jw);
/**
 * React Router v6.24.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Pi() {
  return (
    (Pi = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Pi.apply(this, arguments)
  );
}
const wc = C.createContext(null),
  Qw = C.createContext(null),
  hn = C.createContext(null),
  Ks = C.createContext(null),
  Pt = C.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Hm = C.createContext(null);
function Xw(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  Nr() || ee(!1);
  let { basename: r, navigator: i } = C.useContext(hn),
    { hash: o, pathname: s, search: a } = Wm(e, { relative: n }),
    l = s;
  return (
    r !== "/" && (l = s === "/" ? r : en([r, s])),
    i.createHref({ pathname: l, search: a, hash: o })
  );
}
function Nr() {
  return C.useContext(Ks) != null;
}
function zi() {
  return Nr() || ee(!1), C.useContext(Ks).location;
}
function Vm(e) {
  C.useContext(hn).static || C.useLayoutEffect(e);
}
function Gs() {
  let { isDataRoute: e } = C.useContext(Pt);
  return e ? f_() : Yw();
}
function Yw() {
  Nr() || ee(!1);
  let e = C.useContext(wc),
    { basename: t, future: n, navigator: r } = C.useContext(hn),
    { matches: i } = C.useContext(Pt),
    { pathname: o } = zi(),
    s = JSON.stringify(yc(i, n.v7_relativeSplatPath)),
    a = C.useRef(!1);
  return (
    Vm(() => {
      a.current = !0;
    }),
    C.useCallback(
      function (u, c) {
        if ((c === void 0 && (c = {}), !a.current)) return;
        if (typeof u == "number") {
          r.go(u);
          return;
        }
        let d = vc(u, JSON.parse(s), o, c.relative === "path");
        e == null &&
          t !== "/" &&
          (d.pathname = d.pathname === "/" ? t : en([t, d.pathname])),
          (c.replace ? r.replace : r.push)(d, c.state, c);
      },
      [t, r, s, o, e]
    )
  );
}
const Zw = C.createContext(null);
function e_(e) {
  let t = C.useContext(Pt).outlet;
  return t && C.createElement(Zw.Provider, { value: e }, t);
}
function Wm(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = C.useContext(hn),
    { matches: i } = C.useContext(Pt),
    { pathname: o } = zi(),
    s = JSON.stringify(yc(i, r.v7_relativeSplatPath));
  return C.useMemo(() => vc(e, JSON.parse(s), o, n === "path"), [e, s, o, n]);
}
function t_(e, t) {
  return n_(e, t);
}
function n_(e, t, n, r) {
  Nr() || ee(!1);
  let { navigator: i } = C.useContext(hn),
    { matches: o } = C.useContext(Pt),
    s = o[o.length - 1],
    a = s ? s.params : {};
  s && s.pathname;
  let l = s ? s.pathnameBase : "/";
  s && s.route;
  let u = zi(),
    c;
  if (t) {
    var d;
    let E = typeof t == "string" ? Pr(t) : t;
    l === "/" || ((d = E.pathname) != null && d.startsWith(l)) || ee(!1),
      (c = E);
  } else c = u;
  let f = c.pathname || "/",
    v = f;
  if (l !== "/") {
    let E = l.replace(/^\//, "").split("/");
    v = "/" + f.replace(/^\//, "").split("/").slice(E.length).join("/");
  }
  let g = Rw(e, { pathname: v }),
    y = a_(
      g &&
        g.map((E) =>
          Object.assign({}, E, {
            params: Object.assign({}, a, E.params),
            pathname: en([
              l,
              i.encodeLocation
                ? i.encodeLocation(E.pathname).pathname
                : E.pathname,
            ]),
            pathnameBase:
              E.pathnameBase === "/"
                ? l
                : en([
                    l,
                    i.encodeLocation
                      ? i.encodeLocation(E.pathnameBase).pathname
                      : E.pathnameBase,
                  ]),
          })
        ),
      o,
      n,
      r
    );
  return t && y
    ? C.createElement(
        Ks.Provider,
        {
          value: {
            location: Pi(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              c
            ),
            navigationType: Wt.Pop,
          },
        },
        y
      )
    : y;
}
function r_() {
  let e = d_(),
    t = qw(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return C.createElement(
    C.Fragment,
    null,
    C.createElement("h2", null, "Unexpected Application Error!"),
    C.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? C.createElement("pre", { style: i }, n) : null,
    null
  );
}
const i_ = C.createElement(r_, null);
class o_ extends C.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? C.createElement(
          Pt.Provider,
          { value: this.props.routeContext },
          C.createElement(Hm.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function s_(e) {
  let { routeContext: t, match: n, children: r } = e,
    i = C.useContext(wc);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    C.createElement(Pt.Provider, { value: t }, r)
  );
}
function a_(e, t, n, r) {
  var i;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var o;
    if ((o = n) != null && o.errors) e = n.matches;
    else return null;
  }
  let s = e,
    a = (i = n) == null ? void 0 : i.errors;
  if (a != null) {
    let c = s.findIndex(
      (d) => d.route.id && (a == null ? void 0 : a[d.route.id]) !== void 0
    );
    c >= 0 || ee(!1), (s = s.slice(0, Math.min(s.length, c + 1)));
  }
  let l = !1,
    u = -1;
  if (n && r && r.v7_partialHydration)
    for (let c = 0; c < s.length; c++) {
      let d = s[c];
      if (
        ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (u = c),
        d.route.id)
      ) {
        let { loaderData: f, errors: v } = n,
          g =
            d.route.loader &&
            f[d.route.id] === void 0 &&
            (!v || v[d.route.id] === void 0);
        if (d.route.lazy || g) {
          (l = !0), u >= 0 ? (s = s.slice(0, u + 1)) : (s = [s[0]]);
          break;
        }
      }
    }
  return s.reduceRight((c, d, f) => {
    let v,
      g = !1,
      y = null,
      E = null;
    n &&
      ((v = a && d.route.id ? a[d.route.id] : void 0),
      (y = d.route.errorElement || i_),
      l &&
        (u < 0 && f === 0
          ? ((g = !0), (E = null))
          : u === f &&
            ((g = !0), (E = d.route.hydrateFallbackElement || null))));
    let h = t.concat(s.slice(0, f + 1)),
      p = () => {
        let m;
        return (
          v
            ? (m = y)
            : g
            ? (m = E)
            : d.route.Component
            ? (m = C.createElement(d.route.Component, null))
            : d.route.element
            ? (m = d.route.element)
            : (m = c),
          C.createElement(s_, {
            match: d,
            routeContext: { outlet: c, matches: h, isDataRoute: n != null },
            children: m,
          })
        );
      };
    return n && (d.route.ErrorBoundary || d.route.errorElement || f === 0)
      ? C.createElement(o_, {
          location: n.location,
          revalidation: n.revalidation,
          component: y,
          error: v,
          children: p(),
          routeContext: { outlet: null, matches: h, isDataRoute: !0 },
        })
      : p();
  }, null);
}
var Km = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(Km || {}),
  ds = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(ds || {});
function l_(e) {
  let t = C.useContext(wc);
  return t || ee(!1), t;
}
function u_(e) {
  let t = C.useContext(Qw);
  return t || ee(!1), t;
}
function c_(e) {
  let t = C.useContext(Pt);
  return t || ee(!1), t;
}
function Gm(e) {
  let t = c_(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || ee(!1), n.route.id;
}
function d_() {
  var e;
  let t = C.useContext(Hm),
    n = u_(ds.UseRouteError),
    r = Gm(ds.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function f_() {
  let { router: e } = l_(Km.UseNavigateStable),
    t = Gm(ds.UseNavigateStable),
    n = C.useRef(!1);
  return (
    Vm(() => {
      n.current = !0;
    }),
    C.useCallback(
      function (i, o) {
        o === void 0 && (o = {}),
          n.current &&
            (typeof i == "number"
              ? e.navigate(i)
              : e.navigate(i, Pi({ fromRouteId: t }, o)));
      },
      [e, t]
    )
  );
}
function h_(e) {
  let { to: t, replace: n, state: r, relative: i } = e;
  Nr() || ee(!1);
  let { future: o, static: s } = C.useContext(hn),
    { matches: a } = C.useContext(Pt),
    { pathname: l } = zi(),
    u = Gs(),
    c = vc(t, yc(a, o.v7_relativeSplatPath), l, i === "path"),
    d = JSON.stringify(c);
  return (
    C.useEffect(
      () => u(JSON.parse(d), { replace: n, state: r, relative: i }),
      [u, d, i, n, r]
    ),
    null
  );
}
function p_(e) {
  return e_(e.context);
}
function Wn(e) {
  ee(!1);
}
function m_(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: i = Wt.Pop,
    navigator: o,
    static: s = !1,
    future: a,
  } = e;
  Nr() && ee(!1);
  let l = t.replace(/^\/*/, "/"),
    u = C.useMemo(
      () => ({
        basename: l,
        navigator: o,
        static: s,
        future: Pi({ v7_relativeSplatPath: !1 }, a),
      }),
      [l, a, o, s]
    );
  typeof r == "string" && (r = Pr(r));
  let {
      pathname: c = "/",
      search: d = "",
      hash: f = "",
      state: v = null,
      key: g = "default",
    } = r,
    y = C.useMemo(() => {
      let E = gc(c, l);
      return E == null
        ? null
        : {
            location: { pathname: E, search: d, hash: f, state: v, key: g },
            navigationType: i,
          };
    }, [l, c, d, f, v, g, i]);
  return y == null
    ? null
    : C.createElement(
        hn.Provider,
        { value: u },
        C.createElement(Ks.Provider, { children: n, value: y })
      );
}
function g_(e) {
  let { children: t, location: n } = e;
  return t_(Ql(t), n);
}
new Promise(() => {});
function Ql(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    C.Children.forEach(e, (r, i) => {
      if (!C.isValidElement(r)) return;
      let o = [...t, i];
      if (r.type === C.Fragment) {
        n.push.apply(n, Ql(r.props.children, o));
        return;
      }
      r.type !== Wn && ee(!1), !r.props.index || !r.props.children || ee(!1);
      let s = {
        id: r.props.id || o.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (s.children = Ql(r.props.children, o)), n.push(s);
    }),
    n
  );
}
/**
 * React Router DOM v6.24.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Xl() {
  return (
    (Xl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Xl.apply(this, arguments)
  );
}
function y_(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    o;
  for (o = 0; o < r.length; o++)
    (i = r[o]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function v_(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function w_(e, t) {
  return e.button === 0 && (!t || t === "_self") && !v_(e);
}
const __ = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  E_ = "6";
try {
  window.__reactRouterVersion = E_;
} catch {}
const S_ = "startTransition",
  pf = tl[S_];
function k_(e) {
  let { basename: t, children: n, future: r, window: i } = e,
    o = C.useRef();
  o.current == null && (o.current = Tw({ window: i, v5Compat: !0 }));
  let s = o.current,
    [a, l] = C.useState({ action: s.action, location: s.location }),
    { v7_startTransition: u } = r || {},
    c = C.useCallback(
      (d) => {
        u && pf ? pf(() => l(d)) : l(d);
      },
      [l, u]
    );
  return (
    C.useLayoutEffect(() => s.listen(c), [s, c]),
    C.createElement(m_, {
      basename: t,
      children: n,
      location: a.location,
      navigationType: a.action,
      navigator: s,
      future: r,
    })
  );
}
const C_ =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  T_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  fs = C.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: i,
        reloadDocument: o,
        replace: s,
        state: a,
        target: l,
        to: u,
        preventScrollReset: c,
        unstable_viewTransition: d,
      } = t,
      f = y_(t, __),
      { basename: v } = C.useContext(hn),
      g,
      y = !1;
    if (typeof u == "string" && T_.test(u) && ((g = u), C_))
      try {
        let m = new URL(window.location.href),
          _ = u.startsWith("//") ? new URL(m.protocol + u) : new URL(u),
          k = gc(_.pathname, v);
        _.origin === m.origin && k != null
          ? (u = k + _.search + _.hash)
          : (y = !0);
      } catch {}
    let E = Xw(u, { relative: i }),
      h = x_(u, {
        replace: s,
        state: a,
        target: l,
        preventScrollReset: c,
        relative: i,
        unstable_viewTransition: d,
      });
    function p(m) {
      r && r(m), m.defaultPrevented || h(m);
    }
    return C.createElement(
      "a",
      Xl({}, f, { href: g || E, onClick: y || o ? r : p, ref: n, target: l })
    );
  });
var mf;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(mf || (mf = {}));
var gf;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(gf || (gf = {}));
function x_(e, t) {
  let {
      target: n,
      replace: r,
      state: i,
      preventScrollReset: o,
      relative: s,
      unstable_viewTransition: a,
    } = t === void 0 ? {} : t,
    l = Gs(),
    u = zi(),
    c = Wm(e, { relative: s });
  return C.useCallback(
    (d) => {
      if (w_(d, n)) {
        d.preventDefault();
        let f = r !== void 0 ? r : cs(u) === cs(c);
        l(e, {
          replace: f,
          state: i,
          preventScrollReset: o,
          relative: s,
          unstable_viewTransition: a,
        });
      }
    },
    [u, l, c, r, i, n, e, o, s, a]
  );
}
var yf = {};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const qm = function (e) {
    const t = [];
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      let i = e.charCodeAt(r);
      i < 128
        ? (t[n++] = i)
        : i < 2048
        ? ((t[n++] = (i >> 6) | 192), (t[n++] = (i & 63) | 128))
        : (i & 64512) === 55296 &&
          r + 1 < e.length &&
          (e.charCodeAt(r + 1) & 64512) === 56320
        ? ((i = 65536 + ((i & 1023) << 10) + (e.charCodeAt(++r) & 1023)),
          (t[n++] = (i >> 18) | 240),
          (t[n++] = ((i >> 12) & 63) | 128),
          (t[n++] = ((i >> 6) & 63) | 128),
          (t[n++] = (i & 63) | 128))
        : ((t[n++] = (i >> 12) | 224),
          (t[n++] = ((i >> 6) & 63) | 128),
          (t[n++] = (i & 63) | 128));
    }
    return t;
  },
  I_ = function (e) {
    const t = [];
    let n = 0,
      r = 0;
    for (; n < e.length; ) {
      const i = e[n++];
      if (i < 128) t[r++] = String.fromCharCode(i);
      else if (i > 191 && i < 224) {
        const o = e[n++];
        t[r++] = String.fromCharCode(((i & 31) << 6) | (o & 63));
      } else if (i > 239 && i < 365) {
        const o = e[n++],
          s = e[n++],
          a = e[n++],
          l =
            (((i & 7) << 18) | ((o & 63) << 12) | ((s & 63) << 6) | (a & 63)) -
            65536;
        (t[r++] = String.fromCharCode(55296 + (l >> 10))),
          (t[r++] = String.fromCharCode(56320 + (l & 1023)));
      } else {
        const o = e[n++],
          s = e[n++];
        t[r++] = String.fromCharCode(
          ((i & 15) << 12) | ((o & 63) << 6) | (s & 63)
        );
      }
    }
    return t.join("");
  },
  Jm = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    HAS_NATIVE_SUPPORT: typeof atob == "function",
    encodeByteArray(e, t) {
      if (!Array.isArray(e))
        throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        r = [];
      for (let i = 0; i < e.length; i += 3) {
        const o = e[i],
          s = i + 1 < e.length,
          a = s ? e[i + 1] : 0,
          l = i + 2 < e.length,
          u = l ? e[i + 2] : 0,
          c = o >> 2,
          d = ((o & 3) << 4) | (a >> 4);
        let f = ((a & 15) << 2) | (u >> 6),
          v = u & 63;
        l || ((v = 64), s || (f = 64)), r.push(n[c], n[d], n[f], n[v]);
      }
      return r.join("");
    },
    encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? btoa(e)
        : this.encodeByteArray(qm(e), t);
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? atob(e)
        : I_(this.decodeStringToByteArray(e, t));
    },
    decodeStringToByteArray(e, t) {
      this.init_();
      const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        r = [];
      for (let i = 0; i < e.length; ) {
        const o = n[e.charAt(i++)],
          a = i < e.length ? n[e.charAt(i)] : 0;
        ++i;
        const u = i < e.length ? n[e.charAt(i)] : 64;
        ++i;
        const d = i < e.length ? n[e.charAt(i)] : 64;
        if ((++i, o == null || a == null || u == null || d == null))
          throw new R_();
        const f = (o << 2) | (a >> 4);
        if ((r.push(f), u !== 64)) {
          const v = ((a << 4) & 240) | (u >> 2);
          if ((r.push(v), d !== 64)) {
            const g = ((u << 6) & 192) | d;
            r.push(g);
          }
        }
      }
      return r;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let e = 0; e < this.ENCODED_VALS.length; e++)
          (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
            (this.byteToCharMapWebSafe_[e] =
              this.ENCODED_VALS_WEBSAFE.charAt(e)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
            e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
      }
    },
  };
class R_ extends Error {
  constructor() {
    super(...arguments), (this.name = "DecodeBase64StringError");
  }
}
const P_ = function (e) {
    const t = qm(e);
    return Jm.encodeByteArray(t, !0);
  },
  hs = function (e) {
    return P_(e).replace(/\./g, "");
  },
  Qm = function (e) {
    try {
      return Jm.decodeString(e, !0);
    } catch (t) {
      console.error("base64Decode failed: ", t);
    }
    return null;
  };
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function N_() {
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
  throw new Error("Unable to locate global object.");
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const O_ = () => N_().__FIREBASE_DEFAULTS__,
  b_ = () => {
    if (typeof process > "u" || typeof yf > "u") return;
    const e = yf.__FIREBASE_DEFAULTS__;
    if (e) return JSON.parse(e);
  },
  A_ = () => {
    if (typeof document > "u") return;
    let e;
    try {
      e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch {
      return;
    }
    const t = e && Qm(e[1]);
    return t && JSON.parse(t);
  },
  _c = () => {
    try {
      return O_() || b_() || A_();
    } catch (e) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
      return;
    }
  },
  Xm = (e) => {
    var t, n;
    return (n =
      (t = _c()) === null || t === void 0 ? void 0 : t.emulatorHosts) ===
      null || n === void 0
      ? void 0
      : n[e];
  },
  L_ = (e) => {
    const t = Xm(e);
    if (!t) return;
    const n = t.lastIndexOf(":");
    if (n <= 0 || n + 1 === t.length)
      throw new Error(`Invalid host ${t} with no separate hostname and port!`);
    const r = parseInt(t.substring(n + 1), 10);
    return t[0] === "[" ? [t.substring(1, n - 1), r] : [t.substring(0, n), r];
  },
  Ym = () => {
    var e;
    return (e = _c()) === null || e === void 0 ? void 0 : e.config;
  },
  Zm = (e) => {
    var t;
    return (t = _c()) === null || t === void 0 ? void 0 : t[`_${e}`];
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class D_ {
  constructor() {
    (this.reject = () => {}),
      (this.resolve = () => {}),
      (this.promise = new Promise((t, n) => {
        (this.resolve = t), (this.reject = n);
      }));
  }
  wrapCallback(t) {
    return (n, r) => {
      n ? this.reject(n) : this.resolve(r),
        typeof t == "function" &&
          (this.promise.catch(() => {}), t.length === 1 ? t(n) : t(n, r));
    };
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function U_(e, t) {
  if (e.uid)
    throw new Error(
      'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
    );
  const n = { alg: "none", type: "JWT" },
    r = t || "demo-project",
    i = e.iat || 0,
    o = e.sub || e.user_id;
  if (!o)
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  const s = Object.assign(
    {
      iss: `https://securetoken.google.com/${r}`,
      aud: r,
      iat: i,
      exp: i + 3600,
      auth_time: i,
      sub: o,
      user_id: o,
      firebase: { sign_in_provider: "custom", identities: {} },
    },
    e
  );
  return [hs(JSON.stringify(n)), hs(JSON.stringify(s)), ""].join(".");
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function me() {
  return typeof navigator < "u" && typeof navigator.userAgent == "string"
    ? navigator.userAgent
    : "";
}
function M_() {
  return (
    typeof window < "u" &&
    !!(window.cordova || window.phonegap || window.PhoneGap) &&
    /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(me())
  );
}
function j_() {
  const e =
    typeof chrome == "object"
      ? chrome.runtime
      : typeof browser == "object"
      ? browser.runtime
      : void 0;
  return typeof e == "object" && e.id !== void 0;
}
function F_() {
  return typeof navigator == "object" && navigator.product === "ReactNative";
}
function B_() {
  const e = me();
  return e.indexOf("MSIE ") >= 0 || e.indexOf("Trident/") >= 0;
}
function z_() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function $_() {
  return new Promise((e, t) => {
    try {
      let n = !0;
      const r = "validate-browser-context-for-indexeddb-analytics-module",
        i = self.indexedDB.open(r);
      (i.onsuccess = () => {
        i.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0);
      }),
        (i.onupgradeneeded = () => {
          n = !1;
        }),
        (i.onerror = () => {
          var o;
          t(
            ((o = i.error) === null || o === void 0 ? void 0 : o.message) || ""
          );
        });
    } catch (n) {
      t(n);
    }
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const H_ = "FirebaseError";
class Nt extends Error {
  constructor(t, n, r) {
    super(n),
      (this.code = t),
      (this.customData = r),
      (this.name = H_),
      Object.setPrototypeOf(this, Nt.prototype),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, $i.prototype.create);
  }
}
class $i {
  constructor(t, n, r) {
    (this.service = t), (this.serviceName = n), (this.errors = r);
  }
  create(t, ...n) {
    const r = n[0] || {},
      i = `${this.service}/${t}`,
      o = this.errors[t],
      s = o ? V_(o, r) : "Error",
      a = `${this.serviceName}: ${s} (${i}).`;
    return new Nt(i, a, r);
  }
}
function V_(e, t) {
  return e.replace(W_, (n, r) => {
    const i = t[r];
    return i != null ? String(i) : `<${r}?>`;
  });
}
const W_ = /\{\$([^}]+)}/g;
function K_(e) {
  for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
  return !0;
}
function ps(e, t) {
  if (e === t) return !0;
  const n = Object.keys(e),
    r = Object.keys(t);
  for (const i of n) {
    if (!r.includes(i)) return !1;
    const o = e[i],
      s = t[i];
    if (vf(o) && vf(s)) {
      if (!ps(o, s)) return !1;
    } else if (o !== s) return !1;
  }
  for (const i of r) if (!n.includes(i)) return !1;
  return !0;
}
function vf(e) {
  return e !== null && typeof e == "object";
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Hi(e) {
  const t = [];
  for (const [n, r] of Object.entries(e))
    Array.isArray(r)
      ? r.forEach((i) => {
          t.push(encodeURIComponent(n) + "=" + encodeURIComponent(i));
        })
      : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(r));
  return t.length ? "&" + t.join("&") : "";
}
function Xr(e) {
  const t = {};
  return (
    e
      .replace(/^\?/, "")
      .split("&")
      .forEach((r) => {
        if (r) {
          const [i, o] = r.split("=");
          t[decodeURIComponent(i)] = decodeURIComponent(o);
        }
      }),
    t
  );
}
function Yr(e) {
  const t = e.indexOf("?");
  if (!t) return "";
  const n = e.indexOf("#", t);
  return e.substring(t, n > 0 ? n : void 0);
}
function G_(e, t) {
  const n = new q_(e, t);
  return n.subscribe.bind(n);
}
class q_ {
  constructor(t, n) {
    (this.observers = []),
      (this.unsubscribes = []),
      (this.observerCount = 0),
      (this.task = Promise.resolve()),
      (this.finalized = !1),
      (this.onNoObservers = n),
      this.task
        .then(() => {
          t(this);
        })
        .catch((r) => {
          this.error(r);
        });
  }
  next(t) {
    this.forEachObserver((n) => {
      n.next(t);
    });
  }
  error(t) {
    this.forEachObserver((n) => {
      n.error(t);
    }),
      this.close(t);
  }
  complete() {
    this.forEachObserver((t) => {
      t.complete();
    }),
      this.close();
  }
  subscribe(t, n, r) {
    let i;
    if (t === void 0 && n === void 0 && r === void 0)
      throw new Error("Missing Observer.");
    J_(t, ["next", "error", "complete"])
      ? (i = t)
      : (i = { next: t, error: n, complete: r }),
      i.next === void 0 && (i.next = Fa),
      i.error === void 0 && (i.error = Fa),
      i.complete === void 0 && (i.complete = Fa);
    const o = this.unsubscribeOne.bind(this, this.observers.length);
    return (
      this.finalized &&
        this.task.then(() => {
          try {
            this.finalError ? i.error(this.finalError) : i.complete();
          } catch {}
        }),
      this.observers.push(i),
      o
    );
  }
  unsubscribeOne(t) {
    this.observers === void 0 ||
      this.observers[t] === void 0 ||
      (delete this.observers[t],
      (this.observerCount -= 1),
      this.observerCount === 0 &&
        this.onNoObservers !== void 0 &&
        this.onNoObservers(this));
  }
  forEachObserver(t) {
    if (!this.finalized)
      for (let n = 0; n < this.observers.length; n++) this.sendOne(n, t);
  }
  sendOne(t, n) {
    this.task.then(() => {
      if (this.observers !== void 0 && this.observers[t] !== void 0)
        try {
          n(this.observers[t]);
        } catch (r) {
          typeof console < "u" && console.error && console.error(r);
        }
    });
  }
  close(t) {
    this.finalized ||
      ((this.finalized = !0),
      t !== void 0 && (this.finalError = t),
      this.task.then(() => {
        (this.observers = void 0), (this.onNoObservers = void 0);
      }));
  }
}
function J_(e, t) {
  if (typeof e != "object" || e === null) return !1;
  for (const n of t) if (n in e && typeof e[n] == "function") return !0;
  return !1;
}
function Fa() {}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Fe(e) {
  return e && e._delegate ? e._delegate : e;
}
class Ln {
  constructor(t, n, r) {
    (this.name = t),
      (this.instanceFactory = n),
      (this.type = r),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = "LAZY"),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(t) {
    return (this.instantiationMode = t), this;
  }
  setMultipleInstances(t) {
    return (this.multipleInstances = t), this;
  }
  setServiceProps(t) {
    return (this.serviceProps = t), this;
  }
  setInstanceCreatedCallback(t) {
    return (this.onInstanceCreated = t), this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const wn = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let Q_ = class {
  constructor(t, n) {
    (this.name = t),
      (this.container = n),
      (this.component = null),
      (this.instances = new Map()),
      (this.instancesDeferred = new Map()),
      (this.instancesOptions = new Map()),
      (this.onInitCallbacks = new Map());
  }
  get(t) {
    const n = this.normalizeInstanceIdentifier(t);
    if (!this.instancesDeferred.has(n)) {
      const r = new D_();
      if (
        (this.instancesDeferred.set(n, r),
        this.isInitialized(n) || this.shouldAutoInitialize())
      )
        try {
          const i = this.getOrInitializeService({ instanceIdentifier: n });
          i && r.resolve(i);
        } catch {}
    }
    return this.instancesDeferred.get(n).promise;
  }
  getImmediate(t) {
    var n;
    const r = this.normalizeInstanceIdentifier(
        t == null ? void 0 : t.identifier
      ),
      i =
        (n = t == null ? void 0 : t.optional) !== null && n !== void 0 ? n : !1;
    if (this.isInitialized(r) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({ instanceIdentifier: r });
      } catch (o) {
        if (i) return null;
        throw o;
      }
    else {
      if (i) return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(t) {
    if (t.name !== this.name)
      throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (((this.component = t), !!this.shouldAutoInitialize())) {
      if (Y_(t))
        try {
          this.getOrInitializeService({ instanceIdentifier: wn });
        } catch {}
      for (const [n, r] of this.instancesDeferred.entries()) {
        const i = this.normalizeInstanceIdentifier(n);
        try {
          const o = this.getOrInitializeService({ instanceIdentifier: i });
          r.resolve(o);
        } catch {}
      }
    }
  }
  clearInstance(t = wn) {
    this.instancesDeferred.delete(t),
      this.instancesOptions.delete(t),
      this.instances.delete(t);
  }
  async delete() {
    const t = Array.from(this.instances.values());
    await Promise.all([
      ...t.filter((n) => "INTERNAL" in n).map((n) => n.INTERNAL.delete()),
      ...t.filter((n) => "_delete" in n).map((n) => n._delete()),
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(t = wn) {
    return this.instances.has(t);
  }
  getOptions(t = wn) {
    return this.instancesOptions.get(t) || {};
  }
  initialize(t = {}) {
    const { options: n = {} } = t,
      r = this.normalizeInstanceIdentifier(t.instanceIdentifier);
    if (this.isInitialized(r))
      throw Error(`${this.name}(${r}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const i = this.getOrInitializeService({
      instanceIdentifier: r,
      options: n,
    });
    for (const [o, s] of this.instancesDeferred.entries()) {
      const a = this.normalizeInstanceIdentifier(o);
      r === a && s.resolve(i);
    }
    return i;
  }
  onInit(t, n) {
    var r;
    const i = this.normalizeInstanceIdentifier(n),
      o =
        (r = this.onInitCallbacks.get(i)) !== null && r !== void 0
          ? r
          : new Set();
    o.add(t), this.onInitCallbacks.set(i, o);
    const s = this.instances.get(i);
    return (
      s && t(s, i),
      () => {
        o.delete(t);
      }
    );
  }
  invokeOnInitCallbacks(t, n) {
    const r = this.onInitCallbacks.get(n);
    if (r)
      for (const i of r)
        try {
          i(t, n);
        } catch {}
  }
  getOrInitializeService({ instanceIdentifier: t, options: n = {} }) {
    let r = this.instances.get(t);
    if (
      !r &&
      this.component &&
      ((r = this.component.instanceFactory(this.container, {
        instanceIdentifier: X_(t),
        options: n,
      })),
      this.instances.set(t, r),
      this.instancesOptions.set(t, n),
      this.invokeOnInitCallbacks(r, t),
      this.component.onInstanceCreated)
    )
      try {
        this.component.onInstanceCreated(this.container, t, r);
      } catch {}
    return r || null;
  }
  normalizeInstanceIdentifier(t = wn) {
    return this.component ? (this.component.multipleInstances ? t : wn) : t;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
};
function X_(e) {
  return e === wn ? void 0 : e;
}
function Y_(e) {
  return e.instantiationMode === "EAGER";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Z_ {
  constructor(t) {
    (this.name = t), (this.providers = new Map());
  }
  addComponent(t) {
    const n = this.getProvider(t.name);
    if (n.isComponentSet())
      throw new Error(
        `Component ${t.name} has already been registered with ${this.name}`
      );
    n.setComponent(t);
  }
  addOrOverwriteComponent(t) {
    this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name),
      this.addComponent(t);
  }
  getProvider(t) {
    if (this.providers.has(t)) return this.providers.get(t);
    const n = new Q_(t, this);
    return this.providers.set(t, n), n;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var B;
(function (e) {
  (e[(e.DEBUG = 0)] = "DEBUG"),
    (e[(e.VERBOSE = 1)] = "VERBOSE"),
    (e[(e.INFO = 2)] = "INFO"),
    (e[(e.WARN = 3)] = "WARN"),
    (e[(e.ERROR = 4)] = "ERROR"),
    (e[(e.SILENT = 5)] = "SILENT");
})(B || (B = {}));
const eE = {
    debug: B.DEBUG,
    verbose: B.VERBOSE,
    info: B.INFO,
    warn: B.WARN,
    error: B.ERROR,
    silent: B.SILENT,
  },
  tE = B.INFO,
  nE = {
    [B.DEBUG]: "log",
    [B.VERBOSE]: "log",
    [B.INFO]: "info",
    [B.WARN]: "warn",
    [B.ERROR]: "error",
  },
  rE = (e, t, ...n) => {
    if (t < e.logLevel) return;
    const r = new Date().toISOString(),
      i = nE[t];
    if (i) console[i](`[${r}]  ${e.name}:`, ...n);
    else
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${t})`
      );
  };
class eg {
  constructor(t) {
    (this.name = t),
      (this._logLevel = tE),
      (this._logHandler = rE),
      (this._userLogHandler = null);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(t) {
    if (!(t in B))
      throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);
    this._logLevel = t;
  }
  setLogLevel(t) {
    this._logLevel = typeof t == "string" ? eE[t] : t;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(t) {
    if (typeof t != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = t;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(t) {
    this._userLogHandler = t;
  }
  debug(...t) {
    this._userLogHandler && this._userLogHandler(this, B.DEBUG, ...t),
      this._logHandler(this, B.DEBUG, ...t);
  }
  log(...t) {
    this._userLogHandler && this._userLogHandler(this, B.VERBOSE, ...t),
      this._logHandler(this, B.VERBOSE, ...t);
  }
  info(...t) {
    this._userLogHandler && this._userLogHandler(this, B.INFO, ...t),
      this._logHandler(this, B.INFO, ...t);
  }
  warn(...t) {
    this._userLogHandler && this._userLogHandler(this, B.WARN, ...t),
      this._logHandler(this, B.WARN, ...t);
  }
  error(...t) {
    this._userLogHandler && this._userLogHandler(this, B.ERROR, ...t),
      this._logHandler(this, B.ERROR, ...t);
  }
}
const iE = (e, t) => t.some((n) => e instanceof n);
let wf, _f;
function oE() {
  return (
    wf ||
    (wf = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function sE() {
  return (
    _f ||
    (_f = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const tg = new WeakMap(),
  Yl = new WeakMap(),
  ng = new WeakMap(),
  Ba = new WeakMap(),
  Ec = new WeakMap();
function aE(e) {
  const t = new Promise((n, r) => {
    const i = () => {
        e.removeEventListener("success", o), e.removeEventListener("error", s);
      },
      o = () => {
        n(tn(e.result)), i();
      },
      s = () => {
        r(e.error), i();
      };
    e.addEventListener("success", o), e.addEventListener("error", s);
  });
  return (
    t
      .then((n) => {
        n instanceof IDBCursor && tg.set(n, e);
      })
      .catch(() => {}),
    Ec.set(t, e),
    t
  );
}
function lE(e) {
  if (Yl.has(e)) return;
  const t = new Promise((n, r) => {
    const i = () => {
        e.removeEventListener("complete", o),
          e.removeEventListener("error", s),
          e.removeEventListener("abort", s);
      },
      o = () => {
        n(), i();
      },
      s = () => {
        r(e.error || new DOMException("AbortError", "AbortError")), i();
      };
    e.addEventListener("complete", o),
      e.addEventListener("error", s),
      e.addEventListener("abort", s);
  });
  Yl.set(e, t);
}
let Zl = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === "done") return Yl.get(e);
      if (t === "objectStoreNames") return e.objectStoreNames || ng.get(e);
      if (t === "store")
        return n.objectStoreNames[1]
          ? void 0
          : n.objectStore(n.objectStoreNames[0]);
    }
    return tn(e[t]);
  },
  set(e, t, n) {
    return (e[t] = n), !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store")
      ? !0
      : t in e;
  },
};
function uE(e) {
  Zl = e(Zl);
}
function cE(e) {
  return e === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (t, ...n) {
        const r = e.call(za(this), t, ...n);
        return ng.set(r, t.sort ? t.sort() : [t]), tn(r);
      }
    : sE().includes(e)
    ? function (...t) {
        return e.apply(za(this), t), tn(tg.get(this));
      }
    : function (...t) {
        return tn(e.apply(za(this), t));
      };
}
function dE(e) {
  return typeof e == "function"
    ? cE(e)
    : (e instanceof IDBTransaction && lE(e),
      iE(e, oE()) ? new Proxy(e, Zl) : e);
}
function tn(e) {
  if (e instanceof IDBRequest) return aE(e);
  if (Ba.has(e)) return Ba.get(e);
  const t = dE(e);
  return t !== e && (Ba.set(e, t), Ec.set(t, e)), t;
}
const za = (e) => Ec.get(e);
function fE(e, t, { blocked: n, upgrade: r, blocking: i, terminated: o } = {}) {
  const s = indexedDB.open(e, t),
    a = tn(s);
  return (
    r &&
      s.addEventListener("upgradeneeded", (l) => {
        r(tn(s.result), l.oldVersion, l.newVersion, tn(s.transaction), l);
      }),
    n && s.addEventListener("blocked", (l) => n(l.oldVersion, l.newVersion, l)),
    a
      .then((l) => {
        o && l.addEventListener("close", () => o()),
          i &&
            l.addEventListener("versionchange", (u) =>
              i(u.oldVersion, u.newVersion, u)
            );
      })
      .catch(() => {}),
    a
  );
}
const hE = ["get", "getKey", "getAll", "getAllKeys", "count"],
  pE = ["put", "add", "delete", "clear"],
  $a = new Map();
function Ef(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
  if ($a.get(t)) return $a.get(t);
  const n = t.replace(/FromIndex$/, ""),
    r = t !== n,
    i = pE.includes(n);
  if (
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) ||
    !(i || hE.includes(n))
  )
    return;
  const o = async function (s, ...a) {
    const l = this.transaction(s, i ? "readwrite" : "readonly");
    let u = l.store;
    return (
      r && (u = u.index(a.shift())),
      (await Promise.all([u[n](...a), i && l.done]))[0]
    );
  };
  return $a.set(t, o), o;
}
uE((e) => ({
  ...e,
  get: (t, n, r) => Ef(t, n) || e.get(t, n, r),
  has: (t, n) => !!Ef(t, n) || e.has(t, n),
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class mE {
  constructor(t) {
    this.container = t;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((n) => {
        if (gE(n)) {
          const r = n.getImmediate();
          return `${r.library}/${r.version}`;
        } else return null;
      })
      .filter((n) => n)
      .join(" ");
  }
}
function gE(e) {
  const t = e.getComponent();
  return (t == null ? void 0 : t.type) === "VERSION";
}
const eu = "@firebase/app",
  Sf = "0.10.6";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Dn = new eg("@firebase/app"),
  yE = "@firebase/app-compat",
  vE = "@firebase/analytics-compat",
  wE = "@firebase/analytics",
  _E = "@firebase/app-check-compat",
  EE = "@firebase/app-check",
  SE = "@firebase/auth",
  kE = "@firebase/auth-compat",
  CE = "@firebase/database",
  TE = "@firebase/database-compat",
  xE = "@firebase/functions",
  IE = "@firebase/functions-compat",
  RE = "@firebase/installations",
  PE = "@firebase/installations-compat",
  NE = "@firebase/messaging",
  OE = "@firebase/messaging-compat",
  bE = "@firebase/performance",
  AE = "@firebase/performance-compat",
  LE = "@firebase/remote-config",
  DE = "@firebase/remote-config-compat",
  UE = "@firebase/storage",
  ME = "@firebase/storage-compat",
  jE = "@firebase/firestore",
  FE = "@firebase/vertexai-preview",
  BE = "@firebase/firestore-compat",
  zE = "firebase",
  $E = "10.12.3";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const tu = "[DEFAULT]",
  HE = {
    [eu]: "fire-core",
    [yE]: "fire-core-compat",
    [wE]: "fire-analytics",
    [vE]: "fire-analytics-compat",
    [EE]: "fire-app-check",
    [_E]: "fire-app-check-compat",
    [SE]: "fire-auth",
    [kE]: "fire-auth-compat",
    [CE]: "fire-rtdb",
    [TE]: "fire-rtdb-compat",
    [xE]: "fire-fn",
    [IE]: "fire-fn-compat",
    [RE]: "fire-iid",
    [PE]: "fire-iid-compat",
    [NE]: "fire-fcm",
    [OE]: "fire-fcm-compat",
    [bE]: "fire-perf",
    [AE]: "fire-perf-compat",
    [LE]: "fire-rc",
    [DE]: "fire-rc-compat",
    [UE]: "fire-gcs",
    [ME]: "fire-gcs-compat",
    [jE]: "fire-fst",
    [BE]: "fire-fst-compat",
    [FE]: "fire-vertex",
    "fire-js": "fire-js",
    [zE]: "fire-js-all",
  };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ms = new Map(),
  VE = new Map(),
  nu = new Map();
function kf(e, t) {
  try {
    e.container.addComponent(t);
  } catch (n) {
    Dn.debug(
      `Component ${t.name} failed to register with FirebaseApp ${e.name}`,
      n
    );
  }
}
function _r(e) {
  const t = e.name;
  if (nu.has(t))
    return (
      Dn.debug(`There were multiple attempts to register component ${t}.`), !1
    );
  nu.set(t, e);
  for (const n of ms.values()) kf(n, e);
  for (const n of VE.values()) kf(n, e);
  return !0;
}
function Sc(e, t) {
  const n = e.container.getProvider("heartbeat").getImmediate({ optional: !0 });
  return n && n.triggerHeartbeat(), e.container.getProvider(t);
}
function lt(e) {
  return e.settings !== void 0;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const WE = {
    "no-app":
      "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}'",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "server-app-deleted": "Firebase Server App has been deleted",
    "no-options":
      "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "idb-open":
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get":
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set":
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete":
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    "finalization-registry-not-supported":
      "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
    "invalid-server-app-environment":
      "FirebaseServerApp is not for use in browser environments.",
  },
  nn = new $i("app", "Firebase", WE);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class KE {
  constructor(t, n, r) {
    (this._isDeleted = !1),
      (this._options = Object.assign({}, t)),
      (this._config = Object.assign({}, n)),
      (this._name = n.name),
      (this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled),
      (this._container = r),
      this.container.addComponent(new Ln("app", () => this, "PUBLIC"));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(t) {
    this.checkDestroyed(), (this._automaticDataCollectionEnabled = t);
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(t) {
    this._isDeleted = t;
  }
  checkDestroyed() {
    if (this.isDeleted) throw nn.create("app-deleted", { appName: this._name });
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Or = $E;
function rg(e, t = {}) {
  let n = e;
  typeof t != "object" && (t = { name: t });
  const r = Object.assign({ name: tu, automaticDataCollectionEnabled: !1 }, t),
    i = r.name;
  if (typeof i != "string" || !i)
    throw nn.create("bad-app-name", { appName: String(i) });
  if ((n || (n = Ym()), !n)) throw nn.create("no-options");
  const o = ms.get(i);
  if (o) {
    if (ps(n, o.options) && ps(r, o.config)) return o;
    throw nn.create("duplicate-app", { appName: i });
  }
  const s = new Z_(i);
  for (const l of nu.values()) s.addComponent(l);
  const a = new KE(n, r, s);
  return ms.set(i, a), a;
}
function ig(e = tu) {
  const t = ms.get(e);
  if (!t && e === tu && Ym()) return rg();
  if (!t) throw nn.create("no-app", { appName: e });
  return t;
}
function rn(e, t, n) {
  var r;
  let i = (r = HE[e]) !== null && r !== void 0 ? r : e;
  n && (i += `-${n}`);
  const o = i.match(/\s|\//),
    s = t.match(/\s|\//);
  if (o || s) {
    const a = [`Unable to register library "${i}" with version "${t}":`];
    o &&
      a.push(
        `library name "${i}" contains illegal characters (whitespace or "/")`
      ),
      o && s && a.push("and"),
      s &&
        a.push(
          `version name "${t}" contains illegal characters (whitespace or "/")`
        ),
      Dn.warn(a.join(" "));
    return;
  }
  _r(new Ln(`${i}-version`, () => ({ library: i, version: t }), "VERSION"));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const GE = "firebase-heartbeat-database",
  qE = 1,
  Ni = "firebase-heartbeat-store";
let Ha = null;
function og() {
  return (
    Ha ||
      (Ha = fE(GE, qE, {
        upgrade: (e, t) => {
          switch (t) {
            case 0:
              try {
                e.createObjectStore(Ni);
              } catch (n) {
                console.warn(n);
              }
          }
        },
      }).catch((e) => {
        throw nn.create("idb-open", { originalErrorMessage: e.message });
      })),
    Ha
  );
}
async function JE(e) {
  try {
    const n = (await og()).transaction(Ni),
      r = await n.objectStore(Ni).get(sg(e));
    return await n.done, r;
  } catch (t) {
    if (t instanceof Nt) Dn.warn(t.message);
    else {
      const n = nn.create("idb-get", {
        originalErrorMessage: t == null ? void 0 : t.message,
      });
      Dn.warn(n.message);
    }
  }
}
async function Cf(e, t) {
  try {
    const r = (await og()).transaction(Ni, "readwrite");
    await r.objectStore(Ni).put(t, sg(e)), await r.done;
  } catch (n) {
    if (n instanceof Nt) Dn.warn(n.message);
    else {
      const r = nn.create("idb-set", {
        originalErrorMessage: n == null ? void 0 : n.message,
      });
      Dn.warn(r.message);
    }
  }
}
function sg(e) {
  return `${e.name}!${e.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const QE = 1024,
  XE = 30 * 24 * 60 * 60 * 1e3;
class YE {
  constructor(t) {
    (this.container = t), (this._heartbeatsCache = null);
    const n = this.container.getProvider("app").getImmediate();
    (this._storage = new eS(n)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((r) => ((this._heartbeatsCache = r), r)));
  }
  async triggerHeartbeat() {
    var t, n;
    const i = this.container
        .getProvider("platform-logger")
        .getImmediate()
        .getPlatformInfoString(),
      o = Tf();
    if (
      !(
        ((t = this._heartbeatsCache) === null || t === void 0
          ? void 0
          : t.heartbeats) == null &&
        ((this._heartbeatsCache = await this._heartbeatsCachePromise),
        ((n = this._heartbeatsCache) === null || n === void 0
          ? void 0
          : n.heartbeats) == null)
      ) &&
      !(
        this._heartbeatsCache.lastSentHeartbeatDate === o ||
        this._heartbeatsCache.heartbeats.some((s) => s.date === o)
      )
    )
      return (
        this._heartbeatsCache.heartbeats.push({ date: o, agent: i }),
        (this._heartbeatsCache.heartbeats =
          this._heartbeatsCache.heartbeats.filter((s) => {
            const a = new Date(s.date).valueOf();
            return Date.now() - a <= XE;
          })),
        this._storage.overwrite(this._heartbeatsCache)
      );
  }
  async getHeartbeatsHeader() {
    var t;
    if (
      (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
      ((t = this._heartbeatsCache) === null || t === void 0
        ? void 0
        : t.heartbeats) == null ||
        this._heartbeatsCache.heartbeats.length === 0)
    )
      return "";
    const n = Tf(),
      { heartbeatsToSend: r, unsentEntries: i } = ZE(
        this._heartbeatsCache.heartbeats
      ),
      o = hs(JSON.stringify({ version: 2, heartbeats: r }));
    return (
      (this._heartbeatsCache.lastSentHeartbeatDate = n),
      i.length > 0
        ? ((this._heartbeatsCache.heartbeats = i),
          await this._storage.overwrite(this._heartbeatsCache))
        : ((this._heartbeatsCache.heartbeats = []),
          this._storage.overwrite(this._heartbeatsCache)),
      o
    );
  }
}
function Tf() {
  return new Date().toISOString().substring(0, 10);
}
function ZE(e, t = QE) {
  const n = [];
  let r = e.slice();
  for (const i of e) {
    const o = n.find((s) => s.agent === i.agent);
    if (o) {
      if ((o.dates.push(i.date), xf(n) > t)) {
        o.dates.pop();
        break;
      }
    } else if ((n.push({ agent: i.agent, dates: [i.date] }), xf(n) > t)) {
      n.pop();
      break;
    }
    r = r.slice(1);
  }
  return { heartbeatsToSend: n, unsentEntries: r };
}
class eS {
  constructor(t) {
    (this.app = t),
      (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
  }
  async runIndexedDBEnvironmentCheck() {
    return z_()
      ? $_()
          .then(() => !0)
          .catch(() => !1)
      : !1;
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const n = await JE(this.app);
      return n != null && n.heartbeats ? n : { heartbeats: [] };
    } else return { heartbeats: [] };
  }
  async overwrite(t) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const i = await this.read();
      return Cf(this.app, {
        lastSentHeartbeatDate:
          (n = t.lastSentHeartbeatDate) !== null && n !== void 0
            ? n
            : i.lastSentHeartbeatDate,
        heartbeats: t.heartbeats,
      });
    } else return;
  }
  async add(t) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const i = await this.read();
      return Cf(this.app, {
        lastSentHeartbeatDate:
          (n = t.lastSentHeartbeatDate) !== null && n !== void 0
            ? n
            : i.lastSentHeartbeatDate,
        heartbeats: [...i.heartbeats, ...t.heartbeats],
      });
    } else return;
  }
}
function xf(e) {
  return hs(JSON.stringify({ version: 2, heartbeats: e })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function tS(e) {
  _r(new Ln("platform-logger", (t) => new mE(t), "PRIVATE")),
    _r(new Ln("heartbeat", (t) => new YE(t), "PRIVATE")),
    rn(eu, Sf, e),
    rn(eu, Sf, "esm2017"),
    rn("fire-js", "");
}
tS("");
function kc(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
}
function ag() {
  return {
    "dependent-sdk-initialized-before-auth":
      "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
  };
}
const nS = ag,
  lg = new $i("auth", "Firebase", ag());
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const gs = new eg("@firebase/auth");
function rS(e, ...t) {
  gs.logLevel <= B.WARN && gs.warn(`Auth (${Or}): ${e}`, ...t);
}
function Lo(e, ...t) {
  gs.logLevel <= B.ERROR && gs.error(`Auth (${Or}): ${e}`, ...t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ge(e, ...t) {
  throw Tc(e, ...t);
}
function tt(e, ...t) {
  return Tc(e, ...t);
}
function Cc(e, t, n) {
  const r = Object.assign(Object.assign({}, nS()), { [t]: n });
  return new $i("auth", "Firebase", r).create(t, { appName: e.name });
}
function on(e) {
  return Cc(
    e,
    "operation-not-supported-in-this-environment",
    "Operations that alter the current user are not supported in conjunction with FirebaseServerApp"
  );
}
function iS(e, t, n) {
  const r = n;
  if (!(t instanceof r))
    throw (
      (r.name !== t.constructor.name && Ge(e, "argument-error"),
      Cc(
        e,
        "argument-error",
        `Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`
      ))
    );
}
function Tc(e, ...t) {
  if (typeof e != "string") {
    const n = t[0],
      r = [...t.slice(1)];
    return r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r);
  }
  return lg.create(e, ...t);
}
function O(e, t, ...n) {
  if (!e) throw Tc(t, ...n);
}
function vt(e) {
  const t = "INTERNAL ASSERTION FAILED: " + e;
  throw (Lo(t), new Error(t));
}
function xt(e, t) {
  e || vt(t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ru() {
  var e;
  return (
    (typeof self < "u" &&
      ((e = self.location) === null || e === void 0 ? void 0 : e.href)) ||
    ""
  );
}
function oS() {
  return If() === "http:" || If() === "https:";
}
function If() {
  var e;
  return (
    (typeof self < "u" &&
      ((e = self.location) === null || e === void 0 ? void 0 : e.protocol)) ||
    null
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function sS() {
  return typeof navigator < "u" &&
    navigator &&
    "onLine" in navigator &&
    typeof navigator.onLine == "boolean" &&
    (oS() || j_() || "connection" in navigator)
    ? navigator.onLine
    : !0;
}
function aS() {
  if (typeof navigator > "u") return null;
  const e = navigator;
  return (e.languages && e.languages[0]) || e.language || null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Vi {
  constructor(t, n) {
    (this.shortDelay = t),
      (this.longDelay = n),
      xt(n > t, "Short delay should be less than long delay!"),
      (this.isMobile = M_() || F_());
  }
  get() {
    return sS()
      ? this.isMobile
        ? this.longDelay
        : this.shortDelay
      : Math.min(5e3, this.shortDelay);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function xc(e, t) {
  xt(e.emulator, "Emulator should always be set here");
  const { url: n } = e.emulator;
  return t ? `${n}${t.startsWith("/") ? t.slice(1) : t}` : n;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ug {
  static initialize(t, n, r) {
    (this.fetchImpl = t),
      n && (this.headersImpl = n),
      r && (this.responseImpl = r);
  }
  static fetch() {
    if (this.fetchImpl) return this.fetchImpl;
    if (typeof self < "u" && "fetch" in self) return self.fetch;
    if (typeof globalThis < "u" && globalThis.fetch) return globalThis.fetch;
    if (typeof fetch < "u") return fetch;
    vt(
      "Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
    );
  }
  static headers() {
    if (this.headersImpl) return this.headersImpl;
    if (typeof self < "u" && "Headers" in self) return self.Headers;
    if (typeof globalThis < "u" && globalThis.Headers)
      return globalThis.Headers;
    if (typeof Headers < "u") return Headers;
    vt(
      "Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
    );
  }
  static response() {
    if (this.responseImpl) return this.responseImpl;
    if (typeof self < "u" && "Response" in self) return self.Response;
    if (typeof globalThis < "u" && globalThis.Response)
      return globalThis.Response;
    if (typeof Response < "u") return Response;
    vt(
      "Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const lS = {
  CREDENTIAL_MISMATCH: "custom-token-mismatch",
  MISSING_CUSTOM_TOKEN: "internal-error",
  INVALID_IDENTIFIER: "invalid-email",
  MISSING_CONTINUE_URI: "internal-error",
  INVALID_PASSWORD: "wrong-password",
  MISSING_PASSWORD: "missing-password",
  INVALID_LOGIN_CREDENTIALS: "invalid-credential",
  EMAIL_EXISTS: "email-already-in-use",
  PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
  INVALID_IDP_RESPONSE: "invalid-credential",
  INVALID_PENDING_TOKEN: "invalid-credential",
  FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
  MISSING_REQ_TYPE: "internal-error",
  EMAIL_NOT_FOUND: "user-not-found",
  RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
  EXPIRED_OOB_CODE: "expired-action-code",
  INVALID_OOB_CODE: "invalid-action-code",
  MISSING_OOB_CODE: "internal-error",
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
  INVALID_ID_TOKEN: "invalid-user-token",
  TOKEN_EXPIRED: "user-token-expired",
  USER_NOT_FOUND: "user-token-expired",
  TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
  PASSWORD_DOES_NOT_MEET_REQUIREMENTS: "password-does-not-meet-requirements",
  INVALID_CODE: "invalid-verification-code",
  INVALID_SESSION_INFO: "invalid-verification-id",
  INVALID_TEMPORARY_PROOF: "invalid-credential",
  MISSING_SESSION_INFO: "missing-verification-id",
  SESSION_EXPIRED: "code-expired",
  MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
  UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
  INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
  ADMIN_ONLY_OPERATION: "admin-restricted-operation",
  INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
  MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
  MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
  MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
  SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
  SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
  BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
  RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
  MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
  INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
  INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
  MISSING_CLIENT_TYPE: "missing-client-type",
  MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
  INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
  INVALID_REQ_TYPE: "invalid-req-type",
};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const uS = new Vi(3e4, 6e4);
function $n(e, t) {
  return e.tenantId && !t.tenantId
    ? Object.assign(Object.assign({}, t), { tenantId: e.tenantId })
    : t;
}
async function pn(e, t, n, r, i = {}) {
  return cg(e, i, async () => {
    let o = {},
      s = {};
    r && (t === "GET" ? (s = r) : (o = { body: JSON.stringify(r) }));
    const a = Hi(Object.assign({ key: e.config.apiKey }, s)).slice(1),
      l = await e._getAdditionalHeaders();
    return (
      (l["Content-Type"] = "application/json"),
      e.languageCode && (l["X-Firebase-Locale"] = e.languageCode),
      ug.fetch()(
        dg(e, e.config.apiHost, n, a),
        Object.assign(
          { method: t, headers: l, referrerPolicy: "no-referrer" },
          o
        )
      )
    );
  });
}
async function cg(e, t, n) {
  e._canInitEmulator = !1;
  const r = Object.assign(Object.assign({}, lS), t);
  try {
    const i = new dS(e),
      o = await Promise.race([n(), i.promise]);
    i.clearNetworkTimeout();
    const s = await o.json();
    if ("needConfirmation" in s)
      throw yo(e, "account-exists-with-different-credential", s);
    if (o.ok && !("errorMessage" in s)) return s;
    {
      const a = o.ok ? s.errorMessage : s.error.message,
        [l, u] = a.split(" : ");
      if (l === "FEDERATED_USER_ID_ALREADY_LINKED")
        throw yo(e, "credential-already-in-use", s);
      if (l === "EMAIL_EXISTS") throw yo(e, "email-already-in-use", s);
      if (l === "USER_DISABLED") throw yo(e, "user-disabled", s);
      const c = r[l] || l.toLowerCase().replace(/[_\s]+/g, "-");
      if (u) throw Cc(e, c, u);
      Ge(e, c);
    }
  } catch (i) {
    if (i instanceof Nt) throw i;
    Ge(e, "network-request-failed", { message: String(i) });
  }
}
async function qs(e, t, n, r, i = {}) {
  const o = await pn(e, t, n, r, i);
  return (
    "mfaPendingCredential" in o &&
      Ge(e, "multi-factor-auth-required", { _serverResponse: o }),
    o
  );
}
function dg(e, t, n, r) {
  const i = `${t}${n}?${r}`;
  return e.config.emulator ? xc(e.config, i) : `${e.config.apiScheme}://${i}`;
}
function cS(e) {
  switch (e) {
    case "ENFORCE":
      return "ENFORCE";
    case "AUDIT":
      return "AUDIT";
    case "OFF":
      return "OFF";
    default:
      return "ENFORCEMENT_STATE_UNSPECIFIED";
  }
}
class dS {
  constructor(t) {
    (this.auth = t),
      (this.timer = null),
      (this.promise = new Promise((n, r) => {
        this.timer = setTimeout(
          () => r(tt(this.auth, "network-request-failed")),
          uS.get()
        );
      }));
  }
  clearNetworkTimeout() {
    clearTimeout(this.timer);
  }
}
function yo(e, t, n) {
  const r = { appName: e.name };
  n.email && (r.email = n.email),
    n.phoneNumber && (r.phoneNumber = n.phoneNumber);
  const i = tt(e, t, r);
  return (i.customData._tokenResponse = n), i;
}
function Rf(e) {
  return e !== void 0 && e.enterprise !== void 0;
}
class fS {
  constructor(t) {
    if (
      ((this.siteKey = ""),
      (this.recaptchaEnforcementState = []),
      t.recaptchaKey === void 0)
    )
      throw new Error("recaptchaKey undefined");
    (this.siteKey = t.recaptchaKey.split("/")[3]),
      (this.recaptchaEnforcementState = t.recaptchaEnforcementState);
  }
  getProviderEnforcementState(t) {
    if (
      !this.recaptchaEnforcementState ||
      this.recaptchaEnforcementState.length === 0
    )
      return null;
    for (const n of this.recaptchaEnforcementState)
      if (n.provider && n.provider === t) return cS(n.enforcementState);
    return null;
  }
  isProviderEnabled(t) {
    return (
      this.getProviderEnforcementState(t) === "ENFORCE" ||
      this.getProviderEnforcementState(t) === "AUDIT"
    );
  }
}
async function hS(e, t) {
  return pn(e, "GET", "/v2/recaptchaConfig", $n(e, t));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function pS(e, t) {
  return pn(e, "POST", "/v1/accounts:delete", t);
}
async function fg(e, t) {
  return pn(e, "POST", "/v1/accounts:lookup", t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ui(e) {
  if (e)
    try {
      const t = new Date(Number(e));
      if (!isNaN(t.getTime())) return t.toUTCString();
    } catch {}
}
async function mS(e, t = !1) {
  const n = Fe(e),
    r = await n.getIdToken(t),
    i = Ic(r);
  O(i && i.exp && i.auth_time && i.iat, n.auth, "internal-error");
  const o = typeof i.firebase == "object" ? i.firebase : void 0,
    s = o == null ? void 0 : o.sign_in_provider;
  return {
    claims: i,
    token: r,
    authTime: ui(Va(i.auth_time)),
    issuedAtTime: ui(Va(i.iat)),
    expirationTime: ui(Va(i.exp)),
    signInProvider: s || null,
    signInSecondFactor: (o == null ? void 0 : o.sign_in_second_factor) || null,
  };
}
function Va(e) {
  return Number(e) * 1e3;
}
function Ic(e) {
  const [t, n, r] = e.split(".");
  if (t === void 0 || n === void 0 || r === void 0)
    return Lo("JWT malformed, contained fewer than 3 sections"), null;
  try {
    const i = Qm(n);
    return i
      ? JSON.parse(i)
      : (Lo("Failed to decode base64 JWT payload"), null);
  } catch (i) {
    return (
      Lo(
        "Caught error parsing JWT payload as JSON",
        i == null ? void 0 : i.toString()
      ),
      null
    );
  }
}
function Pf(e) {
  const t = Ic(e);
  return (
    O(t, "internal-error"),
    O(typeof t.exp < "u", "internal-error"),
    O(typeof t.iat < "u", "internal-error"),
    Number(t.exp) - Number(t.iat)
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Oi(e, t, n = !1) {
  if (n) return t;
  try {
    return await t;
  } catch (r) {
    throw (
      (r instanceof Nt &&
        gS(r) &&
        e.auth.currentUser === e &&
        (await e.auth.signOut()),
      r)
    );
  }
}
function gS({ code: e }) {
  return e === "auth/user-disabled" || e === "auth/user-token-expired";
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class yS {
  constructor(t) {
    (this.user = t),
      (this.isRunning = !1),
      (this.timerId = null),
      (this.errorBackoff = 3e4);
  }
  _start() {
    this.isRunning || ((this.isRunning = !0), this.schedule());
  }
  _stop() {
    this.isRunning &&
      ((this.isRunning = !1),
      this.timerId !== null && clearTimeout(this.timerId));
  }
  getInterval(t) {
    var n;
    if (t) {
      const r = this.errorBackoff;
      return (this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4)), r;
    } else {
      this.errorBackoff = 3e4;
      const i =
        ((n = this.user.stsTokenManager.expirationTime) !== null && n !== void 0
          ? n
          : 0) -
        Date.now() -
        3e5;
      return Math.max(0, i);
    }
  }
  schedule(t = !1) {
    if (!this.isRunning) return;
    const n = this.getInterval(t);
    this.timerId = setTimeout(async () => {
      await this.iteration();
    }, n);
  }
  async iteration() {
    try {
      await this.user.getIdToken(!0);
    } catch (t) {
      (t == null ? void 0 : t.code) === "auth/network-request-failed" &&
        this.schedule(!0);
      return;
    }
    this.schedule();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class iu {
  constructor(t, n) {
    (this.createdAt = t), (this.lastLoginAt = n), this._initializeTime();
  }
  _initializeTime() {
    (this.lastSignInTime = ui(this.lastLoginAt)),
      (this.creationTime = ui(this.createdAt));
  }
  _copy(t) {
    (this.createdAt = t.createdAt),
      (this.lastLoginAt = t.lastLoginAt),
      this._initializeTime();
  }
  toJSON() {
    return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function ys(e) {
  var t;
  const n = e.auth,
    r = await e.getIdToken(),
    i = await Oi(e, fg(n, { idToken: r }));
  O(i == null ? void 0 : i.users.length, n, "internal-error");
  const o = i.users[0];
  e._notifyReloadListener(o);
  const s =
      !((t = o.providerUserInfo) === null || t === void 0) && t.length
        ? hg(o.providerUserInfo)
        : [],
    a = wS(e.providerData, s),
    l = e.isAnonymous,
    u = !(e.email && o.passwordHash) && !(a != null && a.length),
    c = l ? u : !1,
    d = {
      uid: o.localId,
      displayName: o.displayName || null,
      photoURL: o.photoUrl || null,
      email: o.email || null,
      emailVerified: o.emailVerified || !1,
      phoneNumber: o.phoneNumber || null,
      tenantId: o.tenantId || null,
      providerData: a,
      metadata: new iu(o.createdAt, o.lastLoginAt),
      isAnonymous: c,
    };
  Object.assign(e, d);
}
async function vS(e) {
  const t = Fe(e);
  await ys(t),
    await t.auth._persistUserIfCurrent(t),
    t.auth._notifyListenersIfCurrent(t);
}
function wS(e, t) {
  return [
    ...e.filter((r) => !t.some((i) => i.providerId === r.providerId)),
    ...t,
  ];
}
function hg(e) {
  return e.map((t) => {
    var { providerId: n } = t,
      r = kc(t, ["providerId"]);
    return {
      providerId: n,
      uid: r.rawId || "",
      displayName: r.displayName || null,
      email: r.email || null,
      phoneNumber: r.phoneNumber || null,
      photoURL: r.photoUrl || null,
    };
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function _S(e, t) {
  const n = await cg(e, {}, async () => {
    const r = Hi({ grant_type: "refresh_token", refresh_token: t }).slice(1),
      { tokenApiHost: i, apiKey: o } = e.config,
      s = dg(e, i, "/v1/token", `key=${o}`),
      a = await e._getAdditionalHeaders();
    return (
      (a["Content-Type"] = "application/x-www-form-urlencoded"),
      ug.fetch()(s, { method: "POST", headers: a, body: r })
    );
  });
  return {
    accessToken: n.access_token,
    expiresIn: n.expires_in,
    refreshToken: n.refresh_token,
  };
}
async function ES(e, t) {
  return pn(e, "POST", "/v2/accounts:revokeToken", $n(e, t));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cr {
  constructor() {
    (this.refreshToken = null),
      (this.accessToken = null),
      (this.expirationTime = null);
  }
  get isExpired() {
    return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
  }
  updateFromServerResponse(t) {
    O(t.idToken, "internal-error"),
      O(typeof t.idToken < "u", "internal-error"),
      O(typeof t.refreshToken < "u", "internal-error");
    const n =
      "expiresIn" in t && typeof t.expiresIn < "u"
        ? Number(t.expiresIn)
        : Pf(t.idToken);
    this.updateTokensAndExpiration(t.idToken, t.refreshToken, n);
  }
  updateFromIdToken(t) {
    O(t.length !== 0, "internal-error");
    const n = Pf(t);
    this.updateTokensAndExpiration(t, null, n);
  }
  async getToken(t, n = !1) {
    return !n && this.accessToken && !this.isExpired
      ? this.accessToken
      : (O(this.refreshToken, t, "user-token-expired"),
        this.refreshToken
          ? (await this.refresh(t, this.refreshToken), this.accessToken)
          : null);
  }
  clearRefreshToken() {
    this.refreshToken = null;
  }
  async refresh(t, n) {
    const { accessToken: r, refreshToken: i, expiresIn: o } = await _S(t, n);
    this.updateTokensAndExpiration(r, i, Number(o));
  }
  updateTokensAndExpiration(t, n, r) {
    (this.refreshToken = n || null),
      (this.accessToken = t || null),
      (this.expirationTime = Date.now() + r * 1e3);
  }
  static fromJSON(t, n) {
    const { refreshToken: r, accessToken: i, expirationTime: o } = n,
      s = new cr();
    return (
      r &&
        (O(typeof r == "string", "internal-error", { appName: t }),
        (s.refreshToken = r)),
      i &&
        (O(typeof i == "string", "internal-error", { appName: t }),
        (s.accessToken = i)),
      o &&
        (O(typeof o == "number", "internal-error", { appName: t }),
        (s.expirationTime = o)),
      s
    );
  }
  toJSON() {
    return {
      refreshToken: this.refreshToken,
      accessToken: this.accessToken,
      expirationTime: this.expirationTime,
    };
  }
  _assign(t) {
    (this.accessToken = t.accessToken),
      (this.refreshToken = t.refreshToken),
      (this.expirationTime = t.expirationTime);
  }
  _clone() {
    return Object.assign(new cr(), this.toJSON());
  }
  _performRefresh() {
    return vt("not implemented");
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function bt(e, t) {
  O(typeof e == "string" || typeof e > "u", "internal-error", { appName: t });
}
class wt {
  constructor(t) {
    var { uid: n, auth: r, stsTokenManager: i } = t,
      o = kc(t, ["uid", "auth", "stsTokenManager"]);
    (this.providerId = "firebase"),
      (this.proactiveRefresh = new yS(this)),
      (this.reloadUserInfo = null),
      (this.reloadListener = null),
      (this.uid = n),
      (this.auth = r),
      (this.stsTokenManager = i),
      (this.accessToken = i.accessToken),
      (this.displayName = o.displayName || null),
      (this.email = o.email || null),
      (this.emailVerified = o.emailVerified || !1),
      (this.phoneNumber = o.phoneNumber || null),
      (this.photoURL = o.photoURL || null),
      (this.isAnonymous = o.isAnonymous || !1),
      (this.tenantId = o.tenantId || null),
      (this.providerData = o.providerData ? [...o.providerData] : []),
      (this.metadata = new iu(o.createdAt || void 0, o.lastLoginAt || void 0));
  }
  async getIdToken(t) {
    const n = await Oi(this, this.stsTokenManager.getToken(this.auth, t));
    return (
      O(n, this.auth, "internal-error"),
      this.accessToken !== n &&
        ((this.accessToken = n),
        await this.auth._persistUserIfCurrent(this),
        this.auth._notifyListenersIfCurrent(this)),
      n
    );
  }
  getIdTokenResult(t) {
    return mS(this, t);
  }
  reload() {
    return vS(this);
  }
  _assign(t) {
    this !== t &&
      (O(this.uid === t.uid, this.auth, "internal-error"),
      (this.displayName = t.displayName),
      (this.photoURL = t.photoURL),
      (this.email = t.email),
      (this.emailVerified = t.emailVerified),
      (this.phoneNumber = t.phoneNumber),
      (this.isAnonymous = t.isAnonymous),
      (this.tenantId = t.tenantId),
      (this.providerData = t.providerData.map((n) => Object.assign({}, n))),
      this.metadata._copy(t.metadata),
      this.stsTokenManager._assign(t.stsTokenManager));
  }
  _clone(t) {
    const n = new wt(
      Object.assign(Object.assign({}, this), {
        auth: t,
        stsTokenManager: this.stsTokenManager._clone(),
      })
    );
    return n.metadata._copy(this.metadata), n;
  }
  _onReload(t) {
    O(!this.reloadListener, this.auth, "internal-error"),
      (this.reloadListener = t),
      this.reloadUserInfo &&
        (this._notifyReloadListener(this.reloadUserInfo),
        (this.reloadUserInfo = null));
  }
  _notifyReloadListener(t) {
    this.reloadListener ? this.reloadListener(t) : (this.reloadUserInfo = t);
  }
  _startProactiveRefresh() {
    this.proactiveRefresh._start();
  }
  _stopProactiveRefresh() {
    this.proactiveRefresh._stop();
  }
  async _updateTokensIfNecessary(t, n = !1) {
    let r = !1;
    t.idToken &&
      t.idToken !== this.stsTokenManager.accessToken &&
      (this.stsTokenManager.updateFromServerResponse(t), (r = !0)),
      n && (await ys(this)),
      await this.auth._persistUserIfCurrent(this),
      r && this.auth._notifyListenersIfCurrent(this);
  }
  async delete() {
    if (lt(this.auth.app)) return Promise.reject(on(this.auth));
    const t = await this.getIdToken();
    return (
      await Oi(this, pS(this.auth, { idToken: t })),
      this.stsTokenManager.clearRefreshToken(),
      this.auth.signOut()
    );
  }
  toJSON() {
    return Object.assign(
      Object.assign(
        {
          uid: this.uid,
          email: this.email || void 0,
          emailVerified: this.emailVerified,
          displayName: this.displayName || void 0,
          isAnonymous: this.isAnonymous,
          photoURL: this.photoURL || void 0,
          phoneNumber: this.phoneNumber || void 0,
          tenantId: this.tenantId || void 0,
          providerData: this.providerData.map((t) => Object.assign({}, t)),
          stsTokenManager: this.stsTokenManager.toJSON(),
          _redirectEventId: this._redirectEventId,
        },
        this.metadata.toJSON()
      ),
      { apiKey: this.auth.config.apiKey, appName: this.auth.name }
    );
  }
  get refreshToken() {
    return this.stsTokenManager.refreshToken || "";
  }
  static _fromJSON(t, n) {
    var r, i, o, s, a, l, u, c;
    const d = (r = n.displayName) !== null && r !== void 0 ? r : void 0,
      f = (i = n.email) !== null && i !== void 0 ? i : void 0,
      v = (o = n.phoneNumber) !== null && o !== void 0 ? o : void 0,
      g = (s = n.photoURL) !== null && s !== void 0 ? s : void 0,
      y = (a = n.tenantId) !== null && a !== void 0 ? a : void 0,
      E = (l = n._redirectEventId) !== null && l !== void 0 ? l : void 0,
      h = (u = n.createdAt) !== null && u !== void 0 ? u : void 0,
      p = (c = n.lastLoginAt) !== null && c !== void 0 ? c : void 0,
      {
        uid: m,
        emailVerified: _,
        isAnonymous: k,
        providerData: x,
        stsTokenManager: I,
      } = n;
    O(m && I, t, "internal-error");
    const R = cr.fromJSON(this.name, I);
    O(typeof m == "string", t, "internal-error"),
      bt(d, t.name),
      bt(f, t.name),
      O(typeof _ == "boolean", t, "internal-error"),
      O(typeof k == "boolean", t, "internal-error"),
      bt(v, t.name),
      bt(g, t.name),
      bt(y, t.name),
      bt(E, t.name),
      bt(h, t.name),
      bt(p, t.name);
    const F = new wt({
      uid: m,
      auth: t,
      email: f,
      emailVerified: _,
      displayName: d,
      isAnonymous: k,
      photoURL: g,
      phoneNumber: v,
      tenantId: y,
      stsTokenManager: R,
      createdAt: h,
      lastLoginAt: p,
    });
    return (
      x &&
        Array.isArray(x) &&
        (F.providerData = x.map((L) => Object.assign({}, L))),
      E && (F._redirectEventId = E),
      F
    );
  }
  static async _fromIdTokenResponse(t, n, r = !1) {
    const i = new cr();
    i.updateFromServerResponse(n);
    const o = new wt({
      uid: n.localId,
      auth: t,
      stsTokenManager: i,
      isAnonymous: r,
    });
    return await ys(o), o;
  }
  static async _fromGetAccountInfoResponse(t, n, r) {
    const i = n.users[0];
    O(i.localId !== void 0, "internal-error");
    const o = i.providerUserInfo !== void 0 ? hg(i.providerUserInfo) : [],
      s = !(i.email && i.passwordHash) && !(o != null && o.length),
      a = new cr();
    a.updateFromIdToken(r);
    const l = new wt({
        uid: i.localId,
        auth: t,
        stsTokenManager: a,
        isAnonymous: s,
      }),
      u = {
        uid: i.localId,
        displayName: i.displayName || null,
        photoURL: i.photoUrl || null,
        email: i.email || null,
        emailVerified: i.emailVerified || !1,
        phoneNumber: i.phoneNumber || null,
        tenantId: i.tenantId || null,
        providerData: o,
        metadata: new iu(i.createdAt, i.lastLoginAt),
        isAnonymous: !(i.email && i.passwordHash) && !(o != null && o.length),
      };
    return Object.assign(l, u), l;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Nf = new Map();
function _t(e) {
  xt(e instanceof Function, "Expected a class definition");
  let t = Nf.get(e);
  return t
    ? (xt(t instanceof e, "Instance stored in cache mismatched with class"), t)
    : ((t = new e()), Nf.set(e, t), t);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class pg {
  constructor() {
    (this.type = "NONE"), (this.storage = {});
  }
  async _isAvailable() {
    return !0;
  }
  async _set(t, n) {
    this.storage[t] = n;
  }
  async _get(t) {
    const n = this.storage[t];
    return n === void 0 ? null : n;
  }
  async _remove(t) {
    delete this.storage[t];
  }
  _addListener(t, n) {}
  _removeListener(t, n) {}
}
pg.type = "NONE";
const Of = pg;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Do(e, t, n) {
  return `firebase:${e}:${t}:${n}`;
}
class dr {
  constructor(t, n, r) {
    (this.persistence = t), (this.auth = n), (this.userKey = r);
    const { config: i, name: o } = this.auth;
    (this.fullUserKey = Do(this.userKey, i.apiKey, o)),
      (this.fullPersistenceKey = Do("persistence", i.apiKey, o)),
      (this.boundEventHandler = n._onStorageEvent.bind(n)),
      this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
  }
  setCurrentUser(t) {
    return this.persistence._set(this.fullUserKey, t.toJSON());
  }
  async getCurrentUser() {
    const t = await this.persistence._get(this.fullUserKey);
    return t ? wt._fromJSON(this.auth, t) : null;
  }
  removeCurrentUser() {
    return this.persistence._remove(this.fullUserKey);
  }
  savePersistenceForRedirect() {
    return this.persistence._set(
      this.fullPersistenceKey,
      this.persistence.type
    );
  }
  async setPersistence(t) {
    if (this.persistence === t) return;
    const n = await this.getCurrentUser();
    if ((await this.removeCurrentUser(), (this.persistence = t), n))
      return this.setCurrentUser(n);
  }
  delete() {
    this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
  }
  static async create(t, n, r = "authUser") {
    if (!n.length) return new dr(_t(Of), t, r);
    const i = (
      await Promise.all(
        n.map(async (u) => {
          if (await u._isAvailable()) return u;
        })
      )
    ).filter((u) => u);
    let o = i[0] || _t(Of);
    const s = Do(r, t.config.apiKey, t.name);
    let a = null;
    for (const u of n)
      try {
        const c = await u._get(s);
        if (c) {
          const d = wt._fromJSON(t, c);
          u !== o && (a = d), (o = u);
          break;
        }
      } catch {}
    const l = i.filter((u) => u._shouldAllowMigration);
    return !o._shouldAllowMigration || !l.length
      ? new dr(o, t, r)
      : ((o = l[0]),
        a && (await o._set(s, a.toJSON())),
        await Promise.all(
          n.map(async (u) => {
            if (u !== o)
              try {
                await u._remove(s);
              } catch {}
          })
        ),
        new dr(o, t, r));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function bf(e) {
  const t = e.toLowerCase();
  if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/"))
    return "Opera";
  if (yg(t)) return "IEMobile";
  if (t.includes("msie") || t.includes("trident/")) return "IE";
  if (t.includes("edge/")) return "Edge";
  if (mg(t)) return "Firefox";
  if (t.includes("silk/")) return "Silk";
  if (wg(t)) return "Blackberry";
  if (_g(t)) return "Webos";
  if (Rc(t)) return "Safari";
  if ((t.includes("chrome/") || gg(t)) && !t.includes("edge/")) return "Chrome";
  if (vg(t)) return "Android";
  {
    const n = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
      r = e.match(n);
    if ((r == null ? void 0 : r.length) === 2) return r[1];
  }
  return "Other";
}
function mg(e = me()) {
  return /firefox\//i.test(e);
}
function Rc(e = me()) {
  const t = e.toLowerCase();
  return (
    t.includes("safari/") &&
    !t.includes("chrome/") &&
    !t.includes("crios/") &&
    !t.includes("android")
  );
}
function gg(e = me()) {
  return /crios\//i.test(e);
}
function yg(e = me()) {
  return /iemobile/i.test(e);
}
function vg(e = me()) {
  return /android/i.test(e);
}
function wg(e = me()) {
  return /blackberry/i.test(e);
}
function _g(e = me()) {
  return /webos/i.test(e);
}
function Js(e = me()) {
  return (
    /iphone|ipad|ipod/i.test(e) || (/macintosh/i.test(e) && /mobile/i.test(e))
  );
}
function SS(e = me()) {
  var t;
  return (
    Js(e) &&
    !!(!((t = window.navigator) === null || t === void 0) && t.standalone)
  );
}
function kS() {
  return B_() && document.documentMode === 10;
}
function Eg(e = me()) {
  return Js(e) || vg(e) || _g(e) || wg(e) || /windows phone/i.test(e) || yg(e);
}
function CS() {
  try {
    return !!(window && window !== window.top);
  } catch {
    return !1;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Sg(e, t = []) {
  let n;
  switch (e) {
    case "Browser":
      n = bf(me());
      break;
    case "Worker":
      n = `${bf(me())}-${e}`;
      break;
    default:
      n = e;
  }
  const r = t.length ? t.join(",") : "FirebaseCore-web";
  return `${n}/JsCore/${Or}/${r}`;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class TS {
  constructor(t) {
    (this.auth = t), (this.queue = []);
  }
  pushCallback(t, n) {
    const r = (o) =>
      new Promise((s, a) => {
        try {
          const l = t(o);
          s(l);
        } catch (l) {
          a(l);
        }
      });
    (r.onAbort = n), this.queue.push(r);
    const i = this.queue.length - 1;
    return () => {
      this.queue[i] = () => Promise.resolve();
    };
  }
  async runMiddleware(t) {
    if (this.auth.currentUser === t) return;
    const n = [];
    try {
      for (const r of this.queue) await r(t), r.onAbort && n.push(r.onAbort);
    } catch (r) {
      n.reverse();
      for (const i of n)
        try {
          i();
        } catch {}
      throw this.auth._errorFactory.create("login-blocked", {
        originalMessage: r == null ? void 0 : r.message,
      });
    }
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function xS(e, t = {}) {
  return pn(e, "GET", "/v2/passwordPolicy", $n(e, t));
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const IS = 6;
class RS {
  constructor(t) {
    var n, r, i, o;
    const s = t.customStrengthOptions;
    (this.customStrengthOptions = {}),
      (this.customStrengthOptions.minPasswordLength =
        (n = s.minPasswordLength) !== null && n !== void 0 ? n : IS),
      s.maxPasswordLength &&
        (this.customStrengthOptions.maxPasswordLength = s.maxPasswordLength),
      s.containsLowercaseCharacter !== void 0 &&
        (this.customStrengthOptions.containsLowercaseLetter =
          s.containsLowercaseCharacter),
      s.containsUppercaseCharacter !== void 0 &&
        (this.customStrengthOptions.containsUppercaseLetter =
          s.containsUppercaseCharacter),
      s.containsNumericCharacter !== void 0 &&
        (this.customStrengthOptions.containsNumericCharacter =
          s.containsNumericCharacter),
      s.containsNonAlphanumericCharacter !== void 0 &&
        (this.customStrengthOptions.containsNonAlphanumericCharacter =
          s.containsNonAlphanumericCharacter),
      (this.enforcementState = t.enforcementState),
      this.enforcementState === "ENFORCEMENT_STATE_UNSPECIFIED" &&
        (this.enforcementState = "OFF"),
      (this.allowedNonAlphanumericCharacters =
        (i =
          (r = t.allowedNonAlphanumericCharacters) === null || r === void 0
            ? void 0
            : r.join("")) !== null && i !== void 0
          ? i
          : ""),
      (this.forceUpgradeOnSignin =
        (o = t.forceUpgradeOnSignin) !== null && o !== void 0 ? o : !1),
      (this.schemaVersion = t.schemaVersion);
  }
  validatePassword(t) {
    var n, r, i, o, s, a;
    const l = { isValid: !0, passwordPolicy: this };
    return (
      this.validatePasswordLengthOptions(t, l),
      this.validatePasswordCharacterOptions(t, l),
      l.isValid &&
        (l.isValid =
          (n = l.meetsMinPasswordLength) !== null && n !== void 0 ? n : !0),
      l.isValid &&
        (l.isValid =
          (r = l.meetsMaxPasswordLength) !== null && r !== void 0 ? r : !0),
      l.isValid &&
        (l.isValid =
          (i = l.containsLowercaseLetter) !== null && i !== void 0 ? i : !0),
      l.isValid &&
        (l.isValid =
          (o = l.containsUppercaseLetter) !== null && o !== void 0 ? o : !0),
      l.isValid &&
        (l.isValid =
          (s = l.containsNumericCharacter) !== null && s !== void 0 ? s : !0),
      l.isValid &&
        (l.isValid =
          (a = l.containsNonAlphanumericCharacter) !== null && a !== void 0
            ? a
            : !0),
      l
    );
  }
  validatePasswordLengthOptions(t, n) {
    const r = this.customStrengthOptions.minPasswordLength,
      i = this.customStrengthOptions.maxPasswordLength;
    r && (n.meetsMinPasswordLength = t.length >= r),
      i && (n.meetsMaxPasswordLength = t.length <= i);
  }
  validatePasswordCharacterOptions(t, n) {
    this.updatePasswordCharacterOptionsStatuses(n, !1, !1, !1, !1);
    let r;
    for (let i = 0; i < t.length; i++)
      (r = t.charAt(i)),
        this.updatePasswordCharacterOptionsStatuses(
          n,
          r >= "a" && r <= "z",
          r >= "A" && r <= "Z",
          r >= "0" && r <= "9",
          this.allowedNonAlphanumericCharacters.includes(r)
        );
  }
  updatePasswordCharacterOptionsStatuses(t, n, r, i, o) {
    this.customStrengthOptions.containsLowercaseLetter &&
      (t.containsLowercaseLetter || (t.containsLowercaseLetter = n)),
      this.customStrengthOptions.containsUppercaseLetter &&
        (t.containsUppercaseLetter || (t.containsUppercaseLetter = r)),
      this.customStrengthOptions.containsNumericCharacter &&
        (t.containsNumericCharacter || (t.containsNumericCharacter = i)),
      this.customStrengthOptions.containsNonAlphanumericCharacter &&
        (t.containsNonAlphanumericCharacter ||
          (t.containsNonAlphanumericCharacter = o));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class PS {
  constructor(t, n, r, i) {
    (this.app = t),
      (this.heartbeatServiceProvider = n),
      (this.appCheckServiceProvider = r),
      (this.config = i),
      (this.currentUser = null),
      (this.emulatorConfig = null),
      (this.operations = Promise.resolve()),
      (this.authStateSubscription = new Af(this)),
      (this.idTokenSubscription = new Af(this)),
      (this.beforeStateQueue = new TS(this)),
      (this.redirectUser = null),
      (this.isProactiveRefreshEnabled = !1),
      (this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
      (this._canInitEmulator = !0),
      (this._isInitialized = !1),
      (this._deleted = !1),
      (this._initializationPromise = null),
      (this._popupRedirectResolver = null),
      (this._errorFactory = lg),
      (this._agentRecaptchaConfig = null),
      (this._tenantRecaptchaConfigs = {}),
      (this._projectPasswordPolicy = null),
      (this._tenantPasswordPolicies = {}),
      (this.lastNotifiedUid = void 0),
      (this.languageCode = null),
      (this.tenantId = null),
      (this.settings = { appVerificationDisabledForTesting: !1 }),
      (this.frameworks = []),
      (this.name = t.name),
      (this.clientVersion = i.sdkClientVersion);
  }
  _initializeWithPersistence(t, n) {
    return (
      n && (this._popupRedirectResolver = _t(n)),
      (this._initializationPromise = this.queue(async () => {
        var r, i;
        if (
          !this._deleted &&
          ((this.persistenceManager = await dr.create(this, t)), !this._deleted)
        ) {
          if (
            !((r = this._popupRedirectResolver) === null || r === void 0) &&
            r._shouldInitProactively
          )
            try {
              await this._popupRedirectResolver._initialize(this);
            } catch {}
          await this.initializeCurrentUser(n),
            (this.lastNotifiedUid =
              ((i = this.currentUser) === null || i === void 0
                ? void 0
                : i.uid) || null),
            !this._deleted && (this._isInitialized = !0);
        }
      })),
      this._initializationPromise
    );
  }
  async _onStorageEvent() {
    if (this._deleted) return;
    const t = await this.assertedPersistence.getCurrentUser();
    if (!(!this.currentUser && !t)) {
      if (this.currentUser && t && this.currentUser.uid === t.uid) {
        this._currentUser._assign(t), await this.currentUser.getIdToken();
        return;
      }
      await this._updateCurrentUser(t, !0);
    }
  }
  async initializeCurrentUserFromIdToken(t) {
    try {
      const n = await fg(this, { idToken: t }),
        r = await wt._fromGetAccountInfoResponse(this, n, t);
      await this.directlySetCurrentUser(r);
    } catch (n) {
      console.warn(
        "FirebaseServerApp could not login user with provided authIdToken: ",
        n
      ),
        await this.directlySetCurrentUser(null);
    }
  }
  async initializeCurrentUser(t) {
    var n;
    if (lt(this.app)) {
      const s = this.app.settings.authIdToken;
      return s
        ? new Promise((a) => {
            setTimeout(() =>
              this.initializeCurrentUserFromIdToken(s).then(a, a)
            );
          })
        : this.directlySetCurrentUser(null);
    }
    const r = await this.assertedPersistence.getCurrentUser();
    let i = r,
      o = !1;
    if (t && this.config.authDomain) {
      await this.getOrInitRedirectPersistenceManager();
      const s =
          (n = this.redirectUser) === null || n === void 0
            ? void 0
            : n._redirectEventId,
        a = i == null ? void 0 : i._redirectEventId,
        l = await this.tryRedirectSignIn(t);
      (!s || s === a) && l != null && l.user && ((i = l.user), (o = !0));
    }
    if (!i) return this.directlySetCurrentUser(null);
    if (!i._redirectEventId) {
      if (o)
        try {
          await this.beforeStateQueue.runMiddleware(i);
        } catch (s) {
          (i = r),
            this._popupRedirectResolver._overrideRedirectResult(this, () =>
              Promise.reject(s)
            );
        }
      return i
        ? this.reloadAndSetCurrentUserOrClear(i)
        : this.directlySetCurrentUser(null);
    }
    return (
      O(this._popupRedirectResolver, this, "argument-error"),
      await this.getOrInitRedirectPersistenceManager(),
      this.redirectUser &&
      this.redirectUser._redirectEventId === i._redirectEventId
        ? this.directlySetCurrentUser(i)
        : this.reloadAndSetCurrentUserOrClear(i)
    );
  }
  async tryRedirectSignIn(t) {
    let n = null;
    try {
      n = await this._popupRedirectResolver._completeRedirectFn(this, t, !0);
    } catch {
      await this._setRedirectUser(null);
    }
    return n;
  }
  async reloadAndSetCurrentUserOrClear(t) {
    try {
      await ys(t);
    } catch (n) {
      if ((n == null ? void 0 : n.code) !== "auth/network-request-failed")
        return this.directlySetCurrentUser(null);
    }
    return this.directlySetCurrentUser(t);
  }
  useDeviceLanguage() {
    this.languageCode = aS();
  }
  async _delete() {
    this._deleted = !0;
  }
  async updateCurrentUser(t) {
    if (lt(this.app)) return Promise.reject(on(this));
    const n = t ? Fe(t) : null;
    return (
      n &&
        O(
          n.auth.config.apiKey === this.config.apiKey,
          this,
          "invalid-user-token"
        ),
      this._updateCurrentUser(n && n._clone(this))
    );
  }
  async _updateCurrentUser(t, n = !1) {
    if (!this._deleted)
      return (
        t && O(this.tenantId === t.tenantId, this, "tenant-id-mismatch"),
        n || (await this.beforeStateQueue.runMiddleware(t)),
        this.queue(async () => {
          await this.directlySetCurrentUser(t), this.notifyAuthListeners();
        })
      );
  }
  async signOut() {
    return lt(this.app)
      ? Promise.reject(on(this))
      : (await this.beforeStateQueue.runMiddleware(null),
        (this.redirectPersistenceManager || this._popupRedirectResolver) &&
          (await this._setRedirectUser(null)),
        this._updateCurrentUser(null, !0));
  }
  setPersistence(t) {
    return lt(this.app)
      ? Promise.reject(on(this))
      : this.queue(async () => {
          await this.assertedPersistence.setPersistence(_t(t));
        });
  }
  _getRecaptchaConfig() {
    return this.tenantId == null
      ? this._agentRecaptchaConfig
      : this._tenantRecaptchaConfigs[this.tenantId];
  }
  async validatePassword(t) {
    this._getPasswordPolicyInternal() || (await this._updatePasswordPolicy());
    const n = this._getPasswordPolicyInternal();
    return n.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION
      ? Promise.reject(
          this._errorFactory.create(
            "unsupported-password-policy-schema-version",
            {}
          )
        )
      : n.validatePassword(t);
  }
  _getPasswordPolicyInternal() {
    return this.tenantId === null
      ? this._projectPasswordPolicy
      : this._tenantPasswordPolicies[this.tenantId];
  }
  async _updatePasswordPolicy() {
    const t = await xS(this),
      n = new RS(t);
    this.tenantId === null
      ? (this._projectPasswordPolicy = n)
      : (this._tenantPasswordPolicies[this.tenantId] = n);
  }
  _getPersistence() {
    return this.assertedPersistence.persistence.type;
  }
  _updateErrorMap(t) {
    this._errorFactory = new $i("auth", "Firebase", t());
  }
  onAuthStateChanged(t, n, r) {
    return this.registerStateListener(this.authStateSubscription, t, n, r);
  }
  beforeAuthStateChanged(t, n) {
    return this.beforeStateQueue.pushCallback(t, n);
  }
  onIdTokenChanged(t, n, r) {
    return this.registerStateListener(this.idTokenSubscription, t, n, r);
  }
  authStateReady() {
    return new Promise((t, n) => {
      if (this.currentUser) t();
      else {
        const r = this.onAuthStateChanged(() => {
          r(), t();
        }, n);
      }
    });
  }
  async revokeAccessToken(t) {
    if (this.currentUser) {
      const n = await this.currentUser.getIdToken(),
        r = {
          providerId: "apple.com",
          tokenType: "ACCESS_TOKEN",
          token: t,
          idToken: n,
        };
      this.tenantId != null && (r.tenantId = this.tenantId), await ES(this, r);
    }
  }
  toJSON() {
    var t;
    return {
      apiKey: this.config.apiKey,
      authDomain: this.config.authDomain,
      appName: this.name,
      currentUser:
        (t = this._currentUser) === null || t === void 0 ? void 0 : t.toJSON(),
    };
  }
  async _setRedirectUser(t, n) {
    const r = await this.getOrInitRedirectPersistenceManager(n);
    return t === null ? r.removeCurrentUser() : r.setCurrentUser(t);
  }
  async getOrInitRedirectPersistenceManager(t) {
    if (!this.redirectPersistenceManager) {
      const n = (t && _t(t)) || this._popupRedirectResolver;
      O(n, this, "argument-error"),
        (this.redirectPersistenceManager = await dr.create(
          this,
          [_t(n._redirectPersistence)],
          "redirectUser"
        )),
        (this.redirectUser =
          await this.redirectPersistenceManager.getCurrentUser());
    }
    return this.redirectPersistenceManager;
  }
  async _redirectUserForId(t) {
    var n, r;
    return (
      this._isInitialized && (await this.queue(async () => {})),
      ((n = this._currentUser) === null || n === void 0
        ? void 0
        : n._redirectEventId) === t
        ? this._currentUser
        : ((r = this.redirectUser) === null || r === void 0
            ? void 0
            : r._redirectEventId) === t
        ? this.redirectUser
        : null
    );
  }
  async _persistUserIfCurrent(t) {
    if (t === this.currentUser)
      return this.queue(async () => this.directlySetCurrentUser(t));
  }
  _notifyListenersIfCurrent(t) {
    t === this.currentUser && this.notifyAuthListeners();
  }
  _key() {
    return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
  }
  _startProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !0),
      this.currentUser && this._currentUser._startProactiveRefresh();
  }
  _stopProactiveRefresh() {
    (this.isProactiveRefreshEnabled = !1),
      this.currentUser && this._currentUser._stopProactiveRefresh();
  }
  get _currentUser() {
    return this.currentUser;
  }
  notifyAuthListeners() {
    var t, n;
    if (!this._isInitialized) return;
    this.idTokenSubscription.next(this.currentUser);
    const r =
      (n = (t = this.currentUser) === null || t === void 0 ? void 0 : t.uid) !==
        null && n !== void 0
        ? n
        : null;
    this.lastNotifiedUid !== r &&
      ((this.lastNotifiedUid = r),
      this.authStateSubscription.next(this.currentUser));
  }
  registerStateListener(t, n, r, i) {
    if (this._deleted) return () => {};
    const o = typeof n == "function" ? n : n.next.bind(n);
    let s = !1;
    const a = this._isInitialized
      ? Promise.resolve()
      : this._initializationPromise;
    if (
      (O(a, this, "internal-error"),
      a.then(() => {
        s || o(this.currentUser);
      }),
      typeof n == "function")
    ) {
      const l = t.addObserver(n, r, i);
      return () => {
        (s = !0), l();
      };
    } else {
      const l = t.addObserver(n);
      return () => {
        (s = !0), l();
      };
    }
  }
  async directlySetCurrentUser(t) {
    this.currentUser &&
      this.currentUser !== t &&
      this._currentUser._stopProactiveRefresh(),
      t && this.isProactiveRefreshEnabled && t._startProactiveRefresh(),
      (this.currentUser = t),
      t
        ? await this.assertedPersistence.setCurrentUser(t)
        : await this.assertedPersistence.removeCurrentUser();
  }
  queue(t) {
    return (this.operations = this.operations.then(t, t)), this.operations;
  }
  get assertedPersistence() {
    return (
      O(this.persistenceManager, this, "internal-error"),
      this.persistenceManager
    );
  }
  _logFramework(t) {
    !t ||
      this.frameworks.includes(t) ||
      (this.frameworks.push(t),
      this.frameworks.sort(),
      (this.clientVersion = Sg(
        this.config.clientPlatform,
        this._getFrameworks()
      )));
  }
  _getFrameworks() {
    return this.frameworks;
  }
  async _getAdditionalHeaders() {
    var t;
    const n = { "X-Client-Version": this.clientVersion };
    this.app.options.appId && (n["X-Firebase-gmpid"] = this.app.options.appId);
    const r = await ((t = this.heartbeatServiceProvider.getImmediate({
      optional: !0,
    })) === null || t === void 0
      ? void 0
      : t.getHeartbeatsHeader());
    r && (n["X-Firebase-Client"] = r);
    const i = await this._getAppCheckToken();
    return i && (n["X-Firebase-AppCheck"] = i), n;
  }
  async _getAppCheckToken() {
    var t;
    const n = await ((t = this.appCheckServiceProvider.getImmediate({
      optional: !0,
    })) === null || t === void 0
      ? void 0
      : t.getToken());
    return (
      n != null &&
        n.error &&
        rS(`Error while retrieving App Check token: ${n.error}`),
      n == null ? void 0 : n.token
    );
  }
}
function Hn(e) {
  return Fe(e);
}
class Af {
  constructor(t) {
    (this.auth = t),
      (this.observer = null),
      (this.addObserver = G_((n) => (this.observer = n)));
  }
  get next() {
    return (
      O(this.observer, this.auth, "internal-error"),
      this.observer.next.bind(this.observer)
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let Qs = {
  async loadJS() {
    throw new Error("Unable to load external scripts");
  },
  recaptchaV2Script: "",
  recaptchaEnterpriseScript: "",
  gapiScript: "",
};
function NS(e) {
  Qs = e;
}
function kg(e) {
  return Qs.loadJS(e);
}
function OS() {
  return Qs.recaptchaEnterpriseScript;
}
function bS() {
  return Qs.gapiScript;
}
function AS(e) {
  return `__${e}${Math.floor(Math.random() * 1e6)}`;
}
const LS = "recaptcha-enterprise",
  DS = "NO_RECAPTCHA";
class US {
  constructor(t) {
    (this.type = LS), (this.auth = Hn(t));
  }
  async verify(t = "verify", n = !1) {
    async function r(o) {
      if (!n) {
        if (o.tenantId == null && o._agentRecaptchaConfig != null)
          return o._agentRecaptchaConfig.siteKey;
        if (
          o.tenantId != null &&
          o._tenantRecaptchaConfigs[o.tenantId] !== void 0
        )
          return o._tenantRecaptchaConfigs[o.tenantId].siteKey;
      }
      return new Promise(async (s, a) => {
        hS(o, {
          clientType: "CLIENT_TYPE_WEB",
          version: "RECAPTCHA_ENTERPRISE",
        })
          .then((l) => {
            if (l.recaptchaKey === void 0)
              a(new Error("recaptcha Enterprise site key undefined"));
            else {
              const u = new fS(l);
              return (
                o.tenantId == null
                  ? (o._agentRecaptchaConfig = u)
                  : (o._tenantRecaptchaConfigs[o.tenantId] = u),
                s(u.siteKey)
              );
            }
          })
          .catch((l) => {
            a(l);
          });
      });
    }
    function i(o, s, a) {
      const l = window.grecaptcha;
      Rf(l)
        ? l.enterprise.ready(() => {
            l.enterprise
              .execute(o, { action: t })
              .then((u) => {
                s(u);
              })
              .catch(() => {
                s(DS);
              });
          })
        : a(Error("No reCAPTCHA enterprise script loaded."));
    }
    return new Promise((o, s) => {
      r(this.auth)
        .then((a) => {
          if (!n && Rf(window.grecaptcha)) i(a, o, s);
          else {
            if (typeof window > "u") {
              s(new Error("RecaptchaVerifier is only supported in browser"));
              return;
            }
            let l = OS();
            l.length !== 0 && (l += a),
              kg(l)
                .then(() => {
                  i(a, o, s);
                })
                .catch((u) => {
                  s(u);
                });
          }
        })
        .catch((a) => {
          s(a);
        });
    });
  }
}
async function Lf(e, t, n, r = !1) {
  const i = new US(e);
  let o;
  try {
    o = await i.verify(n);
  } catch {
    o = await i.verify(n, !0);
  }
  const s = Object.assign({}, t);
  return (
    r
      ? Object.assign(s, { captchaResp: o })
      : Object.assign(s, { captchaResponse: o }),
    Object.assign(s, { clientType: "CLIENT_TYPE_WEB" }),
    Object.assign(s, { recaptchaVersion: "RECAPTCHA_ENTERPRISE" }),
    s
  );
}
async function Df(e, t, n, r) {
  var i;
  if (
    !((i = e._getRecaptchaConfig()) === null || i === void 0) &&
    i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")
  ) {
    const o = await Lf(e, t, n, n === "getOobCode");
    return r(e, o);
  } else
    return r(e, t).catch(async (o) => {
      if (o.code === "auth/missing-recaptcha-token") {
        console.log(
          `${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`
        );
        const s = await Lf(e, t, n, n === "getOobCode");
        return r(e, s);
      } else return Promise.reject(o);
    });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function MS(e, t) {
  const n = Sc(e, "auth");
  if (n.isInitialized()) {
    const i = n.getImmediate(),
      o = n.getOptions();
    if (ps(o, t ?? {})) return i;
    Ge(i, "already-initialized");
  }
  return n.initialize({ options: t });
}
function jS(e, t) {
  const n = (t == null ? void 0 : t.persistence) || [],
    r = (Array.isArray(n) ? n : [n]).map(_t);
  t != null && t.errorMap && e._updateErrorMap(t.errorMap),
    e._initializeWithPersistence(
      r,
      t == null ? void 0 : t.popupRedirectResolver
    );
}
function FS(e, t, n) {
  const r = Hn(e);
  O(r._canInitEmulator, r, "emulator-config-failed"),
    O(/^https?:\/\//.test(t), r, "invalid-emulator-scheme");
  const i = !1,
    o = Cg(t),
    { host: s, port: a } = BS(t),
    l = a === null ? "" : `:${a}`;
  (r.config.emulator = { url: `${o}//${s}${l}/` }),
    (r.settings.appVerificationDisabledForTesting = !0),
    (r.emulatorConfig = Object.freeze({
      host: s,
      port: a,
      protocol: o.replace(":", ""),
      options: Object.freeze({ disableWarnings: i }),
    })),
    zS();
}
function Cg(e) {
  const t = e.indexOf(":");
  return t < 0 ? "" : e.substr(0, t + 1);
}
function BS(e) {
  const t = Cg(e),
    n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
  if (!n) return { host: "", port: null };
  const r = n[2].split("@").pop() || "",
    i = /^(\[[^\]]+\])(:|$)/.exec(r);
  if (i) {
    const o = i[1];
    return { host: o, port: Uf(r.substr(o.length + 1)) };
  } else {
    const [o, s] = r.split(":");
    return { host: o, port: Uf(s) };
  }
}
function Uf(e) {
  if (!e) return null;
  const t = Number(e);
  return isNaN(t) ? null : t;
}
function zS() {
  function e() {
    const t = document.createElement("p"),
      n = t.style;
    (t.innerText =
      "Running in emulator mode. Do not use with production credentials."),
      (n.position = "fixed"),
      (n.width = "100%"),
      (n.backgroundColor = "#ffffff"),
      (n.border = ".1em solid #000000"),
      (n.color = "#b50000"),
      (n.bottom = "0px"),
      (n.left = "0px"),
      (n.margin = "0px"),
      (n.zIndex = "10000"),
      (n.textAlign = "center"),
      t.classList.add("firebase-emulator-warning"),
      document.body.appendChild(t);
  }
  typeof console < "u" &&
    typeof console.info == "function" &&
    console.info(
      "WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."
    ),
    typeof window < "u" &&
      typeof document < "u" &&
      (document.readyState === "loading"
        ? window.addEventListener("DOMContentLoaded", e)
        : e());
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Pc {
  constructor(t, n) {
    (this.providerId = t), (this.signInMethod = n);
  }
  toJSON() {
    return vt("not implemented");
  }
  _getIdTokenResponse(t) {
    return vt("not implemented");
  }
  _linkToIdToken(t, n) {
    return vt("not implemented");
  }
  _getReauthenticationResolver(t) {
    return vt("not implemented");
  }
}
async function $S(e, t) {
  return pn(e, "POST", "/v1/accounts:signUp", t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function HS(e, t) {
  return qs(e, "POST", "/v1/accounts:signInWithPassword", $n(e, t));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function VS(e, t) {
  return qs(e, "POST", "/v1/accounts:signInWithEmailLink", $n(e, t));
}
async function WS(e, t) {
  return qs(e, "POST", "/v1/accounts:signInWithEmailLink", $n(e, t));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class bi extends Pc {
  constructor(t, n, r, i = null) {
    super("password", r),
      (this._email = t),
      (this._password = n),
      (this._tenantId = i);
  }
  static _fromEmailAndPassword(t, n) {
    return new bi(t, n, "password");
  }
  static _fromEmailAndCode(t, n, r = null) {
    return new bi(t, n, "emailLink", r);
  }
  toJSON() {
    return {
      email: this._email,
      password: this._password,
      signInMethod: this.signInMethod,
      tenantId: this._tenantId,
    };
  }
  static fromJSON(t) {
    const n = typeof t == "string" ? JSON.parse(t) : t;
    if (n != null && n.email && n != null && n.password) {
      if (n.signInMethod === "password")
        return this._fromEmailAndPassword(n.email, n.password);
      if (n.signInMethod === "emailLink")
        return this._fromEmailAndCode(n.email, n.password, n.tenantId);
    }
    return null;
  }
  async _getIdTokenResponse(t) {
    switch (this.signInMethod) {
      case "password":
        const n = {
          returnSecureToken: !0,
          email: this._email,
          password: this._password,
          clientType: "CLIENT_TYPE_WEB",
        };
        return Df(t, n, "signInWithPassword", HS);
      case "emailLink":
        return VS(t, { email: this._email, oobCode: this._password });
      default:
        Ge(t, "internal-error");
    }
  }
  async _linkToIdToken(t, n) {
    switch (this.signInMethod) {
      case "password":
        const r = {
          idToken: n,
          returnSecureToken: !0,
          email: this._email,
          password: this._password,
          clientType: "CLIENT_TYPE_WEB",
        };
        return Df(t, r, "signUpPassword", $S);
      case "emailLink":
        return WS(t, {
          idToken: n,
          email: this._email,
          oobCode: this._password,
        });
      default:
        Ge(t, "internal-error");
    }
  }
  _getReauthenticationResolver(t) {
    return this._getIdTokenResponse(t);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function fr(e, t) {
  return qs(e, "POST", "/v1/accounts:signInWithIdp", $n(e, t));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const KS = "http://localhost";
class Un extends Pc {
  constructor() {
    super(...arguments), (this.pendingToken = null);
  }
  static _fromParams(t) {
    const n = new Un(t.providerId, t.signInMethod);
    return (
      t.idToken || t.accessToken
        ? (t.idToken && (n.idToken = t.idToken),
          t.accessToken && (n.accessToken = t.accessToken),
          t.nonce && !t.pendingToken && (n.nonce = t.nonce),
          t.pendingToken && (n.pendingToken = t.pendingToken))
        : t.oauthToken && t.oauthTokenSecret
        ? ((n.accessToken = t.oauthToken), (n.secret = t.oauthTokenSecret))
        : Ge("argument-error"),
      n
    );
  }
  toJSON() {
    return {
      idToken: this.idToken,
      accessToken: this.accessToken,
      secret: this.secret,
      nonce: this.nonce,
      pendingToken: this.pendingToken,
      providerId: this.providerId,
      signInMethod: this.signInMethod,
    };
  }
  static fromJSON(t) {
    const n = typeof t == "string" ? JSON.parse(t) : t,
      { providerId: r, signInMethod: i } = n,
      o = kc(n, ["providerId", "signInMethod"]);
    if (!r || !i) return null;
    const s = new Un(r, i);
    return (
      (s.idToken = o.idToken || void 0),
      (s.accessToken = o.accessToken || void 0),
      (s.secret = o.secret),
      (s.nonce = o.nonce),
      (s.pendingToken = o.pendingToken || null),
      s
    );
  }
  _getIdTokenResponse(t) {
    const n = this.buildRequest();
    return fr(t, n);
  }
  _linkToIdToken(t, n) {
    const r = this.buildRequest();
    return (r.idToken = n), fr(t, r);
  }
  _getReauthenticationResolver(t) {
    const n = this.buildRequest();
    return (n.autoCreate = !1), fr(t, n);
  }
  buildRequest() {
    const t = { requestUri: KS, returnSecureToken: !0 };
    if (this.pendingToken) t.pendingToken = this.pendingToken;
    else {
      const n = {};
      this.idToken && (n.id_token = this.idToken),
        this.accessToken && (n.access_token = this.accessToken),
        this.secret && (n.oauth_token_secret = this.secret),
        (n.providerId = this.providerId),
        this.nonce && !this.pendingToken && (n.nonce = this.nonce),
        (t.postBody = Hi(n));
    }
    return t;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function GS(e) {
  switch (e) {
    case "recoverEmail":
      return "RECOVER_EMAIL";
    case "resetPassword":
      return "PASSWORD_RESET";
    case "signIn":
      return "EMAIL_SIGNIN";
    case "verifyEmail":
      return "VERIFY_EMAIL";
    case "verifyAndChangeEmail":
      return "VERIFY_AND_CHANGE_EMAIL";
    case "revertSecondFactorAddition":
      return "REVERT_SECOND_FACTOR_ADDITION";
    default:
      return null;
  }
}
function qS(e) {
  const t = Xr(Yr(e)).link,
    n = t ? Xr(Yr(t)).deep_link_id : null,
    r = Xr(Yr(e)).deep_link_id;
  return (r ? Xr(Yr(r)).link : null) || r || n || t || e;
}
class Nc {
  constructor(t) {
    var n, r, i, o, s, a;
    const l = Xr(Yr(t)),
      u = (n = l.apiKey) !== null && n !== void 0 ? n : null,
      c = (r = l.oobCode) !== null && r !== void 0 ? r : null,
      d = GS((i = l.mode) !== null && i !== void 0 ? i : null);
    O(u && c && d, "argument-error"),
      (this.apiKey = u),
      (this.operation = d),
      (this.code = c),
      (this.continueUrl =
        (o = l.continueUrl) !== null && o !== void 0 ? o : null),
      (this.languageCode =
        (s = l.languageCode) !== null && s !== void 0 ? s : null),
      (this.tenantId = (a = l.tenantId) !== null && a !== void 0 ? a : null);
  }
  static parseLink(t) {
    const n = qS(t);
    try {
      return new Nc(n);
    } catch {
      return null;
    }
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class br {
  constructor() {
    this.providerId = br.PROVIDER_ID;
  }
  static credential(t, n) {
    return bi._fromEmailAndPassword(t, n);
  }
  static credentialWithLink(t, n) {
    const r = Nc.parseLink(n);
    return O(r, "argument-error"), bi._fromEmailAndCode(t, r.code, r.tenantId);
  }
}
br.PROVIDER_ID = "password";
br.EMAIL_PASSWORD_SIGN_IN_METHOD = "password";
br.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Oc {
  constructor(t) {
    (this.providerId = t),
      (this.defaultLanguageCode = null),
      (this.customParameters = {});
  }
  setDefaultLanguage(t) {
    this.defaultLanguageCode = t;
  }
  setCustomParameters(t) {
    return (this.customParameters = t), this;
  }
  getCustomParameters() {
    return this.customParameters;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Wi extends Oc {
  constructor() {
    super(...arguments), (this.scopes = []);
  }
  addScope(t) {
    return this.scopes.includes(t) || this.scopes.push(t), this;
  }
  getScopes() {
    return [...this.scopes];
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ft extends Wi {
  constructor() {
    super("facebook.com");
  }
  static credential(t) {
    return Un._fromParams({
      providerId: Ft.PROVIDER_ID,
      signInMethod: Ft.FACEBOOK_SIGN_IN_METHOD,
      accessToken: t,
    });
  }
  static credentialFromResult(t) {
    return Ft.credentialFromTaggedObject(t);
  }
  static credentialFromError(t) {
    return Ft.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: t }) {
    if (!t || !("oauthAccessToken" in t) || !t.oauthAccessToken) return null;
    try {
      return Ft.credential(t.oauthAccessToken);
    } catch {
      return null;
    }
  }
}
Ft.FACEBOOK_SIGN_IN_METHOD = "facebook.com";
Ft.PROVIDER_ID = "facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class mt extends Wi {
  constructor() {
    super("google.com"), this.addScope("profile");
  }
  static credential(t, n) {
    return Un._fromParams({
      providerId: mt.PROVIDER_ID,
      signInMethod: mt.GOOGLE_SIGN_IN_METHOD,
      idToken: t,
      accessToken: n,
    });
  }
  static credentialFromResult(t) {
    return mt.credentialFromTaggedObject(t);
  }
  static credentialFromError(t) {
    return mt.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: t }) {
    if (!t) return null;
    const { oauthIdToken: n, oauthAccessToken: r } = t;
    if (!n && !r) return null;
    try {
      return mt.credential(n, r);
    } catch {
      return null;
    }
  }
}
mt.GOOGLE_SIGN_IN_METHOD = "google.com";
mt.PROVIDER_ID = "google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Bt extends Wi {
  constructor() {
    super("github.com");
  }
  static credential(t) {
    return Un._fromParams({
      providerId: Bt.PROVIDER_ID,
      signInMethod: Bt.GITHUB_SIGN_IN_METHOD,
      accessToken: t,
    });
  }
  static credentialFromResult(t) {
    return Bt.credentialFromTaggedObject(t);
  }
  static credentialFromError(t) {
    return Bt.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: t }) {
    if (!t || !("oauthAccessToken" in t) || !t.oauthAccessToken) return null;
    try {
      return Bt.credential(t.oauthAccessToken);
    } catch {
      return null;
    }
  }
}
Bt.GITHUB_SIGN_IN_METHOD = "github.com";
Bt.PROVIDER_ID = "github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zt extends Wi {
  constructor() {
    super("twitter.com");
  }
  static credential(t, n) {
    return Un._fromParams({
      providerId: zt.PROVIDER_ID,
      signInMethod: zt.TWITTER_SIGN_IN_METHOD,
      oauthToken: t,
      oauthTokenSecret: n,
    });
  }
  static credentialFromResult(t) {
    return zt.credentialFromTaggedObject(t);
  }
  static credentialFromError(t) {
    return zt.credentialFromTaggedObject(t.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: t }) {
    if (!t) return null;
    const { oauthAccessToken: n, oauthTokenSecret: r } = t;
    if (!n || !r) return null;
    try {
      return zt.credential(n, r);
    } catch {
      return null;
    }
  }
}
zt.TWITTER_SIGN_IN_METHOD = "twitter.com";
zt.PROVIDER_ID = "twitter.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Er {
  constructor(t) {
    (this.user = t.user),
      (this.providerId = t.providerId),
      (this._tokenResponse = t._tokenResponse),
      (this.operationType = t.operationType);
  }
  static async _fromIdTokenResponse(t, n, r, i = !1) {
    const o = await wt._fromIdTokenResponse(t, r, i),
      s = Mf(r);
    return new Er({
      user: o,
      providerId: s,
      _tokenResponse: r,
      operationType: n,
    });
  }
  static async _forOperation(t, n, r) {
    await t._updateTokensIfNecessary(r, !0);
    const i = Mf(r);
    return new Er({
      user: t,
      providerId: i,
      _tokenResponse: r,
      operationType: n,
    });
  }
}
function Mf(e) {
  return e.providerId ? e.providerId : "phoneNumber" in e ? "phone" : null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vs extends Nt {
  constructor(t, n, r, i) {
    var o;
    super(n.code, n.message),
      (this.operationType = r),
      (this.user = i),
      Object.setPrototypeOf(this, vs.prototype),
      (this.customData = {
        appName: t.name,
        tenantId: (o = t.tenantId) !== null && o !== void 0 ? o : void 0,
        _serverResponse: n.customData._serverResponse,
        operationType: r,
      });
  }
  static _fromErrorAndOperation(t, n, r, i) {
    return new vs(t, n, r, i);
  }
}
function Tg(e, t, n, r) {
  return (
    t === "reauthenticate"
      ? n._getReauthenticationResolver(e)
      : n._getIdTokenResponse(e)
  ).catch((o) => {
    throw o.code === "auth/multi-factor-auth-required"
      ? vs._fromErrorAndOperation(e, o, t, r)
      : o;
  });
}
async function JS(e, t, n = !1) {
  const r = await Oi(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
  return Er._forOperation(e, "link", r);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function QS(e, t, n = !1) {
  const { auth: r } = e;
  if (lt(r.app)) return Promise.reject(on(r));
  const i = "reauthenticate";
  try {
    const o = await Oi(e, Tg(r, i, t, e), n);
    O(o.idToken, r, "internal-error");
    const s = Ic(o.idToken);
    O(s, r, "internal-error");
    const { sub: a } = s;
    return O(e.uid === a, r, "user-mismatch"), Er._forOperation(e, i, o);
  } catch (o) {
    throw (
      ((o == null ? void 0 : o.code) === "auth/user-not-found" &&
        Ge(r, "user-mismatch"),
      o)
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function xg(e, t, n = !1) {
  if (lt(e.app)) return Promise.reject(on(e));
  const r = "signIn",
    i = await Tg(e, r, t),
    o = await Er._fromIdTokenResponse(e, r, i);
  return n || (await e._updateCurrentUser(o.user)), o;
}
async function XS(e, t) {
  return xg(Hn(e), t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function YS(e) {
  const t = Hn(e);
  t._getPasswordPolicyInternal() && (await t._updatePasswordPolicy());
}
function ZS(e, t, n) {
  return lt(e.app)
    ? Promise.reject(on(e))
    : XS(Fe(e), br.credential(t, n)).catch(async (r) => {
        throw (
          (r.code === "auth/password-does-not-meet-requirements" && YS(e), r)
        );
      });
}
function e1(e, t, n, r) {
  return Fe(e).onIdTokenChanged(t, n, r);
}
function t1(e, t, n) {
  return Fe(e).beforeAuthStateChanged(t, n);
}
function n1(e, t, n, r) {
  return Fe(e).onAuthStateChanged(t, n, r);
}
function r1(e) {
  return Fe(e).signOut();
}
const ws = "__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ig {
  constructor(t, n) {
    (this.storageRetriever = t), (this.type = n);
  }
  _isAvailable() {
    try {
      return this.storage
        ? (this.storage.setItem(ws, "1"),
          this.storage.removeItem(ws),
          Promise.resolve(!0))
        : Promise.resolve(!1);
    } catch {
      return Promise.resolve(!1);
    }
  }
  _set(t, n) {
    return this.storage.setItem(t, JSON.stringify(n)), Promise.resolve();
  }
  _get(t) {
    const n = this.storage.getItem(t);
    return Promise.resolve(n ? JSON.parse(n) : null);
  }
  _remove(t) {
    return this.storage.removeItem(t), Promise.resolve();
  }
  get storage() {
    return this.storageRetriever();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function i1() {
  const e = me();
  return Rc(e) || Js(e);
}
const o1 = 1e3,
  s1 = 10;
class Rg extends Ig {
  constructor() {
    super(() => window.localStorage, "LOCAL"),
      (this.boundEventHandler = (t, n) => this.onStorageEvent(t, n)),
      (this.listeners = {}),
      (this.localCache = {}),
      (this.pollTimer = null),
      (this.safariLocalStorageNotSynced = i1() && CS()),
      (this.fallbackToPolling = Eg()),
      (this._shouldAllowMigration = !0);
  }
  forAllChangedKeys(t) {
    for (const n of Object.keys(this.listeners)) {
      const r = this.storage.getItem(n),
        i = this.localCache[n];
      r !== i && t(n, i, r);
    }
  }
  onStorageEvent(t, n = !1) {
    if (!t.key) {
      this.forAllChangedKeys((s, a, l) => {
        this.notifyListeners(s, l);
      });
      return;
    }
    const r = t.key;
    if (
      (n ? this.detachListener() : this.stopPolling(),
      this.safariLocalStorageNotSynced)
    ) {
      const s = this.storage.getItem(r);
      if (t.newValue !== s)
        t.newValue !== null
          ? this.storage.setItem(r, t.newValue)
          : this.storage.removeItem(r);
      else if (this.localCache[r] === t.newValue && !n) return;
    }
    const i = () => {
        const s = this.storage.getItem(r);
        (!n && this.localCache[r] === s) || this.notifyListeners(r, s);
      },
      o = this.storage.getItem(r);
    kS() && o !== t.newValue && t.newValue !== t.oldValue
      ? setTimeout(i, s1)
      : i();
  }
  notifyListeners(t, n) {
    this.localCache[t] = n;
    const r = this.listeners[t];
    if (r) for (const i of Array.from(r)) i(n && JSON.parse(n));
  }
  startPolling() {
    this.stopPolling(),
      (this.pollTimer = setInterval(() => {
        this.forAllChangedKeys((t, n, r) => {
          this.onStorageEvent(
            new StorageEvent("storage", { key: t, oldValue: n, newValue: r }),
            !0
          );
        });
      }, o1));
  }
  stopPolling() {
    this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
  }
  attachListener() {
    window.addEventListener("storage", this.boundEventHandler);
  }
  detachListener() {
    window.removeEventListener("storage", this.boundEventHandler);
  }
  _addListener(t, n) {
    Object.keys(this.listeners).length === 0 &&
      (this.fallbackToPolling ? this.startPolling() : this.attachListener()),
      this.listeners[t] ||
        ((this.listeners[t] = new Set()),
        (this.localCache[t] = this.storage.getItem(t))),
      this.listeners[t].add(n);
  }
  _removeListener(t, n) {
    this.listeners[t] &&
      (this.listeners[t].delete(n),
      this.listeners[t].size === 0 && delete this.listeners[t]),
      Object.keys(this.listeners).length === 0 &&
        (this.detachListener(), this.stopPolling());
  }
  async _set(t, n) {
    await super._set(t, n), (this.localCache[t] = JSON.stringify(n));
  }
  async _get(t) {
    const n = await super._get(t);
    return (this.localCache[t] = JSON.stringify(n)), n;
  }
  async _remove(t) {
    await super._remove(t), delete this.localCache[t];
  }
}
Rg.type = "LOCAL";
const a1 = Rg;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Pg extends Ig {
  constructor() {
    super(() => window.sessionStorage, "SESSION");
  }
  _addListener(t, n) {}
  _removeListener(t, n) {}
}
Pg.type = "SESSION";
const Ng = Pg;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function l1(e) {
  return Promise.all(
    e.map(async (t) => {
      try {
        return { fulfilled: !0, value: await t };
      } catch (n) {
        return { fulfilled: !1, reason: n };
      }
    })
  );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Xs {
  constructor(t) {
    (this.eventTarget = t),
      (this.handlersMap = {}),
      (this.boundEventHandler = this.handleEvent.bind(this));
  }
  static _getInstance(t) {
    const n = this.receivers.find((i) => i.isListeningto(t));
    if (n) return n;
    const r = new Xs(t);
    return this.receivers.push(r), r;
  }
  isListeningto(t) {
    return this.eventTarget === t;
  }
  async handleEvent(t) {
    const n = t,
      { eventId: r, eventType: i, data: o } = n.data,
      s = this.handlersMap[i];
    if (!(s != null && s.size)) return;
    n.ports[0].postMessage({ status: "ack", eventId: r, eventType: i });
    const a = Array.from(s).map(async (u) => u(n.origin, o)),
      l = await l1(a);
    n.ports[0].postMessage({
      status: "done",
      eventId: r,
      eventType: i,
      response: l,
    });
  }
  _subscribe(t, n) {
    Object.keys(this.handlersMap).length === 0 &&
      this.eventTarget.addEventListener("message", this.boundEventHandler),
      this.handlersMap[t] || (this.handlersMap[t] = new Set()),
      this.handlersMap[t].add(n);
  }
  _unsubscribe(t, n) {
    this.handlersMap[t] && n && this.handlersMap[t].delete(n),
      (!n || this.handlersMap[t].size === 0) && delete this.handlersMap[t],
      Object.keys(this.handlersMap).length === 0 &&
        this.eventTarget.removeEventListener("message", this.boundEventHandler);
  }
}
Xs.receivers = [];
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function bc(e = "", t = 10) {
  let n = "";
  for (let r = 0; r < t; r++) n += Math.floor(Math.random() * 10);
  return e + n;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class u1 {
  constructor(t) {
    (this.target = t), (this.handlers = new Set());
  }
  removeMessageHandler(t) {
    t.messageChannel &&
      (t.messageChannel.port1.removeEventListener("message", t.onMessage),
      t.messageChannel.port1.close()),
      this.handlers.delete(t);
  }
  async _send(t, n, r = 50) {
    const i = typeof MessageChannel < "u" ? new MessageChannel() : null;
    if (!i) throw new Error("connection_unavailable");
    let o, s;
    return new Promise((a, l) => {
      const u = bc("", 20);
      i.port1.start();
      const c = setTimeout(() => {
        l(new Error("unsupported_event"));
      }, r);
      (s = {
        messageChannel: i,
        onMessage(d) {
          const f = d;
          if (f.data.eventId === u)
            switch (f.data.status) {
              case "ack":
                clearTimeout(c),
                  (o = setTimeout(() => {
                    l(new Error("timeout"));
                  }, 3e3));
                break;
              case "done":
                clearTimeout(o), a(f.data.response);
                break;
              default:
                clearTimeout(c),
                  clearTimeout(o),
                  l(new Error("invalid_response"));
                break;
            }
        },
      }),
        this.handlers.add(s),
        i.port1.addEventListener("message", s.onMessage),
        this.target.postMessage({ eventType: t, eventId: u, data: n }, [
          i.port2,
        ]);
    }).finally(() => {
      s && this.removeMessageHandler(s);
    });
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ft() {
  return window;
}
function c1(e) {
  ft().location.href = e;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Og() {
  return (
    typeof ft().WorkerGlobalScope < "u" &&
    typeof ft().importScripts == "function"
  );
}
async function d1() {
  if (!(navigator != null && navigator.serviceWorker)) return null;
  try {
    return (await navigator.serviceWorker.ready).active;
  } catch {
    return null;
  }
}
function f1() {
  var e;
  return (
    ((e = navigator == null ? void 0 : navigator.serviceWorker) === null ||
    e === void 0
      ? void 0
      : e.controller) || null
  );
}
function h1() {
  return Og() ? self : null;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const bg = "firebaseLocalStorageDb",
  p1 = 1,
  _s = "firebaseLocalStorage",
  Ag = "fbase_key";
class Ki {
  constructor(t) {
    this.request = t;
  }
  toPromise() {
    return new Promise((t, n) => {
      this.request.addEventListener("success", () => {
        t(this.request.result);
      }),
        this.request.addEventListener("error", () => {
          n(this.request.error);
        });
    });
  }
}
function Ys(e, t) {
  return e.transaction([_s], t ? "readwrite" : "readonly").objectStore(_s);
}
function m1() {
  const e = indexedDB.deleteDatabase(bg);
  return new Ki(e).toPromise();
}
function ou() {
  const e = indexedDB.open(bg, p1);
  return new Promise((t, n) => {
    e.addEventListener("error", () => {
      n(e.error);
    }),
      e.addEventListener("upgradeneeded", () => {
        const r = e.result;
        try {
          r.createObjectStore(_s, { keyPath: Ag });
        } catch (i) {
          n(i);
        }
      }),
      e.addEventListener("success", async () => {
        const r = e.result;
        r.objectStoreNames.contains(_s)
          ? t(r)
          : (r.close(), await m1(), t(await ou()));
      });
  });
}
async function jf(e, t, n) {
  const r = Ys(e, !0).put({ [Ag]: t, value: n });
  return new Ki(r).toPromise();
}
async function g1(e, t) {
  const n = Ys(e, !1).get(t),
    r = await new Ki(n).toPromise();
  return r === void 0 ? null : r.value;
}
function Ff(e, t) {
  const n = Ys(e, !0).delete(t);
  return new Ki(n).toPromise();
}
const y1 = 800,
  v1 = 3;
class Lg {
  constructor() {
    (this.type = "LOCAL"),
      (this._shouldAllowMigration = !0),
      (this.listeners = {}),
      (this.localCache = {}),
      (this.pollTimer = null),
      (this.pendingWrites = 0),
      (this.receiver = null),
      (this.sender = null),
      (this.serviceWorkerReceiverAvailable = !1),
      (this.activeServiceWorker = null),
      (this._workerInitializationPromise =
        this.initializeServiceWorkerMessaging().then(
          () => {},
          () => {}
        ));
  }
  async _openDb() {
    return this.db ? this.db : ((this.db = await ou()), this.db);
  }
  async _withRetries(t) {
    let n = 0;
    for (;;)
      try {
        const r = await this._openDb();
        return await t(r);
      } catch (r) {
        if (n++ > v1) throw r;
        this.db && (this.db.close(), (this.db = void 0));
      }
  }
  async initializeServiceWorkerMessaging() {
    return Og() ? this.initializeReceiver() : this.initializeSender();
  }
  async initializeReceiver() {
    (this.receiver = Xs._getInstance(h1())),
      this.receiver._subscribe("keyChanged", async (t, n) => ({
        keyProcessed: (await this._poll()).includes(n.key),
      })),
      this.receiver._subscribe("ping", async (t, n) => ["keyChanged"]);
  }
  async initializeSender() {
    var t, n;
    if (((this.activeServiceWorker = await d1()), !this.activeServiceWorker))
      return;
    this.sender = new u1(this.activeServiceWorker);
    const r = await this.sender._send("ping", {}, 800);
    r &&
      !((t = r[0]) === null || t === void 0) &&
      t.fulfilled &&
      !((n = r[0]) === null || n === void 0) &&
      n.value.includes("keyChanged") &&
      (this.serviceWorkerReceiverAvailable = !0);
  }
  async notifyServiceWorker(t) {
    if (
      !(
        !this.sender ||
        !this.activeServiceWorker ||
        f1() !== this.activeServiceWorker
      )
    )
      try {
        await this.sender._send(
          "keyChanged",
          { key: t },
          this.serviceWorkerReceiverAvailable ? 800 : 50
        );
      } catch {}
  }
  async _isAvailable() {
    try {
      if (!indexedDB) return !1;
      const t = await ou();
      return await jf(t, ws, "1"), await Ff(t, ws), !0;
    } catch {}
    return !1;
  }
  async _withPendingWrite(t) {
    this.pendingWrites++;
    try {
      await t();
    } finally {
      this.pendingWrites--;
    }
  }
  async _set(t, n) {
    return this._withPendingWrite(
      async () => (
        await this._withRetries((r) => jf(r, t, n)),
        (this.localCache[t] = n),
        this.notifyServiceWorker(t)
      )
    );
  }
  async _get(t) {
    const n = await this._withRetries((r) => g1(r, t));
    return (this.localCache[t] = n), n;
  }
  async _remove(t) {
    return this._withPendingWrite(
      async () => (
        await this._withRetries((n) => Ff(n, t)),
        delete this.localCache[t],
        this.notifyServiceWorker(t)
      )
    );
  }
  async _poll() {
    const t = await this._withRetries((i) => {
      const o = Ys(i, !1).getAll();
      return new Ki(o).toPromise();
    });
    if (!t) return [];
    if (this.pendingWrites !== 0) return [];
    const n = [],
      r = new Set();
    if (t.length !== 0)
      for (const { fbase_key: i, value: o } of t)
        r.add(i),
          JSON.stringify(this.localCache[i]) !== JSON.stringify(o) &&
            (this.notifyListeners(i, o), n.push(i));
    for (const i of Object.keys(this.localCache))
      this.localCache[i] &&
        !r.has(i) &&
        (this.notifyListeners(i, null), n.push(i));
    return n;
  }
  notifyListeners(t, n) {
    this.localCache[t] = n;
    const r = this.listeners[t];
    if (r) for (const i of Array.from(r)) i(n);
  }
  startPolling() {
    this.stopPolling(),
      (this.pollTimer = setInterval(async () => this._poll(), y1));
  }
  stopPolling() {
    this.pollTimer && (clearInterval(this.pollTimer), (this.pollTimer = null));
  }
  _addListener(t, n) {
    Object.keys(this.listeners).length === 0 && this.startPolling(),
      this.listeners[t] || ((this.listeners[t] = new Set()), this._get(t)),
      this.listeners[t].add(n);
  }
  _removeListener(t, n) {
    this.listeners[t] &&
      (this.listeners[t].delete(n),
      this.listeners[t].size === 0 && delete this.listeners[t]),
      Object.keys(this.listeners).length === 0 && this.stopPolling();
  }
}
Lg.type = "LOCAL";
const w1 = Lg;
new Vi(3e4, 6e4);
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Dg(e, t) {
  return t
    ? _t(t)
    : (O(e._popupRedirectResolver, e, "argument-error"),
      e._popupRedirectResolver);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ac extends Pc {
  constructor(t) {
    super("custom", "custom"), (this.params = t);
  }
  _getIdTokenResponse(t) {
    return fr(t, this._buildIdpRequest());
  }
  _linkToIdToken(t, n) {
    return fr(t, this._buildIdpRequest(n));
  }
  _getReauthenticationResolver(t) {
    return fr(t, this._buildIdpRequest());
  }
  _buildIdpRequest(t) {
    const n = {
      requestUri: this.params.requestUri,
      sessionId: this.params.sessionId,
      postBody: this.params.postBody,
      tenantId: this.params.tenantId,
      pendingToken: this.params.pendingToken,
      returnSecureToken: !0,
      returnIdpCredential: !0,
    };
    return t && (n.idToken = t), n;
  }
}
function _1(e) {
  return xg(e.auth, new Ac(e), e.bypassAuthState);
}
function E1(e) {
  const { auth: t, user: n } = e;
  return O(n, t, "internal-error"), QS(n, new Ac(e), e.bypassAuthState);
}
async function S1(e) {
  const { auth: t, user: n } = e;
  return O(n, t, "internal-error"), JS(n, new Ac(e), e.bypassAuthState);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ug {
  constructor(t, n, r, i, o = !1) {
    (this.auth = t),
      (this.resolver = r),
      (this.user = i),
      (this.bypassAuthState = o),
      (this.pendingPromise = null),
      (this.eventManager = null),
      (this.filter = Array.isArray(n) ? n : [n]);
  }
  execute() {
    return new Promise(async (t, n) => {
      this.pendingPromise = { resolve: t, reject: n };
      try {
        (this.eventManager = await this.resolver._initialize(this.auth)),
          await this.onExecution(),
          this.eventManager.registerConsumer(this);
      } catch (r) {
        this.reject(r);
      }
    });
  }
  async onAuthEvent(t) {
    const {
      urlResponse: n,
      sessionId: r,
      postBody: i,
      tenantId: o,
      error: s,
      type: a,
    } = t;
    if (s) {
      this.reject(s);
      return;
    }
    const l = {
      auth: this.auth,
      requestUri: n,
      sessionId: r,
      tenantId: o || void 0,
      postBody: i || void 0,
      user: this.user,
      bypassAuthState: this.bypassAuthState,
    };
    try {
      this.resolve(await this.getIdpTask(a)(l));
    } catch (u) {
      this.reject(u);
    }
  }
  onError(t) {
    this.reject(t);
  }
  getIdpTask(t) {
    switch (t) {
      case "signInViaPopup":
      case "signInViaRedirect":
        return _1;
      case "linkViaPopup":
      case "linkViaRedirect":
        return S1;
      case "reauthViaPopup":
      case "reauthViaRedirect":
        return E1;
      default:
        Ge(this.auth, "internal-error");
    }
  }
  resolve(t) {
    xt(this.pendingPromise, "Pending promise was never set"),
      this.pendingPromise.resolve(t),
      this.unregisterAndCleanUp();
  }
  reject(t) {
    xt(this.pendingPromise, "Pending promise was never set"),
      this.pendingPromise.reject(t),
      this.unregisterAndCleanUp();
  }
  unregisterAndCleanUp() {
    this.eventManager && this.eventManager.unregisterConsumer(this),
      (this.pendingPromise = null),
      this.cleanUp();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const k1 = new Vi(2e3, 1e4);
async function C1(e, t, n) {
  if (lt(e.app))
    return Promise.reject(tt(e, "operation-not-supported-in-this-environment"));
  const r = Hn(e);
  iS(e, t, Oc);
  const i = Dg(r, n);
  return new Cn(r, "signInViaPopup", t, i).executeNotNull();
}
class Cn extends Ug {
  constructor(t, n, r, i, o) {
    super(t, n, i, o),
      (this.provider = r),
      (this.authWindow = null),
      (this.pollId = null),
      Cn.currentPopupAction && Cn.currentPopupAction.cancel(),
      (Cn.currentPopupAction = this);
  }
  async executeNotNull() {
    const t = await this.execute();
    return O(t, this.auth, "internal-error"), t;
  }
  async onExecution() {
    xt(this.filter.length === 1, "Popup operations only handle one event");
    const t = bc();
    (this.authWindow = await this.resolver._openPopup(
      this.auth,
      this.provider,
      this.filter[0],
      t
    )),
      (this.authWindow.associatedEvent = t),
      this.resolver._originValidation(this.auth).catch((n) => {
        this.reject(n);
      }),
      this.resolver._isIframeWebStorageSupported(this.auth, (n) => {
        n || this.reject(tt(this.auth, "web-storage-unsupported"));
      }),
      this.pollUserCancellation();
  }
  get eventId() {
    var t;
    return (
      ((t = this.authWindow) === null || t === void 0
        ? void 0
        : t.associatedEvent) || null
    );
  }
  cancel() {
    this.reject(tt(this.auth, "cancelled-popup-request"));
  }
  cleanUp() {
    this.authWindow && this.authWindow.close(),
      this.pollId && window.clearTimeout(this.pollId),
      (this.authWindow = null),
      (this.pollId = null),
      (Cn.currentPopupAction = null);
  }
  pollUserCancellation() {
    const t = () => {
      var n, r;
      if (
        !(
          (r =
            (n = this.authWindow) === null || n === void 0
              ? void 0
              : n.window) === null || r === void 0
        ) &&
        r.closed
      ) {
        this.pollId = window.setTimeout(() => {
          (this.pollId = null),
            this.reject(tt(this.auth, "popup-closed-by-user"));
        }, 8e3);
        return;
      }
      this.pollId = window.setTimeout(t, k1.get());
    };
    t();
  }
}
Cn.currentPopupAction = null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const T1 = "pendingRedirect",
  Uo = new Map();
class x1 extends Ug {
  constructor(t, n, r = !1) {
    super(
      t,
      ["signInViaRedirect", "linkViaRedirect", "reauthViaRedirect", "unknown"],
      n,
      void 0,
      r
    ),
      (this.eventId = null);
  }
  async execute() {
    let t = Uo.get(this.auth._key());
    if (!t) {
      try {
        const r = (await I1(this.resolver, this.auth))
          ? await super.execute()
          : null;
        t = () => Promise.resolve(r);
      } catch (n) {
        t = () => Promise.reject(n);
      }
      Uo.set(this.auth._key(), t);
    }
    return (
      this.bypassAuthState ||
        Uo.set(this.auth._key(), () => Promise.resolve(null)),
      t()
    );
  }
  async onAuthEvent(t) {
    if (t.type === "signInViaRedirect") return super.onAuthEvent(t);
    if (t.type === "unknown") {
      this.resolve(null);
      return;
    }
    if (t.eventId) {
      const n = await this.auth._redirectUserForId(t.eventId);
      if (n) return (this.user = n), super.onAuthEvent(t);
      this.resolve(null);
    }
  }
  async onExecution() {}
  cleanUp() {}
}
async function I1(e, t) {
  const n = N1(t),
    r = P1(e);
  if (!(await r._isAvailable())) return !1;
  const i = (await r._get(n)) === "true";
  return await r._remove(n), i;
}
function R1(e, t) {
  Uo.set(e._key(), t);
}
function P1(e) {
  return _t(e._redirectPersistence);
}
function N1(e) {
  return Do(T1, e.config.apiKey, e.name);
}
async function O1(e, t, n = !1) {
  if (lt(e.app)) return Promise.reject(on(e));
  const r = Hn(e),
    i = Dg(r, t),
    s = await new x1(r, i, n).execute();
  return (
    s &&
      !n &&
      (delete s.user._redirectEventId,
      await r._persistUserIfCurrent(s.user),
      await r._setRedirectUser(null, t)),
    s
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const b1 = 10 * 60 * 1e3;
class A1 {
  constructor(t) {
    (this.auth = t),
      (this.cachedEventUids = new Set()),
      (this.consumers = new Set()),
      (this.queuedRedirectEvent = null),
      (this.hasHandledPotentialRedirect = !1),
      (this.lastProcessedEventTime = Date.now());
  }
  registerConsumer(t) {
    this.consumers.add(t),
      this.queuedRedirectEvent &&
        this.isEventForConsumer(this.queuedRedirectEvent, t) &&
        (this.sendToConsumer(this.queuedRedirectEvent, t),
        this.saveEventToCache(this.queuedRedirectEvent),
        (this.queuedRedirectEvent = null));
  }
  unregisterConsumer(t) {
    this.consumers.delete(t);
  }
  onEvent(t) {
    if (this.hasEventBeenHandled(t)) return !1;
    let n = !1;
    return (
      this.consumers.forEach((r) => {
        this.isEventForConsumer(t, r) &&
          ((n = !0), this.sendToConsumer(t, r), this.saveEventToCache(t));
      }),
      this.hasHandledPotentialRedirect ||
        !L1(t) ||
        ((this.hasHandledPotentialRedirect = !0),
        n || ((this.queuedRedirectEvent = t), (n = !0))),
      n
    );
  }
  sendToConsumer(t, n) {
    var r;
    if (t.error && !Mg(t)) {
      const i =
        ((r = t.error.code) === null || r === void 0
          ? void 0
          : r.split("auth/")[1]) || "internal-error";
      n.onError(tt(this.auth, i));
    } else n.onAuthEvent(t);
  }
  isEventForConsumer(t, n) {
    const r = n.eventId === null || (!!t.eventId && t.eventId === n.eventId);
    return n.filter.includes(t.type) && r;
  }
  hasEventBeenHandled(t) {
    return (
      Date.now() - this.lastProcessedEventTime >= b1 &&
        this.cachedEventUids.clear(),
      this.cachedEventUids.has(Bf(t))
    );
  }
  saveEventToCache(t) {
    this.cachedEventUids.add(Bf(t)), (this.lastProcessedEventTime = Date.now());
  }
}
function Bf(e) {
  return [e.type, e.eventId, e.sessionId, e.tenantId]
    .filter((t) => t)
    .join("-");
}
function Mg({ type: e, error: t }) {
  return (
    e === "unknown" && (t == null ? void 0 : t.code) === "auth/no-auth-event"
  );
}
function L1(e) {
  switch (e.type) {
    case "signInViaRedirect":
    case "linkViaRedirect":
    case "reauthViaRedirect":
      return !0;
    case "unknown":
      return Mg(e);
    default:
      return !1;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function D1(e, t = {}) {
  return pn(e, "GET", "/v1/projects", t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const U1 = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  M1 = /^https?/;
async function j1(e) {
  if (e.config.emulator) return;
  const { authorizedDomains: t } = await D1(e);
  for (const n of t)
    try {
      if (F1(n)) return;
    } catch {}
  Ge(e, "unauthorized-domain");
}
function F1(e) {
  const t = ru(),
    { protocol: n, hostname: r } = new URL(t);
  if (e.startsWith("chrome-extension://")) {
    const s = new URL(e);
    return s.hostname === "" && r === ""
      ? n === "chrome-extension:" &&
          e.replace("chrome-extension://", "") ===
            t.replace("chrome-extension://", "")
      : n === "chrome-extension:" && s.hostname === r;
  }
  if (!M1.test(n)) return !1;
  if (U1.test(e)) return r === e;
  const i = e.replace(/\./g, "\\.");
  return new RegExp("^(.+\\." + i + "|" + i + ")$", "i").test(r);
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const B1 = new Vi(3e4, 6e4);
function zf() {
  const e = ft().___jsl;
  if (e != null && e.H) {
    for (const t of Object.keys(e.H))
      if (
        ((e.H[t].r = e.H[t].r || []),
        (e.H[t].L = e.H[t].L || []),
        (e.H[t].r = [...e.H[t].L]),
        e.CP)
      )
        for (let n = 0; n < e.CP.length; n++) e.CP[n] = null;
  }
}
function z1(e) {
  return new Promise((t, n) => {
    var r, i, o;
    function s() {
      zf(),
        gapi.load("gapi.iframes", {
          callback: () => {
            t(gapi.iframes.getContext());
          },
          ontimeout: () => {
            zf(), n(tt(e, "network-request-failed"));
          },
          timeout: B1.get(),
        });
    }
    if (
      !(
        (i = (r = ft().gapi) === null || r === void 0 ? void 0 : r.iframes) ===
          null || i === void 0
      ) &&
      i.Iframe
    )
      t(gapi.iframes.getContext());
    else if (!((o = ft().gapi) === null || o === void 0) && o.load) s();
    else {
      const a = AS("iframefcb");
      return (
        (ft()[a] = () => {
          gapi.load ? s() : n(tt(e, "network-request-failed"));
        }),
        kg(`${bS()}?onload=${a}`).catch((l) => n(l))
      );
    }
  }).catch((t) => {
    throw ((Mo = null), t);
  });
}
let Mo = null;
function $1(e) {
  return (Mo = Mo || z1(e)), Mo;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const H1 = new Vi(5e3, 15e3),
  V1 = "__/auth/iframe",
  W1 = "emulator/auth/iframe",
  K1 = {
    style: { position: "absolute", top: "-100px", width: "1px", height: "1px" },
    "aria-hidden": "true",
    tabindex: "-1",
  },
  G1 = new Map([
    ["identitytoolkit.googleapis.com", "p"],
    ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
    ["test-identitytoolkit.sandbox.googleapis.com", "t"],
  ]);
function q1(e) {
  const t = e.config;
  O(t.authDomain, e, "auth-domain-config-required");
  const n = t.emulator ? xc(t, W1) : `https://${e.config.authDomain}/${V1}`,
    r = { apiKey: t.apiKey, appName: e.name, v: Or },
    i = G1.get(e.config.apiHost);
  i && (r.eid = i);
  const o = e._getFrameworks();
  return o.length && (r.fw = o.join(",")), `${n}?${Hi(r).slice(1)}`;
}
async function J1(e) {
  const t = await $1(e),
    n = ft().gapi;
  return (
    O(n, e, "internal-error"),
    t.open(
      {
        where: document.body,
        url: q1(e),
        messageHandlersFilter: n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
        attributes: K1,
        dontclear: !0,
      },
      (r) =>
        new Promise(async (i, o) => {
          await r.restyle({ setHideOnLeave: !1 });
          const s = tt(e, "network-request-failed"),
            a = ft().setTimeout(() => {
              o(s);
            }, H1.get());
          function l() {
            ft().clearTimeout(a), i(r);
          }
          r.ping(l).then(l, () => {
            o(s);
          });
        })
    )
  );
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Q1 = {
    location: "yes",
    resizable: "yes",
    statusbar: "yes",
    toolbar: "no",
  },
  X1 = 500,
  Y1 = 600,
  Z1 = "_blank",
  ek = "http://localhost";
class $f {
  constructor(t) {
    (this.window = t), (this.associatedEvent = null);
  }
  close() {
    if (this.window)
      try {
        this.window.close();
      } catch {}
  }
}
function tk(e, t, n, r = X1, i = Y1) {
  const o = Math.max((window.screen.availHeight - i) / 2, 0).toString(),
    s = Math.max((window.screen.availWidth - r) / 2, 0).toString();
  let a = "";
  const l = Object.assign(Object.assign({}, Q1), {
      width: r.toString(),
      height: i.toString(),
      top: o,
      left: s,
    }),
    u = me().toLowerCase();
  n && (a = gg(u) ? Z1 : n), mg(u) && ((t = t || ek), (l.scrollbars = "yes"));
  const c = Object.entries(l).reduce((f, [v, g]) => `${f}${v}=${g},`, "");
  if (SS(u) && a !== "_self") return nk(t || "", a), new $f(null);
  const d = window.open(t || "", a, c);
  O(d, e, "popup-blocked");
  try {
    d.focus();
  } catch {}
  return new $f(d);
}
function nk(e, t) {
  const n = document.createElement("a");
  (n.href = e), (n.target = t);
  const r = document.createEvent("MouseEvent");
  r.initMouseEvent(
    "click",
    !0,
    !0,
    window,
    1,
    0,
    0,
    0,
    0,
    !1,
    !1,
    !1,
    !1,
    1,
    null
  ),
    n.dispatchEvent(r);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const rk = "__/auth/handler",
  ik = "emulator/auth/handler",
  ok = encodeURIComponent("fac");
async function Hf(e, t, n, r, i, o) {
  O(e.config.authDomain, e, "auth-domain-config-required"),
    O(e.config.apiKey, e, "invalid-api-key");
  const s = {
    apiKey: e.config.apiKey,
    appName: e.name,
    authType: n,
    redirectUrl: r,
    v: Or,
    eventId: i,
  };
  if (t instanceof Oc) {
    t.setDefaultLanguage(e.languageCode),
      (s.providerId = t.providerId || ""),
      K_(t.getCustomParameters()) ||
        (s.customParameters = JSON.stringify(t.getCustomParameters()));
    for (const [c, d] of Object.entries({})) s[c] = d;
  }
  if (t instanceof Wi) {
    const c = t.getScopes().filter((d) => d !== "");
    c.length > 0 && (s.scopes = c.join(","));
  }
  e.tenantId && (s.tid = e.tenantId);
  const a = s;
  for (const c of Object.keys(a)) a[c] === void 0 && delete a[c];
  const l = await e._getAppCheckToken(),
    u = l ? `#${ok}=${encodeURIComponent(l)}` : "";
  return `${sk(e)}?${Hi(a).slice(1)}${u}`;
}
function sk({ config: e }) {
  return e.emulator ? xc(e, ik) : `https://${e.authDomain}/${rk}`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Wa = "webStorageSupport";
class ak {
  constructor() {
    (this.eventManagers = {}),
      (this.iframes = {}),
      (this.originValidationPromises = {}),
      (this._redirectPersistence = Ng),
      (this._completeRedirectFn = O1),
      (this._overrideRedirectResult = R1);
  }
  async _openPopup(t, n, r, i) {
    var o;
    xt(
      (o = this.eventManagers[t._key()]) === null || o === void 0
        ? void 0
        : o.manager,
      "_initialize() not called before _openPopup()"
    );
    const s = await Hf(t, n, r, ru(), i);
    return tk(t, s, bc());
  }
  async _openRedirect(t, n, r, i) {
    await this._originValidation(t);
    const o = await Hf(t, n, r, ru(), i);
    return c1(o), new Promise(() => {});
  }
  _initialize(t) {
    const n = t._key();
    if (this.eventManagers[n]) {
      const { manager: i, promise: o } = this.eventManagers[n];
      return i
        ? Promise.resolve(i)
        : (xt(o, "If manager is not set, promise should be"), o);
    }
    const r = this.initAndGetManager(t);
    return (
      (this.eventManagers[n] = { promise: r }),
      r.catch(() => {
        delete this.eventManagers[n];
      }),
      r
    );
  }
  async initAndGetManager(t) {
    const n = await J1(t),
      r = new A1(t);
    return (
      n.register(
        "authEvent",
        (i) => (
          O(i == null ? void 0 : i.authEvent, t, "invalid-auth-event"),
          { status: r.onEvent(i.authEvent) ? "ACK" : "ERROR" }
        ),
        gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
      ),
      (this.eventManagers[t._key()] = { manager: r }),
      (this.iframes[t._key()] = n),
      r
    );
  }
  _isIframeWebStorageSupported(t, n) {
    this.iframes[t._key()].send(
      Wa,
      { type: Wa },
      (i) => {
        var o;
        const s =
          (o = i == null ? void 0 : i[0]) === null || o === void 0
            ? void 0
            : o[Wa];
        s !== void 0 && n(!!s), Ge(t, "internal-error");
      },
      gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
    );
  }
  _originValidation(t) {
    const n = t._key();
    return (
      this.originValidationPromises[n] ||
        (this.originValidationPromises[n] = j1(t)),
      this.originValidationPromises[n]
    );
  }
  get _shouldInitProactively() {
    return Eg() || Rc() || Js();
  }
}
const lk = ak;
var Vf = "@firebase/auth",
  Wf = "1.7.5";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uk {
  constructor(t) {
    (this.auth = t), (this.internalListeners = new Map());
  }
  getUid() {
    var t;
    return (
      this.assertAuthConfigured(),
      ((t = this.auth.currentUser) === null || t === void 0 ? void 0 : t.uid) ||
        null
    );
  }
  async getToken(t) {
    return (
      this.assertAuthConfigured(),
      await this.auth._initializationPromise,
      this.auth.currentUser
        ? { accessToken: await this.auth.currentUser.getIdToken(t) }
        : null
    );
  }
  addAuthTokenListener(t) {
    if ((this.assertAuthConfigured(), this.internalListeners.has(t))) return;
    const n = this.auth.onIdTokenChanged((r) => {
      t((r == null ? void 0 : r.stsTokenManager.accessToken) || null);
    });
    this.internalListeners.set(t, n), this.updateProactiveRefresh();
  }
  removeAuthTokenListener(t) {
    this.assertAuthConfigured();
    const n = this.internalListeners.get(t);
    n && (this.internalListeners.delete(t), n(), this.updateProactiveRefresh());
  }
  assertAuthConfigured() {
    O(
      this.auth._initializationPromise,
      "dependent-sdk-initialized-before-auth"
    );
  }
  updateProactiveRefresh() {
    this.internalListeners.size > 0
      ? this.auth._startProactiveRefresh()
      : this.auth._stopProactiveRefresh();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ck(e) {
  switch (e) {
    case "Node":
      return "node";
    case "ReactNative":
      return "rn";
    case "Worker":
      return "webworker";
    case "Cordova":
      return "cordova";
    case "WebExtension":
      return "web-extension";
    default:
      return;
  }
}
function dk(e) {
  _r(
    new Ln(
      "auth",
      (t, { options: n }) => {
        const r = t.getProvider("app").getImmediate(),
          i = t.getProvider("heartbeat"),
          o = t.getProvider("app-check-internal"),
          { apiKey: s, authDomain: a } = r.options;
        O(s && !s.includes(":"), "invalid-api-key", { appName: r.name });
        const l = {
            apiKey: s,
            authDomain: a,
            clientPlatform: e,
            apiHost: "identitytoolkit.googleapis.com",
            tokenApiHost: "securetoken.googleapis.com",
            apiScheme: "https",
            sdkClientVersion: Sg(e),
          },
          u = new PS(r, i, o, l);
        return jS(u, n), u;
      },
      "PUBLIC"
    )
      .setInstantiationMode("EXPLICIT")
      .setInstanceCreatedCallback((t, n, r) => {
        t.getProvider("auth-internal").initialize();
      })
  ),
    _r(
      new Ln(
        "auth-internal",
        (t) => {
          const n = Hn(t.getProvider("auth").getImmediate());
          return ((r) => new uk(r))(n);
        },
        "PRIVATE"
      ).setInstantiationMode("EXPLICIT")
    ),
    rn(Vf, Wf, ck(e)),
    rn(Vf, Wf, "esm2017");
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const fk = 5 * 60,
  hk = Zm("authIdTokenMaxAge") || fk;
let Kf = null;
const pk = (e) => async (t) => {
  const n = t && (await t.getIdTokenResult()),
    r = n && (new Date().getTime() - Date.parse(n.issuedAtTime)) / 1e3;
  if (r && r > hk) return;
  const i = n == null ? void 0 : n.token;
  Kf !== i &&
    ((Kf = i),
    await fetch(e, {
      method: i ? "POST" : "DELETE",
      headers: i ? { Authorization: `Bearer ${i}` } : {},
    }));
};
function mk(e = ig()) {
  const t = Sc(e, "auth");
  if (t.isInitialized()) return t.getImmediate();
  const n = MS(e, { popupRedirectResolver: lk, persistence: [w1, a1, Ng] }),
    r = Zm("authTokenSyncURL");
  if (r && typeof isSecureContext == "boolean" && isSecureContext) {
    const o = new URL(r, location.origin);
    if (location.origin === o.origin) {
      const s = pk(o.toString());
      t1(n, s, () => s(n.currentUser)), e1(n, (a) => s(a));
    }
  }
  const i = Xm("auth");
  return i && FS(n, `http://${i}`), n;
}
function gk() {
  var e, t;
  return (t =
    (e = document.getElementsByTagName("head")) === null || e === void 0
      ? void 0
      : e[0]) !== null && t !== void 0
    ? t
    : document;
}
NS({
  loadJS(e) {
    return new Promise((t, n) => {
      const r = document.createElement("script");
      r.setAttribute("src", e),
        (r.onload = t),
        (r.onerror = (i) => {
          const o = tt("internal-error");
          (o.customData = i), n(o);
        }),
        (r.type = "text/javascript"),
        (r.charset = "UTF-8"),
        gk().appendChild(r);
    });
  },
  gapiScript: "https://apis.google.com/js/api.js",
  recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
  recaptchaEnterpriseScript:
    "https://www.google.com/recaptcha/enterprise.js?render=",
});
dk("Browser");
var yk = "firebase",
  vk = "10.12.3";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ rn(yk, vk, "app");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const jg = "firebasestorage.googleapis.com",
  Fg = "storageBucket",
  wk = 2 * 60 * 1e3,
  _k = 10 * 60 * 1e3;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class X extends Nt {
  constructor(t, n, r = 0) {
    super(Ka(t), `Firebase Storage: ${n} (${Ka(t)})`),
      (this.status_ = r),
      (this.customData = { serverResponse: null }),
      (this._baseMessage = this.message),
      Object.setPrototypeOf(this, X.prototype);
  }
  get status() {
    return this.status_;
  }
  set status(t) {
    this.status_ = t;
  }
  _codeEquals(t) {
    return Ka(t) === this.code;
  }
  get serverResponse() {
    return this.customData.serverResponse;
  }
  set serverResponse(t) {
    (this.customData.serverResponse = t),
      this.customData.serverResponse
        ? (this.message = `${this._baseMessage}
${this.customData.serverResponse}`)
        : (this.message = this._baseMessage);
  }
}
var J;
(function (e) {
  (e.UNKNOWN = "unknown"),
    (e.OBJECT_NOT_FOUND = "object-not-found"),
    (e.BUCKET_NOT_FOUND = "bucket-not-found"),
    (e.PROJECT_NOT_FOUND = "project-not-found"),
    (e.QUOTA_EXCEEDED = "quota-exceeded"),
    (e.UNAUTHENTICATED = "unauthenticated"),
    (e.UNAUTHORIZED = "unauthorized"),
    (e.UNAUTHORIZED_APP = "unauthorized-app"),
    (e.RETRY_LIMIT_EXCEEDED = "retry-limit-exceeded"),
    (e.INVALID_CHECKSUM = "invalid-checksum"),
    (e.CANCELED = "canceled"),
    (e.INVALID_EVENT_NAME = "invalid-event-name"),
    (e.INVALID_URL = "invalid-url"),
    (e.INVALID_DEFAULT_BUCKET = "invalid-default-bucket"),
    (e.NO_DEFAULT_BUCKET = "no-default-bucket"),
    (e.CANNOT_SLICE_BLOB = "cannot-slice-blob"),
    (e.SERVER_FILE_WRONG_SIZE = "server-file-wrong-size"),
    (e.NO_DOWNLOAD_URL = "no-download-url"),
    (e.INVALID_ARGUMENT = "invalid-argument"),
    (e.INVALID_ARGUMENT_COUNT = "invalid-argument-count"),
    (e.APP_DELETED = "app-deleted"),
    (e.INVALID_ROOT_OPERATION = "invalid-root-operation"),
    (e.INVALID_FORMAT = "invalid-format"),
    (e.INTERNAL_ERROR = "internal-error"),
    (e.UNSUPPORTED_ENVIRONMENT = "unsupported-environment");
})(J || (J = {}));
function Ka(e) {
  return "storage/" + e;
}
function Lc() {
  const e =
    "An unknown error occurred, please check the error payload for server response.";
  return new X(J.UNKNOWN, e);
}
function Ek(e) {
  return new X(J.OBJECT_NOT_FOUND, "Object '" + e + "' does not exist.");
}
function Sk(e) {
  return new X(
    J.QUOTA_EXCEEDED,
    "Quota for bucket '" +
      e +
      "' exceeded, please view quota on https://firebase.google.com/pricing/."
  );
}
function kk() {
  const e =
    "User is not authenticated, please authenticate using Firebase Authentication and try again.";
  return new X(J.UNAUTHENTICATED, e);
}
function Ck() {
  return new X(
    J.UNAUTHORIZED_APP,
    "This app does not have permission to access Firebase Storage on this project."
  );
}
function Tk(e) {
  return new X(
    J.UNAUTHORIZED,
    "User does not have permission to access '" + e + "'."
  );
}
function xk() {
  return new X(
    J.RETRY_LIMIT_EXCEEDED,
    "Max retry time for operation exceeded, please try again."
  );
}
function Ik() {
  return new X(J.CANCELED, "User canceled the upload/download.");
}
function Rk(e) {
  return new X(J.INVALID_URL, "Invalid URL '" + e + "'.");
}
function Pk(e) {
  return new X(J.INVALID_DEFAULT_BUCKET, "Invalid default bucket '" + e + "'.");
}
function Nk() {
  return new X(
    J.NO_DEFAULT_BUCKET,
    "No default bucket found. Did you set the '" +
      Fg +
      "' property when initializing the app?"
  );
}
function Ok() {
  return new X(
    J.CANNOT_SLICE_BLOB,
    "Cannot slice blob for upload. Please retry the upload."
  );
}
function bk() {
  return new X(
    J.NO_DOWNLOAD_URL,
    "The given file does not have any download URLs."
  );
}
function Ak(e) {
  return new X(
    J.UNSUPPORTED_ENVIRONMENT,
    `${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`
  );
}
function su(e) {
  return new X(J.INVALID_ARGUMENT, e);
}
function Bg() {
  return new X(J.APP_DELETED, "The Firebase app was deleted.");
}
function Lk(e) {
  return new X(
    J.INVALID_ROOT_OPERATION,
    "The operation '" +
      e +
      "' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png')."
  );
}
function ci(e, t) {
  return new X(
    J.INVALID_FORMAT,
    "String does not match format '" + e + "': " + t
  );
}
function Wr(e) {
  throw new X(J.INTERNAL_ERROR, "Internal error: " + e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Oe {
  constructor(t, n) {
    (this.bucket = t), (this.path_ = n);
  }
  get path() {
    return this.path_;
  }
  get isRoot() {
    return this.path.length === 0;
  }
  fullServerUrl() {
    const t = encodeURIComponent;
    return "/b/" + t(this.bucket) + "/o/" + t(this.path);
  }
  bucketOnlyServerUrl() {
    return "/b/" + encodeURIComponent(this.bucket) + "/o";
  }
  static makeFromBucketSpec(t, n) {
    let r;
    try {
      r = Oe.makeFromUrl(t, n);
    } catch {
      return new Oe(t, "");
    }
    if (r.path === "") return r;
    throw Pk(t);
  }
  static makeFromUrl(t, n) {
    let r = null;
    const i = "([A-Za-z0-9.\\-_]+)";
    function o(_) {
      _.path.charAt(_.path.length - 1) === "/" &&
        (_.path_ = _.path_.slice(0, -1));
    }
    const s = "(/(.*))?$",
      a = new RegExp("^gs://" + i + s, "i"),
      l = { bucket: 1, path: 3 };
    function u(_) {
      _.path_ = decodeURIComponent(_.path);
    }
    const c = "v[A-Za-z0-9_]+",
      d = n.replace(/[.]/g, "\\."),
      f = "(/([^?#]*).*)?$",
      v = new RegExp(`^https?://${d}/${c}/b/${i}/o${f}`, "i"),
      g = { bucket: 1, path: 3 },
      y = n === jg ? "(?:storage.googleapis.com|storage.cloud.google.com)" : n,
      E = "([^?#]*)",
      h = new RegExp(`^https?://${y}/${i}/${E}`, "i"),
      m = [
        { regex: a, indices: l, postModify: o },
        { regex: v, indices: g, postModify: u },
        { regex: h, indices: { bucket: 1, path: 2 }, postModify: u },
      ];
    for (let _ = 0; _ < m.length; _++) {
      const k = m[_],
        x = k.regex.exec(t);
      if (x) {
        const I = x[k.indices.bucket];
        let R = x[k.indices.path];
        R || (R = ""), (r = new Oe(I, R)), k.postModify(r);
        break;
      }
    }
    if (r == null) throw Rk(t);
    return r;
  }
}
class Dk {
  constructor(t) {
    this.promise_ = Promise.reject(t);
  }
  getPromise() {
    return this.promise_;
  }
  cancel(t = !1) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Uk(e, t, n) {
  let r = 1,
    i = null,
    o = null,
    s = !1,
    a = 0;
  function l() {
    return a === 2;
  }
  let u = !1;
  function c(...E) {
    u || ((u = !0), t.apply(null, E));
  }
  function d(E) {
    i = setTimeout(() => {
      (i = null), e(v, l());
    }, E);
  }
  function f() {
    o && clearTimeout(o);
  }
  function v(E, ...h) {
    if (u) {
      f();
      return;
    }
    if (E) {
      f(), c.call(null, E, ...h);
      return;
    }
    if (l() || s) {
      f(), c.call(null, E, ...h);
      return;
    }
    r < 64 && (r *= 2);
    let m;
    a === 1 ? ((a = 2), (m = 0)) : (m = (r + Math.random()) * 1e3), d(m);
  }
  let g = !1;
  function y(E) {
    g ||
      ((g = !0),
      f(),
      !u &&
        (i !== null ? (E || (a = 2), clearTimeout(i), d(0)) : E || (a = 1)));
  }
  return (
    d(0),
    (o = setTimeout(() => {
      (s = !0), y(!0);
    }, n)),
    y
  );
}
function Mk(e) {
  e(!1);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function jk(e) {
  return e !== void 0;
}
function Fk(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function Dc(e) {
  return typeof e == "string" || e instanceof String;
}
function Gf(e) {
  return Uc() && e instanceof Blob;
}
function Uc() {
  return typeof Blob < "u";
}
function qf(e, t, n, r) {
  if (r < t) throw su(`Invalid value for '${e}'. Expected ${t} or greater.`);
  if (r > n) throw su(`Invalid value for '${e}'. Expected ${n} or less.`);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Mc(e, t, n) {
  let r = t;
  return n == null && (r = `https://${t}`), `${n}://${r}/v0${e}`;
}
function zg(e) {
  const t = encodeURIComponent;
  let n = "?";
  for (const r in e)
    if (e.hasOwnProperty(r)) {
      const i = t(r) + "=" + t(e[r]);
      n = n + i + "&";
    }
  return (n = n.slice(0, -1)), n;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var In;
(function (e) {
  (e[(e.NO_ERROR = 0)] = "NO_ERROR"),
    (e[(e.NETWORK_ERROR = 1)] = "NETWORK_ERROR"),
    (e[(e.ABORT = 2)] = "ABORT");
})(In || (In = {}));
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Bk(e, t) {
  const n = e >= 500 && e < 600,
    i = [408, 429].indexOf(e) !== -1,
    o = t.indexOf(e) !== -1;
  return n || i || o;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zk {
  constructor(t, n, r, i, o, s, a, l, u, c, d, f = !0) {
    (this.url_ = t),
      (this.method_ = n),
      (this.headers_ = r),
      (this.body_ = i),
      (this.successCodes_ = o),
      (this.additionalRetryCodes_ = s),
      (this.callback_ = a),
      (this.errorCallback_ = l),
      (this.timeout_ = u),
      (this.progressCallback_ = c),
      (this.connectionFactory_ = d),
      (this.retry = f),
      (this.pendingConnection_ = null),
      (this.backoffId_ = null),
      (this.canceled_ = !1),
      (this.appDelete_ = !1),
      (this.promise_ = new Promise((v, g) => {
        (this.resolve_ = v), (this.reject_ = g), this.start_();
      }));
  }
  start_() {
    const t = (r, i) => {
        if (i) {
          r(!1, new vo(!1, null, !0));
          return;
        }
        const o = this.connectionFactory_();
        this.pendingConnection_ = o;
        const s = (a) => {
          const l = a.loaded,
            u = a.lengthComputable ? a.total : -1;
          this.progressCallback_ !== null && this.progressCallback_(l, u);
        };
        this.progressCallback_ !== null && o.addUploadProgressListener(s),
          o
            .send(this.url_, this.method_, this.body_, this.headers_)
            .then(() => {
              this.progressCallback_ !== null &&
                o.removeUploadProgressListener(s),
                (this.pendingConnection_ = null);
              const a = o.getErrorCode() === In.NO_ERROR,
                l = o.getStatus();
              if (!a || (Bk(l, this.additionalRetryCodes_) && this.retry)) {
                const c = o.getErrorCode() === In.ABORT;
                r(!1, new vo(!1, null, c));
                return;
              }
              const u = this.successCodes_.indexOf(l) !== -1;
              r(!0, new vo(u, o));
            });
      },
      n = (r, i) => {
        const o = this.resolve_,
          s = this.reject_,
          a = i.connection;
        if (i.wasSuccessCode)
          try {
            const l = this.callback_(a, a.getResponse());
            jk(l) ? o(l) : o();
          } catch (l) {
            s(l);
          }
        else if (a !== null) {
          const l = Lc();
          (l.serverResponse = a.getErrorText()),
            this.errorCallback_ ? s(this.errorCallback_(a, l)) : s(l);
        } else if (i.canceled) {
          const l = this.appDelete_ ? Bg() : Ik();
          s(l);
        } else {
          const l = xk();
          s(l);
        }
      };
    this.canceled_
      ? n(!1, new vo(!1, null, !0))
      : (this.backoffId_ = Uk(t, n, this.timeout_));
  }
  getPromise() {
    return this.promise_;
  }
  cancel(t) {
    (this.canceled_ = !0),
      (this.appDelete_ = t || !1),
      this.backoffId_ !== null && Mk(this.backoffId_),
      this.pendingConnection_ !== null && this.pendingConnection_.abort();
  }
}
class vo {
  constructor(t, n, r) {
    (this.wasSuccessCode = t), (this.connection = n), (this.canceled = !!r);
  }
}
function $k(e, t) {
  t !== null && t.length > 0 && (e.Authorization = "Firebase " + t);
}
function Hk(e, t) {
  e["X-Firebase-Storage-Version"] = "webjs/" + (t ?? "AppManager");
}
function Vk(e, t) {
  t && (e["X-Firebase-GMPID"] = t);
}
function Wk(e, t) {
  t !== null && (e["X-Firebase-AppCheck"] = t);
}
function Kk(e, t, n, r, i, o, s = !0) {
  const a = zg(e.urlParams),
    l = e.url + a,
    u = Object.assign({}, e.headers);
  return (
    Vk(u, t),
    $k(u, n),
    Hk(u, o),
    Wk(u, r),
    new zk(
      l,
      e.method,
      u,
      e.body,
      e.successCodes,
      e.additionalRetryCodes,
      e.handler,
      e.errorHandler,
      e.timeout,
      e.progressCallback,
      i,
      s
    )
  );
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Gk() {
  return typeof BlobBuilder < "u"
    ? BlobBuilder
    : typeof WebKitBlobBuilder < "u"
    ? WebKitBlobBuilder
    : void 0;
}
function qk(...e) {
  const t = Gk();
  if (t !== void 0) {
    const n = new t();
    for (let r = 0; r < e.length; r++) n.append(e[r]);
    return n.getBlob();
  } else {
    if (Uc()) return new Blob(e);
    throw new X(
      J.UNSUPPORTED_ENVIRONMENT,
      "This browser doesn't seem to support creating Blobs"
    );
  }
}
function Jk(e, t, n) {
  return e.webkitSlice
    ? e.webkitSlice(t, n)
    : e.mozSlice
    ? e.mozSlice(t, n)
    : e.slice
    ? e.slice(t, n)
    : null;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Qk(e) {
  if (typeof atob > "u") throw Ak("base-64");
  return atob(e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ut = {
  RAW: "raw",
  BASE64: "base64",
  BASE64URL: "base64url",
  DATA_URL: "data_url",
};
class Ga {
  constructor(t, n) {
    (this.data = t), (this.contentType = n || null);
  }
}
function Xk(e, t) {
  switch (e) {
    case ut.RAW:
      return new Ga($g(t));
    case ut.BASE64:
    case ut.BASE64URL:
      return new Ga(Hg(e, t));
    case ut.DATA_URL:
      return new Ga(Zk(t), eC(t));
  }
  throw Lc();
}
function $g(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) {
    let r = e.charCodeAt(n);
    if (r <= 127) t.push(r);
    else if (r <= 2047) t.push(192 | (r >> 6), 128 | (r & 63));
    else if ((r & 64512) === 55296)
      if (!(n < e.length - 1 && (e.charCodeAt(n + 1) & 64512) === 56320))
        t.push(239, 191, 189);
      else {
        const o = r,
          s = e.charCodeAt(++n);
        (r = 65536 | ((o & 1023) << 10) | (s & 1023)),
          t.push(
            240 | (r >> 18),
            128 | ((r >> 12) & 63),
            128 | ((r >> 6) & 63),
            128 | (r & 63)
          );
      }
    else
      (r & 64512) === 56320
        ? t.push(239, 191, 189)
        : t.push(224 | (r >> 12), 128 | ((r >> 6) & 63), 128 | (r & 63));
  }
  return new Uint8Array(t);
}
function Yk(e) {
  let t;
  try {
    t = decodeURIComponent(e);
  } catch {
    throw ci(ut.DATA_URL, "Malformed data URL.");
  }
  return $g(t);
}
function Hg(e, t) {
  switch (e) {
    case ut.BASE64: {
      const i = t.indexOf("-") !== -1,
        o = t.indexOf("_") !== -1;
      if (i || o)
        throw ci(
          e,
          "Invalid character '" +
            (i ? "-" : "_") +
            "' found: is it base64url encoded?"
        );
      break;
    }
    case ut.BASE64URL: {
      const i = t.indexOf("+") !== -1,
        o = t.indexOf("/") !== -1;
      if (i || o)
        throw ci(
          e,
          "Invalid character '" +
            (i ? "+" : "/") +
            "' found: is it base64 encoded?"
        );
      t = t.replace(/-/g, "+").replace(/_/g, "/");
      break;
    }
  }
  let n;
  try {
    n = Qk(t);
  } catch (i) {
    throw i.message.includes("polyfill") ? i : ci(e, "Invalid character found");
  }
  const r = new Uint8Array(n.length);
  for (let i = 0; i < n.length; i++) r[i] = n.charCodeAt(i);
  return r;
}
class Vg {
  constructor(t) {
    (this.base64 = !1), (this.contentType = null);
    const n = t.match(/^data:([^,]+)?,/);
    if (n === null)
      throw ci(
        ut.DATA_URL,
        "Must be formatted 'data:[<mediatype>][;base64],<data>"
      );
    const r = n[1] || null;
    r != null &&
      ((this.base64 = tC(r, ";base64")),
      (this.contentType = this.base64 ? r.substring(0, r.length - 7) : r)),
      (this.rest = t.substring(t.indexOf(",") + 1));
  }
}
function Zk(e) {
  const t = new Vg(e);
  return t.base64 ? Hg(ut.BASE64, t.rest) : Yk(t.rest);
}
function eC(e) {
  return new Vg(e).contentType;
}
function tC(e, t) {
  return e.length >= t.length ? e.substring(e.length - t.length) === t : !1;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class $t {
  constructor(t, n) {
    let r = 0,
      i = "";
    Gf(t)
      ? ((this.data_ = t), (r = t.size), (i = t.type))
      : t instanceof ArrayBuffer
      ? (n
          ? (this.data_ = new Uint8Array(t))
          : ((this.data_ = new Uint8Array(t.byteLength)),
            this.data_.set(new Uint8Array(t))),
        (r = this.data_.length))
      : t instanceof Uint8Array &&
        (n
          ? (this.data_ = t)
          : ((this.data_ = new Uint8Array(t.length)), this.data_.set(t)),
        (r = t.length)),
      (this.size_ = r),
      (this.type_ = i);
  }
  size() {
    return this.size_;
  }
  type() {
    return this.type_;
  }
  slice(t, n) {
    if (Gf(this.data_)) {
      const r = this.data_,
        i = Jk(r, t, n);
      return i === null ? null : new $t(i);
    } else {
      const r = new Uint8Array(this.data_.buffer, t, n - t);
      return new $t(r, !0);
    }
  }
  static getBlob(...t) {
    if (Uc()) {
      const n = t.map((r) => (r instanceof $t ? r.data_ : r));
      return new $t(qk.apply(null, n));
    } else {
      const n = t.map((s) => (Dc(s) ? Xk(ut.RAW, s).data : s.data_));
      let r = 0;
      n.forEach((s) => {
        r += s.byteLength;
      });
      const i = new Uint8Array(r);
      let o = 0;
      return (
        n.forEach((s) => {
          for (let a = 0; a < s.length; a++) i[o++] = s[a];
        }),
        new $t(i, !0)
      );
    }
  }
  uploadData() {
    return this.data_;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Wg(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch {
    return null;
  }
  return Fk(t) ? t : null;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function nC(e) {
  if (e.length === 0) return null;
  const t = e.lastIndexOf("/");
  return t === -1 ? "" : e.slice(0, t);
}
function rC(e, t) {
  const n = t
    .split("/")
    .filter((r) => r.length > 0)
    .join("/");
  return e.length === 0 ? n : e + "/" + n;
}
function Kg(e) {
  const t = e.lastIndexOf("/", e.length - 2);
  return t === -1 ? e : e.slice(t + 1);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function iC(e, t) {
  return t;
}
class ge {
  constructor(t, n, r, i) {
    (this.server = t),
      (this.local = n || t),
      (this.writable = !!r),
      (this.xform = i || iC);
  }
}
let wo = null;
function oC(e) {
  return !Dc(e) || e.length < 2 ? e : Kg(e);
}
function Gg() {
  if (wo) return wo;
  const e = [];
  e.push(new ge("bucket")),
    e.push(new ge("generation")),
    e.push(new ge("metageneration")),
    e.push(new ge("name", "fullPath", !0));
  function t(o, s) {
    return oC(s);
  }
  const n = new ge("name");
  (n.xform = t), e.push(n);
  function r(o, s) {
    return s !== void 0 ? Number(s) : s;
  }
  const i = new ge("size");
  return (
    (i.xform = r),
    e.push(i),
    e.push(new ge("timeCreated")),
    e.push(new ge("updated")),
    e.push(new ge("md5Hash", null, !0)),
    e.push(new ge("cacheControl", null, !0)),
    e.push(new ge("contentDisposition", null, !0)),
    e.push(new ge("contentEncoding", null, !0)),
    e.push(new ge("contentLanguage", null, !0)),
    e.push(new ge("contentType", null, !0)),
    e.push(new ge("metadata", "customMetadata", !0)),
    (wo = e),
    wo
  );
}
function sC(e, t) {
  function n() {
    const r = e.bucket,
      i = e.fullPath,
      o = new Oe(r, i);
    return t._makeStorageReference(o);
  }
  Object.defineProperty(e, "ref", { get: n });
}
function aC(e, t, n) {
  const r = {};
  r.type = "file";
  const i = n.length;
  for (let o = 0; o < i; o++) {
    const s = n[o];
    r[s.local] = s.xform(r, t[s.server]);
  }
  return sC(r, e), r;
}
function qg(e, t, n) {
  const r = Wg(t);
  return r === null ? null : aC(e, r, n);
}
function lC(e, t, n, r) {
  const i = Wg(t);
  if (i === null || !Dc(i.downloadTokens)) return null;
  const o = i.downloadTokens;
  if (o.length === 0) return null;
  const s = encodeURIComponent;
  return o.split(",").map((u) => {
    const c = e.bucket,
      d = e.fullPath,
      f = "/b/" + s(c) + "/o/" + s(d),
      v = Mc(f, n, r),
      g = zg({ alt: "media", token: u });
    return v + g;
  })[0];
}
function uC(e, t) {
  const n = {},
    r = t.length;
  for (let i = 0; i < r; i++) {
    const o = t[i];
    o.writable && (n[o.server] = e[o.local]);
  }
  return JSON.stringify(n);
}
class Jg {
  constructor(t, n, r, i) {
    (this.url = t),
      (this.method = n),
      (this.handler = r),
      (this.timeout = i),
      (this.urlParams = {}),
      (this.headers = {}),
      (this.body = null),
      (this.errorHandler = null),
      (this.progressCallback = null),
      (this.successCodes = [200]),
      (this.additionalRetryCodes = []);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Qg(e) {
  if (!e) throw Lc();
}
function cC(e, t) {
  function n(r, i) {
    const o = qg(e, i, t);
    return Qg(o !== null), o;
  }
  return n;
}
function dC(e, t) {
  function n(r, i) {
    const o = qg(e, i, t);
    return Qg(o !== null), lC(o, i, e.host, e._protocol);
  }
  return n;
}
function Xg(e) {
  function t(n, r) {
    let i;
    return (
      n.getStatus() === 401
        ? n.getErrorText().includes("Firebase App Check token is invalid")
          ? (i = Ck())
          : (i = kk())
        : n.getStatus() === 402
        ? (i = Sk(e.bucket))
        : n.getStatus() === 403
        ? (i = Tk(e.path))
        : (i = r),
      (i.status = n.getStatus()),
      (i.serverResponse = r.serverResponse),
      i
    );
  }
  return t;
}
function fC(e) {
  const t = Xg(e);
  function n(r, i) {
    let o = t(r, i);
    return (
      r.getStatus() === 404 && (o = Ek(e.path)),
      (o.serverResponse = i.serverResponse),
      o
    );
  }
  return n;
}
function hC(e, t, n) {
  const r = t.fullServerUrl(),
    i = Mc(r, e.host, e._protocol),
    o = "GET",
    s = e.maxOperationRetryTime,
    a = new Jg(i, o, dC(e, n), s);
  return (a.errorHandler = fC(t)), a;
}
function pC(e, t) {
  return (e && e.contentType) || (t && t.type()) || "application/octet-stream";
}
function mC(e, t, n) {
  const r = Object.assign({}, n);
  return (
    (r.fullPath = e.path),
    (r.size = t.size()),
    r.contentType || (r.contentType = pC(null, t)),
    r
  );
}
function gC(e, t, n, r, i) {
  const o = t.bucketOnlyServerUrl(),
    s = { "X-Goog-Upload-Protocol": "multipart" };
  function a() {
    let m = "";
    for (let _ = 0; _ < 2; _++) m = m + Math.random().toString().slice(2);
    return m;
  }
  const l = a();
  s["Content-Type"] = "multipart/related; boundary=" + l;
  const u = mC(t, r, i),
    c = uC(u, n),
    d =
      "--" +
      l +
      `\r
Content-Type: application/json; charset=utf-8\r
\r
` +
      c +
      `\r
--` +
      l +
      `\r
Content-Type: ` +
      u.contentType +
      `\r
\r
`,
    f =
      `\r
--` +
      l +
      "--",
    v = $t.getBlob(d, r, f);
  if (v === null) throw Ok();
  const g = { name: u.fullPath },
    y = Mc(o, e.host, e._protocol),
    E = "POST",
    h = e.maxUploadRetryTime,
    p = new Jg(y, E, cC(e, n), h);
  return (
    (p.urlParams = g),
    (p.headers = s),
    (p.body = v.uploadData()),
    (p.errorHandler = Xg(t)),
    p
  );
}
class yC {
  constructor() {
    (this.sent_ = !1),
      (this.xhr_ = new XMLHttpRequest()),
      this.initXhr(),
      (this.errorCode_ = In.NO_ERROR),
      (this.sendPromise_ = new Promise((t) => {
        this.xhr_.addEventListener("abort", () => {
          (this.errorCode_ = In.ABORT), t();
        }),
          this.xhr_.addEventListener("error", () => {
            (this.errorCode_ = In.NETWORK_ERROR), t();
          }),
          this.xhr_.addEventListener("load", () => {
            t();
          });
      }));
  }
  send(t, n, r, i) {
    if (this.sent_) throw Wr("cannot .send() more than once");
    if (((this.sent_ = !0), this.xhr_.open(n, t, !0), i !== void 0))
      for (const o in i)
        i.hasOwnProperty(o) && this.xhr_.setRequestHeader(o, i[o].toString());
    return (
      r !== void 0 ? this.xhr_.send(r) : this.xhr_.send(), this.sendPromise_
    );
  }
  getErrorCode() {
    if (!this.sent_) throw Wr("cannot .getErrorCode() before sending");
    return this.errorCode_;
  }
  getStatus() {
    if (!this.sent_) throw Wr("cannot .getStatus() before sending");
    try {
      return this.xhr_.status;
    } catch {
      return -1;
    }
  }
  getResponse() {
    if (!this.sent_) throw Wr("cannot .getResponse() before sending");
    return this.xhr_.response;
  }
  getErrorText() {
    if (!this.sent_) throw Wr("cannot .getErrorText() before sending");
    return this.xhr_.statusText;
  }
  abort() {
    this.xhr_.abort();
  }
  getResponseHeader(t) {
    return this.xhr_.getResponseHeader(t);
  }
  addUploadProgressListener(t) {
    this.xhr_.upload != null &&
      this.xhr_.upload.addEventListener("progress", t);
  }
  removeUploadProgressListener(t) {
    this.xhr_.upload != null &&
      this.xhr_.upload.removeEventListener("progress", t);
  }
}
class vC extends yC {
  initXhr() {
    this.xhr_.responseType = "text";
  }
}
function Yg() {
  return new vC();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Mn {
  constructor(t, n) {
    (this._service = t),
      n instanceof Oe
        ? (this._location = n)
        : (this._location = Oe.makeFromUrl(n, t.host));
  }
  toString() {
    return "gs://" + this._location.bucket + "/" + this._location.path;
  }
  _newRef(t, n) {
    return new Mn(t, n);
  }
  get root() {
    const t = new Oe(this._location.bucket, "");
    return this._newRef(this._service, t);
  }
  get bucket() {
    return this._location.bucket;
  }
  get fullPath() {
    return this._location.path;
  }
  get name() {
    return Kg(this._location.path);
  }
  get storage() {
    return this._service;
  }
  get parent() {
    const t = nC(this._location.path);
    if (t === null) return null;
    const n = new Oe(this._location.bucket, t);
    return new Mn(this._service, n);
  }
  _throwIfRoot(t) {
    if (this._location.path === "") throw Lk(t);
  }
}
function wC(e, t, n) {
  e._throwIfRoot("uploadBytes");
  const r = gC(e.storage, e._location, Gg(), new $t(t, !0), n);
  return e.storage
    .makeRequestWithTokens(r, Yg)
    .then((i) => ({ metadata: i, ref: e }));
}
function _C(e) {
  e._throwIfRoot("getDownloadURL");
  const t = hC(e.storage, e._location, Gg());
  return e.storage.makeRequestWithTokens(t, Yg).then((n) => {
    if (n === null) throw bk();
    return n;
  });
}
function EC(e, t) {
  const n = rC(e._location.path, t),
    r = new Oe(e._location.bucket, n);
  return new Mn(e.storage, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function SC(e) {
  return /^[A-Za-z]+:\/\//.test(e);
}
function kC(e, t) {
  return new Mn(e, t);
}
function Zg(e, t) {
  if (e instanceof jc) {
    const n = e;
    if (n._bucket == null) throw Nk();
    const r = new Mn(n, n._bucket);
    return t != null ? Zg(r, t) : r;
  } else return t !== void 0 ? EC(e, t) : e;
}
function CC(e, t) {
  if (t && SC(t)) {
    if (e instanceof jc) return kC(e, t);
    throw su(
      "To use ref(service, url), the first argument must be a Storage instance."
    );
  } else return Zg(e, t);
}
function Jf(e, t) {
  const n = t == null ? void 0 : t[Fg];
  return n == null ? null : Oe.makeFromBucketSpec(n, e);
}
function TC(e, t, n, r = {}) {
  (e.host = `${t}:${n}`), (e._protocol = "http");
  const { mockUserToken: i } = r;
  i &&
    (e._overrideAuthToken =
      typeof i == "string" ? i : U_(i, e.app.options.projectId));
}
class jc {
  constructor(t, n, r, i, o) {
    (this.app = t),
      (this._authProvider = n),
      (this._appCheckProvider = r),
      (this._url = i),
      (this._firebaseVersion = o),
      (this._bucket = null),
      (this._host = jg),
      (this._protocol = "https"),
      (this._appId = null),
      (this._deleted = !1),
      (this._maxOperationRetryTime = wk),
      (this._maxUploadRetryTime = _k),
      (this._requests = new Set()),
      i != null
        ? (this._bucket = Oe.makeFromBucketSpec(i, this._host))
        : (this._bucket = Jf(this._host, this.app.options));
  }
  get host() {
    return this._host;
  }
  set host(t) {
    (this._host = t),
      this._url != null
        ? (this._bucket = Oe.makeFromBucketSpec(this._url, t))
        : (this._bucket = Jf(t, this.app.options));
  }
  get maxUploadRetryTime() {
    return this._maxUploadRetryTime;
  }
  set maxUploadRetryTime(t) {
    qf("time", 0, Number.POSITIVE_INFINITY, t), (this._maxUploadRetryTime = t);
  }
  get maxOperationRetryTime() {
    return this._maxOperationRetryTime;
  }
  set maxOperationRetryTime(t) {
    qf("time", 0, Number.POSITIVE_INFINITY, t),
      (this._maxOperationRetryTime = t);
  }
  async _getAuthToken() {
    if (this._overrideAuthToken) return this._overrideAuthToken;
    const t = this._authProvider.getImmediate({ optional: !0 });
    if (t) {
      const n = await t.getToken();
      if (n !== null) return n.accessToken;
    }
    return null;
  }
  async _getAppCheckToken() {
    const t = this._appCheckProvider.getImmediate({ optional: !0 });
    return t ? (await t.getToken()).token : null;
  }
  _delete() {
    return (
      this._deleted ||
        ((this._deleted = !0),
        this._requests.forEach((t) => t.cancel()),
        this._requests.clear()),
      Promise.resolve()
    );
  }
  _makeStorageReference(t) {
    return new Mn(this, t);
  }
  _makeRequest(t, n, r, i, o = !0) {
    if (this._deleted) return new Dk(Bg());
    {
      const s = Kk(t, this._appId, r, i, n, this._firebaseVersion, o);
      return (
        this._requests.add(s),
        s.getPromise().then(
          () => this._requests.delete(s),
          () => this._requests.delete(s)
        ),
        s
      );
    }
  }
  async makeRequestWithTokens(t, n) {
    const [r, i] = await Promise.all([
      this._getAuthToken(),
      this._getAppCheckToken(),
    ]);
    return this._makeRequest(t, n, r, i).getPromise();
  }
}
const Qf = "@firebase/storage",
  Xf = "0.12.6";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ey = "storage";
function xC(e, t, n) {
  return (e = Fe(e)), wC(e, t, n);
}
function IC(e) {
  return (e = Fe(e)), _C(e);
}
function RC(e, t) {
  return (e = Fe(e)), CC(e, t);
}
function PC(e = ig(), t) {
  e = Fe(e);
  const r = Sc(e, ey).getImmediate({ identifier: t }),
    i = L_("storage");
  return i && NC(r, ...i), r;
}
function NC(e, t, n, r = {}) {
  TC(e, t, n, r);
}
function OC(e, { instanceIdentifier: t }) {
  const n = e.getProvider("app").getImmediate(),
    r = e.getProvider("auth-internal"),
    i = e.getProvider("app-check-internal");
  return new jc(n, r, i, t, Or);
}
function bC() {
  _r(new Ln(ey, OC, "PUBLIC").setMultipleInstances(!0)),
    rn(Qf, Xf, ""),
    rn(Qf, Xf, "esm2017");
}
bC();
const AC = {
    apiKey: "AIzaSyCt85fVlUhP8DQdFf4Mua4OUSPTP0Q4ilI",
    authDomain: "awayout-55fe2.firebaseapp.com",
    projectId: "awayout-55fe2",
    storageBucket: "awayout-55fe2.appspot.com",
    messagingSenderId: "149411277678",
    appId: "1:149411277678:web:3b54182d8907f8f35daf7f",
    measurementId: "G-E3P0XKCC6W",
  },
  ty = rg(AC),
  Es = mk(ty),
  LC = PC(ty),
  DC = new mt();
function UC({ text: e }) {
  return w.jsxs("div", {
    className: "flex items-center justify-center mt-2 w-full",
    children: [
      w.jsx("div", { className: "flex-grow border-t border-gray-300" }),
      w.jsx("span", { className: "mx-4 text-gray-500", children: e }),
      w.jsx("div", { className: "flex-grow border-t border-gray-300" }),
    ],
  });
}
var ny = { exports: {} },
  ry = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gi = C;
function MC(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var jC = typeof Object.is == "function" ? Object.is : MC,
  FC = Gi.useSyncExternalStore,
  BC = Gi.useRef,
  zC = Gi.useEffect,
  $C = Gi.useMemo,
  HC = Gi.useDebugValue;
ry.useSyncExternalStoreWithSelector = function (e, t, n, r, i) {
  var o = BC(null);
  if (o.current === null) {
    var s = { hasValue: !1, value: null };
    o.current = s;
  } else s = o.current;
  o = $C(
    function () {
      function l(v) {
        if (!u) {
          if (((u = !0), (c = v), (v = r(v)), i !== void 0 && s.hasValue)) {
            var g = s.value;
            if (i(g, v)) return (d = g);
          }
          return (d = v);
        }
        if (((g = d), jC(c, v))) return g;
        var y = r(v);
        return i !== void 0 && i(g, y) ? g : ((c = v), (d = y));
      }
      var u = !1,
        c,
        d,
        f = n === void 0 ? null : n;
      return [
        function () {
          return l(t());
        },
        f === null
          ? void 0
          : function () {
              return l(f());
            },
      ];
    },
    [t, n, r, i]
  );
  var a = FC(e, o[0], o[1]);
  return (
    zC(
      function () {
        (s.hasValue = !0), (s.value = a);
      },
      [a]
    ),
    HC(a),
    a
  );
};
ny.exports = ry;
var VC = ny.exports,
  be = "default" in tl ? Tu : tl,
  Yf = Symbol.for("react-redux-context"),
  Zf = typeof globalThis < "u" ? globalThis : {};
function WC() {
  if (!be.createContext) return {};
  const e = Zf[Yf] ?? (Zf[Yf] = new Map());
  let t = e.get(be.createContext);
  return t || ((t = be.createContext(null)), e.set(be.createContext, t)), t;
}
var ln = WC(),
  KC = () => {
    throw new Error("uSES not initialized!");
  };
function Fc(e = ln) {
  return function () {
    return be.useContext(e);
  };
}
var iy = Fc(),
  oy = KC,
  GC = (e) => {
    oy = e;
  },
  qC = (e, t) => e === t;
function JC(e = ln) {
  const t = e === ln ? iy : Fc(e),
    n = (r, i = {}) => {
      const { equalityFn: o = qC, devModeChecks: s = {} } =
          typeof i == "function" ? { equalityFn: i } : i,
        {
          store: a,
          subscription: l,
          getServerState: u,
          stabilityCheck: c,
          identityFunctionCheck: d,
        } = t();
      be.useRef(!0);
      const f = be.useCallback(
          {
            [r.name](g) {
              return r(g);
            },
          }[r.name],
          [r, c, s.stabilityCheck]
        ),
        v = oy(l.addNestedSub, a.getState, u || a.getState, f, o);
      return be.useDebugValue(v), v;
    };
  return Object.assign(n, { withTypes: () => n }), n;
}
var Sr = JC();
function QC(e) {
  e();
}
function XC() {
  let e = null,
    t = null;
  return {
    clear() {
      (e = null), (t = null);
    },
    notify() {
      QC(() => {
        let n = e;
        for (; n; ) n.callback(), (n = n.next);
      });
    },
    get() {
      const n = [];
      let r = e;
      for (; r; ) n.push(r), (r = r.next);
      return n;
    },
    subscribe(n) {
      let r = !0;
      const i = (t = { callback: n, next: null, prev: t });
      return (
        i.prev ? (i.prev.next = i) : (e = i),
        function () {
          !r ||
            e === null ||
            ((r = !1),
            i.next ? (i.next.prev = i.prev) : (t = i.prev),
            i.prev ? (i.prev.next = i.next) : (e = i.next));
        }
      );
    },
  };
}
var eh = { notify() {}, get: () => [] };
function YC(e, t) {
  let n,
    r = eh,
    i = 0,
    o = !1;
  function s(y) {
    c();
    const E = r.subscribe(y);
    let h = !1;
    return () => {
      h || ((h = !0), E(), d());
    };
  }
  function a() {
    r.notify();
  }
  function l() {
    g.onStateChange && g.onStateChange();
  }
  function u() {
    return o;
  }
  function c() {
    i++, n || ((n = e.subscribe(l)), (r = XC()));
  }
  function d() {
    i--, n && i === 0 && (n(), (n = void 0), r.clear(), (r = eh));
  }
  function f() {
    o || ((o = !0), c());
  }
  function v() {
    o && ((o = !1), d());
  }
  const g = {
    addNestedSub: s,
    notifyNestedSubs: a,
    handleChangeWrapper: l,
    isSubscribed: u,
    trySubscribe: f,
    tryUnsubscribe: v,
    getListeners: () => r,
  };
  return g;
}
var ZC =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  eT = typeof navigator < "u" && navigator.product === "ReactNative",
  tT = ZC || eT ? be.useLayoutEffect : be.useEffect;
function nT({
  store: e,
  context: t,
  children: n,
  serverState: r,
  stabilityCheck: i = "once",
  identityFunctionCheck: o = "once",
}) {
  const s = be.useMemo(() => {
      const u = YC(e);
      return {
        store: e,
        subscription: u,
        getServerState: r ? () => r : void 0,
        stabilityCheck: i,
        identityFunctionCheck: o,
      };
    }, [e, r, i, o]),
    a = be.useMemo(() => e.getState(), [e]);
  tT(() => {
    const { subscription: u } = s;
    return (
      (u.onStateChange = u.notifyNestedSubs),
      u.trySubscribe(),
      a !== e.getState() && u.notifyNestedSubs(),
      () => {
        u.tryUnsubscribe(), (u.onStateChange = void 0);
      }
    );
  }, [s, a]);
  const l = t || ln;
  return be.createElement(l.Provider, { value: s }, n);
}
var rT = nT;
function sy(e = ln) {
  const t = e === ln ? iy : Fc(e),
    n = () => {
      const { store: r } = t();
      return r;
    };
  return Object.assign(n, { withTypes: () => n }), n;
}
var iT = sy();
function oT(e = ln) {
  const t = e === ln ? iT : sy(e),
    n = () => t().dispatch;
  return Object.assign(n, { withTypes: () => n }), n;
}
var qi = oT();
GC(VC.useSyncExternalStoreWithSelector);
function ae(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var sT = (typeof Symbol == "function" && Symbol.observable) || "@@observable",
  th = sT,
  qa = () => Math.random().toString(36).substring(7).split("").join("."),
  aT = {
    INIT: `@@redux/INIT${qa()}`,
    REPLACE: `@@redux/REPLACE${qa()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${qa()}`,
  },
  Ss = aT;
function Bc(e) {
  if (typeof e != "object" || e === null) return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function ay(e, t, n) {
  if (typeof e != "function") throw new Error(ae(2));
  if (
    (typeof t == "function" && typeof n == "function") ||
    (typeof n == "function" && typeof arguments[3] == "function")
  )
    throw new Error(ae(0));
  if (
    (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
    typeof n < "u")
  ) {
    if (typeof n != "function") throw new Error(ae(1));
    return n(ay)(e, t);
  }
  let r = e,
    i = t,
    o = new Map(),
    s = o,
    a = 0,
    l = !1;
  function u() {
    s === o &&
      ((s = new Map()),
      o.forEach((E, h) => {
        s.set(h, E);
      }));
  }
  function c() {
    if (l) throw new Error(ae(3));
    return i;
  }
  function d(E) {
    if (typeof E != "function") throw new Error(ae(4));
    if (l) throw new Error(ae(5));
    let h = !0;
    u();
    const p = a++;
    return (
      s.set(p, E),
      function () {
        if (h) {
          if (l) throw new Error(ae(6));
          (h = !1), u(), s.delete(p), (o = null);
        }
      }
    );
  }
  function f(E) {
    if (!Bc(E)) throw new Error(ae(7));
    if (typeof E.type > "u") throw new Error(ae(8));
    if (typeof E.type != "string") throw new Error(ae(17));
    if (l) throw new Error(ae(9));
    try {
      (l = !0), (i = r(i, E));
    } finally {
      l = !1;
    }
    return (
      (o = s).forEach((p) => {
        p();
      }),
      E
    );
  }
  function v(E) {
    if (typeof E != "function") throw new Error(ae(10));
    (r = E), f({ type: Ss.REPLACE });
  }
  function g() {
    const E = d;
    return {
      subscribe(h) {
        if (typeof h != "object" || h === null) throw new Error(ae(11));
        function p() {
          const _ = h;
          _.next && _.next(c());
        }
        return p(), { unsubscribe: E(p) };
      },
      [th]() {
        return this;
      },
    };
  }
  return (
    f({ type: Ss.INIT }),
    { dispatch: f, subscribe: d, getState: c, replaceReducer: v, [th]: g }
  );
}
function lT(e) {
  Object.keys(e).forEach((t) => {
    const n = e[t];
    if (typeof n(void 0, { type: Ss.INIT }) > "u") throw new Error(ae(12));
    if (typeof n(void 0, { type: Ss.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(ae(13));
  });
}
function ly(e) {
  const t = Object.keys(e),
    n = {};
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    typeof e[s] == "function" && (n[s] = e[s]);
  }
  const r = Object.keys(n);
  let i;
  try {
    lT(n);
  } catch (o) {
    i = o;
  }
  return function (s = {}, a) {
    if (i) throw i;
    let l = !1;
    const u = {};
    for (let c = 0; c < r.length; c++) {
      const d = r[c],
        f = n[d],
        v = s[d],
        g = f(v, a);
      if (typeof g > "u") throw (a && a.type, new Error(ae(14)));
      (u[d] = g), (l = l || g !== v);
    }
    return (l = l || r.length !== Object.keys(s).length), l ? u : s;
  };
}
function ks(...e) {
  return e.length === 0
    ? (t) => t
    : e.length === 1
    ? e[0]
    : e.reduce(
        (t, n) =>
          (...r) =>
            t(n(...r))
      );
}
function uT(...e) {
  return (t) => (n, r) => {
    const i = t(n, r);
    let o = () => {
      throw new Error(ae(15));
    };
    const s = { getState: i.getState, dispatch: (l, ...u) => o(l, ...u) },
      a = e.map((l) => l(s));
    return (o = ks(...a)(i.dispatch)), { ...i, dispatch: o };
  };
}
function cT(e) {
  return Bc(e) && "type" in e && typeof e.type == "string";
}
var uy = Symbol.for("immer-nothing"),
  nh = Symbol.for("immer-draftable"),
  De = Symbol.for("immer-state");
function Ye(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var kr = Object.getPrototypeOf;
function un(e) {
  return !!e && !!e[De];
}
function It(e) {
  var t;
  return e
    ? cy(e) ||
        Array.isArray(e) ||
        !!e[nh] ||
        !!((t = e.constructor) != null && t[nh]) ||
        ea(e) ||
        ta(e)
    : !1;
}
var dT = Object.prototype.constructor.toString();
function cy(e) {
  if (!e || typeof e != "object") return !1;
  const t = kr(e);
  if (t === null) return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object
    ? !0
    : typeof n == "function" && Function.toString.call(n) === dT;
}
function Cs(e, t) {
  Zs(e) === 0
    ? Reflect.ownKeys(e).forEach((n) => {
        t(n, e[n], e);
      })
    : e.forEach((n, r) => t(r, n, e));
}
function Zs(e) {
  const t = e[De];
  return t ? t.type_ : Array.isArray(e) ? 1 : ea(e) ? 2 : ta(e) ? 3 : 0;
}
function au(e, t) {
  return Zs(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function dy(e, t, n) {
  const r = Zs(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function fT(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function ea(e) {
  return e instanceof Map;
}
function ta(e) {
  return e instanceof Set;
}
function _n(e) {
  return e.copy_ || e.base_;
}
function lu(e, t) {
  if (ea(e)) return new Map(e);
  if (ta(e)) return new Set(e);
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  const n = cy(e);
  if (t === !0 || (t === "class_only" && !n)) {
    const r = Object.getOwnPropertyDescriptors(e);
    delete r[De];
    let i = Reflect.ownKeys(r);
    for (let o = 0; o < i.length; o++) {
      const s = i[o],
        a = r[s];
      a.writable === !1 && ((a.writable = !0), (a.configurable = !0)),
        (a.get || a.set) &&
          (r[s] = {
            configurable: !0,
            writable: !0,
            enumerable: a.enumerable,
            value: e[s],
          });
    }
    return Object.create(kr(e), r);
  } else {
    const r = kr(e);
    if (r !== null && n) return { ...e };
    const i = Object.create(r);
    return Object.assign(i, e);
  }
}
function zc(e, t = !1) {
  return (
    na(e) ||
      un(e) ||
      !It(e) ||
      (Zs(e) > 1 && (e.set = e.add = e.clear = e.delete = hT),
      Object.freeze(e),
      t && Object.entries(e).forEach(([n, r]) => zc(r, !0))),
    e
  );
}
function hT() {
  Ye(2);
}
function na(e) {
  return Object.isFrozen(e);
}
var pT = {};
function jn(e) {
  const t = pT[e];
  return t || Ye(0, e), t;
}
var Ai;
function fy() {
  return Ai;
}
function mT(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
  };
}
function rh(e, t) {
  t &&
    (jn("Patches"),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function uu(e) {
  cu(e), e.drafts_.forEach(gT), (e.drafts_ = null);
}
function cu(e) {
  e === Ai && (Ai = e.parent_);
}
function ih(e) {
  return (Ai = mT(Ai, e));
}
function gT(e) {
  const t = e[De];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : (t.revoked_ = !0);
}
function oh(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return (
    e !== void 0 && e !== n
      ? (n[De].modified_ && (uu(t), Ye(4)),
        It(e) && ((e = Ts(t, e)), t.parent_ || xs(t, e)),
        t.patches_ &&
          jn("Patches").generateReplacementPatches_(
            n[De].base_,
            e,
            t.patches_,
            t.inversePatches_
          ))
      : (e = Ts(t, n, [])),
    uu(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== uy ? e : void 0
  );
}
function Ts(e, t, n) {
  if (na(t)) return t;
  const r = t[De];
  if (!r) return Cs(t, (i, o) => sh(e, r, t, i, o, n)), t;
  if (r.scope_ !== e) return t;
  if (!r.modified_) return xs(e, r.base_, !0), r.base_;
  if (!r.finalized_) {
    (r.finalized_ = !0), r.scope_.unfinalizedDrafts_--;
    const i = r.copy_;
    let o = i,
      s = !1;
    r.type_ === 3 && ((o = new Set(i)), i.clear(), (s = !0)),
      Cs(o, (a, l) => sh(e, r, i, a, l, n, s)),
      xs(e, i, !1),
      n &&
        e.patches_ &&
        jn("Patches").generatePatches_(r, n, e.patches_, e.inversePatches_);
  }
  return r.copy_;
}
function sh(e, t, n, r, i, o, s) {
  if (un(i)) {
    const a =
        o && t && t.type_ !== 3 && !au(t.assigned_, r) ? o.concat(r) : void 0,
      l = Ts(e, i, a);
    if ((dy(n, r, l), un(l))) e.canAutoFreeze_ = !1;
    else return;
  } else s && n.add(i);
  if (It(i) && !na(i)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) return;
    Ts(e, i),
      (!t || !t.scope_.parent_) &&
        typeof r != "symbol" &&
        Object.prototype.propertyIsEnumerable.call(n, r) &&
        xs(e, i);
  }
}
function xs(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && zc(t, n);
}
function yT(e, t) {
  const n = Array.isArray(e),
    r = {
      type_: n ? 1 : 0,
      scope_: t ? t.scope_ : fy(),
      modified_: !1,
      finalized_: !1,
      assigned_: {},
      parent_: t,
      base_: e,
      draft_: null,
      copy_: null,
      revoke_: null,
      isManual_: !1,
    };
  let i = r,
    o = $c;
  n && ((i = [r]), (o = Li));
  const { revoke: s, proxy: a } = Proxy.revocable(i, o);
  return (r.draft_ = a), (r.revoke_ = s), a;
}
var $c = {
    get(e, t) {
      if (t === De) return e;
      const n = _n(e);
      if (!au(n, t)) return vT(e, n, t);
      const r = n[t];
      return e.finalized_ || !It(r)
        ? r
        : r === Ja(e.base_, t)
        ? (Qa(e), (e.copy_[t] = fu(r, e)))
        : r;
    },
    has(e, t) {
      return t in _n(e);
    },
    ownKeys(e) {
      return Reflect.ownKeys(_n(e));
    },
    set(e, t, n) {
      const r = hy(_n(e), t);
      if (r != null && r.set) return r.set.call(e.draft_, n), !0;
      if (!e.modified_) {
        const i = Ja(_n(e), t),
          o = i == null ? void 0 : i[De];
        if (o && o.base_ === n)
          return (e.copy_[t] = n), (e.assigned_[t] = !1), !0;
        if (fT(n, i) && (n !== void 0 || au(e.base_, t))) return !0;
        Qa(e), du(e);
      }
      return (
        (e.copy_[t] === n && (n !== void 0 || t in e.copy_)) ||
          (Number.isNaN(n) && Number.isNaN(e.copy_[t])) ||
          ((e.copy_[t] = n), (e.assigned_[t] = !0)),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        Ja(e.base_, t) !== void 0 || t in e.base_
          ? ((e.assigned_[t] = !1), Qa(e), du(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      );
    },
    getOwnPropertyDescriptor(e, t) {
      const n = _n(e),
        r = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        r && {
          writable: !0,
          configurable: e.type_ !== 1 || t !== "length",
          enumerable: r.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty() {
      Ye(11);
    },
    getPrototypeOf(e) {
      return kr(e.base_);
    },
    setPrototypeOf() {
      Ye(12);
    },
  },
  Li = {};
Cs($c, (e, t) => {
  Li[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
});
Li.deleteProperty = function (e, t) {
  return Li.set.call(this, e, t, void 0);
};
Li.set = function (e, t, n) {
  return $c.set.call(this, e[0], t, n, e[0]);
};
function Ja(e, t) {
  const n = e[De];
  return (n ? _n(n) : e)[t];
}
function vT(e, t, n) {
  var i;
  const r = hy(t, n);
  return r
    ? "value" in r
      ? r.value
      : (i = r.get) == null
      ? void 0
      : i.call(e.draft_)
    : void 0;
}
function hy(e, t) {
  if (!(t in e)) return;
  let n = kr(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r) return r;
    n = kr(n);
  }
}
function du(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && du(e.parent_));
}
function Qa(e) {
  e.copy_ || (e.copy_ = lu(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var wT = class {
  constructor(e) {
    (this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.produce = (t, n, r) => {
        if (typeof t == "function" && typeof n != "function") {
          const o = n;
          n = t;
          const s = this;
          return function (l = o, ...u) {
            return s.produce(l, (c) => n.call(this, c, ...u));
          };
        }
        typeof n != "function" && Ye(6),
          r !== void 0 && typeof r != "function" && Ye(7);
        let i;
        if (It(t)) {
          const o = ih(this),
            s = fu(t, void 0);
          let a = !0;
          try {
            (i = n(s)), (a = !1);
          } finally {
            a ? uu(o) : cu(o);
          }
          return rh(o, r), oh(i, o);
        } else if (!t || typeof t != "object") {
          if (
            ((i = n(t)),
            i === void 0 && (i = t),
            i === uy && (i = void 0),
            this.autoFreeze_ && zc(i, !0),
            r)
          ) {
            const o = [],
              s = [];
            jn("Patches").generateReplacementPatches_(t, i, o, s), r(o, s);
          }
          return i;
        } else Ye(1, t);
      }),
      (this.produceWithPatches = (t, n) => {
        if (typeof t == "function")
          return (s, ...a) => this.produceWithPatches(s, (l) => t(l, ...a));
        let r, i;
        return [
          this.produce(t, n, (s, a) => {
            (r = s), (i = a);
          }),
          r,
          i,
        ];
      }),
      typeof (e == null ? void 0 : e.autoFreeze) == "boolean" &&
        this.setAutoFreeze(e.autoFreeze),
      typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    It(e) || Ye(8), un(e) && (e = py(e));
    const t = ih(this),
      n = fu(e, void 0);
    return (n[De].isManual_ = !0), cu(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[De];
    (!n || !n.isManual_) && Ye(9);
    const { scope_: r } = n;
    return rh(r, t), oh(void 0, r);
  }
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let n;
    for (n = t.length - 1; n >= 0; n--) {
      const i = t[n];
      if (i.path.length === 0 && i.op === "replace") {
        e = i.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const r = jn("Patches").applyPatches_;
    return un(e) ? r(e, t) : this.produce(e, (i) => r(i, t));
  }
};
function fu(e, t) {
  const n = ea(e)
    ? jn("MapSet").proxyMap_(e, t)
    : ta(e)
    ? jn("MapSet").proxySet_(e, t)
    : yT(e, t);
  return (t ? t.scope_ : fy()).drafts_.push(n), n;
}
function py(e) {
  return un(e) || Ye(10, e), my(e);
}
function my(e) {
  if (!It(e) || na(e)) return e;
  const t = e[De];
  let n;
  if (t) {
    if (!t.modified_) return t.base_;
    (t.finalized_ = !0), (n = lu(e, t.scope_.immer_.useStrictShallowCopy_));
  } else n = lu(e, !0);
  return (
    Cs(n, (r, i) => {
      dy(n, r, my(i));
    }),
    t && (t.finalized_ = !1),
    n
  );
}
var Ue = new wT(),
  gy = Ue.produce;
Ue.produceWithPatches.bind(Ue);
Ue.setAutoFreeze.bind(Ue);
Ue.setUseStrictShallowCopy.bind(Ue);
Ue.applyPatches.bind(Ue);
Ue.createDraft.bind(Ue);
Ue.finishDraft.bind(Ue);
function _T(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function") throw new TypeError(t);
}
function ET(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object") throw new TypeError(t);
}
function ST(
  e,
  t = "expected all items to be functions, instead received the following types: "
) {
  if (!e.every((n) => typeof n == "function")) {
    const n = e
      .map((r) =>
        typeof r == "function" ? `function ${r.name || "unnamed"}()` : typeof r
      )
      .join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var ah = (e) => (Array.isArray(e) ? e : [e]);
function kT(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return (
    ST(
      t,
      "createSelector expects all input-selectors to be functions, but received the following types: "
    ),
    t
  );
}
function CT(e, t) {
  const n = [],
    { length: r } = e;
  for (let i = 0; i < r; i++) n.push(e[i].apply(null, t));
  return n;
}
var TT = class {
    constructor(e) {
      this.value = e;
    }
    deref() {
      return this.value;
    }
  },
  xT = typeof WeakRef < "u" ? WeakRef : TT,
  IT = 0,
  lh = 1;
function _o() {
  return { s: IT, v: void 0, o: null, p: null };
}
function Hc(e, t = {}) {
  let n = _o();
  const { resultEqualityCheck: r } = t;
  let i,
    o = 0;
  function s() {
    var d;
    let a = n;
    const { length: l } = arguments;
    for (let f = 0, v = l; f < v; f++) {
      const g = arguments[f];
      if (typeof g == "function" || (typeof g == "object" && g !== null)) {
        let y = a.o;
        y === null && (a.o = y = new WeakMap());
        const E = y.get(g);
        E === void 0 ? ((a = _o()), y.set(g, a)) : (a = E);
      } else {
        let y = a.p;
        y === null && (a.p = y = new Map());
        const E = y.get(g);
        E === void 0 ? ((a = _o()), y.set(g, a)) : (a = E);
      }
    }
    const u = a;
    let c;
    if (a.s === lh) c = a.v;
    else if (((c = e.apply(null, arguments)), o++, r)) {
      const f =
        ((d = i == null ? void 0 : i.deref) == null ? void 0 : d.call(i)) ?? i;
      f != null && r(f, c) && ((c = f), o !== 0 && o--),
        (i =
          (typeof c == "object" && c !== null) || typeof c == "function"
            ? new xT(c)
            : c);
    }
    return (u.s = lh), (u.v = c), c;
  }
  return (
    (s.clearCache = () => {
      (n = _o()), s.resetResultsCount();
    }),
    (s.resultsCount = () => o),
    (s.resetResultsCount = () => {
      o = 0;
    }),
    s
  );
}
function yy(e, ...t) {
  const n = typeof e == "function" ? { memoize: e, memoizeOptions: t } : e,
    r = (...i) => {
      let o = 0,
        s = 0,
        a,
        l = {},
        u = i.pop();
      typeof u == "object" && ((l = u), (u = i.pop())),
        _T(
          u,
          `createSelector expects an output function after the inputs, but received: [${typeof u}]`
        );
      const c = { ...n, ...l },
        {
          memoize: d,
          memoizeOptions: f = [],
          argsMemoize: v = Hc,
          argsMemoizeOptions: g = [],
          devModeChecks: y = {},
        } = c,
        E = ah(f),
        h = ah(g),
        p = kT(i),
        m = d(function () {
          return o++, u.apply(null, arguments);
        }, ...E),
        _ = v(function () {
          s++;
          const x = CT(p, arguments);
          return (a = m.apply(null, x)), a;
        }, ...h);
      return Object.assign(_, {
        resultFunc: u,
        memoizedResultFunc: m,
        dependencies: p,
        dependencyRecomputations: () => s,
        resetDependencyRecomputations: () => {
          s = 0;
        },
        lastResult: () => a,
        recomputations: () => o,
        resetRecomputations: () => {
          o = 0;
        },
        memoize: d,
        argsMemoize: v,
      });
    };
  return Object.assign(r, { withTypes: () => r }), r;
}
var RT = yy(Hc),
  PT = Object.assign(
    (e, t = RT) => {
      ET(
        e,
        `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
      );
      const n = Object.keys(e),
        r = n.map((o) => e[o]);
      return t(r, (...o) => o.reduce((s, a, l) => ((s[n[l]] = a), s), {}));
    },
    { withTypes: () => PT }
  );
function vy(e) {
  return ({ dispatch: n, getState: r }) =>
    (i) =>
    (o) =>
      typeof o == "function" ? o(n, r, e) : i(o);
}
var NT = vy(),
  OT = vy,
  bT = (...e) => {
    const t = yy(...e),
      n = Object.assign(
        (...r) => {
          const i = t(...r),
            o = (s, ...a) => i(un(s) ? py(s) : s, ...a);
          return Object.assign(o, i), o;
        },
        { withTypes: () => n }
      );
    return n;
  };
bT(Hc);
var AT =
  typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : function () {
        if (arguments.length !== 0)
          return typeof arguments[0] == "object"
            ? ks
            : ks.apply(null, arguments);
      };
function Cr(e, t) {
  function n(...r) {
    if (t) {
      let i = t(...r);
      if (!i) throw new Error(xe(0));
      return {
        type: e,
        payload: i.payload,
        ...("meta" in i && { meta: i.meta }),
        ...("error" in i && { error: i.error }),
      };
    }
    return { type: e, payload: r[0] };
  }
  return (
    (n.toString = () => `${e}`),
    (n.type = e),
    (n.match = (r) => cT(r) && r.type === e),
    n
  );
}
var wy = class Zr extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Zr.prototype);
  }
  static get [Symbol.species]() {
    return Zr;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0])
      ? new Zr(...t[0].concat(this))
      : new Zr(...t.concat(this));
  }
};
function uh(e) {
  return It(e) ? gy(e, () => {}) : e;
}
function ch(e, t, n) {
  if (e.has(t)) {
    let i = e.get(t);
    return n.update && ((i = n.update(i, t, e)), e.set(t, i)), i;
  }
  if (!n.insert) throw new Error(xe(10));
  const r = n.insert(t, e);
  return e.set(t, r), r;
}
function LT(e) {
  return typeof e == "boolean";
}
var DT = () =>
    function (t) {
      const {
        thunk: n = !0,
        immutableCheck: r = !0,
        serializableCheck: i = !0,
        actionCreatorCheck: o = !0,
      } = t ?? {};
      let s = new wy();
      return n && (LT(n) ? s.push(NT) : s.push(OT(n.extraArgument))), s;
    },
  UT = "RTK_autoBatch",
  _y = (e) => (t) => {
    setTimeout(t, e);
  },
  MT =
    typeof window < "u" && window.requestAnimationFrame
      ? window.requestAnimationFrame
      : _y(10),
  jT =
    (e = { type: "raf" }) =>
    (t) =>
    (...n) => {
      const r = t(...n);
      let i = !0,
        o = !1,
        s = !1;
      const a = new Set(),
        l =
          e.type === "tick"
            ? queueMicrotask
            : e.type === "raf"
            ? MT
            : e.type === "callback"
            ? e.queueNotification
            : _y(e.timeout),
        u = () => {
          (s = !1), o && ((o = !1), a.forEach((c) => c()));
        };
      return Object.assign({}, r, {
        subscribe(c) {
          const d = () => i && c(),
            f = r.subscribe(d);
          return (
            a.add(c),
            () => {
              f(), a.delete(c);
            }
          );
        },
        dispatch(c) {
          var d;
          try {
            return (
              (i = !((d = c == null ? void 0 : c.meta) != null && d[UT])),
              (o = !i),
              o && (s || ((s = !0), l(u))),
              r.dispatch(c)
            );
          } finally {
            i = !0;
          }
        },
      });
    },
  FT = (e) =>
    function (n) {
      const { autoBatch: r = !0 } = n ?? {};
      let i = new wy(e);
      return r && i.push(jT(typeof r == "object" ? r : void 0)), i;
    },
  BT = !0;
function zT(e) {
  const t = DT(),
    {
      reducer: n = void 0,
      middleware: r,
      devTools: i = !0,
      preloadedState: o = void 0,
      enhancers: s = void 0,
    } = e || {};
  let a;
  if (typeof n == "function") a = n;
  else if (Bc(n)) a = ly(n);
  else throw new Error(xe(1));
  let l;
  typeof r == "function" ? (l = r(t)) : (l = t());
  let u = ks;
  i && (u = AT({ trace: !BT, ...(typeof i == "object" && i) }));
  const c = uT(...l),
    d = FT(c);
  let f = typeof s == "function" ? s(d) : d();
  const v = u(...f);
  return ay(a, o, v);
}
function Ey(e) {
  const t = {},
    n = [];
  let r;
  const i = {
    addCase(o, s) {
      const a = typeof o == "string" ? o : o.type;
      if (!a) throw new Error(xe(28));
      if (a in t) throw new Error(xe(29));
      return (t[a] = s), i;
    },
    addMatcher(o, s) {
      return n.push({ matcher: o, reducer: s }), i;
    },
    addDefaultCase(o) {
      return (r = o), i;
    },
  };
  return e(i), [t, n, r];
}
function $T(e) {
  return typeof e == "function";
}
function HT(e, t) {
  let [n, r, i] = Ey(t),
    o;
  if ($T(e)) o = () => uh(e());
  else {
    const a = uh(e);
    o = () => a;
  }
  function s(a = o(), l) {
    let u = [
      n[l.type],
      ...r.filter(({ matcher: c }) => c(l)).map(({ reducer: c }) => c),
    ];
    return (
      u.filter((c) => !!c).length === 0 && (u = [i]),
      u.reduce((c, d) => {
        if (d)
          if (un(c)) {
            const v = d(c, l);
            return v === void 0 ? c : v;
          } else {
            if (It(c)) return gy(c, (f) => d(f, l));
            {
              const f = d(c, l);
              if (f === void 0) {
                if (c === null) return c;
                throw new Error(xe(9));
              }
              return f;
            }
          }
        return c;
      }, a)
    );
  }
  return (s.getInitialState = o), s;
}
var VT = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  WT = (e = 21) => {
    let t = "",
      n = e;
    for (; n--; ) t += VT[(Math.random() * 64) | 0];
    return t;
  },
  KT = Symbol.for("rtk-slice-createasyncthunk");
function GT(e, t) {
  return `${e}/${t}`;
}
function qT({ creators: e } = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[KT];
  return function (i) {
    const { name: o, reducerPath: s = o } = i;
    if (!o) throw new Error(xe(11));
    typeof process < "u";
    const a =
        (typeof i.reducers == "function" ? i.reducers(QT()) : i.reducers) || {},
      l = Object.keys(a),
      u = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      c = {
        addCase(m, _) {
          const k = typeof m == "string" ? m : m.type;
          if (!k) throw new Error(xe(12));
          if (k in u.sliceCaseReducersByType) throw new Error(xe(13));
          return (u.sliceCaseReducersByType[k] = _), c;
        },
        addMatcher(m, _) {
          return u.sliceMatchers.push({ matcher: m, reducer: _ }), c;
        },
        exposeAction(m, _) {
          return (u.actionCreators[m] = _), c;
        },
        exposeCaseReducer(m, _) {
          return (u.sliceCaseReducersByName[m] = _), c;
        },
      };
    l.forEach((m) => {
      const _ = a[m],
        k = {
          reducerName: m,
          type: GT(o, m),
          createNotation: typeof i.reducers == "function",
        };
      YT(_) ? ex(k, _, c, t) : XT(k, _, c);
    });
    function d() {
      const [m = {}, _ = [], k = void 0] =
          typeof i.extraReducers == "function"
            ? Ey(i.extraReducers)
            : [i.extraReducers],
        x = { ...m, ...u.sliceCaseReducersByType };
      return HT(i.initialState, (I) => {
        for (let R in x) I.addCase(R, x[R]);
        for (let R of u.sliceMatchers) I.addMatcher(R.matcher, R.reducer);
        for (let R of _) I.addMatcher(R.matcher, R.reducer);
        k && I.addDefaultCase(k);
      });
    }
    const f = (m) => m,
      v = new Map();
    let g;
    function y(m, _) {
      return g || (g = d()), g(m, _);
    }
    function E() {
      return g || (g = d()), g.getInitialState();
    }
    function h(m, _ = !1) {
      function k(I) {
        let R = I[m];
        return typeof R > "u" && _ && (R = E()), R;
      }
      function x(I = f) {
        const R = ch(v, _, { insert: () => new WeakMap() });
        return ch(R, I, {
          insert: () => {
            const F = {};
            for (const [L, Re] of Object.entries(i.selectors ?? {}))
              F[L] = JT(Re, I, E, _);
            return F;
          },
        });
      }
      return {
        reducerPath: m,
        getSelectors: x,
        get selectors() {
          return x(k);
        },
        selectSlice: k,
      };
    }
    const p = {
      name: o,
      reducer: y,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: E,
      ...h(s),
      injectInto(m, { reducerPath: _, ...k } = {}) {
        const x = _ ?? s;
        return (
          m.inject({ reducerPath: x, reducer: y }, k), { ...p, ...h(x, !0) }
        );
      },
    };
    return p;
  };
}
function JT(e, t, n, r) {
  function i(o, ...s) {
    let a = t(o);
    return typeof a > "u" && r && (a = n()), e(a, ...s);
  }
  return (i.unwrapped = e), i;
}
var Vc = qT();
function QT() {
  function e(t, n) {
    return { _reducerDefinitionType: "asyncThunk", payloadCreator: t, ...n };
  }
  return (
    (e.withTypes = () => e),
    {
      reducer(t) {
        return Object.assign(
          {
            [t.name](...n) {
              return t(...n);
            },
          }[t.name],
          { _reducerDefinitionType: "reducer" }
        );
      },
      preparedReducer(t, n) {
        return {
          _reducerDefinitionType: "reducerWithPrepare",
          prepare: t,
          reducer: n,
        };
      },
      asyncThunk: e,
    }
  );
}
function XT({ type: e, reducerName: t, createNotation: n }, r, i) {
  let o, s;
  if ("reducer" in r) {
    if (n && !ZT(r)) throw new Error(xe(17));
    (o = r.reducer), (s = r.prepare);
  } else o = r;
  i.addCase(e, o)
    .exposeCaseReducer(t, o)
    .exposeAction(t, s ? Cr(e, s) : Cr(e));
}
function YT(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function ZT(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function ex({ type: e, reducerName: t }, n, r, i) {
  if (!i) throw new Error(xe(18));
  const {
      payloadCreator: o,
      fulfilled: s,
      pending: a,
      rejected: l,
      settled: u,
      options: c,
    } = n,
    d = i(e, o, c);
  r.exposeAction(t, d),
    s && r.addCase(d.fulfilled, s),
    a && r.addCase(d.pending, a),
    l && r.addCase(d.rejected, l),
    u && r.addMatcher(d.settled, u),
    r.exposeCaseReducer(t, {
      fulfilled: s || Eo,
      pending: a || Eo,
      rejected: l || Eo,
      settled: u || Eo,
    });
}
function Eo() {}
var tx = (e, t) => {
    if (typeof e != "function") throw new Error(xe(32));
  },
  Wc = "listenerMiddleware",
  nx = (e) => {
    let { type: t, actionCreator: n, matcher: r, predicate: i, effect: o } = e;
    if (t) i = Cr(t).match;
    else if (n) (t = n.type), (i = n.match);
    else if (r) i = r;
    else if (!i) throw new Error(xe(21));
    return tx(o), { predicate: i, type: t, effect: o };
  },
  rx = Object.assign(
    (e) => {
      const { type: t, predicate: n, effect: r } = nx(e);
      return {
        id: WT(),
        effect: r,
        type: t,
        predicate: n,
        pending: new Set(),
        unsubscribe: () => {
          throw new Error(xe(22));
        },
      };
    },
    { withTypes: () => rx }
  ),
  ix = Object.assign(Cr(`${Wc}/add`), { withTypes: () => ix });
Cr(`${Wc}/removeAll`);
var ox = Object.assign(Cr(`${Wc}/remove`), { withTypes: () => ox });
function xe(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const sx = {
    currentUser: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  Sy = Vc({
    name: "user",
    initialState: sx,
    reducers: {
      setCurrentUser: (e, t) => {
        console.log(t.payload),
          localStorage.setItem("user", JSON.stringify(t.payload)),
          (e.currentUser = t.payload);
      },
    },
  }),
  { setCurrentUser: Is, clearCurrentUser: aR } = Sy.actions,
  ax = Sy.reducer,
  lx = { token: null, isAuth: localStorage.getItem("auth") || !1 },
  ky = Vc({
    name: "auth",
    initialState: lx,
    reducers: {
      setAuth: (e, t) => {
        console.log("action.payload", t.payload),
          (e.token = t.payload.token),
          (e.isAuth = t.payload.isAuth),
          localStorage.setItem("auth", t.payload.isAuth);
      },
      resetAuth: (e) => {
        (e.token = null), (e.isAuth = !1), localStorage.removeItem("auth");
      },
    },
  }),
  { setAuth: hu, resetAuth: ux } = ky.actions,
  cx = ky.reducer;
function Tr(e) {
  switch (e) {
    case "auth/invalid-password":
    case "auth/invalid-credential":
      return "Email or password is invalid!";
    case "auth/invalid-email":
      return "Invalid email format!";
    case "auth/weak-password":
      return "Weak password!";
    case "auth/email-already-in-use":
      return "Email address already exists!";
    default:
      return "An unexpected error occured!";
  }
}
const Kc = "https://penpal-prod.vercel.app/api/v1",
  ra = () =>
    w.jsx("div", {
      className:
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
      children: w.jsx("div", {
        className:
          "md:h-20 h-16 md:w-20 w-16  bg-gray-300 rounded-lg p-6 flex justify-center items-center relative",
        children: w.jsx("div", {
          role: "status",
          className:
            "absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2",
          children: w.jsxs("svg", {
            "aria-hidden": "true",
            className:
              "w-8 h-8 text-white animate-spin dark:text-gray-600 fill-fr-blue",
            viewBox: "0 0 100 101",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              w.jsx("path", {
                d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                fill: "currentColor",
              }),
              w.jsx("path", {
                d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                fill: "currentFill",
              }),
            ],
          }),
        }),
      }),
    });
function Cy(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: dx } = Object.prototype,
  { getPrototypeOf: Gc } = Object,
  ia = ((e) => (t) => {
    const n = dx.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  it = (e) => ((e = e.toLowerCase()), (t) => ia(t) === e),
  oa = (e) => (t) => typeof t === e,
  { isArray: Ar } = Array,
  Di = oa("undefined");
function fx(e) {
  return (
    e !== null &&
    !Di(e) &&
    e.constructor !== null &&
    !Di(e.constructor) &&
    Ve(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Ty = it("ArrayBuffer");
function hx(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Ty(e.buffer)),
    t
  );
}
const px = oa("string"),
  Ve = oa("function"),
  xy = oa("number"),
  sa = (e) => e !== null && typeof e == "object",
  mx = (e) => e === !0 || e === !1,
  jo = (e) => {
    if (ia(e) !== "object") return !1;
    const t = Gc(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  gx = it("Date"),
  yx = it("File"),
  vx = it("Blob"),
  wx = it("FileList"),
  _x = (e) => sa(e) && Ve(e.pipe),
  Ex = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (Ve(e.append) &&
          ((t = ia(e)) === "formdata" ||
            (t === "object" &&
              Ve(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  Sx = it("URLSearchParams"),
  [kx, Cx, Tx, xx] = ["ReadableStream", "Request", "Response", "Headers"].map(
    it
  ),
  Ix = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ji(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, i;
  if ((typeof e != "object" && (e = [e]), Ar(e)))
    for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      s = o.length;
    let a;
    for (r = 0; r < s; r++) (a = o[r]), t.call(null, e[a], a, e);
  }
}
function Iy(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    i;
  for (; r-- > 0; ) if (((i = n[r]), t === i.toLowerCase())) return i;
  return null;
}
const Ry =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  Py = (e) => !Di(e) && e !== Ry;
function pu() {
  const { caseless: e } = (Py(this) && this) || {},
    t = {},
    n = (r, i) => {
      const o = (e && Iy(t, i)) || i;
      jo(t[o]) && jo(r)
        ? (t[o] = pu(t[o], r))
        : jo(r)
        ? (t[o] = pu({}, r))
        : Ar(r)
        ? (t[o] = r.slice())
        : (t[o] = r);
    };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && Ji(arguments[r], n);
  return t;
}
const Rx = (e, t, n, { allOwnKeys: r } = {}) => (
    Ji(
      t,
      (i, o) => {
        n && Ve(i) ? (e[o] = Cy(i, n)) : (e[o] = i);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  Px = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  Nx = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  Ox = (e, t, n, r) => {
    let i, o, s;
    const a = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (i = Object.getOwnPropertyNames(e), o = i.length; o-- > 0; )
        (s = i[o]), (!r || r(s, e, t)) && !a[s] && ((t[s] = e[s]), (a[s] = !0));
      e = n !== !1 && Gc(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  bx = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  Ax = (e) => {
    if (!e) return null;
    if (Ar(e)) return e;
    let t = e.length;
    if (!xy(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  Lx = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Gc(Uint8Array)),
  Dx = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let i;
    for (; (i = r.next()) && !i.done; ) {
      const o = i.value;
      t.call(e, o[0], o[1]);
    }
  },
  Ux = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  Mx = it("HTMLFormElement"),
  jx = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, i) {
      return r.toUpperCase() + i;
    }),
  dh = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  Fx = it("RegExp"),
  Ny = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    Ji(n, (i, o) => {
      let s;
      (s = t(i, o, e)) !== !1 && (r[o] = s || i);
    }),
      Object.defineProperties(e, r);
  },
  Bx = (e) => {
    Ny(e, (t, n) => {
      if (Ve(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (Ve(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  zx = (e, t) => {
    const n = {},
      r = (i) => {
        i.forEach((o) => {
          n[o] = !0;
        });
      };
    return Ar(e) ? r(e) : r(String(e).split(t)), n;
  },
  $x = () => {},
  Hx = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t),
  Xa = "abcdefghijklmnopqrstuvwxyz",
  fh = "0123456789",
  Oy = { DIGIT: fh, ALPHA: Xa, ALPHA_DIGIT: Xa + Xa.toUpperCase() + fh },
  Vx = (e = 16, t = Oy.ALPHA_DIGIT) => {
    let n = "";
    const { length: r } = t;
    for (; e--; ) n += t[(Math.random() * r) | 0];
    return n;
  };
function Wx(e) {
  return !!(
    e &&
    Ve(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
const Kx = (e) => {
    const t = new Array(10),
      n = (r, i) => {
        if (sa(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[i] = r;
            const o = Ar(r) ? [] : {};
            return (
              Ji(r, (s, a) => {
                const l = n(s, i + 1);
                !Di(l) && (o[a] = l);
              }),
              (t[i] = void 0),
              o
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  Gx = it("AsyncFunction"),
  qx = (e) => e && (sa(e) || Ve(e)) && Ve(e.then) && Ve(e.catch),
  S = {
    isArray: Ar,
    isArrayBuffer: Ty,
    isBuffer: fx,
    isFormData: Ex,
    isArrayBufferView: hx,
    isString: px,
    isNumber: xy,
    isBoolean: mx,
    isObject: sa,
    isPlainObject: jo,
    isReadableStream: kx,
    isRequest: Cx,
    isResponse: Tx,
    isHeaders: xx,
    isUndefined: Di,
    isDate: gx,
    isFile: yx,
    isBlob: vx,
    isRegExp: Fx,
    isFunction: Ve,
    isStream: _x,
    isURLSearchParams: Sx,
    isTypedArray: Lx,
    isFileList: wx,
    forEach: Ji,
    merge: pu,
    extend: Rx,
    trim: Ix,
    stripBOM: Px,
    inherits: Nx,
    toFlatObject: Ox,
    kindOf: ia,
    kindOfTest: it,
    endsWith: bx,
    toArray: Ax,
    forEachEntry: Dx,
    matchAll: Ux,
    isHTMLForm: Mx,
    hasOwnProperty: dh,
    hasOwnProp: dh,
    reduceDescriptors: Ny,
    freezeMethods: Bx,
    toObjectSet: zx,
    toCamelCase: jx,
    noop: $x,
    toFiniteNumber: Hx,
    findKey: Iy,
    global: Ry,
    isContextDefined: Py,
    ALPHABET: Oy,
    generateString: Vx,
    isSpecCompliantForm: Wx,
    toJSONObject: Kx,
    isAsyncFn: Gx,
    isThenable: qx,
  };
function b(e, t, n, r, i) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    i && (this.response = i);
}
S.inherits(b, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: S.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const by = b.prototype,
  Ay = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  Ay[e] = { value: e };
});
Object.defineProperties(b, Ay);
Object.defineProperty(by, "isAxiosError", { value: !0 });
b.from = (e, t, n, r, i, o) => {
  const s = Object.create(by);
  return (
    S.toFlatObject(
      e,
      s,
      function (l) {
        return l !== Error.prototype;
      },
      (a) => a !== "isAxiosError"
    ),
    b.call(s, e.message, t, n, r, i),
    (s.cause = e),
    (s.name = e.name),
    o && Object.assign(s, o),
    s
  );
};
const Jx = null;
function mu(e) {
  return S.isPlainObject(e) || S.isArray(e);
}
function Ly(e) {
  return S.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function hh(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (i, o) {
          return (i = Ly(i)), !n && o ? "[" + i + "]" : i;
        })
        .join(n ? "." : "")
    : t;
}
function Qx(e) {
  return S.isArray(e) && !e.some(mu);
}
const Xx = S.toFlatObject(S, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function aa(e, t, n) {
  if (!S.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = S.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (y, E) {
        return !S.isUndefined(E[y]);
      }
    ));
  const r = n.metaTokens,
    i = n.visitor || c,
    o = n.dots,
    s = n.indexes,
    l = (n.Blob || (typeof Blob < "u" && Blob)) && S.isSpecCompliantForm(t);
  if (!S.isFunction(i)) throw new TypeError("visitor must be a function");
  function u(g) {
    if (g === null) return "";
    if (S.isDate(g)) return g.toISOString();
    if (!l && S.isBlob(g))
      throw new b("Blob is not supported. Use a Buffer instead.");
    return S.isArrayBuffer(g) || S.isTypedArray(g)
      ? l && typeof Blob == "function"
        ? new Blob([g])
        : Buffer.from(g)
      : g;
  }
  function c(g, y, E) {
    let h = g;
    if (g && !E && typeof g == "object") {
      if (S.endsWith(y, "{}"))
        (y = r ? y : y.slice(0, -2)), (g = JSON.stringify(g));
      else if (
        (S.isArray(g) && Qx(g)) ||
        ((S.isFileList(g) || S.endsWith(y, "[]")) && (h = S.toArray(g)))
      )
        return (
          (y = Ly(y)),
          h.forEach(function (m, _) {
            !(S.isUndefined(m) || m === null) &&
              t.append(
                s === !0 ? hh([y], _, o) : s === null ? y : y + "[]",
                u(m)
              );
          }),
          !1
        );
    }
    return mu(g) ? !0 : (t.append(hh(E, y, o), u(g)), !1);
  }
  const d = [],
    f = Object.assign(Xx, {
      defaultVisitor: c,
      convertValue: u,
      isVisitable: mu,
    });
  function v(g, y) {
    if (!S.isUndefined(g)) {
      if (d.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      d.push(g),
        S.forEach(g, function (h, p) {
          (!(S.isUndefined(h) || h === null) &&
            i.call(t, h, S.isString(p) ? p.trim() : p, y, f)) === !0 &&
            v(h, y ? y.concat(p) : [p]);
        }),
        d.pop();
    }
  }
  if (!S.isObject(e)) throw new TypeError("data must be an object");
  return v(e), t;
}
function ph(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function qc(e, t) {
  (this._pairs = []), e && aa(e, this, t);
}
const Dy = qc.prototype;
Dy.append = function (t, n) {
  this._pairs.push([t, n]);
};
Dy.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, ph);
      }
    : ph;
  return this._pairs
    .map(function (i) {
      return n(i[0]) + "=" + n(i[1]);
    }, "")
    .join("&");
};
function Yx(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function Uy(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || Yx,
    i = n && n.serialize;
  let o;
  if (
    (i
      ? (o = i(t, n))
      : (o = S.isURLSearchParams(t) ? t.toString() : new qc(t, n).toString(r)),
    o)
  ) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o);
  }
  return e;
}
class mh {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    S.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const My = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Zx = typeof URLSearchParams < "u" ? URLSearchParams : qc,
  eI = typeof FormData < "u" ? FormData : null,
  tI = typeof Blob < "u" ? Blob : null,
  nI = {
    isBrowser: !0,
    classes: { URLSearchParams: Zx, FormData: eI, Blob: tI },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Jc = typeof window < "u" && typeof document < "u",
  rI = ((e) => Jc && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(
    typeof navigator < "u" && navigator.product
  ),
  iI =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  oI = (Jc && window.location.href) || "http://localhost",
  sI = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Jc,
        hasStandardBrowserEnv: rI,
        hasStandardBrowserWebWorkerEnv: iI,
        origin: oI,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  nt = { ...sI, ...nI };
function aI(e, t) {
  return aa(
    e,
    new nt.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, i, o) {
          return nt.isNode && S.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : o.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function lI(e) {
  return S.matchAll(/\w+|\[(\w*)]/g, e).map((t) =>
    t[0] === "[]" ? "" : t[1] || t[0]
  );
}
function uI(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const i = n.length;
  let o;
  for (r = 0; r < i; r++) (o = n[r]), (t[o] = e[o]);
  return t;
}
function jy(e) {
  function t(n, r, i, o) {
    let s = n[o++];
    if (s === "__proto__") return !0;
    const a = Number.isFinite(+s),
      l = o >= n.length;
    return (
      (s = !s && S.isArray(i) ? i.length : s),
      l
        ? (S.hasOwnProp(i, s) ? (i[s] = [i[s], r]) : (i[s] = r), !a)
        : ((!i[s] || !S.isObject(i[s])) && (i[s] = []),
          t(n, r, i[s], o) && S.isArray(i[s]) && (i[s] = uI(i[s])),
          !a)
    );
  }
  if (S.isFormData(e) && S.isFunction(e.entries)) {
    const n = {};
    return (
      S.forEachEntry(e, (r, i) => {
        t(lI(r), i, n, 0);
      }),
      n
    );
  }
  return null;
}
function cI(e, t, n) {
  if (S.isString(e))
    try {
      return (t || JSON.parse)(e), S.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const Qi = {
  transitional: My,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        i = r.indexOf("application/json") > -1,
        o = S.isObject(t);
      if ((o && S.isHTMLForm(t) && (t = new FormData(t)), S.isFormData(t)))
        return i ? JSON.stringify(jy(t)) : t;
      if (
        S.isArrayBuffer(t) ||
        S.isBuffer(t) ||
        S.isStream(t) ||
        S.isFile(t) ||
        S.isBlob(t) ||
        S.isReadableStream(t)
      )
        return t;
      if (S.isArrayBufferView(t)) return t.buffer;
      if (S.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let a;
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return aI(t, this.formSerializer).toString();
        if ((a = S.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const l = this.env && this.env.FormData;
          return aa(
            a ? { "files[]": t } : t,
            l && new l(),
            this.formSerializer
          );
        }
      }
      return o || i ? (n.setContentType("application/json", !1), cI(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || Qi.transitional,
        r = n && n.forcedJSONParsing,
        i = this.responseType === "json";
      if (S.isResponse(t) || S.isReadableStream(t)) return t;
      if (t && S.isString(t) && ((r && !this.responseType) || i)) {
        const s = !(n && n.silentJSONParsing) && i;
        try {
          return JSON.parse(t);
        } catch (a) {
          if (s)
            throw a.name === "SyntaxError"
              ? b.from(a, b.ERR_BAD_RESPONSE, this, null, this.response)
              : a;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: nt.classes.FormData, Blob: nt.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
S.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Qi.headers[e] = {};
});
const dI = S.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  fI = (e) => {
    const t = {};
    let n, r, i;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (s) {
            (i = s.indexOf(":")),
              (n = s.substring(0, i).trim().toLowerCase()),
              (r = s.substring(i + 1).trim()),
              !(!n || (t[n] && dI[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r));
          }),
      t
    );
  },
  gh = Symbol("internals");
function Kr(e) {
  return e && String(e).trim().toLowerCase();
}
function Fo(e) {
  return e === !1 || e == null ? e : S.isArray(e) ? e.map(Fo) : String(e);
}
function hI(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const pI = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ya(e, t, n, r, i) {
  if (S.isFunction(r)) return r.call(this, t, n);
  if ((i && (t = n), !!S.isString(t))) {
    if (S.isString(r)) return t.indexOf(r) !== -1;
    if (S.isRegExp(r)) return r.test(t);
  }
}
function mI(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function gI(e, t) {
  const n = S.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (i, o, s) {
        return this[r].call(this, t, i, o, s);
      },
      configurable: !0,
    });
  });
}
class Ie {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function o(a, l, u) {
      const c = Kr(l);
      if (!c) throw new Error("header name must be a non-empty string");
      const d = S.findKey(i, c);
      (!d || i[d] === void 0 || u === !0 || (u === void 0 && i[d] !== !1)) &&
        (i[d || l] = Fo(a));
    }
    const s = (a, l) => S.forEach(a, (u, c) => o(u, c, l));
    if (S.isPlainObject(t) || t instanceof this.constructor) s(t, n);
    else if (S.isString(t) && (t = t.trim()) && !pI(t)) s(fI(t), n);
    else if (S.isHeaders(t)) for (const [a, l] of t.entries()) o(l, a, r);
    else t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (((t = Kr(t)), t)) {
      const r = S.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n) return i;
        if (n === !0) return hI(i);
        if (S.isFunction(n)) return n.call(this, i, r);
        if (S.isRegExp(n)) return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = Kr(t)), t)) {
      const r = S.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Ya(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let i = !1;
    function o(s) {
      if (((s = Kr(s)), s)) {
        const a = S.findKey(r, s);
        a && (!n || Ya(r, r[a], a, n)) && (delete r[a], (i = !0));
      }
    }
    return S.isArray(t) ? t.forEach(o) : o(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      i = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || Ya(this, this[o], o, t, !0)) && (delete this[o], (i = !0));
    }
    return i;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      S.forEach(this, (i, o) => {
        const s = S.findKey(r, o);
        if (s) {
          (n[s] = Fo(i)), delete n[o];
          return;
        }
        const a = t ? mI(o) : String(o).trim();
        a !== o && delete n[o], (n[a] = Fo(i)), (r[a] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      S.forEach(this, (r, i) => {
        r != null && r !== !1 && (n[i] = t && S.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[gh] = this[gh] = { accessors: {} }).accessors,
      i = this.prototype;
    function o(s) {
      const a = Kr(s);
      r[a] || (gI(i, s), (r[a] = !0));
    }
    return S.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
Ie.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
S.reduceDescriptors(Ie.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
S.freezeMethods(Ie);
function Za(e, t) {
  const n = this || Qi,
    r = t || n,
    i = Ie.from(r.headers);
  let o = r.data;
  return (
    S.forEach(e, function (a) {
      o = a.call(n, o, i.normalize(), t ? t.status : void 0);
    }),
    i.normalize(),
    o
  );
}
function Fy(e) {
  return !!(e && e.__CANCEL__);
}
function Lr(e, t, n) {
  b.call(this, e ?? "canceled", b.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
S.inherits(Lr, b, { __CANCEL__: !0 });
function By(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new b(
          "Request failed with status code " + n.status,
          [b.ERR_BAD_REQUEST, b.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
function yI(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function vI(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let i = 0,
    o = 0,
    s;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (l) {
      const u = Date.now(),
        c = r[o];
      s || (s = u), (n[i] = l), (r[i] = u);
      let d = o,
        f = 0;
      for (; d !== i; ) (f += n[d++]), (d = d % e);
      if (((i = (i + 1) % e), i === o && (o = (o + 1) % e), u - s < t)) return;
      const v = c && u - c;
      return v ? Math.round((f * 1e3) / v) : void 0;
    }
  );
}
function wI(e, t) {
  let n = 0;
  const r = 1e3 / t;
  let i = null;
  return function () {
    const s = this === !0,
      a = Date.now();
    if (s || a - n > r)
      return (
        i && (clearTimeout(i), (i = null)), (n = a), e.apply(null, arguments)
      );
    i ||
      (i = setTimeout(
        () => ((i = null), (n = Date.now()), e.apply(null, arguments)),
        r - (a - n)
      ));
  };
}
const Rs = (e, t, n = 3) => {
    let r = 0;
    const i = vI(50, 250);
    return wI((o) => {
      const s = o.loaded,
        a = o.lengthComputable ? o.total : void 0,
        l = s - r,
        u = i(l),
        c = s <= a;
      r = s;
      const d = {
        loaded: s,
        total: a,
        progress: a ? s / a : void 0,
        bytes: l,
        rate: u || void 0,
        estimated: u && a && c ? (a - s) / u : void 0,
        event: o,
        lengthComputable: a != null,
      };
      (d[t ? "download" : "upload"] = !0), e(d);
    }, n);
  },
  _I = nt.hasStandardBrowserEnv
    ? (function () {
        const t = /(msie|trident)/i.test(navigator.userAgent),
          n = document.createElement("a");
        let r;
        function i(o) {
          let s = o;
          return (
            t && (n.setAttribute("href", s), (s = n.href)),
            n.setAttribute("href", s),
            {
              href: n.href,
              protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
              host: n.host,
              search: n.search ? n.search.replace(/^\?/, "") : "",
              hash: n.hash ? n.hash.replace(/^#/, "") : "",
              hostname: n.hostname,
              port: n.port,
              pathname:
                n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
            }
          );
        }
        return (
          (r = i(window.location.href)),
          function (s) {
            const a = S.isString(s) ? i(s) : s;
            return a.protocol === r.protocol && a.host === r.host;
          }
        );
      })()
    : (function () {
        return function () {
          return !0;
        };
      })(),
  EI = nt.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, i, o) {
          const s = [e + "=" + encodeURIComponent(t)];
          S.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()),
            S.isString(r) && s.push("path=" + r),
            S.isString(i) && s.push("domain=" + i),
            o === !0 && s.push("secure"),
            (document.cookie = s.join("; "));
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
          );
          return t ? decodeURIComponent(t[3]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function SI(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function kI(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function zy(e, t) {
  return e && !SI(t) ? kI(e, t) : t;
}
const yh = (e) => (e instanceof Ie ? { ...e } : e);
function Fn(e, t) {
  t = t || {};
  const n = {};
  function r(u, c, d) {
    return S.isPlainObject(u) && S.isPlainObject(c)
      ? S.merge.call({ caseless: d }, u, c)
      : S.isPlainObject(c)
      ? S.merge({}, c)
      : S.isArray(c)
      ? c.slice()
      : c;
  }
  function i(u, c, d) {
    if (S.isUndefined(c)) {
      if (!S.isUndefined(u)) return r(void 0, u, d);
    } else return r(u, c, d);
  }
  function o(u, c) {
    if (!S.isUndefined(c)) return r(void 0, c);
  }
  function s(u, c) {
    if (S.isUndefined(c)) {
      if (!S.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, c);
  }
  function a(u, c, d) {
    if (d in t) return r(u, c);
    if (d in e) return r(void 0, u);
  }
  const l = {
    url: o,
    method: o,
    data: o,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    withXSRFToken: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: a,
    headers: (u, c) => i(yh(u), yh(c), !0),
  };
  return (
    S.forEach(Object.keys(Object.assign({}, e, t)), function (c) {
      const d = l[c] || i,
        f = d(e[c], t[c], c);
      (S.isUndefined(f) && d !== a) || (n[c] = f);
    }),
    n
  );
}
const $y = (e) => {
    const t = Fn({}, e);
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: i,
      xsrfCookieName: o,
      headers: s,
      auth: a,
    } = t;
    (t.headers = s = Ie.from(s)),
      (t.url = Uy(zy(t.baseURL, t.url), e.params, e.paramsSerializer)),
      a &&
        s.set(
          "Authorization",
          "Basic " +
            btoa(
              (a.username || "") +
                ":" +
                (a.password ? unescape(encodeURIComponent(a.password)) : "")
            )
        );
    let l;
    if (S.isFormData(n)) {
      if (nt.hasStandardBrowserEnv || nt.hasStandardBrowserWebWorkerEnv)
        s.setContentType(void 0);
      else if ((l = s.getContentType()) !== !1) {
        const [u, ...c] = l
          ? l
              .split(";")
              .map((d) => d.trim())
              .filter(Boolean)
          : [];
        s.setContentType([u || "multipart/form-data", ...c].join("; "));
      }
    }
    if (
      nt.hasStandardBrowserEnv &&
      (r && S.isFunction(r) && (r = r(t)), r || (r !== !1 && _I(t.url)))
    ) {
      const u = i && o && EI.read(o);
      u && s.set(i, u);
    }
    return t;
  },
  CI = typeof XMLHttpRequest < "u",
  TI =
    CI &&
    function (e) {
      return new Promise(function (n, r) {
        const i = $y(e);
        let o = i.data;
        const s = Ie.from(i.headers).normalize();
        let { responseType: a } = i,
          l;
        function u() {
          i.cancelToken && i.cancelToken.unsubscribe(l),
            i.signal && i.signal.removeEventListener("abort", l);
        }
        let c = new XMLHttpRequest();
        c.open(i.method.toUpperCase(), i.url, !0), (c.timeout = i.timeout);
        function d() {
          if (!c) return;
          const v = Ie.from(
              "getAllResponseHeaders" in c && c.getAllResponseHeaders()
            ),
            y = {
              data:
                !a || a === "text" || a === "json"
                  ? c.responseText
                  : c.response,
              status: c.status,
              statusText: c.statusText,
              headers: v,
              config: e,
              request: c,
            };
          By(
            function (h) {
              n(h), u();
            },
            function (h) {
              r(h), u();
            },
            y
          ),
            (c = null);
        }
        "onloadend" in c
          ? (c.onloadend = d)
          : (c.onreadystatechange = function () {
              !c ||
                c.readyState !== 4 ||
                (c.status === 0 &&
                  !(c.responseURL && c.responseURL.indexOf("file:") === 0)) ||
                setTimeout(d);
            }),
          (c.onabort = function () {
            c &&
              (r(new b("Request aborted", b.ECONNABORTED, i, c)), (c = null));
          }),
          (c.onerror = function () {
            r(new b("Network Error", b.ERR_NETWORK, i, c)), (c = null);
          }),
          (c.ontimeout = function () {
            let g = i.timeout
              ? "timeout of " + i.timeout + "ms exceeded"
              : "timeout exceeded";
            const y = i.transitional || My;
            i.timeoutErrorMessage && (g = i.timeoutErrorMessage),
              r(
                new b(
                  g,
                  y.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
                  i,
                  c
                )
              ),
              (c = null);
          }),
          o === void 0 && s.setContentType(null),
          "setRequestHeader" in c &&
            S.forEach(s.toJSON(), function (g, y) {
              c.setRequestHeader(y, g);
            }),
          S.isUndefined(i.withCredentials) ||
            (c.withCredentials = !!i.withCredentials),
          a && a !== "json" && (c.responseType = i.responseType),
          typeof i.onDownloadProgress == "function" &&
            c.addEventListener("progress", Rs(i.onDownloadProgress, !0)),
          typeof i.onUploadProgress == "function" &&
            c.upload &&
            c.upload.addEventListener("progress", Rs(i.onUploadProgress)),
          (i.cancelToken || i.signal) &&
            ((l = (v) => {
              c &&
                (r(!v || v.type ? new Lr(null, e, c) : v),
                c.abort(),
                (c = null));
            }),
            i.cancelToken && i.cancelToken.subscribe(l),
            i.signal &&
              (i.signal.aborted ? l() : i.signal.addEventListener("abort", l)));
        const f = yI(i.url);
        if (f && nt.protocols.indexOf(f) === -1) {
          r(new b("Unsupported protocol " + f + ":", b.ERR_BAD_REQUEST, e));
          return;
        }
        c.send(o || null);
      });
    },
  xI = (e, t) => {
    let n = new AbortController(),
      r;
    const i = function (l) {
      if (!r) {
        (r = !0), s();
        const u = l instanceof Error ? l : this.reason;
        n.abort(
          u instanceof b ? u : new Lr(u instanceof Error ? u.message : u)
        );
      }
    };
    let o =
      t &&
      setTimeout(() => {
        i(new b(`timeout ${t} of ms exceeded`, b.ETIMEDOUT));
      }, t);
    const s = () => {
      e &&
        (o && clearTimeout(o),
        (o = null),
        e.forEach((l) => {
          l &&
            (l.removeEventListener
              ? l.removeEventListener("abort", i)
              : l.unsubscribe(i));
        }),
        (e = null));
    };
    e.forEach((l) => l && l.addEventListener && l.addEventListener("abort", i));
    const { signal: a } = n;
    return (
      (a.unsubscribe = s),
      [
        a,
        () => {
          o && clearTimeout(o), (o = null);
        },
      ]
    );
  },
  II = function* (e, t) {
    let n = e.byteLength;
    if (!t || n < t) {
      yield e;
      return;
    }
    let r = 0,
      i;
    for (; r < n; ) (i = r + t), yield e.slice(r, i), (r = i);
  },
  RI = async function* (e, t, n) {
    for await (const r of e)
      yield* II(ArrayBuffer.isView(r) ? r : await n(String(r)), t);
  },
  vh = (e, t, n, r, i) => {
    const o = RI(e, t, i);
    let s = 0;
    return new ReadableStream(
      {
        type: "bytes",
        async pull(a) {
          const { done: l, value: u } = await o.next();
          if (l) {
            a.close(), r();
            return;
          }
          let c = u.byteLength;
          n && n((s += c)), a.enqueue(new Uint8Array(u));
        },
        cancel(a) {
          return r(a), o.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  wh = (e, t) => {
    const n = e != null;
    return (r) =>
      setTimeout(() => t({ lengthComputable: n, total: e, loaded: r }));
  },
  la =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  Hy = la && typeof ReadableStream == "function",
  gu =
    la &&
    (typeof TextEncoder == "function"
      ? (
          (e) => (t) =>
            e.encode(t)
        )(new TextEncoder())
      : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
  PI =
    Hy &&
    (() => {
      let e = !1;
      const t = new Request(nt.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (e = !0), "half";
        },
      }).headers.has("Content-Type");
      return e && !t;
    })(),
  _h = 64 * 1024,
  yu =
    Hy &&
    !!(() => {
      try {
        return S.isReadableStream(new Response("").body);
      } catch {}
    })(),
  Ps = { stream: yu && ((e) => e.body) };
la &&
  ((e) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
      !Ps[t] &&
        (Ps[t] = S.isFunction(e[t])
          ? (n) => n[t]()
          : (n, r) => {
              throw new b(
                `Response type '${t}' is not supported`,
                b.ERR_NOT_SUPPORT,
                r
              );
            });
    });
  })(new Response());
const NI = async (e) => {
    if (e == null) return 0;
    if (S.isBlob(e)) return e.size;
    if (S.isSpecCompliantForm(e))
      return (await new Request(e).arrayBuffer()).byteLength;
    if (S.isArrayBufferView(e)) return e.byteLength;
    if ((S.isURLSearchParams(e) && (e = e + ""), S.isString(e)))
      return (await gu(e)).byteLength;
  },
  OI = async (e, t) => {
    const n = S.toFiniteNumber(e.getContentLength());
    return n ?? NI(t);
  },
  bI =
    la &&
    (async (e) => {
      let {
        url: t,
        method: n,
        data: r,
        signal: i,
        cancelToken: o,
        timeout: s,
        onDownloadProgress: a,
        onUploadProgress: l,
        responseType: u,
        headers: c,
        withCredentials: d = "same-origin",
        fetchOptions: f,
      } = $y(e);
      u = u ? (u + "").toLowerCase() : "text";
      let [v, g] = i || o || s ? xI([i, o], s) : [],
        y,
        E;
      const h = () => {
        !y &&
          setTimeout(() => {
            v && v.unsubscribe();
          }),
          (y = !0);
      };
      let p;
      try {
        if (
          l &&
          PI &&
          n !== "get" &&
          n !== "head" &&
          (p = await OI(c, r)) !== 0
        ) {
          let x = new Request(t, { method: "POST", body: r, duplex: "half" }),
            I;
          S.isFormData(r) &&
            (I = x.headers.get("content-type")) &&
            c.setContentType(I),
            x.body && (r = vh(x.body, _h, wh(p, Rs(l)), null, gu));
        }
        S.isString(d) || (d = d ? "cors" : "omit"),
          (E = new Request(t, {
            ...f,
            signal: v,
            method: n.toUpperCase(),
            headers: c.normalize().toJSON(),
            body: r,
            duplex: "half",
            withCredentials: d,
          }));
        let m = await fetch(E);
        const _ = yu && (u === "stream" || u === "response");
        if (yu && (a || _)) {
          const x = {};
          ["status", "statusText", "headers"].forEach((R) => {
            x[R] = m[R];
          });
          const I = S.toFiniteNumber(m.headers.get("content-length"));
          m = new Response(
            vh(m.body, _h, a && wh(I, Rs(a, !0)), _ && h, gu),
            x
          );
        }
        u = u || "text";
        let k = await Ps[S.findKey(Ps, u) || "text"](m, e);
        return (
          !_ && h(),
          g && g(),
          await new Promise((x, I) => {
            By(x, I, {
              data: k,
              headers: Ie.from(m.headers),
              status: m.status,
              statusText: m.statusText,
              config: e,
              request: E,
            });
          })
        );
      } catch (m) {
        throw (
          (h(),
          m && m.name === "TypeError" && /fetch/i.test(m.message)
            ? Object.assign(new b("Network Error", b.ERR_NETWORK, e, E), {
                cause: m.cause || m,
              })
            : b.from(m, m && m.code, e, E))
        );
      }
    }),
  vu = { http: Jx, xhr: TI, fetch: bI };
S.forEach(vu, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Eh = (e) => `- ${e}`,
  AI = (e) => S.isFunction(e) || e === null || e === !1,
  Vy = {
    getAdapter: (e) => {
      e = S.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const i = {};
      for (let o = 0; o < t; o++) {
        n = e[o];
        let s;
        if (
          ((r = n),
          !AI(n) && ((r = vu[(s = String(n)).toLowerCase()]), r === void 0))
        )
          throw new b(`Unknown adapter '${s}'`);
        if (r) break;
        i[s || "#" + o] = r;
      }
      if (!r) {
        const o = Object.entries(i).map(
          ([a, l]) =>
            `adapter ${a} ` +
            (l === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let s = t
          ? o.length > 1
            ? `since :
` +
              o.map(Eh).join(`
`)
            : " " + Eh(o[0])
          : "as no adapter specified";
        throw new b(
          "There is no suitable adapter to dispatch the request " + s,
          "ERR_NOT_SUPPORT"
        );
      }
      return r;
    },
    adapters: vu,
  };
function el(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Lr(null, e);
}
function Sh(e) {
  return (
    el(e),
    (e.headers = Ie.from(e.headers)),
    (e.data = Za.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Vy.getAdapter(e.adapter || Qi.adapter)(e).then(
      function (r) {
        return (
          el(e),
          (r.data = Za.call(e, e.transformResponse, r)),
          (r.headers = Ie.from(r.headers)),
          r
        );
      },
      function (r) {
        return (
          Fy(r) ||
            (el(e),
            r &&
              r.response &&
              ((r.response.data = Za.call(e, e.transformResponse, r.response)),
              (r.response.headers = Ie.from(r.response.headers)))),
          Promise.reject(r)
        );
      }
    )
  );
}
const Wy = "1.7.2",
  Qc = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Qc[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const kh = {};
Qc.transitional = function (t, n, r) {
  function i(o, s) {
    return (
      "[Axios v" +
      Wy +
      "] Transitional option '" +
      o +
      "'" +
      s +
      (r ? ". " + r : "")
    );
  }
  return (o, s, a) => {
    if (t === !1)
      throw new b(
        i(s, " has been removed" + (n ? " in " + n : "")),
        b.ERR_DEPRECATED
      );
    return (
      n &&
        !kh[s] &&
        ((kh[s] = !0),
        console.warn(
          i(
            s,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, s, a) : !0
    );
  };
};
function LI(e, t, n) {
  if (typeof e != "object")
    throw new b("options must be an object", b.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let i = r.length;
  for (; i-- > 0; ) {
    const o = r[i],
      s = t[o];
    if (s) {
      const a = e[o],
        l = a === void 0 || s(a, o, e);
      if (l !== !0)
        throw new b("option " + o + " must be " + l, b.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new b("Unknown option " + o, b.ERR_BAD_OPTION);
  }
}
const wu = { assertOptions: LI, validators: Qc },
  At = wu.validators;
class Rn {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new mh(), response: new mh() });
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let i;
        Error.captureStackTrace
          ? Error.captureStackTrace((i = {}))
          : (i = new Error());
        const o = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack
            ? o &&
              !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) &&
              (r.stack +=
                `
` + o)
            : (r.stack = o);
        } catch {}
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = Fn(this.defaults, n));
    const { transitional: r, paramsSerializer: i, headers: o } = n;
    r !== void 0 &&
      wu.assertOptions(
        r,
        {
          silentJSONParsing: At.transitional(At.boolean),
          forcedJSONParsing: At.transitional(At.boolean),
          clarifyTimeoutError: At.transitional(At.boolean),
        },
        !1
      ),
      i != null &&
        (S.isFunction(i)
          ? (n.paramsSerializer = { serialize: i })
          : wu.assertOptions(
              i,
              { encode: At.function, serialize: At.function },
              !0
            )),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let s = o && S.merge(o.common, o[n.method]);
    o &&
      S.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (g) => {
          delete o[g];
        }
      ),
      (n.headers = Ie.concat(s, o));
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function (y) {
      (typeof y.runWhen == "function" && y.runWhen(n) === !1) ||
        ((l = l && y.synchronous), a.unshift(y.fulfilled, y.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function (y) {
      u.push(y.fulfilled, y.rejected);
    });
    let c,
      d = 0,
      f;
    if (!l) {
      const g = [Sh.bind(this), void 0];
      for (
        g.unshift.apply(g, a),
          g.push.apply(g, u),
          f = g.length,
          c = Promise.resolve(n);
        d < f;

      )
        c = c.then(g[d++], g[d++]);
      return c;
    }
    f = a.length;
    let v = n;
    for (d = 0; d < f; ) {
      const g = a[d++],
        y = a[d++];
      try {
        v = g(v);
      } catch (E) {
        y.call(this, E);
        break;
      }
    }
    try {
      c = Sh.call(this, v);
    } catch (g) {
      return Promise.reject(g);
    }
    for (d = 0, f = u.length; d < f; ) c = c.then(u[d++], u[d++]);
    return c;
  }
  getUri(t) {
    t = Fn(this.defaults, t);
    const n = zy(t.baseURL, t.url);
    return Uy(n, t.params, t.paramsSerializer);
  }
}
S.forEach(["delete", "get", "head", "options"], function (t) {
  Rn.prototype[t] = function (n, r) {
    return this.request(
      Fn(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
S.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (o, s, a) {
      return this.request(
        Fn(a || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: s,
        })
      );
    };
  }
  (Rn.prototype[t] = n()), (Rn.prototype[t + "Form"] = n(!0));
});
class Xc {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; ) r._listeners[o](i);
      r._listeners = null;
    }),
      (this.promise.then = (i) => {
        let o;
        const s = new Promise((a) => {
          r.subscribe(a), (o = a);
        }).then(i);
        return (
          (s.cancel = function () {
            r.unsubscribe(o);
          }),
          s
        );
      }),
      t(function (o, s, a) {
        r.reason || ((r.reason = new Lr(o, s, a)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new Xc(function (i) {
        t = i;
      }),
      cancel: t,
    };
  }
}
function DI(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function UI(e) {
  return S.isObject(e) && e.isAxiosError === !0;
}
const _u = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(_u).forEach(([e, t]) => {
  _u[t] = e;
});
function Ky(e) {
  const t = new Rn(e),
    n = Cy(Rn.prototype.request, t);
  return (
    S.extend(n, Rn.prototype, t, { allOwnKeys: !0 }),
    S.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (i) {
      return Ky(Fn(e, i));
    }),
    n
  );
}
const Q = Ky(Qi);
Q.Axios = Rn;
Q.CanceledError = Lr;
Q.CancelToken = Xc;
Q.isCancel = Fy;
Q.VERSION = Wy;
Q.toFormData = aa;
Q.AxiosError = b;
Q.Cancel = Q.CanceledError;
Q.all = function (t) {
  return Promise.all(t);
};
Q.spread = DI;
Q.isAxiosError = UI;
Q.mergeConfig = Fn;
Q.AxiosHeaders = Ie;
Q.formToJSON = (e) => jy(S.isHTMLForm(e) ? new FormData(e) : e);
Q.getAdapter = Vy.getAdapter;
Q.HttpStatusCode = _u;
Q.default = Q;
async function Gy(e, t) {
  try {
    console.log(e, t);
    const n = Kc + e;
    let r = { "Content-Type": "application/json" };
    t && (r.Authorization = `Bearer ${t}`), console.log(n, r);
    const i = await Q.get(n, { headers: r });
    return console.log("response", i), { success: !0, data: i.data.data };
  } catch (n) {
    return (
      console.error("Error posting data:", n),
      { success: !1, error: n.response ? n.response.data : n.message }
    );
  }
}
const MI = () => {
  const [e, t] = C.useState({ email: "", password: "" }),
    [n, r] = C.useState(""),
    [i, o] = C.useState(!1),
    s = Gs(),
    a = qi(),
    l = (d) => {
      t({ ...e, [d.target.name]: d.target.value });
    },
    u = async (d) => {
      d.preventDefault(), console.log(e);
      try {
        o(!0);
        let f = await ZS(Es, e.email, e.password);
        if ((console.log("user", f), f)) {
          (f = f.user), console.log("user.user", f);
          const v = { name: f.displayName, email: f.email },
            g = { token: f.accessToken, isAuth: !0 };
          let { success: y, data: E, error: h } = await Gy("/user", g.token);
          console.log(y, "UserData", E),
            y && (a(Is(E)), a(hu(g)), s("/user-profile")),
            o(!1);
        }
      } catch (f) {
        console.log(f);
        const v = Tr(f.code);
        o(!1), r(v);
      }
    },
    c = async () => {
      const f = (await C1(Es, DC)).user,
        v = { name: f.displayName, email: f.email },
        g = { token: f.accessToken, isAuth: !0 };
      a(Is(v)), a(hu(g)), s("/user-profile");
    };
  return w.jsx("div", {
    className:
      "flex justify-center items-center bg-b-general pt-6 md: pt-3 pb-3 px-3",
    children: w.jsxs("div", {
      className:
        "flex flex-col items-center gap-y-6 bg-white p-4 md:p-8 md:w-1/3 w-full rounded-lg relative text-sm md:text-base",
      children: [
        i && w.jsx(ra, {}),
        w.jsxs("h2", {
          className:
            "text-2xl md:text-5xl font-bold text-gray-900 flex gap-x-3",
          children: [
            "Welcome Back",
            w.jsx("span", {
              className: "text-2xl md:text-4xl",
              children: "👋",
            }),
            " ",
          ],
        }),
        w.jsx("p", {
          className: "text-gray-500  text-center",
          children: "Enter your credentionals to login",
        }),
        n &&
          w.jsxs("p", {
            className: "text-red-500 mt-1 ",
            children: [" ", n, " "],
          }),
        w.jsxs("form", {
          onSubmit: u,
          className: "flex flex-col gap-y-6 w-full ",
          children: [
            w.jsxs("label", {
              className: "text-left",
              children: [
                "Email",
                w.jsx("input", {
                  type: "text",
                  id: "name",
                  name: "email",
                  value: e.email,
                  onChange: l,
                  className:
                    "block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700 ",
                  required: !0,
                  placeholder: "Enter your email",
                }),
              ],
            }),
            w.jsxs("label", {
              className: " text-left",
              children: [
                "Password",
                w.jsx("input", {
                  type: "text",
                  id: "name",
                  name: "password",
                  value: e.password,
                  onChange: l,
                  className:
                    "block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700 ",
                  required: !0,
                  placeholder: "Enter your password",
                }),
              ],
            }),
            w.jsx("button", {
              type: "submit",
              className:
                "bg-fr-blue hover:bg-fr-blue-100 text-white font-bold py-2 px-4 rounded",
              children: "Login",
            }),
          ],
        }),
        w.jsx(UC, { text: "OR" }),
        w.jsx("div", {
          className: "flex items-center justify-center",
          children: w.jsxs("button", {
            onClick: c,
            className:
              "px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 bg-white",
            children: [
              w.jsx("img", {
                className: "w-6 h-6",
                src: "https://www.svgrepo.com/show/475656/google-color.svg",
                loading: "lazy",
                alt: "google logo",
              }),
              w.jsx("span", { children: "Login with Google" }),
            ],
          }),
        }),
        w.jsxs("p", {
          className: "m-auto ",
          children: [
            "Don't have an account?",
            w.jsx(fs, {
              className: "underline text-fr-blue mx-1",
              to: "/register",
              children: "Create Account",
            }),
          ],
        }),
      ],
    }),
  });
};
async function jI(e, t, n) {
  try {
    console.log(e, t, n);
    const r = Kc + e;
    let i = { "Content-Type": "application/json" };
    return { success: !0, data: (await Q.post(r, t, { headers: i })).data };
  } catch (r) {
    return (
      console.error("Error posting data:", r),
      { success: !1, error: r.response ? r.response.data : r.message }
    );
  }
}
const FI = () => {
    const [e, t] = C.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        terms: "false",
      }),
      [n, r] = C.useState(""),
      [i, o] = C.useState(!1),
      s = Gs(),
      a = (u) => {
        console.log(u, u.target.value);
        let c = u.target.value;
        u.target.name == "terms" && (c = c == "false" ? "true" : "false"),
          t({ ...e, [u.target.name]: c });
      },
      l = async (u) => {
        u.preventDefault(), r("");
        for (const v in e) {
          if (
            (console.log(v, e[v], v == "terms", e[v] == "false"),
            v == "terms" && e[v] == "false")
          ) {
            r("All fields are required");
            return;
          }
          if (e[v] === "") {
            r("All fields are required");
            return;
          }
        }
        console.log(e), o(!0);
        const { success: c, data: d, error: f } = await jI("/user", e);
        c ? (o(!1), s("/login")) : (o(!1), r(Tr(f.message)));
      };
    return w.jsx("div", {
      className:
        "flex justify-center items-center bg-b-general py-6 px-4 md:px-8",
      children: w.jsxs("div", {
        className:
          "flex flex-col items-center gap-y-6 bg-white p-4 md:p-8 w-full md:w-2/5 rounded-lg relative",
        children: [
          i && w.jsx(ra, {}),
          w.jsxs("h2", {
            className:
              "md:text-5xl text-2xl font-bold text-gray-900 flex gap-x-4",
            children: [
              "Create Account",
              w.jsx("span", {
                className: "md:text-4xl text-2xl",
                children: "📥",
              }),
            ],
          }),
          w.jsx("p", {
            className: "text-gray-500 text-sm md:text-base text-center",
            children: "Fill in the details to create your Account",
          }),
          n &&
            w.jsxs("p", {
              className: "text-red-500 m-1 text-sm md:text-base",
              children: [n, " "],
            }),
          w.jsxs("form", {
            onSubmit: l,
            className: "flex flex-col gap-y-6 w-full text-sm md:text-base",
            children: [
              w.jsxs("label", {
                className: "  text-left",
                children: [
                  "First Name",
                  w.jsx("input", {
                    type: "text",
                    name: "firstName",
                    value: e.firstName,
                    onChange: a,
                    className:
                      "block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700",
                    placeholder: "Enter your name",
                  }),
                ],
              }),
              w.jsxs("label", {
                className: "  text-left ",
                children: [
                  "Last Name",
                  w.jsx("input", {
                    type: "text",
                    name: "lastName",
                    value: e.lastName,
                    onChange: a,
                    className:
                      "block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700",
                    placeholder: "Enter your name",
                  }),
                ],
              }),
              w.jsxs("label", {
                className: "  text-left ",
                children: [
                  "Email",
                  w.jsx("input", {
                    type: "text",
                    name: "email",
                    value: e.email,
                    onChange: a,
                    className:
                      "block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700",
                    placeholder: "Enter your email",
                  }),
                ],
              }),
              w.jsxs("label", {
                className: " text-left ",
                children: [
                  "Password",
                  w.jsx("input", {
                    type: "text",
                    name: "password",
                    value: e.password,
                    onChange: a,
                    className:
                      "block w-full mt-2 rounded-md p-1.5 md:p-2 border border-gray-400 outline-none focus:border-gray-700",
                    placeholder: "Enter your password",
                  }),
                ],
              }),
              w.jsxs("label", {
                className: "flex gap-x-4 cursor-pointer",
                children: [
                  w.jsx("input", {
                    type: "checkbox",
                    name: "terms",
                    value: e.terms,
                    onChange: a,
                  }),
                  w.jsxs("p", {
                    children: [
                      "I agree to the",
                      " ",
                      w.jsx("a", {
                        className: "underline",
                        href: "",
                        children: "terms and privacy",
                      }),
                    ],
                  }),
                ],
              }),
              w.jsx("button", {
                type: "submit",
                className:
                  "bg-fr-blue hover:bg-fr-blue-100 text-white font-bold py-2 px-4 rounded",
                children: "Sign Up",
              }),
              w.jsxs("p", {
                className: "m-auto ",
                children: [
                  "Have an account?",
                  " ",
                  w.jsx(fs, {
                    className: "underline text-fr-blue mx-1",
                    to: "/login",
                    children: "Login here",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  },
  BI = () => {
    const e = Sr((n) => n.auth.isAuth),
      t = qi();
    return (
      C.useEffect(() => {
        console.log("here inside");
        const n = n1(Es, (r) => {
          if ((console.log("user", r), r)) {
            const i = { token: r.accessToken, isAuth: !0 };
            console.log("authInfo", r.accessToken), t(hu(i));
          }
        });
        return () => n();
      }, []),
      e
    );
  },
  Ch = { Dashboard: "/", Profile: "/user-profile", Subscription: "/" },
  Th = { "Admin Login": "/", Register: "/register", Login: "/login" };
function zI() {
  const [e, t] = C.useState(!1),
    n = Sr((o) => o.user.currentUser),
    r = qi(),
    i = () => {
      r1(Es), r(Is(null)), r(ux()), t(!1), location.replace("/login");
    };
  return w.jsxs("ul", {
    className: "bg-fr-blue-200 flex items-center justify-between w-full p-5",
    children: [
      w.jsxs("li", {
        className:
          "text-xl md:text-2xl text-white font-medium flex items-baseline ",
        children: [
          (n == null ? void 0 : n.firstName) || "Welcome Pal",
          w.jsx("p", { className: "text-4xl", children: "." }),
        ],
      }),
      w.jsxs("div", {
        className: "flex gap-x-6 items-center",
        children: [
          n &&
            w.jsx("li", {
              children: w.jsx("img", {
                src: n.imageUrl || "/assets/default.jpg",
                alt: "",
                className:
                  "md:h-10 md:w-10 h-8 w-8 rounded-full object-cover object-top  outline outline-4 outline-white",
              }),
            }),
          w.jsx("li", {
            children: w.jsxs("div", {
              className: "relative ",
              children: [
                w.jsxs("div", {
                  children: [
                    w.jsx("input", {
                      type: "checkbox",
                      className: "peer hidden",
                      id: "rotate-toggle",
                      onClick: () => t(!e),
                    }),
                    w.jsx("label", {
                      htmlFor: "rotate-toggle",
                      className: "icon block cursor-pointer",
                      children: w.jsx("img", {
                        src: "/assets/icons/settings.svg",
                        alt: "",
                        className:
                          "h-5 md:h-8 cursor-pointer transition-transform duration-300",
                      }),
                    }),
                  ],
                }),
                e &&
                  w.jsx("div", {
                    id: "dropdown",
                    className:
                      "absolute z-20 right-0.5 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 md:w-44 dark:bg-gray-700",
                    children: w.jsx("ul", {
                      className:
                        "py-1 md:py-2 text-sm text-gray-700 dark:text-gray-200",
                      "aria-labelledby": "dropdownDefaultButton",
                      children: w.jsx($I, { user: n, onSignout: i }),
                    }),
                  }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
function $I({ user: e, onSignout: t, onLinkClick: n }) {
  return e
    ? w.jsxs(w.Fragment, {
        children: [
          Object.keys(Ch).map((r) =>
            w.jsx(
              "li",
              {
                onClick: () => n(!1),
                children: w.jsx(fs, {
                  to: Ch[r],
                  className:
                    "block px-4 py-1.5 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
                  children: r,
                }),
              },
              r
            )
          ),
          w.jsx("li", {
            className:
              "block px-4 py-1.5 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer",
            onClick: t,
            children: "Sign out",
          }),
        ],
      })
    : w.jsx("ul", {
        children: Object.keys(Th).map((r) =>
          w.jsx("li", {
            children: w.jsx(fs, {
              to: Th[r],
              className:
                "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
              children: r,
            }),
          })
        ),
      });
}
async function qy(e, t, n) {
  try {
    console.log(e, t, n);
    const r = Kc + e;
    let i = { "Content-Type": "application/json" };
    return (
      n && (i.Authorization = `Bearer ${n}`),
      console.log("body", t, "headers", i),
      { success: !0, data: (await Q.put(r, t, { headers: i })).data.data }
    );
  } catch (r) {
    return (
      console.error("Error updating data:", r),
      { success: !1, error: r.response ? r.response.data : r.message }
    );
  }
}
function Lt({ labelText: e }) {
  return w.jsxs("div", {
    className: "flex gap-x-1 ",
    children: [e, w.jsx("p", { className: "text-red-500", children: "*" })],
  });
}
function HI() {
  const e = C.useRef(null),
    t = Sr((y) => y.auth.token),
    n = Sr((y) => y.user.currentUser),
    [r, i] = C.useState(!1),
    o = qi(),
    [s, a] = C.useState(""),
    [l, u] = C.useState({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      state: "",
      email: "",
      bio: "",
      imageUrl: "",
    }),
    c = [
      "Male",
      "Female",
      "Gay",
      "Bisexual",
      "Lesbian",
      "Straight",
      "Transgender",
      "LBGTQ+ ",
      "Other",
    ],
    d = (y) => {
      u({ ...l, [y.target.name]: y.target.value });
    },
    f = async (y) => {
      y.preventDefault(), a("");
      for (const E in l)
        if (!l[E] && E != "imageUrl") {
          a("All fields are required!");
          return;
        }
      try {
        i(!0);
        const E = e.current.files[0];
        if (E) {
          console.log("uploading img...", E);
          const _ = RC(LC, `images/${n.firebaseUid}`),
            k = await xC(_, E),
            x = await IC(k.ref);
          l.imageUrl = x;
        }
        const { success: h, data: p, error: m } = await qy("/user", l, t);
        h
          ? (console.log("data", p), o(Is(p)))
          : (console.log(m), i(!1), a(Tr(m))),
          i(!1);
      } catch (E) {
        console.log(E), i(!1), a(Tr(E));
      }
    };
  C.useEffect(() => {
    if (n && l.firstName == "") {
      const y = Object.keys(l).reduce(
        (E, h) => (h in n && (E[h] = n[h]), E),
        {}
      );
      u({ ...y });
    }
  }, []);
  const v = () => {
      console.log(e.current.click());
    },
    g = () => {
      const y = e.current.files;
      if ((console.log("imageFile", y), y.length > 0)) {
        const E = URL.createObjectURL(y[0]),
          h = document.getElementById("avatar-preview");
        h.src = E;
      }
    };
  return w.jsxs("div", {
    id: "card",
    className:
      "bg-white flex flex-col gap-y-8 pb-10 items-center m-auto rounded-lg relative",
    children: [
      r && w.jsx(ra, {}),
      w.jsx("div", {
        className:
          "bg-gray-300 w-full rounded-lg p-6 flex flex-col items-center gap-y-6",
        children: w.jsxs("div", {
          className: "w-fit m-auto relative",
          children: [
            w.jsx("img", {
              className:
                "rounded-full md:w-52 md:h-52 w-36 h-36 object-cover object-top",
              src: l.imageUrl || "/assets/default.jpg",
              alt: "user avatar",
              id: "avatar-preview",
            }),
            w.jsx("input", {
              ref: e,
              type: "file",
              accept: "image/*",
              hidden: !0,
              onChange: g,
            }),
            w.jsx("button", {
              className:
                "absolute md:bottom-2 md:right-2 bottom-4 right-1  z-20 bg-white p-1.5 rounded-full",
              onClick: v,
              children: w.jsx("img", {
                src: "/assets/icons/edit.svg",
                alt: "auth",
                className: "md:h-6 h-3",
              }),
            }),
          ],
        }),
      }),
      w.jsxs("form", {
        className: "flex flex-col gap-y-6 text-sm p-2 md:text-base md:p-0 ",
        onSubmit: f,
        children: [
          w.jsx("div", {
            className: "m-auto font-semibold text-xl md:text-2xl",
            children: "Edit Info",
          }),
          s && w.jsx("p", { className: "text-fr-red m-auto", children: s }),
          w.jsxs("div", {
            className: "flex flex-col gap-y-4",
            children: [
              w.jsxs("div", {
                className: "flex gap-x-6 flex-col gap-y-4 md:flex-row",
                children: [
                  w.jsxs("label", {
                    children: [
                      w.jsx(Lt, { labelText: "First Name" }),
                      w.jsx("input", {
                        type: "text",
                        name: "firstName",
                        placeholder: "Shane",
                        value: l.firstName,
                        onChange: d,
                        className:
                          "bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 ",
                      }),
                    ],
                  }),
                  w.jsxs("label", {
                    children: [
                      w.jsx(Lt, { labelText: "Last Name" }),
                      w.jsx("input", {
                        name: "lastName",
                        type: "text",
                        placeholder: "Edwards",
                        value: l.lastName,
                        onChange: d,
                        className:
                          "bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 ",
                      }),
                    ],
                  }),
                ],
              }),
              w.jsxs("label", {
                children: [
                  w.jsx(Lt, { labelText: "Email" }),
                  w.jsx("input", {
                    value: l.email,
                    onChange: d,
                    placeholder: "shane@gmail.com",
                    type: "email",
                    name: "email",
                    className:
                      "bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 ",
                  }),
                ],
              }),
              w.jsxs("label", {
                children: [
                  w.jsx(Lt, { labelText: "Age" }),
                  w.jsx("input", {
                    name: "age",
                    type: "text",
                    placeholder: "40",
                    value: l.age,
                    onChange: d,
                    className:
                      " bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 ",
                  }),
                ],
              }),
              w.jsxs("div", {
                className: "relative inline-block w-full",
                children: [
                  w.jsx(Lt, { labelText: "Gender" }),
                  w.jsxs("select", {
                    id: "gender",
                    name: "gender",
                    value: l.gender,
                    onChange: d,
                    className: `mt-1 w-full p-1.5 border border-gray-400  outline-none focus:border-gray-700 rounded-md bg-transparent cursor-pointer ${
                      l.gender == "" ? "text-[#a9a9a9]" : "text-black"
                    }`,
                    children: [
                      w.jsx("option", {
                        value: "",
                        disabled: !0,
                        className: "",
                        children: "Select Gender",
                      }),
                      c.map((y) =>
                        w.jsx("option", { value: y, children: y }, y)
                      ),
                      "genderList",
                    ],
                  }),
                ],
              }),
              w.jsxs("label", {
                children: [
                  w.jsx(Lt, { labelText: "State" }),
                  w.jsx("input", {
                    name: "state",
                    type: "text",
                    placeholder: "London",
                    value: l.state,
                    onChange: d,
                    className:
                      " bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 ",
                  }),
                ],
              }),
              w.jsxs("label", {
                className: "flex flex-col ",
                children: [
                  w.jsx(Lt, { labelText: "Bio" }),
                  w.jsx("textarea", {
                    name: "bio",
                    value: l.bio,
                    onChange: d,
                    placeholder: "Hello, I like to watch football.",
                    rows: 5,
                    className:
                      "bg-transparent block w-full mt-1 rounded-md p-1.5 border border-gray-400 outline-none focus:border-gray-700 ",
                  }),
                ],
              }),
            ],
          }),
          w.jsx("button", {
            className:
              "ml-auto mt-4 bg-fr-blue-200 w-1/3 md:w-1/5  text-white p-1.5 rounded hover:opacity-90",
            children: "Update",
          }),
        ],
      }),
    ],
  });
}
const VI = C.memo(
    ({
      labelText: e,
      placeholderText: t,
      dropdownOptions: n,
      selectedOptions: r,
      onChange: i,
      collapseDropdown: o,
    }) => {
      const s = n.map((g, y) =>
        r.includes(g)
          ? { value: y + 1, label: g, selected: !0 }
          : { value: y + 1, label: g, selected: !1 }
      );
      console.log("re-rendered");
      const [a, l] = C.useState(!1),
        u = C.useRef(null);
      C.useEffect(() => {
        console.log("now thern"), o && l(!1);
      }, [o]);
      const c = () => {
          l(!a);
        },
        d = (g) => {
          i(e, g.label, !1);
        },
        f = (g, y) => {
          g.stopPropagation(), i(e, y.label, !0);
        },
        v = C.useMemo(() => s.filter((g) => g.selected), [s]);
      return w.jsxs("div", {
        className: "w-full relative  text-sm md:text-base",
        ref: u,
        children: [
          w.jsx(Lt, { labelText: e }),
          w.jsxs("div", {
            id: "wrapper",
            className:
              "rounded mt-1 border cursor-text p-1 md:p-2 flex justify-between gap-x-2 items-center",
            onClick: c,
            children: [
              w.jsx("div", {
                id: "selectedValues",
                className: "w-full flex flex-wrap gap-x-2 md:gap-x-3 gap-y-2 ",
                children:
                  v.length !== 0
                    ? v.map((g) =>
                        w.jsxs(
                          "div",
                          {
                            className:
                              "w-fit flex gap-x-1.5 md:gap-x-3 py-0.5 px-1 rounded-md flex items-center text-t-option bg-b-option border border-[#0372B2]",
                            children: [
                              w.jsx("div", {
                                className: "item-label",
                                "data-value": g.value,
                                children: g.label,
                              }),
                              w.jsx("img", {
                                className: "h-3 md:h-4 cursor-pointer",
                                onClick: (y) => f(y, g),
                                src: "/assets/icons/xMark.svg",
                                alt: "",
                              }),
                            ],
                          },
                          g.value
                        )
                      )
                    : w.jsx("p", {
                        className: "text-c-placeholder",
                        children: t,
                      }),
              }),
              w.jsx("div", {
                id: "dropdown-toggle",
                className: "btn-container border-l pl-2",
                children: w.jsx("button", {
                  type: "button",
                  onClick: c,
                  className: "w-full h-full flex items-center justify-center",
                  children: w.jsx("img", {
                    src: "/assets/icons/angleDown.svg",
                    className: "h-6 font-bold",
                    alt: "",
                  }),
                }),
              }),
            ],
          }),
          a && w.jsx(WI, { options: s, onSelect: d }),
        ],
      });
    }
  ),
  WI = ({ options: e, onSelect: t }) => {
    const [n, r] = C.useState(""),
      i = e.filter((a) => a.label.toLowerCase().includes(n.toLowerCase())),
      o = C.useRef(null),
      s = (a) => {
        r(a.target.value);
      };
    return (
      C.useEffect(() => {
        var a;
        (a = o.current) == null || a.focus();
      }, []),
      w.jsxs("div", {
        id: "filteredOptions",
        className:
          "absolute border border-t-0 mt-1 bg-white max-h-60 z-40 overflow-y-auto w-full",
        children: [
          w.jsx("div", {
            className: "",
            children: w.jsx("input", {
              className:
                "bg-transparent rounded p-2 text-gray-700 outline-none w-full mb-2",
              placeholder: "Search...",
              value: n,
              ref: o,
              onChange: s,
            }),
          }),
          w.jsx("ul", {
            className: "",
            children: i.map((a) =>
              w.jsxs(
                "li",
                {
                  className: `p-2 rounded cursor-pointer  ${
                    a.selected ? "bg-b-option" : "hover:bg-gray-100"
                  }`,
                  onClick: () => t(a),
                  children: [
                    w.jsx("input", {
                      type: "checkbox",
                      checked: a.selected,
                      readOnly: !0,
                      className: "mr-2",
                    }),
                    a.label,
                  ],
                },
                a.value
              )
            ),
          }),
        ],
      })
    );
  },
  KI = [
    "Crocheting",
    "Sewing",
    "Drawing",
    "Painting",
    "Model Building",
    "Hiking",
    "Biking",
    "Travelling",
    "Sightseeing",
    "Photography",
    "Videogaming",
    "Quilting",
    "Writing",
    "Card Games",
    "Others",
  ],
  GI = [
    "Football",
    "Basketball",
    "Soccer",
    "Swimming",
    "Tennis",
    "Baseball",
    "Lacrosse",
    "Hockey",
    "Racing",
    "Wrestling",
    "Golf",
    "Others",
  ],
  qI = [
    "Fast Food",
    "Politics",
    "Tattoos",
    "Concerts",
    "Night Clubs",
    "Movie theaters",
    "Exercise",
    "Dance",
    "Sing",
    "Post on Social Media",
    "Puzzles",
    "Reading Books",
    "Hanging with friends",
    "Staying home",
    "Dogs",
    "Cats",
    "Music",
    "Others",
  ],
  JI = [
    "Shy",
    "Outgoing",
    "Funny",
    "Good listener",
    "Work well with others",
    "Organized",
    "Messy",
    "Like routines",
    "Serious",
    "Humble",
    "Arrogant",
    "Quiet",
    "Loud",
    "Smart",
    "Others",
  ],
  QI = [
    "Educational",
    "Biography",
    "Autobiography",
    "Thrillers",
    "Mystery",
    "Romance",
    "Western",
    "Horror",
    "Adventure",
    "True Crime",
    "Crime",
    "Fictional",
    "Non fictional",
    "Science Fiction",
    "Romance",
    "Drama",
    "Faith",
    "Others",
  ],
  XI = [
    "Classic Rock",
    "Soft Rock",
    "Pop",
    "Rap",
    "Hip Hop",
    "Country",
    "Classical",
    "Jazz",
    "Blues",
    "Alternative",
    "Soul/R and B",
    "Rock",
    "Reggae",
    "Latin",
    "Christian/Gospel",
    "Others",
  ],
  YI = [
    "Action",
    "Comedy",
    "Drama",
    "Romance",
    "Mystery",
    "Thriller",
    "Horror",
    "Animation",
    "Adventure",
    "Crime",
    "Documentary",
    "Fantasy",
    "History",
    "Sports",
    "Science Fiction",
    "Western",
    "Faith",
    "Family",
    "Romantic Comedy",
    "Others",
  ],
  ZI = { info: null },
  Jy = Vc({
    name: "info",
    initialState: ZI,
    reducers: {
      setUserPersonality: (e, t) => {
        console.log(t.payload), (e.info = t.payload);
      },
    },
  }),
  { setUserPersonality: xh } = Jy.actions,
  eR = Jy.reducer;
function tR() {
  const e = Sr((h) => h.userPersonality.info),
    t = Sr((h) => h.auth.token),
    n = C.useRef(null),
    [r, i] = C.useState(!1),
    [o, s] = C.useState(!1),
    [a, l] = C.useState(""),
    u = qi(),
    [c, d] = C.useState({
      hobbies: [],
      sports: [],
      likes: [],
      personality: [],
      bookGenres: [],
      musicGenres: [],
      movieGenres: [],
    }),
    f = {
      Hobbies: KI,
      Sports: GI,
      Likes: qI,
      Personality: JI,
      BookGenres: QI,
      MusicGenres: XI,
      MovieGenres: YI,
    },
    v = {
      Hobbies: "hobbies",
      Sports: "sports",
      Likes: "likes",
      Personality: "personality",
      BookGenres: "bookGenres",
      MusicGenres: "musicGenres",
      MovieGenres: "movieGenres",
    },
    g = async () => {
      l(""), console.log(c);
      for (const _ in c)
        if (c[_].length === 0) {
          l("All fields are required!");
          return;
        }
      s(!0);
      const {
        success: h,
        data: p,
        error: m,
      } = await qy("/user/personality", { personality: c }, t);
      s(!1),
        h
          ? (console.log(p), u(xh(p.personality)))
          : (console.log(m), s(!1), l(Tr(m)));
    },
    y = (h, p, m) => {
      const _ = v[h];
      let k = c[_];
      console.log("updatedArr", k),
        m
          ? (k = k.filter((x) => x != p))
          : (console.log("UpdatedArr", k, "value", p), (k = [...k, p])),
        d({ ...c, [_]: k });
    },
    E = (h) => {
      console.log(h.target.id, "target"),
        console.log(n.current.contains(h.target)),
        n.current &&
          !n.current.contains(h.target) &&
          (console.log("inside here yellow "), i(!0));
    };
  return (
    C.useEffect(
      () => (
        window.addEventListener("click", E),
        () => {
          window.removeEventListener("click", E);
        }
      ),
      []
    ),
    C.useEffect(() => {
      const h = async () => {
        if ((s(!0), t)) {
          const {
            success: p,
            data: m,
            error: _,
          } = await Gy("/user/personality", t);
          p ? (console.log(m), d(m), u(xh(m))) : l(Tr(_)), s(!1);
        }
      };
      console.log("personaityInfoState", e), e == null ? h() : d(e);
    }, []),
    C.useEffect(() => {
      r && i(!1);
    }, [r]),
    w.jsxs("div", {
      ref: n,
      id: "card",
      className:
        "bg-white flex flex-col py-6 gap-y-6 md:gap-y-8 pb-10 items-center m-auto rounded-lg mb-6 p-2 md:p-6 relative",
      children: [
        w.jsx("div", {
          className: "m-auto font-semibold text-xl md:text-2xl",
          children: "Edit Info",
        }),
        a &&
          w.jsxs("p", {
            className: "text-red-500 mt-1",
            children: [" ", a, " "],
          }),
        o && w.jsx(ra, {}),
        Object.keys(f).map((h) =>
          w.jsx(
            VI,
            {
              labelText: h,
              placeholderText: f[h][0],
              dropdownOptions: f[h],
              selectedOptions: c[v[h]],
              onChange: y,
              collapseDropdown: r,
            },
            h
          )
        ),
        w.jsx("button", {
          className:
            "ml-auto  bg-fr-blue-200 w-1/3 md:w-1/5  text-white p-1.5 rounded hover:opacity-90",
          onClick: g,
          children: "Update",
        }),
      ],
    })
  );
}
function nR() {
  const [e, t] = C.useState(!0);
  return w.jsx("div", {
    className: "bg-c-basic py-12",
    children: w.jsx("div", {
      className: "flex justify-center",
      children: w.jsxs("div", {
        className: "md:w-1/2 w-full px-3",
        children: [
          w.jsxs("div", {
            id: "tabs",
            className: "flex cursor-pointer",
            children: [
              w.jsx("div", {
                className: `rounded border md:px-3 md:py-2 md:text-lg text-sm px-2 py-1.5  ${
                  e ? "bg-fr-blue-200 text-white" : "bg-white text-black"
                }`,
                onClick: () => t(!0),
                children: "Basic Info",
              }),
              w.jsx("div", {
                className: `rounded border md:px-3 md:py-2 md:text-lg text-sm px-2 py-1.5  ${
                  e ? "bg-white text-black" : "bg-fr-blue-200 text-white"
                }`,
                onClick: () => t(!1),
                children: "Personality Info",
              }),
            ],
          }),
          e ? w.jsx(HI, {}) : w.jsx(tR, {}),
        ],
      }),
    }),
  });
}
function rR() {
  const e = () => (BI() ? w.jsx(p_, {}) : w.jsx(h_, { to: "/login" }));
  return w.jsxs("div", {
    className: "",
    children: [
      w.jsx(zI, {}),
      w.jsxs(g_, {
        children: [
          w.jsx(Wn, { path: "/login", element: w.jsx(MI, {}) }),
          w.jsx(Wn, { path: "/register", element: w.jsx(FI, {}) }),
          w.jsxs(Wn, {
            element: w.jsx(e, {}),
            children: [
              w.jsx(Wn, { path: "/user-profile", element: w.jsx(nR, {}) }),
              w.jsx(Wn, {
                path: "/",
                element: w.jsx("p", {
                  className: "w-fit m-auto mt-12",
                  children: "this the home page",
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const iR = ly({ auth: cx, user: ax, userPersonality: eR }),
  oR = zT({ reducer: iR });
nl.createRoot(document.getElementById("root")).render(
  w.jsx(Tu.StrictMode, {
    children: w.jsx(k_, {
      children: w.jsx(rT, { store: oR, children: w.jsx(rR, {}) }),
    }),
  })
);
