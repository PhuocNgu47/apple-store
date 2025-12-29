# Hướng Dẫn Đóng Góp (Contributing Guide)

## 🎯 Quy Trình Làm Việc Team

### 1. **Branch Structure**
```
main (production-ready code)
  └── develop (integration branch)
      ├── feature/user-auth
      ├── feature/products
      ├── feature/orders
      └── feature/checkout
```

### 2. **Quy Tắc Đặt Tên Branch**
```
feature/description    → Tính năng mới
bugfix/description     → Sửa bug
hotfix/description     → Fix gấp trên main
refactor/description   → Tái cấu trúc code
docs/description       → Thay đổi documentation
```

**Ví dụ:**
- `feature/user-authentication`
- `bugfix/cart-calculation-error`
- `refactor/product-model`

### 3. **Workflow Hàng Ngày**

#### **Bước 1: Cấu hình lần đầu**
```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
```

#### **Bước 2: Lấy code mới nhất**
```bash
git checkout develop
git pull origin develop
```

#### **Bước 3: Tạo branch feature riêng**
```bash
git checkout -b feature/your-feature-name
```

#### **Bước 4: Code và Commit**
```bash
# Commit thường xuyên (mỗi feature nhỏ)
git add .
git commit -m "feat: add user login functionality"

# Hoặc specific files
git add src/pages/Login.jsx
git commit -m "feat: create login form component"
```

#### **Bước 5: Push và tạo Pull Request**
```bash
git push origin feature/your-feature-name
```

Sau đó tạo **Pull Request** trên GitHub để team review

#### **Bước 6: Merge sau khi approved**
```bash
# Trên GitHub, click "Merge pull request"
# Hoặc locally:
git checkout develop
git pull origin develop
git merge feature/your-feature-name
git push origin develop
```

---

## 📝 Commit Message Convention

Tuân theo **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat`: Tính năng mới
- `fix`: Sửa bug
- `docs`: Thay đổi documentation
- `style`: Thay đổi formatting (không ảnh hưởng logic)
- `refactor`: Tối ưu code (không thêm feature, không sửa bug)
- `perf`: Cải thiện performance
- `test`: Thêm tests

### Ví dụ:
```
feat(auth): add JWT token validation

- Validate token on every request
- Add token refresh mechanism
- Handle expired tokens gracefully

Closes #123
```

---

## 🔍 Pre-commit Checklist

Trước khi commit, đảm bảo:
- ✅ Code hoạt động đúng
- ✅ Không có `console.log()` dư thừa
- ✅ Không commit `.env` hoặc secret keys
- ✅ Format code đúng (ESLint, Prettier)
- ✅ Commit message rõ ràng

---

## 🚀 Release Flow

### Từ `develop` → `main`
```bash
# 1. Chuyển sang main
git checkout main
git pull origin main

# 2. Merge develop
git merge develop --no-ff

# 3. Tag version
git tag -a v1.0.0 -m "Release version 1.0.0"

# 4. Push
git push origin main
git push origin --tags
```

---

## ⚠️ Quy Tắc Quan Trọng

1. **KHÔNG BƯỚC LÀM:**
   - ❌ Push trực tiếp lên `main` hoặc `develop`
   - ❌ Force push (`git push -f`) trên shared branches
   - ❌ Commit `.env`, passwords, API keys
   - ❌ Merge mà không review

2. **PHẢI LÀM:**
   - ✅ Luôn pull trước khi code
   - ✅ Tạo branch riêng cho feature
   - ✅ Review code trước merge
   - ✅ Commit message rõ ràng
   - ✅ Keep branches updated với develop

---

## 🐛 Xử Lý Conflicts

```bash
# 1. Pull develop mới nhất
git checkout develop
git pull origin develop

# 2. Rebase branch feature
git checkout feature/your-feature
git rebase develop

# 3. Resolve conflicts trong editor
# 4. Commit resolved conflicts
git add .
git rebase --continue

# 5. Push lên
git push origin feature/your-feature --force-with-lease
```

---

## 📊 Useful Git Commands

```bash
# Xem branch hiện tại
git branch -a

# Xem history
git log --oneline --graph --all

# Xem thay đổi chưa commit
git status
git diff

# Undo commit (giữ changes)
git reset --soft HEAD~1

# Undo commit (xóa changes)
git reset --hard HEAD~1

# Stash thay đổi tạm thời
git stash
git stash pop

# Xem ai sửa dòng nào
git blame <file>
```

---

## 👥 Team Members
- Person 1: Frontend Lead
- Person 2: Backend Lead
- Person 3: Full Stack
- Person 4: QA/DevOps

**Contact:** [Slack channel hoặc email]

---

_Last updated: December 2025_
