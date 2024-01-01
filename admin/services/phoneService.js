export class Services {
  async fetchData(endpoint, method, data = null) {
    try {
      const res = await axios({
        url: `https://65900a3fcbf74b575eca648d.mockapi.io/${endpoint}`,
        method,
        data,
      });
      return res.data;
    } catch (error) {
      // Xử lý lỗi: ví dụ, ném ra một exception hoặc trả về một object chứa thông tin lỗi
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

  async getPhones() {
    return this.fetchData('Products', 'GET');
  }

  async addPhone(phone) {
    await this.fetchData('Products', 'POST', phone);
    // Xử lý thành công hoặc thất bại: thông báo hoặc xử lý UI tương ứng
  }

  async deletePhone(id) {
    await this.fetchData(`Products/${id}`, 'DELETE');
    // Xử lý thành công hoặc thất bại: thông báo hoặc xử lý UI tương ứng
  }

  async getPhoneById(id) {
    return this.fetchData(`Products/${id}`, 'GET');
  }

  async updatePhone(phone) {
    await this.fetchData(`Products/${phone.id}`, 'PUT', phone);
    // Xử lý thành công hoặc thất bại: thông báo hoặc xử lý UI tương ứng
  }
}
