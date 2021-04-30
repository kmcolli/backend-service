import { NextFunction, Request, Response, Router } from 'express';
import { Product } from './model';
import { ProductsService } from './product.service';

export const router: Router = Router();

router.get('/products', function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = ProductsService.getInstance();
    const allProducts = repository.getProducts();
    console.log('All products [' );
    allProducts.forEach(product => { console.log(product); });
    console.log(']');
    res.send(allProducts);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/product/:id', function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = ProductsService.getInstance();
    const product = repository.getProduct(Number.parseInt(req.params.id));
    res.send(product);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/product', function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = ProductsService.getInstance();
    const product = new Product();
    product.name = req.body.name;
    product.sku = req.body.sku;
    product.description = req.body.description;
    product.price = Number.parseFloat(req.body.price);
    product.stock = Number.parseInt(req.body.stock);

    const result = repository.addProduct(product);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/product/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = ProductsService.getInstance();
    console.log('id:' + Number.parseInt(req.params.id));
    const product = await repository.getProduct(Number.parseInt(req.params.id));
    product.name = req.body.name;
    product.sku = req.body.sku;
    product.description = req.body.description;
    product.price = Number.parseFloat(req.body.price);
    product.stock = Number.parseInt(req.body.stock);

    const result = await repository.updateProduct(Number.parseInt(req.params.id), product);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/product/:id', function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = ProductsService.getInstance();
    repository.deleteProduct(Number.parseInt(req.params.id));
    res.send('OK');
  }
  catch (err) {
    return next(err);
  }
});

router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send("Welcome to Product Database")
});