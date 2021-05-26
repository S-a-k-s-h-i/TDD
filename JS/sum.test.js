const sum = require('./sum')

test('Properly adds two numbers',() => {
    expect(
        sum(2,5)
        ).toBe(7)
})