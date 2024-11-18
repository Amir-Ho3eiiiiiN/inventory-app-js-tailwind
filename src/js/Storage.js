const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    quantity: 5,
    createdAt: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    quantity: 3,
    createdAt: "2021-10-31T15:03:23.556Z",
  },
  {
    id: 3,
    title: "Vue.js",
    category: "frontend",
    quantity: 8,
    createdAt: "2021-11-01T10:47:26.889Z",
  },
];

const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of applications",
    createdAt: "2021-11-01T10:47:26.889Z",
  },
  {
    id: 2,
    title: "backend",
    description: "the backend of the applications",
    createdAt: "2021-10-01T10:47:26.889Z",
  },
];

export default class Storage {
  static getAllProducts() {
    const SavedProducts =
      JSON.parse(localStorage.getItem("product-list")) || [];
    return SavedProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  static getAllCategories() {
    const SavedCategories =
      JSON.parse(localStorage.getItem("category-list")) || [];
    return SavedCategories.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  static saveProduct(product) {
    const products = this.getAllProducts();
    const existedProduct = products.find((pr) => pr.id === Number(product.id));
    const categoryName = this.getCategory(product.category);
    product.category = categoryName;

    if (existedProduct) {
      existedProduct.title = product.title;
      existedProduct.category = product.category;
      existedProduct.quantity = product.quantity;
    } else {
      product.id = new Date().getTime();
      product.createdAt = new Date().toISOString();
      products.push(product);
    }
    localStorage.setItem("product-list", JSON.stringify(products));
  }

  static saveCategory(category) {
    const categories = this.getAllCategories();
    const existedCategory = categories.find(
      (cat) => cat.id === Number(category.id)
    );
    if (existedCategory) {
      existedCategory.title = category.title;
      existedCategory.description = category.category;
    } else {
      category.id = new Date().getTime();
      category.createdAt = new Date().toISOString();
      categories.push(category);
    }
    localStorage.setItem("category-list", JSON.stringify(categories));
  }

  static deleteProduct(id) {
    const products = this.getAllProducts();
    const filteredProduct = products.filter((pr) => pr.id !== Number(id));
    localStorage.setItem("product-list", JSON.stringify(filteredProduct));
    return filteredProduct;
  }

  static deleteCategory(id) {
    const categories = this.getAllCategories();
    const filteredCategory = categories.filter((cat) => cat.id !== Number(id));
    localStorage.setItem("category-list", JSON.stringify(filteredCategory));
  }

  static getCategory(id) {
    const categories = this.getAllCategories();
    const findCategory = categories.find((cat) => cat.id === Number(id));
    return findCategory.title;
  }
}
