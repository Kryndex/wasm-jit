var assert = require('assert');
var fixtures = require('../fixtures');
var testAsm = fixtures.testAsm;

describe('wasm Compiler/x64/math', function() {
  describe('int', function() {
    it('should support i64.add', function() {
      testAsm(function() {/*
        i64 main(i64 a) {
          return i64.add(a, i64.const(0x1));
        }
      */}, function() {/*
        push rbp
        mov rbp, rsp
        mov rax, 0x1
        add rax, rsi
        mov rsp, rbp
        pop rbp
        ret
      */});
    });

    it('should support i64.sub', function() {
      testAsm(function() {/*
        i64 main(i64 a) {
          return i64.sub(a, i64.const(0x1));
        }
      */}, function() {/*
        push rbp
        mov rbp, rsp
        mov rax, 0x1
        mov r15, rsi
        sub r15, rax
        mov rax, r15
        mov rsp, rbp
        pop rbp
        ret
      */});
    });

    it('should support i64.mul', function() {
      testAsm(function() {/*
        i64 main(i64 a) {
          return i64.mul(a, i64.const(0x1));
        }
      */}, function() {/*
        push rbp
        mov rbp, rsp
        mov rax, 0x1
        imul rax, rsi
        mov rsp, rbp
        pop rbp
        ret
      */});
    });

    it('should support i64.eq', function() {
      testAsm(function() {/*
        i64 main(i64 a) {
          return i64.eq(a, i64.const(0x1));
        }
      */}, function() {/*
        push rbp
        mov rbp, rsp
        mov rax, 0x1
        cmp rsi, rax
        setcc z, eax
        mov rsp, rbp
        pop rbp
        ret
      */});
    });

    it('should support i64.ne', function() {
      testAsm(function() {/*
        i64 main(i64 a) {
          return i64.ne(a, i64.const(0x1));
        }
      */}, function() {/*
        push rbp
        mov rbp, rsp
        mov rax, 0x1
        cmp rsi, rax
        setcc nz, eax
        mov rsp, rbp
        pop rbp
        ret
      */});
    });
  });

  describe('floating point', function() {
    it('should support f32.add', function() {
      testAsm(function() {/*
        f32 main(f32 a) {
          return f32.add(a, f32.const(123.456));
        }
      */}, function() {/*
        push rbp
        mov rbp, rsp
        mov r15, 0x42f6e979
        vmovd xmm1, r15
        vaddss xmm0, xmm1
        mov rsp, rbp
        pop rbp
        ret
      */});
    });

    it('should support f64.add', function() {
      testAsm(function() {/*
        f64 main(f64 a) {
          return f64.add(a, f64.const(123.456));
        }
      */}, function() {/*
        push rbp
        mov rbp, rsp
        mov r15, 0x405edd2f1a9fbe77
        vmovq xmm1, r15
        vaddsd xmm0, xmm1
        mov rsp, rbp
        pop rbp
        ret
      */});
    });
  });
});
