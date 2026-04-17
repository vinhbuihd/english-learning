import type { Lesson } from './types'

const BOOK_1_SERIES_TITLE = '4000 Essential English Words - Book 1'

const rawUnits = [
  '1|afraid, agree, angry, arrive, attack, bottom, clever, cruel, finally, hide, hunt, lot, middle, moment, pleased, promise, reply, safe, trick, well',
  '2|adventure, approach, carefully, chemical, create, evil, experiment, kill, laboratory, laugh, loud, nervous, noise, project, scare, secret, shout, smell, terrible, worse',
  '3|alien, among, chart, cloud, comprehend, describe, ever, fail, friendly, grade, instead, library, planet, report, several, solve, suddenly, suppose, universe, view',
  '4|appropriate, avoid, behave, calm, concern, content, expect, frequently, habit, instruct, issue, none, patient, positive, punish, represent, shake, spread, stroll, village',
  '5|aware, badly, belong, continue, error, experience, field, hurt, judgment, likely, normal, rare, relax, request, reside, result, roll, since, visible, wild',
  '6|advantage, cause, choice, community, dead, distance, escape, face, follow, fright, ghost, individual, pet, reach, return, survive, upset, voice, weather, wise',
  '7|allow, announce, beside, challenge, claim, condition, contribute, difference, divide, expert, famous, force, harm, lay, peace, prince, protect, sense, sudden, therefore',
  '8|accept, arrange, attend, balance, contrast, encourage, familiar, grab, hang, huge, necessary, pattern, propose, purpose, release, require, single, success, tear, theory',
  '9|against, beach, damage, discover, emotion, fix, frank, identify, island, ocean, perhaps, pleasant, prevent, rock, save, step, still, taste, throw, wave',
  '10|benefit, certain, chance, effect, essential, far, focus, function, grass, guard, image, immediate, primary, proud, remain, rest, separate, site, tail, trouble',
  '11|anymore, asleep, berry, collect, compete, conversation, creature, decision, either, forest, ground, introduce, marry, prepare, sail, serious, spend, strange, truth, wake',
  '12|alone, apartment, article, artist, attitude, compare, judge, magazine, material, meal, method, neighbor, professional, profit, quality, shape, space, stair, symbol, thin',
  '13|blood, burn, cell, contain, correct, crop, demand, equal, feed, hole, increase, lord, owe, position, raise, responsible, sight, spot, structure, whole',
  '14|coach, control, description, direct, exam, example, limit, local, magical, mail, novel, outline, poet, print, scene, sheet, silly, store, suffer, technology',
  '15|across, breathe, characteristic, consume, excite, extreme, fear, fortunate, happen, length, mistake, observe, opportunity, prize, race, realize, respond, risk, wonder, yet',
  '16|academy, ancient, board, century, clue, concert, county, dictionary, exist, flat, gentleman, hidden, maybe, officer, original, pound, process, publish, theater, wealth',
  '17|appreciate, available, beat, bright, celebrate, determine, disappear, else, fair, flow, forward, hill, level, lone, puddle, response, season, solution, waste, whether',
  '18|argue, communicate, crowd, depend, dish, empty, exact, fresh, gather, indicate, item, offer, price, product, property, purchase, recommend, select, tool, treat',
  '19|alive, bone, bother, captain, conclusion, doubt, explore, foreign, glad, however, injustice, international, lawyer, mention, policy, social, speech, staff, toward, wood',
  '20|achieve, advise, already, basic, bit, consider, destroy, entertain, extra, goal, lie, meat, opinion, real, reflect, regard, serve, vegetable, war, worth',
  '21|appear, base, brain, career, clerk, effort, enter, excellent, hero, hurry, inform, later, leave, locate, nurse, operation, pain, refuse, though, various',
  '22|actual, amaze, charge, comfort, contact, customer, deliver, earn, gate, include, manage, mystery, occur, opposite, plate, receive, reward, set, steal, thief',
  '23|advance, athlete, average, behavior, behind, course, lower, match, member, mental, passenger, personality, poem, pole, remove, safety, shoot, sound, swim, web',
  '24|block, cheer, complex, critic, event, exercise, fit, friendship, guide, lack, passage, perform, pressure, probable, public, strike, support, task, term, unite',
  '25|associate, environment, factory, feature, instance, involve, medicine, mix, organize, period, populate, produce, range, recognize, regular, sign, tip, tradition, trash, wide',
  '26|advice, along, attention, attract, climb, drop, final, further, imply, maintain, neither, otherwise, physical, prove, react, ride, situated, society, standard, suggest',
  '27|actually, bite, coast, deal, desert, earthquake, effective, examine, false, gift, hunger, imagine, journey, puzzle, quite, rather, specific, tour, trip, value',
  '28|band, barely, boring, cancel, driveway, garbage, instrument, list, magic, message, notice, own, predict, professor, rush, schedule, share, stage, storm, within',
  '29|advertise, assign, audience, breakfast, competition, cool, gain, importance, knowledge, major, mean, prefer, president, progress, respect, rich, skill, somehow, strength, vote',
  '30|above, ahead, amount, belief, center, common, cost, demonstrate, different, evidence, honesty, idiom, independent, inside, master, memory, proper, scan, section, surface',
]

function buildBookLesson(unitNumber: number, words: string[]): Lesson {
  const id = `book-1-unit-${String(unitNumber).padStart(2, '0')}`

  return {
    id,
    slug: `book-1-unit-${unitNumber}`,
    title: `Unit ${unitNumber}`,
    titleVi: `Book 1 - Unit ${unitNumber}`,
    description: `Hoc 20 tu muc tieu cua Unit ${unitNumber} va luyen bai tap theo format cua 4000 Essential English Words.`,
    seriesId: 'book-1',
    seriesTitle: BOOK_1_SERIES_TITLE,
    phase: 1,
    week: Math.ceil(unitNumber / 5),
    order: unitNumber,
    objectives: [
      'Nho nghia va cach dung cua 20 tu muc tieu trong unit',
      'Luyen dang bai tap tu vung giong tai lieu goc',
      'On tap qua reading challenge va cau hoi doc hieu ngan',
    ],
    sections: [],
    estimatedMinutes: 35,
    bookUnitWords: words,
    prevLessonId: unitNumber > 1 ? `book-1-unit-${String(unitNumber - 1).padStart(2, '0')}` : undefined,
    nextLessonId: unitNumber < rawUnits.length ? `book-1-unit-${String(unitNumber + 1).padStart(2, '0')}` : undefined,
  }
}

export const book1Lessons: Lesson[] = rawUnits.map((entry) => {
  const [unitLabel, wordsCsv] = entry.split('|')
  const unitNumber = Number(unitLabel)
  const words = wordsCsv.split(',').map((word) => word.trim())
  return buildBookLesson(unitNumber, words)
})

