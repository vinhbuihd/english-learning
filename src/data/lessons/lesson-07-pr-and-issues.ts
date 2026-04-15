import type { Lesson } from './types'

export const lesson07: Lesson = {
  id: 'lesson-07',
  slug: 'pull-requests-and-issues',
  title: 'Pull Requests & Issue Writing',
  titleVi: 'Viết mô tả Pull Request và Issue',
  description: 'Học cách mô tả thay đổi, nêu nguyên nhân lỗi và viết phần kiểm thử ngắn gọn bằng tiếng Anh.',
  phase: 2,
  week: 3,
  order: 2,
  objectives: [
    'Viết mô tả PR ngắn và rõ ràng',
    'Mô tả bug bằng nguyên nhân và kết quả',
    'Dùng các từ quen thuộc trong issue tracker',
  ],
  estimatedMinutes: 40,
  prevLessonId: 'lesson-06',
  nextLessonId: 'lesson-08',
  sections: [
    {
      id: 'pr-structure',
      title: 'Cấu trúc một PR description',
      titleEn: 'PR Description Structure',
      type: 'content',
      content: `## PR description thường có gì?

| Section | Mục đích | Ví dụ |
|---------|---------|-------|
| Summary | Tóm tắt thay đổi | Add validation for signup form |
| Why | Vì sao cần đổi | The form allowed empty input |
| Testing | Đã test gì | Tested on desktop and mobile |

## Mẫu ngắn gọn

> Summary: Add loading state for submit button
> Why: Users could click the button multiple times
> Testing: Ran locally and checked the form flow

💡 **Mẹo**: Viết theo ý, không cần câu quá dài. Reviewer cần hiểu nhanh thay đổi chính.`,
    },
    {
      id: 'issue-writing',
      title: 'Viết bug report đơn giản',
      titleEn: 'Simple Bug Reports',
      type: 'content',
      content: `## 4 phần cơ bản của bug report

| Part | English |
|------|---------|
| Problem | The page crashes on submit |
| Steps | Open the form, click submit |
| Expected | The form should save the data |
| Actual | Nothing happens / the app crashes |

## Cụm từ thường dùng

- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Environment**
- **This happens only on mobile**
- **The issue is reproducible**

💡 **Mẹo**: Dùng động từ rõ ràng như **open**, **click**, **save**, **render**, **crash** để người khác tái hiện lỗi.`,
    },
    {
      id: 'pr-vocab',
      title: 'Từ vựng cho PR và issue',
      titleEn: 'PR & Issue Vocabulary',
      type: 'vocabulary',
      vocabularyIds: [
        'common-add', 'common-fix', 'common-update', 'common-change',
        'common-remove', 'common-run', 'common-build', 'common-example',
        'common-note', 'common-warning', 'git-commit', 'git-branch',
        'git-merge', 'git-repository',
      ],
    },
    {
      id: 'pr-exercises',
      title: 'Bài tập thực hành',
      titleEn: 'Exercises',
      type: 'exercises',
      exercises: [
        {
          id: 'lesson-07-ex-01',
          type: 'matching',
          question: 'Nối phần PR với mục đích:',
          pairs: [
            { left: 'Summary', right: 'Tóm tắt thay đổi' },
            { left: 'Why', right: 'Giải thích lý do' },
            { left: 'Testing', right: 'Đã kiểm thử gì' },
            { left: 'Steps to reproduce', right: 'Các bước tái hiện lỗi' },
          ],
        },
        {
          id: 'lesson-07-ex-02',
          type: 'multiple-choice',
          question: 'Câu nào phù hợp cho phần Testing?',
          options: [
            { text: 'Tested on Chrome and Safari.', isCorrect: true },
            { text: 'Because the button was broken.', isCorrect: false },
            { text: 'Add loading state.', isCorrect: false },
            { text: 'The summary is form.', isCorrect: false },
          ],
        },
        {
          id: 'lesson-07-ex-03',
          type: 'fill-blank',
          question: '"Expected ___" là cụm thường thấy trong bug report.',
          correctAnswer: 'behavior',
          hint: 'Hành vi mong đợi',
        },
        {
          id: 'lesson-07-ex-04',
          type: 'spelling',
          question: 'Hãy đánh vần từ: reproduce',
          correctAnswer: 'reproduce',
        },
        {
          id: 'lesson-07-ex-05',
          type: 'multiple-choice',
          question: 'Mô tả nào rõ ràng hơn cho bug report?',
          options: [
            { text: 'Click submit and the app crashes on mobile.', isCorrect: true },
            { text: 'Something is wrong.', isCorrect: false },
            { text: 'Bad app.', isCorrect: false },
            { text: 'Need check maybe.', isCorrect: false },
          ],
        },
      ],
    },
  ],
}
