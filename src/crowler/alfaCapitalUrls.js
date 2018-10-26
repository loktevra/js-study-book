class AlfaCapitalUrls {
    constructor(path) {
        this.path = path;
    }
}

AlfaCapitalUrls.getProductsInfo = new AlfaCapitalUrls('https://www.alfacapital.ru/api/products/info.json');

module.exports = AlfaCapitalUrls;
