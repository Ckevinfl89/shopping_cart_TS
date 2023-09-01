"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Item {
    constructor(name, price, description) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.price = price;
        this.description = description;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getDescription() {
        return this.description;
    }
}
class User {
    constructor(name, age) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.age = age;
        this.cart = [];
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
    getCart() {
        return this.cart;
    }
    addToCart(item) {
        this.cart.push(item);
    }
    removeFromCart(item) {
        this.cart = this.cart.filter((cartItem) => cartItem.getId() !== item.getId());
    }
    removeFromCartQuantity(item, qty) {
        for (let i = 0; i < qty; i++) {
            const index = this.cart.findIndex((cartItem) => cartItem.getId() === item.getId());
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        }
    }
    cartTotal() {
        return this.cart.reduce((total, item) => total + item.getPrice(), 0);
    }
    printCart() {
        console.log(`Receipt for ${this.name}: \n`);
        this.cart.forEach((item) => {
            console.log(`${item.getName()} - $${item.getPrice().toFixed(2)}`);
            console.log(`Description: ${item.getDescription()}`);
        });
        console.log(`Total: $${this.cartTotal().toFixed(2)}`);
    }
}
class Shop {
    constructor() {
        this.items = [];
        const boxenOfDoughnuts = new Item("Dozen Doughnuts", 7.99, "Buy the holes too. Don't leave em hangin'.");
        const canOpener = new Item("The opener of cans", 1.99, "Has spinny blades with handles.");
        const cheese = new Item("Tillamook Cheese: Medium", 8.99, "Medium. Solid creamy goodness.");
        this.items.push(boxenOfDoughnuts, canOpener, cheese);
    }
    getItems() {
        return this.items;
    }
}
const shop = new Shop();
const user = new User("Mr.Man", 35);
user.addToCart(shop.getItems()[0]);
user.addToCart(shop.getItems()[0]);
user.addToCart(shop.getItems()[0]);
user.printCart();
