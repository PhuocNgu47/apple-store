# 📊 ERD Diagram - E-commerce Database Schema

Entity Relationship Diagram cho dự án E-commerce.

## 🎨 Visual ERD

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USER                                       │
├─────────────────────────────────────────────────────────────────────────┤
│ _id: ObjectId (Primary Key)                                            │
│ name: String (required)                                                 │
│ email: String (required, unique, indexed)                              │
│ password: String (required, hashed with bcrypt)                        │
│ phone: String                                                           │
│ address: String                                                         │
│ city: String                                                            │
│ country: String                                                         │
│ role: Enum ['user', 'admin'] (default: 'user', indexed)                │
│ createdAt: Date                                                        │
└─────────────────────────────────────────────────────────────────────────┘
         │
         │ 1:N (userId)
         ├──────────────────────────────┬──────────────────────────────┐
         │                              │                              │
         ▼                              ▼                              ▼
┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
│       ORDER          │    │      ADDRESS         │    │     REVIEW           │
├──────────────────────┤    ├──────────────────────┤    ├──────────────────────┤
│ _id: ObjectId (PK)    │    │ _id: ObjectId (PK)    │    │ (Embedded in Product)│
│ userId: ObjectId (FK)│    │ userId: ObjectId (FK)│    │ user: ObjectId (FK)  │
│   ref: User          │    │   ref: User          │    │   ref: User          │
│ orderNumber: String  │    │ name: String         │    │ rating: Number       │
│   (unique, indexed)  │    │ phone: String        │    │ comment: String      │
│ items: [             │    │ address: String      │    │ createdAt: Date      │
│   {                  │    │ ward: String         │    └──────────────────────┘
│     productId:       │    │ district: String     │              │
│       ObjectId (FK)  │    │ city: String         │              │
│     quantity: Number │    │ country: String      │              │
│     price: Number    │    │ zipCode: String      │              │
│   }                  │    │ isDefault: Boolean   │              │
│ ]                    │    │ label: String         │              │
│ totalAmount: Number  │    │ createdAt: Date       │              │
│ shippingAddress: {   │    │ updatedAt: Date       │              │
│   name: String       │    └──────────────────────┘              │
│   phone: String      │                                          │
│   address: String    │                                          │
│   city: String       │                                          │
│   country: String    │                                          │
│   zipCode: String    │                                          │
│ }                    │                                          │
│ paymentMethod: Enum  │                                          │
│ paymentStatus: Enum  │                                          │
│ status: Enum         │                                          │
│   ['pending',        │                                          │
│    'confirmed',      │                                          │
│    'shipped',        │                                          │
│    'delivered',      │                                          │
│    'cancelled']      │                                          │
│ statusHistory: [     │                                          │
│   {                  │                                          │
│     status: String   │                                          │
│     updatedAt: Date  │                                          │
│     updatedBy:       │                                          │
│       ObjectId (FK)  │                                          │
│     note: String     │                                          │
│   }                  │                                          │
│ ]                    │                                          │
│ paidAt: Date         │                                          │
│ shippedAt: Date      │                                          │
│ deliveredAt: Date   │                                          │
│ createdAt: Date      │                                          │
│ updatedAt: Date      │                                          │
└──────────────────────┘                                          │
         │                                                         │
         │ N:M (items[].productId)                                │
         │                                                         │
         ▼                                                         │
┌───────────────────────────────────────────────────────────────────┐
│                         PRODUCT                                  │
├───────────────────────────────────────────────────────────────────┤
│ _id: ObjectId (Primary Key)                                      │
│ product_id: String (optional external id)                       │
│ sku: String                                                       │
│ name: String (required, indexed, text search)                    │
│ brand: String                                                     │
│ description: String                                              │
│ category: String (required, indexed)                            │
│ price: Number (required)                                         │
│ originalPrice: Number                                            │
│ discountPercentage: Number                                       │
│ currency: String (default: 'VND')                                │
│ stockStatus: String                                               │
│ stock: Number (default: 0, indexed)                              │
│ featured: Boolean (default: false)                               │
│ image: String (main image/thumbnail)                            │
│ thumbnail: String                                                 │
│ images: [String]                                                  │
│ specifications: Mixed (Object)                                   │
│ variants: [                                                       │
│   {                                                               │
│     color: String                                                 │
│     hexCode: String                                               │
│     sku_variant: String                                          │
│   }                                                               │
│ ]                                                                 │
│ promotions: [String]                                              │
│ tags: [String]                                                    │
│ warranty: String                                                  │
│ returnPolicy: String                                              │
│ rating: Number (default: 0, indexed)                            │
│ reviews: [                    ← Embedded Array (1:N)            │
│   {                                                               │
│     user: ObjectId (FK → User)                                   │
│     rating: Number                                                │
│     comment: String                                               │
│     createdAt: Date                                               │
│   }                                                               │
│ ]                                                                 │
│ seller: ObjectId (FK → User, ref: User)                          │
│ createdAt: Date                                                   │
└───────────────────────────────────────────────────────────────────┘
         │
         │ N:M (applicableProducts[])
         │
         ▼
