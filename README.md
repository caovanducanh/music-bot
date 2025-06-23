# Discord Music Bot

## Deploy lên Vercel

1. **Cấu hình biến môi trường**
   - Truy cập dashboard Vercel, vào mục Project Settings > Environment Variables.
   - Thêm biến `TOKEN` với giá trị là Discord Bot Token của bạn.

2. **Cấu trúc project**
   - Source code bot nằm trong thư mục `discord-music-bot`.
   - File chính: `index.js`.

3. **Cấu hình package.json**
   - Đã có sẵn script `start` và trường `main`.

4. **Triển khai**
   - Kéo thả hoặc kết nối repo với Vercel.
   - Đảm bảo chọn thư mục `discord-music-bot` làm root project khi deploy.

5. **Lưu ý**
   - Không commit file chứa token lên repo.
   - Bot sẽ tự động lấy token từ biến môi trường khi chạy trên Vercel. 