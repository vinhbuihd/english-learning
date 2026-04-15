import type { Lesson } from './types'

export const lesson10: Lesson = {
  id: 'lesson-10',
  slug: 'bugs-and-solutions',
  title: 'Discussing Bugs & Solutions',
  titleVi: 'Trao đổi về bug và hướng xử lý',
  description: 'Luyện cách mô tả bug, nêu nguyên nhân có thể có và đề xuất cách xử lý trong thảo luận kỹ thuật.',
  phase: 3,
  week: 6,
  order: 1,
  objectives: [
    'Mô tả bug bằng tiếng Anh ngắn gọn và đúng ý',
    'Nêu giả thuyết về nguyên nhân lỗi',
    'Đề xuất hướng xử lý trong thảo luận kỹ thuật',
  ],
  estimatedMinutes: 40,
  prevLessonId: 'lesson-09',
  sections: [
    {
      id: 'bugs-describing',
      title: 'Mô tả bug rõ ràng',
      titleEn: 'Describing Bugs Clearly',
      type: 'content',
      content: `## Công thức đơn giản

**Problem + Context + Result**

| Part | Ví dụ |
|------|-------|
| Problem | The page does not render |
| Context | after the user logs in |
| Result | and the screen stays blank |

### Ví dụ hoàn chỉnh

- **The settings page does not render after login.**
- **The modal closes unexpectedly on mobile.**
- **The app crashes when the input is empty.**

💡 **Mẹo**: Bắt đầu bằng triệu chứng nhìn thấy được. Sau đó mới nói đến nguyên nhân nếu bạn có giả thuyết.`,
    },
    {
      id: 'bugs-solutions',
      title: 'Nêu nguyên nhân và đề xuất cách xử lý',
      titleEn: 'Causes and Solutions',
      type: 'content',
      content: `## Mẫu câu khi phân tích lỗi

| English | Nghĩa |
|---------|-------|
| It may be caused by... | Có thể do... |
| I suspect the issue is in... | Tôi nghi vấn đề nằm ở... |
| We should add a fallback | Chúng ta nên thêm giá trị dự phòng |
| We can reproduce it consistently | Ta có thể tái hiện lỗi ổn định |
| A quick fix is to... | Cách sửa nhanh là... |

## Ví dụ thảo luận

> I suspect the issue is in the state update logic.
> A quick fix is to check for null before rendering.
> We should also add a test for this scenario.

💡 **Mẹo**: Dùng **may**, **might**, **suspect** khi chưa chắc chắn. Điều đó giúp câu nói chính xác và chuyên nghiệp hơn.`,
    },
    {
      id: 'bugs-vocab',
      title: 'Từ vựng cho bug discussion',
      titleEn: 'Bug Discussion Vocabulary',
      type: 'vocabulary',
      vocabularyIds: [
        'common-fix', 'common-change', 'common-follow', 'common-run',
        'common-build', 'common-warning', 'common-example', 'common-default',
        'js-null', 'js-undefined', 'js-event', 'react-state',
        'react-render', 'html-input', 'css-display',
      ],
    },
    {
      id: 'bugs-exercises',
      title: 'Bài tập thực hành',
      titleEn: 'Exercises',
      type: 'exercises',
      exercises: [
        {
          id: 'lesson-10-ex-01',
          type: 'matching',
          question: 'Nối cụm tiếng Anh với nghĩa tiếng Việt:',
          pairs: [
            { left: 'I suspect the issue is in...', right: 'Tôi nghi vấn đề nằm ở...' },
            { left: 'A quick fix is to...', right: 'Cách sửa nhanh là...' },
            { left: 'We can reproduce it consistently', right: 'Ta có thể tái hiện lỗi ổn định' },
            { left: 'It may be caused by...', right: 'Có thể do...' },
          ],
        },
        {
          id: 'lesson-10-ex-02',
          type: 'multiple-choice',
          question: 'Câu nào mô tả bug rõ ràng nhất?',
          options: [
            { text: 'The app crashes when the input is empty.', isCorrect: true },
            { text: 'The app is bad.', isCorrect: false },
            { text: 'There is maybe something.', isCorrect: false },
            { text: 'Input app problem maybe render.', isCorrect: false },
          ],
        },
        {
          id: 'lesson-10-ex-03',
          type: 'fill-blank',
          question: '"We should add a ___ value."',
          correctAnswer: 'fallback',
          hint: 'Giá trị dự phòng để tránh lỗi',
        },
        {
          id: 'lesson-10-ex-04',
          type: 'spelling',
          question: 'Hãy đánh vần từ: solution',
          correctAnswer: 'solution',
        },
        {
          id: 'lesson-10-ex-05',
          type: 'multiple-choice',
          question: 'Khi chưa chắc nguyên nhân, cách nói nào phù hợp nhất?',
          options: [
            { text: 'It may be caused by a state update issue.', isCorrect: true },
            { text: 'This is 100 percent the backend.', isCorrect: false },
            { text: 'No idea but fix it.', isCorrect: false },
            { text: 'It is caused by everything.', isCorrect: false },
          ],
        },
      ],
    },
  ],
}
