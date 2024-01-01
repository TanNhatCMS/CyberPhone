export class Validator {
    numRegex = /^[0-9]+$/;
  
    showMessage = (idTB, message = '', isVisible = true) => {
      const element = getEle(idTB);
      element.innerHTML = isVisible ? message : '&#8205;'; //invisible (to keep distance between forms unchanged)
      element.style.display = isVisible ? 'block' : 'none';
    };
  
    isEmpty(id, idTB) {
      const text = getEle(id).value.trim();
      const isEmpty = text === '';
      this.showMessage(idTB, isEmpty ? `(*)This field can't be empty` : '', isEmpty);
      return !isEmpty;
    }
  
    isSelected(id, idTB) {
      const selectedIndex = getEle(id).selectedIndex;
      const notSelected = selectedIndex === 0;
      this.showMessage(idTB, notSelected ? '(*)Please select one option' : '', !notSelected);
      return !notSelected;
    }
  
    isMatchingFormat(id, idTB, format) {
      const text = getEle(id).value;
      const isValidFormat = text.match(format);
      this.showMessage(idTB, !isValidFormat ? '(*)Price must be a number' : '', isValidFormat);
      return isValidFormat;
    }
  
    isNotExist(phoneList, isUpdate = false) {
      if (isUpdate) return true;
      const enteredName = getEle('name').value;
      const isUnique = !phoneList.some(phone => phone.name === enteredName);
      this.showMessage('tbname', '(*)This phone already exists', isUnique);
      return isUnique;
    }
  
    isValid(phoneList, isUpdate) {
      const validations = [
        this.isEmpty('name', 'tbname') && this.isNotExist(phoneList, isUpdate),
        this.isEmpty('price', 'tbprice') && this.isMatchingFormat('price', 'tbprice', this.numRegex),
        this.isEmpty('screen', 'tbscreen'),
        this.isEmpty('backCam', 'tbbackCam'),
        this.isEmpty('frontCam', 'tbfrontCam'),
        this.isEmpty('img', 'tbimg'),
        this.isEmpty('desc', 'tbdesc'),
        this.isSelected('type', 'tbtype'),
      ];
      return validations.every(validation => validation);
    }
  }
  