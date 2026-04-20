import type { Exercise } from './types'
import type { BookWordDetail } from '../../types'

export interface BookExerciseGroup {
  id: string
  title: string
  description?: string
  exercises: Exercise[]
}

export interface BookReading {
  title: string
  paragraphs: string[]
}

export interface BookUnitContent {
  unitNumber: number
  words: string[]
  overview: string
  exerciseGroups: BookExerciseGroup[]
  reading: BookReading
}

export const book1UnitWordLists: string[][] = [
  ['afraid', 'agree', 'angry', 'arrive', 'attack', 'bottom', 'clever', 'cruel', 'finally', 'hide', 'hunt', 'lot', 'middle', 'moment', 'pleased', 'promise', 'reply', 'safe', 'trick', 'well'],
  ['adventure', 'approach', 'carefully', 'chemical', 'create', 'evil', 'experiment', 'kill', 'laboratory', 'laugh', 'loud', 'nervous', 'noise', 'project', 'scare', 'secret', 'shout', 'smell', 'terrible', 'worse'],
  ['alien', 'among', 'chart', 'cloud', 'comprehend', 'describe', 'ever', 'fail', 'friendly', 'grade', 'instead', 'library', 'planet', 'report', 'several', 'solve', 'suddenly', 'suppose', 'universe', 'view'],
  ['appropriate', 'avoid', 'behave', 'calm', 'concern', 'content', 'expect', 'frequently', 'habit', 'instruct', 'issue', 'none', 'patient', 'positive', 'punish', 'represent', 'shake', 'spread', 'stroll', 'village'],
  ['aware', 'badly', 'belong', 'continue', 'error', 'experience', 'field', 'hurt', 'judgment', 'likely', 'normal', 'rare', 'relax', 'request', 'reside', 'result', 'roll', 'since', 'visible', 'wild'],
  ['advantage', 'cause', 'choice', 'community', 'dead', 'distance', 'escape', 'face', 'follow', 'fright', 'ghost', 'individual', 'pet', 'reach', 'return', 'survive', 'upset', 'voice', 'weather', 'wise'],
  ['allow', 'announce', 'beside', 'challenge', 'claim', 'condition', 'contribute', 'difference', 'divide', 'expert', 'famous', 'force', 'harm', 'lay', 'peace', 'prince', 'protect', 'sense', 'sudden', 'therefore'],
  ['accept', 'arrange', 'attend', 'balance', 'contrast', 'encourage', 'familiar', 'grab', 'hang', 'huge', 'necessary', 'pattern', 'propose', 'purpose', 'release', 'require', 'single', 'success', 'tear', 'theory'],
  ['against', 'beach', 'damage', 'discover', 'emotion', 'fix', 'frank', 'identify', 'island', 'ocean', 'perhaps', 'pleasant', 'prevent', 'rock', 'save', 'step', 'still', 'taste', 'throw', 'wave'],
  ['benefit', 'certain', 'chance', 'effect', 'essential', 'far', 'focus', 'function', 'grass', 'guard', 'image', 'immediate', 'primary', 'proud', 'remain', 'rest', 'separate', 'site', 'tail', 'trouble'],
  ['anymore', 'asleep', 'berry', 'collect', 'compete', 'conversation', 'creature', 'decision', 'either', 'forest', 'ground', 'introduce', 'marry', 'prepare', 'sail', 'serious', 'spend', 'strange', 'truth', 'wake'],
  ['alone', 'apartment', 'article', 'artist', 'attitude', 'compare', 'judge', 'magazine', 'material', 'meal', 'method', 'neighbor', 'professional', 'profit', 'quality', 'shape', 'space', 'stair', 'symbol', 'thin'],
  ['blood', 'burn', 'cell', 'contain', 'correct', 'crop', 'demand', 'equal', 'feed', 'hole', 'increase', 'lord', 'owe', 'position', 'raise', 'responsible', 'sight', 'spot', 'structure', 'whole'],
  ['coach', 'control', 'description', 'direct', 'exam', 'example', 'limit', 'local', 'magical', 'mail', 'novel', 'outline', 'poet', 'print', 'scene', 'sheet', 'silly', 'store', 'suffer', 'technology'],
  ['across', 'breathe', 'characteristic', 'consume', 'excite', 'extreme', 'fear', 'fortunate', 'happen', 'length', 'mistake', 'observe', 'opportunity', 'prize', 'race', 'realize', 'respond', 'risk', 'wonder', 'yet'],
  ['academy', 'ancient', 'board', 'century', 'clue', 'concert', 'county', 'dictionary', 'exist', 'flat', 'gentleman', 'hidden', 'maybe', 'officer', 'original', 'pound', 'process', 'publish', 'theater', 'wealth'],
  ['appreciate', 'available', 'beat', 'bright', 'celebrate', 'determine', 'disappear', 'else', 'fair', 'flow', 'forward', 'hill', 'level', 'lone', 'puddle', 'response', 'season', 'solution', 'waste', 'whether'],
  ['argue', 'communicate', 'crowd', 'depend', 'dish', 'empty', 'exact', 'fresh', 'gather', 'indicate', 'item', 'offer', 'price', 'product', 'property', 'purchase', 'recommend', 'select', 'tool', 'treat'],
  ['alive', 'bone', 'bother', 'captain', 'conclusion', 'doubt', 'explore', 'foreign', 'glad', 'however', 'injustice', 'international', 'lawyer', 'mention', 'policy', 'social', 'speech', 'staff', 'toward', 'wood'],
  ['achieve', 'advise', 'already', 'basic', 'bit', 'consider', 'destroy', 'entertain', 'extra', 'goal', 'lie', 'meat', 'opinion', 'real', 'reflect', 'regard', 'serve', 'vegetable', 'war', 'worth'],
  ['appear', 'base', 'brain', 'career', 'clerk', 'effort', 'enter', 'excellent', 'hero', 'hurry', 'inform', 'later', 'leave', 'locate', 'nurse', 'operation', 'pain', 'refuse', 'though', 'various'],
  ['actual', 'amaze', 'charge', 'comfort', 'contact', 'customer', 'deliver', 'earn', 'gate', 'include', 'manage', 'mystery', 'occur', 'opposite', 'plate', 'receive', 'reward', 'set', 'steal', 'thief'],
  ['advance', 'athlete', 'average', 'behavior', 'behind', 'course', 'lower', 'match', 'member', 'mental', 'passenger', 'personality', 'poem', 'pole', 'remove', 'safety', 'shoot', 'sound', 'swim', 'web'],
  ['block', 'cheer', 'complex', 'critic', 'event', 'exercise', 'fit', 'friendship', 'guide', 'lack', 'passage', 'perform', 'pressure', 'probable', 'public', 'strike', 'support', 'task', 'term', 'unite'],
  ['associate', 'environment', 'factory', 'feature', 'instance', 'involve', 'medicine', 'mix', 'organize', 'period', 'populate', 'produce', 'range', 'recognize', 'regular', 'sign', 'tip', 'tradition', 'trash', 'wide'],
  ['advice', 'along', 'attention', 'attract', 'climb', 'drop', 'final', 'further', 'imply', 'maintain', 'neither', 'otherwise', 'physical', 'prove', 'react', 'ride', 'situated', 'society', 'standard', 'suggest'],
  ['actually', 'bite', 'coast', 'deal', 'desert', 'earthquake', 'effective', 'examine', 'false', 'gift', 'hunger', 'imagine', 'journey', 'puzzle', 'quite', 'rather', 'specific', 'tour', 'trip', 'value'],
  ['band', 'barely', 'boring', 'cancel', 'driveway', 'garbage', 'instrument', 'list', 'magic', 'message', 'notice', 'own', 'predict', 'professor', 'rush', 'schedule', 'share', 'stage', 'storm', 'within'],
  ['advertise', 'assign', 'audience', 'breakfast', 'competition', 'cool', 'gain', 'importance', 'knowledge', 'major', 'mean', 'prefer', 'president', 'progress', 'respect', 'rich', 'skill', 'somehow', 'strength', 'vote'],
  ['above', 'ahead', 'amount', 'belief', 'center', 'common', 'cost', 'demonstrate', 'different', 'evidence', 'honesty', 'idiom', 'independent', 'inside', 'master', 'memory', 'proper', 'scan', 'section', 'surface'],
]

