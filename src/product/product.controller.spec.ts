import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let mockProductService = {
    createProduct: jest.fn(dto => {
      return {
        ...dto,
        id: 1
      }
    }),

    updateProduct: jest.fn().mockImplementation((id, dto) => {
      return {
        ...dto,
        id: id
      }
    }),

    deleteProduct: jest.fn().mockImplementation(id => {
      return {
        ...expect.any(Object),
        id: id
      }
    }),

    getProducts: jest.fn().mockImplementation(() => {
      return [expect.any(Object)]
    }),

    getProduct: jest.fn().mockImplementation(id => {
      return {
        ...expect.any(Object),
        id
      }
    }),

    updateQuantity: jest.fn().mockImplementation((id, quantity) => {
      return {
        ...expect.any(Object),
        id, quantity
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService]
    })
    .overrideProvider(ProductService)
    .useValue(mockProductService)
    .compile()

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  let productDto = {
    name: "Pasta",
    price: 200,
    quantity: 10,
  }

  it('should create a product', () => {
    expect(controller.createProduct(productDto)).toEqual(Promise.resolve({
      ...productDto,
      id: expect.any(Number)
    }))

    expect(mockProductService.createProduct).toHaveBeenCalledWith(productDto)
  })

  it('should update a product', () => {
    expect(controller.updateProduct(1, productDto)).toEqual(Promise.resolve({
      ...productDto,
      id: 1
    }))

    expect(mockProductService.updateProduct).toHaveBeenCalledWith(1, productDto)
  })

  it('should delete a product', () => {
    expect(controller.deleteProduct(1)).toEqual(Promise.resolve({
      ...productDto,
      id: 1
    }))

    expect(mockProductService.deleteProduct).toHaveBeenCalledWith(1)
  })

  it('should get all products', () => {
    expect(controller.getProducts()).toEqual(Promise.resolve([{
      ...productDto,
      id: expect.any(Number)
    }]))

    expect(mockProductService.getProducts).toHaveBeenCalledWith()
  })

  it('should get a product', () => {
    expect(controller.getProduct(1)).toEqual(Promise.resolve({
      ...productDto,
      id: 1
    }))

    expect(mockProductService.getProduct).toHaveBeenCalledWith(1)
  })

  it('should update product quantity', () => {
    let quantityDto = { quantity: 10 }
    expect(controller.updateQuantity(1, quantityDto)).toEqual(Promise.resolve([{
      ...productDto,
      ...quantityDto,
      id: expect.any(Number)
    }]))

    expect(mockProductService.updateQuantity).toHaveBeenCalledWith(1, quantityDto.quantity)
  })
});
