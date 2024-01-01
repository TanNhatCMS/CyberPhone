export class Service {
  getPhones = async () => {
    try {
      const res = await axios({
        url: 'https://65900a3fcbf74b575eca648d.mockapi.io/Products',
        method: 'GET',
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  getPhoneById = async (id) => {
    try {
      const res = await axios({
        url: `https://65900a3fcbf74b575eca648d.mockapi.io/Products/${id}`,
        method: 'GET',
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
}
