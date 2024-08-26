import API from "../plugins";

class ProductService {
  getAll(payload = {}) {
    return API.get(
      `products/?name=${payload.name || ""}&category=${
        payload.category || ""
      }&page=${payload.page || 0}&size=${payload?.size || 5}`
    );
  }
  add(payload) {
    return API.post("/products", payload);
  }
}

export default new ProductService();
