(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload"))
    return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
    n(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const r of o.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && n(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(i) {
    const o = {};
    return i.integrity && (o.integrity = i.integrity), i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? o.credentials = "include" : i.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function n(i) {
    if (i.ep)
      return;
    i.ep = !0;
    const o = t(i);
    fetch(i.href, o);
  }
})();
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const ze = window, Pn = ze.ShadowRoot && (ze.ShadyCSS === void 0 || ze.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $i = Symbol(), qn = /* @__PURE__ */ new WeakMap();
let ro = class {
  constructor(e, t, n) {
    if (this._$cssResult$ = !0, n !== $i)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Pn && e === void 0) {
      const n = t !== void 0 && t.length === 1;
      n && (e = qn.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && qn.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const so = (e) => new ro(typeof e == "string" ? e : e + "", void 0, $i), lo = (e, t) => {
  Pn ? e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet) : t.forEach((n) => {
    const i = document.createElement("style"), o = ze.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  });
}, Kn = Pn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules)
    n += i.cssText;
  return so(n);
})(e) : e;
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var ln;
const Be = window, Jn = Be.trustedTypes, ao = Jn ? Jn.emptyScript : "", Qn = Be.reactiveElementPolyfillSupport, mn = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ao : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, wi = (e, t) => t !== e && (t == t || e == e), an = { attribute: !0, type: String, converter: mn, reflect: !1, hasChanged: wi }, bn = "finalized";
let qt = class extends HTMLElement {
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
    return this.elementProperties.forEach((t, n) => {
      const i = this._$Ep(n, t);
      i !== void 0 && (this._$Ev.set(i, n), e.push(i));
    }), e;
  }
  static createProperty(e, t = an) {
    if (t.state && (t.attribute = !1), this.finalize(), this.elementProperties.set(e, t), !t.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const n = typeof e == "symbol" ? Symbol() : "__" + e, i = this.getPropertyDescriptor(e, n, t);
      i !== void 0 && Object.defineProperty(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    return { get() {
      return this[t];
    }, set(i) {
      const o = this[e];
      this[t] = i, this.requestUpdate(e, o, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || an;
  }
  static finalize() {
    if (this.hasOwnProperty(bn))
      return !1;
    this[bn] = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties, n = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const i of n)
        this.createProperty(i, t[i]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const i of n)
        t.unshift(Kn(i));
    } else
      e !== void 0 && t.push(Kn(e));
    return t;
  }
  static _$Ep(e, t) {
    const n = t.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  u() {
    var e;
    this._$E_ = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, n;
    ((t = this._$ES) !== null && t !== void 0 ? t : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((n = e.hostConnected) === null || n === void 0 || n.call(e));
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
    return lo(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var n;
      return (n = t.hostConnected) === null || n === void 0 ? void 0 : n.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var n;
      return (n = t.hostDisconnected) === null || n === void 0 ? void 0 : n.call(t);
    });
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n);
  }
  _$EO(e, t, n = an) {
    var i;
    const o = this.constructor._$Ep(e, n);
    if (o !== void 0 && n.reflect === !0) {
      const r = (((i = n.converter) === null || i === void 0 ? void 0 : i.toAttribute) !== void 0 ? n.converter : mn).toAttribute(t, n.type);
      this._$El = e, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$El = null;
    }
  }
  _$AK(e, t) {
    var n;
    const i = this.constructor, o = i._$Ev.get(e);
    if (o !== void 0 && this._$El !== o) {
      const r = i.getPropertyOptions(o), s = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((n = r.converter) === null || n === void 0 ? void 0 : n.fromAttribute) !== void 0 ? r.converter : mn;
      this._$El = o, this[o] = s.fromAttribute(t, r.type), this._$El = null;
    }
  }
  requestUpdate(e, t, n) {
    let i = !0;
    e !== void 0 && (((n = n || this.constructor.getPropertyOptions(e)).hasChanged || wi)(this[e], t) ? (this._$AL.has(e) || this._$AL.set(e, t), n.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, n))) : i = !1), !this.isUpdatePending && i && (this._$E_ = this._$Ej());
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
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((i, o) => this[o] = i), this._$Ei = void 0);
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
        var o;
        return (o = i.hostUpdate) === null || o === void 0 ? void 0 : o.call(i);
      }), this.update(n)) : this._$Ek();
    } catch (i) {
      throw t = !1, this._$Ek(), i;
    }
    t && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((n) => {
      var i;
      return (i = n.hostUpdated) === null || i === void 0 ? void 0 : i.call(n);
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
    this._$EC !== void 0 && (this._$EC.forEach((t, n) => this._$EO(n, this[n], t)), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
qt[bn] = !0, qt.elementProperties = /* @__PURE__ */ new Map(), qt.elementStyles = [], qt.shadowRootOptions = { mode: "open" }, Qn == null || Qn({ ReactiveElement: qt }), ((ln = Be.reactiveElementVersions) !== null && ln !== void 0 ? ln : Be.reactiveElementVersions = []).push("1.6.2");
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var cn;
const He = window, te = He.trustedTypes, Zn = te ? te.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, _n = "$lit$", Ot = `lit$${(Math.random() + "").slice(9)}$`, Si = "?" + Ot, co = `<${Si}>`, Wt = document, he = () => Wt.createComment(""), pe = (e) => e === null || typeof e != "object" && typeof e != "function", Ai = Array.isArray, uo = (e) => Ai(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", un = `[ 	
\f\r]`, ce = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Yn = /-->/g, ti = />/g, jt = RegExp(`>|${un}(?:([^\\s"'>=/]+)(${un}*=${un}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ei = /'/g, ni = /"/g, xi = /^(?:script|style|textarea|title)$/i, ho = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), K = ho(1), St = Symbol.for("lit-noChange"), q = Symbol.for("lit-nothing"), ii = /* @__PURE__ */ new WeakMap(), Bt = Wt.createTreeWalker(Wt, 129, null, !1), po = (e, t) => {
  const n = e.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : "", s = ce;
  for (let l = 0; l < n; l++) {
    const a = e[l];
    let u, f, h = -1, v = 0;
    for (; v < a.length && (s.lastIndex = v, f = s.exec(a), f !== null); )
      v = s.lastIndex, s === ce ? f[1] === "!--" ? s = Yn : f[1] !== void 0 ? s = ti : f[2] !== void 0 ? (xi.test(f[2]) && (o = RegExp("</" + f[2], "g")), s = jt) : f[3] !== void 0 && (s = jt) : s === jt ? f[0] === ">" ? (s = o ?? ce, h = -1) : f[1] === void 0 ? h = -2 : (h = s.lastIndex - f[2].length, u = f[1], s = f[3] === void 0 ? jt : f[3] === '"' ? ni : ei) : s === ni || s === ei ? s = jt : s === Yn || s === ti ? s = ce : (s = jt, o = void 0);
    const d = s === jt && e[l + 1].startsWith("/>") ? " " : "";
    r += s === ce ? a + co : h >= 0 ? (i.push(u), a.slice(0, h) + _n + a.slice(h) + Ot + d) : a + Ot + (h === -2 ? (i.push(void 0), l) : d);
  }
  const c = r + (e[n] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(e) || !e.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [Zn !== void 0 ? Zn.createHTML(c) : c, i];
};
class fe {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const c = t.length - 1, l = this.parts, [a, u] = po(t, n);
    if (this.el = fe.createElement(a, i), Bt.currentNode = this.el.content, n === 2) {
      const f = this.el.content, h = f.firstChild;
      h.remove(), f.append(...h.childNodes);
    }
    for (; (o = Bt.nextNode()) !== null && l.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) {
          const f = [];
          for (const h of o.getAttributeNames())
            if (h.endsWith(_n) || h.startsWith(Ot)) {
              const v = u[s++];
              if (f.push(h), v !== void 0) {
                const d = o.getAttribute(v.toLowerCase() + _n).split(Ot), p = /([.?@])?(.*)/.exec(v);
                l.push({ type: 1, index: r, name: p[2], strings: d, ctor: p[1] === "." ? vo : p[1] === "?" ? yo : p[1] === "@" ? mo : Xe });
              } else
                l.push({ type: 6, index: r });
            }
          for (const h of f)
            o.removeAttribute(h);
        }
        if (xi.test(o.tagName)) {
          const f = o.textContent.split(Ot), h = f.length - 1;
          if (h > 0) {
            o.textContent = te ? te.emptyScript : "";
            for (let v = 0; v < h; v++)
              o.append(f[v], he()), Bt.nextNode(), l.push({ type: 2, index: ++r });
            o.append(f[h], he());
          }
        }
      } else if (o.nodeType === 8)
        if (o.data === Si)
          l.push({ type: 2, index: r });
        else {
          let f = -1;
          for (; (f = o.data.indexOf(Ot, f + 1)) !== -1; )
            l.push({ type: 7, index: r }), f += Ot.length - 1;
        }
      r++;
    }
  }
  static createElement(t, n) {
    const i = Wt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function ee(e, t, n = e, i) {
  var o, r, s, c;
  if (t === St)
    return t;
  let l = i !== void 0 ? (o = n._$Co) === null || o === void 0 ? void 0 : o[i] : n._$Cl;
  const a = pe(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== a && ((r = l == null ? void 0 : l._$AO) === null || r === void 0 || r.call(l, !1), a === void 0 ? l = void 0 : (l = new a(e), l._$AT(e, n, i)), i !== void 0 ? ((s = (c = n)._$Co) !== null && s !== void 0 ? s : c._$Co = [])[i] = l : n._$Cl = l), l !== void 0 && (t = ee(e, l._$AS(e, t.values), l, i)), t;
}
class fo {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var n;
    const { el: { content: i }, parts: o } = this._$AD, r = ((n = t == null ? void 0 : t.creationScope) !== null && n !== void 0 ? n : Wt).importNode(i, !0);
    Bt.currentNode = r;
    let s = Bt.nextNode(), c = 0, l = 0, a = o[0];
    for (; a !== void 0; ) {
      if (c === a.index) {
        let u;
        a.type === 2 ? u = new xe(s, s.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(s, a.name, a.strings, this, t) : a.type === 6 && (u = new bo(s, this, t)), this._$AV.push(u), a = o[++l];
      }
      c !== (a == null ? void 0 : a.index) && (s = Bt.nextNode(), c++);
    }
    return Bt.currentNode = Wt, r;
  }
  v(t) {
    let n = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class xe {
  constructor(t, n, i, o) {
    var r;
    this.type = 2, this._$AH = q, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cp = (r = o == null ? void 0 : o.isConnected) === null || r === void 0 || r;
  }
  get _$AU() {
    var t, n;
    return (n = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && n !== void 0 ? n : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = ee(this, t, n), pe(t) ? t === q || t == null || t === "" ? (this._$AH !== q && this._$AR(), this._$AH = q) : t !== this._$AH && t !== St && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : uo(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== q && pe(this._$AH) ? this._$AA.nextSibling.data = t : this.$(Wt.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var n;
    const { values: i, _$litType$: o } = t, r = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = fe.createElement(o.h, this.options)), o);
    if (((n = this._$AH) === null || n === void 0 ? void 0 : n._$AD) === r)
      this._$AH.v(i);
    else {
      const s = new fo(r, this), c = s.u(this.options);
      s.v(i), this.$(c), this._$AH = s;
    }
  }
  _$AC(t) {
    let n = ii.get(t.strings);
    return n === void 0 && ii.set(t.strings, n = new fe(t)), n;
  }
  T(t) {
    Ai(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const r of t)
      o === n.length ? n.push(i = new xe(this.k(he()), this.k(he()), this, this.options)) : i = n[o], i._$AI(r), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, n); t && t !== this._$AB; ) {
      const o = t.nextSibling;
      t.remove(), t = o;
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 && (this._$Cp = t, (n = this._$AP) === null || n === void 0 || n.call(this, t));
  }
}
class Xe {
  constructor(t, n, i, o, r) {
    this.type = 1, this._$AH = q, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = q;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, n = this, i, o) {
    const r = this.strings;
    let s = !1;
    if (r === void 0)
      t = ee(this, t, n, 0), s = !pe(t) || t !== this._$AH && t !== St, s && (this._$AH = t);
    else {
      const c = t;
      let l, a;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        a = ee(this, c[i + l], n, l), a === St && (a = this._$AH[l]), s || (s = !pe(a) || a !== this._$AH[l]), a === q ? t = q : t !== q && (t += (a ?? "") + r[l + 1]), this._$AH[l] = a;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === q ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class vo extends Xe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === q ? void 0 : t;
  }
}
const go = te ? te.emptyScript : "";
class yo extends Xe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== q ? this.element.setAttribute(this.name, go) : this.element.removeAttribute(this.name);
  }
}
class mo extends Xe {
  constructor(t, n, i, o, r) {
    super(t, n, i, o, r), this.type = 5;
  }
  _$AI(t, n = this) {
    var i;
    if ((t = (i = ee(this, t, n, 0)) !== null && i !== void 0 ? i : q) === St)
      return;
    const o = this._$AH, r = t === q && o !== q || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, s = t !== q && (o === q || r);
    r && this.element.removeEventListener(this.name, this, o), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var n, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (n = this.options) === null || n === void 0 ? void 0 : n.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class bo {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ee(this, t);
  }
}
const oi = He.litHtmlPolyfillSupport;
oi == null || oi(fe, xe), ((cn = He.litHtmlVersions) !== null && cn !== void 0 ? cn : He.litHtmlVersions = []).push("2.7.4");
const _o = (e, t, n) => {
  var i, o;
  const r = (i = n == null ? void 0 : n.renderBefore) !== null && i !== void 0 ? i : t;
  let s = r._$litPart$;
  if (s === void 0) {
    const c = (o = n == null ? void 0 : n.renderBefore) !== null && o !== void 0 ? o : null;
    r._$litPart$ = s = new xe(t.insertBefore(he(), c), c, void 0, n ?? {});
  }
  return s._$AI(e), s;
};
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var dn, hn;
class ht extends qt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, n;
    const i = super.createRenderRoot();
    return (t = (n = this.renderOptions).renderBefore) !== null && t !== void 0 || (n.renderBefore = i.firstChild), i;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = _o(n, this.renderRoot, this.renderOptions);
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
    return St;
  }
}
ht.finalized = !0, ht._$litElement$ = !0, (dn = globalThis.litElementHydrateSupport) === null || dn === void 0 || dn.call(globalThis, { LitElement: ht });
const ri = globalThis.litElementPolyfillSupport;
ri == null || ri({ LitElement: ht });
((hn = globalThis.litElementVersions) !== null && hn !== void 0 ? hn : globalThis.litElementVersions = []).push("3.3.2");
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const Vt = (e) => (t) => typeof t == "function" ? ((n, i) => (customElements.define(n, i), i))(e, t) : ((n, i) => {
  const { kind: o, elements: r } = i;
  return { kind: o, elements: r, finisher(s) {
    customElements.define(n, s);
  } };
})(e, t);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const $o = (e, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(n) {
  n.createProperty(t.key, e);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(n) {
  n.createProperty(t.key, e);
} }, wo = (e, t, n) => {
  t.constructor.createProperty(n, e);
};
function P(e) {
  return (t, n) => n !== void 0 ? wo(e, t, n) : $o(e, t);
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function oe(e) {
  return P({ ...e, state: !0 });
}
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var pn;
((pn = window.HTMLSlotElement) === null || pn === void 0 ? void 0 : pn.prototype.assignedElements) != null;
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const kn = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, On = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Mn = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, n) {
    this._$Ct = e, this._$AM = t, this._$Ci = n;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
/**
* @license
* Copyright 2018 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const At = On(class extends Mn {
  constructor(e) {
    var t;
    if (super(e), e.type !== kn.ATTRIBUTE || e.name !== "class" || ((t = e.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
  }
  update(e, [t]) {
    var n, i;
    if (this.it === void 0) {
      this.it = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((r) => r !== "")));
      for (const r in t)
        t[r] && !(!((n = this.nt) === null || n === void 0) && n.has(r)) && this.it.add(r);
      return this.render(t);
    }
    const o = e.element.classList;
    this.it.forEach((r) => {
      r in t || (o.remove(r), this.it.delete(r));
    });
    for (const r in t) {
      const s = !!t[r];
      s === this.it.has(r) || !((i = this.nt) === null || i === void 0) && i.has(r) || (s ? (o.add(r), this.it.add(r)) : (o.remove(r), this.it.delete(r)));
    }
    return St;
  }
});
var So = Object.defineProperty, Ao = Object.getOwnPropertyDescriptor, Et = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ao(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && So(t, n, o), o;
};
let ft = class extends ht {
  constructor() {
    super(...arguments), this.buttonType = "cta", this.size = "medium", this.disabled = !1, this.iconPosition = "start", this.contentDirection = "horizontal", this.btnClasses = "", this.icon = "", this.text = "", this.checkIfLink = this.buttonType === "link";
  }
  renderChildren() {
    if (this.text)
      return K`${this.text}`;
    if (this.children)
      return K`${this.children}`;
  }
  renderIcon() {
    if (this.icon)
      return K`<studs-icon
        icon="${this.icon}"
        size="${this.size || "medium"}"
      ></studs-icon>`;
  }
  render() {
    const e = { button: !0, [`-${this.buttonType}`]: this.buttonType, [`-${this.size}`]: !0, "-disabled": this.disabled, [`-${this.contentDirection}`]: this.contentDirection, "-reverse": this.iconPosition === "end", [this.btnClasses]: this.btnClasses };
    return K`<button class="${At(e)}" ?disabled=${this.disabled}>
      ${this.renderIcon()} ${this.renderChildren()}
    </button>`;
  }
  createRenderRoot() {
    return this;
  }
};
Et([P({ type: String })], ft.prototype, "buttonType", 2);
Et([P({ type: String })], ft.prototype, "size", 2);
Et([P({ type: Boolean, reflect: !0 })], ft.prototype, "disabled", 2);
Et([P()], ft.prototype, "iconPosition", 2);
Et([P()], ft.prototype, "contentDirection", 2);
Et([P()], ft.prototype, "btnClasses", 2);
Et([P({ type: String })], ft.prototype, "icon", 2);
Et([P()], ft.prototype, "text", 2);
ft = Et([Vt("studs-button")], ft);
/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function* qe(e, t) {
  if (e !== void 0) {
    let n = 0;
    for (const i of e)
      yield t(i, n++);
  }
}
var xo = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, Rt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Co(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && xo(t, n, o), o;
};
let xt = class extends ht {
  constructor() {
    super(...arguments), this.class = "", this.icon = "", this.disabled = !1, this.options = [], this.selected = null, this.label = "Toggle Dropdown", this._open = !1;
  }
  toggle() {
    this._open = !this._open;
  }
  renderIcon() {
    if (this.icon)
      return K`<studs-icon icon="${this.icon}"></studs-icon>`;
  }
  getSelected() {
    if (this.selected) {
      const e = this.options.find((t) => {
        var n;
        return t.value === ((n = this.selected) == null ? void 0 : n.value);
      });
      return e == null ? void 0 : e.label;
    } else
      return this.options[0].label;
  }
  render() {
    const e = { dropdown: !0, "-container": !0, "-disabled": this.disabled, [this.class]: this.class, "-open": this._open };
    return K` <div class=${At(e)}>
      <p>${this.label}</p>
      <div class="-content">
        <button
          class="-toggle"
          ?disabled=${this.disabled}
          aria-label="Toggle Dropdown"
          @click=${() => this.toggle()}
        >
          ${this.renderIcon()} ${this.getSelected()}
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 4L9 1"
              stroke="#383838"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div class="-menuWrapper" ?hidden=${!this._open}>
          <div class="-menu">
            ${qe(this.options, (t) => {
      var n, i;
      const o = { "-option": !0, "-selected": t.value === ((n = this.selected) == null ? void 0 : n.value) };
      return K`<button
                class=${At(o)}
                @click=${() => {
        this.selected = t, this.toggle();
      }}
              >
                ${t.label}
                ${((i = this.selected) == null ? void 0 : i.value) === t.value ? K`<svg
                      width="10"
                      height="7"
                      viewBox="0 0 10 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.5L4 6L9 1"
                        stroke="#231F20"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg> ` : null}
              </button>`;
    })}
          </div>
        </div>
      </div>
    </div>`;
  }
  createRenderRoot() {
    return this;
  }
};
Rt([P({ type: String })], xt.prototype, "class", 2);
Rt([P({ type: String })], xt.prototype, "icon", 2);
Rt([P({ type: Boolean })], xt.prototype, "disabled", 2);
Rt([P({ type: Object })], xt.prototype, "options", 2);
Rt([P({ type: Object })], xt.prototype, "selected", 2);
Rt([P({ type: String })], xt.prototype, "label", 2);
Rt([oe()], xt.prototype, "_open", 2);
xt = Rt([Vt("studs-dropdown")], xt);
var Eo = Object.defineProperty, Po = Object.getOwnPropertyDescriptor, st = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Po(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && Eo(t, n, o), o;
};
let nt = class extends ht {
  constructor() {
    super(...arguments), this.label = "", this.text = "Chip", this.icon = "", this.iconPosition = "start", this.size = "medium", this.variant = "primary", this.contentDirection = "horizontal", this.disabled = !1, this.selected = !1, this.clickable = !1, this.deletable = !1, this.class = "", this.onDelete = () => {
    };
  }
  renderChildren() {
    if (this.children)
      return K`${this.children}`;
  }
  renderDeleteButton() {
    if (this.deletable)
      return K`<studs-button
        class="-close"
        buttontype="icon"
        text=""
        icon='<svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        onclick="${this.onDelete}"
      ></studs-button>`;
  }
  renderIcon() {
    if (this.icon)
      return K`<studs-icon
        icon="${this.icon}"
        size="${this.size}"
      ></studs-icon>`;
  }
  render() {
    const e = { chip: !0, [`-${this.size}`]: this.size, [`-${this.contentDirection}`]: this.contentDirection, [`-${this.variant}`]: this.variant, "-reverse": this.iconPosition === "end", "-disabled": this.disabled, "-selected": this.selected, "-clickable": this.clickable, "-deletable": this.deletable, [this.class]: this.class };
    return K`
      <div class="${At(e)}">
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
st([P()], nt.prototype, "label", 2);
st([P({ type: String })], nt.prototype, "text", 2);
st([P({ type: String })], nt.prototype, "icon", 2);
st([P({ type: String })], nt.prototype, "iconPosition", 2);
st([P({ type: String })], nt.prototype, "size", 2);
st([P({ type: String })], nt.prototype, "variant", 2);
st([P({ type: String })], nt.prototype, "contentDirection", 2);
st([P({ type: Boolean })], nt.prototype, "disabled", 2);
st([P({ type: Boolean })], nt.prototype, "selected", 2);
st([P({ type: Boolean })], nt.prototype, "clickable", 2);
st([P({ type: Boolean })], nt.prototype, "deletable", 2);
st([P({ type: String })], nt.prototype, "class", 2);
st([P({ type: Function })], nt.prototype, "onDelete", 2);
nt = st([Vt("studs-chip")], nt);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
class $n extends Mn {
  constructor(t) {
    if (super(t), this.et = q, t.type !== kn.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === q || t == null)
      return this.ft = void 0, this.et = t;
    if (t === St)
      return t;
    if (typeof t != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.et)
      return this.ft;
    this.et = t;
    const n = [t];
    return n.raw = n, this.ft = { _$litType$: this.constructor.resultType, strings: n, values: [] };
  }
}
$n.directiveName = "unsafeHTML", $n.resultType = 1;
const ko = On($n);
var Oo = Object.defineProperty, Mo = Object.getOwnPropertyDescriptor, Ke = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Mo(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && Oo(t, n, o), o;
};
let ve = class extends ht {
  constructor() {
    super(...arguments), this.icon = "", this.size = "Medium", this.class = "";
  }
  render() {
    var e;
    const t = !!((e = this.icon) != null && e.includes("<svg")), n = { icon: !0, [`-${this.size}`]: !0, ["-file"]: t, ["-font"]: !t };
    return this.icon ? K`<div class="${At(n)}">
        ${ko(this.icon)}
      </div>` : null;
  }
  createRenderRoot() {
    return this;
  }
};
Ke([P({ type: String })], ve.prototype, "icon", 2);
Ke([P({ type: String })], ve.prototype, "size", 2);
Ke([P({ type: String })], ve.prototype, "class", 2);
ve = Ke([Vt("studs-icon")], ve);
var No = Object.defineProperty, Lo = Object.getOwnPropertyDescriptor, Je = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Lo(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && No(t, n, o), o;
};
let ge = class extends ht {
  constructor() {
    super(...arguments), this.class = "", this.items = [], this._selected = "";
  }
  render() {
    const e = { buttonGroup: !0, [this.class]: this.class }, t = this.items;
    return K`<div class=${At(e)}>
      ${qe(t, (n, i) => {
      const o = `btngroup_btn_${n.children || n.text.trim().replace(" ", "_")}_${i}`;
      return K`<studs-button
          class="${this._selected.includes(o) && "-selected"}"
          size=${n.size}
          buttonType=${n.buttonType || "primary"}
          >${n.children || n.text}</studs-button
        >`;
    })}
    </div>`;
  }
  createRenderRoot() {
    return this;
  }
};
Je([P({ type: String })], ge.prototype, "class", 2);
Je([P({ type: Array })], ge.prototype, "items", 2);
Je([oe()], ge.prototype, "_selected", 2);
ge = Je([Vt("studs-button-group")], ge);
/**
* @license
* Copyright 2018 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const Ci = "important", Do = " !" + Ci, Ro = On(class extends Mn {
  constructor(e) {
    var t;
    if (super(e), e.type !== kn.ATTRIBUTE || e.name !== "style" || ((t = e.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce((t, n) => {
      const i = e[n];
      return i == null ? t : t + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(e, [t]) {
    const { style: n } = e.element;
    if (this.ut === void 0) {
      this.ut = /* @__PURE__ */ new Set();
      for (const i in t)
        this.ut.add(i);
      return this.render(t);
    }
    this.ut.forEach((i) => {
      t[i] == null && (this.ut.delete(i), i.includes("-") ? n.removeProperty(i) : n[i] = "");
    });
    for (const i in t) {
      const o = t[i];
      if (o != null) {
        this.ut.add(i);
        const r = typeof o == "string" && o.endsWith(Do);
        i.includes("-") || r ? n.setProperty(i, r ? o.slice(0, -11) : o, r ? Ci : "") : n[i] = o;
      }
    }
    return St;
  }
});
var zo = Object.defineProperty, Io = Object.getOwnPropertyDescriptor, Pt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Io(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && zo(t, n, o), o;
};
let vt = class extends ht {
  constructor() {
    super(...arguments), this.nextIcon = '<svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>', this.prevIcon = '<svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>', this.perSlide = 3, this.initialSlide = 0, this.slides = [], this._currentSlide = this.initialSlide, this._direction = "", this._shouldMove = !1;
  }
  hasValidSelected() {
    return this._currentSlide >= 0 && this._currentSlide <= this.slides.length;
  }
  setCurrentSlide(e) {
    this._shouldMove = !0, e < this._currentSlide && (this._direction = "prev"), e > this._currentSlide && (this._direction = "next"), e !== this._currentSlide && (this._currentSlide = e), e === this.slides.length && (this._currentSlide = 0);
  }
  calculateOrder(e, t, n) {
    const i = e - t;
    return i < 0 ? n : i;
  }
  renderContainer(e) {
    if (e.length > 0)
      return K` <style>
          .slide {
            flex: 0 0 calc(100% / ${this.perSlide});
          }
        </style>
        <div class="slideContainer">
          ${qe(e, (t, n) => {
        const i = n === this._currentSlide, o = { slide: !0, "-active": i, "-side": !i }, r = this.calculateOrder(n, this._currentSlide, e.length);
        return K`
              <div
                class=${At(o)}
                id=${t.id || `slide-${n}`}
                @click=${() => this.setCurrentSlide(n)}
                @change=${() => console.log("changing")}
                style=${Ro({ order: r })}
              >
                <img
                  src=${t.image}
                  alt=${t.alt || "image"}
                  class="image"
                />
              </div>
            `;
      })}
        </div>`;
  }
  render() {
    const e = this.slides;
    return K`
      <div class=${At({ carousel: !0 })}>
        <div class="carouselPrevBtn">
          <studs-button
            buttonType="primary"
            icon=${this.prevIcon}
            btnClasses="prevBtn"
            @click=${() => this.setCurrentSlide(this._currentSlide - 1)}
          ></studs-button>
        </div>
        ${this.renderContainer(e)}
        <div class="carouselNextBtn">
          <studs-button
            buttonType="primary"
            icon=${this.nextIcon}
            btnClasses="nextBtn"
            @click=${() => this.setCurrentSlide(this._currentSlide + 1)}
          ></studs-button>
        </div>
      </div>
    `;
  }
  createRenderRoot() {
    return this;
  }
};
Pt([P({ type: String })], vt.prototype, "nextIcon", 2);
Pt([P({ type: String })], vt.prototype, "prevIcon", 2);
Pt([P({ type: Number })], vt.prototype, "perSlide", 2);
Pt([P({ type: Number })], vt.prototype, "initialSlide", 2);
Pt([P({ type: Array })], vt.prototype, "slides", 2);
Pt([oe()], vt.prototype, "_currentSlide", 2);
Pt([oe()], vt.prototype, "_direction", 2);
Pt([oe()], vt.prototype, "_shouldMove", 2);
vt = Pt([Vt("studs-carousel")], vt);
function si(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
  }
}
function To(e, t, n) {
  return t && si(e.prototype, t), n && si(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
/*!
* Splide.js
* Version  : 4.1.4
* License  : MIT
* Copyright: 2022 Naotoshi Fujita
*/
var li = "(prefers-reduced-motion: reduce)", Qt = 1, jo = 2, ne = 3, re = 4, Ce = 5, Ie = 6, We = 7, Uo = { CREATED: Qt, MOUNTED: jo, IDLE: ne, MOVING: re, SCROLLING: Ce, DRAGGING: Ie, DESTROYED: We };
function Ct(e) {
  e.length = 0;
}
function zt(e, t, n) {
  return Array.prototype.slice.call(e, t, n);
}
function H(e) {
  return e.bind.apply(e, [null].concat(zt(arguments, 1)));
}
var Ei = setTimeout, wn = function() {
};
function ai(e) {
  return requestAnimationFrame(e);
}
function Qe(e, t) {
  return typeof t === e;
}
function ye(e) {
  return !Ln(e) && Qe("object", e);
}
var Nn = Array.isArray, Pi = H(Qe, "function"), Nt = H(Qe, "string"), Ee = H(Qe, "undefined");
function Ln(e) {
  return e === null;
}
function ki(e) {
  try {
    return e instanceof (e.ownerDocument.defaultView || window).HTMLElement;
  } catch {
    return !1;
  }
}
function Pe(e) {
  return Nn(e) ? e : [e];
}
function ct(e, t) {
  Pe(e).forEach(t);
}
function Dn(e, t) {
  return e.indexOf(t) > -1;
}
function Te(e, t) {
  return e.push.apply(e, Pe(t)), e;
}
function _t(e, t, n) {
  e && ct(t, function(i) {
    i && e.classList[n ? "add" : "remove"](i);
  });
}
function gt(e, t) {
  _t(e, Nt(t) ? t.split(" ") : t, !0);
}
function ke(e, t) {
  ct(t, e.appendChild.bind(e));
}
function Rn(e, t) {
  ct(e, function(n) {
    var i = (t || n).parentNode;
    i && i.insertBefore(n, t);
  });
}
function me(e, t) {
  return ki(e) && (e.msMatchesSelector || e.matches).call(e, t);
}
function Oi(e, t) {
  var n = e ? zt(e.children) : [];
  return t ? n.filter(function(i) {
    return me(i, t);
  }) : n;
}
function Oe(e, t) {
  return t ? Oi(e, t)[0] : e.firstElementChild;
}
var be = Object.keys;
function Ht(e, t, n) {
  return e && (n ? be(e).reverse() : be(e)).forEach(function(i) {
    i !== "__proto__" && t(e[i], i);
  }), e;
}
function _e(e) {
  return zt(arguments, 1).forEach(function(t) {
    Ht(t, function(n, i) {
      e[i] = t[i];
    });
  }), e;
}
function Mt(e) {
  return zt(arguments, 1).forEach(function(t) {
    Ht(t, function(n, i) {
      Nn(n) ? e[i] = n.slice() : ye(n) ? e[i] = Mt({}, ye(e[i]) ? e[i] : {}, n) : e[i] = n;
    });
  }), e;
}
function ci(e, t) {
  ct(t || be(e), function(n) {
    delete e[n];
  });
}
function yt(e, t) {
  ct(e, function(n) {
    ct(t, function(i) {
      n && n.removeAttribute(i);
    });
  });
}
function I(e, t, n) {
  ye(t) ? Ht(t, function(i, o) {
    I(e, o, i);
  }) : ct(e, function(i) {
    Ln(n) || n === "" ? yt(i, t) : i.setAttribute(t, String(n));
  });
}
function Zt(e, t, n) {
  var i = document.createElement(e);
  return t && (Nt(t) ? gt(i, t) : I(i, t)), n && ke(n, i), i;
}
function ut(e, t, n) {
  if (Ee(n))
    return getComputedStyle(e)[t];
  Ln(n) || (e.style[t] = "" + n);
}
function $e(e, t) {
  ut(e, "display", t);
}
function Mi(e) {
  e.setActive && e.setActive() || e.focus({ preventScroll: !0 });
}
function dt(e, t) {
  return e.getAttribute(t);
}
function ui(e, t) {
  return e && e.classList.contains(t);
}
function lt(e) {
  return e.getBoundingClientRect();
}
function Ft(e) {
  ct(e, function(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  });
}
function Ni(e) {
  return Oe(new DOMParser().parseFromString(e, "text/html").body);
}
function bt(e, t) {
  e.preventDefault(), t && (e.stopPropagation(), e.stopImmediatePropagation());
}
function Li(e, t) {
  return e && e.querySelector(t);
}
function zn(e, t) {
  return t ? zt(e.querySelectorAll(t)) : [];
}
function $t(e, t) {
  _t(e, t, !1);
}
function Sn(e) {
  return e.timeStamp;
}
function Ut(e) {
  return Nt(e) ? e : e ? e + "px" : "";
}
var Me = "splide", In = "data-" + Me;
function ue(e, t) {
  if (!e)
    throw new Error("[" + Me + "] " + (t || ""));
}
var Lt = Math.min, Fe = Math.max, Ge = Math.floor, we = Math.ceil, ot = Math.abs;
function Di(e, t, n) {
  return ot(e - t) < n;
}
function je(e, t, n, i) {
  var o = Lt(t, n), r = Fe(t, n);
  return i ? o < e && e < r : o <= e && e <= r;
}
function Kt(e, t, n) {
  var i = Lt(t, n), o = Fe(t, n);
  return Lt(Fe(i, e), o);
}
function An(e) {
  return +(e > 0) - +(e < 0);
}
function xn(e, t) {
  return ct(t, function(n) {
    e = e.replace("%s", "" + n);
  }), e;
}
function Tn(e) {
  return e < 10 ? "0" + e : "" + e;
}
var di = {};
function Bo(e) {
  return "" + e + Tn(di[e] = (di[e] || 0) + 1);
}
function Ri() {
  var e = [];
  function t(s, c, l, a) {
    o(s, c, function(u, f, h) {
      var v = "addEventListener" in u, d = v ? u.removeEventListener.bind(u, f, l, a) : u.removeListener.bind(u, l);
      v ? u.addEventListener(f, l, a) : u.addListener(l), e.push([u, f, h, l, d]);
    });
  }
  function n(s, c, l) {
    o(s, c, function(a, u, f) {
      e = e.filter(function(h) {
        return h[0] === a && h[1] === u && h[2] === f && (!l || h[3] === l) ? (h[4](), !1) : !0;
      });
    });
  }
  function i(s, c, l) {
    var a, u = !0;
    return typeof CustomEvent == "function" ? a = new CustomEvent(c, { bubbles: u, detail: l }) : (a = document.createEvent("CustomEvent"), a.initCustomEvent(c, u, !1, l)), s.dispatchEvent(a), a;
  }
  function o(s, c, l) {
    ct(s, function(a) {
      a && ct(c, function(u) {
        u.split(" ").forEach(function(f) {
          var h = f.split(".");
          l(a, h[0], h[1]);
        });
      });
    });
  }
  function r() {
    e.forEach(function(s) {
      s[4]();
    }), Ct(e);
  }
  return { bind: t, unbind: n, dispatch: i, destroy: r };
}
var Xt = "mounted", hi = "ready", Dt = "move", Ne = "moved", zi = "click", Ho = "active", Wo = "inactive", Fo = "visible", Go = "hidden", J = "refresh", rt = "updated", Se = "resize", jn = "resized", Vo = "drag", Xo = "dragging", qo = "dragged", Un = "scroll", se = "scrolled", Ko = "overflow", Ii = "destroy", Jo = "arrows:mounted", Qo = "arrows:updated", Zo = "pagination:mounted", Yo = "pagination:updated", Ti = "navigation:mounted", ji = "autoplay:play", tr = "autoplay:playing", Ui = "autoplay:pause", Bi = "lazyload:loaded", Hi = "sk", Wi = "sh", Ve = "ei";
function G(e) {
  var t = e ? e.event.bus : document.createDocumentFragment(), n = Ri();
  function i(r, s) {
    n.bind(t, Pe(r).join(" "), function(c) {
      s.apply(s, Nn(c.detail) ? c.detail : []);
    });
  }
  function o(r) {
    n.dispatch(t, r, zt(arguments, 1));
  }
  return e && e.event.on(Ii, n.destroy), _e(n, { bus: t, on: i, off: H(n.unbind, t), emit: o });
}
function Ze(e, t, n, i) {
  var o = Date.now, r, s = 0, c, l = !0, a = 0;
  function u() {
    if (!l) {
      if (s = e ? Lt((o() - r) / e, 1) : 1, n && n(s), s >= 1 && (t(), r = o(), i && ++a >= i))
        return h();
      c = ai(u);
    }
  }
  function f(m) {
    m || d(), r = o() - (m ? s * e : 0), l = !1, c = ai(u);
  }
  function h() {
    l = !0;
  }
  function v() {
    r = o(), s = 0, n && n(s);
  }
  function d() {
    c && cancelAnimationFrame(c), s = 0, c = 0, l = !0;
  }
  function p(m) {
    e = m;
  }
  function b() {
    return l;
  }
  return { start: f, rewind: v, pause: h, cancel: d, set: p, isPaused: b };
}
function er(e) {
  var t = e;
  function n(o) {
    t = o;
  }
  function i(o) {
    return Dn(Pe(o), t);
  }
  return { set: n, is: i };
}
function nr(e, t) {
  var n = Ze(t || 0, e, null, 1);
  return function() {
    n.isPaused() && n.start();
  };
}
function ir(e, t, n) {
  var i = e.state, o = n.breakpoints || {}, r = n.reducedMotion || {}, s = Ri(), c = [];
  function l() {
    var d = n.mediaQuery === "min";
    be(o).sort(function(p, b) {
      return d ? +p - +b : +b - +p;
    }).forEach(function(p) {
      u(o[p], "(" + (d ? "min" : "max") + "-width:" + p + "px)");
    }), u(r, li), f();
  }
  function a(d) {
    d && s.destroy();
  }
  function u(d, p) {
    var b = matchMedia(p);
    s.bind(b, "change", f), c.push([d, b]);
  }
  function f() {
    var d = i.is(We), p = n.direction, b = c.reduce(function(m, y) {
      return Mt(m, y[1].matches ? y[0] : {});
    }, {});
    ci(n), v(b), n.destroy ? e.destroy(n.destroy === "completely") : d ? (a(!0), e.mount()) : p !== n.direction && e.refresh();
  }
  function h(d) {
    matchMedia(li).matches && (d ? Mt(n, r) : ci(n, be(r)));
  }
  function v(d, p, b) {
    Mt(n, d), p && Mt(Object.getPrototypeOf(n), d), (b || !i.is(Qt)) && e.emit(rt, n);
  }
  return { setup: l, destroy: a, reduce: h, set: v };
}
var Ye = "Arrow", tn = Ye + "Left", en = Ye + "Right", Fi = Ye + "Up", Gi = Ye + "Down", pi = "rtl", nn = "ttb", fn = { width: ["height"], left: ["top", "right"], right: ["bottom", "left"], x: ["y"], X: ["Y"], Y: ["X"], ArrowLeft: [Fi, en], ArrowRight: [Gi, tn] };
function or(e, t, n) {
  function i(r, s, c) {
    c = c || n.direction;
    var l = c === pi && !s ? 1 : c === nn ? 0 : -1;
    return fn[r] && fn[r][l] || r.replace(/width|left|right/i, function(a, u) {
      var f = fn[a.toLowerCase()][l] || a;
      return u > 0 ? f.charAt(0).toUpperCase() + f.slice(1) : f;
    });
  }
  function o(r) {
    return r * (n.direction === pi ? 1 : -1);
  }
  return { resolve: i, orient: o };
}
var wt = "role", Yt = "tabindex", rr = "disabled", pt = "aria-", Le = pt + "controls", Vi = pt + "current", fi = pt + "selected", at = pt + "label", Bn = pt + "labelledby", Xi = pt + "hidden", Hn = pt + "orientation", Ae = pt + "roledescription", vi = pt + "live", gi = pt + "busy", yi = pt + "atomic", Wn = [wt, Yt, rr, Le, Vi, at, Bn, Xi, Hn, Ae], mt = Me + "__", It = "is-", vn = Me, mi = mt + "track", sr = mt + "list", on = mt + "slide", qi = on + "--clone", lr = on + "__container", Fn = mt + "arrows", rn = mt + "arrow", Ki = rn + "--prev", Ji = rn + "--next", sn = mt + "pagination", Qi = sn + "__page", ar = mt + "progress", cr = ar + "__bar", ur = mt + "toggle", dr = mt + "spinner", hr = mt + "sr", pr = It + "initialized", Gt = It + "active", Zi = It + "prev", Yi = It + "next", Cn = It + "visible", En = It + "loading", to = It + "focus-in", eo = It + "overflow", fr = [Gt, Cn, Zi, Yi, En, to, eo], vr = { slide: on, clone: qi, arrows: Fn, arrow: rn, prev: Ki, next: Ji, pagination: sn, page: Qi, spinner: dr };
function gr(e, t) {
  if (Pi(e.closest))
    return e.closest(t);
  for (var n = e; n && n.nodeType === 1 && !me(n, t); )
    n = n.parentElement;
  return n;
}
var yr = 5, bi = 200, no = "touchstart mousedown", gn = "touchmove mousemove", yn = "touchend touchcancel mouseup click";
function mr(e, t, n) {
  var i = G(e), o = i.on, r = i.bind, s = e.root, c = n.i18n, l = {}, a = [], u = [], f = [], h, v, d;
  function p() {
    g(), L(), y();
  }
  function b() {
    o(J, m), o(J, p), o(rt, y), r(document, no + " keydown", function($) {
      d = $.type === "keydown";
    }, { capture: !0 }), r(s, "focusin", function() {
      _t(s, to, !!d);
    });
  }
  function m($) {
    var k = Wn.concat("style");
    Ct(a), $t(s, u), $t(h, f), yt([h, v], k), yt(s, $ ? k : ["style", Ae]);
  }
  function y() {
    $t(s, u), $t(h, f), u = R(vn), f = R(mi), gt(s, u), gt(h, f), I(s, at, n.label), I(s, Bn, n.labelledby);
  }
  function g() {
    h = E("." + mi), v = Oe(h, "." + sr), ue(h && v, "A track/list element is missing."), Te(a, Oi(v, "." + on + ":not(." + qi + ")")), Ht({ arrows: Fn, pagination: sn, prev: Ki, next: Ji, bar: cr, toggle: ur }, function($, k) {
      l[k] = E("." + $);
    }), _e(l, { root: s, track: h, list: v, slides: a });
  }
  function L() {
    var $ = s.id || Bo(Me), k = n.role;
    s.id = $, h.id = h.id || $ + "-track", v.id = v.id || $ + "-list", !dt(s, wt) && s.tagName !== "SECTION" && k && I(s, wt, k), I(s, Ae, c.carousel), I(v, wt, "presentation");
  }
  function E($) {
    var k = Li(s, $);
    return k && gr(k, "." + vn) === s ? k : void 0;
  }
  function R($) {
    return [$ + "--" + n.type, $ + "--" + n.direction, n.drag && $ + "--draggable", n.isNavigation && $ + "--nav", $ === vn && Gt];
  }
  return _e(l, { setup: p, mount: b, destroy: m });
}
var ie = "slide", le = "loop", De = "fade";
function br(e, t, n, i) {
  var o = G(e), r = o.on, s = o.emit, c = o.bind, l = e.Components, a = e.root, u = e.options, f = u.isNavigation, h = u.updateOnMove, v = u.i18n, d = u.pagination, p = u.slideFocus, b = l.Direction.resolve, m = dt(i, "style"), y = dt(i, at), g = n > -1, L = Oe(i, "." + lr), E;
  function R() {
    g || (i.id = a.id + "-slide" + Tn(t + 1), I(i, wt, d ? "tabpanel" : "group"), I(i, Ae, v.slide), I(i, at, y || xn(v.slideLabel, [t + 1, e.length]))), $();
  }
  function $() {
    c(i, "click", H(s, zi, D)), c(i, "keydown", H(s, Hi, D)), r([Ne, Wi, se], S), r(Ti, j), h && r(Dt, N);
  }
  function k() {
    E = !0, o.destroy(), $t(i, fr), yt(i, Wn), I(i, "style", m), I(i, at, y || "");
  }
  function j() {
    var M = e.splides.map(function(w) {
      var O = w.splide.Components.Slides.getAt(t);
      return O ? O.slide.id : "";
    }).join(" ");
    I(i, at, xn(v.slideX, (g ? n : t) + 1)), I(i, Le, M), I(i, wt, p ? "button" : ""), p && yt(i, Ae);
  }
  function N() {
    E || S();
  }
  function S() {
    if (!E) {
      var M = e.index;
      A(), x(), _t(i, Zi, t === M - 1), _t(i, Yi, t === M + 1);
    }
  }
  function A() {
    var M = T();
    M !== ui(i, Gt) && (_t(i, Gt, M), I(i, Vi, f && M || ""), s(M ? Ho : Wo, D));
  }
  function x() {
    var M = V(), w = !M && (!T() || g);
    if (e.state.is([re, Ce]) || I(i, Xi, w || ""), I(zn(i, u.focusableNodes || ""), Yt, w ? -1 : ""), p && I(i, Yt, w ? -1 : 0), M !== ui(i, Cn) && (_t(i, Cn, M), s(M ? Fo : Go, D)), !M && document.activeElement === i) {
      var O = l.Slides.getAt(e.index);
      O && Mi(O.slide);
    }
  }
  function z(M, w, O) {
    ut(O && L || i, M, w);
  }
  function T() {
    var M = e.index;
    return M === t || u.cloneStatus && M === n;
  }
  function V() {
    if (e.is(De))
      return T();
    var M = lt(l.Elements.track), w = lt(i), O = b("left", !0), U = b("right", !0);
    return Ge(M[O]) <= we(w[O]) && Ge(w[U]) <= we(M[U]);
  }
  function F(M, w) {
    var O = ot(M - t);
    return !g && (u.rewind || e.is(le)) && (O = Lt(O, e.length - O)), O <= w;
  }
  var D = { index: t, slideIndex: n, slide: i, container: L, isClone: g, mount: R, destroy: k, update: S, style: z, isWithin: F };
  return D;
}
function _r(e, t, n) {
  var i = G(e), o = i.on, r = i.emit, s = i.bind, c = t.Elements, l = c.slides, a = c.list, u = [];
  function f() {
    h(), o(J, v), o(J, h);
  }
  function h() {
    l.forEach(function(S, A) {
      p(S, A, -1);
    });
  }
  function v() {
    E(function(S) {
      S.destroy();
    }), Ct(u);
  }
  function d() {
    E(function(S) {
      S.update();
    });
  }
  function p(S, A, x) {
    var z = br(e, A, x, S);
    z.mount(), u.push(z), u.sort(function(T, V) {
      return T.index - V.index;
    });
  }
  function b(S) {
    return S ? R(function(A) {
      return !A.isClone;
    }) : u;
  }
  function m(S) {
    var A = t.Controller, x = A.toIndex(S), z = A.hasFocus() ? 1 : n.perPage;
    return R(function(T) {
      return je(T.index, x, x + z - 1);
    });
  }
  function y(S) {
    return R(S)[0];
  }
  function g(S, A) {
    ct(S, function(x) {
      if (Nt(x) && (x = Ni(x)), ki(x)) {
        var z = l[A];
        z ? Rn(x, z) : ke(a, x), gt(x, n.classes.slide), k(x, H(r, Se));
      }
    }), r(J);
  }
  function L(S) {
    Ft(R(S).map(function(A) {
      return A.slide;
    })), r(J);
  }
  function E(S, A) {
    b(A).forEach(S);
  }
  function R(S) {
    return u.filter(Pi(S) ? S : function(A) {
      return Nt(S) ? me(A.slide, S) : Dn(Pe(S), A.index);
    });
  }
  function $(S, A, x) {
    E(function(z) {
      z.style(S, A, x);
    });
  }
  function k(S, A) {
    var x = zn(S, "img"), z = x.length;
    z ? x.forEach(function(T) {
      s(T, "load error", function() {
        --z || A();
      });
    }) : A();
  }
  function j(S) {
    return S ? l.length : u.length;
  }
  function N() {
    return u.length > n.perPage;
  }
  return { mount: f, destroy: v, update: d, register: p, get: b, getIn: m, getAt: y, add: g, remove: L, forEach: E, filter: R, style: $, getLength: j, isEnough: N };
}
function $r(e, t, n) {
  var i = G(e), o = i.on, r = i.bind, s = i.emit, c = t.Slides, l = t.Direction.resolve, a = t.Elements, u = a.root, f = a.track, h = a.list, v = c.getAt, d = c.style, p, b, m;
  function y() {
    g(), r(window, "resize load", nr(H(s, Se))), o([rt, J], g), o(Se, L);
  }
  function g() {
    p = n.direction === nn, ut(u, "maxWidth", Ut(n.width)), ut(f, l("paddingLeft"), E(!1)), ut(f, l("paddingRight"), E(!0)), L(!0);
  }
  function L(D) {
    var M = lt(u);
    (D || b.width !== M.width || b.height !== M.height) && (ut(f, "height", R()), d(l("marginRight"), Ut(n.gap)), d("width", k()), d("height", j(), !0), b = M, s(jn), m !== (m = F()) && (_t(u, eo, m), s(Ko, m)));
  }
  function E(D) {
    var M = n.padding, w = l(D ? "right" : "left");
    return M && Ut(M[w] || (ye(M) ? 0 : M)) || "0px";
  }
  function R() {
    var D = "";
    return p && (D = $(), ue(D, "height or heightRatio is missing."), D = "calc(" + D + " - " + E(!1) + " - " + E(!0) + ")"), D;
  }
  function $() {
    return Ut(n.height || lt(h).width * n.heightRatio);
  }
  function k() {
    return n.autoWidth ? null : Ut(n.fixedWidth) || (p ? "" : N());
  }
  function j() {
    return Ut(n.fixedHeight) || (p ? n.autoHeight ? null : N() : $());
  }
  function N() {
    var D = Ut(n.gap);
    return "calc((100%" + (D && " + " + D) + ")/" + (n.perPage || 1) + (D && " - " + D) + ")";
  }
  function S() {
    return lt(h)[l("width")];
  }
  function A(D, M) {
    var w = v(D || 0);
    return w ? lt(w.slide)[l("width")] + (M ? 0 : T()) : 0;
  }
  function x(D, M) {
    var w = v(D);
    if (w) {
      var O = lt(w.slide)[l("right")], U = lt(h)[l("left")];
      return ot(O - U) + (M ? 0 : T());
    }
    return 0;
  }
  function z(D) {
    return x(e.length - 1) - x(0) + A(0, D);
  }
  function T() {
    var D = v(0);
    return D && parseFloat(ut(D.slide, l("marginRight"))) || 0;
  }
  function V(D) {
    return parseFloat(ut(f, l("padding" + (D ? "Right" : "Left")))) || 0;
  }
  function F() {
    return e.is(De) || z(!0) > S();
  }
  return { mount: y, resize: L, listSize: S, slideSize: A, sliderSize: z, totalSize: x, getPadding: V, isOverflow: F };
}
var wr = 2;
function Sr(e, t, n) {
  var i = G(e), o = i.on, r = t.Elements, s = t.Slides, c = t.Direction.resolve, l = [], a;
  function u() {
    o(J, f), o([rt, Se], v), (a = b()) && (d(a), t.Layout.resize(!0));
  }
  function f() {
    h(), u();
  }
  function h() {
    Ft(l), Ct(l), i.destroy();
  }
  function v() {
    var m = b();
    a !== m && (a < m || !m) && i.emit(J);
  }
  function d(m) {
    var y = s.get().slice(), g = y.length;
    if (g) {
      for (; y.length < m; )
        Te(y, y);
      Te(y.slice(-m), y.slice(0, m)).forEach(function(L, E) {
        var R = E < m, $ = p(L.slide, E);
        R ? Rn($, y[0].slide) : ke(r.list, $), Te(l, $), s.register($, E - m + (R ? 0 : g), L.index);
      });
    }
  }
  function p(m, y) {
    var g = m.cloneNode(!0);
    return gt(g, n.classes.clone), g.id = e.root.id + "-clone" + Tn(y + 1), g;
  }
  function b() {
    var m = n.clones;
    if (!e.is(le))
      m = 0;
    else if (Ee(m)) {
      var y = n[c("fixedWidth")] && t.Layout.slideSize(0), g = y && we(lt(r.track)[c("width")] / y);
      m = g || n[c("autoWidth")] && e.length || n.perPage * wr;
    }
    return m;
  }
  return { mount: u, destroy: h };
}
function Ar(e, t, n) {
  var i = G(e), o = i.on, r = i.emit, s = e.state.set, c = t.Layout, l = c.slideSize, a = c.getPadding, u = c.totalSize, f = c.listSize, h = c.sliderSize, v = t.Direction, d = v.resolve, p = v.orient, b = t.Elements, m = b.list, y = b.track, g;
  function L() {
    g = t.Transition, o([Xt, jn, rt, J], E);
  }
  function E() {
    t.Controller.isBusy() || (t.Scroll.cancel(), $(e.index), t.Slides.update());
  }
  function R(w, O, U, Y) {
    w !== O && D(w > U) && (S(), k(N(z(), w > U), !0)), s(re), r(Dt, O, U, w), g.start(O, function() {
      s(ne), r(Ne, O, U, w), Y && Y();
    });
  }
  function $(w) {
    k(x(w, !0));
  }
  function k(w, O) {
    if (!e.is(De)) {
      var U = O ? w : j(w);
      ut(m, "transform", "translate" + d("X") + "(" + U + "px)"), w !== U && r(Wi);
    }
  }
  function j(w) {
    if (e.is(le)) {
      var O = A(w), U = O > t.Controller.getEnd(), Y = O < 0;
      (Y || U) && (w = N(w, U));
    }
    return w;
  }
  function N(w, O) {
    var U = w - F(O), Y = h();
    return w -= p(Y * (we(ot(U) / Y) || 1)) * (O ? 1 : -1), w;
  }
  function S() {
    k(z(), !0), g.cancel();
  }
  function A(w) {
    for (var O = t.Slides.get(), U = 0, Y = 1 / 0, Q = 0; Q < O.length; Q++) {
      var kt = O[Q].index, _ = ot(x(kt, !0) - w);
      if (_ <= Y)
        Y = _, U = kt;
      else
        break;
    }
    return U;
  }
  function x(w, O) {
    var U = p(u(w - 1) - V(w));
    return O ? T(U) : U;
  }
  function z() {
    var w = d("left");
    return lt(m)[w] - lt(y)[w] + p(a(!1));
  }
  function T(w) {
    return n.trimSpace && e.is(ie) && (w = Kt(w, 0, p(h(!0) - f()))), w;
  }
  function V(w) {
    var O = n.focus;
    return O === "center" ? (f() - l(w, !0)) / 2 : +O * l(w) || 0;
  }
  function F(w) {
    return x(w ? t.Controller.getEnd() : 0, !!n.trimSpace);
  }
  function D(w) {
    var O = p(N(z(), w));
    return w ? O >= 0 : O <= m[d("scrollWidth")] - lt(y)[d("width")];
  }
  function M(w, O) {
    O = Ee(O) ? z() : O;
    var U = w !== !0 && p(O) < p(F(!1)), Y = w !== !1 && p(O) > p(F(!0));
    return U || Y;
  }
  return { mount: L, move: R, jump: $, translate: k, shift: N, cancel: S, toIndex: A, toPosition: x, getPosition: z, getLimit: F, exceededLimit: M, reposition: E };
}
function xr(e, t, n) {
  var i = G(e), o = i.on, r = i.emit, s = t.Move, c = s.getPosition, l = s.getLimit, a = s.toPosition, u = t.Slides, f = u.isEnough, h = u.getLength, v = n.omitEnd, d = e.is(le), p = e.is(ie), b = H(z, !1), m = H(z, !0), y = n.start || 0, g, L = y, E, R, $;
  function k() {
    j(), o([rt, J, Ve], j), o(jn, N);
  }
  function j() {
    E = h(!0), R = n.perMove, $ = n.perPage, g = D();
    var _ = Kt(y, 0, v ? g : E - 1);
    _ !== y && (y = _, s.reposition());
  }
  function N() {
    g !== D() && r(Ve);
  }
  function S(_, B, it) {
    if (!kt()) {
      var X = x(_), et = F(X);
      et > -1 && (B || et !== y) && (U(et), s.move(X, et, L, it));
    }
  }
  function A(_, B, it, X) {
    t.Scroll.scroll(_, B, it, function() {
      var et = F(s.toIndex(c()));
      U(v ? Lt(et, g) : et), X && X();
    });
  }
  function x(_) {
    var B = y;
    if (Nt(_)) {
      var it = _.match(/([+\-<>])(\d+)?/) || [], X = it[1], et = it[2];
      X === "+" || X === "-" ? B = T(y + +("" + X + (+et || 1)), y) : X === ">" ? B = et ? M(+et) : b(!0) : X === "<" && (B = m(!0));
    } else
      B = d ? _ : Kt(_, 0, g);
    return B;
  }
  function z(_, B) {
    var it = R || (Q() ? 1 : $), X = T(y + it * (_ ? -1 : 1), y, !(R || Q()));
    return X === -1 && p && !Di(c(), l(!_), 1) ? _ ? 0 : g : B ? X : F(X);
  }
  function T(_, B, it) {
    if (f() || Q()) {
      var X = V(_);
      X !== _ && (B = _, _ = X, it = !1), _ < 0 || _ > g ? !R && (je(0, _, B, !0) || je(g, B, _, !0)) ? _ = M(w(_)) : d ? _ = it ? _ < 0 ? -(E % $ || $) : E : _ : n.rewind ? _ = _ < 0 ? g : 0 : _ = -1 : it && _ !== B && (_ = M(w(B) + (_ < B ? -1 : 1)));
    } else
      _ = -1;
    return _;
  }
  function V(_) {
    if (p && n.trimSpace === "move" && _ !== y)
      for (var B = c(); B === a(_, !0) && je(_, 0, e.length - 1, !n.rewind); )
        _ < y ? --_ : ++_;
    return _;
  }
  function F(_) {
    return d ? (_ + E) % E || 0 : _;
  }
  function D() {
    for (var _ = E - (Q() || d && R ? 1 : $); v && _-- > 0; )
      if (a(E - 1, !0) !== a(_, !0)) {
        _++;
        break;
      }
    return Kt(_, 0, E - 1);
  }
  function M(_) {
    return Kt(Q() ? _ : $ * _, 0, g);
  }
  function w(_) {
    return Q() ? Lt(_, g) : Ge((_ >= g ? E - 1 : _) / $);
  }
  function O(_) {
    var B = s.toIndex(_);
    return p ? Kt(B, 0, g) : B;
  }
  function U(_) {
    _ !== y && (L = y, y = _);
  }
  function Y(_) {
    return _ ? L : y;
  }
  function Q() {
    return !Ee(n.focus) || n.isNavigation;
  }
  function kt() {
    return e.state.is([re, Ce]) && !!n.waitForTransition;
  }
  return { mount: k, go: S, scroll: A, getNext: b, getPrev: m, getAdjacent: z, getEnd: D, setIndex: U, getIndex: Y, toIndex: M, toPage: w, toDest: O, hasFocus: Q, isBusy: kt };
}
var Cr = "http://www.w3.org/2000/svg", Er = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z", Re = 40;
function Pr(e, t, n) {
  var i = G(e), o = i.on, r = i.bind, s = i.emit, c = n.classes, l = n.i18n, a = t.Elements, u = t.Controller, f = a.arrows, h = a.track, v = f, d = a.prev, p = a.next, b, m, y = {};
  function g() {
    E(), o(rt, L);
  }
  function L() {
    R(), g();
  }
  function E() {
    var A = n.arrows;
    A && !(d && p) && j(), d && p && (_e(y, { prev: d, next: p }), $e(v, A ? "" : "none"), gt(v, m = Fn + "--" + n.direction), A && ($(), S(), I([d, p], Le, h.id), s(Jo, d, p)));
  }
  function R() {
    i.destroy(), $t(v, m), b ? (Ft(f ? [d, p] : v), d = p = null) : yt([d, p], Wn);
  }
  function $() {
    o([Xt, Ne, J, se, Ve], S), r(p, "click", H(k, ">")), r(d, "click", H(k, "<"));
  }
  function k(A) {
    u.go(A, !0);
  }
  function j() {
    v = f || Zt("div", c.arrows), d = N(!0), p = N(!1), b = !0, ke(v, [d, p]), !f && Rn(v, h);
  }
  function N(A) {
    var x = '<button class="' + c.arrow + " " + (A ? c.prev : c.next) + '" type="button"><svg xmlns="' + Cr + '" viewBox="0 0 ' + Re + " " + Re + '" width="' + Re + '" height="' + Re + '" focusable="false"><path d="' + (n.arrowPath || Er) + '" />';
    return Ni(x);
  }
  function S() {
    if (d && p) {
      var A = e.index, x = u.getPrev(), z = u.getNext(), T = x > -1 && A < x ? l.last : l.prev, V = z > -1 && A > z ? l.first : l.next;
      d.disabled = x < 0, p.disabled = z < 0, I(d, at, T), I(p, at, V), s(Qo, d, p, x, z);
    }
  }
  return { arrows: y, mount: g, destroy: R, update: S };
}
var kr = In + "-interval";
function Or(e, t, n) {
  var i = G(e), o = i.on, r = i.bind, s = i.emit, c = Ze(n.interval, e.go.bind(e, ">"), $), l = c.isPaused, a = t.Elements, u = t.Elements, f = u.root, h = u.toggle, v = n.autoplay, d, p, b = v === "pause";
  function m() {
    v && (y(), h && I(h, Le, a.track.id), b || g(), R());
  }
  function y() {
    n.pauseOnHover && r(f, "mouseenter mouseleave", function(j) {
      d = j.type === "mouseenter", E();
    }), n.pauseOnFocus && r(f, "focusin focusout", function(j) {
      p = j.type === "focusin", E();
    }), h && r(h, "click", function() {
      b ? g() : L(!0);
    }), o([Dt, Un, J], c.rewind), o(Dt, k);
  }
  function g() {
    l() && t.Slides.isEnough() && (c.start(!n.resetProgress), p = d = b = !1, R(), s(ji));
  }
  function L(j) {
    j === void 0 && (j = !0), b = !!j, R(), l() || (c.pause(), s(Ui));
  }
  function E() {
    b || (d || p ? L(!1) : g());
  }
  function R() {
    h && (_t(h, Gt, !b), I(h, at, n.i18n[b ? "play" : "pause"]));
  }
  function $(j) {
    var N = a.bar;
    N && ut(N, "width", j * 100 + "%"), s(tr, j);
  }
  function k(j) {
    var N = t.Slides.getAt(j);
    c.set(N && +dt(N.slide, kr) || n.interval);
  }
  return { mount: m, destroy: c.cancel, play: g, pause: L, isPaused: l };
}
function Mr(e, t, n) {
  var i = G(e), o = i.on;
  function r() {
    n.cover && (o(Bi, H(c, !0)), o([Xt, rt, J], H(s, !0)));
  }
  function s(l) {
    t.Slides.forEach(function(a) {
      var u = Oe(a.container || a.slide, "img");
      u && u.src && c(l, u, a);
    });
  }
  function c(l, a, u) {
    u.style("background", l ? 'center/cover no-repeat url("' + a.src + '")' : "", !0), $e(a, l ? "none" : "");
  }
  return { mount: r, destroy: H(s, !1) };
}
var Nr = 10, Lr = 600, Dr = 0.6, Rr = 1.5, zr = 800;
function Ir(e, t, n) {
  var i = G(e), o = i.on, r = i.emit, s = e.state.set, c = t.Move, l = c.getPosition, a = c.getLimit, u = c.exceededLimit, f = c.translate, h = e.is(ie), v, d, p = 1;
  function b() {
    o(Dt, L), o([rt, J], E);
  }
  function m($, k, j, N, S) {
    var A = l();
    if (L(), j && (!h || !u())) {
      var x = t.Layout.sliderSize(), z = An($) * x * Ge(ot($) / x) || 0;
      $ = c.toPosition(t.Controller.toDest($ % x)) + z;
    }
    var T = Di(A, $, 1);
    p = 1, k = T ? 0 : k || Fe(ot($ - A) / Rr, zr), d = N, v = Ze(k, y, H(g, A, $, S), 1), s(Ce), r(Un), v.start();
  }
  function y() {
    s(ne), d && d(), r(se);
  }
  function g($, k, j, N) {
    var S = l(), A = $ + (k - $) * R(N), x = (A - S) * p;
    f(S + x), h && !j && u() && (p *= Dr, ot(x) < Nr && m(a(u(!0)), Lr, !1, d, !0));
  }
  function L() {
    v && v.cancel();
  }
  function E() {
    v && !v.isPaused() && (L(), y());
  }
  function R($) {
    var k = n.easingFunc;
    return k ? k($) : 1 - Math.pow(1 - $, 4);
  }
  return { mount: b, destroy: L, scroll: m, cancel: E };
}
var Jt = { passive: !1, capture: !0 };
function Tr(e, t, n) {
  var i = G(e), o = i.on, r = i.emit, s = i.bind, c = i.unbind, l = e.state, a = t.Move, u = t.Scroll, f = t.Controller, h = t.Elements.track, v = t.Media.reduce, d = t.Direction, p = d.resolve, b = d.orient, m = a.getPosition, y = a.exceededLimit, g, L, E, R, $, k = !1, j, N, S;
  function A() {
    s(h, gn, wn, Jt), s(h, yn, wn, Jt), s(h, no, z, Jt), s(h, "click", F, { capture: !0 }), s(h, "dragstart", bt), o([Xt, rt], x);
  }
  function x() {
    var C = n.drag;
    Xn(!C), R = C === "free";
  }
  function z(C) {
    if (j = !1, !N) {
      var W = et(C);
      X(C.target) && (W || !C.button) && (f.isBusy() ? bt(C, !0) : (S = W ? h : window, $ = l.is([re, Ce]), E = null, s(S, gn, T, Jt), s(S, yn, V, Jt), a.cancel(), u.cancel(), D(C)));
    }
  }
  function T(C) {
    if (l.is(Ie) || (l.set(Ie), r(Vo)), C.cancelable)
      if ($) {
        a.translate(g + it(Q(C)));
        var W = kt(C) > bi, Tt = k !== (k = y());
        (W || Tt) && D(C), j = !0, r(Xo), bt(C);
      } else
        O(C) && ($ = w(C), bt(C));
  }
  function V(C) {
    l.is(Ie) && (l.set(ne), r(qo)), $ && (M(C), bt(C)), c(S, gn, T), c(S, yn, V), $ = !1;
  }
  function F(C) {
    !N && j && bt(C, !0);
  }
  function D(C) {
    E = L, L = C, g = m();
  }
  function M(C) {
    var W = U(C), Tt = Y(W), ae = n.rewind && n.rewindByDrag;
    v(!1), R ? f.scroll(Tt, 0, n.snap) : e.is(De) ? f.go(b(An(W)) < 0 ? ae ? "<" : "-" : ae ? ">" : "+") : e.is(ie) && k && ae ? f.go(y(!0) ? ">" : "<") : f.go(f.toDest(Tt), !0), v(!0);
  }
  function w(C) {
    var W = n.dragMinThreshold, Tt = ye(W), ae = Tt && W.mouse || 0, oo = (Tt ? W.touch : +W) || 10;
    return ot(Q(C)) > (et(C) ? oo : ae);
  }
  function O(C) {
    return ot(Q(C)) > ot(Q(C, !0));
  }
  function U(C) {
    if (e.is(le) || !k) {
      var W = kt(C);
      if (W && W < bi)
        return Q(C) / W;
    }
    return 0;
  }
  function Y(C) {
    return m() + An(C) * Lt(ot(C) * (n.flickPower || 600), R ? 1 / 0 : t.Layout.listSize() * (n.flickMaxPages || 1));
  }
  function Q(C, W) {
    return B(C, W) - B(_(C), W);
  }
  function kt(C) {
    return Sn(C) - Sn(_(C));
  }
  function _(C) {
    return L === C && E || L;
  }
  function B(C, W) {
    return (et(C) ? C.changedTouches[0] : C)["page" + p(W ? "Y" : "X")];
  }
  function it(C) {
    return C / (k && e.is(ie) ? yr : 1);
  }
  function X(C) {
    var W = n.noDrag;
    return !me(C, "." + Qi + ", ." + rn) && (!W || !me(C, W));
  }
  function et(C) {
    return typeof TouchEvent < "u" && C instanceof TouchEvent;
  }
  function io() {
    return $;
  }
  function Xn(C) {
    N = C;
  }
  return { mount: A, disable: Xn, isDragging: io };
}
var jr = { Spacebar: " ", Right: en, Left: tn, Up: Fi, Down: Gi };
function Gn(e) {
  return e = Nt(e) ? e : e.key, jr[e] || e;
}
var _i = "keydown";
function Ur(e, t, n) {
  var i = G(e), o = i.on, r = i.bind, s = i.unbind, c = e.root, l = t.Direction.resolve, a, u;
  function f() {
    h(), o(rt, v), o(rt, h), o(Dt, p);
  }
  function h() {
    var m = n.keyboard;
    m && (a = m === "global" ? window : c, r(a, _i, b));
  }
  function v() {
    s(a, _i);
  }
  function d(m) {
    u = m;
  }
  function p() {
    var m = u;
    u = !0, Ei(function() {
      u = m;
    });
  }
  function b(m) {
    if (!u) {
      var y = Gn(m);
      y === l(tn) ? e.go("<") : y === l(en) && e.go(">");
    }
  }
  return { mount: f, destroy: v, disable: d };
}
var de = In + "-lazy", Ue = de + "-srcset", Br = "[" + de + "], [" + Ue + "]";
function Hr(e, t, n) {
  var i = G(e), o = i.on, r = i.off, s = i.bind, c = i.emit, l = n.lazyLoad === "sequential", a = [Ne, se], u = [];
  function f() {
    n.lazyLoad && (h(), o(J, h));
  }
  function h() {
    Ct(u), v(), l ? m() : (r(a), o(a, d), d());
  }
  function v() {
    t.Slides.forEach(function(y) {
      zn(y.slide, Br).forEach(function(g) {
        var L = dt(g, de), E = dt(g, Ue);
        if (L !== g.src || E !== g.srcset) {
          var R = n.classes.spinner, $ = g.parentElement, k = Oe($, "." + R) || Zt("span", R, $);
          u.push([g, y, k]), g.src || $e(g, "none");
        }
      });
    });
  }
  function d() {
    u = u.filter(function(y) {
      var g = n.perPage * ((n.preloadPages || 1) + 1) - 1;
      return y[1].isWithin(e.index, g) ? p(y) : !0;
    }), u.length || r(a);
  }
  function p(y) {
    var g = y[0];
    gt(y[1].slide, En), s(g, "load error", H(b, y)), I(g, "src", dt(g, de)), I(g, "srcset", dt(g, Ue)), yt(g, de), yt(g, Ue);
  }
  function b(y, g) {
    var L = y[0], E = y[1];
    $t(E.slide, En), g.type !== "error" && (Ft(y[2]), $e(L, ""), c(Bi, L, E), c(Se)), l && m();
  }
  function m() {
    u.length && p(u.shift());
  }
  return { mount: f, destroy: H(Ct, u), check: d };
}
function Wr(e, t, n) {
  var i = G(e), o = i.on, r = i.emit, s = i.bind, c = t.Slides, l = t.Elements, a = t.Controller, u = a.hasFocus, f = a.getIndex, h = a.go, v = t.Direction.resolve, d = l.pagination, p = [], b, m;
  function y() {
    g(), o([rt, J, Ve], y);
    var N = n.pagination;
    d && $e(d, N ? "" : "none"), N && (o([Dt, Un, se], j), L(), j(), r(Zo, { list: b, items: p }, k(e.index)));
  }
  function g() {
    b && (Ft(d ? zt(b.children) : b), $t(b, m), Ct(p), b = null), i.destroy();
  }
  function L() {
    var N = e.length, S = n.classes, A = n.i18n, x = n.perPage, z = u() ? a.getEnd() + 1 : we(N / x);
    b = d || Zt("ul", S.pagination, l.track.parentElement), gt(b, m = sn + "--" + $()), I(b, wt, "tablist"), I(b, at, A.select), I(b, Hn, $() === nn ? "vertical" : "");
    for (var T = 0; T < z; T++) {
      var V = Zt("li", null, b), F = Zt("button", { class: S.page, type: "button" }, V), D = c.getIn(T).map(function(w) {
        return w.slide.id;
      }), M = !u() && x > 1 ? A.pageX : A.slideX;
      s(F, "click", H(E, T)), n.paginationKeyboard && s(F, "keydown", H(R, T)), I(V, wt, "presentation"), I(F, wt, "tab"), I(F, Le, D.join(" ")), I(F, at, xn(M, T + 1)), I(F, Yt, -1), p.push({ li: V, button: F, page: T });
    }
  }
  function E(N) {
    h(">" + N, !0);
  }
  function R(N, S) {
    var A = p.length, x = Gn(S), z = $(), T = -1;
    x === v(en, !1, z) ? T = ++N % A : x === v(tn, !1, z) ? T = (--N + A) % A : x === "Home" ? T = 0 : x === "End" && (T = A - 1);
    var V = p[T];
    V && (Mi(V.button), h(">" + T), bt(S, !0));
  }
  function $() {
    return n.paginationDirection || n.direction;
  }
  function k(N) {
    return p[a.toPage(N)];
  }
  function j() {
    var N = k(f(!0)), S = k(f());
    if (N) {
      var A = N.button;
      $t(A, Gt), yt(A, fi), I(A, Yt, -1);
    }
    if (S) {
      var x = S.button;
      gt(x, Gt), I(x, fi, !0), I(x, Yt, "");
    }
    r(Yo, { list: b, items: p }, N, S);
  }
  return { items: p, mount: y, destroy: g, getAt: k, update: j };
}
var Fr = [" ", "Enter"];
function Gr(e, t, n) {
  var i = n.isNavigation, o = n.slideFocus, r = [];
  function s() {
    e.splides.forEach(function(d) {
      d.isParent || (a(e, d.splide), a(d.splide, e));
    }), i && u();
  }
  function c() {
    r.forEach(function(d) {
      d.destroy();
    }), Ct(r);
  }
  function l() {
    c(), s();
  }
  function a(d, p) {
    var b = G(d);
    b.on(Dt, function(m, y, g) {
      p.go(p.is(le) ? g : m);
    }), r.push(b);
  }
  function u() {
    var d = G(e), p = d.on;
    p(zi, h), p(Hi, v), p([Xt, rt], f), r.push(d), d.emit(Ti, e.splides);
  }
  function f() {
    I(t.Elements.list, Hn, n.direction === nn ? "vertical" : "");
  }
  function h(d) {
    e.go(d.index);
  }
  function v(d, p) {
    Dn(Fr, Gn(p)) && (h(d), bt(p));
  }
  return { setup: H(t.Media.set, { slideFocus: Ee(o) ? i : o }, !0), mount: s, destroy: c, remount: l };
}
function Vr(e, t, n) {
  var i = G(e), o = i.bind, r = 0;
  function s() {
    n.wheel && o(t.Elements.track, "wheel", c, Jt);
  }
  function c(a) {
    if (a.cancelable) {
      var u = a.deltaY, f = u < 0, h = Sn(a), v = n.wheelMinThreshold || 0, d = n.wheelSleep || 0;
      ot(u) > v && h - r > d && (e.go(f ? "<" : ">"), r = h), l(f) && bt(a);
    }
  }
  function l(a) {
    return !n.releaseWheel || e.state.is(re) || t.Controller.getAdjacent(a) !== -1;
  }
  return { mount: s };
}
var Xr = 90;
function qr(e, t, n) {
  var i = G(e), o = i.on, r = t.Elements.track, s = n.live && !n.isNavigation, c = Zt("span", hr), l = Ze(Xr, H(u, !1));
  function a() {
    s && (h(!t.Autoplay.isPaused()), I(r, yi, !0), c.textContent = "…", o(ji, H(h, !0)), o(Ui, H(h, !1)), o([Ne, se], H(u, !0)));
  }
  function u(v) {
    I(r, gi, v), v ? (ke(r, c), l.start()) : (Ft(c), l.cancel());
  }
  function f() {
    yt(r, [vi, yi, gi]), Ft(c);
  }
  function h(v) {
    s && I(r, vi, v ? "off" : "polite");
  }
  return { mount: a, disable: h, destroy: f };
}
var Kr = Object.freeze({ __proto__: null, Media: ir, Direction: or, Elements: mr, Slides: _r, Layout: $r, Clones: Sr, Move: Ar, Controller: xr, Arrows: Pr, Autoplay: Or, Cover: Mr, Scroll: Ir, Drag: Tr, Keyboard: Ur, LazyLoad: Hr, Pagination: Wr, Sync: Gr, Wheel: Vr, Live: qr }), Jr = { prev: "Previous slide", next: "Next slide", first: "Go to first slide", last: "Go to last slide", slideX: "Go to slide %s", pageX: "Go to page %s", play: "Start autoplay", pause: "Pause autoplay", carousel: "carousel", slide: "slide", select: "Select a slide to show", slideLabel: "%s of %s" }, Qr = { type: "slide", role: "region", speed: 400, perPage: 1, cloneStatus: !0, arrows: !0, pagination: !0, paginationKeyboard: !0, interval: 5e3, pauseOnHover: !0, pauseOnFocus: !0, resetProgress: !0, easing: "cubic-bezier(0.25, 1, 0.5, 1)", drag: !0, direction: "ltr", trimSpace: !0, focusableNodes: "a, button, textarea, input, select, iframe", live: !0, classes: vr, i18n: Jr, reducedMotion: { speed: 0, rewindSpeed: 0, autoplay: "pause" } };
function Zr(e, t, n) {
  var i = t.Slides;
  function o() {
    G(e).on([Xt, J], r);
  }
  function r() {
    i.forEach(function(c) {
      c.style("transform", "translateX(-" + 100 * c.index + "%)");
    });
  }
  function s(c, l) {
    i.style("transition", "opacity " + n.speed + "ms " + n.easing), Ei(l);
  }
  return { mount: o, start: s, cancel: wn };
}
function Yr(e, t, n) {
  var i = t.Move, o = t.Controller, r = t.Scroll, s = t.Elements.list, c = H(ut, s, "transition"), l;
  function a() {
    G(e).bind(s, "transitionend", function(v) {
      v.target === s && l && (f(), l());
    });
  }
  function u(v, d) {
    var p = i.toPosition(v, !0), b = i.getPosition(), m = h(v);
    ot(p - b) >= 1 && m >= 1 ? n.useScroll ? r.scroll(p, m, !1, d) : (c("transform " + m + "ms " + n.easing), i.translate(p, !0), l = d) : (i.jump(v), d());
  }
  function f() {
    c(""), r.cancel();
  }
  function h(v) {
    var d = n.rewindSpeed;
    if (e.is(ie) && d) {
      var p = o.getIndex(!0), b = o.getEnd();
      if (p === 0 && v >= b || p >= b && v === 0)
        return d;
    }
    return n.speed;
  }
  return { mount: a, start: u, cancel: f };
}
var ts = function() {
  function e(n, i) {
    this.event = G(), this.Components = {}, this.state = er(Qt), this.splides = [], this._o = {}, this._E = {};
    var o = Nt(n) ? Li(document, n) : n;
    ue(o, o + " is invalid."), this.root = o, i = Mt({ label: dt(o, at) || "", labelledby: dt(o, Bn) || "" }, Qr, e.defaults, i || {});
    try {
      Mt(i, JSON.parse(dt(o, In)));
    } catch {
      ue(!1, "Invalid JSON");
    }
    this._o = Object.create(Mt({}, i));
  }
  var t = e.prototype;
  return t.mount = function(n, i) {
    var o = this, r = this.state, s = this.Components;
    ue(r.is([Qt, We]), "Already mounted!"), r.set(Qt), this._C = s, this._T = i || this._T || (this.is(De) ? Zr : Yr), this._E = n || this._E;
    var c = _e({}, Kr, this._E, { Transition: this._T });
    return Ht(c, function(l, a) {
      var u = l(o, s, o._o);
      s[a] = u, u.setup && u.setup();
    }), Ht(s, function(l) {
      l.mount && l.mount();
    }), this.emit(Xt), gt(this.root, pr), r.set(ne), this.emit(hi), this;
  }, t.sync = function(n) {
    return this.splides.push({ splide: n }), n.splides.push({ splide: this, isParent: !0 }), this.state.is(ne) && (this._C.Sync.remount(), n.Components.Sync.remount()), this;
  }, t.go = function(n) {
    return this._C.Controller.go(n), this;
  }, t.on = function(n, i) {
    return this.event.on(n, i), this;
  }, t.off = function(n) {
    return this.event.off(n), this;
  }, t.emit = function(n) {
    var i;
    return (i = this.event).emit.apply(i, [n].concat(zt(arguments, 1))), this;
  }, t.add = function(n, i) {
    return this._C.Slides.add(n, i), this;
  }, t.remove = function(n) {
    return this._C.Slides.remove(n), this;
  }, t.is = function(n) {
    return this._o.type === n;
  }, t.refresh = function() {
    return this.emit(J), this;
  }, t.destroy = function(n) {
    n === void 0 && (n = !0);
    var i = this.event, o = this.state;
    return o.is(Qt) ? G(this).on(hi, this.destroy.bind(this, n)) : (Ht(this._C, function(r) {
      r.destroy && r.destroy(n);
    }, !0), i.emit(Ii), i.destroy(), n && Ct(this.splides), o.set(We)), this;
  }, To(e, [{ key: "options", get: function() {
    return this._o;
  }, set: function(n) {
    this._C.Media.set(n, !0, !0);
  } }, { key: "length", get: function() {
    return this._C.Slides.getLength(!0);
  } }, { key: "index", get: function() {
    return this._C.Controller.getIndex();
  } }]), e;
}(), Vn = ts;
Vn.defaults = {};
Vn.STATES = Uo;
var es = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, tt = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ns(t, n) : t, r = e.length - 1, s; r >= 0; r--)
    (s = e[r]) && (o = (i ? s(t, n, o) : s(o)) || o);
  return i && o && es(t, n, o), o;
};
let Z = class extends ht {
  constructor() {
    super(...arguments), this.class = "", this.icon = '<svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>', this.prevIcon = '<svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>', this.isDecoration = !1, this.type = "loop", this.rewind = !1, this.perPage = 3, this.perMove = 1, this.pagination = !1, this.autoplay = !1, this.interval = 5e3, this.lazyLoad = !1, this.initialSlide = 0, this.slides = [], this._splide = null;
  }
  get _interval() {
    return this.interval < 1e3 && this.autoplay ? 1e3 : this.interval;
  }
  firstUpdated() {
    if (this.slides) {
      const e = new Vn(this.querySelector(".splide"), { type: this.type, breakpoints: { 991: { gap: "2rem", perPage: this.perPage > 3 ? 3 : this.perPage }, 640: { gap: "2rem", perPage: this.perPage > 2 ? 2 : this.perPage }, 480: { perPage: 1 } }, perPage: this.perPage, rewind: this.rewind, start: this.initialSlide, perMove: this.perMove, pagination: this.pagination, autoplay: this.autoplay, interval: this._interval, lazyLoad: this.lazyLoad, arrowPath: "M9 6l6 6-6 6", gap: "2rem", width: "90%" }).mount();
      e && (this._splide = e);
    }
  }
  updated(e) {
    this._splide && e && (this._splide.options = { perPage: this.perPage, rewind: this.rewind, start: this.initialSlide, perMove: this.perMove, pagination: this.pagination, autoplay: this.autoplay, interval: this._interval, lazyLoad: this.lazyLoad });
  }
  render() {
    const e = { splide: !0, [this.class]: this.class };
    return K`
      <section
        class=${At(e)}
        ${this.isDecoration ? 'role="group"' : ""}
      >
        <div class="splide__arrows">
          <studs-button
            buttonType="primary"
            icon=${this.icon}
            class="splide__arrow splide__arrow--prev"
          ></studs-button>
        </div>
        <div class="splide__track">
          <ul class="splide__list">
            ${qe(this.slides, (t, n) => K` <li class="splide__slide">
                <div id=${t.id || `slide-${n}`}>
                  <img
                    src=${t.image}
                    alt=${t.alt || "image"}
                    class="image"
                  />
                </div>
              </li>`)}
          </ul>
        </div>
        <div class="splide__arrows">
          <studs-button
            buttonType="primary"
            icon=${this.icon}
            class="splide__arrow splide__arrow--next"
          ></studs-button>
        </div>
      </section>
    `;
  }
  createRenderRoot() {
    return this;
  }
};
tt([P({ type: String })], Z.prototype, "class", 2);
tt([P({ type: String })], Z.prototype, "icon", 2);
tt([P({ type: String })], Z.prototype, "prevIcon", 2);
tt([P({ type: Boolean })], Z.prototype, "isDecoration", 2);
tt([P({ type: String })], Z.prototype, "type", 2);
tt([P({ type: Boolean })], Z.prototype, "rewind", 2);
tt([P({ type: Number })], Z.prototype, "perPage", 2);
tt([P({ type: Number })], Z.prototype, "perMove", 2);
tt([P({ type: Boolean })], Z.prototype, "pagination", 2);
tt([P({ type: Boolean })], Z.prototype, "autoplay", 2);
tt([P({ type: Number })], Z.prototype, "interval", 2);
tt([P({ type: String })], Z.prototype, "lazyLoad", 2);
tt([P({ type: Number })], Z.prototype, "initialSlide", 2);
tt([P({ type: Array })], Z.prototype, "slides", 2);
tt([oe()], Z.prototype, "_splide", 2);
Z = tt([Vt("studs-splide-carousel")], Z);
function is() {
  var e = prompt("Enter text to encrypt:"), t = "";
  if (e != null && e.length)
    for (var n = 0; n < e.length; n++) {
      var i = e == null ? void 0 : e.charCodeAt(n);
      i && (i >= 65 && i <= 90 ? t += String.fromCharCode((i - 65 + 13) % 26 + 65) : i >= 97 && i <= 122 ? t += String.fromCharCode((i - 97 + 13) % 26 + 97) : t += e == null ? void 0 : e.charAt(n));
    }
  return alert("Encrypted string: " + t), t;
}
window.encryptString = is;
