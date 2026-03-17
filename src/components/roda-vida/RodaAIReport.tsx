import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface ReportArea {
  topic: string;
  score: number;
  icon: string;
  description: string;
}

export interface RodaReport {
  summary: string;
  weak_areas: ReportArea[];
  strong_areas: ReportArea[];
  holistic_interpretation: string;
  recommendation: string;
  average_score: number;
  generated_at: string;
}

interface Props {
  scores: Record<string, number>;
  userName: string;
  age: number;
  recordId: string | null;
  onReportGenerated?: (report: RodaReport) => void;
}

export const RodaAIReport = ({ scores, userName, age, recordId, onReportGenerated }: Props) => {
  const [report, setReport] = useState<RodaReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generate = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('generate-roda-report', {
          body: {
            scores,
            user_name: userName,
            age,
            record_id: recordId,
          },
        });
        if (error) throw error;
        setReport(data);
        onReportGenerated?.(data);
      } catch (err) {
        console.error('Report generation failed:', err);
      } finally {
        setLoading(false);
      }
    };
    generate();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!report) return null;

  const firstName = userName.split(' ')[0];

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-5">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-playfair text-ink-900">
          Seu Mapa Emocional, {firstName}
        </h2>
        <div className="w-16 h-px bg-brand-300 mx-auto" />
      </div>

      {/* Summary */}
      <p className="text-ink-700 text-center leading-relaxed max-w-2xl mx-auto text-sm">
        {report.summary}
        {report.holistic_interpretation && (
          <span className="block mt-2 italic text-ink-600">{report.holistic_interpretation}</span>
        )}
      </p>

      {/* Two-column grid: weak + strong */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Weak areas — left column */}
        <div className="space-y-3">
          <h3 className="text-lg font-playfair text-ink-900 text-center md:text-left">
            Áreas que pedem atenção
          </h3>
          {report.weak_areas.map((area) => (
            <Card key={area.topic} className="rounded-xl border-destructive/20 bg-card shadow-sm overflow-hidden">
              <CardContent className="p-4 flex gap-3">
                <div className="text-2xl shrink-0 mt-0.5">{area.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-ink-900 text-sm">{area.topic}</span>
                    <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                      {area.score * 10}%
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{area.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Strong areas — right column */}
        <div className="space-y-3">
          <h3 className="text-lg font-playfair text-ink-900 text-center md:text-left">
            Seus Recursos Internos
          </h3>
          {report.strong_areas.map((area) => (
            <Card key={area.topic} className="rounded-xl border-brand-200 bg-card shadow-sm overflow-hidden">
              <CardContent className="p-4 flex gap-3">
                <div className="text-2xl shrink-0 mt-0.5">{area.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-ink-900 text-sm">{area.topic}</span>
                    <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                      {area.score * 10}%
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{area.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <Card className="rounded-2xl border-brand-300 bg-gradient-to-br from-brand-50 to-card shadow-sm">
        <CardContent className="p-5 text-center space-y-2">
          <h3 className="text-xl font-playfair text-ink-900">
            Por que a Mentoria Relacional?
          </h3>
          <p className="text-ink-700 text-sm leading-relaxed">
            {report.recommendation}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
