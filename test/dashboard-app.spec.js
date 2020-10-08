/* eslint-disable no-unused-expressions */
import { fixture, assert } from "@open-wc/testing";

import "../dashboard-app.js";

describe("Suite cases", () => {
  it("Case default", async () => {
    const _element = await fixture("<dashboard-app></dashboard-app>");
    assert.strictEqual(_element.hello, 'Hello World!');
  });
});
