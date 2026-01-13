# 🔧 Sửa Lỗi Encoding Commit Messages Tiếng Việt

## Vấn Đề

Các commit messages có tiếng Việt bị hiển thị sai encoding trên GitHub:
- "Xóa" → "XÃ³a"
- "cập nhật" → "cáº­p nháº­t"
- "Thêm" → "ThÃªm"

## Nguyên Nhân

PowerShell trên Windows sử dụng encoding khác với Git, dẫn đến commit messages bị lỗi encoding.

## Giải Pháp

### Cách 1: Cấu Hình Git (Đã áp dụng)

```bash
git config --global core.quotepath false
git config --global i18n.commitencoding utf-8
git config --global i18n.logoutputencoding utf-8
```

### Cách 2: Sửa Commit Messages Cũ (Nếu cần)

Nếu muốn sửa các commit messages đã push, có thể dùng `git rebase`:

```bash
# Interactive rebase để sửa 12 commits gần nhất
git rebase -i HEAD~12

# Trong editor, đổi "pick" thành "reword" cho các commit muốn sửa
# Sau đó sửa commit message với encoding đúng
```

**Lưu ý:** Chỉ làm điều này nếu chưa có người khác pull code về.

### Cách 3: Commit Messages Tiếng Anh (Khuyên dùng)

Để tránh vấn đề encoding, nên dùng tiếng Anh cho commit messages:

**Thay vì:**
```
chore: Xóa file seedFromAPI.js không còn sử dụng
```

**Nên dùng:**
```
chore: Remove unused seedFromAPI.js file
```

## Commit Message Convention

Sử dụng format chuẩn:
```
<type>: <subject>

<body>
```

**Types:**
- `feat`: Tính năng mới
- `fix`: Sửa lỗi
- `docs`: Tài liệu
- `style`: Format code
- `refactor`: Refactor code
- `test`: Tests
- `chore`: Công việc bảo trì

**Ví dụ:**
```
feat: Add Address and Coupon management

- Add Address model and routes
- Add Coupon model and routes  
- Add Statistics routes for admin dashboard
```

## Kết Luận

Các commit messages hiện tại vẫn hoạt động bình thường, chỉ là hiển thị trên terminal bị lỗi encoding. Trên GitHub web interface có thể hiển thị đúng hơn.

Để tránh vấn đề này trong tương lai:
1. ✅ Đã cấu hình Git encoding
2. 💡 Nên dùng tiếng Anh cho commit messages
3. 💡 Hoặc dùng Git Desktop/GUI để commit (tự động xử lý encoding)

