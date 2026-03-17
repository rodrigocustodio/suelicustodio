import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { RodaReport } from './RodaAIReport';

interface Props {
  userName: string;
  age: number;
  report: RodaReport | null;
}

export const RodaPdfExport = ({ userName, age, report }: Props) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Button
        onClick={handlePrint}
        disabled={!report}
        variant="outline"
        className="rounded-xl border-brand-300 text-brand-700 hover:bg-brand-50"
      >
        <Download className="w-4 h-4 mr-2" />
        {report ? 'Baixar Relatório em PDF' : 'Gerando relatório...'}
      </Button>

      {/* Print-only styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #roda-print-area, #roda-print-area * { visibility: visible; }
          #roda-print-area {
            position: absolute;
            left: 0; top: 0;
            width: 100%;
            padding: 32px 40px;
            font-family: 'Inter', sans-serif;
            color: #1E1E1E;
          }
          @page { size: A4 portrait; margin: 16mm; }
          .print-break { page-break-before: always; }
        }
      `}</style>

      {/* Hidden print layout - professional report */}
      <div id="roda-print-area" className="hidden print:block">
        {/* Header */}
        <div className="text-center mb-6 pb-4 border-b-2 border-gray-200">
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
            Relatório de Inteligência Relacional
          </h1>
          <p className="text-sm text-gray-500">Análise personalizada do estado emocional</p>
        </div>

        {/* User info */}
        <div className="flex justify-between text-sm text-gray-700 mb-6">
          <div>
            <p><strong>Nome:</strong> {userName}</p>
            <p><strong>Idade:</strong> {age} anos</p>
          </div>
          <div className="text-right">
            <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
            {report && (
              <p><strong>Pontuação média:</strong> {report.average_score}/10</p>
            )}
          </div>
        </div>

        {/* Chart placeholder */}
        <div id="roda-chart-print" className="my-4" />

        {report && (
          <>
            {/* Summary */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Visão Geral
              </h2>
              <p className="text-sm leading-relaxed">{report.summary}</p>
              <p className="text-sm leading-relaxed mt-2 italic text-gray-600">
                {report.holistic_interpretation}
              </p>
            </div>

            {/* Weak areas */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Áreas que Pedem Atenção
              </h2>
              {report.weak_areas.map((area) => (
                <div key={area.topic} className="mb-3 pl-4 border-l-3 border-red-300">
                  <p className="text-sm font-semibold">
                    {area.icon} {area.topic} — nota {area.score}/10
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>

            {/* Strong areas */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Seus Recursos Internos
              </h2>
              {report.strong_areas.map((area) => (
                <div key={area.topic} className="mb-3 pl-4 border-l-3 border-green-300">
                  <p className="text-sm font-semibold">
                    {area.icon} {area.topic} — nota {area.score}/10
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>

            {/* Recommendation */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Recomendação
              </h2>
              <p className="text-sm leading-relaxed">{report.recommendation}</p>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="border-t-2 border-gray-200 pt-4 mt-8">
          <div className="flex justify-between items-end text-xs text-gray-500">
            <div>
              <p className="font-bold text-sm text-gray-700">Mentora Sueli Custódio</p>
              <p>Especialista em Inteligência Relacional</p>
              <p>WhatsApp: (11) 95170-1226</p>
              <p>Email: sueliscustodio@gmail.com</p>
            </div>
            <div className="text-right">
              <p>Este relatório é um instrumento de</p>
              <p>consciência emocional, não um diagnóstico clínico.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
