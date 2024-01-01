export class Phone {
    constructor(id, name, price, screen, backCamera, frontCamera, img, desc, type) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.screen = screen;
      this.backCamera = backCamera;
      this.frontCamera = frontCamera;
      this.img = img;
      this.desc = desc;
      this.type = type;
    }
  
    // Phương thức tính toán giá sau khi áp dụng giảm giá
    calculateDiscountedPrice(discountPercentage) {
      return this.price * (1 - discountPercentage);
    }
  
    // Phương thức trả về mô tả ngắn gọn
    getShortDescription() {
      return `${this.name} - ${this.desc.substr(0, 50)}...`;
    }
  
    // Các setter để bảo vệ tính toàn vẹn của dữ liệu
    setPrice(newPrice) {
      if (typeof newPrice === 'number' && newPrice > 0) {
        this.price = newPrice;
      } else {
        throw new Error('Invalid price');
      }
    }
  }
  