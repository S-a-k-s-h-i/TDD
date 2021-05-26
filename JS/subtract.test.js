const subtract = require('./subtract')

test('properly subtract two numbers',() => {
    expect(
        subtract(5,4)
    ).toBe(1)
})