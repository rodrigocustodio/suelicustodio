import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Descriptions for each topic — what low/high scores mean emotionally
const topicInsights: Record<
  string,
  { low: string; high: string; icon: string }
> = {
  "Energia emocional": {
    low: "Você pode estar vivendo no modo automático, com uma sensação constante de esgotamento que dificulta até as atividades mais simples do dia a dia.",
    high: "Você tem uma reserva emocional saudável que permite enfrentar desafios com mais leveza e presença.",
    icon: "⚡",
  },
  "Peso mental": {
    low: "Sua mente pode estar sobrecarregada com pensamentos, preocupações e responsabilidades que não dão trégua, dificultando o descanso verdadeiro.",
    high: "Você consegue organizar seus pensamentos e não se deixa dominar pela sobrecarga mental.",
    icon: "🧠",
  },
  "Ser ouvida": {
    low: "Você pode sentir que suas opiniões, sentimentos e necessidades não são validados pelas pessoas ao seu redor, gerando frustração silenciosa.",
    high: "Você se sente acolhida e respeitada nas suas relações, o que fortalece sua autoconfiança.",
    icon: "👂",
  },
  "Relacionamento conjugal": {
    low: "O relacionamento pode estar gerando mais desgaste do que acolhimento, com distância emocional, conflitos repetitivos ou solidão a dois.",
    high: "Seu relacionamento é fonte de apoio e parceria, o que contribui para seu equilíbrio emocional.",
    icon: "💑",
  },
  "Carga de responsabilidades": {
    low: "Você pode estar carregando sozinha responsabilidades que deveriam ser compartilhadas, gerando ressentimento e exaustão.",
    high: "Você consegue equilibrar responsabilidades e não se sobrecarrega além do necessário.",
    icon: "⚖️",
  },
  "Alegria no dia a dia": {
    low: "Os dias podem parecer repetitivos e sem cor, com poucos momentos de prazer genuíno ou leveza.",
    high: "Você encontra motivos para sorrir e se conectar com momentos de felicidade no cotidiano.",
    icon: "🌸",
  },
  "Pensamentos repetitivos": {
    low: "Pensamentos intrusivos e repetitivos podem estar consumindo sua energia, impedindo que você viva o presente com tranquilidade.",
    high: "Você consegue interromper ciclos de pensamento negativo e manter foco no que importa.",
    icon: "🔄",
  },
  "Sentimento de solidão": {
    low: "Mesmo rodeada de pessoas, você pode se sentir profundamente sozinha — como se ninguém realmente entendesse o que você vive.",
    high: "Você se sente conectada e pertencente, com relações que oferecem suporte emocional verdadeiro.",
    icon: "🤝",
  },
  "Tempo para si mesma": {
    low: "Você pode ter perdido o hábito de cuidar de si mesma, sempre colocando as necessidades dos outros em primeiro lugar.",
    high: "Você preserva momentos para si e entende que cuidar de você não é egoísmo.",
    icon: "🕐",
  },
  "Esperança no relacionamento": {
    low: "A esperança de que as coisas melhorem pode estar frágil, gerando uma sensação de estagnação ou resignação.",
    high: "Você acredita na possibilidade de evolução do seu relacionamento e investe nessa direção.",
    icon: "🌅",
  },
  Reconhecimento: {
    low: "Você pode sentir que seus esforços passam despercebidos, que ninguém reconhece tudo que você faz pela família e pelo relacionamento.",
    high: "Você se sente valorizada pelo que faz e pelo que é, o que alimenta sua motivação.",
    icon: "🏆",
  },
  "Força interior": {
    low: "Você pode estar se sentindo frágil, como se tivesse perdido a conexão com a mulher forte que sempre foi.",
    high: "Você possui uma base emocional sólida que te sustenta mesmo nos momentos difíceis.",
    icon: "💎",
  },
};

function generateReport(
  scores: Record<string, number>,
  userName: string,
  age: number
) {
  const entries = Object.entries(scores).sort((a, b) => a[1] - b[1]);
  const weakAreas = entries.slice(0, 3);
  const strongAreas = entries.slice(-3).reverse();
  const avg =
    entries.reduce((sum, [, v]) => sum + v, 0) / (entries.length || 1);
  const allLow = entries.filter(([, v]) => v <= 4);
  const allHigh = entries.filter(([, v]) => v >= 7);

  // Holistic shape interpretation
  let holistic: string;
  const range =
    (entries[entries.length - 1]?.[1] ?? 0) - (entries[0]?.[1] ?? 0);

  if (avg <= 4) {
    holistic = `${userName}, sua roda mostra um momento de grande sobrecarga emocional. Quando várias áreas da vida estão com notas baixas ao mesmo tempo, é sinal de que você precisa de apoio — e reconhecer isso já é um ato de coragem. Você não precisa resolver tudo sozinha.`;
  } else if (avg >= 7) {
    holistic = `${userName}, sua roda revela uma mulher com bases emocionais fortes. Mesmo assim, algumas áreas merecem atenção para que pequenos desgastes não se acumulem com o tempo. Manter esse equilíbrio requer consciência e cuidado contínuo.`;
  } else if (range >= 6) {
    holistic = `${userName}, sua roda mostra um desequilíbrio significativo — algumas áreas estão bem enquanto outras pedem atenção urgente. Esse contraste pode gerar uma sensação de "viver pela metade", onde parte da sua vida funciona mas outra parte drena toda a sua energia.`;
  } else {
    holistic = `${userName}, sua roda mostra áreas que precisam de cuidado e outras que revelam recursos internos importantes. Este é um momento ideal para reorganizar prioridades e construir um caminho mais equilibrado.`;
  }

  // Summary
  const summary = `Aos ${age} anos, ${userName}, sua análise emocional revela ${allLow.length} área${allLow.length !== 1 ? "s" : ""} que ${allLow.length !== 1 ? "pedem" : "pede"} atenção especial e ${allHigh.length} área${allHigh.length !== 1 ? "s" : ""} de força interior. Entender esse mapa é o primeiro passo para transformar consciência em mudança real.`;

  // Weak areas with descriptions
  const weak_areas = weakAreas.map(([topic, score]) => ({
    topic,
    score,
    icon: topicInsights[topic]?.icon ?? "⚠️",
    description: topicInsights[topic]?.low ?? "Esta área precisa de atenção.",
  }));

  // Strong areas
  const strong_areas = strongAreas.map(([topic, score]) => ({
    topic,
    score,
    icon: topicInsights[topic]?.icon ?? "✨",
    description:
      topicInsights[topic]?.high ?? "Esta é uma área de força na sua vida.",
  }));

  // Recommendation
  const recommendation = `A Mentoria em Inteligência Relacional da Sueli Custódio trabalha exatamente as áreas que apareceram com mais fragilidade na sua roda. Com mais de 20 anos de experiência acompanhando mulheres em momentos de transição emocional, Sueli utiliza uma metodologia própria que combina escuta ativa, reorganização emocional e ferramentas práticas para você retomar o protagonismo da sua vida e dos seus relacionamentos.`;

  return {
    summary,
    weak_areas,
    strong_areas,
    holistic_interpretation: holistic,
    recommendation,
    average_score: Math.round(avg * 10) / 10,
    generated_at: new Date().toISOString(),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scores, user_name, age, record_id } = await req.json();

    if (!scores || !user_name || !age) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const report = generateReport(scores, user_name, age);

    // Save report to database
    if (record_id) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );
      await supabase
        .from("roda_vida_responses")
        .update({ ai_report: report })
        .eq("id", record_id);
    }

    return new Response(JSON.stringify(report), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("generate-roda-report error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
