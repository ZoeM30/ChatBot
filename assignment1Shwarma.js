const Order = require("./assignment1Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  MENU: Symbol("menu"),
  SIZE: Symbol("size"),
  TOPPINGS: Symbol("toppings"),
  SPRINGROLLS: Symbol("springrolls"),
  DRINKS: Symbol("drinks"),
  SECONDITEM: Symbol("secondItem"),
  SECONDSIZE: Symbol("secondSize"),
  SECONDTOPPING: Symbol("secondTopping"),
});
const price = {
  pho: { small: 12, medium: 14, large: 18 },
  rice: { small: 10, medium: 12, large: 16 },
  soup: { small: 8, medium: 10, large: 13 },
  toppings: 5,
  springroll: { vegetable: 5, shrimp: 7, tofu: 5 },
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
    this.springroll = "";
    this.sSecondItem = "";
    this.sSecondSize = "";
    this.sSecondTopping = "";
    this.total = 0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.MENU;
        aReturn.push("Welcome to Pho Vietnam KW");
        aReturn.push("What would you like? Pho, Rice, Soup?");
        break;
      case OrderState.MENU:
        this.stateCur = OrderState.SIZE;
        this.sItem = sInput;
        aReturn.push("What size would you like?Small, medium, large?");
        break;
      case OrderState.SIZE:
        this.stateCur = OrderState.TOPPINGS;
        this.sSize = sInput;
        this.total += price[this.sItem][this.sSize];
        aReturn.push("What toppings would you like?Beef, Chicken, Shrimp?");
        break;
      case OrderState.TOPPINGS:
        this.stateCur = OrderState.SECONDITEM;
        this.sToppings = sInput;
        this.total += price.toppings;
        aReturn.push("Would you like another item?Pho, Rice, Soup?");
        break;
      case OrderState.SECONDITEM:
        if (sInput.toLowerCase() != "no") {
          this.sSecondItem = sInput;
          this.stateCur = OrderState.SECONDSIZE;
          aReturn.push("What size would you like?");
        } else {
          this.stateCur = OrderState.SPRINGROLLS;
          aReturn.push(
            "Would you like a spring roll with your order?Vegetable, shrimp, tofu?"
          );
        }
        break;
      case OrderState.SECONDSIZE:
        this.stateCur = OrderState.SECONDTOPPING;
        this.sSecondSize = sInput;
        this.total += price[this.sSecondItem][this.sSecondSize];
        aReturn.push("What toppings would you like?Beef, Chicken, Shrimp?");
        break;
      case OrderState.SECONDTOPPING:
        this.stateCur = OrderState.SPRINGROLLS;
        this.sSecondTopping = sInput;
        this.total += price.toppings;
        aReturn.push(
          "Would you like a spring roll with your order?Vegetable, shrimp, tofu?"
        );
        break;
      case OrderState.SPRINGROLLS:
        this.stateCur = OrderState.DRINKS;
        if (sInput.toLowerCase() != "no") {
          this.springroll = sInput;
          this.total += price.springroll[sInput];
        }
        aReturn.push("Would you like a drink with your order?");
        break;
      case OrderState.DRINKS:
        this.isDone(true);
        if (sInput.toLowerCase() != "no") {
          this.sDrinks = sInput;
          this.total += price.drinks;
        }
        aReturn.push("Thank-you for your order of");
        aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
        if (this.sSecondItem) {
          aReturn.push(
            `${this.sSecondSize} ${this.sSecondItem} with ${this.sSecondTopping}`
          );
        }
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
