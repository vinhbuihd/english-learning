import type { Lesson } from './types'

export const lesson03: Lesson = {
  id: 'lesson-03',
  slug: 'numbers-time-dates',
  title: 'Numbers, Time & Dates',
  titleVi: 'Số đếm, giờ giấc và ngày tháng',
  description: 'Học số đếm, cách nói giờ giấc và ngày tháng - kỹ năng cần thiết cho meeting và standup',
  phase: 1,
  week: 1,
  order: 3,
  objectives: [
    'Đếm số từ 1-100 bằng tiếng Anh',
    'Nói giờ giấc cho meeting và standup',
    'Đọc ngày tháng trong changelog và release notes',
  ],
  estimatedMinutes: 35,
  prevLessonId: 'lesson-02',
  nextLessonId: 'lesson-04',
  sections: [
    {
      id: 'numbers-basic',
      title: 'Số đếm cơ bản',
      titleEn: 'Basic Numbers',
      type: 'content',
      content: `## Số 1-10

| Số | English | Phát âm |
|----|---------|---------|
| 0 | zero | /ˈzɪroʊ/ |
| 1 | one | /wʌn/ |
| 2 | two | /tuː/ |
| 3 | three | /θriː/ |
| 4 | four | /fɔːr/ |
| 5 | five | /faɪv/ |
| 6 | six | /sɪks/ |
| 7 | seven | /ˈsevən/ |
| 8 | eight | /eɪt/ |
| 9 | nine | /naɪn/ |
| 10 | ten | /ten/ |

## Số đặc biệt trong code

| English | Nghĩa | Ví dụ |
|---------|-------|-------|
| zero-based index | chỉ số bắt đầu từ 0 | array[0] |
| port 3000 | cổng 3000 | localhost:3000 |
| version 2.0 | phiên bản 2.0 | React 19 |
| 404 error | lỗi không tìm thấy | 404 Not Found |
| 500 error | lỗi máy chủ | 500 Server Error |

💡 **Mẹo**: Khi nói số lớn, tách theo nhóm: 3000 = "three thousand", 404 = "four oh four"`,
    },
    {
      id: 'numbers-time',
      title: 'Giờ giấc - Nói giờ cho meeting',
      titleEn: 'Telling Time',
      type: 'content',
      content: `## Cách nói giờ

| English | Phát âm | Ví dụ |
|---------|---------|-------|
| It's 9 AM | /ɪts naɪn eɪ em/ | Standup lúc 9h sáng |
| It's 2:30 PM | /ɪts tuː ˈθɜːrti piː em/ | Meeting lúc 2h30 chiều |
| half past two | /hæf pæst tuː/ | 2 giờ rưỡi |
| quarter to three | /ˈkwɔːrtər tuː θriː/ | 2 giờ 45 (thiếu 15 phút đến 3h) |

## Câu thường dùng trong meeting

- **"The standup is at 9 AM."** — Standup lúc 9 giờ sáng.
- **"Let's meet at 2:30."** — Mình họp lúc 2h30 nhé.
- **"Can we reschedule to 3 PM?"** — Mình dời sang 3h chiều được không?
- **"I'll be 5 minutes late."** — Tôi sẽ trễ 5 phút.

💡 **Mẹo**: AM = sáng (trước 12h), PM = chiều/tối (sau 12h). Developer thường dùng giờ 24h trong code nhưng giờ 12h khi nói.`,
    },
    {
      id: 'numbers-dates',
      title: 'Ngày tháng năm',
      titleEn: 'Dates',
      type: 'content',
      content: `## Tháng trong năm

| Tháng | English | Viết tắt |
|-------|---------|---------|
| 1 | January | Jan |
| 2 | February | Feb |
| 3 | March | Mar |
| 4 | April | Apr |
| 5 | May | May |
| 6 | June | Jun |
| 7 | July | Jul |
| 8 | August | Aug |
| 9 | September | Sep |
| 10 | October | Oct |
| 11 | November | Nov |
| 12 | December | Dec |

## Ngày trong tuần

| English | Viết tắt | Tiếng Việt |
|---------|---------|-----------|
| Monday | Mon | Thứ Hai |
| Tuesday | Tue | Thứ Ba |
| Wednesday | Wed | Thứ Tư |
| Thursday | Thu | Thứ Năm |
| Friday | Fri | Thứ Sáu |
| Saturday | Sat | Thứ Bảy |
| Sunday | Sun | Chủ Nhật |

## Cách đọc ngày tháng

- **Feb 24, 2026** → "February twenty-fourth, twenty twenty-six"
- **2026-02-24** → "twenty twenty-six, February twenty-fourth" (format ISO)

💡 **Mẹo**: Trong changelog/release notes thường dùng format: **v2.1.0 (Mar 15, 2026)**`,
    },
    {
      id: 'numbers-vocab',
      title: 'Từ vựng số đếm & thời gian',
      titleEn: 'Numbers & Time Vocabulary',
      type: 'vocabulary',
      vocabularyIds: [
        'common-zero', 'common-one', 'common-two', 'common-three',
        'common-four', 'common-five', 'common-ten', 'common-hundred',
        'common-time', 'common-hour', 'common-minute',
        'common-date', 'common-today', 'common-tomorrow',
        'common-yesterday', 'common-week', 'common-month', 'common-year',
      ],
    },
    {
      id: 'numbers-exercises',
      title: 'Bài tập thực hành',
      titleEn: 'Exercises',
      type: 'exercises',
      exercises: [
        {
          id: 'lesson-03-ex-01',
          type: 'matching',
          question: 'Nối số với cách viết bằng tiếng Anh:',
          pairs: [
            { left: '3', right: 'three' },
            { left: '7', right: 'seven' },
            { left: '10', right: 'ten' },
            { left: '0', right: 'zero' },
            { left: '5', right: 'five' },
          ],
        },
        {
          id: 'lesson-03-ex-02',
          type: 'multiple-choice',
          question: '"404 error" đọc như thế nào?',
          options: [
            { text: 'four hundred four error', isCorrect: false },
            { text: 'four oh four error', isCorrect: true },
            { text: 'forty four error', isCorrect: false },
            { text: 'four zero four error', isCorrect: false },
          ],
        },
        {
          id: 'lesson-03-ex-03',
          type: 'fill-blank',
          question: 'Hoàn thành câu: "The standup is at 9 ___." (buổi sáng)',
          correctAnswer: 'AM',
          hint: 'Viết tắt của ante meridiem (trước trưa)',
        },
        {
          id: 'lesson-03-ex-04',
          type: 'multiple-choice',
          question: '"Feb" là viết tắt của tháng nào?',
          options: [
            { text: 'January', isCorrect: false },
            { text: 'February', isCorrect: true },
            { text: 'March', isCorrect: false },
            { text: 'April', isCorrect: false },
          ],
        },
        {
          id: 'lesson-03-ex-05',
          type: 'spelling',
          question: 'Hãy đánh vần từ: tomorrow',
          correctAnswer: 'tomorrow',
        },
        {
          id: 'lesson-03-ex-06',
          type: 'matching',
          question: 'Nối ngày trong tuần:',
          pairs: [
            { left: 'Monday', right: 'Thứ Hai' },
            { left: 'Wednesday', right: 'Thứ Tư' },
            { left: 'Friday', right: 'Thứ Sáu' },
            { left: 'Sunday', right: 'Chủ Nhật' },
          ],
        },
        {
          id: 'lesson-03-ex-07',
          type: 'fill-blank',
          question: '"I\'ll be 5 ___ late." (phút)',
          correctAnswer: 'minutes',
          hint: 'Đơn vị thời gian nhỏ hơn giờ',
        },
        {
          id: 'lesson-03-ex-08',
          type: 'multiple-choice',
          question: 'Trong code, "zero-based index" nghĩa là gì?',
          options: [
            { text: 'Chỉ số bắt đầu từ 0', isCorrect: true },
            { text: 'Chỉ số bắt đầu từ 1', isCorrect: false },
            { text: 'Không có chỉ số', isCorrect: false },
            { text: 'Chỉ số âm', isCorrect: false },
          ],
        },
      ],
    },
  ],
}
