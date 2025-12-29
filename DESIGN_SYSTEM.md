# 🎨 Design System & Style Guide

## 📚 Giới Thiệu

Ứng dụng Apple Store sử dụng một **Design System chuyên nghiệp** với:
- ✅ **Fonts**: Inter (body) + Poppins (headings)
- ✅ **Colors**: Professional color palette
- ✅ **Spacing**: Consistent padding & margins
- ✅ **Components**: Reusable UI components
- ✅ **Responsive**: Mobile-first design

---

## 🎯 Quick Start - Cách Dùng UI Components

### Import UI Components:
```jsx
import {
  Section,
  Grid,
  Card,
  Button,
  Heading,
  Text,
  Input,
  Container,
  FlexBetween,
  Badge,
} from '../components/UI';
```

---

## 📦 Components Chính

### 1️⃣ **Layout - Section**
```jsx
<Section title="Sản Phẩm Apple" subtitle="Các sản phẩm chính hãng">
  <p>Nội dung ở đây</p>
</Section>
```

### 2️⃣ **Grid - Responsive**
```jsx
<Grid columns="grid-responsive">
  <Card>Product 1</Card>
  <Card>Product 2</Card>
  <Card>Product 3</Card>
</Grid>
```

### 3️⃣ **Card - Container**
```jsx
// Default card
<Card>Nội dung</Card>

// Large card
<Card variant="lg">Nội dung lớn</Card>

// Bordered card
<Card variant="bordered">With border</Card>

// Hover effect
<Card variant="hover" onClick={() => alert('Clicked!')}>
  Có hiệu ứng khi hover
</Card>
```

### 4️⃣ **Button - Actions**
```jsx
// Primary button
<Button>Thêm Vào Giỏ</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Disabled
<Button disabled>Disabled</Button>
```

### 5️⃣ **Form - Input Fields**
```jsx
<Input 
  label="Email" 
  type="email" 
  placeholder="your@email.com"
  required
/>

<Select 
  label="Category"
  options={[
    { value: 'iphone', label: 'iPhone' },
    { value: 'ipad', label: 'iPad' },
  ]}
/>

<Textarea 
  label="Message"
  placeholder="Nhập nội dung..."
  rows={4}
/>
```

### 6️⃣ **Typography - Text**
```jsx
<Heading level={1}>Tiêu đề H1</Heading>
<Heading level={2}>Tiêu đề H2</Heading>
<Heading level={3}>Tiêu đề H3</Heading>

<Text variant="body">Nội dung chính</Text>
<Text variant="caption">Chú thích nhỏ</Text>
<Text variant="muted">Văn bản mờ</Text>
```

### 7️⃣ **Badge - Tags**
```jsx
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
```

---

## 🎨 CSS Classes - Dùng Trực Tiếp

### Buttons
```jsx
// Standard buttons
<button className="btn btn-primary">Thêm Vào Giỏ</button>
<button className="btn btn-secondary">Hủy</button>
<button className="btn btn-success">Đồng Ý</button>
<button className="btn btn-danger">Xóa</button>
<button className="btn btn-outline">Outline</button>
<button className="btn btn-ghost">Ghost</button>

// Sizes
<button className="btn btn-primary-lg">Large</button>
<button className="btn btn-primary-sm">Small</button>
```

### Cards
```jsx
<div className="card">Default card</div>
<div className="card-lg">Large card with padding</div>
<div className="card-sm">Small card</div>
<div className="card-bordered">Card with border</div>
<div className="card-hover">Hover effect</div>
```

### Forms
```jsx
<input type="text" className="input-base" />
<select className="input-base">
  <option>Option 1</option>
</select>

<label className="label">Label Text</label>
<div className="form-group">
  <input type="email" className="input-base" />
</div>
```

### Layout
```jsx
<div className="container">Full width container</div>
<div className="section">Section with padding</div>
<div className="grid-responsive">Auto responsive grid</div>

<div className="flex-center">Centered flex</div>
<div className="flex-between">Spaced flex</div>
```

### Badges
```jsx
<span className="badge badge-primary">Primary</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-warning">Warning</span>
<span className="badge badge-danger">Danger</span>
```

### Text
```jsx
<p>Body text - default</p>
<small>Small text</small>

<span className="text-truncate">Text that truncates...</span>
<span className="text-clamp-2">Text clamped to 2 lines...</span>
<span className="text-clamp-3">Text clamped to 3 lines...</span>
```

