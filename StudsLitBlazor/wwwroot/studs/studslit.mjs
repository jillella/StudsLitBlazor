(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload"))
    return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
    i(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const n of o.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && i(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(s) {
    const o = {};
    return s.integrity && (o.integrity = s.integrity), s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? o.credentials = "include" : s.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function i(s) {
    if (s.ep)
      return;
    s.ep = !0;
    const o = t(s);
    fetch(s.href, o);
  }
})();
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const V = window, lt = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bt = Symbol(), ht = /* @__PURE__ */ new WeakMap();
let Tt = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== bt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (lt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ht.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ht.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const kt = (e) => new Tt(typeof e == "string" ? e : e + "", void 0, bt), Ut = (e, t) => {
  lt ? e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet) : t.forEach((i) => {
    const s = document.createElement("style"), o = V.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, e.appendChild(s);
  });
}, ct = lt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules)
    i += s.cssText;
  return kt(i);
})(e) : e;
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var G;
const W = window, at = W.trustedTypes, Nt = at ? at.emptyScript : "", dt = W.reactiveElementPolyfillSupport, st = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Nt : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, At = (e, t) => t !== e && (t == t || e == e), Y = { attribute: !0, type: String, converter: st, reflect: !1, hasChanged: At }, ot = "finalized";
let T = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(e) {
    var t;
    this.finalize(), ((t = this.h) !== null && t !== void 0 ? t : this.h = []).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach((t, i) => {
      const s = this._$Ep(i, t);
      s !== void 0 && (this._$Ev.set(s, i), e.push(s));
    }), e;
  }
  static createProperty(e, t = Y) {
    if (t.state && (t.attribute = !1), this.finalize(), this.elementProperties.set(e, t), !t.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const i = typeof e == "symbol" ? Symbol() : "__" + e, s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Object.defineProperty(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    return { get() {
      return this[t];
    }, set(s) {
      const o = this[e];
      this[t] = s, this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || Y;
  }
  static finalize() {
    if (this.hasOwnProperty(ot))
      return !1;
    this[ot] = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties, i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const s of i)
        this.createProperty(s, t[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i)
        t.unshift(ct(s));
    } else
      e !== void 0 && t.push(ct(e));
    return t;
  }
  static _$Ep(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  u() {
    var e;
    this._$E_ = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, i;
    ((t = this._$ES) !== null && t !== void 0 ? t : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) === null || i === void 0 || i.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, t) => {
      this.hasOwnProperty(t) && (this._$Ei.set(t, this[t]), delete this[t]);
    });
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return Ut(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) === null || i === void 0 ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) === null || i === void 0 ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$EO(e, t, i = Y) {
    var s;
    const o = this.constructor._$Ep(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : st).toAttribute(t, i.type);
      this._$El = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$El = null;
    }
  }
  _$AK(e, t) {
    var i;
    const s = this.constructor, o = s._$Ev.get(e);
    if (o !== void 0 && this._$El !== o) {
      const n = s.getPropertyOptions(o), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((i = n.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? n.converter : st;
      this._$El = o, this[o] = r.fromAttribute(t, n.type), this._$El = null;
    }
  }
  requestUpdate(e, t, i) {
    let s = !0;
    e !== void 0 && (((i = i || this.constructor.getPropertyOptions(e)).hasChanged || At)(this[e], t) ? (this._$AL.has(e) || this._$AL.set(e, t), i.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, o) => this[o] = s), this._$Ei = void 0);
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (e = this._$ES) === null || e === void 0 || e.forEach((s) => {
        var o;
        return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw t = !1, this._$Ek(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
T[ot] = !0, T.elementProperties = /* @__PURE__ */ new Map(), T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, dt == null || dt({ ReactiveElement: T }), ((G = W.reactiveElementVersions) !== null && G !== void 0 ? G : W.reactiveElementVersions = []).push("1.6.2");
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var Q;
const q = window, k = q.trustedTypes, pt = k ? k.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, nt = "$lit$", E = `lit$${(Math.random() + "").slice(9)}$`, St = "?" + E, Ht = `<${St}>`, P = document, R = () => P.createComment(""), D = (e) => e === null || typeof e != "object" && typeof e != "function", Et = Array.isArray, Rt = (e) => Et(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", X = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ut = /-->/g, vt = />/g, C = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, $t = /"/g, wt = /^(?:script|style|textarea|title)$/i, Dt = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), $ = Dt(1), w = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), x = P.createTreeWalker(P, 129, null, !1), Bt = (e, t) => {
  const i = e.length - 1, s = [];
  let o, n = t === 2 ? "<svg>" : "", r = H;
  for (let h = 0; h < i; h++) {
    const c = e[h];
    let A, a, u = -1, g = 0;
    for (; g < c.length && (r.lastIndex = g, a = r.exec(c), a !== null); )
      g = r.lastIndex, r === H ? a[1] === "!--" ? r = ut : a[1] !== void 0 ? r = vt : a[2] !== void 0 ? (wt.test(a[2]) && (o = RegExp("</" + a[2], "g")), r = C) : a[3] !== void 0 && (r = C) : r === C ? a[0] === ">" ? (r = o ?? H, u = -1) : a[1] === void 0 ? u = -2 : (u = r.lastIndex - a[2].length, A = a[1], r = a[3] === void 0 ? C : a[3] === '"' ? $t : yt) : r === $t || r === yt ? r = C : r === ut || r === vt ? r = H : (r = C, o = void 0);
    const j = r === C && e[h + 1].startsWith("/>") ? " " : "";
    n += r === H ? c + Ht : u >= 0 ? (s.push(A), c.slice(0, u) + nt + c.slice(u) + E + j) : c + E + (u === -2 ? (s.push(void 0), h) : j);
  }
  const y = n + (e[i] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(e) || !e.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [pt !== void 0 ? pt.createHTML(y) : y, s];
};
class B {
  constructor({ strings: t, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const y = t.length - 1, h = this.parts, [c, A] = Bt(t, i);
    if (this.el = B.createElement(c, s), x.currentNode = this.el.content, i === 2) {
      const a = this.el.content, u = a.firstChild;
      u.remove(), a.append(...u.childNodes);
    }
    for (; (o = x.nextNode()) !== null && h.length < y; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) {
          const a = [];
          for (const u of o.getAttributeNames())
            if (u.endsWith(nt) || u.startsWith(E)) {
              const g = A[r++];
              if (a.push(u), g !== void 0) {
                const j = o.getAttribute(g.toLowerCase() + nt).split(E), I = /([.?@])?(.*)/.exec(g);
                h.push({ type: 1, index: n, name: I[2], strings: j, ctor: I[1] === "." ? Mt : I[1] === "?" ? jt : I[1] === "@" ? It : K });
              } else
                h.push({ type: 6, index: n });
            }
          for (const u of a)
            o.removeAttribute(u);
        }
        if (wt.test(o.tagName)) {
          const a = o.textContent.split(E), u = a.length - 1;
          if (u > 0) {
            o.textContent = k ? k.emptyScript : "";
            for (let g = 0; g < u; g++)
              o.append(a[g], R()), x.nextNode(), h.push({ type: 2, index: ++n });
            o.append(a[u], R());
          }
        }
      } else if (o.nodeType === 8)
        if (o.data === St)
          h.push({ type: 2, index: n });
        else {
          let a = -1;
          for (; (a = o.data.indexOf(E, a + 1)) !== -1; )
            h.push({ type: 7, index: n }), a += E.length - 1;
        }
      n++;
    }
  }
  static createElement(t, i) {
    const s = P.createElement("template");
    return s.innerHTML = t, s;
  }
}
function U(e, t, i = e, s) {
  var o, n, r, y;
  if (t === w)
    return t;
  let h = s !== void 0 ? (o = i._$Co) === null || o === void 0 ? void 0 : o[s] : i._$Cl;
  const c = D(t) ? void 0 : t._$litDirective$;
  return (h == null ? void 0 : h.constructor) !== c && ((n = h == null ? void 0 : h._$AO) === null || n === void 0 || n.call(h, !1), c === void 0 ? h = void 0 : (h = new c(e), h._$AT(e, i, s)), s !== void 0 ? ((r = (y = i)._$Co) !== null && r !== void 0 ? r : y._$Co = [])[s] = h : i._$Cl = h), h !== void 0 && (t = U(e, h._$AS(e, t.values), h, s)), t;
}
class zt {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var i;
    const { el: { content: s }, parts: o } = this._$AD, n = ((i = t == null ? void 0 : t.creationScope) !== null && i !== void 0 ? i : P).importNode(s, !0);
    x.currentNode = n;
    let r = x.nextNode(), y = 0, h = 0, c = o[0];
    for (; c !== void 0; ) {
      if (y === c.index) {
        let A;
        c.type === 2 ? A = new L(r, r.nextSibling, this, t) : c.type === 1 ? A = new c.ctor(r, c.name, c.strings, this, t) : c.type === 6 && (A = new Vt(r, this, t)), this._$AV.push(A), c = o[++h];
      }
      y !== (c == null ? void 0 : c.index) && (r = x.nextNode(), y++);
    }
    return x.currentNode = P, n;
  }
  v(t) {
    let i = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class L {
  constructor(t, i, s, o) {
    var n;
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = o, this._$Cp = (n = o == null ? void 0 : o.isConnected) === null || n === void 0 || n;
  }
  get _$AU() {
    var t, i;
    return (i = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && i !== void 0 ? i : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = U(this, t, i), D(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Rt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== v && D(this._$AH) ? this._$AA.nextSibling.data = t : this.$(P.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var i;
    const { values: s, _$litType$: o } = t, n = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = B.createElement(o.h, this.options)), o);
    if (((i = this._$AH) === null || i === void 0 ? void 0 : i._$AD) === n)
      this._$AH.v(s);
    else {
      const r = new zt(n, this), y = r.u(this.options);
      r.v(s), this.$(y), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = ft.get(t.strings);
    return i === void 0 && ft.set(t.strings, i = new B(t)), i;
  }
  T(t) {
    Et(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of t)
      o === i.length ? i.push(s = new L(this.k(R()), this.k(R()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) === null || s === void 0 || s.call(this, !1, !0, i); t && t !== this._$AB; ) {
      const o = t.nextSibling;
      t.remove(), t = o;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cp = t, (i = this._$AP) === null || i === void 0 || i.call(this, t));
  }
}
class K {
  constructor(t, i, s, o, n) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = v;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0)
      t = U(this, t, i, 0), r = !D(t) || t !== this._$AH && t !== w, r && (this._$AH = t);
    else {
      const y = t;
      let h, c;
      for (t = n[0], h = 0; h < n.length - 1; h++)
        c = U(this, y[s + h], i, h), c === w && (c = this._$AH[h]), r || (r = !D(c) || c !== this._$AH[h]), c === v ? t = v : t !== v && (t += (c ?? "") + n[h + 1]), this._$AH[h] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Mt extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
const Lt = k ? k.emptyScript : "";
class jt extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== v ? this.element.setAttribute(this.name, Lt) : this.element.removeAttribute(this.name);
  }
}
class It extends K {
  constructor(t, i, s, o, n) {
    super(t, i, s, o, n), this.type = 5;
  }
  _$AI(t, i = this) {
    var s;
    if ((t = (s = U(this, t, i, 0)) !== null && s !== void 0 ? s : v) === w)
      return;
    const o = this._$AH, n = t === v && o !== v || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, r = t !== v && (o === v || n);
    n && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (i = this.options) === null || i === void 0 ? void 0 : i.host) !== null && s !== void 0 ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Vt {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    U(this, t);
  }
}
const _t = q.litHtmlPolyfillSupport;
_t == null || _t(B, L), ((Q = q.litHtmlVersions) !== null && Q !== void 0 ? Q : q.litHtmlVersions = []).push("2.7.4");
const Wt = (e, t, i) => {
  var s, o;
  const n = (s = i == null ? void 0 : i.renderBefore) !== null && s !== void 0 ? s : t;
  let r = n._$litPart$;
  if (r === void 0) {
    const y = (o = i == null ? void 0 : i.renderBefore) !== null && o !== void 0 ? o : null;
    n._$litPart$ = r = new L(t.insertBefore(R(), y), y, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var tt, et;
class m extends T {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, i;
    const s = super.createRenderRoot();
    return (t = (i = this.renderOptions).renderBefore) !== null && t !== void 0 || (i.renderBefore = s.firstChild), s;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Wt(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return w;
  }
}
m.finalized = !0, m._$litElement$ = !0, (tt = globalThis.litElementHydrateSupport) === null || tt === void 0 || tt.call(globalThis, { LitElement: m });
const gt = globalThis.litElementPolyfillSupport;
gt == null || gt({ LitElement: m });
((et = globalThis.litElementVersions) !== null && et !== void 0 ? et : globalThis.litElementVersions = []).push("3.3.2");
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const N = (e) => (t) => typeof t == "function" ? ((i, s) => (customElements.define(i, s), s))(e, t) : ((i, s) => {
  const { kind: o, elements: n } = s;
  return { kind: o, elements: n, finisher(r) {
    customElements.define(i, r);
  } };
})(e, t);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const qt = (e, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(i) {
  i.createProperty(t.key, e);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(i) {
  i.createProperty(t.key, e);
} }, Kt = (e, t, i) => {
  t.constructor.createProperty(i, e);
};
function l(e) {
  return (t, i) => i !== void 0 ? Kt(e, t, i) : qt(e, t);
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function J(e) {
  return l({ ...e, state: !0 });
}
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var it;
((it = window.HTMLSlotElement) === null || it === void 0 ? void 0 : it.prototype.assignedElements) != null;
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const Ct = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, xt = (e) => (...t) => ({ _$litDirective$: e, values: t });
class Pt {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, s) {
    this._$Ct = t, this._$AM = i, this._$Ci = s;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
}
/**
* @license
* Copyright 2018 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const O = xt(class extends Pt {
  constructor(e) {
    var t;
    if (super(e), e.type !== Ct.ATTRIBUTE || e.name !== "class" || ((t = e.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
  }
  update(e, [t]) {
    var i, s;
    if (this.it === void 0) {
      this.it = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((n) => n !== "")));
      for (const n in t)
        t[n] && !(!((i = this.nt) === null || i === void 0) && i.has(n)) && this.it.add(n);
      return this.render(t);
    }
    const o = e.element.classList;
    this.it.forEach((n) => {
      n in t || (o.remove(n), this.it.delete(n));
    });
    for (const n in t) {
      const r = !!t[n];
      r === this.it.has(n) || !((s = this.nt) === null || s === void 0) && s.has(n) || (r ? (o.add(n), this.it.add(n)) : (o.remove(n), this.it.delete(n)));
    }
    return w;
  }
});
var Jt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, S = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Zt(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Jt(t, i, o), o;
};
let b = class extends m {
  constructor() {
    super(...arguments), this.buttonType = "cta", this.size = "medium", this.disabled = !1, this.iconPosition = "start", this.contentDirection = "horizontal", this.class = "", this.icon = "", this.text = "", this.checkIfLink = this.buttonType === "link";
  }
  renderChildren() {
    if (this.children)
      return $`${this.children}`;
  }
  renderIcon() {
    if (this.icon)
      return $`<studs-icon
        icon="${this.icon}"
        size="${this.size}"
      ></studs-icon>`;
  }
  render() {
    const e = { button: !0, [`-${this.buttonType}`]: this.buttonType, [`-${this.size}`]: !0, "-disabled": this.disabled, [`-${this.contentDirection}`]: this.contentDirection, "-reverse": this.iconPosition === "end", [this.class]: this.class };
    return $`<button class="${O(e)}" ?disabled=${this.disabled}>
      ${this.renderIcon()} ${this.renderChildren()}
    </button>`;
  }
  createRenderRoot() {
    return this;
  }
};
S([l({ type: String })], b.prototype, "buttonType", 2);
S([l({ type: String })], b.prototype, "size", 2);
S([l({ type: Boolean, reflect: !0 })], b.prototype, "disabled", 2);
S([l()], b.prototype, "iconPosition", 2);
S([l()], b.prototype, "contentDirection", 2);
S([l({ type: String })], b.prototype, "class", 2);
S([l({ type: String })], b.prototype, "icon", 2);
S([l()], b.prototype, "text", 2);
b = S([N("studs-button")], b);
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function* Ot(e, t) {
  if (e !== void 0) {
    let i = 0;
    for (const s of e)
      yield t(s, i++);
  }
}
var Ft = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, p = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Gt(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Ft(t, i, o), o;
};
let d = class extends m {
  constructor() {
    super(...arguments), this.disabled = !1, this.multiple = !1, this.searchable = !1, this.closeOnSelect = !1, this.closeOnClickOutside = !1, this.group = !1, this.showDeleteButton = !1, this.disableOverlay = !1, this.valueExpr = "", this.displayExpr = "", this.searchExpr = "", this.searchMode = "contains", this.searchValue = "", this.itemTemplateId = "", this.valueTemplateId = "", this.inputPlaceholder = "", this.searchTimeout = 0, this.minSearchLength = 0, this.iconPosition = "start", this.contentDirection = "horizontal", this.class = "", this.icon = "", this.text = "", this.overlay = !1, this.focused = !1, this.value = [];
  }
  renderValues() {
    if (this.multiple && this.value != null)
      return $`<div class="valuesWrapper">
        ${Ot(this.value, (e) => $`<studs-chip
              onDelete=${e.onDelete}
              text=${typeof e == "object" ? e[this.displayExpr] : e}
            ></studs-chip>`)}
      </div>`;
  }
  renderIcon() {
    if (this.icon)
      return $`<studs-icon icon="${this.icon}"></studs-icon>`;
  }
  render() {
    const e = { dropdown: !0, "-disableHover": this.overlay, "-disabled": this.disabled, [this.class]: this.class }, t = { input: !0, "-focusAndHover": this.focused && this.searchable };
    return $`<div class="${O(e)}" ?disabled=${this.disabled}>
      ${this.renderValues()} ${this.renderIcon()}
      <input
        class="${O(t)}"
        placeholder="${this.inputPlaceholder}"
        ?readonly=${!this.searchable}
        ?disabled=${this.disabled}
      />
    </div>`;
  }
  createRenderRoot() {
    return this;
  }
};
p([l({ type: Boolean })], d.prototype, "disabled", 2);
p([l({ type: Boolean })], d.prototype, "multiple", 2);
p([l({ type: Boolean })], d.prototype, "searchable", 2);
p([l({ type: Boolean })], d.prototype, "closeOnSelect", 2);
p([l({ type: Boolean })], d.prototype, "closeOnClickOutside", 2);
p([l({ type: Boolean })], d.prototype, "group", 2);
p([l({ type: Boolean })], d.prototype, "showDeleteButton", 2);
p([l({ type: Boolean })], d.prototype, "disableOverlay", 2);
p([l({ type: String })], d.prototype, "valueExpr", 2);
p([l({ type: String })], d.prototype, "displayExpr", 2);
p([l({ type: [String] })], d.prototype, "searchExpr", 2);
p([l({ type: String })], d.prototype, "searchMode", 2);
p([l({ type: String })], d.prototype, "searchValue", 2);
p([l({ type: String })], d.prototype, "itemTemplateId", 2);
p([l({ type: String })], d.prototype, "valueTemplateId", 2);
p([l({ type: String })], d.prototype, "inputPlaceholder", 2);
p([l({ type: Number })], d.prototype, "searchTimeout", 2);
p([l({ type: Number })], d.prototype, "minSearchLength", 2);
p([l()], d.prototype, "iconPosition", 2);
p([l()], d.prototype, "contentDirection", 2);
p([l()], d.prototype, "class", 2);
p([l({ type: String })], d.prototype, "icon", 2);
p([l()], d.prototype, "text", 2);
p([J()], d.prototype, "overlay", 2);
p([J()], d.prototype, "focused", 2);
p([J()], d.prototype, "value", 2);
d = p([N("studs-dropdown")], d);
var Yt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, _ = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Qt(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Yt(t, i, o), o;
};
let f = class extends m {
  constructor() {
    super(...arguments), this.label = "", this.text = "Chip", this.icon = "", this.iconPosition = "start", this.size = "medium", this.variant = "primary", this.contentDirection = "horizontal", this.disabled = !1, this.selected = !1, this.clickable = !1, this.deletable = !1, this.class = "", this.onDelete = () => {
    };
  }
  renderChildren() {
    if (this.children)
      return $`${this.children}`;
  }
  renderDeleteButton() {
    if (this.deletable)
      return $`<studs-button
        class="-close"
        buttontype="icon"
        text=""
        icon='<svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        onclick="${this.onDelete}"
      ></studs-button>`;
  }
  renderIcon() {
    if (this.icon)
      return $`<studs-icon
        icon="${this.icon}"
        size="${this.size}"
      ></studs-icon>`;
  }
  render() {
    const e = { chip: !0, [`-${this.size}`]: this.size, [`-${this.contentDirection}`]: this.contentDirection, [`-${this.variant}`]: this.variant, "-reverse": this.iconPosition === "end", "-disabled": this.disabled, "-selected": this.selected, "-clickable": this.clickable, "-deletable": this.deletable, [this.class]: this.class };
    return $`
      <div class="${O(e)}">
        ${this.renderChildren()} ${this.renderDeleteButton()}
        ${this.renderIcon()}
        <span class="text">${this.text}</span>
      </div>
    `;
  }
  createRenderRoot() {
    return this;
  }
};
_([l()], f.prototype, "label", 2);
_([l({ type: String })], f.prototype, "text", 2);
_([l({ type: String })], f.prototype, "icon", 2);
_([l({ type: String })], f.prototype, "iconPosition", 2);
_([l({ type: String })], f.prototype, "size", 2);
_([l({ type: String })], f.prototype, "variant", 2);
_([l({ type: String })], f.prototype, "contentDirection", 2);
_([l({ type: Boolean })], f.prototype, "disabled", 2);
_([l({ type: Boolean })], f.prototype, "selected", 2);
_([l({ type: Boolean })], f.prototype, "clickable", 2);
_([l({ type: Boolean })], f.prototype, "deletable", 2);
_([l({ type: String })], f.prototype, "class", 2);
_([l({ type: Function })], f.prototype, "onDelete", 2);
f = _([N("studs-chip")], f);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
class rt extends Pt {
  constructor(t) {
    if (super(t), this.et = v, t.type !== Ct.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === v || t == null)
      return this.ft = void 0, this.et = t;
    if (t === w)
      return t;
    if (typeof t != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.et)
      return this.ft;
    this.et = t;
    const i = [t];
    return i.raw = i, this.ft = { _$litType$: this.constructor.resultType, strings: i, values: [] };
  }
}
rt.directiveName = "unsafeHTML", rt.resultType = 1;
const Xt = xt(rt);
var te = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, Z = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ee(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && te(t, i, o), o;
};
let z = class extends m {
  constructor() {
    super(...arguments), this.icon = "", this.size = "Medium", this.class = "";
  }
  render() {
    var e;
    const t = !!((e = this.icon) != null && e.includes("<svg")), i = { icon: !0, [`-${this.size}`]: this.size, ["-medium"]: !this.size, ["-file"]: t, ["-font"]: !t };
    return this.icon ? $`<div class="${O(i)}">
        ${Xt(this.icon)}
      </div>` : null;
  }
  createRenderRoot() {
    return this;
  }
};
Z([l({ type: String })], z.prototype, "icon", 2);
Z([l({ type: String })], z.prototype, "size", 2);
Z([l({ type: String })], z.prototype, "class", 2);
z = Z([N("studs-icon")], z);
var ie = Object.defineProperty, se = Object.getOwnPropertyDescriptor, F = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? se(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && ie(t, i, o), o;
};
let M = class extends m {
  constructor() {
    super(...arguments), this.class = "", this.items = [], this._selected = "";
  }
  render() {
    const e = { buttonGroup: !0, [this.class]: this.class }, t = this.items;
    return $`<div class=${O(e)}>
      ${Ot(t, (i, s) => {
      const o = `btngroup_btn_${i.children || i.text.trim().replace(" ", "_")}_${s}`;
      return $`<studs-button
          class="${this._selected.includes(o) && "-selected"}"
          size=${i.size}
          buttonType=${i.buttonType || "primary"}
          >${i.children || i.text}</studs-button
        >`;
    })}
    </div>`;
  }
  createRenderRoot() {
    return this;
  }
};
F([l({ type: String })], M.prototype, "class", 2);
F([l({ type: Array })], M.prototype, "items", 2);
F([J()], M.prototype, "_selected", 2);
M = F([N("studs-button-group")], M);
var oe = Object.defineProperty, ne = Object.getOwnPropertyDescriptor, re = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ne(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && oe(t, i, o), o;
};
let mt = class extends m {
  render() {
    return $`
      <div class=${O({ carousel: !0 })}>
        <div class="carouselPrevBtn">
          <studs-button text="<" class="prevBtn" @click=${null}></studs-button>
        </div>
        <div class="carouselContent"></div>
        <div class="carouselNextBtn">
          <studs-button text=">" class="nextBtn" @click=${null}></studs-button>
        </div>
      </div>
    `;
  }
};
mt = re([N("studs-carousel")], mt);
function le() {
  var e = prompt("Enter text to encrypt:"), t = "";
  if (e != null && e.length)
    for (var i = 0; i < e.length; i++) {
      var s = e == null ? void 0 : e.charCodeAt(i);
      s && (s >= 65 && s <= 90 ? t += String.fromCharCode((s - 65 + 13) % 26 + 65) : s >= 97 && s <= 122 ? t += String.fromCharCode((s - 97 + 13) % 26 + 97) : t += e == null ? void 0 : e.charAt(i));
    }
  return alert("Encrypted string: " + t), t;
}
window.encryptString = le;
