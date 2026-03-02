import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowRight } from 'lucide-react';

interface QuizResultProps {
  name: string;
  overloadScore: string;
}

const resultData: Record<string, { title: string; emoji: string; color: string; description: string; message: string }> = {
  baixo: {
    title: 'Nível Leve',
    emoji: '🌿',
    color: 'hsl(142, 50%, 45%)',
    description: 'Você demonstra equilíbrio emocional na maioria das situações. Isso é ótimo! Mas mesmo quem está bem pode se beneficiar de ferramentas para manter esse equilíbrio.',
    message: 'Você está num bom caminho. Agora imagine como seria fortalecer ainda mais essa base emocional com um método estruturado.',
  },
  'médio': {
    title: 'Nível Moderado',
    emoji: '🌤️',
    color: 'hsl(40, 80%, 50%)',
    description: 'Você carrega mais peso emocional do que percebe. Existem padrões que estão drenando sua energia sem você notar — e isso pode se intensificar com o tempo.',
    message: 'Você não precisa esperar chegar ao limite. A maioria das mulheres que procuram ajuda estão exatamente nesse ponto — e é aqui que a transformação começa.',
  },
  alto: {
    title: 'Nível Elevado',
    emoji: '🔥',
    color: 'hsl(15, 80%, 50%)',
    description: 'Seu nível de sobrecarga emocional é alto. Você está se doando além do que consegue sustentar, e isso afeta sua saúde, seus relacionamentos e sua autoestima.',
    message: 'Você já deu o primeiro passo ao reconhecer isso. Agora precisa de um método que te ajude a sair desse ciclo — e ele existe.',
  },
};

export const QuizResult = ({ name, overloadScore }: QuizResultProps) => {
  const navigate = useNavigate();
  const resultRef = useRef<HTMLDivElement>(null);
  const result = resultData[overloadScore] || resultData['médio'];

  const firstName = name.split(' ')[0];

  // Auto-redirect to VSL after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/vsl?autoplay=1');
    }, 30000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleDownload = () => {
    // Generate a simple text report for download
    const reportContent = `
═══════════════════════════════════════
   RELATÓRIO DE SOBRECARGA EMOCIONAL
   Programa Autoestima Inabalável
═══════════════════════════════════════

Olá, ${firstName}!

Seu resultado: ${result.emoji} ${result.title}

${result.description}

${result.message}

───────────────────────────────────────

Este relatório foi gerado pelo Teste de
Sobrecarga Emocional da Sueli Custódio.

Quer dar o próximo passo?
Acesse: https://suelicustodio.lovable.app/vsl

© ${new Date().getFullYear()} Sueli Custódio
Todos os direitos reservados.
═══════════════════════════════════════
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-sobrecarga-${firstName.toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={resultRef} className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10">
      <div className="w-full max-w-md">
        {/* Greeting */}
        <p className="font-inter text-ink-500 text-sm text-center mb-2">
          {firstName}, seu resultado está pronto:
        </p>

        {/* Result Card */}
        <div
          className="relative bg-white rounded-2xl p-8 shadow-card border border-brand-100/50 text-center mb-6 overflow-hidden"
        >
          {/* Decorative accent */}
          <div
            className="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, ${result.color}, ${result.color}80)` }}
          />

          <span className="text-5xl mb-4 block">{result.emoji}</span>

          <h2 className="font-playfair text-2xl md:text-3xl text-ink-900 mb-2">
            {result.title}
          </h2>

          <p className="font-inter text-sm uppercase tracking-widest mb-6" style={{ color: result.color }}>
            Sobrecarga Emocional
          </p>

          <p className="font-inter text-ink-700 text-base leading-relaxed mb-4">
            {result.description}
          </p>

          <div className="h-px bg-brand-100 my-6" />

          <p className="font-inter text-ink-600 text-sm leading-relaxed italic">
            "{result.message}"
          </p>
        </div>

        {/* Download */}
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-brand-200 text-ink-700 font-inter font-medium text-sm hover:bg-brand-50 transition-colors mb-4"
        >
          <Download className="w-4 h-4" />
          Baixar meu relatório
        </button>

        {/* Persuasive bridge */}
        <div className="bg-brand-50 rounded-2xl p-6 text-center mb-6 border border-brand-100/50">
          <p className="font-playfair text-lg text-ink-900 mb-3 leading-snug">
            Eu gravei um vídeo explicando exatamente o que esse resultado significa.
          </p>
          <p className="font-inter text-ink-600 text-sm leading-relaxed">
            No vídeo, a Sueli mostra o padrão por trás da sobrecarga — e o caminho prático para sair dele.
          </p>
        </div>

        {/* CTA to VSL */}
        <button
          onClick={() => navigate('/vsl?autoplay=1')}
          className="group w-full py-4 rounded-xl bg-cta-500 hover:bg-cta-600 active:bg-cta-700 text-white font-inter font-bold text-lg transition-all shadow-[0_4px_20px_rgba(255,107,53,0.35)] hover:shadow-[0_6px_28px_rgba(255,107,53,0.45)]"
        >
          ASSISTIR O VÍDEO AGORA
          <ArrowRight className="inline-block w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="font-inter text-xs text-ink-400 text-center mt-3 animate-pulse">
          Redirecionando em alguns segundos...
        </p>
      </div>
    </div>
  );
};
