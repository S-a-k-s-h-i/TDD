const bookService = require("../src/book.service")
const booksProvider = require("../src/books-provider")
const emailService = require("../src/email.service")


describe('searchBooks',() => {
    describe('when one book matches search text',() => {
        beforeEach(() => {
            booksProvider.getBooks = jest.fn(() => [
                {
                    _id:1,
                    title:'Test book',
                    publishedDate:'2006-11-01T00:00:00.000-0700'
                }
            ]);
            emailService.sendMissingBookEmail = jest.fn();
        })

        it('should return 1 book',() => {
            const books = bookService.searchBooks('Test');
            expect(books.length).toBe(1)
        })

        it('should concatenate title with year of published date',() => {
            const books = bookService.searchBooks('Test');
            expect(books[0]).toMatchObject({
                title:'Test book 2006'
            })
        })

        it('should not call send email ',() => {
            const books = bookService.searchBooks('Test');
            expect(emailService.sendMissingBookEmail).not.toHaveBeenCalled();
        })
    })

    describe('when zero book matches search text',() => {
        beforeEach(() => {
            booksProvider.getBooks = jest.fn(() => [
                {
                    _id:1,
                    title:'Test book',
                    publishedDate:'2006-11-01T00:00:00.000-0700'
                }
            ]);
            emailService.sendMissingBookEmail = jest.fn();
        })

        it('should return 1 book',() => {
            const books = bookService.searchBooks('Another');
            expect(books.length).toBe(0)
        })

        it('should call send email ',() => {
            const books = bookService.searchBooks('Another');
            expect(emailService.sendMissingBookEmail).toHaveBeenCalled();
        })
    })
})

describe("getMostPopularBook",() => {

    beforeEach(() => {
        booksProvider.getBooks = jest.fn(() => [
            {
                _id:1,
                ordered:10
            },
            {
                _id:2,
                ordered:5
            },
            {
                _id:3,
                ordered:4
            }
        ])
    })

    describe("when two books are given ",() => {
        it("should return book with highest order count",() => {
            const book = bookService.getMostPopularBook();
            expect(book._id).toBe(1)
        })
    })
})

describe("calculateDiscount",() => {
    beforeEach(() => {
        booksProvider.getBooks = jest.fn(() => [
            {
                _id:1,
                price:100
            }
        ])
    })

    describe("calculate discount of book if the book with given id is found",() => {
        it("should calculate discount",() => {
            const priceAfterDiscount = bookService.calculateDiscount(1);
            expect(priceAfterDiscount).toBe(80);
        })
    })

    describe("book with such id not found",() => {
        it("should throw an error",() => {
           expect(() => bookService.calculateDiscount(2)).toThrow('Book with such id not found')
        })
    })
})

describe("calculateDiscountAsync",() => {
    beforeEach(() => {
        booksProvider.getBooks = jest.fn(() => [
            {
                _id:1,
                price:100
            }
        ])
    })

    describe("calculate discount of book if the book with given id is found",() => {
        it("should calculate discount",async() => {
            const priceAfterDiscount = await bookService.calculateDiscountAsync(1);
            expect(priceAfterDiscount).toBe(80);
        })
    })

    describe("book with such id not found",() => {
        it("should throw an error",() => {
           expect(async() => await bookService.calculateDiscountAsync(2))
           .rejects.toThrow('Book with such id not found')
        })
    })
})
