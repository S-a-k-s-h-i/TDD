const functions = require('./functions')

//Promise
test("user fetched name should be Leanne Graham",() => {
   expect.assertions(1);
   return functions.fetchUser()
   .then(data => {
       expect(data.name).toEqual('Leanne Graham')
   })
})

//async await
test("user fetched name should be Leanne Graham",async () => {
    expect.assertions(1);
    const data =await functions.fetchUser()
    expect(data.name).toEqual('Leanne Graham')
    
 })
