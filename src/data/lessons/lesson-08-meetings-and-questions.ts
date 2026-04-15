import type { Lesson } from './types'

export const lesson08: Lesson = {
  id: 'lesson-08',
  slug: 'meetings-and-asking-questions',
  title: 'Meetings & Asking Questions',
  titleVi: 'Họp và đặt câu hỏi trong công việc',
  description: 'Luyện các mẫu câu dùng trong meeting: hỏi lại, xác nhận ý hiểu và xin làm rõ yêu cầu.',
  phase: 2,
  week: 4,
  order: 1,
  objectives: [
    'Đặt câu hỏi lịch sự trong cuộc họp',
    'Biết cách xin nhắc lại hoặc làm rõ yêu cầu',
    'Tự tin xác nhận việc cần làm sau meeting',
  ],
  estimatedMinutes: 35,
  prevLessonId: 'lesson-07',
  nextLessonId: 'lesson-09',
  sections: [
    {
      id: 'meeting-questions',
      title: 'Các câu hỏi hữu ích trong meeting',
      titleEn: 'Useful Meeting Questions',
      type: 'content',
      content: `## Khi bạn chưa hiểu rõ

| English | Nghĩa |
|---------|-------|
| Could you repeat that? | Bạn có thể nhắc lại không? |
| Could you explain it again? | Bạn có thể giải thích lại không? |
| What do you mean by that? | Ý bạn là gì? |
| Can you give an example? | Bạn có thể cho ví dụ không? |
| Just to confirm... | Để xác nhận lại... |

## Khi bạn muốn xác nhận việc cần làm

- **So my task is to update the API integration, right?**
- **I will handle the frontend part.**
- **I will send an update after the meeting.**

💡 **Mẹo**: Hỏi lại không phải là yếu. Trong môi trường quốc tế, hỏi rõ là cách làm việc chuyên nghiệp.`,
    },
    {
      id: 'meeting-listening',
      title: 'Nghe và phản hồi tự nhiên',
      titleEn: 'Natural Responses',
      type: 'content',
      content: `## Câu phản hồi ngắn thường gặp

| English | Nghĩa |
|---------|-------|
| That makes sense | Điều đó hợp lý |
| I agree | Tôi đồng ý |
| I am not sure yet | Tôi chưa chắc |
| Let me check and get back to you | Để tôi kiểm tra rồi phản hồi lại |
| We may need more time | Có thể chúng ta cần thêm thời gian |

## Ví dụ hội thoại

> A: Can you take the UI part?
> B: Yes, I can handle it.
> A: Do you have any questions?
> B: Just to confirm, should I also update the tests?

💡 **Mẹo**: Câu ngắn, đúng ý, rõ trách nhiệm sẽ hiệu quả hơn câu dài nhưng mơ hồ.`,
    },
    {
      id: 'meeting-vocab',
      title: 'Từ vựng cho meeting',
      titleEn: 'Meeting Vocabulary',
      type: 'vocabulary',
      vocabularyIds: [
        'greet-understand', 'greet-help', 'greet-please', 'greet-thanks',
        'common-time', 'common-minute', 'common-example', 'common-note',
        'common-follow', 'common-open', 'common-close',
      ],
    },
    {
      id: 'meeting-exercises',
      title: 'Bài tập thực hành',
      titleEn: 'Exercises',
      type: 'exercises',
      exercises: [
        {
          id: 'lesson-08-ex-01',
          type: 'matching',
          question: 'Nối câu hỏi với nghĩa tiếng Việt:',
          pairs: [
            { left: 'Could you repeat that?', right: 'Bạn có thể nhắc lại không?' },
            { left: 'Can you give an example?', right: 'Bạn có thể cho ví dụ không?' },
            { left: 'Just to confirm...', right: 'Để xác nhận lại...' },
            { left: 'What do you mean by that?', right: 'Ý bạn là gì?' },
          ],
        },
        {
          id: 'lesson-08-ex-02',
          type: 'multiple-choice',
          question: 'Khi bạn chưa chắc, câu nào tự nhiên nhất?',
          options: [
            { text: 'I am not sure yet.', isCorrect: true },
            { text: 'I am surely no.', isCorrect: false },
            { text: 'Maybe understand no.', isCorrect: false },
            { text: 'No sure me.', isCorrect: false },
          ],
        },
        {
          id: 'lesson-08-ex-03',
          type: 'fill-blank',
          question: '"Let me check and get back to ___."',
          correctAnswer: 'you',
          hint: 'Đại từ chỉ người nghe',
        },
        {
          id: 'lesson-08-ex-04',
          type: 'spelling',
          question: 'Hãy đánh vần từ: confirm',
          correctAnswer: 'confirm',
        },
        {
          id: 'lesson-08-ex-05',
          type: 'multiple-choice',
          question: 'Câu nào dùng để xác nhận task sau meeting?',
          options: [
            { text: 'So my task is to update the API, right?', isCorrect: true },
            { text: 'Hello API task meeting.', isCorrect: false },
            { text: 'I maybe task no.', isCorrect: false },
            { text: 'Time is API right.', isCorrect: false },
          ],
        },
      ],
    },
  ],
}
