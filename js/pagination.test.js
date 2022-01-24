/**
 * @jest-environment jsdom
 */

const domPagination = require("./pagination");

test("Pagination container should not be empty", () => {
  document.body.innerHTML =
    '<div class="js-trigger-pagination">' +
    '  <div class="item"></div>' +
    '  <div class="item"></div>' +
    "</div>";
  const paginate = new domPagination(".js-trigger-pagination");
  expect(paginate.getElements()).toBe(undefined);
});
