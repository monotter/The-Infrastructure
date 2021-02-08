const { CScheme } = require("../Defines")
module.exports = {
    scheme: CScheme("message", { content: String, sender: String })
}