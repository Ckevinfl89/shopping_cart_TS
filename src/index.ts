import { v4 as uuidv4 } from "uuid";

class Item {
  private id: string;
  private name: string;
  private price: number;
  private description: string;

  constructor(name: string, price: number, description: string) {
    this.id = uuidv4();
    this.name = name;
    this.price = price;
    this.description = description;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getDescription(): string {
    return this.description;
  }
}

class User {
  private id: string;
  private name: string;
  private age: number;
  private cart: Item[];

  constructor(name: string, age: number) {
    this.id = uuidv4();
    this.name = name;
    this.age = age;
    this.cart = [];
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getCart(): Item[] {
    return this.cart;
  }

  addToCart(item: Item): void {
    this.cart.push(item);
  }

  removeFromCart(item: Item): void {
    this.cart = this.cart.filter(
      (cartItem) => cartItem.getId() !== item.getId()
    );
  }

  removeFromCartQuantity(item: Item, qty: number): void {
    for (let i = 0; i < qty; i++) {
      const index = this.cart.findIndex((cartItem) => cartItem.getId() === item.getId());
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    }
  }
  

  cartTotal(): number {
    return this.cart.reduce((total, item) => total + item.getPrice(), 0);
  }

  printCart(): void {
    console.log(`Receipt for ${this.name}:\n`);
    console.log("Item Name".padEnd(50) + "Quantity".padEnd(15) + "Price");
    console.log("=".repeat(80));

    const printedItems: Set<string> = new Set();

    this.cart.forEach((item) => {
      if (!printedItems.has(item.getId())) {
        const itemName = item.getName().padEnd(50);
        const itemQuantity = `x${this.getItemQuantity(item)}`.padEnd(15);
        const itemPrice = `$${item.getPrice().toFixed(2)}`;
        console.log(`${itemName}${itemQuantity}${itemPrice}`);
        console.log(`Description: ${item.getDescription()}\n`);
        console.log("-".repeat(80));

        printedItems.add(item.getId());
      }
    });

    console.log("\n" + "=".repeat(80));

    const totalLabel = "Total:".padEnd(65);
    const totalValue = `$${this.cartTotal().toFixed(2)}`;
    const totalPadding = 100 - (totalLabel.length + totalValue.length);
    console.log(`${totalLabel.padStart(totalPadding / 2)}${totalValue.padEnd(totalPadding / 2)}`);

    console.log("\n\n");
  }

  getItemQuantity(item: Item): number {
    const matchingItems = this.cart.filter((cartItem) => cartItem.getId() === item.getId());
    return matchingItems.length;
  }
}

class Shop {
  private items: Item[];

  constructor() {
    this.items = [];
    const boxenOfDoughnuts = new Item("Dozen Doughnuts", 7.99, "Buy the holes too. Don't leave em hangin'.");
    const canOpener = new Item("The opener of cans", 1.99, "Has spinny blades with handles.");
    const cheese = new Item("Tillamook Cheese: Medium", 8.99, "Medium. Solid creamy goodness.");
    this.items.push(boxenOfDoughnuts, canOpener, cheese);
  }
  

  getItems(): Item[] {
    return this.items;
  }
}

const shop = new Shop();
const user = new User("Mr.Man", 35);


user.addToCart(shop.getItems()[0]);
user.addToCart(shop.getItems()[0]);
user.addToCart(shop.getItems()[0]);
user.addToCart(shop.getItems()[0]);
user.addToCart(shop.getItems()[1]);
user.addToCart(shop.getItems()[2]);
// user.removeFromCart(shop.getItems()[0]);
user.removeFromCartQuantity(shop.getItems()[0], 1);

user.printCart()