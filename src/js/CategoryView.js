export default class CategoryView {
  constructor(root, handlers) {
    this.root = root;
    const addCategoryBtn = this.root.querySelector("#add-new-category");
    const titleInput = this.root.querySelector("#category-title");
    const descriptionInput = this.root.querySelector("#category-description");

    const { onAddNewCategory } = handlers;
    this.onAddNewCategory = onAddNewCategory;

    addCategoryBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const title = titleInput.value;
      const description = descriptionInput.value;
      if (!title || !description) return;
      this.onAddNewCategory(title, description);
    });
  }

  createCategoryList(categories) {
    const categoriesOptions = this.root.querySelector("#product-category");
    let result = `    
    <option class="bg-slate-500 text-slate-300" value="">
      Select a Category
    </option>
    `;
    categories.forEach((cat) => {
      result += `
      <option class="bg-slate-500 text-slate-300" value="${cat.id}">
        ${cat.title}
      </option>
      `;
    });
    categoriesOptions.innerHTML = result;
  }
}
