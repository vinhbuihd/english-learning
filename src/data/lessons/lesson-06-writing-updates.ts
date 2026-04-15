import type { Lesson } from './types'

export const lesson06: Lesson = {
  id: 'lesson-06',
  slug: 'writing-daily-updates',
  title: 'Writing Daily Updates',
  titleVi: 'Viết cập nhật công việc hằng ngày',
  description: 'Học cách viết status update ngắn gọn bằng tiếng Anh cho standup, Slack và ticket.',
  phase: 2,
  week: 3,
  order: 1,
  objectives: [
    'Viết câu cập nhật tiến độ ngắn gọn bằng tiếng Anh',
    'Phân biệt việc đã làm, đang làm và sẽ làm',
    'Dùng các cụm từ tự nhiên trong standup và Slack',
  ],
  estimatedMinutes: 35,
  prevLessonId: 'lesson-05',
  nextLessonId: 'lesson-07',
  sections: [
    {
      id: 'updates-structure',
      title: 'Cấu trúc cập nhật công việc',
      titleEn: 'Update Structure',
      type: 'content',
      content: `## 3 phần quen thuộc trong daily update

Một cập nhật ngắn thường có 3 ý:

| Part | English | Ví dụ |
|------|---------|-------|
| Yesterday | What I finished | I fixed the login bug. |
| Today | What I am doing | I am working on the dashboard. |
| Blocker | What is blocked | I am waiting for API access. |

## Mẫu câu đơn giản

- **Yesterday, I fixed two UI bugs.**
- **Today, I am updating the settings page.**
- **I am blocked by a backend issue.**
- **I need review on my PR.**

💡 **Mẹo**: Standup tốt không cần dài. Chỉ cần rõ: đã làm gì, đang làm gì, có bị chặn không.`,
    },
    {
      id: 'updates-useful-phrases',
      title: 'Cụm từ hữu ích',
      titleEn: 'Useful Phrases',
      type: 'content',
      content: `## Các cụm hay dùng trong team kỹ thuật

| English | Nghĩa |
|---------|-------|
| I finished the task | Tôi đã hoàn thành task |
| I am working on... | Tôi đang làm... |
| I am looking into it | Tôi đang xem xét nó |
| I need more time | Tôi cần thêm thời gian |
| I have a blocker | Tôi đang bị chặn |
| The issue is fixed | Vấn đề đã được sửa |
| The PR is ready | PR đã sẵn sàng |
| I will update the ticket | Tôi sẽ cập nhật ticket |

## Ví dụ thực tế

> Yesterday, I fixed the mobile navbar.
> Today, I am writing tests for the login form.
> I do not have any blockers.

💡 **Mẹo**: Khi nói về việc đang làm, dùng hiện tại tiếp diễn: **I am working**, **I am fixing**, **I am checking**.`,
    },
    {
      id: 'updates-vocab',
      title: 'Từ vựng cho status update',
      titleEn: 'Status Update Vocabulary',
      type: 'vocabulary',
      vocabularyIds: [
        'common-update', 'common-fix', 'common-change', 'common-write',
        'common-read', 'common-open', 'common-close', 'common-save',
        'common-run', 'common-build', 'common-today', 'common-tomorrow',
        'common-yesterday', 'common-week', 'greet-help',
      ],
    },
    {
      id: 'updates-exercises',
      title: 'Bài tập thực hành',
      titleEn: 'Exercises',
      type: 'exercises',
      exercises: [
        {
          id: 'lesson-06-ex-01',
          type: 'matching',
          question: 'Nối cụm tiếng Anh với nghĩa tiếng Việt:',
          pairs: [
            { left: 'I finished the task', right: 'Tôi đã hoàn thành task' },
            { left: 'I am working on it', right: 'Tôi đang làm nó' },
            { left: 'I have a blocker', right: 'Tôi đang bị chặn' },
            { left: 'I need more time', right: 'Tôi cần thêm thời gian' },
          ],
        },
        {
          id: 'lesson-06-ex-02',
          type: 'multiple-choice',
          question: 'Câu nào phù hợp cho phần Today trong standup?',
          options: [
            { text: 'Today, I am updating the profile page.', isCorrect: true },
            { text: 'Yesterday, I updated the profile page.', isCorrect: false },
            { text: 'Good morning, everyone!', isCorrect: false },
            { text: 'The bug was yesterday.', isCorrect: false },
          ],
        },
        {
          id: 'lesson-06-ex-03',
          type: 'fill-blank',
          question: 'Hoàn thành câu: "I am ___ on the dashboard."',
          correctAnswer: 'working',
          hint: 'Động từ đi với "on the dashboard"',
        },
        {
          id: 'lesson-06-ex-04',
          type: 'spelling',
          question: 'Hãy đánh vần từ: blocker',
          correctAnswer: 'blocker',
        },
        {
          id: 'lesson-06-ex-05',
          type: 'multiple-choice',
          question: 'Nếu không bị chặn, bạn nên nói gì?',
          options: [
            { text: 'I do not have any blockers.', isCorrect: true },
            { text: 'I blocker the task.', isCorrect: false },
            { text: 'I am bug blocker.', isCorrect: false },
            { text: 'No task today.', isCorrect: false },
          ],
        },
      ],
    },
  ],
}