interface UnitProfile {
  title: string
  lead: string
  partner: string
  place: string
  project: string
  problem: string
  result: string
}

const unitProfiles: UnitProfile[] = [
  { title: 'A Promise at the Old Well', lead: 'Mina', partner: 'Tuan', place: 'a quiet village square', project: 'finding a lost map', problem: 'a rumor made everyone worried', result: 'the class learned to answer fear with careful thinking' },
  { title: 'The Careful Lab Project', lead: 'Ravi', partner: 'Linh', place: 'the school laboratory', project: 'a safety demonstration', problem: 'one step in the experiment went wrong', result: 'the group finished with cleaner notes and better rules' },
  { title: 'The Report from the Sky Club', lead: 'Noah', partner: 'An', place: 'the library study room', project: 'a space club report', problem: 'the chart was hard to explain', result: 'the class understood the idea after a clear view was drawn' },
  { title: 'The Calm Walk Through Town', lead: 'Sara', partner: 'Bao', place: 'a small village path', project: 'welcoming new students', problem: 'different habits caused confusion', result: 'patient instructions helped everyone behave kindly' },
  { title: 'The Field Journal', lead: 'Ivy', partner: 'Minh', place: 'a wide practice field', project: 'recording outdoor observations', problem: 'an error in the notes changed the result', result: 'the team corrected the record and continued' },
  { title: 'The Wise Choice on the Road', lead: 'Ken', partner: 'Mai', place: 'a community center', project: 'planning an emergency route', problem: 'bad weather made the distance seem longer', result: 'a wise choice helped everyone return safely' },
  { title: 'The Challenge Announcement', lead: 'Omar', partner: 'Vy', place: 'the town hall', project: 'a public service challenge', problem: 'people disagreed about how to divide the work', result: 'each person contributed and protected the peace' },
  { title: 'The Pattern for Success', lead: 'Nora', partner: 'Phong', place: 'the art classroom', project: 'arranging a school event', problem: 'the team had to balance different purposes', result: 'a familiar pattern helped the event succeed' },
  { title: 'The Island Cleanup Plan', lead: 'Ella', partner: 'Nam', place: 'a beach near the ocean', project: 'preventing damage after a storm', problem: 'rocks and waves hid the safest step', result: 'the group discovered a pleasant way to save the site' },
  { title: 'The Essential Guard Plan', lead: 'Hana', partner: 'Duc', place: 'a public garden', project: 'protecting a new exhibit', problem: 'trouble started when visitors separated from the path', result: 'the primary function of each guard became clear' },
  { title: 'The Forest Conversation', lead: 'Alex', partner: 'Chi', place: 'a forest camp', project: 'preparing a weekend activity', problem: 'a strange sound woke the group', result: 'a serious conversation helped them decide the truth' },
  { title: 'The Magazine Method', lead: 'Maya', partner: 'Son', place: 'an apartment workspace', project: 'making a neighborhood magazine', problem: 'the article needed a professional shape', result: 'the method improved the quality of the final issue' },
  { title: 'The Whole Garden Structure', lead: 'Jon', partner: 'Lan', place: 'a school garden', project: 'raising a healthy crop', problem: 'one hole in the plan increased the demand for work', result: 'a responsible group corrected the whole structure' },
  { title: 'The Local Theater Notice', lead: 'Nina', partner: 'Quang', place: 'a local theater', project: 'printing a play outline', problem: 'a silly description confused the scene', result: 'the coach helped control the final example' },
  { title: 'The Race Across the Hill', lead: 'Leo', partner: 'Ha', place: 'a long training path', project: 'preparing for a charity race', problem: 'an extreme mistake created risk', result: 'the team realized the opportunity was worth the effort' },
  { title: 'The Ancient Theater Clue', lead: 'Grace', partner: 'Khoa', place: 'an academy archive', project: 'publishing a history board', problem: 'a hidden clue changed the process', result: 'the original story brought new wealth to the town museum' },
  { title: 'The Bright Season Festival', lead: 'Ruby', partner: 'Long', place: 'a hilltop festival site', project: 'celebrating the new season', problem: 'the water flow created a puddle near the stage', result: 'a fair solution kept the event available to all' },
  { title: 'The Fresh Market Debate', lead: 'Iris', partner: 'Hoang', place: 'a busy market', project: 'selecting tools for a new product', problem: 'the exact price caused people to argue', result: 'clear communication helped customers choose fairly' },
  { title: "The Captain's Policy Speech", lead: 'Dara', partner: 'Tien', place: 'an international student club', project: 'writing a policy speech', problem: 'doubt grew after a mention of injustice', result: 'the staff moved toward a social conclusion' },
  { title: 'The Goal Worth Serving', lead: 'Sofia', partner: 'Binh', place: 'a community kitchen', project: 'serving a basic meal', problem: 'some opinions could destroy the goal', result: 'the group reflected and considered what was real' },
  { title: 'The Excellent Career Day', lead: 'Milo', partner: 'Thu', place: 'a training office', project: 'planning career interviews', problem: 'the clerk had to hurry through various forms', result: 'the nurse and others explained their work with effort' },
  { title: 'The Mystery at the Gate', lead: 'Rosa', partner: 'Lam', place: 'a delivery gate', project: 'helping customers receive rewards', problem: 'a mystery occurred when a plate disappeared', result: 'careful contact helped manage the actual cause' },
  { title: 'The Safety Course Match', lead: 'Eli', partner: 'My', place: 'a sports center', project: 'teaching a safety course', problem: 'average behavior fell behind the expected level', result: 'each member learned to advance with better mental focus' },
  { title: 'The Public Performance Task', lead: 'Jade', partner: 'Anh', place: 'a public hall', project: 'performing a complex passage', problem: 'pressure and a lack of support hurt the group', result: 'friendship helped everyone unite for the event' },
  { title: 'The Factory Environment Plan', lead: 'Kai', partner: 'Nga', place: 'a community factory', project: 'organizing a regular cleanup period', problem: 'trash spread across a wide range', result: 'one clear sign helped people recognize the tradition' },
  { title: 'The Final Climb', lead: 'Lena', partner: 'Vu', place: 'a hillside society club', project: 'testing advice for a safe ride', problem: 'neither path seemed to maintain attention', result: 'the final standard proved which route to suggest' },
  { title: 'The Coast Journey', lead: 'Owen', partner: 'Trang', place: 'a desert coast exhibit', project: 'examining travel records', problem: 'a false map made the trip puzzle harder', result: 'the team learned the actual value of specific evidence' },
  { title: 'The Stage Schedule', lead: 'Rina', partner: 'Dat', place: 'a music hall driveway', project: 'preparing a band performance', problem: 'a storm forced the professor to cancel part of the list', result: 'a short message helped everyone share the stage within time' },
  { title: 'The Audience Vote', lead: 'Theo', partner: 'Mai Anh', place: 'a school auditorium', project: 'advertising a breakfast competition', problem: 'the audience did not understand the importance of each skill', result: 'respect and knowledge helped the president guide the vote' },
  { title: 'The Center Surface Test', lead: 'Yara', partner: 'Phuc', place: 'a science center', project: 'demonstrating evidence on a screen', problem: 'the common belief was different from the result', result: 'honesty helped the class master the proper section' },
]

