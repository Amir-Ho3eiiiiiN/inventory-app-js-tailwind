import Storage from "./Storage.js";
import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

const root = document.querySelector("body");

class App {
  constructor() {
    this.categoryView = new CategoryView(root, this._handlersOfCategory());
    this._refreshCategories();
    this.productView = new ProductView(root, this._handlersOfProducts());
    this._refreshProducts();
  }
  _handlersOfCategory() {
    return {
      onAddNewCategory: (title, description) => {
        Storage.saveCategory({ title, description });
        this._refreshCategories();
      },
    };
  }
  _refreshCategories() {
    const categories = Storage.getAllCategories();
    this.categoryView.createCategoryList(categories);
  }

  _handlersOfProducts() {
    return {
      onAddNewProduct: (title, quantity, category) => {
        Storage.saveProduct({ title, category, quantity });
        this._refreshProducts();
      },
      onSearchProduct: (productTitle) => {
        const products = Storage.getAllProducts();
        const filteredProducts = products.filter((pr) =>
          pr.title.toLowerCase().includes(productTitle)
        );
        this.productView.createProductList(filteredProducts);
      },
      onSortProduct: (sortSelected) => {
        const products = Storage.getAllProducts();
        let sortedProducts = products;
        if (sortSelected === "oldest") {
          sortedProducts = products.reverse();
        }
        this.productView.createProductList(sortedProducts);
      },
      onDeleteProduct: (id) => {
        this.productView.createProductList(Storage.deleteProduct(id));
      },
    };
  }
  _refreshProducts() {
    const products = Storage.getAllProducts();
    this.productView.createProductList(products);
  }
}

const app = new App();
