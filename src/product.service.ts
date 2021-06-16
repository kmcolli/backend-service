
import { Product } from './model';


export  class ProductsService {
    private static instance: ProductsService;
    private products: Product[];
    id: number = 2;
    
    private constructor() {
        this.products = [];
        this.products.push(generateRandomProduct());
     }

    public static getInstance(): ProductsService {
        if (!ProductsService.instance) {
            ProductsService.instance = new ProductsService();
        }

        return ProductsService.instance;
    }

    getProducts() {
        return this.products;
    }

    addProduct(product: Product) {
        if(product != null || product != undefined) {
            product.id = this.id;
            this.id = this.id + 1;
            this.products.push(product);
        }
    }

    getProduct(id: number) {
        let product: Product = null;
        product = this.products.find(x => x.id === id)
        console.log('Identified product as : ' + product);
        return product;
    }

    updateProduct(id: number, updateProduct: Product) {
        console.log('Update Product: ' + updateProduct)
        let product = this.getProduct(id);
        let index = this.products.indexOf(product);
        updateProduct.id = product.id;
        this.products[index] = updateProduct;
        return this.products[index];
    }

    deleteProduct(id: number) {
        this.getProducts().forEach((product, index) => {
            if(product.id == id) {
                this.products.splice(index, 1);
                return;
            }
        });
        console.log("Delete product" + this.products)
        return;
    }
}

function generateRandomProduct() {
    let product: Product = {
        id: 1,
        name: "Pen",
        sku: "QWEDSG",
        price: 1.43,
        stock: 10,
        description: "Userful for writing"
    };
    return product;
}