function getOptionWords(words: string[], correct: string, startIndex: number) {
  const pool = words.filter((word) => word !== correct)
  return [correct, ...pool.slice(startIndex, startIndex + 3)]
}

function makeOptions(values: string[], correctValue: string) {
  return values.map((value) => ({
    text: value,
    isCorrect: value === correctValue,
  }))
}

function makeTextOptions(values: string[], correctIndex = 0) {
  return values.map((text, index) => ({
    text,
    isCorrect: index === correctIndex,
  }))
}

function meaningLine(detail: BookWordDetail, profile: UnitProfile) {
  if (detail.definition && detail.source !== 'fallback') return detail.definition
  return `A target word used when ${profile.lead} works on ${profile.project}.`
}

function buildWordChoiceExercises(
  unitNumber: number,
  words: string[],
  details: BookWordDetail[],
  profile: UnitProfile,
): Exercise[] {
  return words.slice(0, 5).map((word, index) => ({
    id: `book-1-unit-${String(unitNumber).padStart(2, '0')}-word-choice-${index + 1}`,
    type: 'multiple-choice',
    question: `${index + 1}. Choose the target word for this meaning clue: ${meaningLine(details[index], profile)}`,
    options: makeOptions(getOptionWords(words, word, index + 1), word),
  }))
}

