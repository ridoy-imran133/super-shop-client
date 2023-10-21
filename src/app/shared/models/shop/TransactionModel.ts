import { TransactionWiseProductDTO } from "./TransactionWiseProductDTO";

export class TransactionModel {
    GrandTotal: number = 0.0;
    PrevGrandTotal: number = 0.0;
    DiscountParcent: number = 0.0;
    DiscountAmount: number = 0.0;
    PaymentValue: number;
    CollectedAmount: number = 0.0;
    ChangeAmount: number = 0.0;
    FlatDiscount: number = 0.0;
    PaymentType: string = "cash";
    CustomerId: string;
    UserId: string;
    OutletCode: string;
    _products: TransactionWiseProductDTO[];
}