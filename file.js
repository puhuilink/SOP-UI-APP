var _0xodL = "jsjiami.com.v6",
  _0xodL_ = ["_0xodL"],
  _0x5c7d = [
    _0xodL,
    "\x63\x6f\x73\x2d\x6e\x6f\x64\x65\x6a\x73\x2d\x73\x64\x6b\x2d\x76\x35",
    "\x70\x61\x74\x68",
    "\x62\x61\x74\x63\x68",
    "\x41\x4b\x49\x44\x4f\x66\x6d\x79\x30\x70\x53\x72\x34\x33\x71\x52\x78\x47\x4c\x44\x73\x4a\x58\x5a\x79\x43\x48\x39\x71\x4c\x63\x67\x56\x36\x54\x63",
    "\x79\x69\x45\x57\x63\x53\x34\x53\x6d\x75\x74\x66\x43\x59\x69\x67\x51\x78\x47\x4c\x43\x70\x46\x52\x51\x42\x6a\x33\x43\x38\x72\x4e",
    "\x69\x6d\x67\x2d\x31\x33\x30\x32\x32\x35\x37\x31\x31\x36",
    "\x61\x70\x2d\x62\x65\x69\x6a\x69\x6e\x67",
    "\x6c\x65\x6e\x67\x74\x68",
    "\x72\x65\x70\x6c\x61\x63\x65",
    "\x65\x6e\x64\x73\x57\x69\x74\x68",
    "\x73\x74\x61\x74\x28\x64\x69\x72\x2c\x20\x63\x62\x5b\x2c\x20\x63\x6f\x6e\x63\x75\x72\x72\x65\x6e\x63\x79\x5d\x29",
    "\x72\x65\x61\x64\x64\x69\x72",
    "\x63\x6f\x6e\x63\x75\x72\x72\x65\x6e\x63\x79",
    "\x66\x6f\x72\x45\x61\x63\x68",
    "\x70\x75\x73\x68",
    "\x73\x74\x61\x74",
    "\x65\x6e\x64",
    "\x6c\x6f\x67",
    "\x72\x65\x61\x64\x64\x69\x72\x20\x65\x72\x72\x6f\x72\x3a",
    "\x69\x73\x44\x69\x72",
    "\x69\x73\x44\x69\x72\x65\x63\x74\x6f\x72\x79",
    "\x73\x69\x7a\x65",
    "\x6f\x62\x6a\x65\x63\x74",
    "\x6c\x61\x6e\x67",
    "\x65\x72\x72\x6f\x72\x2e\x74\x6f\x6f\x5f\x6d\x75\x63\x68\x5f\x66\x69\x6c\x65\x73",
    "\x66\x69\x6c\x74\x65\x72",
    "\x63\x6f\x6e\x63\x61\x74",
    "\x6d\x61\x70",
    "\x2e\x2f\x75\x6e\x70\x61\x63\x6b\x61\x67\x65\x2f\x64\x69\x73\x74\x2f\x62\x75\x69\x6c\x64\x2f\x68\x35\x2f",
    "\x65\x72\x72\x6f\x72",
    "\x72\x65\x6c\x61\x74\x69\x76\x65",
    "\x75\x70\x6c\x6f\x61\x64\x46\x69\x6c\x65\x73",
    "\x66\x6c\x6f\x6f\x72",
    "\x70\x65\x72\x63\x65\x6e\x74",
    "\x73\x70\x65\x65\x64",
    "\u8fdb\u5ea6\uff1a",
    "\x25\x3b\x20\u901f\u5ea6\uff1a",
    "\x4d\x62\x2f\x73\x3b",
    "\x4b\x65\x79",
    "\x20\u4e0a\u4f20",
    "\x6a\x73\x6e\x6a\x69\x61\x6d\x69\x2e\x63\x6f\x6d\x2e\x72\x58\x53\x47\x76\x6c\x43\x36\x75\x4e\x55\x59\x42\x71\x58\x3d\x3d",
  ];
