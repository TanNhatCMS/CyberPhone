const getEle = (id) => document.getElementById(id);
const resetForm = (formId) => getEle(formId).reset();

import { CustomModal, Helper } from './utils.js';
import { Services } from '../services/phoneService.js';
import { Validator } from './validator.js';
import { Phone } from '../model/phone.js';

const helper = new Helper();
const service = new Services();
const validator = new Validator();

const renderList = async () => {
  try {
    const phoneList = await service.getPhones();
    let content = '';
    phoneList.forEach((ele) => {
        content += ` <tr>
        <td>${ele.id}</td>
        <td><strong>${ele.name}</strong></td>
        <td>$${ele.price}</td>
        <td style="text-align: center"><img src=${ele.img} alt="phone-img" width="150" height="150"></td>
        <td>${ele.desc}</td>
        <td class = ''style="text-align: center"><button class="btn my-3 me-1" data-bs-toggle="modal"
        data-bs-target="#exampleModal" onclick ="btnEdit('${ele.id}')"  id='btnEdit'>
        Edit<i class="fa fa-pencil-square ms-2"></i>
        </button><button class="btn " onclick ="btnDelete('${ele.id}')" id='btnDelete'>
        Delete <i class="fa fa-trash ms-2"></i>
        </button></td>
        </tr>`;
    });
    getEle('tablePhone').innerHTML = content;
  } catch (error) {
    console.error(error);
    // Handle errors appropriately, e.g., display error message
  }
};

window.onload = async () => {
  try {
    await renderList();
  } catch (error) {
    console.error(error);
    // Handle errors appropriately, e.g., display error message
  }
};

getEle('addPhoneForm').onclick = () => {
  helper.clearTextBoxes();
  getEle('btnUpdate').style.display = 'none';
  getEle('btnAddPhone').style.display = 'inline-block';
};

getEle('btnAddPhone').onclick = async () => {
  try {
    const phoneList = await service.getPhones();
    if (!validator.isValid(phoneList)) return;

    const inputs = helper.getInputValues();
    const phone = new Phone('', ...inputs);
    await service.addPhone(phone);
    await renderList();
    resetForm('formPhone');
    CustomModal.alertSuccess('Add phone successfully');
  } catch (error) {
    console.error(error);
    // Handle errors appropriately, e.g., display error message
  }
};

window.btnDelete = async (id) => {
  try {
    const res = await CustomModal.alertDelete(`This phone will be deleted, you can't undo this action`);
    if (res.isConfirmed) {
      await service.deletePhone(id);
      await renderList();
      CustomModal.alertSuccess('Delete phone successfully');
    }
  } catch (error) {
    console.error(error);
    // Handle errors appropriately, e.g., display error message
  }
};

window.btnEdit = async (id) => {
  try {
    helper.clearTextBoxes();
    getEle('btnUpdate').style.display = 'inline-block';
    getEle('btnAddPhone').style.display = 'none';

    const data = await service.getPhoneById(id);
    delete data.id;
    const arrObjValue = Object.values(data);
    helper.fillInputs(arrObjValue);

    getEle('btnUpdate').onclick = async () => {
      const phoneList = await service.getPhones();
      if (!validator.isValid(phoneList, true)) return;

      const inputs = helper.getInputValues();
      const phone = new Phone(id, ...inputs);
      await service.updatePhone(phone);
      await renderList();
      CustomModal.alertSuccess('Update phone successfully');
      $('#exampleModal').modal('hide');
    };
  } catch (error) {
    console.error(error);
    // Handle errors appropriately, e.g., display error message
  }
};
