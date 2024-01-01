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
      console.error(error);
    }
  }

  async getPhones() {
    return this.fetchData('Products', 'GET');
  }

  async getPhoneById(id) {
    return this.fetchData(`Products/${id}`, 'GET');
  }

}
