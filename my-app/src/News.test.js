import {render, screen} from "@testing-library/react";
import App from "./App";


function doSomething() {
  console.log("doSomething");
  return 1;
}

doSomething();

test('renders learn react link', () => {
  doSomething();
  expect(1).toBe(1);
});
