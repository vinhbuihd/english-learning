import type { Lesson } from './types'

export const lesson01: Lesson = {
  id: 'lesson-01',
  slug: 'alphabet-and-basics',
  title: 'Alphabet & Basic Pronunciation',
  titleVi: 'Bảng chữ cái và phát âm cơ bản',
  description: 'Học bảng chữ cái tiếng Anh, cách đọc ký tự trong code, và 20 từ vựng lập trình cơ bản',
  phase: 1,
  week: 1,
  order: 1,
  objectives: [
    'Học bảng chữ cái tiếng Anh và cách phát âm',
    'Hiểu cách đọc các ký tự trong code',
    'Học 20 từ vựng lập trình cơ bản nhất',
  ],
  estimatedMinutes: 30,
  nextLessonId: 'lesson-02',
  sections: [
    {
      id: 'section-alphabet',
      title: 'Bảng chữ cái tiếng Anh',
      titleEn: 'English Alphabet',
      type: 'content',
      content: `## 26 chữ cái (26 letters)

**Nguyên âm (Vowels):** A, E, I, O, U
**Phụ âm (Consonants):** Các chữ còn lại

### Cách đọc chữ cái khi code

| Chữ | Phát âm | Ví dụ trong code |
|-----|---------|-----------------|
| A | /eɪ/ (ay) | class App |
| B | /biː/ (bee) | button |
| C | /siː/ (see) | const |
| D | /diː/ (dee) | div |
| E | /iː/ (ee) | element |
| F | /ef/ (eff) | function |
| G | /dʒiː/ (jee) | get |
| H | /eɪtʃ/ (aych) | html |
| I | /aɪ/ (eye) | id |
| J | /dʒeɪ/ (jay) | JSON |
| K | /keɪ/ (kay) | key |
| L | /el/ (ell) | let |
| M | /em/ (emm) | map |
| N | /en/ (enn) | new |
| O | /oʊ/ (oh) | object |
| P | /piː/ (pee) | props |
| Q | /kjuː/ (cue) | query |
| R | /ɑːr/ (arr) | return |
| S | /es/ (ess) | state |
| T | /tiː/ (tee) | type |
| U | /juː/ (you) | use |
| V | /viː/ (vee) | var |
| W | /ˈdʌbəl.juː/ (double-you) | window |
| X | /eks/ (ex) | export |
| Y | /waɪ/ (why) | yield |
| Z | /ziː/ (zee) | zero |

💡 **Lưu ý**: Trong tiếng Anh Mỹ dùng "zee", tiếng Anh Anh dùng "zed" cho chữ Z.`,
    },
    {
      id: 'section-vocab',
      title: 'Từ vựng lập trình cơ bản',
      titleEn: 'Basic Programming Vocabulary',
      type: 'vocabulary',
      vocabularyIds: [
        'js-function', 'js-variable', 'js-constant', 'js-array', 'js-object',
        'js-string', 'js-number', 'js-boolean', 'js-loop', 'js-condition',
        'js-event', 'js-callback', 'js-method',
        'html-element', 'html-button', 'html-input',
        'css-style', 'css-class', 'css-display',
        'react-component',
      ],
    },
    {
      id: 'section-exercises',
      title: 'Bài tập thực hành',
      titleEn: 'Exercises',
      type: 'exercises',
      exercises: [
        {
          id: 'lesson-01-ex-01',
          type: 'spelling',
          question: 'Hãy đánh vần từ: component',
          correctAnswer: 'component',
        },
        {
          id: 'lesson-01-ex-02',
          type: 'spelling',
          question: 'Hãy đánh vần từ: function',
          correctAnswer: 'function',
        },
        {
          id: 'lesson-01-ex-03',
          type: 'matching',
          question: 'Nối từ tiếng Anh với nghĩa tiếng Việt:',
          pairs: [
            { left: 'function', right: 'hàm' },
            { left: 'variable', right: 'biến' },
            { left: 'array', right: 'mảng' },
            { left: 'object', right: 'đối tượng' },
            { left: 'string', right: 'chuỗi' },
          ],
        },
        {
          id: 'lesson-01-ex-04',
          type: 'multiple-choice',
          question: '"console" nghĩa là gì?',
          options: [
            { text: 'nút bấm', isCorrect: false },
            { text: 'bảng điều khiển', isCorrect: true },
            { text: 'mảng', isCorrect: false },
            { text: 'lỗi', isCorrect: false },
          ],
        },
        {
          id: 'lesson-01-ex-05',
          type: 'multiple-choice',
          question: 'Từ "boolean" phát âm như thế nào?',
          options: [
            { text: '/ˈbuːliən/', isCorrect: true },
            { text: '/boʊˈliːn/', isCorrect: false },
            { text: '/bɒlˈiːən/', isCorrect: false },
            { text: '/bjuːˈliːn/', isCorrect: false },
          ],
        },
        {
          id: 'lesson-01-ex-06',
          type: 'fill-blank',
          question: 'Điền từ còn thiếu: "const name = ___" (kiểu dữ liệu chuỗi bắt đầu và kết thúc bằng dấu nháy)',
          correctAnswer: 'string',
          hint: 'Kiểu dữ liệu dùng cho văn bản',
        },
        {
          id: 'lesson-01-ex-07',
          type: 'multiple-choice',
          question: 'Đâu KHÔNG phải nguyên âm (vowel)?',
          options: [
            { text: 'A', isCorrect: false },
            { text: 'E', isCorrect: false },
            { text: 'F', isCorrect: true },
            { text: 'I', isCorrect: false },
          ],
        },
      ],
    },
  ],
}
