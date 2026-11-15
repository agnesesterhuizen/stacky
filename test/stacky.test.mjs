import assert from "node:assert/strict";
import test from "node:test";

import { compile, run } from "../build/stacky.js";

test("runs arithmetic programs", () => {
  const arithmetic = compile(`
    push $0
    push $1
    add
    push 2
    mul
  `);

  assert.equal(arithmetic(4, 3), 14);
  assert.equal(run("push 9\npush 4\nsub"), 5);
  assert.equal(run("push 17\npush 3\ndiv"), 5);
});

test("runs comparison and control-flow programs", () => {
  const maximum = compile(`
    push $0
    push $1
    gte
    jumpz second_is_larger
    push $0
    jump done

    second_is_larger:
    push $1

    done:
  `);

  assert.equal(maximum(8, 5), 8);
  assert.equal(maximum(2, 11), 11);
});

test("runs subroutines", () => {
  const double = compile(`
    push $0
    call double_value
    jump done

    double_value:
    dup
    add
    ret

    done:
  `);

  assert.equal(double(21), 42);
});
