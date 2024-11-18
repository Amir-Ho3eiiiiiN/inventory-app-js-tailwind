export default class ProductView {
  constructor(root, handlers) {
    this.root = root;
    const { onAddNewProduct, onSearchProduct, onDeleteProduct, onSortProduct } =
      handlers;
    this.onAddNewProduct = onAddNewProduct;
    this.onDeleteProduct = onDeleteProduct;
    this.onSearchProduct = onSearchProduct;
    this.onSortProduct = onSortProduct;

    const addNewProductBtn = this.root.querySelector("#add-new-product");
    const searchInput = this.root.querySelector("#search-input");
    const sortproducts = this.root.querySelector("#sort-products");
    const toggleCategory = this.root.querySelector("#toggle-add-category");
    const categoryWrapper = this.root.querySelector("#category-wrapper");
    const cancelAddCategory = this.root.querySelector("#cancel-add-category");

    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    sortproducts.addEventListener("change", (e) => this.sortProducts(e));
    toggleCategory.addEventListener("click", () =>
      this.toggleAddCategory(toggleCategory, categoryWrapper)
    );
    cancelAddCategory.addEventListener("click", (e) => {
      e.preventDefault();
      return this.toggleAddCategory(categoryWrapper, toggleCategory);
    });
  }

  addNewProduct(e) {
    e.preventDefault();
    const titleInput = this.root.querySelector("#product-title");
    const quantityInput = this.root.querySelector("#product-quantity");
    const categoryInput = this.root.querySelector("#product-category");

    const title = titleInput.value;
    const quantity = quantityInput.value;
    const category = categoryInput.value;
    if (!title || !quantity || !category) return;
    this.onAddNewProduct(title, quantity, category);
  }

  createProductList(products) {
    const productsList = this.root.querySelector("#products-list");
    let res = ``;
    products.forEach((product) => {
      res += `
         <div class="flex items-center justify-between mb-2">
            <span class="text-slate-400">${product.title}</span>
            <div class="flex items-center gap-x-3">
              <span class="text-slate-400">${new Date(
                product.createdAt
              ).toLocaleString("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</span>
              <span
                class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl"
              >
              ${product.category}
              </span>
              <span
                class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300"
                >${product.quantity}</span
              >
              <button
                class="border px-2 py-0.5 rounded-2xl border-red-400 text-red-400 deleteProduct"
                data-product-id=${product.id}
              >
                delete
              </button>
            </div>
          </div>`;
    });
    productsList.innerHTML = res;
    productsList.querySelectorAll(".deleteProduct").forEach((pr) =>
      pr.addEventListener("click", (e) => {
        this.onDeleteProduct(e.target.dataset.productId);
      })
    );
  }

  searchProducts(e) {
    this.onSearchProduct(e.target.value.trim().toLowerCase());
  }

  sortProducts(e) {
    this.onSortProduct(e.target.value);
  }

  toggleAddCategory(e, s) {
    s.classList.remove("hidden");
    e.classList.add("hidden");
  }
}
