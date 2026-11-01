# GeGe Team Home

Trang chính của GeGe Team (Nhà Cáo): giới thiệu thương hiệu, danh mục game xếp theo chữ cái, tin tức và các kênh liên hệ. Trang tĩnh, không cần cài đặt.

Chạy thử: `python3 -m http.server 8090` rồi mở `http://localhost:8090`.

## Sửa nội dung

Mọi dữ liệu nằm trong `js/data.js`:

- Gắn website cho game: điền `url` của game đó. Thẻ game sẽ đổi từ "Sắp ra mắt" sang mở website trong tab mới.
- Thêm game: thêm một mục vào `games`. Thứ tự A–Z và bộ lọc thể loại được tạo tự động.
- Đăng tin: thêm một mục vào `news`. Tin mới nhất tự lên đầu.
- Đổi kênh liên hệ: sửa `community`. Để `url` là `null` thì kênh hiện ở trạng thái chưa mở.
