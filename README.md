# GeGe Team Home

Trang chính của GeGe Team (Nhà Cáo): giới thiệu thương hiệu, danh mục game xếp theo chữ cái, tin tức và các kênh liên hệ. Trang tĩnh, không cần cài đặt.

Chạy thử: `python3 -m http.server 8090` rồi mở `http://localhost:8090`.

## Sửa nội dung

Mọi dữ liệu nằm trong `js/data.js`:

- Gắn website cho game: điền `url` của game đó. Thẻ game sẽ đổi từ "Sắp ra mắt" sang mở website trong tab mới.
- Thêm game: thêm một mục vào `games`. Thứ tự A–Z và bộ lọc thể loại được tạo tự động.
- Đăng tin: thêm một mục vào `news`. Tin mới nhất tự lên đầu.
- Đổi kênh liên hệ: sửa `community`. Để `url` là `null` thì kênh hiện ở trạng thái chưa mở.

## Tin tức tự động

GitHub Actions (`.github/workflows/update-news.yml`) chạy `scripts/update_news.py` 3 tiếng một lần, lấy tin mới của POE 1, AION 2 (thông báo chính thức trên Steam) và WoW Forever (trang tin Blizzard), ghi vào `js/news-auto.js` và ảnh vào `assets/news/auto/`, rồi tự commit. Blox Fruits chưa có nguồn tin nên vẫn đăng tay.

- Tin tự động để tiếng Anh cho mọi ngôn ngữ. Muốn dịch: chép tin đó vào mục `news` trong `js/data.js` và thêm `en`/`tr` như các tin khác. Tin đăng tay mới hơn hoặc cùng ngày sẽ che tin tự động của game đó.
- Bỏ bớt tin vặt (bảo trì, hotfix, bán hàng, Twitch drops...): sửa danh sách `NOISE` trong script.
- Chạy ngay: tab Actions → Update news → Run workflow. Chạy trên máy: `pip install pillow && python3 scripts/update_news.py`.
