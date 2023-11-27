const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

names.forEach(name => console.log(name));

names.forEach((name, index) => console.log(`${name} (${provinces[index]})`));

const uppercaseProvinces = provinces.map(provinces => provinces.toUpperCase());
console.log(uppercaseProvinces);

const amountCharacter = names.map(name => name.length);
console.log(amountCharacter);

const sortingProvinces = provinces.toSorted();
console.log(sortingProvinces);

const filterProvincesWithoutwordCape = provinces.filter(provinces => !provinces.includes('Cape'));
console.log(filterProvincesWithoutwordCape);

const containsS = names.map(name => name.split('').some(character => character === 'S'));
console.log(containsS);

const nameProvince = names.reduce((accumulater, names, index) => {
    accumulater[names] = provinces[index]
    return accumulater
}, {});
console.log(nameProvince);

const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
];

console.log(
    products.forEach((product) => console.log(product.product))
);

console.log(
    products.filter((product) => product.product.length <= 5)
);

console.log(
    products
        .filter((product) => product.price !== '' && !isNaN(product.price))
        .map((product) => ({ ...product, price: Number(product.price) }))
        .reduce((accumulator, product) => accumulator + product.price, 0)
);

console.log(
    products.map((product) => product.product).join(', ')
);

console.log(
    products.reduce(
        (result, product) => {
            const priceOfProduct = Number(product.price);

            if (isNaN(priceOfProduct)) return result;

            if (priceOfProduct > result.highest.price || !result.highest.name) {
                result.highest = { name: product.product, price: priceOfProduct };
            }

            if (priceOfProduct < result.lowest.price || !result.lowest.name) {
                result.lowest = { name: product.product, price: priceOfProduct };
            }

            return result;
        },
        { highest: { name: '', price: 0 }, lowest: { name: '', price: 0 } }
    )
);

console.log(
    products.reduce((accumulator, product) => {
        const transformedProduct = Object.entries(product).reduce((newProduct, [keyValue, value]) => {
                if (keyValue === 'product') {
                    newProduct.name = value;
                } else if (keyValue === 'price') {
                    newProduct.cost = value;
                } else {
                    newProduct[keyValue] = value;
                }

                return newProduct;
            },
            {}
        );

        accumulator.push(transformedProduct);

        return accumulator;

    }, [])
);