function buildMeaningExercises(
  unitNumber: number,
  words: string[],
  details: BookWordDetail[],
  profile: UnitProfile,
): Exercise[] {
  return details.slice(5, 10).map((detail, index) => {
    const correct = `${detail.term}: ${meaningLine(detail, profile)}`
    const wrongOptions = getOptionWords(words, detail.term, index + 7)
      .filter((word) => word !== detail.term)
      .slice(0, 3)
      .map((word) => `${word}: A different target word from this unit.`)

    return {
      id: `book-1-unit-${String(unitNumber).padStart(2, '0')}-meaning-${index + 1}`,
      type: 'multiple-choice',
      question: `${index + 1}. Choose the best meaning note for "${detail.term}".`,
      options: makeTextOptions([correct, ...wrongOptions], 0),
    }
  })
}

function buildSentenceSenseExercises(unitNumber: number, words: string[], profile: UnitProfile): Exercise[] {
  return words.slice(10, 20).map((word, index) => ({
    id: `book-1-unit-${String(unitNumber).padStart(2, '0')}-sentence-sense-${index + 1}`,
    type: 'multiple-choice',
    question: `${index + 1}. Which sentence uses "${word}" in the better learning context?`,
    options: makeTextOptions(
      [
        `${profile.partner} wrote a clear sentence with "${word}" to explain ${profile.problem}.`,
        `${profile.partner} used "${word}" as a random label without connecting it to the idea.`,
      ],
      0,
    ),
  }))
}

