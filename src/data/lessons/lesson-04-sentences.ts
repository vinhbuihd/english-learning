import type { Lesson } from './types'

export const lesson04: Lesson = {
  id: 'lesson-04',
  slug: 'basic-sentences-git',
  title: 'Basic Sentences & Git Commands',
  titleVi: 'Câu đơn giản và lệnh Git',
  description: 'Học cấu trúc câu cơ bản, viết commit messages, và đọc lệnh Git bằng tiếng Anh',
  phase: 1,
  week: 2,
  order: 1,
  objectives: [
    'Hiểu cấu trúc câu tiếng Anh: Subject + Verb + Object',
    'Viết commit messages đúng chuẩn',
    'Đọc và hiểu các lệnh Git phổ biến',
  ],
  estimatedMinutes: 35,
  prevLessonId: 'lesson-03',
  nextLessonId: 'lesson-05',
  sections: [
    {
      id: 'sentences-svo',
      title: 'Cấu trúc câu cơ bản: S + V + O',
      titleEn: 'Basic Sentence Structure',
      type: 'content',
      content: `## Subject + Verb + Object

Tiếng Anh có cấu trúc cơ bản: **Ai + Làm gì + Cái gì**

### Ví dụ với code:

| Subject (Ai) | Verb (Làm gì) | Object (Cái gì) | Nghĩa |
|--------------|---------------|-----------------|-------|
| I | create | a component | Tôi tạo một component |
| We | fix | the bug | Chúng ta sửa bug |
| She | writes | clean code | Cô ấy viết code sạch |
| The function | returns | a value | Hàm trả về một giá trị |
| This button | opens | the modal | Nút này mở modal |

### Thì hiện tại đơn giản (Present Simple)

Dùng khi mô tả code hoặc nói về thói quen:

- **I write** code every day. — Tôi viết code mỗi ngày.
- **The app uses** React. — App dùng React.
- **We deploy** on Friday. — Chúng ta deploy vào thứ Sáu.

💡 **Quy tắc**: Với he/she/it, thêm **-s**: He write**s**, She fix**es**, It return**s**`,
    },
    {
      id: 'sentences-commits',
      title: 'Viết Commit Messages',
      titleEn: 'Writing Commit Messages',
      type: 'content',
      content: `## Quy ước commit message

Commit message tốt = **Verb + What** (Động từ + Cái gì)

### Các verb phổ biến trong commit:

| Verb | Nghĩa | Ví dụ commit |
|------|-------|-------------|
| **Add** | Thêm | Add login page |
| **Fix** | Sửa | Fix navbar alignment |
| **Update** | Cập nhật | Update README |
| **Remove** | Xóa | Remove unused imports |
| **Create** | Tạo | Create user model |
| **Change** | Thay đổi | Change button color |
| **Move** | Di chuyển | Move utils to lib/ |
| **Refactor** | Tái cấu trúc | Refactor auth logic |

### Quy tắc viết:

1. **Bắt đầu bằng động từ** (imperative mood): "Add", không phải "Added" hay "Adding"
2. **Viết hoa chữ đầu**: "Fix bug" không phải "fix bug"
3. **Ngắn gọn**: Dưới 50 ký tự
4. **Không dấu chấm cuối**: "Add feature" không phải "Add feature."

### Ví dụ tốt vs xấu:

✅ **Tốt:**
- "Add user authentication"
- "Fix broken link on homepage"
- "Update dependencies to latest version"

❌ **Xấu:**
- "fixed stuff" (quá chung chung)
- "asdfghj" (vô nghĩa)
- "Changes" (không rõ thay đổi gì)`,
    },
    {
      id: 'sentences-vocab',
      title: 'Từ vựng hành động',
      titleEn: 'Action Verbs',
      type: 'vocabulary',
      vocabularyIds: [
        'common-create', 'common-delete', 'common-update', 'common-add',
        'common-remove', 'common-fix', 'common-change', 'common-move',
        'common-write', 'common-read', 'common-open', 'common-close',
        'common-save', 'common-run', 'common-build',
      ],
    },
    {
      id: 'sentences-git',
      title: 'Đọc lệnh Git bằng tiếng Anh',
      titleEn: 'Reading Git Commands',
      type: 'content',
      content: `## Lệnh Git và cách đọc

| Lệnh | Đọc | Nghĩa |
|------|-----|-------|
| git init | "git init" | Khởi tạo repo |
| git add . | "git add all" | Thêm tất cả thay đổi |
| git commit -m "msg" | "git commit with message" | Xác nhận thay đổi |
| git push origin main | "git push to origin main" | Đẩy code lên nhánh main |
| git pull | "git pull" | Kéo code mới về |
| git checkout -b feature | "git checkout new branch feature" | Tạo và chuyển sang nhánh mới |
| git merge feature | "git merge feature" | Gộp nhánh feature |
| git stash | "git stash" | Cất thay đổi tạm |
| git log | "git log" | Xem lịch sử commit |
| git diff | "git diff" | Xem sự khác biệt |

💡 **Mẹo**: Đọc lệnh Git = đọc từng từ tiếng Anh. Git commands dùng các từ rất trực quan!`,
    },
    {
      id: 'sentences-exercises',
      title: 'Bài tập thực hành',
      titleEn: 'Exercises',
      type: 'exercises',
      exercises: [
        {
          id: 'lesson-04-ex-01',
          type: 'matching',
          question: 'Nối động từ với nghĩa tiếng Việt:',
          pairs: [
            { left: 'create', right: 'tạo' },
            { left: 'delete', right: 'xóa' },
            { left: 'update', right: 'cập nhật' },
            { left: 'fix', right: 'sửa' },
            { left: 'remove', right: 'loại bỏ' },
          ],
        },
        {
          id: 'lesson-04-ex-02',
          type: 'multiple-choice',
          question: 'Commit message nào viết đúng chuẩn?',
          options: [
            { text: 'Add user login feature', isCorrect: true },
            { text: 'added stuff', isCorrect: false },
            { text: 'I fixed the bug', isCorrect: false },
            { text: 'changes.', isCorrect: false },
          ],
        },
        {
          id: 'lesson-04-ex-03',
          type: 'fill-blank',
          question: 'Viết commit message: "___ broken link on homepage" (sửa)',
          correctAnswer: 'Fix',
          hint: 'Động từ nghĩa là "sửa"',
        },
        {
          id: 'lesson-04-ex-04',
          type: 'multiple-choice',
          question: 'Câu nào đúng cấu trúc S + V + O?',
          options: [
            { text: 'The function returns a value', isCorrect: true },
            { text: 'Returns value the function', isCorrect: false },
            { text: 'A value the function returns', isCorrect: false },
            { text: 'Value returns function', isCorrect: false },
          ],
        },
        {
          id: 'lesson-04-ex-05',
          type: 'spelling',
          question: 'Hãy đánh vần từ: delete',
          correctAnswer: 'delete',
        },
        {
          id: 'lesson-04-ex-06',
          type: 'fill-blank',
          question: 'Viết commit message: "___ unused CSS styles" (loại bỏ)',
          correctAnswer: 'Remove',
          hint: 'Động từ nghĩa là "loại bỏ"',
        },
        {
          id: 'lesson-04-ex-07',
          type: 'matching',
          question: 'Nối lệnh Git với nghĩa:',
          pairs: [
            { left: 'git push', right: 'Đẩy code lên' },
            { left: 'git pull', right: 'Kéo code về' },
            { left: 'git commit', right: 'Xác nhận thay đổi' },
            { left: 'git merge', right: 'Gộp nhánh' },
          ],
        },
        {
          id: 'lesson-04-ex-08',
          type: 'multiple-choice',
          question: 'Với "he/she/it", động từ "write" biến thành gì?',
          options: [
            { text: 'writes', isCorrect: true },
            { text: 'writed', isCorrect: false },
            { text: 'writing', isCorrect: false },
            { text: 'write', isCorrect: false },
          ],
        },
      ],
    },
  ],
}
