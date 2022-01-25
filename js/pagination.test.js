/**
 * @jest-environment jsdom
 */

const domPagination = require("./pagination");

document.body.innerHTML = `<div class="container">
<div class="js-trigger-pagination">'
  <div class="item"></div>
  <div class="item"></div>
</div>
<div class="c-pagination"
<ul class="pagination"></ul> 
</div>
</div>`;

test("Pagination container should not be empty", () => {
  const paginate = new domPagination({
    paginationContainer: ".js-trigger-pagination",
  });
  paginate.getElements();
  expect(paginate.itemsNumber).toBe(2);
});
