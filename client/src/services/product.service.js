import API from "../plugins";

class ProductService {
  getAll(payload = {}) {
    return API.get(
      `products/?name=${payload.name || ""}&category=${
        payload.category || ""
      }&page=${payload.page || 1}&size=${payload?.size || 5}`
    );
  }
}

export default new ProductService();
