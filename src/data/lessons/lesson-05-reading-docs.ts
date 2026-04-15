import type { Lesson } from './types'

export const lesson05: Lesson = {
  id: 'lesson-05',
  slug: 'reading-documentation',
  title: 'Reading Simple Documentation',
  titleVi: 'Đọc hiểu tài liệu cơ bản',
  description: 'Học cách đọc README, documentation, và hiểu các từ vựng thường gặp trong tài liệu kỹ thuật',
  phase: 1,
  week: 2,
  order: 2,
  objectives: [
    'Đọc hiểu cấu trúc một file README',
    'Hiểu các từ vựng phổ biến trong documentation',
    'Làm theo hướng dẫn cài đặt bằng tiếng Anh',
  ],
  estimatedMinutes: 40,
  prevLessonId: 'lesson-04',
  nextLessonId: 'lesson-06',
  sections: [
    {
      id: 'docs-structure',
      title: 'Cấu trúc một file README',
      titleEn: 'README Structure',
      type: 'content',
      content: `## Các phần thường gặp trong README

Khi vào một repo trên GitHub, file README.md thường có các phần sau:

| Section | Nghĩa | Nội dung |
|---------|-------|---------|
| **Description** | Mô tả | Dự án này là gì, làm gì |
| **Installation** | Cài đặt | Các bước để cài đặt |
| **Usage** | Cách dùng | Cách sử dụng dự án |
| **Getting Started** | Bắt đầu | Hướng dẫn nhanh cho người mới |
| **Prerequisites** | Yêu cầu trước | Cần cài gì trước khi bắt đầu |
| **Configuration** | Cấu hình | Cách tùy chỉnh cài đặt |
| **Contributing** | Đóng góp | Cách contribute vào dự án |
| **License** | Giấy phép | Thông tin bản quyền |

💡 **Mẹo**: Không cần đọc toàn bộ README! Thường bạn chỉ cần đọc **Installation** và **Usage** là đủ để bắt đầu.`,
    },
    {
      id: 'docs-reading',
      title: 'Thực hành đọc documentation',
      titleEn: 'Reading Practice',
      type: 'content',
      content: `## Ví dụ: Đọc hướng dẫn cài đặt

Đây là đoạn README thường gặp:

> ### Getting Started
>
> **Prerequisites**
> - Node.js version 18 or higher
> - npm or yarn package manager
>
> **Installation**
> 1. Clone the repository
> 2. Install dependencies: \`npm install\`
> 3. Start the development server: \`npm run dev\`
> 4. Open your browser and navigate to \`http://localhost:3000\`
>
> **Note:** Make sure port 3000 is not already in use.

### Phân tích từng câu:

| English | Nghĩa |
|---------|-------|
| Clone the repository | Sao chép kho mã nguồn |
| Install dependencies | Cài đặt các thư viện phụ thuộc |
| Start the development server | Khởi chạy server phát triển |
| Open your browser | Mở trình duyệt |
| Navigate to | Điều hướng đến (truy cập) |
| Make sure | Đảm bảo rằng |
| Not already in use | Chưa được sử dụng |

💡 **Mẹo**: Khi đọc docs, tập trung vào **các động từ** (clone, install, start, open) — chúng cho bạn biết phải **làm gì**.`,
    },
    {
      id: 'docs-keywords',
      title: 'Từ khóa quan trọng trong docs',
      titleEn: 'Important Keywords',
      type: 'content',
      content: `## Từ chỉ mức độ quan trọng

| Từ khóa | Nghĩa | Mức độ |
|---------|-------|--------|
| **Required** | Bắt buộc | ⚠️ Phải có |
| **Optional** | Tùy chọn | 💡 Có thể bỏ qua |
| **Recommended** | Khuyến nghị | 👍 Nên làm |
| **Deprecated** | Đã lỗi thời | 🚫 Không nên dùng |
| **Note** | Ghi chú | 📝 Cần lưu ý |
| **Warning** | Cảnh báo | ⚠️ Cẩn thận |
| **Important** | Quan trọng | ❗ Phải đọc |
| **Example** | Ví dụ | 📌 Minh họa |

## Cụm từ thường gặp

| English | Nghĩa |
|---------|-------|
| See the docs for more details | Xem tài liệu để biết thêm chi tiết |
| Refer to the API reference | Tham khảo tài liệu API |
| For more information, visit... | Để biết thêm, truy cập... |
| This feature is experimental | Tính năng này đang thử nghiệm |
| Breaking change | Thay đổi không tương thích ngược |
| Minimum version required | Phiên bản tối thiểu cần thiết |`,
    },
    {
      id: 'docs-vocab',
      title: 'Từ vựng tài liệu',
      titleEn: 'Documentation Vocabulary',
      type: 'vocabulary',
      vocabularyIds: [
        'common-install', 'common-setup', 'common-configure', 'common-require',
        'common-follow', 'common-example', 'common-note', 'common-warning',
        'common-guide', 'common-usage', 'common-option', 'common-default',
        'common-version',
      ],
    },
    {
      id: 'docs-exercises',
      title: 'Bài tập thực hành',
      titleEn: 'Exercises',
      type: 'exercises',
      exercises: [
        {
          id: 'lesson-05-ex-01',
          type: 'matching',
          question: 'Nối từ tiếng Anh với nghĩa tiếng Việt:',
          pairs: [
            { left: 'install', right: 'cài đặt' },
            { left: 'configure', right: 'cấu hình' },
            { left: 'default', right: 'mặc định' },
            { left: 'required', right: 'bắt buộc' },
            { left: 'deprecated', right: 'đã lỗi thời' },
          ],
        },
        {
          id: 'lesson-05-ex-02',
          type: 'multiple-choice',
          question: 'Trong README, phần "Prerequisites" nghĩa là gì?',
          options: [
            { text: 'Yêu cầu cần có trước khi bắt đầu', isCorrect: true },
            { text: 'Cách sử dụng', isCorrect: false },
            { text: 'Giấy phép', isCorrect: false },
            { text: 'Cách đóng góp', isCorrect: false },
          ],
        },
        {
          id: 'lesson-05-ex-03',
          type: 'fill-blank',
          question: '"___ the repository" nghĩa là sao chép kho mã nguồn.',
          correctAnswer: 'Clone',
          hint: 'Lệnh Git để sao chép repo',
        },
        {
          id: 'lesson-05-ex-04',
          type: 'multiple-choice',
          question: 'Khi docs ghi "Optional", nghĩa là gì?',
          options: [
            { text: 'Tùy chọn, không bắt buộc', isCorrect: true },
            { text: 'Bắt buộc phải làm', isCorrect: false },
            { text: 'Đã lỗi thời', isCorrect: false },
            { text: 'Cảnh báo nguy hiểm', isCorrect: false },
          ],
        },
        {
          id: 'lesson-05-ex-05',
          type: 'spelling',
          question: 'Hãy đánh vần từ: configure',
          correctAnswer: 'configure',
        },
        {
          id: 'lesson-05-ex-06',
          type: 'fill-blank',
          question: '"___ dependencies" nghĩa là cài đặt các thư viện phụ thuộc.',
          correctAnswer: 'Install',
          hint: 'Lệnh npm phổ biến nhất',
        },
        {
          id: 'lesson-05-ex-07',
          type: 'matching',
          question: 'Nối phần README với nội dung:',
          pairs: [
            { left: 'Installation', right: 'Các bước cài đặt' },
            { left: 'Usage', right: 'Cách sử dụng' },
            { left: 'Contributing', right: 'Cách đóng góp' },
            { left: 'License', right: 'Thông tin bản quyền' },
          ],
        },
        {
          id: 'lesson-05-ex-08',
          type: 'multiple-choice',
          question: '"Breaking change" trong release notes nghĩa là gì?',
          options: [
            { text: 'Thay đổi không tương thích với phiên bản cũ', isCorrect: true },
            { text: 'Lỗi nghiêm trọng', isCorrect: false },
            { text: 'Tính năng mới', isCorrect: false },
            { text: 'Bản sửa lỗi nhỏ', isCorrect: false },
          ],
        },
      ],
    },
  ],
}
