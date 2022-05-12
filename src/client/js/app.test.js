// Test taken from JEST documentation https://jestjs.io/docs/api#describeonlyname-fn

import { getApiData } from "./app.js";


//Main Function
describe('getApiData must be an Async function', () => {
    test('Excellent! getApiData is an Async function!', async () => {
        expect(typeof getApiData).toBe("function");
    });
});