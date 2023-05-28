const Order = require("./assignment1Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  MENU: Symbol("menu"),
  SIZE: Symbol("size"),
  TOPPINGS: Symbol("toppings"),
  DRINKS: Symbol("drinks"),
});
const price = {
  small: 12,
  medium: 14,
  large: 18,
  toppings: 5,
  drinks: 3,
};
module.exports = class ShwarmaOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sToppings = "";
    this.sDrinks = "";
    this.sItem = "";
    this.total = 0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.MENU;
        aReturn.push("Welcome to Pho Vietnam KW");
        aReturn.push("What would you like? Pho, Fried Rice, Pad Thai?");
        break;
      case OrderState.MENU:
        this.stateCur = OrderState.SIZE;
        this.sItem = sInput;
        aReturn.push("What size would you like?Small, medium, large?");
        break;
      case OrderState.SIZE:
        this.stateCur = OrderState.TOPPINGS;
        this.sSize = sInput;
        this.total += price[sInput];
        aReturn.push("What toppings would you like?Beef, Chicken, Shrimp?");
        break;
      case OrderState.TOPPINGS:
        this.stateCur = OrderState.DRINKS;
        this.sToppings = sInput;
        this.total += price.toppings;
        aReturn.push("Would you like drinks with that?");
        break;
      case OrderState.DRINKS:
        this.isDone(true);
        if (sInput.toLowerCase() != "no") {
          this.sDrinks = sInput;
          this.total += price.drinks;
        }
        aReturn.push("Thank-you for your order of");
        aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
        if (this.sDrinks) {
          aReturn.push(this.sDrinks);
        }
        const tax = this.total * 0.13;
        aReturn.push(
          `Subtotal: $${this.total}\nHST: $${tax}\nTotal: $${this.total + tax}`
        );
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
