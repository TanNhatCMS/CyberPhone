export class Services {
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
  
    addPhone = async (phone) => {
      try {
        await axios({
          url: 'https://65900a3fcbf74b575eca648d.mockapi.io/Products',
          method: 'POST',
          data: phone,
        });
      } catch (err) {
        console.log(err);
      }
    };
  
    deletePhone = async (id) => {
      try {
        await axios({
          url: `https://65900a3fcbf74b575eca648d.mockapi.io/Products/${id}`,
          method: 'DELETE',
        });
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
  
    updatePhone = async (phone) => {
      try {
        await axios({
          url: `https://65900a3fcbf74b575eca648d.mockapi.io/Products/${phone.id}`,
          method: 'PUT',
          data: phone,
        });
      } catch (err) {
        console.log(err);
      }
    };
  }
  