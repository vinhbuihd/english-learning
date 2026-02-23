# English Learning Journey - Project Context

## Dự án là gì?
Web app học tiếng Anh dành cho frontend developer (người Việt), từ beginner đến proficiency.
Tập trung vào ngữ cảnh lập trình thực tế: đọc docs, viết commit messages, giao tiếp với team quốc tế.

## Tech Stack
- React 19 + TypeScript + Vite 6
- Tailwind CSS v4
- React Router v7
- Data: localStorage (không có backend)
- Phát âm: Web Speech API
- Deploy: Vercel

## Chủ dự án
- Frontend developer người Việt
- Level tiếng Anh: Beginner
- Mục tiêu: Giao tiếp thành thạo trong 1 năm
- Bắt đầu: Tháng 2/2026
- Giao tiếp bằng tiếng Việt

## Cấu trúc thư mục
```
src/
├── main.tsx & App.tsx           # Entry + Router (7 routes)
├── index.css                    # Tailwind v4
├── data/
│   ├── vocabulary/              # 49+ từ vựng tech (HTML, CSS, JS, React, Git)
│   └── lessons/                 # Bài học structured data
├── types/                       # TS types (progress, flashcard, SM2)
├── lib/                         # Pure logic (SM-2, localStorage, speech, streak, achievements)
├── hooks/                       # React hooks (useFlashcards, useProgress, useSpeech)
├── components/
│   ├── layout/                  # AppLayout, Navbar, BottomNav
│   ├── flashcard/               # FlashcardItem, DifficultyButtons, SessionSummary
│   ├── lesson/                  # LessonContent, QuizExercise, MatchingExercise, etc.
│   ├── vocabulary/              # VocabCard, SpeakButton
│   └── progress/                # StreakCounter, WeeklyChart, AchievementBadge
└── pages/                       # HomePage, VocabularyPage, FlashcardsPage, LessonsPage,
                                 # LessonDetailPage, ProgressPage, SettingsPage
```

## 3 Tính năng chính
1. **Flashcard & Spaced Repetition** - Thuật toán SM-2, 4 mức đánh giá
2. **Bài học tương tác** - 4 loại bài tập (trắc nghiệm, điền từ, nối cặp, đánh vần)
3. **Theo dõi tiến độ** - Streak, achievements, biểu đồ tuần

## Lộ trình học
- **Phase 1 (Tháng 1-2)**: Foundation - Alphabet, 100-200 từ, câu đơn giản
- **Phase 2 (Tháng 3-4)**: Building - Đọc docs, viết commit messages, 500+ từ
- **Phase 3 (Tháng 5-6)**: Practice - Giao tiếp, code review, nghe tech talks

## Quy ước nội dung
- UI bằng tiếng Việt, nội dung học bằng tiếng Anh
- Từ vựng: từ tiếng Anh + phiên âm IPA + nghĩa tiếng Việt + ví dụ
- Mỗi bài học viết song ngữ Việt-Anh
- Bài tập tương tác: trắc nghiệm, điền từ, nối cặp, đánh vần

## Khi làm việc
- Trả lời bằng tiếng Việt (trừ nội dung bài học tiếng Anh)
- Ưu tiên thực tế, dễ hiểu cho người mới học

## Commands
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
