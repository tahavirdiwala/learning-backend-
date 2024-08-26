import API from "../plugins";

class CategoryService {
  getAll() {
    return API.get(`/categories`);
  }
}

export default new CategoryService();
