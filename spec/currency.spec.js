"use server";

import {convert} from "../lib/currency.js";

describe("Currency Module", () => {
    it('should convert USD to CNY', async () => {
        await convert(1, 'USD', 'CNY').then(result => {
            expect(result).toBeGreaterThan(0);
        });
    });

    it('should return the same amount when converting to the same currency', async () => {
        const amount = 100;
        const result = await convert(amount, 'EUR', 'EUR');
        expect(result).toBe(amount);
    });

    it('should handle invalid currency codes gracefully', async () => {
        await convert(1, 'INVALID', 'CNY').catch(e => {
            expect(e.message).toBe("The selected base currency is invalid.");
        });
    });
});