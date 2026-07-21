import { InventoryService } from "../../services/InventoryService.js";
import { PaymentService } from "../../services/PaymentService.js";
import { ShippingService } from "../../services/ShippingService.js";

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.

        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        const inStock = this.inventoryService.checkStock(orderDetails.productIds);
        if (!inStock) {
            console.log("Some products are not in stock.");
            return;
        }
        // 2. If they are, process the payment using `paymentService.processPayment()`.
        const paymentSuccessful = this.paymentService.processPayment(orderDetails.userId, orderDetails.productIds);
        if (!paymentSuccessful) {
            console.log("Payment processing failed.");
            return;
        }
        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        const shippingArranged = this.shippingService.arrangeShipping(orderDetails.shippingInfo);
        if (!shippingArranged) {
            console.log("Failed to arrange shipping.");
            return;
        }
        // 4. Log the result of each step. If a step fails, log it and stop.
        console.log("Order placed successfully.");
    }
}

export { CheckoutFacade };
