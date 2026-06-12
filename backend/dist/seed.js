"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const schema_1 = require("./db/schema"); // include productVariants
const extra_seed_1 = require("./extra-seed");
function slugify(input) {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
async function main() {
    // 1) Brand
    const brandName = "Apple";
    const brandSlug = slugify(brandName);
    const [brand] = await db_1.db
        .insert(schema_1.brands)
        .values({
        name: brandName,
        slug: brandSlug,
        description: "Consumer electronics brand",
        logoUrl: "https://example.com/logos/apple.png",
        isVisible: true,
    })
        .onConflictDoUpdate({
        target: schema_1.brands.slug,
        set: {
            name: brandName,
            description: "Consumer electronics brand",
            logoUrl: "https://example.com/logos/apple.png",
            isVisible: true,
            updatedAt: new Date(),
        },
    })
        .returning({ id: schema_1.brands.id });
    // 2) Category (must match enum)
    const categoryEnumValue = "smartphones";
    const categorySlug = "smartphones";
    const [category] = await db_1.db
        .insert(schema_1.categories)
        .values({
        name: categoryEnumValue,
        slug: categorySlug,
        description: "Mobile phones and smartphones",
        isActive: true,
    })
        .onConflictDoUpdate({
        target: schema_1.categories.slug,
        set: {
            description: "Mobile phones and smartphones",
            isActive: true,
            updatedAt: new Date(),
        },
    })
        .returning({ id: schema_1.categories.id });
    // 3) Product (return its id so we can create variants)
    const title = "iPhone 13 Pro Max";
    const productSlug = slugify(title);
    const [product] = await db_1.db
        .insert(schema_1.products)
        .values({
        categoryId: category.id,
        brandId: brand.id,
        title,
        slug: productSlug,
        model: "iPhone 13 Pro Max",
        series: "iPhone 13 Series",
        specs: {
            screen: '6.7" Super Retina XDR',
            chip: "A15 Bionic",
            camera: "Triple 12MP",
            network: "5G",
        },
        description: "Dummy product for testing",
        isActive: true,
        minPrice: "1200.00",
        maxPrice: "1200.00",
        inStock: true,
        isFeatured: true,
        isNewArrival: true,
    })
        .onConflictDoUpdate({
        target: schema_1.products.slug,
        set: {
            updatedAt: new Date(),
        },
    })
        .returning({ id: schema_1.products.id, slug: schema_1.products.slug });
    // 4) Variants (THIS is what you add to cart/order)
    // condition MUST match your productConditionEnum values (example: "new", "used")
    const condition = "new";
    // Insert 2 variants, ignore duplicates by sku
    await db_1.db
        .insert(schema_1.productVariants)
        .values([
        {
            productId: product.id,
            sku: "APL-IP13PM-256-GOLD-NEW",
            condition,
            storage: 256,
            color: "Gold",
            price: "1200.00",
            compareAtPrice: "1300.00",
            stockQty: 5,
            isActive: true,
        },
        {
            productId: product.id,
            sku: "APL-IP13PM-128-BLUE-NEW",
            condition,
            storage: 128,
            color: "Blue",
            price: "1000.00",
            compareAtPrice: "1100.00",
            stockQty: 2,
            isActive: true,
        },
    ])
        .onConflictDoNothing({ target: schema_1.productVariants.sku });
    console.log("Seed complete:", {
        brandId: brand.id,
        categoryId: category.id,
        productId: product.id,
        productSlug: product.slug,
    });
    await (0, extra_seed_1.seedMoreProducts)();
}
main()
    .then(() => process.exit(0))
    .catch((e) => {
    console.error(e);
    process.exit(1);
});
