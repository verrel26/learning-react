import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  // Clean up the DOM after each test
  // untuk membersihkan DOM setelah setiap pengujian
  //   document.body.innerHTML = "";
  console.log("unit test OK !");
  cleanup();
});