### Responsive
```jsx
<div className="hidden-mobile">Show only on desktop</div>
<div className="hidden-desktop">Show only on mobile</div>
<div className="text-responsive">Size adjust based on screen</div>
```

---

## 🎯 Typography Classes

### Headings
```css
h1 - @apply text-4xl md:text-5xl font-extrabold;
h2 - @apply text-3xl md:text-4xl font-bold;
h3 - @apply text-2xl md:text-3xl font-bold;
h4 - @apply text-xl md:text-2xl font-semibold;
h5 - @apply text-lg md:text-xl font-semibold;
h6 - @apply text-base md:text-lg font-semibold;
```

### Text
```css
p    - @apply text-gray-700 leading-relaxed;
small - @apply text-sm text-gray-600;
```

---

## 🎨 Fonts

- **Inter**: Cho body text, labels, captions
- **Poppins**: Cho headings, titles

```html
<h1 style="font-family: Poppins">Tiêu đề</h1>
<p style="font-family: Inter">Nội dung</p>
```

---

## 📐 Spacing

```
xs  = 4px
sm  = 8px
md  = 16px
lg  = 24px
xl  = 32px
2xl = 40px
3xl = 48px
4xl = 64px
```

---

## 🌈 Colors

### Primary Colors
```
primary-600: #0284c7 (Main blue)
primary-700: #0369a1 (Hover)
primary-800: #075985 (Active)
```

### Status Colors
```
success: #10b981 (Green)
warning: #f59e0b (Yellow)
danger:  #ef4444 (Red)
info:    #3b82f6 (Blue)
```

### Grayscale
```
gray-900: #111827 (Darkest)
gray-700: #374151 (Dark)
gray-500: #6b7280 (Medium)
gray-300: #d1d5db (Light)
gray-100: #f3f4f6 (Very light)
gray-50:  #f9fafb (Lightest)
```

---

## ✨ Examples - Real Usage

### Product Card
```jsx
<Card variant="hover" onClick={() => navigate(`/product/${id}`)}>
  <div className="h-48 bg-gray-200 rounded-lg mb-4">
    <img src={image} className="w-full h-full object-cover" />
  </div>
  
  <Badge variant="primary" className="mb-2">iPhone</Badge>
  
  <h3 className="text-lg font-bold mb-2">{name}</h3>
  <Text variant="caption">{description}</Text>
  
  <div className="flex-between mt-4">
    <div>
      <p className="text-2xl font-bold text-blue-600">${price}</p>
    </div>
    <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
  </div>
  
  <Button className="w-full mt-4">Thêm Vào Giỏ</Button>
</Card>
```

### Form Example
```jsx
<Card className="max-w-md">
  <Heading level={3} className="mb-6">Đăng Ký</Heading>
  
  <Input 
    label="Họ Tên" 
    placeholder="John Doe"
    required 
  />
  
  <Input 
    label="Email" 
    type="email"
    placeholder="john@example.com"
    required 
  />
  
  <Input 
    label="Mật Khẩu" 
    type="password"
    placeholder="••••••••"
    required 
  />
  
  <Button className="w-full mt-6">Đăng Ký</Button>
</Card>
```

---

## 🚀 Best Practices

1. **Dùng Components thay vì CSS trực tiếp**
   ```jsx
   // ✅ Good
   <Button variant="primary">Thêm</Button>
   
   // ❌ Bad
   <button className="bg-blue-600 text-white...">Thêm</button>
   ```

2. **Responsive từ design**
   ```jsx
   // ✅ Good - auto responsive
   <Grid columns="grid-responsive">
     {products.map(p => <Card>{p.name}</Card>)}
   </Grid>
   
   // ❌ Bad - fixed width
   <div className="flex">
   ```

3. **Dùng Spacing Classes**
   ```jsx
   // ✅ Good
   <div className="mb-4 md:mb-6">
   
   // ❌ Bad
   <div style={{ marginBottom: '16px' }}>
   ```

4. **Typography Hierarchy**
   ```jsx
   // ✅ Good structure
   <Section title="Section Title">
     <Heading level={3}>Subsection</Heading>
     <Text variant="body">Content here</Text>
   </Section>
   ```

---

## 📱 Responsive Breakpoints

```
xs:  0px
sm:  640px   - Mobile
md:  768px   - Tablet  
lg:  1024px  - Desktop
xl:  1280px  - Large Desktop
2xl: 1536px  - Ultra Wide
```

---

Bây giờ bạn có một **professional design system** sẵn dùng cho toàn bộ ứng dụng! 🎉
