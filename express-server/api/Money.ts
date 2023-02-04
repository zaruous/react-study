import {expect} from "@jest/globals";

/**
 * Calculates simple interest
 * @param principal Principal amount
 * @param rate Interest rate
 * @param time Time in months
 */
export function simpleInterest(principal: number, rate: number, time: number): MoneyResult {
    const interest = principal * rate * time / (12 * 100);
    const tax = interest * 0.154;
    const afterInterest = interest - tax;
    return new MoneyResult(
        interest.toFixed(0),
        tax.toFixed(0),
        afterInterest.toFixed(0),
        (principal + afterInterest).toFixed(0));
}
/**

 Calculates compound interest
 @param principal Principal amount
 @param rate Interest rate
 @param time Time in months
 @param compoundingFrequency Compounding frequency (default: 12, which means monthly compounding)
 */
export function compoundInterest(principal: number, rate: number, time: number, compoundingFrequency: number = 12): MoneyResult {
    const interest = (principal * Math.pow(1 + rate / (compoundingFrequency * 100), compoundingFrequency * time / 12) - principal);
    const tax = interest * 0.154;
    const afterInterest = Number(interest - tax);
    return new MoneyResult(interest.toFixed(0),tax.toFixed(0), afterInterest.toFixed(0), (principal + afterInterest).toFixed(0));
}

/**
 *
 */
export class MoneyResult {
    interest: string
    tax: string
    afterInterest: string
    maturityValue: string
    constructor(interest : string, tax :string, afterInterest : string, maturityValue : string) {
        this.interest = interest;
        this.tax = tax;
        this.afterInterest = afterInterest;
        this.maturityValue = maturityValue;
    }

    equals(other: MoneyResult) : boolean{
        if(other == null) return false;

        return this.interest === other.interest &&
            this.tax === other.tax &&
            this.afterInterest === other.afterInterest &&
            this.maturityValue === other.maturityValue;
    }

}