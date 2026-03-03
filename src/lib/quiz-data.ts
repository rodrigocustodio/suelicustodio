export interface QuizQuestion {
  id: number;
  block: 'overload' | 'awareness' | 'disc';
  text: string;
  options: { label: string; value: string; text: string }[];
}

export const quizQuestions: QuizQuestion[] = [
  // Bloco 1 — Identificação Emocional
  {
    id: 1,
    block: 'overload',
    text: 'Você costuma sentir que:',
    options: [
      { label: 'A', value: 'a', text: 'Poderia colocar mais limites' },
      { label: 'B', value: 'b', text: 'Se culpa quando diz não' },
      { label: 'C', value: 'c', text: 'Carrega mais do que deveria' },
      { label: 'D', value: 'd', text: 'Está sempre disponível para todos' },
    ],
  },
  {
    id: 2,
    block: 'overload',
    text: 'Ao final do dia sua mente fica:',
    options: [
      { label: 'A', value: 'a', text: 'Tranquila' },
      { label: 'B', value: 'b', text: 'Pensativa' },
      { label: 'C', value: 'c', text: 'Acelerada' },
      { label: 'D', value: 'd', text: 'Não consegue desligar' },
    ],
  },
  {
    id: 3,
    block: 'overload',
    text: 'Você costuma se colocar:',
    options: [
      { label: 'A', value: 'a', text: 'Em primeiro lugar' },
      { label: 'B', value: 'b', text: 'Às vezes em primeiro' },
      { label: 'C', value: 'c', text: 'Depois dos outros' },
      { label: 'D', value: 'd', text: 'Sempre por último' },
    ],
  },
  {
    id: 4,
    block: 'overload',
    text: 'Você sente culpa ao fazer algo só por você?',
    options: [
      { label: 'A', value: 'a', text: 'Nunca' },
      { label: 'B', value: 'b', text: 'Raramente' },
      { label: 'C', value: 'c', text: 'Frequentemente' },
      { label: 'D', value: 'd', text: 'Sempre' },
    ],
  },
  // Bloco 2 — Consciência
  {
    id: 5,
    block: 'awareness',
    text: 'Você acredita que esse cansaço vem de:',
    options: [
      { label: 'A', value: 'a', text: 'Rotina pesada' },
      { label: 'B', value: 'b', text: 'Falta de tempo' },
      { label: 'C', value: 'c', text: 'Forma como você lida com tudo' },
      { label: 'D', value: 'd', text: 'Um padrão seu que se repete' },
    ],
  },
  {
    id: 6,
    block: 'awareness',
    text: 'Se existisse um método simples para mudar esse padrão:',
    options: [
      { label: 'A', value: 'a', text: 'Não funcionaria para mim' },
      { label: 'B', value: 'b', text: 'Talvez funcionasse' },
      { label: 'C', value: 'c', text: 'Acho que ajudaria' },
      { label: 'D', value: 'd', text: 'Eu faria imediatamente' },
    ],
  },
  // Bloco 3 — Perfil DISC
  {
    id: 7,
    block: 'disc',
    text: 'Em situações difíceis você tende a:',
    options: [
      { label: 'A', value: 'a', text: 'Resolver rápido' },
      { label: 'B', value: 'b', text: 'Conversar com alguém' },
      { label: 'C', value: 'c', text: 'Esperar acalmar' },
      { label: 'D', value: 'd', text: 'Pensar muito antes de agir' },
    ],
  },
  {
    id: 8,
    block: 'disc',
    text: 'Você se sente mais confortável quando:',
    options: [
      { label: 'A', value: 'a', text: 'Está no controle' },
      { label: 'B', value: 'b', text: 'Está com pessoas próximas' },
      { label: 'C', value: 'c', text: 'Está em ambiente tranquilo' },
      { label: 'D', value: 'd', text: 'Tudo está organizado' },
    ],
  },
  {
    id: 9,
    block: 'disc',
    text: 'O que mais te incomoda no dia a dia?',
    options: [
      { label: 'A', value: 'a', text: 'Falta de resultado' },
      { label: 'B', value: 'b', text: 'Sentir-se sozinha' },
      { label: 'C', value: 'c', text: 'Conflitos' },
      { label: 'D', value: 'd', text: 'Incerteza' },
    ],
  },
];

// Scoring functions
const scoreMap: Record<string, number> = { a: 1, b: 2, c: 3, d: 4 };

export function calculateOverloadScore(answers: Record<number, string>): string {
  const ids = [1, 2, 3, 4];
  const total = ids.reduce((sum, id) => sum + (scoreMap[answers[id]] || 0), 0);
  const avg = total / ids.length;
  if (avg <= 1.5) return 'baixo';
  if (avg <= 2.5) return 'médio';
  return 'alto';
}

export function calculateAwarenessLevel(answers: Record<number, string>): string {
  const ids = [5, 6];
  const total = ids.reduce((sum, id) => sum + (scoreMap[answers[id]] || 0), 0);
  const avg = total / ids.length;
  if (avg <= 1.5) return 'baixo';
  if (avg <= 2.5) return 'médio';
  if (avg <= 3.2) return 'alto';
  return 'urgente';
}

export function calculateDiscProfile(answers: Record<number, string>): string {
  const ids = [7, 8, 9];
  const counts: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
  ids.forEach((id) => {
    const val = answers[id];
    if (val) counts[val]++;
  });
  const profileMap: Record<string, string> = { a: 'D', b: 'I', c: 'S', d: 'C' };
  const dominant = Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0];
  return profileMap[dominant] || 'S';
}