function buildReading(words: string[], profile: UnitProfile): BookReading {
  return {
    title: profile.title,
    paragraphs: [
      `${profile.lead} and ${profile.partner} met at ${profile.place} to work on ${profile.project}. Their word list began with ${words.slice(0, 5).join(', ')}, so they wrote short examples before starting the main task.`,
      `The problem was clear: ${profile.problem}. In the middle of the work, they practiced ${words.slice(5, 10).join(', ')} and checked whether each word matched the situation.`,
      `By the end, ${profile.result}. They reviewed ${words.slice(10, 15).join(', ')} first, then used ${words.slice(15, 20).join(', ')} to explain the lesson in their own words.`,
    ],
  }
}

function buildReadingExercises(unitNumber: number, words: string[], profile: UnitProfile): Exercise[] {
  const idPrefix = `book-1-unit-${String(unitNumber).padStart(2, '0')}-reading`
  return [
    {
      id: `${idPrefix}-1`,
      type: 'multiple-choice',
      question: '1. What is the main purpose of the reading?',
      options: makeTextOptions([
        `To show how ${profile.lead} and ${profile.partner} practice the unit words through a problem`,
        'To list unrelated words without a situation',
        'To explain a grammar rule from another unit',
        'To describe a test with no target vocabulary',
      ]),
    },
    {
      id: `${idPrefix}-2`,
      type: 'multiple-choice',
      question: '2. Where does the reading happen?',
      options: makeTextOptions([
        `At ${profile.place}`,
        'At a place from another lesson',
        'Only inside a dictionary entry',
        'In a setting that is never named',
      ]),
    },
    {
      id: `${idPrefix}-3`,
      type: 'multiple-choice',
      question: '3. What problem do the learners face?',
      options: makeTextOptions([
        profile.problem,
        'They decide to skip every target word',
        'They finish before the reading begins',
        'They lose all interest in the lesson',
      ]),
    },
    {
      id: `${idPrefix}-4`,
      type: 'multiple-choice',
      question: '4. Which group contains only target words from this unit?',
      options: makeTextOptions([
        words.slice(0, 5).join(', '),
        'browser, keyboard, server, commit, branch',
        'winter, summer, autumn, spring, holiday',
        'doctor, pilot, singer, chef, painter',
      ]),
    },
    {
      id: `${idPrefix}-5`,
      type: 'multiple-choice',
      question: '5. What happens by the end of the reading?',
      options: makeTextOptions([
        profile.result,
        'The learners stop using the word list',
        'The task becomes unrelated to the unit',
        'The reading gives no conclusion',
      ]),
    },
  ]
}

export function buildBook1UnitContent(unitNumber: number, details: BookWordDetail[]): BookUnitContent {
  const words = book1UnitWordLists[unitNumber - 1] ?? []
  const profile = unitProfiles[unitNumber - 1] ?? unitProfiles[0]
  const reading = buildReading(words, profile)

  return {
    unitNumber,
    words,
    overview:
      'This rewritten unit follows the book-style flow: target words, meaning checks, sentence sense, a reading passage, and reading questions.',
    reading,
    exerciseGroups: [
      {
        id: 'word-choice',
        title: 'Choose the right word for the new context.',
        exercises: buildWordChoiceExercises(unitNumber, words, details, profile),
      },
      {
        id: 'meaning-check',
        title: 'Choose the best meaning note for the target word.',
        exercises: buildMeaningExercises(unitNumber, words, details, profile),
      },
      {
        id: 'sentence-sense',
        title: 'Check the sentence that makes better sense.',
        exercises: buildSentenceSenseExercises(unitNumber, words, profile),
      },
      {
        id: 'reading-questions',
        title: 'Answer the questions.',
        exercises: buildReadingExercises(unitNumber, words, profile),
      },
    ],
  }
}
