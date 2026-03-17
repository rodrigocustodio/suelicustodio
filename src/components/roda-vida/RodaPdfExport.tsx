import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface Props {
  userName: string;
  age: number;
}

export const RodaPdfExport = ({ userName, age }: Props) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Button
        onClick={handlePrint}
        variant="outline"
        className="rounded-xl border-brand-300 text-brand-700 hover:bg-brand-50"
      >
        <Download className="w-4 h-4 mr-2" />
        Baixar minha Roda em PDF
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
            padding: 40px;
          }
          @page { size: A4 portrait; margin: 20mm; }
        }
      `}</style>

      {/* Hidden print layout */}
      <div id="roda-print-area" className="hidden print:block">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Análise do Estado Emocional
          </h1>
          <p className="text-gray-500">Roda da Inteligência Relacional</p>
        </div>

        <div className="mb-6 text-sm text-gray-700">
          <p><strong>Nome:</strong> {userName}</p>
          <p><strong>Idade:</strong> {age} anos</p>
          <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        {/* The chart will be visible via #roda-chart-container */}
        <div id="roda-chart-print" className="my-8" />

        <div className="border-t pt-4 mt-12 text-center text-xs text-gray-500">
          <p className="font-semibold">Mentora Sueli Custódio</p>
          <p>Email: sueliscustodio@gmail.com</p>
          <p>WhatsApp: (11) 95170-1226</p>
        </div>
      </div>
    </>
  );
};
