const Wallpaper = require("../Wallpaper")
// @ponicode
describe("Wallpaper.default.getDerivedStateFromProps", () => {
    test("0", () => {
        let param1 = [["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"]]
        let result = Wallpaper.default.getDerivedStateFromProps(param1, "Abruzzo")
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let param1 = [["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"]]
        let result = Wallpaper.default.getDerivedStateFromProps(param1, "Florida")
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let param1 = [["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"]]
        let result = Wallpaper.default.getDerivedStateFromProps(param1, "Alabama")
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let param1 = [["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"], ["reply_click()", "reply_click()", "reply_click()", "reply_click()"]]
        let result = Wallpaper.default.getDerivedStateFromProps(param1, "Île-de-France")
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result = Wallpaper.default.getDerivedStateFromProps([], "")
        expect(result).toMatchSnapshot()
    })
})
