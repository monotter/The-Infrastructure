const { CScheme } = require("../Defines")
module.exports = {
    scheme: CScheme("user", { mail: String, username: String })
}