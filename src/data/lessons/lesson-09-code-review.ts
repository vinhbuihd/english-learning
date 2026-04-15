import type { Lesson } from './types'

export const lesson09: Lesson = {
  id: 'lesson-09',
  slug: 'code-review-communication',
  title: 'Code Review Communication',
  titleVi: 'Giao tiếp khi review code',
  description: 'Học cách phản hồi comment review, giải thích quyết định kỹ thuật và đề xuất thay đổi lịch sự.',
  phase: 3,
  week: 5,
  order: 1,
  objectives: [
    'Hiểu các câu review code phổ biến',
    'Biết cách trả lời comment review lịch sự',
    'Giải thích lý do thay đổi bằng tiếng Anh đơn giản',
  ],
  estimatedMinutes: 40,
  prevLessonId: 'lesson-08',
  nextLessonId: 'lesson-10',
  sections: [
    {
      id: 'review-comments',
      title: 'Các comment review phổ biến',
      titleEn: 'Common Review Comments',
      type: 'content',
      content: `## Những câu bạn sẽ gặp thường xuyên

| English | Nghĩa |
|---------|-------|
| Could you simplify this logic? | Bạn có thể đơn giản hóa logic này không? |
| Please add a test for this case. | Hãy thêm test cho trường hợp này. |
| I think this can be renamed. | Tôi nghĩ chỗ này có thể đổi tên. |
| This looks good to me. | Phần này ổn với tôi. |
| Can we handle the edge case? | Ta có thể xử lý trường hợp biên không? |

## Cách trả lời lịch sự

- **Sure, I will update it.**
- **Good point. I will add a test.**
- **I renamed the variable for clarity.**
- **I kept this approach because it is simpler.**

💡 **Mẹo**: Trong review, tone quan trọng. Dùng **I think**, **could you**, **good point** sẽ mềm và chuyên nghiệp hơn.`,
    },
    {
      id: 'review-explaining',
      title: 'Giải thích quyết định kỹ thuật',
      titleEn: 'Explaining Technical Decisions',
      type: 'content',
      content: `## Mẫu câu giải thích ngắn

| English | Khi dùng |
|---------|---------|
| I chose this approach because... | Giải thích lựa chọn |
| This keeps the component simpler | Nêu lợi ích |
| This avoids duplicate logic | Nêu lý do tránh lặp |
| I updated the naming for clarity | Giải thích đổi tên |
| I added a fallback value | Giải thích xử lý an toàn |

## Ví dụ

> I chose this approach because it is easier to read.
> I added a fallback value to avoid a crash.
> I extracted the function to reduce duplication.

💡 **Mẹo**: Không cần giải thích quá học thuật. Reviewer chỉ cần hiểu quyết định của bạn có chủ đích.`,
    },
    {
      id: 'review-vocab',
      title: 'Từ vựng review code',
      titleEn: 'Code Review Vocabulary',
      type: 'vocabulary',
      vocabularyIds: [
        'common-fix', 'common-change', 'common-update', 'common-remove',
        'common-add', 'common-example', 'common-warning', 'common-note',
        'common-read', 'common-write', 'js-function', 'js-condition',
        'react-component', 'react-state', 'react-render',
      ],
    },
    {
      id: 'review-exercises',
      title: 'Bài tập thực hành',
      titleEn: 'Exercises',
      type: 'exercises',
      exercises: [
        {
          id: 'lesson-09-ex-01',
          type: 'matching',
          question: 'Nối comment review với nghĩa tiếng Việt:',
          pairs: [
            { left: 'Please add a test for this case.', right: 'Hãy thêm test cho trường hợp này.' },
            { left: 'This looks good to me.', right: 'Phần này ổn với tôi.' },
            { left: 'Could you simplify this logic?', right: 'Bạn có thể đơn giản hóa logic này không?' },
            { left: 'Can we handle the edge case?', right: 'Ta có thể xử lý trường hợp biên không?' },
          ],
        },
        {
          id: 'lesson-09-ex-02',
          type: 'multiple-choice',
          question: 'Câu trả lời nào lịch sự và tự nhiên nhất?',
          options: [
            { text: 'Good point. I will update it.', isCorrect: true },
            { text: 'You are wrong.', isCorrect: false },
            { text: 'No update.', isCorrect: false },
            { text: 'Why comment this.', isCorrect: false },
          ],
        },
        {
          id: 'lesson-09-ex-03',
          type: 'fill-blank',
          question: '"I chose this approach ___ it is easier to read."',
          correctAnswer: 'because',
          hint: 'Từ nối chỉ lý do',
        },
        {
          id: 'lesson-09-ex-04',
          type: 'spelling',
          question: 'Hãy đánh vần từ: clarity',
          correctAnswer: 'clarity',
        },
        {
          id: 'lesson-09-ex-05',
          type: 'multiple-choice',
          question: 'Câu nào giải thích quyết định kỹ thuật rõ ràng hơn?',
          options: [
            { text: 'I extracted the function to reduce duplication.', isCorrect: true },
            { text: 'This is better.', isCorrect: false },
            { text: 'I changed it because yes.', isCorrect: false },
            { text: 'Function maybe okay.', isCorrect: false },
          ],
        },
      ],
    },
  ],
}
