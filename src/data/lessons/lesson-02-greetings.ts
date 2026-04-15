import type { Lesson } from './types'

export const lesson02: Lesson = {
  id: 'lesson-02',
  slug: 'basic-greetings',
  title: 'Basic Greetings & Introductions',
  titleVi: 'Chào hỏi và giới thiệu bản thân',
  description: 'Học cách chào hỏi, tự giới thiệu, và giao tiếp cơ bản với đồng nghiệp quốc tế',
  phase: 1,
  week: 1,
  order: 2,
  objectives: [
    'Chào hỏi đồng nghiệp bằng tiếng Anh',
    'Tự giới thiệu bản thân: tên, nghề nghiệp',
    'Giao tiếp cơ bản qua Slack/email',
  ],
  estimatedMinutes: 30,
  prevLessonId: 'lesson-01',
  nextLessonId: 'lesson-03',
  sections: [
    {
      id: 'greet-formal',
      title: 'Chào hỏi trang trọng',
      titleEn: 'Formal Greetings',
      type: 'content',
      content: `## Chào hỏi theo thời gian trong ngày

Khi gặp đồng nghiệp hoặc trong meeting, bạn dùng:

| English | Phát âm | Khi nào dùng |
|---------|---------|-------------|
| Good morning | /ɡʊd ˈmɔːrnɪŋ/ | Buổi sáng (trước 12h) |
| Good afternoon | /ɡʊd ˌæftərˈnuːn/ | Buổi chiều (12h - 18h) |
| Good evening | /ɡʊd ˈiːvnɪŋ/ | Buổi tối (sau 18h) |

## Chào hỏi thân mật (dùng nhiều hơn trong tech)

| English | Phát âm | Nghĩa |
|---------|---------|-------|
| Hi! | /haɪ/ | Chào! |
| Hey! | /heɪ/ | Ê! (rất thân mật) |
| Hi everyone! | /haɪ ˈevriwʌn/ | Chào mọi người! |
| Hi team! | /haɪ tiːm/ | Chào cả team! |

💡 **Mẹo**: Trong Slack và email, "Hi" hoặc "Hey" là phổ biến nhất. Không cần quá trang trọng!`,
    },
    {
      id: 'greet-introduce',
      title: 'Tự giới thiệu bản thân',
      titleEn: 'Self Introduction',
      type: 'content',
      content: `## Mẫu câu giới thiệu

### Cơ bản:
- **My name is [tên].** /maɪ neɪm ɪz/ — Tên tôi là...
- **I'm [tên].** /aɪm/ — Tôi là...
- **Nice to meet you!** /naɪs tuː miːt juː/ — Rất vui được gặp bạn!

### Giới thiệu nghề nghiệp:
- **I'm a frontend developer.** — Tôi là lập trình viên frontend.
- **I'm a software engineer.** — Tôi là kỹ sư phần mềm.
- **I work at [công ty].** — Tôi làm việc tại...
- **I've been working here for [time].** — Tôi đã làm ở đây được...

### Ví dụ hoàn chỉnh:
> "Hi everyone! My name is Minh. I'm a frontend developer. I work with React and TypeScript. Nice to meet you all!"

💡 **Mẹo**: Trong daily standup, bạn thường chỉ cần nói ngắn gọn: "Hi, I'm Minh, frontend dev."`,
    },
    {
      id: 'greet-vocab',
      title: 'Từ vựng chào hỏi',
      titleEn: 'Greeting Vocabulary',
      type: 'vocabulary',
      vocabularyIds: [
        'greet-hello', 'greet-hi', 'greet-goodbye',
        'greet-morning', 'greet-afternoon', 'greet-evening',
        'greet-please', 'greet-thanks', 'greet-sorry',
        'greet-welcome', 'greet-nice', 'greet-meet',
        'greet-name', 'greet-help', 'greet-understand',
      ],
    },
    {
      id: 'greet-slack',
      title: 'Giao tiếp qua Slack & Email',
      titleEn: 'Slack & Email Communication',
      type: 'content',
      content: `## Câu thường dùng trên Slack

| English | Nghĩa | Khi nào dùng |
|---------|-------|-------------|
| Sure! | Chắc chắn rồi! | Đồng ý |
| Sounds good! | Nghe hay đó! | Đồng ý với ý kiến |
| Got it! | Hiểu rồi! | Xác nhận đã hiểu |
| No worries! | Không sao! | Trả lời khi ai xin lỗi |
| Let me check. | Để tôi kiểm tra. | Cần thời gian |
| I'll look into it. | Tôi sẽ xem xét. | Nhận việc |
| Could you review my PR? | Bạn review PR giúp tôi được không? | Nhờ review code |
| Thanks for the review! | Cảm ơn đã review! | Sau khi được review |

💡 **Mẹo**: Người nước ngoài rất hay dùng emoji trên Slack: 👍 (OK), ✅ (Done), 👀 (I'm looking)`,
    },
    {
      id: 'greet-exercises',
      title: 'Bài tập thực hành',
      titleEn: 'Exercises',
      type: 'exercises',
      exercises: [
        {
          id: 'lesson-02-ex-01',
          type: 'matching',
          question: 'Nối câu tiếng Anh với nghĩa tiếng Việt:',
          pairs: [
            { left: 'Good morning!', right: 'Chào buổi sáng!' },
            { left: 'Nice to meet you!', right: 'Rất vui được gặp bạn!' },
            { left: 'Thanks for the review!', right: 'Cảm ơn đã review!' },
            { left: "You're welcome!", right: 'Không có gì!' },
            { left: 'Sorry for the late reply', right: 'Xin lỗi đã trả lời muộn' },
          ],
        },
        {
          id: 'lesson-02-ex-02',
          type: 'multiple-choice',
          question: 'Lúc 3 giờ chiều, bạn nên chào đồng nghiệp như thế nào?',
          options: [
            { text: 'Good morning!', isCorrect: false },
            { text: 'Good afternoon!', isCorrect: true },
            { text: 'Good evening!', isCorrect: false },
            { text: 'Good night!', isCorrect: false },
          ],
        },
        {
          id: 'lesson-02-ex-03',
          type: 'fill-blank',
          question: 'Hoàn thành câu giới thiệu: "My ___ is Minh. I\'m a frontend developer."',
          correctAnswer: 'name',
          hint: 'Từ chỉ "tên" trong tiếng Anh',
        },
        {
          id: 'lesson-02-ex-04',
          type: 'multiple-choice',
          question: 'Trên Slack, khi đồng nghiệp nhờ bạn việc gì đó, câu nào phù hợp để đồng ý?',
          options: [
            { text: 'Sure!', isCorrect: true },
            { text: 'Sorry!', isCorrect: false },
            { text: 'Goodbye!', isCorrect: false },
            { text: 'Good morning!', isCorrect: false },
          ],
        },
        {
          id: 'lesson-02-ex-05',
          type: 'spelling',
          question: 'Hãy đánh vần từ: understand',
          correctAnswer: 'understand',
        },
        {
          id: 'lesson-02-ex-06',
          type: 'fill-blank',
          question: 'Khi muốn nhờ đồng nghiệp review code: "Could you ___ my PR?"',
          correctAnswer: 'review',
          hint: 'Kiểm tra, đánh giá code',
        },
        {
          id: 'lesson-02-ex-07',
          type: 'multiple-choice',
          question: '"No worries!" nghĩa là gì?',
          options: [
            { text: 'Tôi lo lắng', isCorrect: false },
            { text: 'Không sao đâu!', isCorrect: true },
            { text: 'Không hiểu', isCorrect: false },
            { text: 'Tạm biệt', isCorrect: false },
          ],
        },
        {
          id: 'lesson-02-ex-08',
          type: 'matching',
          question: 'Nối câu Slack với tình huống phù hợp:',
          pairs: [
            { left: 'Got it!', right: 'Xác nhận đã hiểu' },
            { left: 'Let me check.', right: 'Cần thời gian xem xét' },
            { left: 'Sounds good!', right: 'Đồng ý với ý kiến' },
            { left: "I'll look into it.", right: 'Nhận việc sẽ xem xét' },
          ],
        },
      ],
    },
  ],
}
