(() => {
  var Ln = Object.defineProperty,
    n = (r, e) => Ln(r, "name", { value: e, configurable: !0 }),
    On = (() => {
      for (var r = new Uint8Array(128), e = 0; e < 64; e++)
        r[e < 26 ? e + 65 : e < 52 ? e + 71 : e < 62 ? e - 4 : e * 4 - 205] = e;
      return (h) => {
        for (
          var u = h.length,
            f = new Uint8Array(
              (((u - (h[u - 1] == "=") - (h[u - 2] == "=")) * 3) / 4) | 0
            ),
            A = 0,
            M = 0;
          A < u;

        ) {
          var D = r[h.charCodeAt(A++)],
            H = r[h.charCodeAt(A++)],
            V = r[h.charCodeAt(A++)],
            Z = r[h.charCodeAt(A++)];
          (f[M++] = (D << 2) | (H >> 4)),
            (f[M++] = (H << 4) | (V >> 2)),
            (f[M++] = (V << 6) | Z);
        }
        return f;
      };
    })();
  function Ue(r) {
    return (r * Math.PI) / 180;
  }
  n(Ue, "deg2rad");
  function St(r) {
    return (r * 180) / Math.PI;
  }
  n(St, "rad2deg");
  function Ye(r, e, h) {
    return e > h ? Ye(r, h, e) : Math.min(Math.max(r, e), h);
  }
  n(Ye, "clamp");
  function Ke(r, e, h) {
    if (typeof r == "number" && typeof e == "number") return r + (e - r) * h;
    if (
      (r instanceof E && e instanceof E) ||
      (r instanceof te && e instanceof te)
    )
      return r.lerp(e, h);
    throw new Error(
      `Bad value for lerp(): ${r}, ${e}. Only number, Vec2 and Color is supported.`
    );
  }
  n(Ke, "lerp");
  function Ze(r, e, h, u, f) {
    return u + ((r - e) / (h - e)) * (f - u);
  }
  n(Ze, "map");
  function Hs(r, e, h, u, f) {
    return Ye(Ze(r, e, h, u, f), u, f);
  }
  n(Hs, "mapc");
  var E = class xe {
    static {
      n(this, "Vec2");
    }
    x = 0;
    y = 0;
    constructor(e = 0, h = e) {
      (this.x = e), (this.y = h);
    }
    static fromAngle(e) {
      let h = Ue(e);
      return new xe(Math.cos(h), Math.sin(h));
    }
    static LEFT = new xe(-1, 0);
    static RIGHT = new xe(1, 0);
    static UP = new xe(0, -1);
    static DOWN = new xe(0, 1);
    clone() {
      return new xe(this.x, this.y);
    }
    add(...e) {
      let h = T(...e);
      return new xe(this.x + h.x, this.y + h.y);
    }
    sub(...e) {
      let h = T(...e);
      return new xe(this.x - h.x, this.y - h.y);
    }
    scale(...e) {
      let h = T(...e);
      return new xe(this.x * h.x, this.y * h.y);
    }
    dist(...e) {
      let h = T(...e);
      return this.sub(h).len();
    }
    sdist(...e) {
      let h = T(...e);
      return this.sub(h).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let e = this.len();
      return e === 0 ? new xe(0) : this.scale(1 / e);
    }
    normal() {
      return new xe(this.y, -this.x);
    }
    reflect(e) {
      return this.sub(e.scale(2 * this.dot(e)));
    }
    project(e) {
      return e.scale(e.dot(this) / e.len());
    }
    reject(e) {
      return this.sub(this.project(e));
    }
    dot(e) {
      return this.x * e.x + this.y * e.y;
    }
    cross(e) {
      return this.x * e.y - this.y * e.x;
    }
    angle(...e) {
      let h = T(...e);
      return St(Math.atan2(this.y - h.y, this.x - h.x));
    }
    angleBetween(...e) {
      let h = T(...e);
      return St(Math.atan2(this.cross(h), this.dot(h)));
    }
    lerp(e, h) {
      return new xe(Ke(this.x, e.x, h), Ke(this.y, e.y, h));
    }
    slerp(e, h) {
      let u = this.dot(e),
        f = this.cross(e),
        A = Math.atan2(f, u);
      return this.scale(Math.sin((1 - h) * A))
        .add(e.scale(Math.sin(h * A)))
        .scale(1 / f);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(e) {
      return new xe(Number(this.x.toFixed(e)), Number(this.y.toFixed(e)));
    }
    transform(e) {
      return e.multVec2(this);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y;
    }
    bbox() {
      return new ve(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
  };
  function T(...r) {
    if (r.length === 1) {
      if (r[0] instanceof E) return new E(r[0].x, r[0].y);
      if (Array.isArray(r[0]) && r[0].length === 2) return new E(...r[0]);
    }
    return new E(...r);
  }
  n(T, "vec2");
  var te = class le {
    static {
      n(this, "Color");
    }
    r = 255;
    g = 255;
    b = 255;
    constructor(e, h, u) {
      (this.r = Ye(e, 0, 255)),
        (this.g = Ye(h, 0, 255)),
        (this.b = Ye(u, 0, 255));
    }
    static fromArray(e) {
      return new le(e[0], e[1], e[2]);
    }
    static fromHex(e) {
      if (typeof e == "number")
        return new le((e >> 16) & 255, (e >> 8) & 255, (e >> 0) & 255);
      if (typeof e == "string") {
        let h = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return new le(
          parseInt(h[1], 16),
          parseInt(h[2], 16),
          parseInt(h[3], 16)
        );
      } else throw new Error("Invalid hex color format");
    }
    static fromHSL(e, h, u) {
      if (h == 0) return new le(255 * u, 255 * u, 255 * u);
      let f = n(
          (Z, b, K) => (
            K < 0 && (K += 1),
            K > 1 && (K -= 1),
            K < 1 / 6
              ? Z + (b - Z) * 6 * K
              : K < 1 / 2
              ? b
              : K < 2 / 3
              ? Z + (b - Z) * (2 / 3 - K) * 6
              : Z
          ),
          "hue2rgb"
        ),
        A = u < 0.5 ? u * (1 + h) : u + h - u * h,
        M = 2 * u - A,
        D = f(M, A, e + 1 / 3),
        H = f(M, A, e),
        V = f(M, A, e - 1 / 3);
      return new le(
        Math.round(D * 255),
        Math.round(H * 255),
        Math.round(V * 255)
      );
    }
    static RED = new le(255, 0, 0);
    static GREEN = new le(0, 255, 0);
    static BLUE = new le(0, 0, 255);
    static YELLOW = new le(255, 255, 0);
    static MAGENTA = new le(255, 0, 255);
    static CYAN = new le(0, 255, 255);
    static WHITE = new le(255, 255, 255);
    static BLACK = new le(0, 0, 0);
    clone() {
      return new le(this.r, this.g, this.b);
    }
    lighten(e) {
      return new le(this.r + e, this.g + e, this.b + e);
    }
    darken(e) {
      return this.lighten(-e);
    }
    invert() {
      return new le(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(e) {
      return new le(
        (this.r * e.r) / 255,
        (this.g * e.g) / 255,
        (this.b * e.b) / 255
      );
    }
    lerp(e, h) {
      return new le(Ke(this.r, e.r, h), Ke(this.g, e.g, h), Ke(this.b, e.b, h));
    }
    toHSL() {
      let e = this.r / 255,
        h = this.g / 255,
        u = this.b / 255,
        f = Math.max(e, h, u),
        A = Math.min(e, h, u),
        M = (f + A) / 2,
        D = M,
        H = M;
      if (f == A) M = D = 0;
      else {
        let V = f - A;
        switch (((D = H > 0.5 ? V / (2 - f - A) : V / (f + A)), f)) {
          case e:
            M = (h - u) / V + (h < u ? 6 : 0);
            break;
          case h:
            M = (u - e) / V + 2;
            break;
          case u:
            M = (e - h) / V + 4;
            break;
        }
        M /= 6;
      }
      return [M, D, H];
    }
    eq(e) {
      return this.r === e.r && this.g === e.g && this.b === e.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return (
        "#" +
        ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
          .toString(16)
          .slice(1)
      );
    }
  };
  function _(...r) {
    if (r.length === 0) return new te(255, 255, 255);
    if (r.length === 1) {
      if (r[0] instanceof te) return r[0].clone();
      if (typeof r[0] == "string") return te.fromHex(r[0]);
      if (Array.isArray(r[0]) && r[0].length === 3) return te.fromArray(r[0]);
    }
    return new te(...r);
  }
  n(_, "rgb");
  var qn = n((r, e, h) => te.fromHSL(r, e, h), "hsl2rgb"),
    ge = class $r {
      static {
        n(this, "Quad");
      }
      x = 0;
      y = 0;
      w = 1;
      h = 1;
      constructor(e, h, u, f) {
        (this.x = e), (this.y = h), (this.w = u), (this.h = f);
      }
      scale(e) {
        return new $r(
          this.x + this.w * e.x,
          this.y + this.h * e.y,
          this.w * e.w,
          this.h * e.h
        );
      }
      pos() {
        return new E(this.x, this.y);
      }
      clone() {
        return new $r(this.x, this.y, this.w, this.h);
      }
      eq(e) {
        return (
          this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h
        );
      }
      toString() {
        return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
      }
    };
  function ae(r, e, h, u) {
    return new ge(r, e, h, u);
  }
  n(ae, "quad");
  var Ne = class He {
    static {
      n(this, "Mat4");
    }
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(e) {
      e && (this.m = e);
    }
    static translate(e) {
      return new He([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, 0, 1]);
    }
    static scale(e) {
      return new He([e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(e) {
      e = Ue(-e);
      let h = Math.cos(e),
        u = Math.sin(e);
      return new He([1, 0, 0, 0, 0, h, -u, 0, 0, u, h, 0, 0, 0, 0, 1]);
    }
    static rotateY(e) {
      e = Ue(-e);
      let h = Math.cos(e),
        u = Math.sin(e);
      return new He([h, 0, u, 0, 0, 1, 0, 0, -u, 0, h, 0, 0, 0, 0, 1]);
    }
    static rotateZ(e) {
      e = Ue(-e);
      let h = Math.cos(e),
        u = Math.sin(e);
      return new He([h, -u, 0, 0, u, h, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(e) {
      return (
        (this.m[12] += this.m[0] * e.x + this.m[4] * e.y),
        (this.m[13] += this.m[1] * e.x + this.m[5] * e.y),
        (this.m[14] += this.m[2] * e.x + this.m[6] * e.y),
        (this.m[15] += this.m[3] * e.x + this.m[7] * e.y),
        this
      );
    }
    scale(e) {
      return (
        (this.m[0] *= e.x),
        (this.m[4] *= e.y),
        (this.m[1] *= e.x),
        (this.m[5] *= e.y),
        (this.m[2] *= e.x),
        (this.m[6] *= e.y),
        (this.m[3] *= e.x),
        (this.m[7] *= e.y),
        this
      );
    }
    rotate(e) {
      e = Ue(-e);
      let h = Math.cos(e),
        u = Math.sin(e),
        f = this.m[0],
        A = this.m[1],
        M = this.m[4],
        D = this.m[5];
      return (
        (this.m[0] = f * h + A * u),
        (this.m[1] = -f * u + A * h),
        (this.m[4] = M * h + D * u),
        (this.m[5] = -M * u + D * h),
        this
      );
    }
    mult(e) {
      let h = [];
      for (let u = 0; u < 4; u++)
        for (let f = 0; f < 4; f++)
          h[u * 4 + f] =
            this.m[0 * 4 + f] * e.m[u * 4 + 0] +
            this.m[1 * 4 + f] * e.m[u * 4 + 1] +
            this.m[2 * 4 + f] * e.m[u * 4 + 2] +
            this.m[3 * 4 + f] * e.m[u * 4 + 3];
      return new He(h);
    }
    multVec2(e) {
      return new E(
        e.x * this.m[0] + e.y * this.m[4] + this.m[12],
        e.x * this.m[1] + e.y * this.m[5] + this.m[13]
      );
    }
    getTranslation() {
      return new E(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4],
          h = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new E(h, e / h);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4],
          h = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new E(e / h, h);
      } else return new E(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return St(
          this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e)
        );
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return St(
          Math.PI / 2 -
            (this.m[5] > 0
              ? Math.acos(-this.m[4] / e)
              : -Math.acos(this.m[4] / e))
        );
      } else return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new E(
          Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e),
          0
        );
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new E(
          0,
          Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e)
        );
      } else return new E(0, 0);
    }
    invert() {
      let e = [],
        h = this.m[10] * this.m[15] - this.m[14] * this.m[11],
        u = this.m[9] * this.m[15] - this.m[13] * this.m[11],
        f = this.m[9] * this.m[14] - this.m[13] * this.m[10],
        A = this.m[8] * this.m[15] - this.m[12] * this.m[11],
        M = this.m[8] * this.m[14] - this.m[12] * this.m[10],
        D = this.m[8] * this.m[13] - this.m[12] * this.m[9],
        H = this.m[6] * this.m[15] - this.m[14] * this.m[7],
        V = this.m[5] * this.m[15] - this.m[13] * this.m[7],
        Z = this.m[5] * this.m[14] - this.m[13] * this.m[6],
        b = this.m[4] * this.m[15] - this.m[12] * this.m[7],
        K = this.m[4] * this.m[14] - this.m[12] * this.m[6],
        y = this.m[5] * this.m[15] - this.m[13] * this.m[7],
        W = this.m[4] * this.m[13] - this.m[12] * this.m[5],
        ue = this.m[6] * this.m[11] - this.m[10] * this.m[7],
        re = this.m[5] * this.m[11] - this.m[9] * this.m[7],
        U = this.m[5] * this.m[10] - this.m[9] * this.m[6],
        ce = this.m[4] * this.m[11] - this.m[8] * this.m[7],
        S = this.m[4] * this.m[10] - this.m[8] * this.m[6],
        Te = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      (e[0] = this.m[5] * h - this.m[6] * u + this.m[7] * f),
        (e[4] = -(this.m[4] * h - this.m[6] * A + this.m[7] * M)),
        (e[8] = this.m[4] * u - this.m[5] * A + this.m[7] * D),
        (e[12] = -(this.m[4] * f - this.m[5] * M + this.m[6] * D)),
        (e[1] = -(this.m[1] * h - this.m[2] * u + this.m[3] * f)),
        (e[5] = this.m[0] * h - this.m[2] * A + this.m[3] * M),
        (e[9] = -(this.m[0] * u - this.m[1] * A + this.m[3] * D)),
        (e[13] = this.m[0] * f - this.m[1] * M + this.m[2] * D),
        (e[2] = this.m[1] * H - this.m[2] * V + this.m[3] * Z),
        (e[6] = -(this.m[0] * H - this.m[2] * b + this.m[3] * K)),
        (e[10] = this.m[0] * y - this.m[1] * b + this.m[3] * W),
        (e[14] = -(this.m[0] * Z - this.m[1] * K + this.m[2] * W)),
        (e[3] = -(this.m[1] * ue - this.m[2] * re + this.m[3] * U)),
        (e[7] = this.m[0] * ue - this.m[2] * ce + this.m[3] * S),
        (e[11] = -(this.m[0] * re - this.m[1] * ce + this.m[3] * Te)),
        (e[15] = this.m[0] * U - this.m[1] * S + this.m[2] * Te);
      let Y =
        this.m[0] * e[0] +
        this.m[1] * e[4] +
        this.m[2] * e[8] +
        this.m[3] * e[12];
      for (let Ee = 0; Ee < 4; Ee++)
        for (let me = 0; me < 4; me++) e[Ee * 4 + me] *= 1 / Y;
      return new He(e);
    }
    clone() {
      return new He([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
  function ei(r, e, h, u = (f) => -Math.cos(f)) {
    return r + ((u(h) + 1) / 2) * (e - r);
  }
  n(ei, "wave");
  var Hn = 1103515245,
    Yn = 12345,
    Ts = 2147483648,
    Ys = class {
      static {
        n(this, "RNG");
      }
      seed;
      constructor(r) {
        this.seed = r;
      }
      gen() {
        return (this.seed = (Hn * this.seed + Yn) % Ts), this.seed / Ts;
      }
      genNumber(r, e) {
        return r + this.gen() * (e - r);
      }
      genVec2(r, e) {
        return new E(this.genNumber(r.x, e.x), this.genNumber(r.y, e.y));
      }
      genColor(r, e) {
        return new te(
          this.genNumber(r.r, e.r),
          this.genNumber(r.g, e.g),
          this.genNumber(r.b, e.b)
        );
      }
      genAny(...r) {
        if (r.length === 0) return this.gen();
        if (r.length === 1) {
          if (typeof r[0] == "number") return this.genNumber(0, r[0]);
          if (r[0] instanceof E) return this.genVec2(T(0, 0), r[0]);
          if (r[0] instanceof te) return this.genColor(_(0, 0, 0), r[0]);
        } else if (r.length === 2) {
          if (typeof r[0] == "number" && typeof r[1] == "number")
            return this.genNumber(r[0], r[1]);
          if (r[0] instanceof E && r[1] instanceof E)
            return this.genVec2(r[0], r[1]);
          if (r[0] instanceof te && r[1] instanceof te)
            return this.genColor(r[0], r[1]);
        }
      }
    },
    ti = new Ys(Date.now());
  function Ks(r) {
    return r != null && (ti.seed = r), ti.seed;
  }
  n(Ks, "randSeed");
  function $t(...r) {
    return ti.genAny(...r);
  }
  n($t, "rand");
  function li(...r) {
    return Math.floor($t(...r));
  }
  n(li, "randi");
  function js(r) {
    return $t() <= r;
  }
  n(js, "chance");
  function Qs(r) {
    return r[li(r.length)];
  }
  n(Qs, "choose");
  function zs(r, e) {
    return (
      r.pos.x + r.width > e.pos.x &&
      r.pos.x < e.pos.x + e.width &&
      r.pos.y + r.height > e.pos.y &&
      r.pos.y < e.pos.y + e.height
    );
  }
  n(zs, "testRectRect");
  function Js(r, e) {
    if (
      (r.p1.x === r.p2.x && r.p1.y === r.p2.y) ||
      (e.p1.x === e.p2.x && e.p1.y === e.p2.y)
    )
      return null;
    let h =
      (e.p2.y - e.p1.y) * (r.p2.x - r.p1.x) -
      (e.p2.x - e.p1.x) * (r.p2.y - r.p1.y);
    if (h === 0) return null;
    let u =
        ((e.p2.x - e.p1.x) * (r.p1.y - e.p1.y) -
          (e.p2.y - e.p1.y) * (r.p1.x - e.p1.x)) /
        h,
      f =
        ((r.p2.x - r.p1.x) * (r.p1.y - e.p1.y) -
          (r.p2.y - r.p1.y) * (r.p1.x - e.p1.x)) /
        h;
    return u < 0 || u > 1 || f < 0 || f > 1 ? null : u;
  }
  n(Js, "testLineLineT");
  function Et(r, e) {
    let h = Js(r, e);
    return h
      ? T(r.p1.x + h * (r.p2.x - r.p1.x), r.p1.y + h * (r.p2.y - r.p1.y))
      : null;
  }
  n(Et, "testLineLine");
  function Xs(r, e) {
    if (er(r, e.p1) || er(r, e.p2)) return !0;
    let h = r.points();
    return (
      !!Et(e, new bt(h[0], h[1])) ||
      !!Et(e, new bt(h[1], h[2])) ||
      !!Et(e, new bt(h[2], h[3])) ||
      !!Et(e, new bt(h[3], h[0]))
    );
  }
  n(Xs, "testRectLine");
  function er(r, e) {
    return (
      e.x > r.pos.x &&
      e.x < r.pos.x + r.width &&
      e.y > r.pos.y &&
      e.y < r.pos.y + r.height
    );
  }
  n(er, "testRectPoint");
  function Ws(r, e) {
    let h = e.sub(r.p1),
      u = r.p2.sub(r.p1);
    if (Math.abs(h.cross(u)) > Number.EPSILON) return !1;
    let f = h.dot(u) / u.dot(u);
    return f >= 0 && f <= 1;
  }
  n(Ws, "testLinePoint");
  function ui(r, e) {
    let h = r.p2.sub(r.p1),
      u = h.dot(h),
      f = r.p1.sub(e.center),
      A = 2 * h.dot(f),
      M = f.dot(f) - e.radius * e.radius,
      D = A * A - 4 * u * M;
    if (u <= Number.EPSILON || D < 0) return !1;
    if (D == 0) {
      let H = -A / (2 * u);
      if (H >= 0 && H <= 1) return !0;
    } else {
      let H = (-A + Math.sqrt(D)) / (2 * u),
        V = (-A - Math.sqrt(D)) / (2 * u);
      if ((H >= 0 && H <= 1) || (V >= 0 && V <= 1)) return !0;
    }
    return di(e, r.p1);
  }
  n(ui, "testLineCircle");
  function di(r, e) {
    return r.center.sdist(e) < r.radius * r.radius;
  }
  n(di, "testCirclePoint");
  function Zs(r, e) {
    let h = e.pts[e.pts.length - 1];
    for (let u of e.pts) {
      if (ui(new bt(h, u), r)) return !0;
      h = u;
    }
    return di(r, e.pts[0]) ? !0 : ci(e, r.center);
  }
  n(Zs, "testCirclePolygon");
  function ci(r, e) {
    let h = !1,
      u = r.pts;
    for (let f = 0, A = u.length - 1; f < u.length; A = f++)
      u[f].y > e.y != u[A].y > e.y &&
        e.x <
          ((u[A].x - u[f].x) * (e.y - u[f].y)) / (u[A].y - u[f].y) + u[f].x &&
        (h = !h);
    return h;
  }
  n(ci, "testPolygonPoint");
  var bt = class ri {
      static {
        n(this, "Line");
      }
      p1;
      p2;
      constructor(e, h) {
        (this.p1 = e.clone()), (this.p2 = h.clone());
      }
      transform(e) {
        return new ri(e.multVec2(this.p1), e.multVec2(this.p2));
      }
      bbox() {
        return ve.fromPoints(this.p1, this.p2);
      }
      area() {
        return this.p1.dist(this.p2);
      }
      clone() {
        return new ri(this.p1, this.p2);
      }
    },
    ve = class ii {
      static {
        n(this, "Rect");
      }
      pos;
      width;
      height;
      constructor(e, h, u) {
        (this.pos = e.clone()), (this.width = h), (this.height = u);
      }
      static fromPoints(e, h) {
        return new ii(e.clone(), h.x - e.x, h.y - e.y);
      }
      center() {
        return new E(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
      }
      points() {
        return [
          this.pos,
          this.pos.add(this.width, 0),
          this.pos.add(this.width, this.height),
          this.pos.add(0, this.height),
        ];
      }
      transform(e) {
        return new Xt(this.points().map((h) => e.multVec2(h)));
      }
      bbox() {
        return this.clone();
      }
      area() {
        return this.width * this.height;
      }
      clone() {
        return new ii(this.pos.clone(), this.width, this.height);
      }
      distToPoint(e) {
        return Math.sqrt(this.sdistToPoint(e));
      }
      sdistToPoint(e) {
        let h = this.pos,
          u = this.pos.add(this.width, this.height),
          f = Math.max(h.x - e.x, 0, e.x - u.x),
          A = Math.max(h.y - e.y, 0, e.y - u.y);
        return f * f + A * A;
      }
    },
    Ps = class _s {
      static {
        n(this, "Circle");
      }
      center;
      radius;
      constructor(e, h) {
        (this.center = e.clone()), (this.radius = h);
      }
      transform(e) {
        return new Kn(this.center, this.radius, this.radius).transform(e);
      }
      bbox() {
        return ve.fromPoints(
          this.center.sub(T(this.radius)),
          this.center.add(T(this.radius))
        );
      }
      area() {
        return this.radius * this.radius * Math.PI;
      }
      clone() {
        return new _s(this.center, this.radius);
      }
    },
    Kn = class si {
      static {
        n(this, "Ellipse");
      }
      center;
      radiusX;
      radiusY;
      constructor(e, h, u) {
        (this.center = e.clone()), (this.radiusX = h), (this.radiusY = u);
      }
      transform(e) {
        return new si(
          e.multVec2(this.center),
          e.m[0] * this.radiusX,
          e.m[5] * this.radiusY
        );
      }
      bbox() {
        return ve.fromPoints(
          this.center.sub(T(this.radiusX, this.radiusY)),
          this.center.add(T(this.radiusX, this.radiusY))
        );
      }
      area() {
        return this.radiusX * this.radiusY * Math.PI;
      }
      clone() {
        return new si(this.center, this.radiusX, this.radiusY);
      }
    },
    Xt = class ni {
      static {
        n(this, "Polygon");
      }
      pts;
      constructor(e) {
        if (e.length < 3)
          throw new Error("Polygons should have at least 3 vertices");
        this.pts = e;
      }
      transform(e) {
        return new ni(this.pts.map((h) => e.multVec2(h)));
      }
      bbox() {
        let e = T(Number.MAX_VALUE),
          h = T(-Number.MAX_VALUE);
        for (let u of this.pts)
          (e.x = Math.min(e.x, u.x)),
            (h.x = Math.max(h.x, u.x)),
            (e.y = Math.min(e.y, u.y)),
            (h.y = Math.max(h.y, u.y));
        return ve.fromPoints(e, h);
      }
      area() {
        let e = 0,
          h = this.pts.length;
        for (let u = 0; u < h; u++) {
          let f = this.pts[u],
            A = this.pts[(u + 1) % h];
          (e += f.x * A.y * 0.5), (e -= A.x * f.y * 0.5);
        }
        return Math.abs(e);
      }
      clone() {
        return new ni(this.pts.map((e) => e.clone()));
      }
    };
  function $s(r, e) {
    let h = Number.MAX_VALUE,
      u = T(0);
    for (let f of [r, e])
      for (let A = 0; A < f.pts.length; A++) {
        let M = f.pts[A],
          D = f.pts[(A + 1) % f.pts.length].sub(M).normal().unit(),
          H = Number.MAX_VALUE,
          V = -Number.MAX_VALUE;
        for (let y = 0; y < r.pts.length; y++) {
          let W = r.pts[y].dot(D);
          (H = Math.min(H, W)), (V = Math.max(V, W));
        }
        let Z = Number.MAX_VALUE,
          b = -Number.MAX_VALUE;
        for (let y = 0; y < e.pts.length; y++) {
          let W = e.pts[y].dot(D);
          (Z = Math.min(Z, W)), (b = Math.max(b, W));
        }
        let K = Math.min(V, b) - Math.max(H, Z);
        if (K < 0) return null;
        if (K < Math.abs(h)) {
          let y = b - H,
            W = Z - V;
          (h = Math.abs(y) < Math.abs(W) ? y : W), (u = D.scale(h));
        }
      }
    return u;
  }
  n($s, "sat");
  var en = class extends Map {
      static {
        n(this, "Registry");
      }
      lastID;
      constructor(...r) {
        super(...r), (this.lastID = 0);
      }
      push(r) {
        let e = this.lastID;
        return this.set(e, r), this.lastID++, e;
      }
      pushd(r) {
        let e = this.push(r);
        return () => this.delete(e);
      }
    },
    xt = class tn {
      static {
        n(this, "EventController");
      }
      paused = !1;
      cancel;
      constructor(e) {
        this.cancel = e;
      }
      static join(e) {
        let h = new tn(() => e.forEach((u) => u.cancel()));
        return (
          Object.defineProperty(h, "paused", {
            get: () => e[0].paused,
            set: (u) => e.forEach((f) => (f.paused = u)),
          }),
          (h.paused = !1),
          h
        );
      }
    },
    ke = class {
      static {
        n(this, "Event");
      }
      handlers = new en();
      add(r) {
        let e = this.handlers.pushd((...u) => {
            h.paused || r(...u);
          }),
          h = new xt(e);
        return h;
      }
      addOnce(r) {
        let e = this.add((...h) => {
          e.cancel(), r(...h);
        });
        return e;
      }
      next() {
        return new Promise((r) => this.addOnce(r));
      }
      trigger(...r) {
        this.handlers.forEach((e) => e(...r));
      }
      numListeners() {
        return this.handlers.size;
      }
      clear() {
        this.handlers.clear();
      }
    },
    Wt = class {
      static {
        n(this, "EventHandler");
      }
      handlers = {};
      on(r, e) {
        return (
          this.handlers[r] || (this.handlers[r] = new ke()),
          this.handlers[r].add(e)
        );
      }
      onOnce(r, e) {
        let h = this.on(r, (...u) => {
          h.cancel(), e(...u);
        });
        return h;
      }
      next(r) {
        return new Promise((e) => {
          this.onOnce(r, (...h) => e(h[0]));
        });
      }
      trigger(r, ...e) {
        this.handlers[r] && this.handlers[r].trigger(...e);
      }
      remove(r) {
        delete this.handlers[r];
      }
      clear() {
        this.handlers = {};
      }
      numListeners(r) {
        return this.handlers[r]?.numListeners() ?? 0;
      }
    };
  function xr(r, e) {
    if (r === e) return !0;
    let h = typeof r,
      u = typeof e;
    if (h !== u) return !1;
    if (h === "object" && u === "object" && r !== null && e !== null) {
      if (Array.isArray(r) !== Array.isArray(e)) return !1;
      let f = Object.keys(r),
        A = Object.keys(e);
      if (f.length !== A.length) return !1;
      for (let M of f) {
        let D = r[M],
          H = e[M];
        if (!xr(D, H)) return !1;
      }
      return !0;
    }
    return !1;
  }
  n(xr, "deepEq");
  function rn(r) {
    let e = window.atob(r),
      h = e.length,
      u = new Uint8Array(h);
    for (let f = 0; f < h; f++) u[f] = e.charCodeAt(f);
    return u.buffer;
  }
  n(rn, "base64ToArrayBuffer");
  function sn(r) {
    return rn(r.split(",")[1]);
  }
  n(sn, "dataURLToArrayBuffer");
  function Er(r, e) {
    let h = document.createElement("a");
    (h.href = e), (h.download = r), h.click();
  }
  n(Er, "download");
  function fi(r, e) {
    Er(r, "data:text/plain;charset=utf-8," + e);
  }
  n(fi, "downloadText");
  function nn(r, e) {
    fi(r, JSON.stringify(e));
  }
  n(nn, "downloadJSON");
  function oi(r, e) {
    let h = URL.createObjectURL(e);
    Er(r, h), URL.revokeObjectURL(h);
  }
  n(oi, "downloadBlob");
  var Bs = n((r) => r.match(/^data:\w+\/\w+;base64,.+/), "isDataURL"),
    jn = n((r) => r.split(".").slice(0, -1).join("."), "getFileName");
  function Me(r, e) {
    return (...h) => {
      let u = h.length;
      if (u === r.length) return r(...h);
      if (u === e.length) return e(...h);
    };
  }
  n(Me, "overload2");
  var Qn = (() => {
      let r = 0;
      return () => r++;
    })(),
    zn = n(
      (r) => (r instanceof Error ? r.message : String(r)),
      "getErrorMessage"
    ),
    Jn = class {
      static {
        n(this, "BinaryHeap");
      }
      _items;
      _compareFn;
      constructor(r = (e, h) => e < h) {
        (this._compareFn = r), (this._items = []);
      }
      insert(r) {
        this._items.push(r), this.moveUp(this._items.length - 1);
      }
      remove() {
        if (this._items.length === 0) return null;
        let r = this._items[0],
          e = this._items.pop();
        return (
          this._items.length !== 0 && ((this._items[0] = e), this.moveDown(0)),
          r
        );
      }
      clear() {
        this._items.splice(0, this._items.length);
      }
      moveUp(r) {
        for (; r > 0; ) {
          let e = Math.floor((r - 1) / 2);
          if (
            !this._compareFn(this._items[r], this._items[e]) &&
            this._items[r] >= this._items[e]
          )
            break;
          this.swap(r, e), (r = e);
        }
      }
      moveDown(r) {
        for (; r < Math.floor(this._items.length / 2); ) {
          let e = 2 * r + 1;
          if (
            (e < this._items.length - 1 &&
              !this._compareFn(this._items[e], this._items[e + 1]) &&
              ++e,
            this._compareFn(this._items[r], this._items[e]))
          )
            break;
          this.swap(r, e), (r = e);
        }
      }
      swap(r, e) {
        [this._items[r], this._items[e]] = [this._items[e], this._items[r]];
      }
      get length() {
        return this._items.length;
      }
    },
    Xn = Object.freeze([
      776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449,
      4520,
    ]);
  function on(r) {
    if (typeof r != "string")
      throw new TypeError("string cannot be undefined or null");
    let e = [],
      h = 0,
      u = 0;
    for (; h < r.length; ) {
      if (
        ((u += an(h + u, r)),
        pn(r[h + u]) && u++,
        dn(r[h + u]) && u++,
        cn(r[h + u]) && u++,
        gn(r[h + u]))
      ) {
        u++;
        continue;
      }
      e.push(r.substring(h, h + u)), (h += u), (u = 0);
    }
    return e;
  }
  n(on, "runes");
  function an(r, e) {
    let h = e[r];
    if (!hn(h) || r === e.length - 1) return 1;
    let u = h + e[r + 1],
      f = e.substring(r + 2, r + 5);
    return ai(u) && ai(f)
      ? 4
      : ln(u) && fn(f)
      ? e.slice(r).indexOf(String.fromCodePoint(917631)) + 2
      : un(f)
      ? 4
      : 2;
  }
  n(an, "nextUnits");
  function hn(r) {
    return r && _e(r[0].charCodeAt(0), 55296, 56319);
  }
  n(hn, "isFirstOfSurrogatePair");
  function ai(r) {
    return _e(br(r), 127462, 127487);
  }
  n(ai, "isRegionalIndicator");
  function ln(r) {
    return _e(br(r), 127988, 127988);
  }
  n(ln, "isSubdivisionFlag");
  function un(r) {
    return _e(br(r), 127995, 127999);
  }
  n(un, "isFitzpatrickModifier");
  function dn(r) {
    return typeof r == "string" && _e(r.charCodeAt(0), 65024, 65039);
  }
  n(dn, "isVariationSelector");
  function cn(r) {
    return typeof r == "string" && _e(r.charCodeAt(0), 8400, 8447);
  }
  n(cn, "isDiacriticalMark");
  function fn(r) {
    let e = r.codePointAt(0);
    return (
      typeof r == "string" && typeof e == "number" && _e(e, 917504, 917631)
    );
  }
  n(fn, "isSupplementarySpecialpurposePlane");
  function pn(r) {
    return typeof r == "string" && Xn.includes(r.charCodeAt(0));
  }
  n(pn, "isGrapheme");
  function gn(r) {
    return typeof r == "string" && r.charCodeAt(0) === 8205;
  }
  n(gn, "isZeroWidthJoiner");
  function br(r) {
    let e = r.charCodeAt(0) - 55296,
      h = r.charCodeAt(1) - 56320;
    return (e << 10) + h + 65536;
  }
  n(br, "codePointFromSurrogatePair");
  function _e(r, e, h) {
    return r >= e && r <= h;
  }
  n(_e, "betweenInclusive");
  var Fs = {
      "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          6: "ltrigger",
          7: "rtrigger",
          8: "select",
          9: "start",
          10: "lstick",
          11: "rstick",
          12: "dpad-up",
          13: "dpad-down",
          14: "dpad-left",
          15: "dpad-right",
          16: "home",
          17: "capture",
        },
        sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
      },
      "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          9: "select",
          10: "lstick",
          16: "start",
        },
        sticks: { left: { x: 0, y: 1 } },
      },
      "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          9: "start",
          10: "lstick",
          16: "select",
        },
        sticks: { left: { x: 0, y: 1 } },
      },
      "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          6: "ltrigger",
          7: "rtrigger",
          8: "select",
          9: "start",
          10: "lstick",
          11: "rstick",
          12: "dpad-up",
          13: "dpad-down",
          14: "dpad-left",
          15: "dpad-right",
          16: "home",
          17: "capture",
        },
        sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
      },
      default: {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          6: "ltrigger",
          7: "rtrigger",
          8: "select",
          9: "start",
          10: "lstick",
          11: "rstick",
          12: "dpad-up",
          13: "dpad-down",
          14: "dpad-left",
          15: "dpad-right",
          16: "home",
        },
        sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
      },
    },
    vr = class {
      static {
        n(this, "ButtonState");
      }
      pressed = new Set([]);
      pressedRepeat = new Set([]);
      released = new Set([]);
      down = new Set([]);
      update() {
        this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
      }
      press(r) {
        this.pressed.add(r), this.pressedRepeat.add(r), this.down.add(r);
      }
      pressRepeat(r) {
        this.pressedRepeat.add(r);
      }
      release(r) {
        this.down.delete(r), this.pressed.delete(r), this.released.add(r);
      }
    },
    Wn = class {
      static {
        n(this, "GamepadState");
      }
      buttonState = new vr();
      stickState = new Map();
    },
    Zn = class {
      static {
        n(this, "FPSCounter");
      }
      dts = [];
      timer = 0;
      fps = 0;
      tick(r) {
        this.dts.push(r),
          (this.timer += r),
          this.timer >= 1 &&
            ((this.timer = 0),
            (this.fps = Math.round(
              1 / (this.dts.reduce((e, h) => e + h) / this.dts.length)
            )),
            (this.dts = []));
      }
    },
    _n = n((r) => {
      if (!r.canvas) throw new Error("Please provide a canvas");
      let e = {
        canvas: r.canvas,
        loopID: null,
        stopped: !1,
        dt: 0,
        time: 0,
        realTime: 0,
        fpsCounter: new Zn(),
        timeScale: 1,
        skipTime: !1,
        numFrames: 0,
        mousePos: new E(0),
        mouseDeltaPos: new E(0),
        keyState: new vr(),
        mouseState: new vr(),
        mergedGamepadState: new Wn(),
        gamepadStates: new Map(),
        gamepads: [],
        charInputted: [],
        isMouseMoved: !1,
        lastWidth: r.canvas.offsetWidth,
        lastHeight: r.canvas.offsetHeight,
        events: new Wt(),
      };
      function h() {
        return e.dt * e.timeScale;
      }
      n(h, "dt");
      function u() {
        return e.time;
      }
      n(u, "time");
      function f() {
        return e.fpsCounter.fps;
      }
      n(f, "fps");
      function A() {
        return e.numFrames;
      }
      n(A, "numFrames");
      function M() {
        return e.canvas.toDataURL();
      }
      n(M, "screenshot");
      function D(c) {
        e.canvas.style.cursor = c;
      }
      n(D, "setCursor");
      function H() {
        return e.canvas.style.cursor;
      }
      n(H, "getCursor");
      function V(c) {
        if (c)
          try {
            let v = e.canvas.requestPointerLock();
            v.catch && v.catch((R) => console.error(R));
          } catch (v) {
            console.error(v);
          }
        else document.exitPointerLock();
      }
      n(V, "setCursorLocked");
      function Z() {
        return !!document.pointerLockElement;
      }
      n(Z, "isCursorLocked");
      function b(c) {
        c.requestFullscreen
          ? c.requestFullscreen()
          : c.webkitRequestFullscreen && c.webkitRequestFullscreen();
      }
      n(b, "enterFullscreen");
      function K() {
        document.exitFullscreen
          ? document.exitFullscreen()
          : document.webkitExitFullScreen && document.webkitExitFullScreen();
      }
      n(K, "exitFullscreen");
      function y() {
        return document.fullscreenElement || document.webkitFullscreenElement;
      }
      n(y, "getFullscreenElement");
      function W(c = !0) {
        c ? b(e.canvas) : K();
      }
      n(W, "setFullscreen");
      function ue() {
        return !!y();
      }
      n(ue, "isFullscreen");
      function re() {
        e.stopped = !0;
        for (let c in ie) e.canvas.removeEventListener(c, ie[c]);
        for (let c in he) document.removeEventListener(c, he[c]);
        for (let c in ne) window.removeEventListener(c, ne[c]);
        we.disconnect();
      }
      n(re, "quit");
      function U(c) {
        e.loopID !== null && cancelAnimationFrame(e.loopID);
        let v = 0,
          R = n((q) => {
            if (e.stopped) return;
            if (document.visibilityState !== "visible") {
              e.loopID = requestAnimationFrame(R);
              return;
            }
            let j = q / 1e3,
              de = j - e.realTime,
              be = r.maxFPS ? 1 / r.maxFPS : 0;
            (e.realTime = j),
              (v += de),
              v > be &&
                (e.skipTime ||
                  ((e.dt = v), (e.time += h()), e.fpsCounter.tick(e.dt)),
                (v = 0),
                (e.skipTime = !1),
                e.numFrames++,
                st(),
                c(),
                Gt()),
              (e.loopID = requestAnimationFrame(R));
          }, "frame");
        R(0);
      }
      n(U, "run");
      function ce() {
        return "ontouchstart" in window || navigator.maxTouchPoints > 0;
      }
      n(ce, "isTouchscreen");
      function S() {
        return e.mousePos.clone();
      }
      n(S, "mousePos");
      function Te() {
        return e.mouseDeltaPos.clone();
      }
      n(Te, "mouseDeltaPos");
      function Y(c = "left") {
        return e.mouseState.pressed.has(c);
      }
      n(Y, "isMousePressed");
      function Ee(c = "left") {
        return e.mouseState.down.has(c);
      }
      n(Ee, "isMouseDown");
      function me(c = "left") {
        return e.mouseState.released.has(c);
      }
      n(me, "isMouseReleased");
      function ye() {
        return e.isMouseMoved;
      }
      n(ye, "isMouseMoved");
      function je(c) {
        return c === void 0
          ? e.keyState.pressed.size > 0
          : e.keyState.pressed.has(c);
      }
      n(je, "isKeyPressed");
      function Rt(c) {
        return c === void 0
          ? e.keyState.pressedRepeat.size > 0
          : e.keyState.pressedRepeat.has(c);
      }
      n(Rt, "isKeyPressedRepeat");
      function lt(c) {
        return c === void 0 ? e.keyState.down.size > 0 : e.keyState.down.has(c);
      }
      n(lt, "isKeyDown");
      function ut(c) {
        return c === void 0
          ? e.keyState.released.size > 0
          : e.keyState.released.has(c);
      }
      n(ut, "isKeyReleased");
      function dt(c) {
        return c === void 0
          ? e.mergedGamepadState.buttonState.pressed.size > 0
          : e.mergedGamepadState.buttonState.pressed.has(c);
      }
      n(dt, "isGamepadButtonPressed");
      function Ge(c) {
        return c === void 0
          ? e.mergedGamepadState.buttonState.down.size > 0
          : e.mergedGamepadState.buttonState.down.has(c);
      }
      n(Ge, "isGamepadButtonDown");
      function Mt(c) {
        return c === void 0
          ? e.mergedGamepadState.buttonState.released.size > 0
          : e.mergedGamepadState.buttonState.released.has(c);
      }
      n(Mt, "isGamepadButtonReleased");
      function Tt(c) {
        return e.events.on("resize", c);
      }
      n(Tt, "onResize");
      let rr = Me(
          (c) => e.events.on("keyDown", c),
          (c, v) => e.events.on("keyDown", (R) => R === c && v(c))
        ),
        ir = Me(
          (c) => e.events.on("keyPress", c),
          (c, v) => e.events.on("keyPress", (R) => R === c && v(c))
        ),
        sr = Me(
          (c) => e.events.on("keyPressRepeat", c),
          (c, v) => e.events.on("keyPressRepeat", (R) => R === c && v(c))
        ),
        nr = Me(
          (c) => e.events.on("keyRelease", c),
          (c, v) => e.events.on("keyRelease", (R) => R === c && v(c))
        ),
        Pt = Me(
          (c) => e.events.on("mouseDown", (v) => c(v)),
          (c, v) => e.events.on("mouseDown", (R) => R === c && v(R))
        ),
        Bt = Me(
          (c) => e.events.on("mousePress", (v) => c(v)),
          (c, v) => e.events.on("mousePress", (R) => R === c && v(R))
        ),
        Ft = Me(
          (c) => e.events.on("mouseRelease", (v) => c(v)),
          (c, v) => e.events.on("mouseRelease", (R) => R === c && v(R))
        );
      function ct(c) {
        return e.events.on("mouseMove", () => c(S(), Te()));
      }
      n(ct, "onMouseMove");
      function ft(c) {
        return e.events.on("charInput", c);
      }
      n(ft, "onCharInput");
      function It(c) {
        return e.events.on("touchStart", c);
      }
      n(It, "onTouchStart");
      function et(c) {
        return e.events.on("touchMove", c);
      }
      n(et, "onTouchMove");
      function kt(c) {
        return e.events.on("touchEnd", c);
      }
      n(kt, "onTouchEnd");
      function Dt(c) {
        return e.events.on("scroll", c);
      }
      n(Dt, "onScroll");
      function pt(c) {
        return e.events.on("hide", c);
      }
      n(pt, "onHide");
      function Ct(c) {
        return e.events.on("show", c);
      }
      n(Ct, "onShow");
      function gt(c, v) {
        if (typeof c == "function") return e.events.on("gamepadButtonDown", c);
        if (typeof c == "string" && typeof v == "function")
          return e.events.on("gamepadButtonDown", (R) => R === c && v(c));
      }
      n(gt, "onGamepadButtonDown");
      function mt(c, v) {
        if (typeof c == "function") return e.events.on("gamepadButtonPress", c);
        if (typeof c == "string" && typeof v == "function")
          return e.events.on("gamepadButtonPress", (R) => R === c && v(c));
      }
      n(mt, "onGamepadButtonPress");
      function Nt(c, v) {
        if (typeof c == "function")
          return e.events.on("gamepadButtonRelease", c);
        if (typeof c == "string" && typeof v == "function")
          return e.events.on("gamepadButtonRelease", (R) => R === c && v(c));
      }
      n(Nt, "onGamepadButtonRelease");
      function tt(c, v) {
        return e.events.on("gamepadStick", (R, q) => R === c && v(q));
      }
      n(tt, "onGamepadStick");
      function Ut(c) {
        e.events.on("gamepadConnect", c);
      }
      n(Ut, "onGamepadConnect");
      function rt(c) {
        e.events.on("gamepadDisconnect", c);
      }
      n(rt, "onGamepadDisconnect");
      function Pe(c) {
        return e.mergedGamepadState.stickState.get(c) || new E(0);
      }
      n(Pe, "getGamepadStick");
      function it() {
        return [...e.charInputted];
      }
      n(it, "charInputted");
      function wt() {
        return [...e.gamepads];
      }
      n(wt, "getGamepads");
      function st() {
        e.events.trigger("input"),
          e.keyState.down.forEach((c) => e.events.trigger("keyDown", c)),
          e.mouseState.down.forEach((c) => e.events.trigger("mouseDown", c)),
          De();
      }
      n(st, "processInput");
      function Gt() {
        e.keyState.update(),
          e.mouseState.update(),
          e.mergedGamepadState.buttonState.update(),
          e.mergedGamepadState.stickState.forEach((c, v) => {
            e.mergedGamepadState.stickState.set(v, new E(0));
          }),
          (e.charInputted = []),
          (e.isMouseMoved = !1),
          e.gamepadStates.forEach((c) => {
            c.buttonState.update(),
              c.stickState.forEach((v, R) => {
                c.stickState.set(R, new E(0));
              });
          });
      }
      n(Gt, "resetInput");
      function At(c) {
        let v = {
          index: c.index,
          isPressed: (R) =>
            e.gamepadStates.get(c.index).buttonState.pressed.has(R),
          isDown: (R) => e.gamepadStates.get(c.index).buttonState.down.has(R),
          isReleased: (R) =>
            e.gamepadStates.get(c.index).buttonState.released.has(R),
          getStick: (R) => e.gamepadStates.get(c.index).stickState.get(R),
        };
        return (
          e.gamepads.push(v),
          e.gamepadStates.set(c.index, {
            buttonState: new vr(),
            stickState: new Map([
              ["left", new E(0)],
              ["right", new E(0)],
            ]),
          }),
          v
        );
      }
      n(At, "registerGamepad");
      function ee(c) {
        (e.gamepads = e.gamepads.filter((v) => v.index !== c.index)),
          e.gamepadStates.delete(c.index);
      }
      n(ee, "removeGamepad");
      function De() {
        for (let c of navigator.getGamepads())
          c && !e.gamepadStates.has(c.index) && At(c);
        for (let c of e.gamepads) {
          let v = navigator.getGamepads()[c.index],
            R = (r.gamepads ?? {})[v.id] ?? Fs[v.id] ?? Fs.default,
            q = e.gamepadStates.get(c.index);
          for (let j = 0; j < v.buttons.length; j++)
            v.buttons[j].pressed
              ? (q.buttonState.down.has(R.buttons[j]) ||
                  (e.mergedGamepadState.buttonState.press(R.buttons[j]),
                  q.buttonState.press(R.buttons[j]),
                  e.events.trigger("gamepadButtonPress", R.buttons[j])),
                e.events.trigger("gamepadButtonDown", R.buttons[j]))
              : q.buttonState.down.has(R.buttons[j]) &&
                (e.mergedGamepadState.buttonState.release(R.buttons[j]),
                q.buttonState.release(R.buttons[j]),
                e.events.trigger("gamepadButtonRelease", R.buttons[j]));
          for (let j in R.sticks) {
            let de = R.sticks[j],
              be = new E(v.axes[de.x], v.axes[de.y]);
            q.stickState.set(j, be),
              e.mergedGamepadState.stickState.set(j, be),
              e.events.trigger("gamepadStick", j, be);
          }
        }
      }
      n(De, "processGamepad");
      let ie = {},
        he = {},
        ne = {},
        Ce = r.pixelDensity || window.devicePixelRatio || 1;
      ie.mousemove = (c) => {
        let v = new E(c.offsetX, c.offsetY),
          R = new E(c.movementX, c.movementY);
        if (ue()) {
          let q = e.canvas.width / Ce,
            j = e.canvas.height / Ce,
            de = window.innerWidth,
            be = window.innerHeight,
            Lt = de / be,
            Ot = q / j;
          if (Lt > Ot) {
            let Fe = be / j,
              Se = (de - q * Fe) / 2;
            (v.x = Ze(c.offsetX - Se, 0, q * Fe, 0, q)),
              (v.y = Ze(c.offsetY, 0, j * Fe, 0, j));
          } else {
            let Fe = de / q,
              Se = (be - j * Fe) / 2;
            (v.x = Ze(c.offsetX, 0, q * Fe, 0, q)),
              (v.y = Ze(c.offsetY - Se, 0, j * Fe, 0, j));
          }
        }
        e.events.onOnce("input", () => {
          (e.isMouseMoved = !0),
            (e.mousePos = v),
            (e.mouseDeltaPos = R),
            e.events.trigger("mouseMove");
        });
      };
      let Qe = ["left", "middle", "right", "back", "forward"];
      (ie.mousedown = (c) => {
        e.events.onOnce("input", () => {
          let v = Qe[c.button];
          v && (e.mouseState.press(v), e.events.trigger("mousePress", v));
        });
      }),
        (ie.mouseup = (c) => {
          e.events.onOnce("input", () => {
            let v = Qe[c.button];
            v && (e.mouseState.release(v), e.events.trigger("mouseRelease", v));
          });
        });
      let or = new Set([
          " ",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Tab",
        ]),
        Le = {
          ArrowLeft: "left",
          ArrowRight: "right",
          ArrowUp: "up",
          ArrowDown: "down",
          " ": "space",
        };
      (ie.keydown = (c) => {
        or.has(c.key) && c.preventDefault(),
          e.events.onOnce("input", () => {
            let v = Le[c.key] || c.key.toLowerCase();
            v.length === 1
              ? (e.events.trigger("charInput", v), e.charInputted.push(v))
              : v === "space" &&
                (e.events.trigger("charInput", " "), e.charInputted.push(" ")),
              c.repeat
                ? (e.keyState.pressRepeat(v),
                  e.events.trigger("keyPressRepeat", v))
                : (e.keyState.press(v),
                  e.events.trigger("keyPressRepeat", v),
                  e.events.trigger("keyPress", v));
          });
      }),
        (ie.keyup = (c) => {
          e.events.onOnce("input", () => {
            let v = Le[c.key] || c.key.toLowerCase();
            e.keyState.release(v), e.events.trigger("keyRelease", v);
          });
        }),
        (ie.touchstart = (c) => {
          c.preventDefault(),
            e.events.onOnce("input", () => {
              let v = [...c.changedTouches],
                R = e.canvas.getBoundingClientRect();
              r.touchToMouse !== !1 &&
                ((e.mousePos = new E(v[0].clientX - R.x, v[0].clientY - R.y)),
                e.mouseState.press("left"),
                e.events.trigger("mousePress", "left")),
                v.forEach((q) => {
                  e.events.trigger(
                    "touchStart",
                    new E(q.clientX - R.x, q.clientY - R.y),
                    q
                  );
                });
            });
        }),
        (ie.touchmove = (c) => {
          c.preventDefault(),
            e.events.onOnce("input", () => {
              let v = [...c.changedTouches],
                R = e.canvas.getBoundingClientRect();
              r.touchToMouse !== !1 &&
                ((e.mousePos = new E(v[0].clientX - R.x, v[0].clientY - R.y)),
                e.events.trigger("mouseMove")),
                v.forEach((q) => {
                  e.events.trigger(
                    "touchMove",
                    new E(q.clientX - R.x, q.clientY - R.y),
                    q
                  );
                });
            });
        }),
        (ie.touchend = (c) => {
          e.events.onOnce("input", () => {
            let v = [...c.changedTouches],
              R = e.canvas.getBoundingClientRect();
            r.touchToMouse !== !1 &&
              ((e.mousePos = new E(v[0].clientX - R.x, v[0].clientY - R.y)),
              e.mouseState.release("left"),
              e.events.trigger("mouseRelease", "left")),
              v.forEach((q) => {
                e.events.trigger(
                  "touchEnd",
                  new E(q.clientX - R.x, q.clientY - R.y),
                  q
                );
              });
          });
        }),
        (ie.touchcancel = (c) => {
          e.events.onOnce("input", () => {
            let v = [...c.changedTouches],
              R = e.canvas.getBoundingClientRect();
            r.touchToMouse !== !1 &&
              ((e.mousePos = new E(v[0].clientX - R.x, v[0].clientY - R.y)),
              e.mouseState.release("left"),
              e.events.trigger("mouseRelease", "left")),
              v.forEach((q) => {
                e.events.trigger(
                  "touchEnd",
                  new E(q.clientX - R.x, q.clientY - R.y),
                  q
                );
              });
          });
        }),
        (ie.wheel = (c) => {
          c.preventDefault(),
            e.events.onOnce("input", () => {
              e.events.trigger("scroll", new E(c.deltaX, c.deltaY));
            });
        }),
        (ie.contextmenu = (c) => c.preventDefault()),
        (he.visibilitychange = () => {
          document.visibilityState === "visible"
            ? ((e.skipTime = !0), e.events.trigger("show"))
            : e.events.trigger("hide");
        }),
        (ne.gamepadconnected = (c) => {
          let v = At(c.gamepad);
          e.events.onOnce("input", () => {
            e.events.trigger("gamepadConnect", v);
          });
        }),
        (ne.gamepaddisconnected = (c) => {
          let v = wt().filter((R) => R.index === c.gamepad.index)[0];
          ee(c.gamepad),
            e.events.onOnce("input", () => {
              e.events.trigger("gamepadDisconnect", v);
            });
        });
      for (let c in ie) e.canvas.addEventListener(c, ie[c]);
      for (let c in he) document.addEventListener(c, he[c]);
      for (let c in ne) window.addEventListener(c, ne[c]);
      let we = new ResizeObserver((c) => {
        for (let v of c)
          if (v.target === e.canvas) {
            if (
              e.lastWidth === e.canvas.offsetWidth &&
              e.lastHeight === e.canvas.offsetHeight
            )
              return;
            (e.lastWidth = e.canvas.offsetWidth),
              (e.lastHeight = e.canvas.offsetHeight),
              e.events.onOnce("input", () => {
                e.events.trigger("resize");
              });
          }
      });
      return (
        we.observe(e.canvas),
        {
          dt: h,
          time: u,
          run: U,
          canvas: e.canvas,
          fps: f,
          numFrames: A,
          quit: re,
          setFullscreen: W,
          isFullscreen: ue,
          setCursor: D,
          screenshot: M,
          getGamepads: wt,
          getCursor: H,
          setCursorLocked: V,
          isCursorLocked: Z,
          isTouchscreen: ce,
          mousePos: S,
          mouseDeltaPos: Te,
          isKeyDown: lt,
          isKeyPressed: je,
          isKeyPressedRepeat: Rt,
          isKeyReleased: ut,
          isMouseDown: Ee,
          isMousePressed: Y,
          isMouseReleased: me,
          isMouseMoved: ye,
          isGamepadButtonPressed: dt,
          isGamepadButtonDown: Ge,
          isGamepadButtonReleased: Mt,
          getGamepadStick: Pe,
          charInputted: it,
          onResize: Tt,
          onKeyDown: rr,
          onKeyPress: ir,
          onKeyPressRepeat: sr,
          onKeyRelease: nr,
          onMouseDown: Pt,
          onMousePress: Bt,
          onMouseRelease: Ft,
          onMouseMove: ct,
          onCharInput: ft,
          onTouchStart: It,
          onTouchMove: et,
          onTouchEnd: kt,
          onScroll: Dt,
          onHide: pt,
          onShow: Ct,
          onGamepadButtonDown: gt,
          onGamepadButtonPress: mt,
          onGamepadButtonRelease: Nt,
          onGamepadStick: tt,
          onGamepadConnect: Ut,
          onGamepadDisconnect: rt,
          events: e.events,
        }
      );
    }, "default"),
    ht = class mn {
      static {
        n(this, "Texture");
      }
      ctx;
      src = null;
      glTex;
      width;
      height;
      constructor(e, h, u, f = {}) {
        this.ctx = e;
        let A = e.gl;
        (this.glTex = e.gl.createTexture()),
          e.onDestroy(() => this.free()),
          (this.width = h),
          (this.height = u);
        let M =
            { linear: A.LINEAR, nearest: A.NEAREST }[
              f.filter ?? e.opts.texFilter
            ] ?? A.NEAREST,
          D =
            { repeat: A.REPEAT, clampToEadge: A.CLAMP_TO_EDGE }[f.wrap] ??
            A.CLAMP_TO_EDGE;
        this.bind(),
          h &&
            u &&
            A.texImage2D(
              A.TEXTURE_2D,
              0,
              A.RGBA,
              h,
              u,
              0,
              A.RGBA,
              A.UNSIGNED_BYTE,
              null
            ),
          A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MIN_FILTER, M),
          A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MAG_FILTER, M),
          A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_S, D),
          A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_T, D),
          this.unbind();
      }
      static fromImage(e, h, u = {}) {
        let f = new mn(e, h.width, h.height, u);
        return f.update(h), (f.src = h), f;
      }
      update(e, h = 0, u = 0) {
        let f = this.ctx.gl;
        this.bind(),
          f.texSubImage2D(f.TEXTURE_2D, 0, h, u, f.RGBA, f.UNSIGNED_BYTE, e),
          this.unbind();
      }
      bind() {
        this.ctx.pushTexture2D(this.glTex);
      }
      unbind() {
        this.ctx.popTexture2D();
      }
      free() {
        this.ctx.gl.deleteTexture(this.glTex);
      }
    },
    fr = class {
      static {
        n(this, "FrameBuffer");
      }
      ctx;
      tex;
      glFramebuffer;
      glRenderbuffer;
      constructor(r, e, h, u = {}) {
        this.ctx = r;
        let f = r.gl;
        r.onDestroy(() => this.free()),
          (this.tex = new ht(r, e, h, u)),
          (this.glFramebuffer = f.createFramebuffer()),
          (this.glRenderbuffer = f.createRenderbuffer()),
          this.bind(),
          f.renderbufferStorage(f.RENDERBUFFER, f.DEPTH_STENCIL, e, h),
          f.framebufferTexture2D(
            f.FRAMEBUFFER,
            f.COLOR_ATTACHMENT0,
            f.TEXTURE_2D,
            this.tex.glTex,
            0
          ),
          f.framebufferRenderbuffer(
            f.FRAMEBUFFER,
            f.DEPTH_STENCIL_ATTACHMENT,
            f.RENDERBUFFER,
            this.glRenderbuffer
          ),
          this.unbind();
      }
      get width() {
        return this.tex.width;
      }
      get height() {
        return this.tex.height;
      }
      toImageData() {
        let r = this.ctx.gl,
          e = new Uint8ClampedArray(this.width * this.height * 4);
        this.bind(),
          r.readPixels(
            0,
            0,
            this.width,
            this.height,
            r.RGBA,
            r.UNSIGNED_BYTE,
            e
          ),
          this.unbind();
        let h = this.width * 4,
          u = new Uint8Array(h);
        for (let f = 0; f < ((this.height / 2) | 0); f++) {
          let A = f * h,
            M = (this.height - f - 1) * h;
          u.set(e.subarray(A, A + h)), e.copyWithin(A, M, M + h), e.set(u, M);
        }
        return new ImageData(e, this.width, this.height);
      }
      toDataURL() {
        let r = document.createElement("canvas"),
          e = r.getContext("2d");
        return (
          (r.width = this.width),
          (r.height = this.height),
          e.putImageData(this.toImageData(), 0, 0),
          r.toDataURL()
        );
      }
      draw(r) {
        this.bind(), r(), this.unbind();
      }
      bind() {
        this.ctx.pushFramebuffer(this.glFramebuffer),
          this.ctx.pushRenderbuffer(this.glRenderbuffer),
          this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height });
      }
      unbind() {
        this.ctx.popFramebuffer(),
          this.ctx.popRenderbuffer(),
          this.ctx.popViewport();
      }
      free() {
        let r = this.ctx.gl;
        r.deleteFramebuffer(this.glFramebuffer),
          r.deleteRenderbuffer(this.glRenderbuffer),
          this.tex.free();
      }
    },
    $n = class {
      static {
        n(this, "Shader");
      }
      ctx;
      glProgram;
      constructor(r, e, h, u) {
        (this.ctx = r), r.onDestroy(() => this.free());
        let f = r.gl,
          A = f.createShader(f.VERTEX_SHADER),
          M = f.createShader(f.FRAGMENT_SHADER);
        f.shaderSource(A, e),
          f.shaderSource(M, h),
          f.compileShader(A),
          f.compileShader(M);
        let D = f.createProgram();
        if (
          ((this.glProgram = D),
          f.attachShader(D, A),
          f.attachShader(D, M),
          u.forEach((H, V) => f.bindAttribLocation(D, V, H)),
          f.linkProgram(D),
          !f.getProgramParameter(D, f.LINK_STATUS))
        ) {
          let H = f.getShaderInfoLog(A);
          if (H) throw new Error("VERTEX SHADER " + H);
          let V = f.getShaderInfoLog(M);
          if (V) throw new Error("FRAGMENT SHADER " + V);
        }
        f.deleteShader(A), f.deleteShader(M);
      }
      bind() {
        this.ctx.pushProgram(this.glProgram);
      }
      unbind() {
        this.ctx.popProgram();
      }
      send(r) {
        let e = this.ctx.gl;
        for (let h in r) {
          let u = r[h],
            f = e.getUniformLocation(this.glProgram, h);
          typeof u == "number"
            ? e.uniform1f(f, u)
            : u instanceof Ne
            ? e.uniformMatrix4fv(f, !1, new Float32Array(u.m))
            : u instanceof te
            ? e.uniform3f(f, u.r, u.g, u.b)
            : u instanceof E && e.uniform2f(f, u.x, u.y);
        }
      }
      free() {
        this.ctx.gl.deleteProgram(this.glProgram);
      }
    },
    eo = class {
      static {
        n(this, "BatchRenderer");
      }
      ctx;
      glVBuf;
      glIBuf;
      vqueue = [];
      iqueue = [];
      stride;
      maxVertices;
      maxIndices;
      vertexFormat;
      numDraws = 0;
      curPrimitive = null;
      curTex = null;
      curShader = null;
      curUniform = {};
      constructor(r, e, h, u) {
        let f = r.gl;
        (this.vertexFormat = e),
          (this.ctx = r),
          (this.stride = e.reduce((A, M) => A + M.size, 0)),
          (this.maxVertices = h),
          (this.maxIndices = u),
          (this.glVBuf = f.createBuffer()),
          r.pushArrayBuffer(this.glVBuf),
          f.bufferData(f.ARRAY_BUFFER, h * 4, f.DYNAMIC_DRAW),
          r.popArrayBuffer(),
          (this.glIBuf = f.createBuffer()),
          r.pushElementArrayBuffer(this.glIBuf),
          f.bufferData(f.ELEMENT_ARRAY_BUFFER, u * 4, f.DYNAMIC_DRAW),
          r.popElementArrayBuffer();
      }
      push(r, e, h, u, f = null, A = {}) {
        (r !== this.curPrimitive ||
          f !== this.curTex ||
          u !== this.curShader ||
          !xr(this.curUniform, A) ||
          this.vqueue.length + e.length * this.stride > this.maxVertices ||
          this.iqueue.length + h.length > this.maxIndices) &&
          this.flush();
        let M = this.vqueue.length / this.stride;
        for (let D of e) this.vqueue.push(D);
        for (let D of h) this.iqueue.push(D + M);
        (this.curPrimitive = r),
          (this.curShader = u),
          (this.curTex = f),
          (this.curUniform = A);
      }
      flush() {
        if (
          !this.curPrimitive ||
          !this.curShader ||
          this.vqueue.length === 0 ||
          this.iqueue.length === 0
        )
          return;
        let r = this.ctx.gl;
        this.ctx.pushArrayBuffer(this.glVBuf),
          r.bufferSubData(r.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)),
          this.ctx.pushElementArrayBuffer(this.glIBuf),
          r.bufferSubData(
            r.ELEMENT_ARRAY_BUFFER,
            0,
            new Uint16Array(this.iqueue)
          ),
          this.ctx.setVertexFormat(this.vertexFormat),
          this.curShader.bind(),
          this.curShader.send(this.curUniform),
          this.curTex?.bind(),
          r.drawElements(
            this.curPrimitive,
            this.iqueue.length,
            r.UNSIGNED_SHORT,
            0
          ),
          this.curTex?.unbind(),
          this.curShader.unbind(),
          this.ctx.popArrayBuffer(),
          this.ctx.popElementArrayBuffer(),
          (this.vqueue = []),
          (this.iqueue = []),
          this.numDraws++;
      }
      free() {
        let r = this.ctx.gl;
        r.deleteBuffer(this.glVBuf), r.deleteBuffer(this.glIBuf);
      }
    };
  function We(r) {
    let e = [],
      h = n((A) => {
        e.push(A), r(A);
      }, "push"),
      u = n(() => {
        e.pop(), r(f() ?? null);
      }, "pop"),
      f = n(() => e[e.length - 1], "cur");
    return [h, u, f];
  }
  n(We, "genStack");
  function wn(r, e = {}) {
    let h = [];
    function u(Y) {
      h.push(Y);
    }
    n(u, "onDestroy");
    function f() {
      h.forEach((Y) => Y()), r.getExtension("WEBGL_lose_context").loseContext();
    }
    n(f, "destroy");
    let A = null;
    function M(Y) {
      if (xr(Y, A)) return;
      A = Y;
      let Ee = Y.reduce((me, ye) => me + ye.size, 0);
      Y.reduce(
        (me, ye, je) => (
          r.vertexAttribPointer(je, ye.size, r.FLOAT, !1, Ee * 4, me),
          r.enableVertexAttribArray(je),
          me + ye.size * 4
        ),
        0
      );
    }
    n(M, "setVertexFormat");
    let [D, H] = We((Y) => r.bindTexture(r.TEXTURE_2D, Y)),
      [V, Z] = We((Y) => r.bindBuffer(r.ARRAY_BUFFER, Y)),
      [b, K] = We((Y) => r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, Y)),
      [y, W] = We((Y) => r.bindFramebuffer(r.FRAMEBUFFER, Y)),
      [ue, re] = We((Y) => r.bindRenderbuffer(r.RENDERBUFFER, Y)),
      [U, ce] = We(({ x: Y, y: Ee, w: me, h: ye }) => {
        r.viewport(Y, Ee, me, ye);
      }),
      [S, Te] = We((Y) => r.useProgram(Y));
    return (
      U({ x: 0, y: 0, w: r.drawingBufferWidth, h: r.drawingBufferHeight }),
      {
        gl: r,
        opts: e,
        onDestroy: u,
        destroy: f,
        pushTexture2D: D,
        popTexture2D: H,
        pushArrayBuffer: V,
        popArrayBuffer: Z,
        pushElementArrayBuffer: b,
        popElementArrayBuffer: K,
        pushFramebuffer: y,
        popFramebuffer: W,
        pushRenderbuffer: ue,
        popRenderbuffer: re,
        pushViewport: U,
        popViewport: ce,
        pushProgram: S,
        popProgram: Te,
        setVertexFormat: M,
      }
    );
  }
  n(wn, "initGfx");
  var Be = class An {
      static {
        n(this, "Asset");
      }
      loaded = !1;
      data = null;
      error = null;
      onLoadEvents = new ke();
      onErrorEvents = new ke();
      onFinishEvents = new ke();
      constructor(e) {
        e.then((h) => {
          (this.data = h), this.onLoadEvents.trigger(h);
        })
          .catch((h) => {
            if (((this.error = h), this.onErrorEvents.numListeners() > 0))
              this.onErrorEvents.trigger(h);
            else throw h;
          })
          .finally(() => {
            this.onFinishEvents.trigger(), (this.loaded = !0);
          });
      }
      static loaded(e) {
        let h = new An(Promise.resolve(e));
        return (h.data = e), (h.loaded = !0), h;
      }
      onLoad(e) {
        return (
          this.loaded && this.data ? e(this.data) : this.onLoadEvents.add(e),
          this
        );
      }
      onError(e) {
        return (
          this.loaded && this.error ? e(this.error) : this.onErrorEvents.add(e),
          this
        );
      }
      onFinish(e) {
        return this.loaded ? e() : this.onFinishEvents.add(e), this;
      }
      then(e) {
        return this.onLoad(e);
      }
      catch(e) {
        return this.onError(e);
      }
      finally(e) {
        return this.onFinish(e);
      }
    },
    yt = class {
      static {
        n(this, "AssetBucket");
      }
      assets = new Map();
      lastUID = 0;
      add(r, e) {
        let h = r ?? this.lastUID++ + "",
          u = new Be(e);
        return this.assets.set(h, u), u;
      }
      addLoaded(r, e) {
        let h = r ?? this.lastUID++ + "",
          u = Be.loaded(e);
        return this.assets.set(h, u), u;
      }
      get(r) {
        return this.assets.get(r);
      }
      progress() {
        if (this.assets.size === 0) return 1;
        let r = 0;
        return (
          this.assets.forEach((e) => {
            e.loaded && r++;
          }),
          r / this.assets.size
        );
      }
    };
  function Sr(r) {
    return fetch(r).then((e) => {
      if (!e.ok) throw new Error(`Failed to fetch "${r}"`);
      return e;
    });
  }
  n(Sr, "fetchURL");
  function Zt(r) {
    return Sr(r).then((e) => e.json());
  }
  n(Zt, "fetchJSON");
  function Vn(r) {
    return Sr(r).then((e) => e.text());
  }
  n(Vn, "fetchText");
  function vn(r) {
    return Sr(r).then((e) => e.arrayBuffer());
  }
  n(vn, "fetchArrayBuffer");
  function _t(r) {
    let e = new Image();
    return (
      (e.crossOrigin = "anonymous"),
      (e.src = r),
      new Promise((h, u) => {
        (e.onload = () => h(e)),
          (e.onerror = () => u(new Error(`Failed to load image from "${r}"`)));
      })
    );
  }
  n(_t, "loadImg");
  var pr = 2.5949095,
    Is = 1.70158 + 1,
    ks = (2 * Math.PI) / 3,
    Ds = (2 * Math.PI) / 4.5,
    yr = {
      linear: (r) => r,
      easeInSine: (r) => 1 - Math.cos((r * Math.PI) / 2),
      easeOutSine: (r) => Math.sin((r * Math.PI) / 2),
      easeInOutSine: (r) => -(Math.cos(Math.PI * r) - 1) / 2,
      easeInQuad: (r) => r * r,
      easeOutQuad: (r) => 1 - (1 - r) * (1 - r),
      easeInOutQuad: (r) =>
        r < 0.5 ? 2 * r * r : 1 - Math.pow(-2 * r + 2, 2) / 2,
      easeInCubic: (r) => r * r * r,
      easeOutCubic: (r) => 1 - Math.pow(1 - r, 3),
      easeInOutCubic: (r) =>
        r < 0.5 ? 4 * r * r * r : 1 - Math.pow(-2 * r + 2, 3) / 2,
      easeInQuart: (r) => r * r * r * r,
      easeOutQuart: (r) => 1 - Math.pow(1 - r, 4),
      easeInOutQuart: (r) =>
        r < 0.5 ? 8 * r * r * r * r : 1 - Math.pow(-2 * r + 2, 4) / 2,
      easeInQuint: (r) => r * r * r * r * r,
      easeOutQuint: (r) => 1 - Math.pow(1 - r, 5),
      easeInOutQuint: (r) =>
        r < 0.5 ? 16 * r * r * r * r * r : 1 - Math.pow(-2 * r + 2, 5) / 2,
      easeInExpo: (r) => (r === 0 ? 0 : Math.pow(2, 10 * r - 10)),
      easeOutExpo: (r) => (r === 1 ? 1 : 1 - Math.pow(2, -10 * r)),
      easeInOutExpo: (r) =>
        r === 0
          ? 0
          : r === 1
          ? 1
          : r < 0.5
          ? Math.pow(2, 20 * r - 10) / 2
          : (2 - Math.pow(2, -20 * r + 10)) / 2,
      easeInCirc: (r) => 1 - Math.sqrt(1 - Math.pow(r, 2)),
      easeOutCirc: (r) => Math.sqrt(1 - Math.pow(r - 1, 2)),
      easeInOutCirc: (r) =>
        r < 0.5
          ? (1 - Math.sqrt(1 - Math.pow(2 * r, 2))) / 2
          : (Math.sqrt(1 - Math.pow(-2 * r + 2, 2)) + 1) / 2,
      easeInBack: (r) => Is * r * r * r - 1.70158 * r * r,
      easeOutBack: (r) =>
        1 + Is * Math.pow(r - 1, 3) + 1.70158 * Math.pow(r - 1, 2),
      easeInOutBack: (r) =>
        r < 0.5
          ? (Math.pow(2 * r, 2) * ((pr + 1) * 2 * r - pr)) / 2
          : (Math.pow(2 * r - 2, 2) * ((pr + 1) * (r * 2 - 2) + pr) + 2) / 2,
      easeInElastic: (r) =>
        r === 0
          ? 0
          : r === 1
          ? 1
          : -Math.pow(2, 10 * r - 10) * Math.sin((r * 10 - 10.75) * ks),
      easeOutElastic: (r) =>
        r === 0
          ? 0
          : r === 1
          ? 1
          : Math.pow(2, -10 * r) * Math.sin((r * 10 - 0.75) * ks) + 1,
      easeInOutElastic: (r) =>
        r === 0
          ? 0
          : r === 1
          ? 1
          : r < 0.5
          ? -(Math.pow(2, 20 * r - 10) * Math.sin((20 * r - 11.125) * Ds)) / 2
          : (Math.pow(2, -20 * r + 10) * Math.sin((20 * r - 11.125) * Ds)) / 2 +
            1,
      easeInBounce: (r) => 1 - yr.easeOutBounce(1 - r),
      easeOutBounce: (r) =>
        r < 1 / 2.75
          ? 7.5625 * r * r
          : r < 2 / 2.75
          ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75
          : r < 2.5 / 2.75
          ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375
          : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375,
      easeInOutBounce: (r) =>
        r < 0.5
          ? (1 - yr.easeOutBounce(1 - 2 * r)) / 2
          : (1 + yr.easeOutBounce(2 * r - 1)) / 2,
    },
    gr = yr,
    to = class {
      static {
        n(this, "TexPacker");
      }
      textures = [];
      canvas;
      c2d;
      x = 0;
      y = 0;
      curHeight = 0;
      gfx;
      constructor(r, e, h) {
        (this.gfx = r),
          (this.canvas = document.createElement("canvas")),
          (this.canvas.width = e),
          (this.canvas.height = h),
          (this.textures = [ht.fromImage(r, this.canvas)]),
          (this.c2d = this.canvas.getContext("2d"));
      }
      add(r) {
        if (r.width > this.canvas.width || r.height > this.canvas.height)
          throw new Error(
            `Texture size (${r.width} x ${r.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`
          );
        this.x + r.width > this.canvas.width &&
          ((this.x = 0), (this.y += this.curHeight), (this.curHeight = 0)),
          this.y + r.height > this.canvas.height &&
            (this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height),
            this.textures.push(ht.fromImage(this.gfx, this.canvas)),
            (this.x = 0),
            (this.y = 0),
            (this.curHeight = 0));
        let e = this.textures[this.textures.length - 1],
          h = new E(this.x, this.y);
        return (
          (this.x += r.width),
          r.height > this.curHeight && (this.curHeight = r.height),
          r instanceof ImageData
            ? this.c2d.putImageData(r, h.x, h.y)
            : this.c2d.drawImage(r, h.x, h.y),
          e.update(this.canvas),
          [
            e,
            new ge(
              h.x / this.canvas.width,
              h.y / this.canvas.height,
              r.width / this.canvas.width,
              r.height / this.canvas.height
            ),
          ]
        );
      }
      free() {
        for (let r of this.textures) r.free();
      }
    },
    ro =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==",
    io = On(
      "SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwPj4+Pj4+TExMTExZWVlZWVlnZ2dnZ3V1dXV1dYODg4ODkZGRkZGRn5+fn5+frKysrKy6urq6urrIyMjIyNbW1tbW1uTk5OTk8vLy8vLy//////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAAAAAAAP/7kGQAAANUMEoFPeACNQV40KEYABEY41g5vAAA9RjpZxRwAImU+W8eshaFpAQgALAAYALATx/nYDYCMJ0HITQYYA7AH4c7MoGsnCMU5pnW+OQnBcDrQ9Xx7w37/D+PimYavV8elKUpT5fqx5VjV6vZ38eJR48eRKa9KUp7v396UgPHkQwMAAAAAA//8MAOp39CECAAhlIEEIIECBAgTT1oj///tEQYT0wgEIYxgDC09aIiE7u7u7uIiIz+LtoIQGE/+XAGYLjpTAIOGYYy0ZACgDgSNFxC7YYiINocwERjAEDhIy0mRoGwAE7lOTBsGhj1qrXNCU9GrgwSPr80jj0dIpT9DRUNHKJbRxiWSiifVHuD2b0EbjLkOUzSXztP3uE1JpHzV6NPq+f3P5T0/f/lNH7lWTavQ5Xz1yLVe653///qf93B7f/vMdaKJAAJAMAIwIMAHMpzDkoYwD8CR717zVb8/p54P3MikXGCEWhQOEAOAdP6v8b8oNL/EzdnROC8Zo+z+71O8VVAGIKFEglKbidkoLam0mAFiwo0ZoVExf/7kmQLgAQyZFxvPWAENcVKXeK0ABAk2WFMaSNIzBMptBYfArbkZgpWjEQpcmjxQoG2qREWQcvpzuuIm29THt3ElhDNlrXV///XTGbm7Kbx0ymcRX///x7GVvquf5vk/dPs0Wi5Td1vggDxqbNII4bAPTU3Ix5h9FJTe7zv1LHG/uPsPrvth0ejchVzVT3giirs6sQAACgQAAIAdaXbRAYra/2t0//3HwqLKIlBOJhOg4BzAOkt+MOL6H8nlNvKyi3rOnqP//zf6AATwBAKIcHKixxwjl1TjDVIrvTqdmKQOFQBUBDwZ1EhHlDEGEVyGQWBAHrcJgRSXYbkvHK/8/6rbYjs4Qj0C8mRy2hwRv/82opGT55fROgRoBTjanaiQiMRHUu1/P3V9yGFffaVv78U1/6l/kpo0cz73vuSv/9GeaqDVRA5bWdHRKQKIEAAAAoIktKeEmdQFKN5sguv/ZSC0oxCAR7CzcJgEsd8cA0M/x0tzv15E7//5L5KCqoIAAmBFIKM1UxYtMMFjLKESTE8lhaelUyCBYeA2IN4rK1iDt//+5JkEgAkZzlVq29D8DJDWo0YLLARwPFZrL0PyLsUazTAlpI+hKSx01VSOfbjXg0iW9/jVPDleLJ15QQA4Okdc5ByMDFIeuCCE5CvevwBGH8YibiX9FtaIIgUikF42wrZw6ZJ6WlHrA+Ki5++NNMeYH1lEkwwJAIJB4ugVFguXFc20Vd/FLlvq1GSiSwAFABABABA47k6BFeNvxEQZO9v3L1IE4iEVElfrXmEmlyWIyGslFA55gH/sW7////o9AAFIBIIAAIUMzYTTNkgsAmYObfwQyzplrOmYvq0BKCKNN+nUTbvD7cJzvHxrEWG5QqvP8U1vFx6CwE8NoRc2ADBeEb/HoXh60N7ST8nw9QiiGoYvf/r6GtC9+vLwXHjaSkIp3iupC5+Nii81Zhu85pNYbFvrf+UFThDOYYY26off+W6b//73GTiN9xDfl0AAwBAiMBO8qsDBPOZtuT/dTbjVVbY/KSGH6ppHwKv/6X+s8gUCN/lODzv////GQAGAMQAADlXAUCBJiY0wFQZusYQOaQzaTwDBTcx0IvVp8m7uxKp//uSZBMCBHRI1eNPLHAyxNqWGeoYUIEnWYyxD8DUFSn0l6iojcd+oEOkzV6uWqyHNzjqmv+7V5xGUfY9yEmbziTzjRscm9OqFQp1PKFrqu3PX/7YuGtDU6bt0OUTpv38rdc+37dVDQLKUchaJ853E9edNDGqWwsYz1VoiSStEJtZvw6+sNqFWqaIXJjQCGAAGWAYVwmag/x3BRJw1wYF7IzVqDcNzn85d//FzK7IgwbQwccLoB4AsF8Nj/1ESRUAAVJwAFh0YOFEhmSJEHKQRDyhszgLUpHIgFrb5cySFg5jv10ImlYuvaaGBItfXqnNPmic+XNkmb5fW49vdhq97nQMQyGIlM2v8oQSrxKSxE4F1WqrduqvuJCRof1R7Gsre9KszUVF1/t3PzH2tnp+iSUG3rDwGNcDzxCGA8atuQF0paZAAkAhAQAEAC240yJV+nJgUrqq8axAYtVpYjZyFGb13/17jwiClQDaCdytZpyHHf1R/EG/+lUAgAAAChhmJvioVGGBCFgqdpsGAkUUrbTstwTCJgLQpFIsELW7t/68Iv/7kmQUgAQ9NFO9aeAAPAU6RKwUABClY2e5hoARGpDvPydCAsY8WO10fSvUOnfT98+n/l/6/+hxslhQ1DEOaevNKGocvIYba8WJpaP/15pX0NQ1DUNn/////k6lPp/N61rBi8RJFfERV3IgrqDsJA64sjCoKxDDQ9xEcWDpMBDwVFDIAEIAAzryxsjGi4q/oWpixKjhklAF4pUrDPjFhFVupDFZ/t/t0YPAygUBhADPR/KLCKJ8h2Oxhpxz/zNRAAFl0MAZLAYEAiVbEiz36LSgZ5QoQVat69KNy8FyM5Z80ACHAzgnISEkxUSJIDyBSwi5KF4mjBl4xJdbrG9ComLrL8YATiodhQKCkj6ROdyg1y5XmZlvMVmpJzYppJDwLi/Lp9vT3TfmimOGpuezi2U/9FNav0zX9Oja2r//8+hvuihuQAAMAVmqFgAgCcuboAEAAAUcqy8ca0BHBmwbFkED0CNA1YYDPkhcQrRJxcY3BzfxxltAz9vX62Xl3plAzWmRO+FkZyH///1qAAEjQBAACUpgU5o2AIBmFBGMamrGg0b/+5JkC4ADxyLWb2ngAEEkGofsoACP7U1JLaxTkOqFaKhspGgnW3SGC56ZgUJGCRnLOmIJAkuNBgvwU4Ocf8CJK9UsafH9/Frj///365XSoME+DZMw5UNjrMbVoeIj9EL91IuQ5KHyl5V2LCpdIdESgafOHxVGkAlkHuakmix/gN8+BP/sKguLAAoAtUjtvaoeEADwr3OK11E4KBlojgeQNQBJ4MvCAd/4t/xMMzeLhQGQ1//6tQu5BaBOGCT6U4aafvXZ//4iAPAAAAbLkgIlQmMSLA2H1CVNAlWwyVvKIQIxOSK1NWxs4MBUATlKrAkIMPAjCAdS6MVFzuURWa/+/qQWEGsA6EEpiBEJb9Q21lAHoBoD0B6aAPhyt+bG3muoXIN3RLadXxUfr/ohjGFF/p97eqNI5noKAqYLNPpUTDSI9/TmA6B+YAAADgA0Y4lxTW1SQfOQuDDDI0KTTuIrF5qoJrUFhUFAsg+AT2hbkaRZYGIjBKVDIa5VgNN/9P/rCDsBJbYJRKpCA1ArAkigIeYY61AjE+jubyiZFZ3+L789//uSZBCABHVj2entNmw1JXokLycYEFTFVa0wz4DYjKs08J2Q+r4n3lgbWaaMwMLEjFW88F39brqPF83cv1mCSJeY3Q2uiQxhBJxCBeR1D2LQRsYQcZUTzdNll8+OwZBsIwSgl45ymaHX603Mz7JmZuvt71GDTN66zev/+cLn/b5imV8pAHkg61FIJchBSG+zycgAZgADD6F1iQQRXRWmWS6bDIIgyBCZEcdl/KgXGmVKFv/vl8ry/5bLypf//U5jhYDhL9X/pAA0AKBIAAKgGtGXGGWJgEoF2JNsHlKfSKLRhGBAgIuWZKIJCFpF1VBhkB+EfzEyMUJdWuMrEZoPZ5BfF3/Nu62riIdjoO4AAKD2sTrDmpZZaYysf/810TitAVvn9xtFucieiaEy54YqiIO6RqkGAm5wVO0bFB0sDTdNxYGekKktR4KAAfAwUIgI8Ci6aXgtwbhPWAC+CKExAFydNtYGXNZoQjUsXv/9vKjgmdwieb+h7kHvPoc//0FaCACAATKFC4Y9ammklidbaiJNPBhGWTNhFSgdtalK12lpl//7kmQRAFN2NFI7TBvwNKNaTRsFGBWdfV2tPNcYvBHpgPKJsc8IUcTCxY3HSvUVNTWe/Z3YWlrJ0yrNRUiT19aprA7E+mPP+ZmC3/CsheOJXhc/9VJb3UZnphUBcqZUZQth1i3XqtPYu2Sy1s8DV9ZYACAAASAAHgFkQcOqgB5utFHFh3kSi4USs0yk4iOClREmjvdG+upaiLcRA6/9QGbOfxF/8sEAQAVG0G07YFMihKR4EXJCkRdX9isueLqUMRAQdhDZmv3KeR0nPqRVrZmSIXDt+BBSR7qqbKQcB98W9qiMb55preHIStxFWPE4lAyI+BKz2iSxonpvMR5DgKxTH6vGGXAbYCaAnJUW4W07EesQqbfqdbo4qNnPxSpn1H8eahszc/y9//dn1V7D/OYpn1szQKAPXTMlO/rO//u7JriJXbld7aP33v6RXYg/COIDzTWkTspg6Ay1YaDSwKxrP/LfIikHjmO871POf/kEAseAgoPEi9/0ZziNwfxVKy9qAEGEEAAq1EcOamDEGHAA0iao8k31rz2MiLNEik6VQ37/+5JkEAgEYU5WU0M3MDjDe0o9IjiOzSVM7aCzEM2GqXD8pFB0zxMcHCQNHtZD+R+pMWZxOJ/otEZTvVN/MeU12xTVcL+f2YaiNJTVoPd6SvzEnKel5GXOzEaazgdChnP2jOAwpfyRpVlQwoJBwpN1L1DL////6TVWcoepf7CVWrpEWiym5lR5U0BSMlxQC4qByOyQIAEuJfIriWixDqRgMfVZWuvRowjR9BzP5lZlT/+YG50CsSBG////////liXDQVMxEaBkbzKAAACnDIAstY7iK7gGSF7SIDexaTtPOHABk9YcmJEACmo50pgWal22etroBpYoVqtU6OPqvlf0c4QCAfLk9P/FJs4KCQMf6ECZyA6BwqqyJ0rMYj56k1/UlTIx1V3Rt5NF71D4qlptDC8VMgQVHFDlQnDFi06qQgKQAAIK4TxxJGFGYJuZNGXRdpq7IW/DYpPIQRFJLAc+qn1E0XYdOkQVJT+z8Lvff//8vbKAWTIBBUUdM6cOhlDry7x4dAkJXIBhbO3HSMMMGBQ9K9/JNfu09PjTO64wYEcR//uSZBeABP5g11NPRVwzQ4r8PMJVj7j9UU2wUwDPjeq0Z5w675D9+uDdL2QsuIry2lZtwn/pJYyRRjANEOQxNWw8mU7Tq+vueV7JrX/Pg7VIkEuZT5dwd85MVoq5lpStNICkBAcFR88//58KO8Zjt2PIGxWl1cVfXeNGH18SReNT//hYliWtQuNluxyxONbm4U+lpkAgpyE7yAIYUjIaqHmARJ0GQTtmH60xdwFp/u253XBCxD0f/lBcguCALn//Y5nqEv//1h4BAAwgAA5gcHmpIplgeW9fAOM6RFZUywrsGAiRmKkanQnCFBjYoPDS7bjwtPTkVI8D/P8VVLcTUz65n7PW2s3tNYHgEul4tBaIz0A9RgJAyAMI4/i0fpQKjhX9S+qIa0vmc4CZit/0/3UTDGeKNpkk0nu2rUE2ag8WErhE/kgAiQCJKQEYBA5Wn6CxHoIUh6dQ46nLIuwFk4S/LaDQxXu7Yf/pf//lwJB0S/Ff/4C///EiBEiAAAIAMnpngiIABAdMpKigkXaUwhLEGvpiofmXW57h2XAZO3CMRv/7kmQUAEOHQlHraRTQMkQp6GWFZBTVU1lNPTPYyIyocYeUoNgLBWAs1jPkTv/tXBaeZ/tbD/nAGP8/xT0SNEi5zof0KIVEzVe9r5lZOol7kyaXMYS4J/ZS3djp//UaeVyR0mUMlTgfz8XqMzIEgAQQ6UNQ1DSE0/C16OvyaocF4ijAGFci0FSYqCUSaWs6t9F6/699DKvMgMoK1//kSbvxtyBN27I7mdXgNMAW75sRU1UwUHYG5axI2tFIFpkgx7nnK+1JmRKjqeAd5Ph0QAL4QAnirmiPlg0yBDlrb/d3ngtA65rb999+8vdDCfnJuJAYIl285zklpVbrKpk1PEzrOY9NZUgyz6OiOsKt5qG/g2ibxSZ+/eTI/NB8n4ev//n2nIw85GAdwuJL7kYnnAbpcf1RBKH6b2U4RWP8dmWH5snsAFYwADBgAopKdzFJq4Jlmotloh/m4QpTSvJRE3nYZHephoqBhVf+P7vQ9BPlwZCP+3//+hdy5uUwS3LDEgQx4cdIgvDEBR1YqymCsSbKzRy2aQmSv+AAcAgAkvzPfuX/+5JkFQAj6VFX00Zr5DllOhhgpn4MmSs+zSRRiO8U5tWklYgSLKfs+Xheb/+6WaAQCKTztNeJ382MUltZNnjSJoFrCqB6C4mFcwJpJD4Oc8dLDXMTh9k1/rmTopfzqv9AvHWfOuZJlEvHSVMjyjpkVucKSzxJVQBgAAIo8DGqRdYCXPckFYg+dH9A/qUyljrtpxH9RJX/Z3Vv6uFkPg4M2jf3CL09QrwOrMt69n//8UFEAAMHWdhg1CcjyVBwiArOYlDL5NPY6x8ZLFBCGi6SVTKX5nqdSEFjebnv2zHdt0dj6xvORsSFzwqRNTJSZIrrlpXcURNL9WW7krBgr5jPMaGcvJ5v0N1s19CV7+7fvQfjySX2QECWUgKgeJCIif4WRBZ/6archpDkzE7oWctK3zEHP9Smeai8oeHkM6AK7pGjtOgeFv40ugqNd+Iv///uAZAMgAAAUeSWhLPpdwk3iXpBw43hOVIp1gliUOSaeZcZeZhLAH9TtD56wUpBduzLF5v5qViTH6o+I0+8Z1asaLgKVAohlpB72DgAQBQxEd3g//uSZCiAA6k0UdMPQfA+xcnBYON8E3WDVU0w1ZjPDSmo8IniHAFDNnkXF3B94gicH5d8MFw+IHZwufxOf/8gsHw+XrD4Jn8T4RAyQiABNBQg/3giEWuZ42mVFB3kkXNjhqBg1CghEUbN3/7/KBhyqNueef/MIDBClP3YRnKLiIlEFzf//0g+4zKpRIKTpqQgUtnHGFw6RSLN421iGcYapqFxny/capK9r9v+2BSy/RU1yZxa2eGaWK07ijfcxeiO3iuHJvjbXzts+Ny+XyFnsne1h0qG4mAaN6xRGaLVxKPlrri0Bg9oXGyxcw8JRBPkUzC8v451vVd9liSX85JMrmkVNwxOCwUg298////7ks//L409/hwMRIozKiIckXtjzDaAMTBcAACAwLGargPSEgEJZN/EFjfF/VKgaMYKMbwtf/T0UCGGfjfOAZ2frCigYdwh/+sGlQBxhCAAAUHkDPqOdmmUdAVYl3IhrEfR8qZFjLYEPOyzVGvm6lNUJCk2PNazwFxaijk+ZEaiTehoJGuDh6zN/EVP8BCLD/88BoY7Xv/7kmQlgBNmMtNTL0FwOGZJ/WHiKAyhJU+soE3A3JnmAa2oaCIru/+RrEHMTphxQ0X/LzoVy4gKhYl6ZUlklW7CLRVoYmgABwCRMAAMA/poCiEEYLsBVodWcVZ18+CcAfH165U4Xgh7/X1/BAQF6GN/BwQ/+D9S9P6wII//CoANYFYCBAKlGQDKhVjjylKARw2mPAtp8JjcQHggQswVsOEKsF6AIBWvmpIFdSZvRVv/LHWEy0+txMxu+VK9gEqG5pWf6GNGU4UBVkfd+bsj/6lZE0fkOpAqAOvyUO9oo+IiEtcLKOGzhhSGa4MYINHWoQsFr8zzmow0tRILkqz5/+vFxl/oZX/+qGW//xiLjR3xcGn//0QLkTQJh1UA8MAQAEXC/YxODKTDUEhrASs1512GRp+dRFFdTWIRaOXrve1eNjTNpreqQYrC9NBlQc1f8YO2po8bnH6qffuRvU7taiNF3baokE0YpmjRCHRclWBb9NCHKHpERwHRG3pqgXklq4sBpLjGvmekg8Y7SjM1FZopIM8IhB6dtMr8aKsdovh4FW//+5JkQ4CjTDdSU0gtIDiE+YBrKgwNbSVJTCBPwN8N5ZW8NKDnhRB8AXCm//KAsBUCwKU//oJQnET+UP3/zpYRocAAABJkVzzIuoLGEaDoxfsNva12EUdxhJMGFQioSg8GxKsLm8kWEmExJuNidarkk+OTXc0i2OZEq2v+tZr/MDZRS0I7LfRpHdlsiF6m/mEjk+XlK10UqtKYUwNgMx24hUtCJLfpM3ExUeKDYjClgZAzAjQ0qlNQBTsGpk9zSRkCiKkRGp572VXsPYChGvxhAuYkDYZK//jSRgto2mTf6+PJqgAAgIAAAACYZE6aZOHhYkYlcbpeYQq1RgLO4U8TIlL1sGw+iKZi5Kzc/bKT0yXrIUMES89RCWy8oWlxqIQlKANLFpT/KjUrK+UCYbZqGnjVj29aO5dzofWAskRX5eJWPi4kf/aRVjy3Wlyg2AnMYIDSTLwZUTASIzflPWUwwlUnIFMnGiyABeaXJcN91PmQJCLzmvUJkFOHCrX/+6O///IHnT4tT9YYBoNMQ09GfKIErwdwChNz1Qy5+5S/wWeY//uSZF+C03UyT2tMO0A3RRkhY20KzQjDMszhA8DjlGOBp5y4ZCS3ica52GIGiryv7FAaSDVZSXKFTiir+GvGiuK4rjgwPVTddso+W/42a4ueJJHDYtfj6YoKknnjzRgKA0fBIRZOSsprJqnoNN73ps/Z9DVgbKNbMGmRzrYBMAZCPUANkAZQ0syAC2ubK1NF90+WoesBpnhY8qwVDkNb/5Uof6//418TgElCSgAIgyAAQBHEmiaQFPIRmfAMELffpo0IflyEuAAQnSnKvwTlVlnIgOAAGS3P3IydjXPSh/CaVRqpSNCjQqDvPM+fLcuN+WgqNix6CoHomUWTT86JjziRSZ3yjnq+dIldKPU11KUuf6wAASMAAJxE+MlyktgE9UGSxjEx6RR0v1s9bWZ+EJSrGtjqUIhklG3J8eLRn/2U/nv7f///+7/6gBQgEAMUijVMwweWWMyYM/PLXuc7DptIQmBARMRCxXjEIcTNDQgSSeHpUNXO7dRSOllJPvnY7yzaO1hmUjsKvHe99fOxrabMX7mGTi5tsNkZVZLndzxse//7kmR7ABM2O0pbKTvQN4NI+WGFPA2ZESs1pYAAvA0jVrJwAHfbr/c6//vW790dzX36QNBRlDv/6QQAU3V64yUgBEAYc/lI8e5bm+Z9+j+4aaj4tFrb//iker/4a12b/V//q//9v+7vAEAAAAMqZTGd5gL4f54o6ZebKNrR/zWVYUEVYVVv8BuAV2OUT+DUQgkJ8J1Ey4ZbFCiAwgwzMSdHV4jQR+OoPWEASaPkyYq+PsQFFJCsEEJtOiUjI/+GRhtC2DnizTMXATJig9Ey/kAJMrkHGYJ8gpLjmJOYoskpav+ShRJInyGGZVJMihDi6pIxRZJJel/8iZPkYiREnyKE0akTL5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
    ),
    so =
      "data:image/png;base64,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",
    no =
      "data:image/png;base64,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",
    oo = "3000.1.17",
    Cs =
      " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
    mr = "topleft",
    Ns = 64,
    ao = "monospace",
    wr = "monospace",
    ho = 36,
    Ar = 64,
    Vr = 256,
    Us = 2048,
    Gs = 2048,
    Ls = 2048,
    Os = 2048,
    qs = 0.1,
    lo = 64,
    Wr = "linear",
    uo = 8,
    co = 4,
    hi = [
      { name: "a_pos", size: 2 },
      { name: "a_uv", size: 2 },
      { name: "a_color", size: 4 },
    ],
    fo = hi.reduce((r, e) => r + e.size, 0),
    yn = 2048,
    po = yn * 4 * fo,
    mo = yn * 6,
    wo = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`,
    Ao = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`,
    Zr = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`,
    _r = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`,
    Vo = new Set(["id", "require"]),
    vo = new Set([
      "add",
      "update",
      "draw",
      "destroy",
      "inspect",
      "drawInspect",
    ]);
  function at(r) {
    switch (r) {
      case "topleft":
        return new E(-1, -1);
      case "top":
        return new E(0, -1);
      case "topright":
        return new E(1, -1);
      case "left":
        return new E(-1, 0);
      case "center":
        return new E(0, 0);
      case "right":
        return new E(1, 0);
      case "botleft":
        return new E(-1, 1);
      case "bot":
        return new E(0, 1);
      case "botright":
        return new E(1, 1);
      default:
        return r;
    }
  }
  n(at, "anchorPt");
  function xn(r) {
    switch (r) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  n(xn, "alignPt");
  function En(r) {
    return r.createBuffer(1, 1, 44100);
  }
  n(En, "createEmptyAudioBuffer");
  var bn = n((r = {}) => {
    let e = r.root ?? document.body;
    e === document.body &&
      ((document.body.style.width = "100%"),
      (document.body.style.height = "100%"),
      (document.body.style.margin = "0px"),
      (document.documentElement.style.width = "100%"),
      (document.documentElement.style.height = "100%"));
    let h =
        r.canvas ??
        (() => {
          let t = document.createElement("canvas");
          return e.appendChild(t), t;
        })(),
      u = r.scale ?? 1,
      f = r.width && r.height && !r.stretch && !r.letterbox;
    f
      ? ((h.width = r.width * u), (h.height = r.height * u))
      : ((h.width = h.parentElement.offsetWidth),
        (h.height = h.parentElement.offsetHeight));
    let A = ["outline: none", "cursor: default"];
    if (f) {
      let t = h.width,
        i = h.height;
      A.push(`width: ${t}px`), A.push(`height: ${i}px`);
    } else A.push("width: 100%"), A.push("height: 100%");
    r.crisp &&
      (A.push("image-rendering: pixelated"),
      A.push("image-rendering: crisp-edges")),
      (h.style.cssText = A.join(";"));
    let M = r.pixelDensity || window.devicePixelRatio;
    (h.width *= M), (h.height *= M), (h.tabIndex = 0);
    let D = document.createElement("canvas");
    (D.width = Vr), (D.height = Vr);
    let H = D.getContext("2d", { willReadFrequently: !0 }),
      V = _n({
        canvas: h,
        touchToMouse: r.touchToMouse,
        gamepads: r.gamepads,
        pixelDensity: r.pixelDensity,
        maxFPS: r.maxFPS,
      }),
      Z = [],
      b = V.canvas.getContext("webgl", {
        antialias: !0,
        depth: !0,
        stencil: !0,
        alpha: !0,
        preserveDrawingBuffer: !0,
      }),
      K = wn(b, { texFilter: r.texFilter }),
      y = (() => {
        let t = tt(Zr, _r),
          i = ht.fromImage(
            K,
            new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)
          ),
          s =
            r.width && r.height
              ? new fr(K, r.width * M * u, r.height * M * u)
              : new fr(K, b.drawingBufferWidth, b.drawingBufferHeight),
          a = null,
          o = 1;
        r.background &&
          ((a = _(r.background)),
          (o = Array.isArray(r.background) ? r.background[3] : 1),
          b.clearColor(a.r / 255, a.g / 255, a.b / 255, o ?? 1)),
          b.enable(b.BLEND),
          b.blendFuncSeparate(
            b.SRC_ALPHA,
            b.ONE_MINUS_SRC_ALPHA,
            b.ONE,
            b.ONE_MINUS_SRC_ALPHA
          );
        let l = new eo(K, hi, po, mo),
          p = ht.fromImage(
            K,
            new ImageData(
              new Uint8ClampedArray([
                128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128,
                128, 128, 255,
              ]),
              2,
              2
            ),
            { wrap: "repeat", filter: "nearest" }
          );
        return {
          lastDrawCalls: 0,
          defShader: t,
          defTex: i,
          frameBuffer: s,
          postShader: null,
          postShaderUniform: null,
          renderer: l,
          transform: new Ne(),
          transformStack: [],
          bgTex: p,
          bgColor: a,
          bgAlpha: o,
          width: r.width ?? b.drawingBufferWidth / M / u,
          height: r.height ?? b.drawingBufferHeight / M / u,
          viewport: {
            x: 0,
            y: 0,
            width: b.drawingBufferWidth,
            height: b.drawingBufferHeight,
          },
          fixed: !1,
        };
      })();
    class W {
      static {
        n(this, "SpriteData");
      }
      tex;
      frames = [new ge(0, 0, 1, 1)];
      anims = {};
      slice9 = null;
      constructor(i, s, a = {}, o = null) {
        (this.tex = i),
          s && (this.frames = s),
          (this.anims = a),
          (this.slice9 = o);
      }
      get width() {
        return this.tex.width * this.frames[0].w;
      }
      get height() {
        return this.tex.height * this.frames[0].h;
      }
      static from(i, s = {}) {
        return typeof i == "string"
          ? W.fromURL(i, s)
          : Promise.resolve(W.fromImage(i, s));
      }
      static fromImage(i, s = {}) {
        let [a, o] = U.packer.add(i),
          l = s.frames
            ? s.frames.map(
                (p) =>
                  new ge(o.x + p.x * o.w, o.y + p.y * o.h, p.w * o.w, p.h * o.h)
              )
            : lt(s.sliceX || 1, s.sliceY || 1, o.x, o.y, o.w, o.h);
        return new W(a, l, s.anims, s.slice9);
      }
      static fromURL(i, s = {}) {
        return _t(i).then((a) => W.fromImage(a, s));
      }
    }
    class ue {
      static {
        n(this, "SoundData");
      }
      buf;
      constructor(i) {
        this.buf = i;
      }
      static fromArrayBuffer(i) {
        return new Promise((s, a) => re.ctx.decodeAudioData(i, s, a)).then(
          (s) => new ue(s)
        );
      }
      static fromURL(i) {
        return Bs(i)
          ? ue.fromArrayBuffer(sn(i))
          : vn(i).then((s) => ue.fromArrayBuffer(s));
      }
    }
    let re = (() => {
        let t = new (window.AudioContext || window.webkitAudioContext)(),
          i = t.createGain();
        i.connect(t.destination);
        let s = new ue(En(t));
        return (
          t
            .decodeAudioData(io.buffer.slice(0))
            .then((a) => {
              s.buf = a;
            })
            .catch((a) => {
              console.error("Failed to load burp: ", a);
            }),
          { ctx: t, masterNode: i, burpSnd: s }
        );
      })(),
      U = {
        urlPrefix: "",
        sprites: new yt(),
        fonts: new yt(),
        bitmapFonts: new yt(),
        sounds: new yt(),
        shaders: new yt(),
        custom: new yt(),
        packer: new to(K, Ls, Os),
        loaded: !1,
      };
    function ce(t) {
      return typeof t != "string" || Bs(t) ? t : U.urlPrefix + t;
    }
    n(ce, "fixURL");
    let S = {
      events: new Wt(),
      objEvents: new Wt(),
      root: ar([]),
      gravity: 0,
      scenes: {},
      logs: [],
      cam: {
        pos: null,
        scale: new E(1),
        angle: 0,
        shake: 0,
        transform: new Ne(),
      },
    };
    S.root.use(ur());
    function Te(t) {
      return U.custom.add(null, t);
    }
    n(Te, "load");
    function Y() {
      let t = [
        U.sprites,
        U.sounds,
        U.shaders,
        U.fonts,
        U.bitmapFonts,
        U.custom,
      ];
      return t.reduce((i, s) => i + s.progress(), 0) / t.length;
    }
    n(Y, "loadProgress");
    function Ee(t) {
      return t !== void 0 && (U.urlPrefix = t), U.urlPrefix;
    }
    n(Ee, "loadRoot");
    function me(t, i) {
      return U.custom.add(t, Zt(i));
    }
    n(me, "loadJSON");
    class ye {
      static {
        n(this, "FontData");
      }
      fontface;
      filter = Wr;
      outline = null;
      size = Ar;
      constructor(i, s = {}) {
        if (
          ((this.fontface = i),
          (this.filter = s.filter ?? Wr),
          (this.size = s.size ?? Ar),
          this.size > Vr)
        )
          throw new Error(`Max font size: ${Vr}`);
        s.outline &&
          ((this.outline = { width: 1, color: _(0, 0, 0) }),
          typeof s.outline == "number"
            ? (this.outline.width = s.outline)
            : typeof s.outline == "object" &&
              (s.outline.width && (this.outline.width = s.outline.width),
              s.outline.color && (this.outline.color = s.outline.color)));
      }
    }
    function je(t, i, s = {}) {
      let a = new FontFace(t, typeof i == "string" ? `url(${i})` : i);
      return (
        document.fonts.add(a),
        U.fonts.add(
          t,
          a
            .load()
            .catch((o) => {
              throw new Error(`Failed to load font from "${i}": ${o}`);
            })
            .then((o) => new ye(o, s))
        )
      );
    }
    n(je, "loadFont");
    function Rt(t, i, s, a, o = {}) {
      return U.bitmapFonts.add(
        t,
        _t(i).then((l) => Ut(ht.fromImage(K, l, o), s, a, o.chars ?? Cs))
      );
    }
    n(Rt, "loadBitmapFont");
    function lt(t = 1, i = 1, s = 0, a = 0, o = 1, l = 1) {
      let p = [],
        w = o / t,
        g = l / i;
      for (let d = 0; d < i; d++)
        for (let m = 0; m < t; m++) p.push(new ge(s + m * w, a + d * g, w, g));
      return p;
    }
    n(lt, "slice");
    function ut(t, i) {
      return (
        (t = ce(t)),
        Te(
          typeof i == "string"
            ? new Promise((s, a) => {
                Zt(i).then((o) => {
                  ut(t, o).then(s).catch(a);
                });
              })
            : W.from(t).then((s) => {
                let a = {};
                for (let o in i) {
                  let l = i[o],
                    p = s.frames[0],
                    w = Ls * p.w,
                    g = Os * p.h,
                    d = l.frames
                      ? l.frames.map(
                          (P) =>
                            new ge(
                              p.x + ((l.x + P.x) / w) * p.w,
                              p.y + ((l.y + P.y) / g) * p.h,
                              (P.w / w) * p.w,
                              (P.h / g) * p.h
                            )
                        )
                      : lt(
                          l.sliceX || 1,
                          l.sliceY || 1,
                          p.x + (l.x / w) * p.w,
                          p.y + (l.y / g) * p.h,
                          (l.width / w) * p.w,
                          (l.height / g) * p.h
                        ),
                    m = new W(s.tex, d, l.anims);
                  U.sprites.addLoaded(o, m), (a[o] = m);
                }
                return a;
              })
        )
      );
    }
    n(ut, "loadSpriteAtlas");
    function dt(t, i = {}) {
      let s = document.createElement("canvas"),
        a = t[0].width,
        o = t[0].height;
      (s.width = a * t.length), (s.height = o);
      let l = s.getContext("2d");
      t.forEach((w, g) => {
        w instanceof ImageData
          ? l.putImageData(w, g * a, 0)
          : l.drawImage(w, g * a, 0);
      });
      let p = l.getImageData(0, 0, t.length * a, o);
      return W.fromImage(p, { ...i, sliceX: t.length, sliceY: 1 });
    }
    n(dt, "createSpriteSheet");
    function Ge(t, i, s = { sliceX: 1, sliceY: 1, anims: {} }) {
      return (
        (i = ce(i)),
        Array.isArray(i)
          ? i.some((a) => typeof a == "string")
            ? U.sprites.add(
                t,
                Promise.all(
                  i.map((a) =>
                    typeof a == "string" ? _t(a) : Promise.resolve(a)
                  )
                ).then((a) => dt(a, s))
              )
            : U.sprites.addLoaded(t, dt(i, s))
          : typeof i == "string"
          ? U.sprites.add(t, W.from(i, s))
          : U.sprites.addLoaded(t, W.fromImage(i, s))
      );
    }
    n(Ge, "loadSprite");
    function Mt(t, i) {
      return (
        (i = ce(i)),
        U.sprites.add(
          t,
          new Promise(async (s) => {
            let a = typeof i == "string" ? await Zt(i) : i,
              o = await Promise.all(a.frames.map(_t)),
              l = document.createElement("canvas");
            (l.width = a.width), (l.height = a.height * a.frames.length);
            let p = l.getContext("2d");
            o.forEach((g, d) => {
              p.drawImage(g, 0, d * a.height);
            });
            let w = await Ge(null, l, {
              sliceY: a.frames.length,
              anims: a.anims,
            });
            s(w);
          })
        )
      );
    }
    n(Mt, "loadPedit");
    function Tt(t, i, s) {
      (i = ce(i)),
        (s = ce(s)),
        typeof i == "string" && !s && (s = jn(i) + ".json");
      let a = typeof s == "string" ? Zt(s) : Promise.resolve(s);
      return U.sprites.add(
        t,
        a.then((o) => {
          let l = o.meta.size,
            p = o.frames.map(
              (g) =>
                new ge(
                  g.frame.x / l.w,
                  g.frame.y / l.h,
                  g.frame.w / l.w,
                  g.frame.h / l.h
                )
            ),
            w = {};
          for (let g of o.meta.frameTags)
            g.from === g.to
              ? (w[g.name] = g.from)
              : (w[g.name] = {
                  from: g.from,
                  to: g.to,
                  speed: 10,
                  loop: !0,
                  pingpong: g.direction === "pingpong",
                });
          return W.from(i, { frames: p, anims: w });
        })
      );
    }
    n(Tt, "loadAseprite");
    function rr(t, i, s) {
      return U.shaders.addLoaded(t, tt(i, s));
    }
    n(rr, "loadShader");
    function ir(t, i, s) {
      (i = ce(i)), (s = ce(s));
      let a = n((l) => (l ? Vn(l) : Promise.resolve(null)), "resolveUrl"),
        o = Promise.all([a(i), a(s)]).then(([l, p]) => tt(l, p));
      return U.shaders.add(t, o);
    }
    n(ir, "loadShaderURL");
    function sr(t, i) {
      return (
        (i = ce(i)),
        U.sounds.add(
          t,
          typeof i == "string" ? ue.fromURL(i) : ue.fromArrayBuffer(i)
        )
      );
    }
    n(sr, "loadSound");
    function nr(t = "bean") {
      return Ge(t, ro);
    }
    n(nr, "loadBean");
    function Pt(t) {
      return U.sprites.get(t);
    }
    n(Pt, "getSprite");
    function Bt(t) {
      return U.sounds.get(t);
    }
    n(Bt, "getSound");
    function Ft(t) {
      return U.fonts.get(t);
    }
    n(Ft, "getFont");
    function ct(t) {
      return U.bitmapFonts.get(t);
    }
    n(ct, "getBitmapFont");
    function ft(t) {
      return U.shaders.get(t);
    }
    n(ft, "getShader");
    function It(t) {
      return U.custom.get(t);
    }
    n(It, "getAsset");
    function et(t) {
      if (typeof t == "string") {
        let i = Pt(t);
        if (i) return i;
        if (Y() < 1) return null;
        throw new Error(`Sprite not found: ${t}`);
      } else {
        if (t instanceof W) return Be.loaded(t);
        if (t instanceof Be) return t;
        throw new Error(`Invalid sprite: ${t}`);
      }
    }
    n(et, "resolveSprite");
    function kt(t) {
      if (typeof t == "string") {
        let i = Bt(t);
        if (i) return i;
        if (Y() < 1) return null;
        throw new Error(`Sound not found: ${t}`);
      } else {
        if (t instanceof ue) return Be.loaded(t);
        if (t instanceof Be) return t;
        throw new Error(`Invalid sound: ${t}`);
      }
    }
    n(kt, "resolveSound");
    function Dt(t) {
      if (!t) return y.defShader;
      if (typeof t == "string") {
        let i = ft(t);
        if (i) return i.data ?? i;
        if (Y() < 1) return null;
        throw new Error(`Shader not found: ${t}`);
      } else if (t instanceof Be) return t.data ? t.data : t;
      return t;
    }
    n(Dt, "resolveShader");
    function pt(t) {
      if (!t) return pt(r.font ?? ao);
      if (typeof t == "string") {
        let i = ct(t),
          s = Ft(t);
        if (i) return i.data ?? i;
        if (s) return s.data ?? s;
        if (document.fonts.check(`${Ar}px ${t}`)) return t;
        if (Y() < 1) return null;
        throw new Error(`Font not found: ${t}`);
      } else if (t instanceof Be) return t.data ? t.data : t;
      return t;
    }
    n(pt, "resolveFont");
    function Ct(t) {
      return (
        t !== void 0 && (re.masterNode.gain.value = t), re.masterNode.gain.value
      );
    }
    n(Ct, "volume");
    function gt(t, i = {}) {
      let s = re.ctx,
        a = i.paused ?? !1,
        o = s.createBufferSource(),
        l = new ke(),
        p = s.createGain(),
        w = i.seek ?? 0,
        g = 0,
        d = 0,
        m = !1;
      (o.loop = !!i.loop),
        (o.detune.value = i.detune ?? 0),
        (o.playbackRate.value = i.speed ?? 1),
        o.connect(p),
        (o.onended = () => {
          G() >= o.buffer?.duration && l.trigger();
        }),
        p.connect(re.masterNode),
        (p.gain.value = i.volume ?? 1);
      let P = n((k) => {
          (o.buffer = k.buf),
            a || ((g = s.currentTime), o.start(0, w), (m = !0));
        }, "start"),
        B = kt(t);
      B instanceof Be && B.onLoad(P);
      let G = n(() => {
          if (!o.buffer) return 0;
          let k = a ? d - g : s.currentTime - g,
            N = o.buffer.duration;
          return o.loop ? k % N : Math.min(k, N);
        }, "getTime"),
        L = n((k) => {
          let N = s.createBufferSource();
          return (
            (N.buffer = k.buffer),
            (N.loop = k.loop),
            (N.playbackRate.value = k.playbackRate.value),
            (N.detune.value = k.detune.value),
            (N.onended = k.onended),
            N.connect(p),
            N
          );
        }, "cloneNode");
      return {
        stop() {
          (this.paused = !0), this.seek(0);
        },
        set paused(k) {
          if (a !== k)
            if (((a = k), k)) m && (o.stop(), (m = !1)), (d = s.currentTime);
            else {
              o = L(o);
              let N = d - g;
              o.start(0, N), (m = !0), (g = s.currentTime - N), (d = 0);
            }
        },
        get paused() {
          return a;
        },
        play(k = 0) {
          this.seek(k), (this.paused = !1);
        },
        seek(k) {
          o.buffer?.duration &&
            (k > o.buffer.duration ||
              (a
                ? ((o = L(o)), (g = d - k))
                : (o.stop(),
                  (o = L(o)),
                  (g = s.currentTime - k),
                  o.start(0, k),
                  (m = !0),
                  (d = 0))));
        },
        set speed(k) {
          o.playbackRate.value = k;
        },
        get speed() {
          return o.playbackRate.value;
        },
        set detune(k) {
          o.detune.value = k;
        },
        get detune() {
          return o.detune.value;
        },
        set volume(k) {
          p.gain.value = Math.max(k, 0);
        },
        get volume() {
          return p.gain.value;
        },
        set loop(k) {
          o.loop = k;
        },
        get loop() {
          return o.loop;
        },
        duration() {
          return o.buffer?.duration ?? 0;
        },
        time() {
          return G() % this.duration();
        },
        onEnd(k) {
          return l.add(k);
        },
        then(k) {
          return this.onEnd(k);
        },
      };
    }
    n(gt, "play");
    function mt(t) {
      return gt(re.burpSnd, t);
    }
    n(mt, "burp");
    function Nt(t, i) {
      return new fr(K, t, i);
    }
    n(Nt, "makeCanvas");
    function tt(t = Zr, i = _r) {
      let s = wo.replace("{{user}}", t ?? Zr),
        a = Ao.replace("{{user}}", i ?? _r);
      try {
        return new $n(
          K,
          s,
          a,
          hi.map((o) => o.name)
        );
      } catch (o) {
        let l = /(?<type>^\w+) SHADER ERROR: 0:(?<line>\d+): (?<msg>.+)/,
          p = zn(o).match(l),
          w = Number(p.groups.line) - 14,
          g = p.groups.msg.trim(),
          d = p.groups.type.toLowerCase();
        throw new Error(`${d} shader line ${w}: ${g}`);
      }
    }
    n(tt, "makeShader");
    function Ut(t, i, s, a) {
      let o = t.width / i,
        l = {},
        p = a.split("").entries();
      for (let [w, g] of p)
        l[g] = new ge((w % o) * i, Math.floor(w / o) * s, i, s);
      return { tex: t, map: l, size: s };
    }
    n(Ut, "makeFont");
    function rt(t, i, s, a = y.defTex, o = y.defShader, l = {}) {
      let p = Dt(o);
      if (!p || p instanceof Be) return;
      let w = y.fixed || s ? y.transform : S.cam.transform.mult(y.transform),
        g = [];
      for (let d of t) {
        let m = Gt(w.multVec2(d.pos));
        g.push(
          m.x,
          m.y,
          d.uv.x,
          d.uv.y,
          d.color.r / 255,
          d.color.g / 255,
          d.color.b / 255,
          d.opacity
        );
      }
      y.renderer.push(b.TRIANGLES, g, i, p, a, l);
    }
    n(rt, "drawRaw");
    function Pe() {
      y.renderer.flush();
    }
    n(Pe, "flush");
    function it() {
      b.clear(b.COLOR_BUFFER_BIT),
        y.frameBuffer.bind(),
        b.clear(b.COLOR_BUFFER_BIT),
        y.bgColor ||
          Se(() => {
            Ce({
              width: Ae(),
              height: Ve(),
              quad: new ge(0, 0, Ae() / Ns, Ve() / Ns),
              tex: y.bgTex,
              fixed: !0,
            });
          }),
        (y.renderer.numDraws = 0),
        (y.fixed = !1),
        (y.transformStack.length = 0),
        (y.transform = new Ne());
    }
    n(it, "frameStart");
    function wt(t, i) {
      (y.postShader = t), (y.postShaderUniform = i ?? null);
    }
    n(wt, "usePostEffect");
    function st() {
      Pe(),
        (y.lastDrawCalls = y.renderer.numDraws),
        y.frameBuffer.unbind(),
        b.viewport(0, 0, b.drawingBufferWidth, b.drawingBufferHeight);
      let t = y.width,
        i = y.height;
      (y.width = b.drawingBufferWidth / M),
        (y.height = b.drawingBufferHeight / M),
        Qe({
          flipY: !0,
          tex: y.frameBuffer.tex,
          pos: new E(y.viewport.x, y.viewport.y),
          width: y.viewport.width,
          height: y.viewport.height,
          shader: y.postShader,
          uniform:
            typeof y.postShaderUniform == "function"
              ? y.postShaderUniform()
              : y.postShaderUniform,
          fixed: !0,
        }),
        Pe(),
        (y.width = t),
        (y.height = i);
    }
    n(st, "frameEnd");
    function Gt(t) {
      return new E((t.x / Ae()) * 2 - 1, (-t.y / Ve()) * 2 + 1);
    }
    n(Gt, "screen2ndc");
    function At(t) {
      y.transform = t.clone();
    }
    n(At, "pushMatrix");
    function ee(...t) {
      if (t[0] === void 0) return;
      let i = T(...t);
      (i.x === 0 && i.y === 0) || y.transform.translate(i);
    }
    n(ee, "pushTranslate");
    function De(...t) {
      if (t[0] === void 0) return;
      let i = T(...t);
      (i.x === 1 && i.y === 1) || y.transform.scale(i);
    }
    n(De, "pushScale");
    function ie(t) {
      t && y.transform.rotate(t);
    }
    n(ie, "pushRotate");
    function he() {
      y.transformStack.push(y.transform.clone());
    }
    n(he, "pushTransform");
    function ne() {
      y.transformStack.length > 0 && (y.transform = y.transformStack.pop());
    }
    n(ne, "popTransform");
    function Ce(t) {
      if (t.width === void 0 || t.height === void 0)
        throw new Error('drawUVQuad() requires property "width" and "height".');
      if (t.width <= 0 || t.height <= 0) return;
      let i = t.width,
        s = t.height,
        a = at(t.anchor || mr).scale(new E(i, s).scale(-0.5)),
        o = t.quad || new ge(0, 0, 1, 1),
        l = t.color || _(255, 255, 255),
        p = t.opacity ?? 1,
        w = t.tex ? qs / t.tex.width : 0,
        g = t.tex ? qs / t.tex.height : 0,
        d = o.x + w,
        m = o.y + g,
        P = o.w - w * 2,
        B = o.h - g * 2;
      he(),
        ee(t.pos),
        ie(t.angle),
        De(t.scale),
        ee(a),
        rt(
          [
            {
              pos: new E(-i / 2, s / 2),
              uv: new E(t.flipX ? d + P : d, t.flipY ? m : m + B),
              color: l,
              opacity: p,
            },
            {
              pos: new E(-i / 2, -s / 2),
              uv: new E(t.flipX ? d + P : d, t.flipY ? m + B : m),
              color: l,
              opacity: p,
            },
            {
              pos: new E(i / 2, -s / 2),
              uv: new E(t.flipX ? d : d + P, t.flipY ? m + B : m),
              color: l,
              opacity: p,
            },
            {
              pos: new E(i / 2, s / 2),
              uv: new E(t.flipX ? d : d + P, t.flipY ? m : m + B),
              color: l,
              opacity: p,
            },
          ],
          [0, 1, 3, 1, 2, 3],
          t.fixed,
          t.tex,
          t.shader,
          t.uniform
        ),
        ne();
    }
    n(Ce, "drawUVQuad");
    function Qe(t) {
      if (!t.tex) throw new Error('drawTexture() requires property "tex".');
      let i = t.quad ?? new ge(0, 0, 1, 1),
        s = t.tex.width * i.w,
        a = t.tex.height * i.h,
        o = new E(1);
      if (t.tiled) {
        let l = Math.ceil((t.width || s) / s),
          p = Math.ceil((t.height || a) / a),
          w = at(t.anchor || mr)
            .add(new E(1, 1))
            .scale(0.5)
            .scale(l * s, p * a);
        for (let g = 0; g < l; g++)
          for (let d = 0; d < p; d++)
            Ce(
              Object.assign({}, t, {
                pos: (t.pos || new E(0)).add(new E(s * g, a * d)).sub(w),
                scale: o.scale(t.scale || new E(1)),
                tex: t.tex,
                quad: i,
                width: s,
                height: a,
                anchor: "topleft",
              })
            );
      } else
        t.width && t.height
          ? ((o.x = t.width / s), (o.y = t.height / a))
          : t.width
          ? ((o.x = t.width / s), (o.y = o.x))
          : t.height && ((o.y = t.height / a), (o.x = o.y)),
          Ce(
            Object.assign({}, t, {
              scale: o.scale(t.scale || new E(1)),
              tex: t.tex,
              quad: i,
              width: s,
              height: a,
            })
          );
    }
    n(Qe, "drawTexture");
    function or(t) {
      if (!t.sprite) throw new Error('drawSprite() requires property "sprite"');
      let i = et(t.sprite);
      if (!i || !i.data) return;
      let s = i.data.frames[t.frame ?? 0];
      if (!s) throw new Error(`Frame not found: ${t.frame ?? 0}`);
      Qe(
        Object.assign({}, t, {
          tex: i.data.tex,
          quad: s.scale(t.quad ?? new ge(0, 0, 1, 1)),
        })
      );
    }
    n(or, "drawSprite");
    function Le(t, i, s, a, o, l = 1) {
      (a = Ue(a % 360)), (o = Ue(o % 360)), o <= a && (o += Math.PI * 2);
      let p = [],
        w = Math.ceil(((o - a) / Ue(8)) * l),
        g = (o - a) / w;
      for (let d = a; d < o; d += g)
        p.push(t.add(i * Math.cos(d), s * Math.sin(d)));
      return p.push(t.add(i * Math.cos(o), s * Math.sin(o))), p;
    }
    n(Le, "getArcPts");
    function we(t) {
      if (t.width === void 0 || t.height === void 0)
        throw new Error('drawRect() requires property "width" and "height".');
      if (t.width <= 0 || t.height <= 0) return;
      let i = t.width,
        s = t.height,
        a = at(t.anchor || mr)
          .add(1, 1)
          .scale(new E(i, s).scale(-0.5)),
        o = [new E(0, 0), new E(i, 0), new E(i, s), new E(0, s)];
      if (t.radius) {
        let l = Math.min(Math.min(i, s) / 2, t.radius);
        o = [
          new E(l, 0),
          new E(i - l, 0),
          ...Le(new E(i - l, l), l, l, 270, 360),
          new E(i, l),
          new E(i, s - l),
          ...Le(new E(i - l, s - l), l, l, 0, 90),
          new E(i - l, s),
          new E(l, s),
          ...Le(new E(l, s - l), l, l, 90, 180),
          new E(0, s - l),
          new E(0, l),
          ...Le(new E(l, l), l, l, 180, 270),
        ];
      }
      de(
        Object.assign({}, t, {
          offset: a,
          pts: o,
          ...(t.gradient
            ? {
                colors: t.horizontal
                  ? [t.gradient[0], t.gradient[1], t.gradient[1], t.gradient[0]]
                  : [
                      t.gradient[0],
                      t.gradient[0],
                      t.gradient[1],
                      t.gradient[1],
                    ],
              }
            : {}),
        })
      );
    }
    n(we, "drawRect");
    function c(t) {
      let { p1: i, p2: s } = t;
      if (!i || !s)
        throw new Error('drawLine() requires properties "p1" and "p2".');
      let a = t.width || 1,
        o = s
          .sub(i)
          .unit()
          .normal()
          .scale(a * 0.5),
        l = [i.sub(o), i.add(o), s.add(o), s.sub(o)].map((p) => ({
          pos: new E(p.x, p.y),
          uv: new E(0),
          color: t.color ?? te.WHITE,
          opacity: t.opacity ?? 1,
        }));
      rt(l, [0, 1, 3, 1, 2, 3], t.fixed, y.defTex, t.shader, t.uniform);
    }
    n(c, "drawLine");
    function v(t) {
      let i = t.pts;
      if (!i) throw new Error('drawLines() requires property "pts".');
      if (!(i.length < 2))
        if (t.radius && i.length >= 3) {
          let s = i[0].sdist(i[1]);
          for (let o = 1; o < i.length - 1; o++)
            s = Math.min(i[o].sdist(i[o + 1]), s);
          let a = Math.min(t.radius, Math.sqrt(s) / 2);
          c(Object.assign({}, t, { p1: i[0], p2: i[1] }));
          for (let o = 1; o < i.length - 2; o++) {
            let l = i[o],
              p = i[o + 1];
            c(Object.assign({}, t, { p1: l, p2: p }));
          }
          c(Object.assign({}, t, { p1: i[i.length - 2], p2: i[i.length - 1] }));
        } else
          for (let s = 0; s < i.length - 1; s++)
            c(Object.assign({}, t, { p1: i[s], p2: i[s + 1] })),
              t.join !== "none" &&
                q(Object.assign({}, t, { pos: i[s], radius: t.width / 2 }));
    }
    n(v, "drawLines");
    function R(t) {
      if (!t.p1 || !t.p2 || !t.p3)
        throw new Error(
          'drawTriangle() requires properties "p1", "p2" and "p3".'
        );
      return de(Object.assign({}, t, { pts: [t.p1, t.p2, t.p3] }));
    }
    n(R, "drawTriangle");
    function q(t) {
      if (typeof t.radius != "number")
        throw new Error('drawCircle() requires property "radius".');
      t.radius !== 0 &&
        j(
          Object.assign({}, t, {
            radiusX: t.radius,
            radiusY: t.radius,
            angle: 0,
          })
        );
    }
    n(q, "drawCircle");
    function j(t) {
      if (t.radiusX === void 0 || t.radiusY === void 0)
        throw new Error(
          'drawEllipse() requires properties "radiusX" and "radiusY".'
        );
      if (t.radiusX === 0 || t.radiusY === 0) return;
      let i = t.start ?? 0,
        s = t.end ?? 360,
        a = at(t.anchor ?? "center").scale(new E(-t.radiusX, -t.radiusY)),
        o = Le(a, t.radiusX, t.radiusY, i, s, t.resolution);
      o.unshift(a);
      let l = Object.assign({}, t, {
        pts: o,
        radius: 0,
        ...(t.gradient
          ? {
              colors: [
                t.gradient[0],
                ...Array(o.length - 1).fill(t.gradient[1]),
              ],
            }
          : {}),
      });
      if (s - i >= 360 && t.outline) {
        t.fill !== !1 && de(Object.assign(l, { outline: null })),
          de(Object.assign(l, { pts: o.slice(1), fill: !1 }));
        return;
      }
      de(l);
    }
    n(j, "drawEllipse");
    function de(t) {
      if (!t.pts) throw new Error('drawPolygon() requires property "pts".');
      let i = t.pts.length;
      if (!(i < 3)) {
        if (
          (he(),
          ee(t.pos),
          De(t.scale),
          ie(t.angle),
          ee(t.offset),
          t.fill !== !1)
        ) {
          let s = t.color ?? te.WHITE,
            a = t.pts.map((l, p) => ({
              pos: new E(l.x, l.y),
              uv: new E(0, 0),
              color: t.colors && t.colors[p] ? t.colors[p].mult(s) : s,
              opacity: t.opacity ?? 1,
            })),
            o = [...Array(i - 2).keys()].map((l) => [0, l + 1, l + 2]).flat();
          rt(a, t.indices ?? o, t.fixed, y.defTex, t.shader, t.uniform);
        }
        t.outline &&
          v({
            pts: [...t.pts, t.pts[0]],
            radius: t.radius,
            width: t.outline.width,
            color: t.outline.color,
            join: t.outline.join,
            uniform: t.uniform,
            fixed: t.fixed,
            opacity: t.opacity,
          }),
          ne();
      }
    }
    n(de, "drawPolygon");
    function be(t, i, s) {
      Pe(),
        b.clear(b.STENCIL_BUFFER_BIT),
        b.enable(b.STENCIL_TEST),
        b.stencilFunc(b.NEVER, 1, 255),
        b.stencilOp(b.REPLACE, b.REPLACE, b.REPLACE),
        i(),
        Pe(),
        b.stencilFunc(s, 1, 255),
        b.stencilOp(b.KEEP, b.KEEP, b.KEEP),
        t(),
        Pe(),
        b.disable(b.STENCIL_TEST);
    }
    n(be, "drawStenciled");
    function Lt(t, i) {
      be(t, i, b.EQUAL);
    }
    n(Lt, "drawMasked");
    function Ot(t, i) {
      be(t, i, b.NOTEQUAL);
    }
    n(Ot, "drawSubtracted");
    function Fe() {
      return (y.viewport.width + y.viewport.height) / (y.width + y.height);
    }
    n(Fe, "getViewportScale");
    function Se(t) {
      Pe();
      let i = y.width,
        s = y.height;
      (y.width = y.viewport.width),
        (y.height = y.viewport.height),
        t(),
        Pe(),
        (y.width = i),
        (y.height = s);
    }
    n(Se, "drawUnscaled");
    function Pr(t, i) {
      i.pos && (t.pos = t.pos.add(i.pos)),
        i.scale && (t.scale = t.scale.scale(T(i.scale))),
        i.angle && (t.angle += i.angle),
        i.color && t.ch.length === 1 && (t.color = t.color.mult(i.color)),
        i.opacity && (t.opacity *= i.opacity);
    }
    n(Pr, "applyCharTransform");
    let wi = /\[(?<style>\w+)\](?<text>.*?)\[\/\k<style>\]/g;
    function Ai(t) {
      let i = {},
        s = t.replace(wi, "$2"),
        a = 0;
      for (let o of t.matchAll(wi)) {
        let l = o.index - a;
        for (let p = 0; p < o.groups.text.length; p++)
          i[p + l] = [o.groups.style];
        a += o[0].length - o.groups.text.length;
      }
      return { charStyleMap: i, text: s };
    }
    n(Ai, "compileStyledText");
    let Br = {};
    function ze(t) {
      if (t.text === void 0)
        throw new Error('formatText() requires property "text".');
      let i = pt(t.font);
      if (t.text === "" || i instanceof Be || !i)
        return { width: 0, height: 0, chars: [], opt: t };
      let { charStyleMap: s, text: a } = Ai(t.text + ""),
        o = on(a);
      if (i instanceof ye || typeof i == "string") {
        let Q = i instanceof ye ? i.fontface.family : i,
          J =
            i instanceof ye
              ? { outline: i.outline, filter: i.filter }
              : { outline: null, filter: Wr },
          O = Br[Q] ?? {
            font: {
              tex: new ht(K, Us, Gs, { filter: J.filter }),
              map: {},
              size: Ar,
            },
            cursor: new E(0),
            outline: J.outline,
          };
        Br[Q] || (Br[Q] = O), (i = O.font);
        for (let fe of o)
          if (!O.font.map[fe]) {
            let x = H;
            x.clearRect(0, 0, D.width, D.height),
              (x.font = `${i.size}px ${Q}`),
              (x.textBaseline = "top"),
              (x.textAlign = "left"),
              (x.fillStyle = "#ffffff");
            let F = x.measureText(fe),
              I = Math.ceil(F.width),
              C = i.size;
            O.outline &&
              ((x.lineJoin = "round"),
              (x.lineWidth = O.outline.width * 2),
              (x.strokeStyle = O.outline.color.toHex()),
              x.strokeText(fe, O.outline.width, O.outline.width),
              (I += O.outline.width * 2),
              (C += O.outline.width * 3)),
              x.fillText(fe, O.outline?.width ?? 0, O.outline?.width ?? 0);
            let X = x.getImageData(0, 0, I, C);
            if (
              O.cursor.x + I > Us &&
              ((O.cursor.x = 0), (O.cursor.y += C), O.cursor.y > Gs)
            )
              throw new Error("Font atlas exceeds character limit");
            i.tex.update(X, O.cursor.x, O.cursor.y),
              (i.map[fe] = new ge(O.cursor.x, O.cursor.y, I, C)),
              (O.cursor.x += I);
          }
      }
      let l = t.size || i.size,
        p = T(t.scale ?? 1).scale(l / i.size),
        w = t.lineSpacing ?? 0,
        g = t.letterSpacing ?? 0,
        d = 0,
        m = 0,
        P = 0,
        B = [],
        G = [],
        L = 0,
        k = null,
        N = null;
      for (; L < o.length; ) {
        let Q = o[L];
        if (
          Q ===
          `
`
        )
          (P += l + w),
            B.push({ width: d - g, chars: G }),
            (k = null),
            (N = null),
            (d = 0),
            (G = []);
        else {
          let J = i.map[Q];
          if (J) {
            let O = J.w * p.x;
            t.width &&
              d + O > t.width &&
              ((P += l + w),
              k != null &&
                ((L -= G.length - k),
                (Q = o[L]),
                (J = i.map[Q]),
                (O = J.w * p.x),
                (G = G.slice(0, k - 1)),
                (d = N)),
              (k = null),
              (N = null),
              B.push({ width: d - g, chars: G }),
              (d = 0),
              (G = [])),
              G.push({
                tex: i.tex,
                width: J.w,
                height: J.h,
                quad: new ge(
                  J.x / i.tex.width,
                  J.y / i.tex.height,
                  J.w / i.tex.width,
                  J.h / i.tex.height
                ),
                ch: Q,
                pos: new E(d, P),
                opacity: t.opacity ?? 1,
                color: t.color ?? te.WHITE,
                scale: T(p),
                angle: 0,
              }),
              Q === " " && ((k = G.length), (N = d)),
              (d += O),
              (m = Math.max(m, d)),
              (d += g);
          }
        }
        L++;
      }
      B.push({ width: d - g, chars: G }), (P += l), t.width && (m = t.width);
      let Re = [];
      for (let Q of B) {
        let J = (m - Q.width) * xn(t.align ?? "left");
        for (let O of Q.chars) {
          let fe = i.map[O.ch],
            x = Re.length;
          if (
            ((O.pos = O.pos.add(J, 0).add(fe.w * p.x * 0.5, fe.h * p.y * 0.5)),
            t.transform)
          ) {
            let F =
              typeof t.transform == "function"
                ? t.transform(x, O.ch)
                : t.transform;
            F && Pr(O, F);
          }
          if (s[x]) {
            let F = s[x];
            for (let I of F) {
              let C = t.styles[I],
                X = typeof C == "function" ? C(x, O.ch) : C;
              X && Pr(O, X);
            }
          }
          Re.push(O);
        }
      }
      return { width: m, height: P, chars: Re, opt: t };
    }
    n(ze, "formatText");
    function Fr(t) {
      Je(ze(t));
    }
    n(Fr, "drawText");
    function Je(t) {
      he(),
        ee(t.opt.pos),
        ie(t.opt.angle),
        ee(
          at(t.opt.anchor ?? "topleft")
            .add(1, 1)
            .scale(t.width, t.height)
            .scale(-0.5)
        ),
        t.chars.forEach((i) => {
          Ce({
            tex: i.tex,
            width: i.width,
            height: i.height,
            pos: i.pos,
            scale: i.scale,
            angle: i.angle,
            color: i.color,
            opacity: i.opacity,
            quad: i.quad,
            anchor: "center",
            uniform: t.opt.uniform,
            shader: t.opt.shader,
            fixed: t.opt.fixed,
          });
        }),
        ne();
    }
    n(Je, "drawFormattedText");
    function Ae() {
      return y.width;
    }
    n(Ae, "width");
    function Ve() {
      return y.height;
    }
    n(Ve, "height");
    function Vi(t) {
      return new E(
        ((t.x - y.viewport.x) * Ae()) / y.viewport.width,
        ((t.y - y.viewport.y) * Ve()) / y.viewport.height
      );
    }
    n(Vi, "windowToContent");
    function vi(t) {
      return new E(
        (t.x * y.viewport.width) / y.width,
        (t.y * y.viewport.height) / y.height
      );
    }
    n(vi, "contentToView");
    function qt() {
      return Vi(V.mousePos());
    }
    n(qt, "mousePos");
    let yi = !1,
      se = {
        inspect: !1,
        timeScale: 1,
        showLog: !0,
        fps: () => V.fps(),
        numFrames: () => V.numFrames(),
        stepFrame: Hr,
        drawCalls: () => y.lastDrawCalls,
        clearLog: () => (S.logs = []),
        log: (t) => {
          let i = r.logMax ?? uo;
          S.logs.unshift({ msg: t, time: V.time() }),
            S.logs.length > i && (S.logs = S.logs.slice(0, i));
        },
        error: (t) => se.log(new Error(t.toString ? t.toString() : t)),
        curRecording: null,
        numObjects: () => Lr("*", { recursive: !0 }).length,
        get paused() {
          return yi;
        },
        set paused(t) {
          (yi = t), t ? re.ctx.suspend() : re.ctx.resume();
        },
      };
    function Ie() {
      return V.dt() * se.timeScale;
    }
    n(Ie, "dt");
    function xi(...t) {
      return (
        t.length > 0 && (S.cam.pos = T(...t)),
        S.cam.pos ? S.cam.pos.clone() : Qt()
      );
    }
    n(xi, "camPos");
    function Ei(...t) {
      return t.length > 0 && (S.cam.scale = T(...t)), S.cam.scale.clone();
    }
    n(Ei, "camScale");
    function bi(t) {
      return t !== void 0 && (S.cam.angle = t), S.cam.angle;
    }
    n(bi, "camRot");
    function Si(t = 12) {
      S.cam.shake += t;
    }
    n(Si, "shake");
    function Ir(t) {
      return S.cam.transform.multVec2(t);
    }
    n(Ir, "toScreen");
    function kr(t) {
      return S.cam.transform.invert().multVec2(t);
    }
    n(kr, "toWorld");
    function Ht(t) {
      let i = new Ne();
      return (
        t.pos && i.translate(t.pos),
        t.scale && i.scale(t.scale),
        t.angle && i.rotate(t.angle),
        t.parent ? i.mult(t.parent.transform) : i
      );
    }
    n(Ht, "calcTransform");
    function ar(t = []) {
      let i = new Map(),
        s = {},
        a = new Wt(),
        o = [],
        l = null,
        p = !1,
        w = {
          id: Qn(),
          hidden: !1,
          transform: new Ne(),
          children: [],
          parent: null,
          set paused(d) {
            if (d !== p) {
              p = d;
              for (let m of o) m.paused = d;
            }
          },
          get paused() {
            return p;
          },
          add(d = []) {
            let m = Array.isArray(d) ? ar(d) : d;
            if (m.parent)
              throw new Error(
                "Cannot add a game obj that already has a parent."
              );
            return (
              (m.parent = this),
              (m.transform = Ht(m)),
              this.children.push(m),
              m.trigger("add", m),
              S.events.trigger("add", m),
              m
            );
          },
          readd(d) {
            let m = this.children.indexOf(d);
            return (
              m !== -1 && (this.children.splice(m, 1), this.children.push(d)), d
            );
          },
          remove(d) {
            let m = this.children.indexOf(d);
            if (m !== -1) {
              (d.parent = null), this.children.splice(m, 1);
              let P = n((B) => {
                B.trigger("destroy"),
                  S.events.trigger("destroy", B),
                  B.children.forEach((G) => P(G));
              }, "trigger");
              P(d);
            }
          },
          removeAll(d) {
            if (d) this.get(d).forEach((m) => this.remove(m));
            else for (let m of [...this.children]) this.remove(m);
          },
          update() {
            this.paused ||
              (this.children
                .sort((d, m) => (d.z ?? 0) - (m.z ?? 0))
                .forEach((d) => d.update()),
              this.trigger("update"));
          },
          draw() {
            if (this.hidden) return;
            this.canvas && this.canvas.bind();
            let d = y.fixed;
            this.fixed && (y.fixed = !0),
              he(),
              ee(this.pos),
              De(this.scale),
              ie(this.angle);
            let m = this.children.sort((P, B) => (P.z ?? 0) - (B.z ?? 0));
            if (this.mask) {
              let P = { intersect: Lt, subtract: Ot }[this.mask];
              if (!P) throw new Error(`Invalid mask func: "${this.mask}"`);
              P(
                () => {
                  m.forEach((B) => B.draw());
                },
                () => {
                  this.trigger("draw");
                }
              );
            } else this.trigger("draw"), m.forEach((P) => P.draw());
            ne(), (y.fixed = d), this.canvas && this.canvas.unbind();
          },
          drawInspect() {
            this.hidden ||
              (he(),
              ee(this.pos),
              De(this.scale),
              ie(this.angle),
              this.children
                .sort((d, m) => (d.z ?? 0) - (m.z ?? 0))
                .forEach((d) => d.drawInspect()),
              this.trigger("drawInspect"),
              ne());
          },
          use(d) {
            if (!d) return;
            if (typeof d == "string") return this.use({ id: d });
            let m = [];
            d.id &&
              (this.unuse(d.id), (s[d.id] = []), (m = s[d.id]), i.set(d.id, d));
            for (let B in d) {
              if (Vo.has(B)) continue;
              let G = Object.getOwnPropertyDescriptor(d, B);
              if (
                (typeof G.value == "function" && (d[B] = d[B].bind(this)),
                G.set && Object.defineProperty(d, B, { set: G.set.bind(this) }),
                G.get && Object.defineProperty(d, B, { get: G.get.bind(this) }),
                vo.has(B))
              ) {
                let L =
                  B === "add"
                    ? () => {
                        (l = n((k) => m.push(k), "onCurCompCleanup")),
                          d[B](),
                          (l = null);
                      }
                    : d[B];
                m.push(this.on(B, L).cancel);
              } else if (this[B] === void 0)
                Object.defineProperty(this, B, {
                  get: () => d[B],
                  set: (L) => (d[B] = L),
                  configurable: !0,
                  enumerable: !0,
                }),
                  m.push(() => delete this[B]);
              else throw new Error(`Duplicate component property: "${B}"`);
            }
            let P = n(() => {
              if (d.require) {
                for (let B of d.require)
                  if (!this.c(B))
                    throw new Error(
                      `Component "${d.id}" requires component "${B}"`
                    );
              }
            }, "checkDeps");
            d.destroy && m.push(d.destroy.bind(this)),
              this.exists()
                ? (P(),
                  d.add &&
                    ((l = n((B) => m.push(B), "onCurCompCleanup")),
                    d.add.call(this),
                    (l = null)))
                : d.require && m.push(this.on("add", P).cancel);
          },
          unuse(d) {
            s[d] && (s[d].forEach((m) => m()), delete s[d]),
              i.has(d) && i.delete(d);
          },
          c(d) {
            return i.get(d);
          },
          get(d, m = {}) {
            let P = m.recursive
              ? this.children.flatMap(
                  n(function B(G) {
                    return [G, ...G.children.flatMap(B)];
                  }, "recurse")
                )
              : this.children;
            if (((P = P.filter((B) => (d ? B.is(d) : !0))), m.liveUpdate)) {
              let B = n(
                  (L) =>
                    m.recursive ? this.isAncestorOf(L) : L.parent === this,
                  "isChild"
                ),
                G = [];
              G.push(
                Dr((L) => {
                  B(L) && L.is(d) && P.push(L);
                })
              ),
                G.push(
                  Ri((L) => {
                    if (B(L) && L.is(d)) {
                      let k = P.findIndex((N) => N.id === L.id);
                      k !== -1 && P.splice(k, 1);
                    }
                  })
                ),
                this.onDestroy(() => {
                  for (let L of G) L.cancel();
                });
            }
            return P;
          },
          isAncestorOf(d) {
            return d.parent
              ? d.parent === this || this.isAncestorOf(d.parent)
              : !1;
          },
          exists() {
            return S.root.isAncestorOf(this);
          },
          is(d) {
            if (d === "*") return !0;
            if (Array.isArray(d)) {
              for (let m of d) if (!this.c(m)) return !1;
              return !0;
            } else return this.c(d) != null;
          },
          on(d, m) {
            let P = a.on(d, m.bind(this));
            return l && l(() => P.cancel()), P;
          },
          trigger(d, ...m) {
            a.trigger(d, ...m), S.objEvents.trigger(d, this, ...m);
          },
          destroy() {
            this.parent && this.parent.remove(this);
          },
          inspect() {
            let d = {};
            for (let [m, P] of i) d[m] = P.inspect ? P.inspect() : null;
            return d;
          },
          onAdd(d) {
            return this.on("add", d);
          },
          onUpdate(d) {
            return this.on("update", d);
          },
          onDraw(d) {
            return this.on("draw", d);
          },
          onDestroy(d) {
            return this.on("destroy", d);
          },
          clearEvents() {
            a.clear();
          },
        },
        g = [
          "onKeyPress",
          "onKeyPressRepeat",
          "onKeyDown",
          "onKeyRelease",
          "onMousePress",
          "onMouseDown",
          "onMouseRelease",
          "onMouseMove",
          "onCharInput",
          "onMouseMove",
          "onTouchStart",
          "onTouchMove",
          "onTouchEnd",
          "onScroll",
          "onGamepadButtonPress",
          "onGamepadButtonDown",
          "onGamepadButtonRelease",
          "onGamepadStick",
        ];
      for (let d of g)
        w[d] = (...m) => {
          let P = V[d](...m);
          return o.push(P), w.onDestroy(() => P.cancel()), P;
        };
      for (let d of t) w.use(d);
      return w;
    }
    n(ar, "make");
    function Oe(t, i, s) {
      return (
        S.objEvents[t] || (S.objEvents[t] = new en()),
        S.objEvents.on(t, (a, ...o) => {
          a.is(i) && s(a, ...o);
        })
      );
    }
    n(Oe, "on");
    let Rn = Me(
        (t) => {
          let i = zt([{ update: t }]);
          return {
            get paused() {
              return i.paused;
            },
            set paused(s) {
              i.paused = s;
            },
            cancel: () => i.destroy(),
          };
        },
        (t, i) => Oe("update", t, i)
      ),
      Mn = Me(
        (t) => {
          let i = zt([{ draw: t }]);
          return {
            get paused() {
              return i.hidden;
            },
            set paused(s) {
              i.hidden = s;
            },
            cancel: () => i.destroy(),
          };
        },
        (t, i) => Oe("draw", t, i)
      ),
      Dr = Me(
        (t) => S.events.on("add", t),
        (t, i) => Oe("add", t, i)
      ),
      Ri = Me(
        (t) => S.events.on("destroy", t),
        (t, i) => Oe("destroy", t, i)
      );
    function Mi(t, i, s) {
      return Oe("collide", t, (a, o, l) => o.is(i) && s(a, o, l));
    }
    n(Mi, "onCollide");
    function Ti(t, i, s) {
      return Oe("collideUpdate", t, (a, o, l) => o.is(i) && s(a, o, l));
    }
    n(Ti, "onCollideUpdate");
    function Pi(t, i, s) {
      return Oe("collideEnd", t, (a, o, l) => o.is(i) && s(a, o, l));
    }
    n(Pi, "onCollideEnd");
    function Yt(t, i) {
      Lr(t, { recursive: !0 }).forEach(i), Dr(t, i);
    }
    n(Yt, "forAllCurrentAndFuture");
    let Tn = Me(
      (t) => V.onMousePress(t),
      (t, i) => {
        let s = [];
        return (
          Yt(t, (a) => {
            if (!a.area)
              throw new Error(
                "onClick() requires the object to have area() component"
              );
            s.push(a.onClick(() => i(a)));
          }),
          xt.join(s)
        );
      }
    );
    function Bi(t, i) {
      let s = [];
      return (
        Yt(t, (a) => {
          if (!a.area)
            throw new Error(
              "onHover() requires the object to have area() component"
            );
          s.push(a.onHover(() => i(a)));
        }),
        xt.join(s)
      );
    }
    n(Bi, "onHover");
    function Fi(t, i) {
      let s = [];
      return (
        Yt(t, (a) => {
          if (!a.area)
            throw new Error(
              "onHoverUpdate() requires the object to have area() component"
            );
          s.push(a.onHoverUpdate(() => i(a)));
        }),
        xt.join(s)
      );
    }
    n(Fi, "onHoverUpdate");
    function Ii(t, i) {
      let s = [];
      return (
        Yt(t, (a) => {
          if (!a.area)
            throw new Error(
              "onHoverEnd() requires the object to have area() component"
            );
          s.push(a.onHoverEnd(() => i(a)));
        }),
        xt.join(s)
      );
    }
    n(Ii, "onHoverEnd");
    function ki(t) {
      S.gravity = t;
    }
    n(ki, "setGravity");
    function Di() {
      return S.gravity;
    }
    n(Di, "getGravity");
    function Ci(...t) {
      t.length === 1 || t.length === 2
        ? ((y.bgColor = _(t[0])), t[1] && (y.bgAlpha = t[1]))
        : (t.length === 3 || t.length === 4) &&
          ((y.bgColor = _(t[0], t[1], t[2])), t[3] && (y.bgAlpha = t[3])),
        b.clearColor(
          y.bgColor.r / 255,
          y.bgColor.g / 255,
          y.bgColor.b / 255,
          y.bgAlpha
        );
    }
    n(Ci, "setBackground");
    function Ni() {
      return y.bgColor.clone();
    }
    n(Ni, "getBackground");
    function Kt(...t) {
      return {
        id: "pos",
        pos: T(...t),
        moveBy(...i) {
          this.pos = this.pos.add(T(...i));
        },
        move(...i) {
          this.moveBy(T(...i).scale(Ie()));
        },
        moveTo(...i) {
          if (typeof i[0] == "number" && typeof i[1] == "number")
            return this.moveTo(T(i[0], i[1]), i[2]);
          let s = i[0],
            a = i[1];
          if (a === void 0) {
            this.pos = T(s);
            return;
          }
          let o = s.sub(this.pos);
          if (o.len() <= a * Ie()) {
            this.pos = T(s);
            return;
          }
          this.move(o.unit().scale(a));
        },
        worldPos() {
          return this.parent
            ? this.parent.transform.multVec2(this.pos)
            : this.pos;
        },
        screenPos() {
          let i = this.worldPos();
          return vt(this) ? i : Ir(i);
        },
        inspect() {
          return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
        },
        drawInspect() {
          q({ color: _(255, 0, 0), radius: 4 / Fe() });
        },
      };
    }
    n(Kt, "pos");
    function jt(...t) {
      return t.length === 0
        ? jt(1)
        : {
            id: "scale",
            scale: T(...t),
            scaleTo(...i) {
              this.scale = T(...i);
            },
            scaleBy(...i) {
              this.scale.scale(T(...i));
            },
            inspect() {
              return `(${Vt(this.scale.x, 2)}, ${Vt(this.scale.y, 2)})`;
            },
          };
    }
    n(jt, "scale");
    function Ui(t) {
      return {
        id: "rotate",
        angle: t ?? 0,
        rotateBy(i) {
          this.angle += i;
        },
        rotateTo(i) {
          this.angle = i;
        },
        inspect() {
          return `${Math.round(this.angle)}`;
        },
      };
    }
    n(Ui, "rotate");
    function Gi(...t) {
      return {
        id: "color",
        color: _(...t),
        inspect() {
          return this.color.toString();
        },
      };
    }
    n(Gi, "color");
    function Vt(t, i) {
      return Number(t.toFixed(i));
    }
    n(Vt, "toFixed");
    function Li(t) {
      return {
        id: "opacity",
        opacity: t ?? 1,
        inspect() {
          return `${Vt(this.opacity, 1)}`;
        },
        fadeOut(i = 1, s = gr.linear) {
          return Or(this.opacity, 0, i, (a) => (this.opacity = a), s);
        },
      };
    }
    n(Li, "opacity");
    function hr(t) {
      if (!t) throw new Error("Please define an anchor");
      return {
        id: "anchor",
        anchor: t,
        inspect() {
          return typeof this.anchor == "string"
            ? this.anchor
            : this.anchor.toString();
        },
      };
    }
    n(hr, "anchor");
    function Oi(t) {
      return {
        id: "z",
        z: t,
        inspect() {
          return `${this.z}`;
        },
      };
    }
    n(Oi, "z");
    function qi(t, i) {
      return {
        id: "follow",
        require: ["pos"],
        follow: { obj: t, offset: i ?? T(0) },
        add() {
          t.exists() &&
            (this.pos = this.follow.obj.pos.add(this.follow.offset));
        },
        update() {
          t.exists() &&
            (this.pos = this.follow.obj.pos.add(this.follow.offset));
        },
      };
    }
    n(qi, "follow");
    function Hi(t, i) {
      let s = typeof t == "number" ? E.fromAngle(t) : t.unit();
      return {
        id: "move",
        require: ["pos"],
        update() {
          this.move(s.scale(i));
        },
      };
    }
    n(Hi, "move");
    let Pn = 200;
    function Yi(t = {}) {
      let i = t.distance ?? Pn,
        s = !1;
      return {
        id: "offscreen",
        require: ["pos"],
        isOffScreen() {
          let a = this.screenPos(),
            o = new ve(T(0), Ae(), Ve());
          return !er(o, a) && o.sdistToPoint(a) > i * i;
        },
        onExitScreen(a) {
          return this.on("exitView", a);
        },
        onEnterScreen(a) {
          return this.on("enterView", a);
        },
        update() {
          this.isOffScreen()
            ? (s || (this.trigger("exitView"), (s = !0)),
              t.hide && (this.hidden = !0),
              t.pause && (this.paused = !0),
              t.destroy && this.destroy())
            : (s && (this.trigger("enterView"), (s = !1)),
              t.hide && (this.hidden = !1),
              t.pause && (this.paused = !1));
        },
      };
    }
    n(Yi, "offscreen");
    function vt(t) {
      return t.fixed ? !0 : t.parent ? vt(t.parent) : !1;
    }
    n(vt, "isFixed");
    function Ki(t = {}) {
      let i = {},
        s = new Set();
      return {
        id: "area",
        collisionIgnore: t.collisionIgnore ?? [],
        add() {
          this.area.cursor && this.onHover(() => V.setCursor(this.area.cursor)),
            this.onCollideUpdate((a, o) => {
              i[a.id] || this.trigger("collide", a, o),
                (i[a.id] = o),
                s.add(a.id);
            });
        },
        update() {
          for (let a in i)
            s.has(Number(a)) ||
              (this.trigger("collideEnd", i[a].target), delete i[a]);
          s.clear();
        },
        drawInspect() {
          let a = this.localArea();
          he(), De(this.area.scale), ee(this.area.offset);
          let o = {
            outline: { width: 4 / Fe(), color: _(0, 0, 255) },
            anchor: this.anchor,
            fill: !1,
            fixed: vt(this),
          };
          a instanceof ve
            ? we({ ...o, pos: a.pos, width: a.width, height: a.height })
            : a instanceof Xt
            ? de({ ...o, pts: a.pts })
            : a instanceof Ps && q({ ...o, pos: a.center, radius: a.radius }),
            ne();
        },
        area: {
          shape: t.shape ?? null,
          scale: t.scale ? T(t.scale) : T(1),
          offset: t.offset ?? T(0),
          cursor: t.cursor ?? null,
        },
        isClicked() {
          return V.isMousePressed() && this.isHovering();
        },
        isHovering() {
          let a = vt(this) ? qt() : kr(qt());
          return this.hasPoint(a);
        },
        checkCollision(a) {
          return i[a.id] ?? null;
        },
        getCollisions() {
          return Object.values(i);
        },
        isColliding(a) {
          return !!i[a.id];
        },
        isOverlapping(a) {
          let o = i[a.id];
          return o && o.hasOverlap();
        },
        onClick(a) {
          let o = V.onMousePress("left", () => {
            this.isHovering() && a();
          });
          return this.onDestroy(() => o.cancel()), o;
        },
        onHover(a) {
          let o = !1;
          return this.onUpdate(() => {
            o ? (o = this.isHovering()) : this.isHovering() && ((o = !0), a());
          });
        },
        onHoverUpdate(a) {
          return this.onUpdate(() => {
            this.isHovering() && a();
          });
        },
        onHoverEnd(a) {
          let o = !1;
          return this.onUpdate(() => {
            o ? this.isHovering() || ((o = !1), a()) : (o = this.isHovering());
          });
        },
        onCollide(a, o) {
          if (typeof a == "function" && o === void 0)
            return this.on("collide", a);
          if (typeof a == "string")
            return this.onCollide((l, p) => {
              l.is(a) && o(l, p);
            });
        },
        onCollideUpdate(a, o) {
          if (typeof a == "function" && o === void 0)
            return this.on("collideUpdate", a);
          if (typeof a == "string")
            return this.on("collideUpdate", (l, p) => l.is(a) && o(l, p));
        },
        onCollideEnd(a, o) {
          if (typeof a == "function" && o === void 0)
            return this.on("collideEnd", a);
          if (typeof a == "string")
            return this.on("collideEnd", (l) => l.is(a) && o(l));
        },
        hasPoint(a) {
          return ci(this.worldArea(), a);
        },
        resolveCollision(a) {
          let o = this.checkCollision(a);
          o &&
            !o.resolved &&
            ((this.pos = this.pos.add(o.displacement)), (o.resolved = !0));
        },
        localArea() {
          return this.area.shape ? this.area.shape : this.renderArea();
        },
        worldArea() {
          let a = this.localArea();
          if (!(a instanceof Xt || a instanceof ve))
            throw new Error("Only support polygon and rect shapes for now");
          let o = this.transform
            .clone()
            .scale(T(this.area.scale ?? 1))
            .translate(this.area.offset);
          if (a instanceof ve) {
            let l = at(this.anchor || mr)
              .add(1, 1)
              .scale(-0.5)
              .scale(a.width, a.height);
            o.translate(l);
          }
          return a.transform(o);
        },
        screenArea() {
          let a = this.worldArea();
          return vt(this) ? a : a.transform(S.cam.transform);
        },
      };
    }
    n(Ki, "area");
    function Xe(t) {
      return {
        color: t.color,
        opacity: t.opacity,
        anchor: t.anchor,
        outline: t.outline,
        shader: t.shader,
        uniform: t.uniform,
      };
    }
    n(Xe, "getRenderProps");
    function lr(t, i = {}) {
      let s = null,
        a = null,
        o = null,
        l = new ke();
      if (!t)
        throw new Error("Please pass the resource name or data to sprite()");
      let p = n((w, g, d, m) => {
        let P = T(1, 1);
        return (
          d && m
            ? ((P.x = d / (w.width * g.w)), (P.y = m / (w.height * g.h)))
            : d
            ? ((P.x = d / (w.width * g.w)), (P.y = P.x))
            : m && ((P.y = m / (w.height * g.h)), (P.x = P.y)),
          P
        );
      }, "calcTexScale");
      return {
        id: "sprite",
        width: 0,
        height: 0,
        frame: i.frame || 0,
        quad: i.quad || new ge(0, 0, 1, 1),
        animSpeed: i.animSpeed ?? 1,
        flipX: i.flipX ?? !1,
        flipY: i.flipY ?? !1,
        draw() {
          if (!s) return;
          let w = s.frames[this.frame ?? 0];
          if (!w) throw new Error(`Frame not found: ${this.frame ?? 0}`);
          if (s.slice9) {
            let { left: g, right: d, top: m, bottom: P } = s.slice9,
              B = s.tex.width * w.w,
              G = s.tex.height * w.h,
              L = this.width - g - d,
              k = this.height - m - P,
              N = g / B,
              Re = d / B,
              Q = 1 - N - Re,
              J = m / G,
              O = P / G,
              fe = 1 - J - O,
              x = [
                ae(0, 0, N, J),
                ae(N, 0, Q, J),
                ae(N + Q, 0, Re, J),
                ae(0, J, N, fe),
                ae(N, J, Q, fe),
                ae(N + Q, J, Re, fe),
                ae(0, J + fe, N, O),
                ae(N, J + fe, Q, O),
                ae(N + Q, J + fe, Re, O),
                ae(0, 0, g, m),
                ae(g, 0, L, m),
                ae(g + L, 0, d, m),
                ae(0, m, g, k),
                ae(g, m, L, k),
                ae(g + L, m, d, k),
                ae(0, m + k, g, P),
                ae(g, m + k, L, P),
                ae(g + L, m + k, d, P),
              ];
            for (let F = 0; F < 9; F++) {
              let I = x[F],
                C = x[F + 9];
              Qe(
                Object.assign(Xe(this), {
                  pos: C.pos(),
                  tex: s.tex,
                  quad: w.scale(I),
                  flipX: this.flipX,
                  flipY: this.flipY,
                  tiled: i.tiled,
                  width: C.w,
                  height: C.h,
                })
              );
            }
          } else
            Qe(
              Object.assign(Xe(this), {
                tex: s.tex,
                quad: w.scale(this.quad ?? new ge(0, 0, 1, 1)),
                flipX: this.flipX,
                flipY: this.flipY,
                tiled: i.tiled,
                width: this.width,
                height: this.height,
              })
            );
        },
        add() {
          let w = n((d) => {
              let m = d.frames[0].clone();
              i.quad && (m = m.scale(i.quad));
              let P = p(d.tex, m, i.width, i.height);
              (this.width = d.tex.width * m.w * P.x),
                (this.height = d.tex.height * m.h * P.y),
                i.anim && this.play(i.anim),
                (s = d),
                l.trigger(s);
            }, "setSpriteData"),
            g = et(t);
          g ? g.onLoad(w) : dr(() => w(et(t).data));
        },
        update() {
          if (!a) return;
          let w = s.anims[a.name];
          if (typeof w == "number") {
            this.frame = w;
            return;
          }
          if (w.speed === 0) throw new Error("Sprite anim speed cannot be 0");
          (a.timer += Ie() * this.animSpeed),
            a.timer >= 1 / a.speed &&
              ((a.timer = 0),
              (this.frame += o),
              (this.frame < Math.min(w.from, w.to) ||
                this.frame > Math.max(w.from, w.to)) &&
                (a.loop
                  ? a.pingpong
                    ? ((this.frame -= o), (o *= -1), (this.frame += o))
                    : (this.frame = w.from)
                  : ((this.frame = w.to), a.onEnd(), this.stop())));
        },
        play(w, g = {}) {
          if (!s) {
            l.add(() => this.play(w, g));
            return;
          }
          let d = s.anims[w];
          if (d === void 0) throw new Error(`Anim not found: ${w}`);
          a && this.stop(),
            (a =
              typeof d == "number"
                ? {
                    name: w,
                    timer: 0,
                    loop: !1,
                    pingpong: !1,
                    speed: 0,
                    onEnd: () => {},
                  }
                : {
                    name: w,
                    timer: 0,
                    loop: g.loop ?? d.loop ?? !1,
                    pingpong: g.pingpong ?? d.pingpong ?? !1,
                    speed: g.speed ?? d.speed ?? 10,
                    onEnd: g.onEnd ?? (() => {}),
                  }),
            (o = typeof d == "number" ? null : d.from < d.to ? 1 : -1),
            (this.frame = typeof d == "number" ? d : d.from),
            this.trigger("animStart", w);
        },
        stop() {
          if (!a) return;
          let w = a.name;
          (a = null), this.trigger("animEnd", w);
        },
        numFrames() {
          return s?.frames.length ?? 0;
        },
        curAnim() {
          return a?.name;
        },
        onAnimEnd(w) {
          return this.on("animEnd", w);
        },
        onAnimStart(w) {
          return this.on("animStart", w);
        },
        renderArea() {
          return new ve(T(0), this.width, this.height);
        },
        inspect() {
          if (typeof t == "string") return `"${t}"`;
        },
      };
    }
    n(lr, "sprite");
    function ji(t, i = {}) {
      function s(o) {
        let l = ze(
          Object.assign(Xe(o), {
            text: o.text + "",
            size: o.textSize,
            font: o.font,
            width: i.width && o.width,
            align: o.align,
            letterSpacing: o.letterSpacing,
            lineSpacing: o.lineSpacing,
            transform: o.textTransform,
            styles: o.textStyles,
          })
        );
        return (
          i.width || (o.width = l.width / (o.scale?.x || 1)),
          (o.height = l.height / (o.scale?.y || 1)),
          l
        );
      }
      n(s, "update");
      let a = {
        id: "text",
        set text(o) {
          (t = o), s(this);
        },
        get text() {
          return t;
        },
        textSize: i.size ?? ho,
        font: i.font,
        width: i.width ?? 0,
        height: 0,
        align: i.align,
        lineSpacing: i.lineSpacing,
        letterSpacing: i.letterSpacing,
        textTransform: i.transform,
        textStyles: i.styles,
        add() {
          dr(() => s(this));
        },
        draw() {
          Je(s(this));
        },
        renderArea() {
          return new ve(T(0), this.width, this.height);
        },
      };
      return s(a), a;
    }
    n(ji, "text");
    function Qi(t, i = {}) {
      if (t.length < 3)
        throw new Error(
          `Polygon's need more than two points, ${t.length} points provided`
        );
      return {
        id: "polygon",
        pts: t,
        colors: i.colors,
        radius: i.radius,
        draw() {
          de(
            Object.assign(Xe(this), {
              pts: this.pts,
              colors: this.colors,
              radius: this.radius,
              fill: i.fill,
            })
          );
        },
        renderArea() {
          return new Xt(this.pts);
        },
        inspect() {
          return this.pts.map((s) => `[${s.x},${s.y}]`).join(",");
        },
      };
    }
    n(Qi, "polygon");
    function zi(t, i, s = {}) {
      return {
        id: "rect",
        width: t,
        height: i,
        radius: s.radius || 0,
        draw() {
          we(
            Object.assign(Xe(this), {
              width: this.width,
              height: this.height,
              radius: this.radius,
              fill: s.fill,
            })
          );
        },
        renderArea() {
          return new ve(T(0), this.width, this.height);
        },
        inspect() {
          return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
        },
      };
    }
    n(zi, "rect");
    function Ji(t, i) {
      return {
        id: "rect",
        width: t,
        height: i,
        draw() {
          Ce(
            Object.assign(Xe(this), { width: this.width, height: this.height })
          );
        },
        renderArea() {
          return new ve(T(0), this.width, this.height);
        },
        inspect() {
          return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
        },
      };
    }
    n(Ji, "uvquad");
    function Xi(t, i = {}) {
      return {
        id: "circle",
        radius: t,
        draw() {
          q(Object.assign(Xe(this), { radius: this.radius, fill: i.fill }));
        },
        renderArea() {
          return new ve(
            new E(this.anchor ? 0 : -this.radius),
            this.radius * 2,
            this.radius * 2
          );
        },
        inspect() {
          return `${Math.ceil(this.radius)}`;
        },
      };
    }
    n(Xi, "circle");
    function Wi(t = 1, i = _(0, 0, 0)) {
      return { id: "outline", outline: { width: t, color: i } };
    }
    n(Wi, "outline");
    function ur() {
      return {
        id: "timer",
        wait(t, i) {
          let s = [];
          i && s.push(i);
          let a = 0,
            o = this.onUpdate(() => {
              (a += Ie()), a >= t && (s.forEach((l) => l()), o.cancel());
            });
          return {
            get paused() {
              return o.paused;
            },
            set paused(l) {
              o.paused = l;
            },
            cancel: o.cancel,
            onEnd(l) {
              s.push(l);
            },
            then(l) {
              return this.onEnd(l), this;
            },
          };
        },
        loop(t, i) {
          let s = null,
            a = n(() => {
              (s = this.wait(t, a)), i();
            }, "newAction");
          return (
            (s = this.wait(0, a)),
            {
              get paused() {
                return s.paused;
              },
              set paused(o) {
                s.paused = o;
              },
              cancel: () => s.cancel(),
            }
          );
        },
        tween(t, i, s, a, o = gr.linear) {
          let l = 0,
            p = [],
            w = this.onUpdate(() => {
              l += Ie();
              let g = Math.min(l / s, 1);
              a(Ke(t, i, o(g))),
                g === 1 && (w.cancel(), a(i), p.forEach((d) => d()));
            });
          return {
            get paused() {
              return w.paused;
            },
            set paused(g) {
              w.paused = g;
            },
            onEnd(g) {
              p.push(g);
            },
            then(g) {
              return this.onEnd(g), this;
            },
            cancel() {
              w.cancel();
            },
            finish() {
              w.cancel(), a(i), p.forEach((g) => g());
            },
          };
        },
      };
    }
    n(ur, "timer");
    let Bn = 640,
      Fn = 65536;
    function Zi(t = {}) {
      let i = null,
        s = null,
        a = !1;
      return {
        id: "body",
        require: ["pos", "area"],
        vel: new E(0),
        jumpForce: t.jumpForce ?? Bn,
        gravityScale: t.gravityScale ?? 1,
        isStatic: t.isStatic ?? !1,
        mass: t.mass ?? 1,
        add() {
          if (this.mass === 0) throw new Error("Can't set body mass to 0");
          this.onCollideUpdate((o, l) => {
            if (
              o.is("body") &&
              !l.resolved &&
              (this.trigger("beforePhysicsResolve", l),
              o.trigger("beforePhysicsResolve", l.reverse()),
              !l.resolved && !(this.isStatic && o.isStatic))
            ) {
              if (!this.isStatic && !o.isStatic) {
                let p = this.mass + o.mass;
                (this.pos = this.pos.add(l.displacement.scale(o.mass / p))),
                  (o.pos = o.pos.add(l.displacement.scale(-this.mass / p))),
                  (this.transform = Ht(this)),
                  (o.transform = Ht(o));
              } else {
                let p = !this.isStatic && o.isStatic ? l : l.reverse();
                (p.source.pos = p.source.pos.add(p.displacement)),
                  (p.source.transform = Ht(p.source));
              }
              (l.resolved = !0),
                this.trigger("physicsResolve", l),
                o.trigger("physicsResolve", l.reverse());
            }
          }),
            this.onPhysicsResolve((o) => {
              S.gravity &&
                (o.isBottom() && this.isFalling()
                  ? ((this.vel.y = 0),
                    (i = o.target),
                    (s = o.target.pos),
                    a ? (a = !1) : this.trigger("ground", i))
                  : o.isTop() &&
                    this.isJumping() &&
                    ((this.vel.y = 0), this.trigger("headbutt", o.target)));
            });
        },
        update() {
          if (!S.gravity || this.isStatic) return;
          if (
            (a && ((i = null), (s = null), this.trigger("fallOff"), (a = !1)),
            i)
          )
            if (!this.isColliding(i) || !i.exists() || !i.is("body")) a = !0;
            else {
              !i.pos.eq(s) &&
                t.stickToPlatform !== !1 &&
                this.moveBy(i.pos.sub(s)),
                (s = i.pos);
              return;
            }
          let o = this.vel.y;
          (this.vel.y += S.gravity * this.gravityScale * Ie()),
            (this.vel.y = Math.min(this.vel.y, t.maxVelocity ?? Fn)),
            o < 0 && this.vel.y >= 0 && this.trigger("fall"),
            this.move(this.vel);
        },
        onPhysicsResolve(o) {
          return this.on("physicsResolve", o);
        },
        onBeforePhysicsResolve(o) {
          return this.on("beforePhysicsResolve", o);
        },
        curPlatform() {
          return i;
        },
        isGrounded() {
          return i !== null;
        },
        isFalling() {
          return this.vel.y > 0;
        },
        isJumping() {
          return this.vel.y < 0;
        },
        jump(o) {
          (i = null), (s = null), (this.vel.y = -o || -this.jumpForce);
        },
        onGround(o) {
          return this.on("ground", o);
        },
        onFall(o) {
          return this.on("fall", o);
        },
        onFallOff(o) {
          return this.on("fallOff", o);
        },
        onHeadbutt(o) {
          return this.on("headbutt", o);
        },
      };
    }
    n(Zi, "body");
    function _i(t = 2) {
      let i = t;
      return {
        id: "doubleJump",
        require: ["body"],
        numJumps: t,
        add() {
          this.onGround(() => {
            i = this.numJumps;
          });
        },
        doubleJump(s) {
          i <= 0 ||
            (i < this.numJumps && this.trigger("doubleJump"),
            i--,
            this.jump(s));
        },
        onDoubleJump(s) {
          return this.on("doubleJump", s);
        },
        inspect() {
          return `${i}`;
        },
      };
    }
    n(_i, "doubleJump");
    function $i(t, i) {
      return {
        id: "shader",
        shader: t,
        ...(typeof i == "function"
          ? {
              uniform: i(),
              update() {
                this.uniform = i();
              },
            }
          : { uniform: i }),
      };
    }
    n($i, "shader");
    function es() {
      return { id: "fixed", fixed: !0 };
    }
    n(es, "fixed");
    function Cr(t) {
      return { id: "stay", stay: !0, scenesToStay: t };
    }
    n(Cr, "stay");
    function ts(t, i) {
      if (t == null)
        throw new Error("health() requires the initial amount of hp");
      return {
        id: "health",
        hurt(s = 1) {
          this.setHP(t - s), this.trigger("hurt", s);
        },
        heal(s = 1) {
          let a = t;
          this.setHP(t + s), this.trigger("heal", t - a);
        },
        hp() {
          return t;
        },
        maxHP() {
          return i ?? null;
        },
        setMaxHP(s) {
          i = s;
        },
        setHP(s) {
          (t = i ? Math.min(i, s) : s), t <= 0 && this.trigger("death");
        },
        onHurt(s) {
          return this.on("hurt", s);
        },
        onHeal(s) {
          return this.on("heal", s);
        },
        onDeath(s) {
          return this.on("death", s);
        },
        inspect() {
          return `${t}`;
        },
      };
    }
    n(ts, "health");
    function rs(t, i = {}) {
      if (t == null) throw new Error("lifespan() requires time");
      let s = i.fade ?? 0;
      return {
        id: "lifespan",
        async add() {
          await ms(t),
            s > 0 &&
              this.opacity &&
              (await Or(
                this.opacity,
                0,
                s,
                (a) => (this.opacity = a),
                gr.linear
              )),
            this.destroy();
        },
      };
    }
    n(rs, "lifespan");
    function is(t, i, s) {
      if (!t) throw new Error("state() requires an initial state");
      let a = {};
      function o(g) {
        a[g] ||
          (a[g] = {
            enter: new ke(),
            end: new ke(),
            update: new ke(),
            draw: new ke(),
          });
      }
      n(o, "initStateEvents");
      function l(g, d, m) {
        return o(d), a[d][g].add(m);
      }
      n(l, "on");
      function p(g, d, ...m) {
        o(d), a[d][g].trigger(...m);
      }
      n(p, "trigger");
      let w = !1;
      return {
        id: "state",
        state: t,
        enterState(g, ...d) {
          if (((w = !0), i && !i.includes(g)))
            throw new Error(`State not found: ${g}`);
          let m = this.state;
          if (s) {
            if (!s?.[m]) return;
            let P = typeof s[m] == "string" ? [s[m]] : s[m];
            if (!P.includes(g))
              throw new Error(
                `Cannot transition state from "${m}" to "${g}". Available transitions: ${P.map(
                  (B) => `"${B}"`
                ).join(", ")}`
              );
          }
          p("end", m, ...d),
            (this.state = g),
            p("enter", g, ...d),
            p("enter", `${m} -> ${g}`, ...d);
        },
        onStateTransition(g, d, m) {
          return l("enter", `${g} -> ${d}`, m);
        },
        onStateEnter(g, d) {
          return l("enter", g, d);
        },
        onStateUpdate(g, d) {
          return l("update", g, d);
        },
        onStateDraw(g, d) {
          return l("draw", g, d);
        },
        onStateEnd(g, d) {
          return l("end", g, d);
        },
        update() {
          w || (p("enter", t), (w = !0)), p("update", this.state);
        },
        draw() {
          p("draw", this.state);
        },
        inspect() {
          return this.state;
        },
      };
    }
    n(is, "state");
    function ss(t = 1) {
      let i = 0,
        s = !1;
      return {
        require: ["opacity"],
        add() {
          this.opacity = 0;
        },
        update() {
          s ||
            ((i += Ie()),
            (this.opacity = Ze(i, 0, t, 0, 1)),
            i >= t && ((this.opacity = 1), (s = !0)));
        },
      };
    }
    n(ss, "fadeIn");
    function ns(t = "intersect") {
      return { id: "mask", mask: t };
    }
    n(ns, "mask");
    function os(t) {
      return {
        add() {
          this.canvas = t;
        },
      };
    }
    n(os, "drawon");
    function dr(t) {
      U.loaded ? t() : S.events.on("load", t);
    }
    n(dr, "onLoad");
    function as(t, i) {
      S.scenes[t] = i;
    }
    n(as, "scene");
    function hs(t, ...i) {
      if (!S.scenes[t]) throw new Error(`Scene not found: ${t}`);
      S.events.onOnce("frameEnd", () => {
        S.events.trigger("sceneLeave", t),
          V.events.clear(),
          S.events.clear(),
          S.objEvents.clear(),
          [...S.root.children].forEach((s) => {
            (!s.stay || (s.scenesToStay && !s.scenesToStay.includes(t))) &&
              S.root.remove(s);
          }),
          S.root.clearEvents(),
          Qr(),
          (S.cam = {
            pos: null,
            scale: T(1),
            angle: 0,
            shake: 0,
            transform: new Ne(),
          }),
          S.scenes[t](...i);
      });
    }
    n(hs, "go");
    function ls(t) {
      return S.events.on("sceneLeave", t);
    }
    n(ls, "onSceneLeave");
    function us(t, i) {
      try {
        return JSON.parse(window.localStorage[t]);
      } catch {
        return i ? (Nr(t, i), i) : null;
      }
    }
    n(us, "getData");
    function Nr(t, i) {
      window.localStorage[t] = JSON.stringify(i);
    }
    n(Nr, "setData");
    function Ur(t, ...i) {
      let s = t(nt),
        a;
      typeof s == "function" ? (a = s(...i)(nt)) : (a = s);
      for (let o in a) (nt[o] = a[o]), r.global !== !1 && (window[o] = a[o]);
      return nt;
    }
    n(Ur, "plug");
    function Qt() {
      return T(Ae() / 2, Ve() / 2);
    }
    n(Qt, "center");
    let In;
    ((t) => (
      (t[(t.None = 0)] = "None"),
      (t[(t.Left = 1)] = "Left"),
      (t[(t.Top = 2)] = "Top"),
      (t[(t.LeftTop = 3)] = "LeftTop"),
      (t[(t.Right = 4)] = "Right"),
      (t[(t.Horizontal = 5)] = "Horizontal"),
      (t[(t.RightTop = 6)] = "RightTop"),
      (t[(t.HorizontalTop = 7)] = "HorizontalTop"),
      (t[(t.Bottom = 8)] = "Bottom"),
      (t[(t.LeftBottom = 9)] = "LeftBottom"),
      (t[(t.Vertical = 10)] = "Vertical"),
      (t[(t.LeftVertical = 11)] = "LeftVertical"),
      (t[(t.RightBottom = 12)] = "RightBottom"),
      (t[(t.HorizontalBottom = 13)] = "HorizontalBottom"),
      (t[(t.RightVertical = 14)] = "RightVertical"),
      (t[(t.All = 15)] = "All")
    ))((In ||= {}));
    function Gr(t = {}) {
      let i = T(0),
        s = t.isObstacle ?? !1,
        a = t.cost ?? 0,
        o = t.edges ?? [],
        l = n(() => {
          let w = { left: 1, top: 2, right: 4, bottom: 8 };
          return o.map((g) => w[g] || 0).reduce((g, d) => g | d, 0);
        }, "getEdgeMask"),
        p = l();
      return {
        id: "tile",
        tilePosOffset: t.offset ?? T(0),
        set tilePos(w) {
          let g = this.getLevel();
          (i = w.clone()),
            (this.pos = T(
              this.tilePos.x * g.tileWidth(),
              this.tilePos.y * g.tileHeight()
            ).add(this.tilePosOffset));
        },
        get tilePos() {
          return i;
        },
        set isObstacle(w) {
          s !== w && ((s = w), this.getLevel().invalidateNavigationMap());
        },
        get isObstacle() {
          return s;
        },
        set cost(w) {
          a !== w && ((a = w), this.getLevel().invalidateNavigationMap());
        },
        get cost() {
          return a;
        },
        set edges(w) {
          (o = w), (p = l()), this.getLevel().invalidateNavigationMap();
        },
        get edges() {
          return o;
        },
        get edgeMask() {
          return p;
        },
        getLevel() {
          return this.parent;
        },
        moveLeft() {
          this.tilePos = this.tilePos.add(T(-1, 0));
        },
        moveRight() {
          this.tilePos = this.tilePos.add(T(1, 0));
        },
        moveUp() {
          this.tilePos = this.tilePos.add(T(0, -1));
        },
        moveDown() {
          this.tilePos = this.tilePos.add(T(0, 1));
        },
      };
    }
    n(Gr, "tile");
    function ds(t, i) {
      if (!i.tileWidth || !i.tileHeight)
        throw new Error("Must provide tileWidth and tileHeight.");
      let s = zt([Kt(i.pos ?? T(0))]),
        a = t.length,
        o = 0,
        l = null,
        p = null,
        w = null,
        g = null,
        d = n((x) => x.x + x.y * o, "tile2Hash"),
        m = n((x) => T(Math.floor(x % o), Math.floor(x / o)), "hash2Tile"),
        P = n(() => {
          l = [];
          for (let x of s.children) B(x);
        }, "createSpatialMap"),
        B = n((x) => {
          let F = d(x.tilePos);
          l[F] ? l[F].push(x) : (l[F] = [x]);
        }, "insertIntoSpatialMap"),
        G = n((x) => {
          let F = d(x.tilePos);
          if (l[F]) {
            let I = l[F].indexOf(x);
            I >= 0 && l[F].splice(I, 1);
          }
        }, "removeFromSpatialMap"),
        L = n(() => {
          let x = !1;
          for (let F of s.children) {
            let I = s.pos2Tile(F.pos);
            (F.tilePos.x != I.x || F.tilePos.y != I.y) &&
              ((x = !0), G(F), (F.tilePos.x = I.x), (F.tilePos.y = I.y), B(F));
          }
          x && s.trigger("spatial_map_changed");
        }, "updateSpatialMap"),
        k = n(() => {
          let x = s.getSpatialMap(),
            F = s.numRows() * s.numColumns();
          p ? (p.length = F) : (p = new Array(F)), p.fill(1, 0, F);
          for (let I = 0; I < x.length; I++) {
            let C = x[I];
            if (C) {
              let X = 0;
              for (let $ of C)
                if ($.isObstacle) {
                  X = 1 / 0;
                  break;
                } else X += $.cost;
              p[I] = X || 1;
            }
          }
        }, "createCostMap"),
        N = n(() => {
          let x = s.getSpatialMap(),
            F = s.numRows() * s.numColumns();
          w ? (w.length = F) : (w = new Array(F)), w.fill(15, 0, F);
          for (let I = 0; I < x.length; I++) {
            let C = x[I];
            if (C) {
              let X = C.length,
                $ = 15;
              for (let oe = 0; oe < X; oe++) $ |= C[oe].edgeMask;
              w[I] = $;
            }
          }
        }, "createEdgeMap"),
        Re = n(() => {
          let x = s.numRows() * s.numColumns(),
            F = n((C, X) => {
              let $ = [];
              for ($.push(C); $.length > 0; ) {
                let oe = $.pop();
                O(oe).forEach((pe) => {
                  g[pe] < 0 && ((g[pe] = X), $.push(pe));
                });
              }
            }, "traverse");
          g ? (g.length = x) : (g = new Array(x)), g.fill(-1, 0, x);
          let I = 0;
          for (let C = 0; C < p.length; C++) {
            if (g[C] >= 0) {
              I++;
              continue;
            }
            F(C, I), I++;
          }
        }, "createConnectivityMap"),
        Q = n((x, F) => p[F], "getCost"),
        J = n((x, F) => {
          let I = m(x),
            C = m(F);
          return I.dist(C);
        }, "getHeuristic"),
        O = n((x, F) => {
          let I = [],
            C = Math.floor(x % o),
            X = C > 0 && w[x] & 1 && p[x - 1] !== 1 / 0,
            $ = x >= o && w[x] & 2 && p[x - o] !== 1 / 0,
            oe = C < o - 1 && w[x] & 4 && p[x + 1] !== 1 / 0,
            pe = x < o * a - o - 1 && w[x] & 8 && p[x + o] !== 1 / 0;
          return (
            F
              ? (X &&
                  ($ && I.push(x - o - 1),
                  I.push(x - 1),
                  pe && I.push(x + o - 1)),
                $ && I.push(x - o),
                oe &&
                  ($ && I.push(x - o + 1),
                  I.push(x + 1),
                  pe && I.push(x + o + 1)),
                pe && I.push(x + o))
              : (X && I.push(x - 1),
                $ && I.push(x - o),
                oe && I.push(x + 1),
                pe && I.push(x + o)),
            I
          );
        }, "getNeighbours"),
        fe = {
          id: "level",
          tileWidth() {
            return i.tileWidth;
          },
          tileHeight() {
            return i.tileHeight;
          },
          spawn(x, ...F) {
            let I = T(...F),
              C = (() => {
                if (typeof x == "string") {
                  if (i.tiles[x]) {
                    if (typeof i.tiles[x] != "function")
                      throw new Error(
                        "Level symbol def must be a function returning a component list"
                      );
                    return i.tiles[x](I);
                  } else if (i.wildcardTile) return i.wildcardTile(x, I);
                } else {
                  if (Array.isArray(x)) return x;
                  throw new Error("Expected a symbol or a component list");
                }
              })();
            if (!C) return null;
            let X = !1,
              $ = !1;
            for (let pe of C)
              pe.id === "tile" && ($ = !0), pe.id === "pos" && (X = !0);
            X || C.push(Kt()), $ || C.push(Gr());
            let oe = s.add(C);
            return (
              X && (oe.tilePosOffset = oe.pos.clone()),
              (oe.tilePos = I),
              l &&
                (B(oe),
                this.trigger("spatial_map_changed"),
                this.trigger("navigation_map_invalid")),
              oe
            );
          },
          numColumns() {
            return o;
          },
          numRows() {
            return a;
          },
          levelWidth() {
            return o * this.tileWidth();
          },
          levelHeight() {
            return a * this.tileHeight();
          },
          tile2Pos(...x) {
            return T(...x).scale(this.tileWidth(), this.tileHeight());
          },
          pos2Tile(...x) {
            let F = T(...x);
            return T(
              Math.floor(F.x / this.tileWidth()),
              Math.floor(F.y / this.tileHeight())
            );
          },
          getSpatialMap() {
            return l || P(), l;
          },
          onSpatialMapChanged(x) {
            return this.on("spatial_map_changed", x);
          },
          onNavigationMapInvalid(x) {
            return this.on("navigation_map_invalid", x);
          },
          getAt(x) {
            l || P();
            let F = d(x);
            return l[F] || [];
          },
          update() {
            l && L();
          },
          invalidateNavigationMap() {
            (p = null), (w = null), (g = null);
          },
          onNavigationMapChanged(x) {
            return this.on("navigation_map_changed", x);
          },
          getTilePath(x, F, I = {}) {
            if (
              (p || k(),
              w || N(),
              g || Re(),
              x.x < 0 ||
                x.x >= o ||
                x.y < 0 ||
                x.y >= a ||
                F.x < 0 ||
                F.x >= o ||
                F.y < 0 ||
                F.y >= a)
            )
              return null;
            let C = d(x),
              X = d(F);
            if (p[X] === 1 / 0) return null;
            if (C === X) return [];
            if (g[C] != -1 && g[C] !== g[X]) return null;
            let $ = new Jn((qe, Jr) => qe.cost < Jr.cost);
            $.insert({ cost: 0, node: C });
            let oe = new Map();
            oe.set(C, C);
            let pe = new Map();
            for (pe.set(C, 0); $.length !== 0; ) {
              let qe = $.remove()?.node;
              if (qe === X) break;
              let Jr = O(qe, I.allowDiagonals);
              for (let ot of Jr) {
                let Xr = (pe.get(qe) || 0) + Q(qe, ot) + J(ot, X);
                (!pe.has(ot) || Xr < pe.get(ot)) &&
                  (pe.set(ot, Xr),
                  $.insert({ cost: Xr, node: ot }),
                  oe.set(ot, qe));
              }
            }
            let zr = [],
              Jt = X,
              Gn = m(Jt);
            for (zr.push(Gn); Jt !== C; ) {
              Jt = oe.get(Jt);
              let qe = m(Jt);
              zr.push(qe);
            }
            return zr.reverse();
          },
          getPath(x, F, I = {}) {
            let C = this.tileWidth(),
              X = this.tileHeight(),
              $ = this.getTilePath(this.pos2Tile(x), this.pos2Tile(F), I);
            return $
              ? [
                  x,
                  ...$.slice(1, -1).map((oe) =>
                    oe.scale(C, X).add(C / 2, X / 2)
                  ),
                  F,
                ]
              : null;
          },
        };
      return (
        s.use(fe),
        s.onNavigationMapInvalid(() => {
          s.invalidateNavigationMap(), s.trigger("navigation_map_changed");
        }),
        t.forEach((x, F) => {
          let I = x.split("");
          (o = Math.max(I.length, o)),
            I.forEach((C, X) => {
              s.spawn(C, T(X, F));
            });
        }),
        s
      );
    }
    n(ds, "addLevel");
    function cs(t = {}) {
      let i = null,
        s = null,
        a = null,
        o = null;
      return {
        id: "agent",
        require: ["pos", "tile"],
        agentSpeed: t.speed ?? 100,
        allowDiagonals: t.allowDiagonals ?? !0,
        getDistanceToTarget() {
          return i ? this.pos.dist(i) : 0;
        },
        getNextLocation() {
          return s && a ? s[a] : null;
        },
        getPath() {
          return s ? s.slice() : null;
        },
        getTarget() {
          return i;
        },
        isNavigationFinished() {
          return s ? a === null : !0;
        },
        isTargetReachable() {
          return s !== null;
        },
        isTargetReached() {
          return i ? this.pos.eq(i) : !0;
        },
        setTarget(l) {
          (i = l),
            (s = this.getLevel().getPath(this.pos, i, {
              allowDiagonals: this.allowDiagonals,
            })),
            (a = s ? 0 : null),
            s
              ? (o ||
                  ((o = this.getLevel().onNavigationMapChanged(() => {
                    s &&
                      a !== null &&
                      ((s = this.getLevel().getPath(this.pos, i, {
                        allowDiagonals: this.allowDiagonals,
                      })),
                      (a = s ? 0 : null),
                      s
                        ? this.trigger("navigation-next", this, s[a])
                        : this.trigger("navigation-ended", this));
                  })),
                  this.onDestroy(() => o.cancel())),
                this.trigger("navigation-started", this),
                this.trigger("navigation-next", this, s[a]))
              : this.trigger("navigation-ended", this);
        },
        update() {
          if (s && a !== null) {
            if (this.pos.sdist(s[a]) < 2)
              if (a === s.length - 1) {
                (this.pos = i.clone()),
                  (a = null),
                  this.trigger("navigation-ended", this),
                  this.trigger("target-reached", this);
                return;
              } else a++, this.trigger("navigation-next", this, s[a]);
            this.moveTo(s[a], this.agentSpeed);
          }
        },
        onNavigationStarted(l) {
          return this.on("navigation-started", l);
        },
        onNavigationNext(l) {
          return this.on("navigation-next", l);
        },
        onNavigationEnded(l) {
          return this.on("navigation-ended", l);
        },
        onTargetReached(l) {
          return this.on("target-reached", l);
        },
        inspect() {
          return JSON.stringify({
            target: JSON.stringify(i),
            path: JSON.stringify(s),
          });
        },
      };
    }
    n(cs, "agent");
    function fs(t) {
      let i = V.canvas.captureStream(t),
        s = re.ctx.createMediaStreamDestination();
      re.masterNode.connect(s);
      let a = new MediaRecorder(i),
        o = [];
      return (
        (a.ondataavailable = (l) => {
          l.data.size > 0 && o.push(l.data);
        }),
        (a.onerror = () => {
          re.masterNode.disconnect(s), i.getTracks().forEach((l) => l.stop());
        }),
        a.start(),
        {
          resume() {
            a.resume();
          },
          pause() {
            a.pause();
          },
          stop() {
            return (
              a.stop(),
              re.masterNode.disconnect(s),
              i.getTracks().forEach((l) => l.stop()),
              new Promise((l) => {
                a.onstop = () => {
                  l(new Blob(o, { type: "video/mp4" }));
                };
              })
            );
          },
          download(l = "kaboom.mp4") {
            this.stop().then((p) => oi(l, p));
          },
        }
      );
    }
    n(fs, "record");
    function ps() {
      return document.activeElement === V.canvas;
    }
    n(ps, "isFocused");
    function gs(t) {
      t.destroy();
    }
    n(gs, "destroy");
    let zt = S.root.add.bind(S.root),
      kn = S.root.readd.bind(S.root),
      Dn = S.root.removeAll.bind(S.root),
      Lr = S.root.get.bind(S.root),
      ms = S.root.wait.bind(S.root),
      Cn = S.root.loop.bind(S.root),
      Or = S.root.tween.bind(S.root);
    function qr(t = 2, i = 1) {
      let s = 0;
      return {
        require: ["scale"],
        update() {
          let a = Math.sin(s * t) * i;
          a < 0 && this.destroy(), (this.scale = T(a)), (s += Ie());
        },
      };
    }
    n(qr, "boom");
    let Nn = Ge(null, so),
      Un = Ge(null, no);
    function ws(t, i = {}) {
      let s = zt([Kt(t), Cr()]),
        a = (i.speed || 1) * 5,
        o = i.scale || 1;
      s.add([lr(Un), jt(0), hr("center"), qr(a, o), ...(i.comps ?? [])]);
      let l = s.add([lr(Nn), jt(0), hr("center"), ur(), ...(i.comps ?? [])]);
      return (
        l.wait(0.4 / a, () => l.use(qr(a, o))),
        l.onDestroy(() => s.destroy()),
        s
      );
    }
    n(ws, "addKaboom");
    function Hr() {
      S.root.update();
    }
    n(Hr, "updateFrame");
    class Yr {
      static {
        n(this, "Collision");
      }
      source;
      target;
      displacement;
      resolved = !1;
      constructor(i, s, a, o = !1) {
        (this.source = i),
          (this.target = s),
          (this.displacement = a),
          (this.resolved = o);
      }
      reverse() {
        return new Yr(
          this.target,
          this.source,
          this.displacement.scale(-1),
          this.resolved
        );
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.x > 0;
      }
      isRight() {
        return this.displacement.x < 0;
      }
      isTop() {
        return this.displacement.y > 0;
      }
      isBottom() {
        return this.displacement.y < 0;
      }
      preventResolution() {
        this.resolved = !0;
      }
    }
    function As() {
      let t = {},
        i = r.hashGridSize || lo,
        s = new Ne(),
        a = [];
      function o(l) {
        if (
          (a.push(s.clone()),
          l.pos && s.translate(l.pos),
          l.scale && s.scale(l.scale),
          l.angle && s.rotate(l.angle),
          (l.transform = s.clone()),
          l.c("area") && !l.paused)
        ) {
          let p = l,
            w = p.worldArea().bbox(),
            g = Math.floor(w.pos.x / i),
            d = Math.floor(w.pos.y / i),
            m = Math.ceil((w.pos.x + w.width) / i),
            P = Math.ceil((w.pos.y + w.height) / i),
            B = new Set();
          for (let G = g; G <= m; G++)
            for (let L = d; L <= P; L++)
              if (!t[G]) (t[G] = {}), (t[G][L] = [p]);
              else if (!t[G][L]) t[G][L] = [p];
              else {
                let k = t[G][L];
                e: for (let N of k) {
                  if (N.paused || !N.exists() || B.has(N.id)) continue;
                  for (let Q of p.collisionIgnore) if (N.is(Q)) continue e;
                  for (let Q of N.collisionIgnore) if (p.is(Q)) continue e;
                  let Re = $s(p.worldArea(), N.worldArea());
                  if (Re) {
                    let Q = new Yr(p, N, Re);
                    p.trigger("collideUpdate", N, Q);
                    let J = Q.reverse();
                    (J.resolved = Q.resolved), N.trigger("collideUpdate", p, J);
                  }
                  B.add(N.id);
                }
                k.push(p);
              }
        }
        l.children.forEach(o), (s = a.pop());
      }
      n(o, "checkObj"), o(S.root);
    }
    n(As, "checkFrame");
    function Vs() {
      let t = S.cam,
        i = E.fromAngle($t(0, 360)).scale(t.shake);
      (t.shake = Ke(t.shake, 0, 5 * Ie())),
        (t.transform = new Ne()
          .translate(Qt())
          .scale(t.scale)
          .rotate(t.angle)
          .translate((t.pos ?? Qt()).scale(-1).add(i))),
        S.root.draw(),
        Pe();
    }
    n(Vs, "drawFrame");
    function vs() {
      let t = Y();
      S.events.numListeners("loading") > 0
        ? S.events.trigger("loading", t)
        : Se(() => {
            let i = Ae() / 2,
              s = 24,
              a = T(Ae() / 2, Ve() / 2).sub(T(i / 2, s / 2));
            we({ pos: T(0), width: Ae(), height: Ve(), color: _(0, 0, 0) }),
              we({
                pos: a,
                width: i,
                height: s,
                fill: !1,
                outline: { width: 4 },
              }),
              we({ pos: a, width: i * t, height: s });
          });
    }
    n(vs, "drawLoadScreen");
    function Kr(t, i) {
      Se(() => {
        let s = T(8);
        he(), ee(t);
        let a = ze({
            text: i,
            font: wr,
            size: 16,
            pos: s,
            color: _(255, 255, 255),
            fixed: !0,
          }),
          o = a.width + s.x * 2,
          l = a.height + s.x * 2;
        t.x + o >= Ae() && ee(T(-o, 0)),
          t.y + l >= Ve() && ee(T(0, -l)),
          we({
            width: o,
            height: l,
            color: _(0, 0, 0),
            radius: 4,
            opacity: 0.8,
            fixed: !0,
          }),
          Je(a),
          ne();
      });
    }
    n(Kr, "drawInspectText");
    function ys() {
      if (se.inspect) {
        let t = null;
        for (let i of S.root.get("*", { recursive: !0 }))
          if (i.c("area") && i.isHovering()) {
            t = i;
            break;
          }
        if ((S.root.drawInspect(), t)) {
          let i = [],
            s = t.inspect();
          for (let a in s) s[a] ? i.push(`${a}: ${s[a]}`) : i.push(`${a}`);
          Kr(
            vi(qt()),
            i.join(`
`)
          );
        }
        Kr(T(8), `FPS: ${se.fps()}`);
      }
      se.paused &&
        Se(() => {
          he(), ee(Ae(), 0), ee(-8, 8);
          let t = 32;
          we({
            width: t,
            height: t,
            anchor: "topright",
            color: _(0, 0, 0),
            opacity: 0.8,
            radius: 4,
            fixed: !0,
          });
          for (let i = 1; i <= 2; i++)
            we({
              width: 4,
              height: t * 0.6,
              anchor: "center",
              pos: T((-t / 3) * i, t * 0.5),
              color: _(255, 255, 255),
              radius: 2,
              fixed: !0,
            });
          ne();
        }),
        se.timeScale !== 1 &&
          Se(() => {
            he(), ee(Ae(), Ve()), ee(-8, -8);
            let t = 8,
              i = ze({
                text: se.timeScale.toFixed(1),
                font: wr,
                size: 16,
                color: _(255, 255, 255),
                pos: T(-t),
                anchor: "botright",
                fixed: !0,
              });
            we({
              width: i.width + t * 2 + t * 4,
              height: i.height + t * 2,
              anchor: "botright",
              color: _(0, 0, 0),
              opacity: 0.8,
              radius: 4,
              fixed: !0,
            });
            for (let s = 0; s < 2; s++) {
              let a = se.timeScale < 1;
              R({
                p1: T(-i.width - t * (a ? 2 : 3.5), -t),
                p2: T(-i.width - t * (a ? 2 : 3.5), -t - i.height),
                p3: T(-i.width - t * (a ? 3.5 : 2), -t - i.height / 2),
                pos: T(-s * t * 1 + (a ? -t * 0.5 : 0), 0),
                color: _(255, 255, 255),
                fixed: !0,
              });
            }
            Je(i), ne();
          }),
        se.curRecording &&
          Se(() => {
            he(),
              ee(0, Ve()),
              ee(24, -24),
              q({
                radius: 12,
                color: _(255, 0, 0),
                opacity: ei(0, 1, V.time() * 4),
                fixed: !0,
              }),
              ne();
          }),
        se.showLog &&
          S.logs.length > 0 &&
          Se(() => {
            he(), ee(0, Ve()), ee(8, -8);
            let t = 8,
              i = [];
            for (let a of S.logs) {
              let o = "",
                l = a.msg instanceof Error ? "error" : "info";
              (o += `[time]${a.time.toFixed(2)}[/time]`),
                (o += " "),
                (o += `[${l}]${
                  a.msg?.toString ? a.msg.toString() : a.msg
                }[/${l}]`),
                i.push(o);
            }
            S.logs = S.logs.filter(
              (a) => V.time() - a.time < (r.logTime || co)
            );
            let s = ze({
              text: i.join(`
`),
              font: wr,
              pos: T(t, -t),
              anchor: "botleft",
              size: 16,
              width: Ae() * 0.6,
              lineSpacing: t / 2,
              fixed: !0,
              styles: {
                time: { color: _(127, 127, 127) },
                info: { color: _(255, 255, 255) },
                error: { color: _(255, 0, 127) },
              },
            });
            we({
              width: s.width + t * 2,
              height: s.height + t * 2,
              anchor: "botleft",
              color: _(0, 0, 0),
              radius: 4,
              opacity: 0.8,
              fixed: !0,
            }),
              Je(s),
              ne();
          });
    }
    n(ys, "drawDebug");
    function xs(t) {
      S.events.on("loading", t);
    }
    n(xs, "onLoading");
    function Es(t) {
      V.onResize(t);
    }
    n(Es, "onResize");
    function bs(t) {
      S.events.on("error", t);
    }
    n(bs, "onError");
    function Ss(t) {
      console.error(t),
        re.ctx.suspend(),
        V.run(() => {
          it(),
            Se(() => {
              let i = Ae(),
                s = Ve(),
                a = {
                  size: 36,
                  width: i - 32 * 2,
                  letterSpacing: 4,
                  lineSpacing: 4,
                  font: wr,
                  fixed: !0,
                };
              we({ width: i, height: s, color: _(0, 0, 255), fixed: !0 });
              let o = ze({
                ...a,
                text: "Error",
                pos: T(32),
                color: _(255, 128, 0),
                fixed: !0,
              });
              Je(o),
                Fr({
                  ...a,
                  text: t.message,
                  pos: T(32, 32 + o.height + 16),
                  fixed: !0,
                }),
                ne(),
                S.events.trigger("error", t);
            }),
            st();
        });
    }
    n(Ss, "handleErr");
    function Rs(t) {
      Z.push(t);
    }
    n(Rs, "onCleanup");
    function Ms() {
      S.events.onOnce("frameEnd", () => {
        V.quit(),
          b.clear(
            b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT | b.STENCIL_BUFFER_BIT
          );
        let t = b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS);
        for (let i = 0; i < t; i++)
          b.activeTexture(b.TEXTURE0 + i),
            b.bindTexture(b.TEXTURE_2D, null),
            b.bindTexture(b.TEXTURE_CUBE_MAP, null);
        b.bindBuffer(b.ARRAY_BUFFER, null),
          b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null),
          b.bindRenderbuffer(b.RENDERBUFFER, null),
          b.bindFramebuffer(b.FRAMEBUFFER, null),
          K.destroy(),
          Z.forEach((i) => i());
      });
    }
    n(Ms, "quit");
    let cr = !0;
    V.run(() => {
      try {
        U.loaded ||
          (Y() === 1 && !cr && ((U.loaded = !0), S.events.trigger("load"))),
          (!U.loaded && r.loadingScreen !== !1) || cr
            ? (it(), vs(), st())
            : (se.paused || Hr(),
              As(),
              it(),
              Vs(),
              r.debug !== !1 && ys(),
              st()),
          cr && (cr = !1),
          S.events.trigger("frameEnd");
      } catch (t) {
        Ss(t);
      }
    });
    function jr() {
      let t = M,
        i = b.drawingBufferWidth / t,
        s = b.drawingBufferHeight / t;
      if (r.letterbox) {
        if (!r.width || !r.height)
          throw new Error("Letterboxing requires width and height defined.");
        let a = i / s,
          o = r.width / r.height;
        if (a > o) {
          let l = s * o,
            p = (i - l) / 2;
          y.viewport = { x: p, y: 0, width: l, height: s };
        } else {
          let l = i / o,
            p = (s - l) / 2;
          y.viewport = { x: 0, y: p, width: i, height: l };
        }
        return;
      }
      if (r.stretch && (!r.width || !r.height))
        throw new Error("Stretching requires width and height defined.");
      y.viewport = { x: 0, y: 0, width: i, height: s };
    }
    n(jr, "updateViewport");
    function Qr() {
      V.onHide(() => {
        r.backgroundAudio || re.ctx.suspend();
      }),
        V.onShow(() => {
          !r.backgroundAudio && !se.paused && re.ctx.resume();
        }),
        V.onResize(() => {
          if (V.isFullscreen()) return;
          let t = r.width && r.height;
          (t && !r.stretch && !r.letterbox) ||
            ((h.width = h.offsetWidth * M),
            (h.height = h.offsetHeight * M),
            jr(),
            t ||
              (y.frameBuffer.free(),
              (y.frameBuffer = new fr(
                K,
                b.drawingBufferWidth,
                b.drawingBufferHeight
              )),
              (y.width = b.drawingBufferWidth / M),
              (y.height = b.drawingBufferHeight / M)));
        }),
        r.debug !== !1 &&
          (V.onKeyPress("f1", () => (se.inspect = !se.inspect)),
          V.onKeyPress("f2", () => se.clearLog()),
          V.onKeyPress("f8", () => (se.paused = !se.paused)),
          V.onKeyPress("f7", () => {
            se.timeScale = Vt(Ye(se.timeScale - 0.2, 0, 2), 1);
          }),
          V.onKeyPress("f9", () => {
            se.timeScale = Vt(Ye(se.timeScale + 0.2, 0, 2), 1);
          }),
          V.onKeyPress("f10", () => se.stepFrame())),
        r.burp && V.onKeyPress("b", () => mt());
    }
    n(Qr, "initEvents"), jr(), Qr();
    let nt = {
      VERSION: oo,
      loadRoot: Ee,
      loadProgress: Y,
      loadSprite: Ge,
      loadSpriteAtlas: ut,
      loadSound: sr,
      loadBitmapFont: Rt,
      loadFont: je,
      loadShader: rr,
      loadShaderURL: ir,
      loadAseprite: Tt,
      loadPedit: Mt,
      loadBean: nr,
      loadJSON: me,
      load: Te,
      getSprite: Pt,
      getSound: Bt,
      getFont: Ft,
      getBitmapFont: ct,
      getShader: ft,
      getAsset: It,
      Asset: Be,
      SpriteData: W,
      SoundData: ue,
      width: Ae,
      height: Ve,
      center: Qt,
      dt: Ie,
      time: V.time,
      screenshot: V.screenshot,
      record: fs,
      isFocused: ps,
      setCursor: V.setCursor,
      getCursor: V.getCursor,
      setCursorLocked: V.setCursorLocked,
      isCursorLocked: V.isCursorLocked,
      setFullscreen: V.setFullscreen,
      isFullscreen: V.isFullscreen,
      isTouchscreen: V.isTouchscreen,
      onLoad: dr,
      onLoading: xs,
      onResize: Es,
      onGamepadConnect: V.onGamepadConnect,
      onGamepadDisconnect: V.onGamepadDisconnect,
      onError: bs,
      onCleanup: Rs,
      camPos: xi,
      camScale: Ei,
      camRot: bi,
      shake: Si,
      toScreen: Ir,
      toWorld: kr,
      setGravity: ki,
      getGravity: Di,
      setBackground: Ci,
      getBackground: Ni,
      getGamepads: V.getGamepads,
      add: zt,
      make: ar,
      destroy: gs,
      destroyAll: Dn,
      get: Lr,
      readd: kn,
      pos: Kt,
      scale: jt,
      rotate: Ui,
      color: Gi,
      opacity: Li,
      anchor: hr,
      area: Ki,
      sprite: lr,
      text: ji,
      polygon: Qi,
      rect: zi,
      circle: Xi,
      uvquad: Ji,
      outline: Wi,
      body: Zi,
      doubleJump: _i,
      shader: $i,
      timer: ur,
      fixed: es,
      stay: Cr,
      health: ts,
      lifespan: rs,
      z: Oi,
      move: Hi,
      offscreen: Yi,
      follow: qi,
      state: is,
      fadeIn: ss,
      mask: ns,
      drawon: os,
      tile: Gr,
      agent: cs,
      on: Oe,
      onUpdate: Rn,
      onDraw: Mn,
      onAdd: Dr,
      onDestroy: Ri,
      onClick: Tn,
      onCollide: Mi,
      onCollideUpdate: Ti,
      onCollideEnd: Pi,
      onHover: Bi,
      onHoverUpdate: Fi,
      onHoverEnd: Ii,
      onKeyDown: V.onKeyDown,
      onKeyPress: V.onKeyPress,
      onKeyPressRepeat: V.onKeyPressRepeat,
      onKeyRelease: V.onKeyRelease,
      onMouseDown: V.onMouseDown,
      onMousePress: V.onMousePress,
      onMouseRelease: V.onMouseRelease,
      onMouseMove: V.onMouseMove,
      onCharInput: V.onCharInput,
      onTouchStart: V.onTouchStart,
      onTouchMove: V.onTouchMove,
      onTouchEnd: V.onTouchEnd,
      onScroll: V.onScroll,
      onHide: V.onHide,
      onShow: V.onShow,
      onGamepadButtonDown: V.onGamepadButtonDown,
      onGamepadButtonPress: V.onGamepadButtonPress,
      onGamepadButtonRelease: V.onGamepadButtonRelease,
      onGamepadStick: V.onGamepadStick,
      mousePos: qt,
      mouseDeltaPos: V.mouseDeltaPos,
      isKeyDown: V.isKeyDown,
      isKeyPressed: V.isKeyPressed,
      isKeyPressedRepeat: V.isKeyPressedRepeat,
      isKeyReleased: V.isKeyReleased,
      isMouseDown: V.isMouseDown,
      isMousePressed: V.isMousePressed,
      isMouseReleased: V.isMouseReleased,
      isMouseMoved: V.isMouseMoved,
      isGamepadButtonPressed: V.isGamepadButtonPressed,
      isGamepadButtonDown: V.isGamepadButtonDown,
      isGamepadButtonReleased: V.isGamepadButtonReleased,
      getGamepadStick: V.getGamepadStick,
      charInputted: V.charInputted,
      loop: Cn,
      wait: ms,
      play: gt,
      volume: Ct,
      burp: mt,
      audioCtx: re.ctx,
      Line: bt,
      Rect: ve,
      Circle: Ps,
      Polygon: Xt,
      Vec2: E,
      Color: te,
      Mat4: Ne,
      Quad: ge,
      RNG: Ys,
      rand: $t,
      randi: li,
      randSeed: Ks,
      vec2: T,
      rgb: _,
      hsl2rgb: qn,
      quad: ae,
      choose: Qs,
      chance: js,
      lerp: Ke,
      tween: Or,
      easings: gr,
      map: Ze,
      mapc: Hs,
      wave: ei,
      deg2rad: Ue,
      rad2deg: St,
      clamp: Ye,
      testLineLine: Et,
      testRectRect: zs,
      testRectLine: Xs,
      testRectPoint: er,
      testCirclePolygon: Zs,
      testLinePoint: Ws,
      testLineCircle: ui,
      drawSprite: or,
      drawText: Fr,
      formatText: ze,
      drawRect: we,
      drawLine: c,
      drawLines: v,
      drawTriangle: R,
      drawCircle: q,
      drawEllipse: j,
      drawUVQuad: Ce,
      drawPolygon: de,
      drawFormattedText: Je,
      drawMasked: Lt,
      drawSubtracted: Ot,
      pushTransform: he,
      popTransform: ne,
      pushTranslate: ee,
      pushScale: De,
      pushRotate: ie,
      pushMatrix: At,
      usePostEffect: wt,
      makeCanvas: Nt,
      debug: se,
      scene: as,
      go: hs,
      onSceneLeave: ls,
      addLevel: ds,
      getData: us,
      setData: Nr,
      download: Er,
      downloadJSON: nn,
      downloadText: fi,
      downloadBlob: oi,
      plug: Ur,
      ASCII_CHARS: Cs,
      canvas: V.canvas,
      addKaboom: ws,
      LEFT: E.LEFT,
      RIGHT: E.RIGHT,
      UP: E.UP,
      DOWN: E.DOWN,
      RED: te.RED,
      GREEN: te.GREEN,
      BLUE: te.BLUE,
      YELLOW: te.YELLOW,
      MAGENTA: te.MAGENTA,
      CYAN: te.CYAN,
      WHITE: te.WHITE,
      BLACK: te.BLACK,
      quit: Ms,
      Event: ke,
      EventHandler: Wt,
      EventController: xt,
    };
    if ((r.plugins && r.plugins.forEach(Ur), r.global !== !1))
      for (let t in nt) window[t] = nt[t];
    return r.focus !== !1 && V.canvas.focus(), nt;
  }, "default");
  document.title = "Tay or Ye ???";
  bn({ background: [235, 84, 152] });
  loadSprite("Grammy", "sprites/Grammy.png");
  loadSprite("Heart", "sprites/Heart.png");
  loadSprite("Ye", "sprites/Ye.png");
  loadSprite("TS", "sprites/TS.png");
  loadSprite("VMA", "sprites/VMA.png");
  loadSound("background", "sounds/background.mp3");
  loadSound("game over", "sounds/game over.wav");
  loadSound("thanks", "sounds/thanks.wav");
  onLoading((r) => {
    drawRect({ width: width(), height: height(), color: rgb(0, 0, 0) }),
      drawCircle({ pos: center(), radius: 32, end: map(r, 0, 1, 0, 360) }),
      drawText({
        text: "loading" + ".".repeat(wave(1, 4, time() * 12)),
        font: "monospace",
        size: 24,
        anchor: "center",
        pos: center().add(0, 70),
      });
  });
  var Rr = 620,
    pi = 0,
    gi,
    mi,
    Sn = !1,
    $e,
    Mr = (r, e) => {
      gi && destroy(gi),
        (gi = add([
          text(
            "SCORE: " +
              r +
              `
LIFE: `
          ),
          pos(24, 24),
          anchor("topleft"),
          z(100),
        ]));
      for (let h = 0; h < e; h++)
        add([sprite("Heart"), pos(135 + h * 37, 68), scale(0.025)]);
    },
    Tr = (r, e) => {
      let h = r;
      return (
        h < 15 && e > 4 && (h = 4 + Math.floor(e / 5)),
        mi && destroy(mi),
        (mi = add([
          text(`LEVEL: ${h - 3}
SPEED: ${h / 4}x`),
          pos(24, height() - 24),
          anchor("botleft"),
          z(100),
        ])),
        h
      );
    },
    tr = () => {
      Sn || (($e = play("background", { volume: 1, loop: !0 })), (Sn = !0));
    };
  scene("intro", () => {
    add([
      text(
        `Hey! Welcome to [wavy]"Tay or Ye ???"[/wavy] 

Game made [black]by Ek[/black]am


P[wavy]ress Spac[/wavy]e Bar to Start`,
        {
          align: "center",
          size: 48,
          styles: {
            black: { color: rgb(0, 0, 0) },
            wavy: (r, e) => ({
              color: hsl2rgb((time() * 0.2 + r * 0.1) % 1, 0.7, 0.8),
              pos: vec2(0, wave(-4, 4, time() * 6 + r * 0.5)),
            }),
          },
        }
      ),
      anchor("center"),
      pos(width() / 2, height() / 2),
    ]),
      add([
        sprite("TS"),
        pos(72, height() - 24),
        anchor("botleft"),
        rotate(-15),
        area(),
      ]),
      add([
        sprite("Ye"),
        pos(width() - 48, 48),
        anchor("topright"),
        rotate(15),
        scale(0.5),
        area(),
      ]),
      add([
        sprite("VMA"),
        pos(width() - 48, height() - 48),
        anchor("botright"),
        rotate(0),
        scale(0.7),
        area(),
      ]),
      add([
        sprite("Grammy"),
        pos(48, 48),
        anchor("topleft"),
        rotate(5),
        scale(0.9),
        area(),
      ]),
      onKeyPress("space", () => {
        tr(), go("game", { SCORE: 0, BSPEED: 4, LIFE: 3 });
      });
  });
  scene("game", ({ SCORE: r, BSPEED: e, LIFE: h }) => {
    let u = add([
      sprite("TS"),
      pos(center()),
      anchor("center"),
      area(),
      scale(0.3),
    ]);
    onKeyDown("left", () => {
      tr(), u.move(-Rr, 0), u.pos.x < 0 && (u.pos.x = width());
    }),
      onKeyDown("right", () => {
        tr(), u.move(Rr, 0), u.pos.x > width() && (u.pos.x = 0);
      }),
      onKeyDown("up", () => {
        tr(), u.move(0, -Rr), u.pos.y < 0 && (u.pos.y = height());
      }),
      onKeyDown("down", () => {
        tr(), u.move(0, Rr), u.pos.y > height() && (u.pos.y = 0);
      }),
      loop(4, () => {
        for (let D = 0; D < 4; D++) {
          let H = rand(50, width() - 50),
            V = height(),
            Z = add([sprite("Ye"), pos(H, V), area(), scale(0.3), "Ye"]);
          Z.onUpdate(() => {
            Z.moveTo(Z.pos.x, Z.pos.y - e);
          });
        }
        let f = rand(50, width() - 50),
          A = height(),
          M = add([sprite("VMA"), pos(f, A), area(), scale(0.3), "VMA"]);
        M.onUpdate(() => {
          M.moveTo(M.pos.x, M.pos.y - e * 1.15);
        });
      }),
      loop(rand(8, 10), () => {
        let f = rand(50, width() - 50),
          A = height(),
          M = add([sprite("Grammy"), pos(f, A), area(), scale(0.7), "Grammy"]);
        M.onUpdate(() => {
          M.moveTo(M.pos.x, M.pos.y - e * 1.3);
        });
      }),
      u.onCollide("Ye", () => {
        $e && ($e.volume = 0.2),
          play("game over", { volume: 0.5 }),
          addKaboom(u.pos),
          destroy(u),
          destroyAll("Ye"),
          destroyAll("Grammy"),
          destroyAll("VMA"),
          (h -= 1),
          Mr(r, h),
          (e = Tr(e, r)),
          wait(1, () => {
            ($e.volume = 1),
              h > 0
                ? go("game", { SCORE: r, BSPEED: e, LIFE: h })
                : go("lose", { SCORE: r });
          });
      }),
      u.onCollide("VMA", (f) => {
        ($e.volume = 0.2),
          play("thanks", { volume: 0.5 }),
          destroy(f),
          ($e.volume = 1),
          (r += 1),
          Mr(r, h),
          (e = Tr(e, r));
      }),
      u.onCollide("Grammy", (f) => {
        ($e.volume = 0.2),
          play("thanks", { volume: 0.5 }),
          destroy(f),
          ($e.volume = 1),
          (r += 3),
          Mr(r, h),
          (e = Tr(e, r));
      }),
      (e = Tr(e, r)),
      Mr(r, h);
  });
  scene("lose", ({ SCORE: r }) => {
    r > pi && (pi = r),
      add([
        text(
          `[red]Game Over![/red]
Score:` +
            r +
            `
High Score:` +
            pi +
            `

Pr[wavy]ess Space [/wavy]Bar to Restart`,
          {
            align: "center",
            styles: {
              red: { color: rgb(230, 0, 0) },
              wavy: (e, h) => ({
                color: hsl2rgb((time() * 0.2 + e * 0.1) % 1, 0.7, 0.8),
                pos: vec2(0, wave(-4, 4, time() * 6 + e * 0.5)),
              }),
            },
          }
        ),
        anchor("center"),
        pos(width() / 2, height() / 2),
      ]),
      onKeyPress("space", () => {
        destroyAll("Ye"),
          destroyAll("Grammy"),
          destroyAll("VMA"),
          go("game", { SCORE: 0, BSPEED: 4, LIFE: 3 });
      });
  });
  go("intro");
})();
