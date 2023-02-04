import * as assert from "assert";
import { simpleInterest, compoundInterest, MoneyResult } from './Money';
import {describe, expect, test} from '@jest/globals';



describe('money api test', () => {
    test('returns correct result for given inputs', () => {
        const principal = 10000000;
        const rate = 3;
        const time = 12;
        const expectedResult = principal * rate * time / (12 * 100);
        const real = simpleInterest(principal, rate, time);
        expect(real.interest).toBe("300000");
        expect(real.tax).toBe("46200");
        expect(real.afterInterest).toBe("253800");
        expect(real.maturityValue).toBe("10253800");

    });

    test('returns correct result for given inputs', () => {
        const principal = 10000000;
        const rate = 3;
        const time = 12;
        const compoundingFrequency = 12;
        const expectedResult = principal * Math.pow(1 + rate / (compoundingFrequency * 100), compoundingFrequency * time / 12) - principal;
        const ret = compoundInterest(principal, rate, time, compoundingFrequency);
        console.log(ret);

        expect(ret.interest).toBe("304160");
        expect(ret.tax).toBe("46841");
        expect(ret.afterInterest).toBe("257319");
        expect(ret.maturityValue).toBe("10257319");

    });
});
