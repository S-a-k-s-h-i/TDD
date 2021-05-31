const reverseString = require("./reverseString");

test("reverseString function exist",() => {
    expect(reverseString)
    .toBeDefined()
})

test("reverseString reverses string",() => {
        expect(reverseString('sakshi'))
        .toBe('ihskas')
})

test("reverseString reverses string with Upper Case",() => {
    expect(reverseString('Sakshi'))
    .toBe('ihskas')
})