┌───────────────────────────────────────────────────────────────────┐
│                         COUPON                                    │
├───────────────────────────────────────────────────────────────────┤
│ _id: ObjectId (Primary Key)                                      │
│ code: String (required, unique, uppercase, indexed)              │
│ name: String (required)                                           │
│ description: String                                              │
│ discountType: Enum ['percentage', 'fixed']                       │
│ discountValue: Number (required)                                  │
│ minPurchaseAmount: Number (default: 0)                           │
│ maxDiscountAmount: Number (nullable)                             │
│ usageLimit: Number (nullable, unlimited if null)                  │
│ usedCount: Number (default: 0)                                   │
│ validFrom: Date (required, indexed)                              │
│ validUntil: Date (required, indexed)                             │
│ isActive: Boolean (default: true, indexed)                        │
│ applicableCategories: [String]                                    │
│ applicableProducts: [ObjectId] (ref: Product)                    │
│ createdAt: Date                                                   │
│ updatedAt: Date                                                   │
└───────────────────────────────────────────────────────────────────┘
```

## 🔗 Relationships Summary

| Relationship | Type | Description | Implementation |
|--------------|------|-------------|----------------|
| **User → Orders** | 1:N | Một User có nhiều Orders | `Order.userId` (ref: User) |
| **User → Addresses** | 1:N | Một User có nhiều Addresses | `Address.userId` (ref: User) |
| **User → Reviews** | 1:N | Một User có thể review nhiều Products | `Product.reviews[].user` (ref: User) |
| **Order → Products** | N:M | Một Order có nhiều Products | `Order.items[].productId` (ref: Product) |
| **Product → Reviews** | 1:N | Một Product có nhiều Reviews | Embedded: `Product.reviews[]` |
| **Coupon → Products** | N:M | Một Coupon áp dụng nhiều Products | `Coupon.applicableProducts[]` (ref: Product) |
| **Product → Seller** | N:1 | Nhiều Products thuộc một Seller | `Product.seller` (ref: User) |

## 📊 Indexes

### Users Collection
- `email`: unique index
- `role`: index

### Orders Collection
- `userId`: index (for fast user orders lookup)
- `orderNumber`: unique index
- `status`: index
- `createdAt`: index (for sorting)

### Products Collection
- `name`: text index (for search)
- `category`: index
- `stock`: index (for low stock alerts)
- `rating`: index

### Addresses Collection
- `userId`: index
- `userId + isDefault`: compound index

### Coupons Collection
- `code`: unique index
- `isActive + validFrom + validUntil`: compound index

## 🎯 Query Patterns

### 1. Get User Orders with Products
```javascript
const orders = await Order.find({ userId })
  .populate('userId', 'name email')
  .populate('items.productId', 'name price image')
  .sort({ createdAt: -1 });
```

### 2. Get Product with Reviews
```javascript
const product = await Product.findById(productId)
  .populate('reviews.user', 'name email')
  .populate('seller', 'name email');
```

### 3. Get Coupon Applicable Products
```javascript
const coupon = await Coupon.findOne({ code })
  .populate('applicableProducts', 'name price category');
```

## 📝 Notes

- **Embedded vs Reference:**
  - Reviews: Embedded trong Product (vì thường query cùng Product)
  - Orders: Reference (vì có thể query độc lập)
  - Addresses: Reference (vì có thể query độc lập)

- **Indexes:**
  - Thêm indexes cho các trường thường query
  - Compound indexes cho queries phức tạp

- **Populate:**
  - Luôn populate khi cần thông tin đầy đủ
  - Sử dụng select để giảm data transfer
  - Tránh populate quá nhiều levels

## 🛠️ Tools để Vẽ ERD

1. **Draw.io** (https://app.diagrams.net/) - Free, online
2. **Lucidchart** - Professional, có free tier
3. **Mermaid** - Code-based, tích hợp với Markdown
4. **MongoDB Compass** - Visual schema từ database

## 📸 Export ERD

Để export ERD diagram:
1. Vẽ trên Draw.io
2. File → Export as → PNG/SVG/PDF
3. Lưu vào thư mục `docs/` hoặc root project

---

**💡 Tip:** Update ERD này mỗi khi thêm/sửa schema để giữ documentation đồng bộ!