function _0x37d4(_0x12c9fb, _0x28df82) {
  _0x12c9fb = ~~"0x"["concat"](_0x12c9fb["slice"](0x0));
  var _0x2e5cce = _0x5c7d[_0x12c9fb];
  return _0x2e5cce;
}
(function (_0x35904f, _0x34ab8f) {
  var _0x367c62 = 0x0;
  for (
    _0x34ab8f = _0x35904f["shift"](_0x367c62 >> 0x2);
    _0x34ab8f &&
    _0x34ab8f !==
      (_0x35904f["pop"](_0x367c62 >> 0x3) + "")["replace"](
        /[nrXSGlCuNUYBqX=]/g,
        ""
      );
    _0x367c62++
  ) {
    _0x367c62 = _0x367c62 ^ 0xfa90b;
  }
})(_0x5c7d, _0x37d4);
let COS = require(_0x37d4("0"));
let fs = require("\x66\x73");
let path = require(_0x37d4("1"));
let Batch = require(_0x37d4("2"));
let cos = new COS({
  "\x53\x65\x63\x72\x65\x74\x49\x64": _0x37d4("3"),
  "\x53\x65\x63\x72\x65\x74\x4b\x65\x79": _0x37d4("4"),
});
let Bucket = _0x37d4("5");
let Region = _0x37d4("6");
let eachLimit = function (_0x24fe6f, _0x34ba19, _0x3f5c49, _0xb7cb05) {
  _0xb7cb05 = _0xb7cb05 || function () {};
  if (!_0x24fe6f[_0x37d4("7")] || _0x34ba19 <= 0x0) {
    return _0xb7cb05();
  }
  let _0x3cad29 = 0x0;
  let _0x5bd42b = 0x0;
  let _0x4485d4 = 0x0;
  (function replenish() {
    if (_0x3cad29 >= _0x24fe6f[_0x37d4("7")]) {
      return _0xb7cb05();
    }
    while (_0x4485d4 < _0x34ba19 && _0x5bd42b < _0x24fe6f[_0x37d4("7")]) {
      _0x5bd42b += 0x1;
      _0x4485d4 += 0x1;
      _0x3f5c49(_0x24fe6f[_0x5bd42b - 0x1], function (_0x2dc4f9) {
        if (_0x2dc4f9) {
          _0xb7cb05(_0x2dc4f9);
          _0xb7cb05 = function () {};
        } else {
          _0x3cad29 += 0x1;
          _0x4485d4 -= 0x1;
          if (_0x3cad29 >= _0x24fe6f[_0x37d4("7")]) {
            _0xb7cb05();
          } else {
            replenish();
          }
        }
      });
    }
  })();
};
const fastListFolder = function (_0x53d117, _0x1f533c) {
  const _0x8d95d0 = function (_0x3209fb, _0x459548, _0x163a02) {
    _0x3209fb = _0x3209fb[_0x37d4("8")](/\\/g, "\x2f");
    const _0x1a006b = _0x3209fb[_0x37d4("9")]("\x2f") ? "" : "\x2f";
    let _0x55b0cf = _0x3209fb + _0x1a006b + _0x459548;
    _0x55b0cf = _0x55b0cf[_0x37d4("8")](/\\/g, "\x2f");
    _0x163a02 && _0x459548 && (_0x55b0cf += "\x2f");
    return _0x55b0cf;
  };
  const _0x4fcb0e = function stat(_0x4b04ca, _0xe2a97d) {
    if (!_0x4b04ca || !_0xe2a97d) throw new Error(_0x37d4("a"));
    fs[_0x37d4("b")](_0x4b04ca, function (_0x335d06, _0x3eafa0) {
      if (_0x335d06) return _0xe2a97d(_0x335d06);
      const _0x2e7083 = new Batch();
      _0x2e7083[_0x37d4("c")](0x10);
      _0x3eafa0[_0x37d4("d")](function (_0x14a04c) {
        const _0xbc15f5 = _0x8d95d0(_0x4b04ca, _0x14a04c);
        _0x2e7083[_0x37d4("e")](function (_0x1fab5b) {
          fs[_0x37d4("f")](_0xbc15f5, _0x1fab5b);
        });
      });
      _0x2e7083[_0x37d4("10")](function (_0x335d06, _0x3ad554) {
        if (_0x335d06) {
          console[_0x37d4("11")](_0x37d4("12"), _0x335d06);
          _0xe2a97d(_0x335d06);
          return;
        }
        _0x3ad554[_0x37d4("d")](function (_0x1642e3, _0x3d5513) {
          _0x1642e3[_0x37d4("13")] = _0x1642e3[_0x37d4("14")]();
          _0x1642e3[_0x37d4("1")] = _0x8d95d0(
            _0x4b04ca,
            _0x3eafa0[_0x3d5513],
            _0x1642e3[_0x37d4("13")]
          );
          _0x1642e3[_0x37d4("13")] && (_0x1642e3[_0x37d4("15")] = 0x0);
        });
        _0xe2a97d(_0x335d06, _0x3ad554);
      });
    });
  };
  const _0xb990c0 = function (_0x71dab0) {
    return {
      "\x70\x61\x74\x68": _0x71dab0[_0x37d4("1")],
      "\x73\x69\x7a\x65": _0x71dab0[_0x37d4("15")],
      "\x69\x73\x44\x69\x72": _0x71dab0[_0x37d4("13")],
    };
  };
  if (typeof _0x53d117 !== _0x37d4("16"))
    _0x53d117 = { "\x70\x61\x74\x68": _0x53d117 };
  const _0x5f17a1 = _0x53d117[_0x37d4("1")];
  let _0x39e8ef = [];
  const _0x5ecafb = function (_0xa31db) {
    if (_0xa31db) {
      _0x1f533c(_0xa31db);
    } else if (_0x39e8ef[_0x37d4("7")] > 0xf4240) {
      _0x1f533c(window[_0x37d4("17")]["\x74"](_0x37d4("18")));
    } else {
      _0x1f533c(null, _0x39e8ef);
    }
  };
  const _0x4edc4b = function (_0x2c54e6, _0x4786e3) {
    _0x39e8ef[_0x37d4("e")](_0xb990c0(_0x2c54e6));
    _0x4fcb0e(_0x2c54e6[_0x37d4("1")], function (_0xf5972c, _0x4e2d1d) {
      if (_0xf5972c) return _0x4786e3();
      const _0x546fe6 = _0x4e2d1d[_0x37d4("19")](
        (_0xe7b93f) => _0xe7b93f[_0x37d4("13")]
      );
      const _0x356bb2 = _0x4e2d1d[_0x37d4("19")](
        (_0x113fd9) => !_0x113fd9[_0x37d4("13")]
      );
      _0x39e8ef = [][_0x37d4("1a")](
        _0x39e8ef,
        _0x356bb2[_0x37d4("1b")](_0xb990c0)
      );
      eachLimit(_0x546fe6, 0x1, _0x4edc4b, _0x4786e3);
    });
  };
  fs[_0x37d4("f")](_0x5f17a1, function (_0x43f0bc, _0x255327) {
    if (_0x43f0bc) return _0x5ecafb();
    _0x255327[_0x37d4("13")] = !![];
    _0x255327[_0x37d4("1")] = _0x8d95d0(_0x5f17a1, "", !![]);
    _0x255327[_0x37d4("13")] && (_0x255327[_0x37d4("15")] = 0x0);
    _0x4edc4b(_0x255327, _0x5ecafb);
  });
};
function uploadFolder() {
  let _0x9edd43 = _0x37d4("1c");
  let _0x32cfa7 = "\x2f";
  fastListFolder(_0x9edd43, function (_0x202f86, _0x44c38e) {
    if (_0x202f86) return console[_0x37d4("1d")](_0x202f86);
    let _0x30d81a = _0x44c38e[_0x37d4("1b")](function (_0x43f5ab) {
      let _0x5a7ba2 = path[_0x37d4("1e")](_0x9edd43, _0x43f5ab[_0x37d4("1")])[
        _0x37d4("8")
      ](/\\/g, "\x2f");
      if (
        _0x5a7ba2 &&
        _0x43f5ab[_0x37d4("13")] &&
        !_0x5a7ba2[_0x37d4("9")]("\x2f")
      )
        _0x5a7ba2 += "\x2f";
      let _0x1d41af = _0x32cfa7 + _0x5a7ba2;
      return {
        "\x42\x75\x63\x6b\x65\x74": Bucket,
        "\x52\x65\x67\x69\x6f\x6e": Region,
        "\x4b\x65\x79": _0x1d41af,
        "\x46\x69\x6c\x65\x50\x61\x74\x68": _0x43f5ab[_0x37d4("1")],
      };
    });
    cos[_0x37d4("1f")](
      {
        "\x66\x69\x6c\x65\x73": _0x30d81a,
        "\x53\x6c\x69\x63\x65\x53\x69\x7a\x65": 0x400 * 0x400,
        "\x6f\x6e\x50\x72\x6f\x67\x72\x65\x73\x73": function (_0x34e39b) {
          let _0x348502 =
            Math[_0x37d4("20")](_0x34e39b[_0x37d4("21")] * 0x2710) / 0x64;
          let _0x519a81 =
            Math[_0x37d4("20")](
              (_0x34e39b[_0x37d4("22")] / 0x400 / 0x400) * 0x64
            ) / 0x64;
          console[_0x37d4("11")](
            _0x37d4("23") +
              _0x348502 +
              _0x37d4("24") +
              _0x519a81 +
              _0x37d4("25")
          );
        },
        "\x6f\x6e\x46\x69\x6c\x65\x46\x69\x6e\x69\x73\x68": function (
          _0x202f86,
          _0x4b01de,
          _0x32aa70
        ) {
          console[_0x37d4("11")](
            _0x32aa70[_0x37d4("26")] +
              _0x37d4("27") +
              (_0x202f86 ? "\u5931\u8d25" : "\u5b8c\u6210")
          );
        },
      },
      function (_0x202f86, _0x1996ad) {
        console[_0x37d4("11")](_0x202f86 || _0x1996ad);
      }
    );
  });
}
uploadFolder();
_0xodL = "jsjiami.com.v6";
