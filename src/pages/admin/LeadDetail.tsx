import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { quizQuestions } from '@/lib/quiz-data';

const fmt = (date: string) => format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
const fmtDate = (date: string) => format(new Date(date + 'T00:00:00'), 'dd/MM/yyyy', { locale: ptBR });

/* ── labelled field ── */
const Field = ({ label, value, full }: { label: string; value: React.ReactNode; full?: boolean }) => (
  <div className={full ? 'col-span-full' : ''}>
    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
    <div className="text-sm text-foreground">{value ?? '—'}</div>
  </div>
);

const YesNo = ({ v }: { v: boolean | null }) => (
  <Badge variant={v ? 'default' : 'outline'}>{v ? 'Sim' : 'Não'}</Badge>
);

/* ── score bar ── */
const ScoreBar = ({ label, score }: { label: string; score: number }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm font-medium w-[160px] shrink-0">{label}</span>
    <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${score * 10}%` }}
      />
    </div>
    <span className="text-sm font-semibold w-10 text-right">{score}/10</span>
  </div>
);

/* ── quiz answer mapper ── */
function renderQuizAnswers(answers: Record<string, string>) {
  return quizQuestions.map((q) => {
    const chosen = answers[String(q.id)];
    const option = q.options.find((o) => o.value === chosen);
    return (
      <div key={q.id} className="border-b border-border pb-2 last:border-0">
        <p className="text-sm font-medium text-foreground">{q.id}. {q.text}</p>
        <p className="text-sm text-muted-foreground ml-4">
          → {option ? `${option.label}) ${option.text}` : chosen ?? 'Não respondida'}
        </p>
      </div>
    );
  });
}

/* ── AI report renderer ── */
function renderAIReport(report: any) {
  if (!report || (typeof report === 'object' && Object.keys(report).length === 0)) return null;

  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Relatório IA</CardTitle></CardHeader>
      <CardContent className="space-y-5">
        {report.summary && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Resumo</p>
            <p className="text-sm leading-relaxed">{report.summary}</p>
          </div>
        )}
        {report.holistic_interpretation && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Visão Holística</p>
            <p className="text-sm leading-relaxed italic">{report.holistic_interpretation}</p>
          </div>
        )}
        {report.weak_areas?.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Áreas que pedem atenção</p>
            <div className="space-y-2">
              {report.weak_areas.map((a: any) => (
                <div key={a.topic} className="flex gap-3 bg-destructive/5 rounded-lg p-3">
                  <span className="text-xl">{a.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">{a.topic}</span>
                      <Badge variant="destructive" className="text-xs">{a.score * 10}%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {report.strong_areas?.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Recursos Internos</p>
            <div className="space-y-2">
              {report.strong_areas.map((a: any) => (
                <div key={a.topic} className="flex gap-3 bg-primary/5 rounded-lg p-3">
                  <span className="text-xl">{a.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">{a.topic}</span>
                      <Badge className="text-xs bg-primary/10 text-primary">{a.score * 10}%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {report.recommendation && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Recomendação</p>
            <p className="text-sm leading-relaxed">{report.recommendation}</p>
          </div>
        )}
        {report.average_score != null && (
          <div className="text-sm">Média geral: <span className="font-semibold">{report.average_score}/10</span></div>
        )}
      </CardContent>
    </Card>
  );
}

/* ══════════════════════════════════════════════ */
const tableMap: Record<string, string> = {
  message: 'contact_messages',
  quiz: 'quiz_responses',
  mentoria: 'mentoria_inscricoes',
  roda: 'roda_vida_responses',
};

const titleMap: Record<string, string> = {
  message: 'Mensagem de Contato',
  quiz: 'Resposta do Quiz',
  mentoria: 'Inscrição na Mentoria',
  roda: 'Roda da Vida',
};

const LeadDetail = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
    if (!authLoading && user && !isAdmin) navigate('/');
  }, [authLoading, user, isAdmin]);

  useEffect(() => {
    if (!isAdmin || !type || !id) return;
    const table = tableMap[type];
    if (!table) return;

    (async () => {
      const { data: row, error } = await supabase
        .from(table as any)
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (!error && row) setData(row);
      setLoading(false);
    })();
  }, [isAdmin, type, id]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background p-8 max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Registro não encontrado.</p>
        <Button variant="outline" onClick={() => navigate('/admin')}>Voltar</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back + Title */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-playfair font-bold">{titleMap[type!] ?? 'Detalhe'}</h1>
        </div>

        {/* ─── MESSAGE ─── */}
        {type === 'message' && (
          <>
            <Card>
              <CardHeader><CardTitle className="text-lg">Dados do Contato</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Field label="Nome" value={data.name} />
                <Field label="Email" value={data.email} />
                <Field label="WhatsApp" value={data.whatsapp} />
                <Field label="Página de origem" value={data.source_page} />
                <Field label="Data" value={fmt(data.created_at)} />
                <Field label="Status" value={<Badge variant={data.read ? 'secondary' : 'default'}>{data.read ? 'Lida' : 'Nova'}</Badge>} />
                <Field label="Consentimento contato" value={<YesNo v={data.consent_contact} />} />
                <Field label="Consentimento privacidade" value={<YesNo v={data.consent_privacy} />} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Mensagem</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{data.message}</p>
              </CardContent>
            </Card>
          </>
        )}

        {/* ─── QUIZ ─── */}
        {type === 'quiz' && (
          <>
            <Card>
              <CardHeader><CardTitle className="text-lg">Dados do Lead</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Field label="Nome" value={data.name} />
                <Field label="Email" value={data.email} />
                <Field label="WhatsApp" value={data.whatsapp} />
                <Field label="Data" value={fmt(data.created_at)} />
                <Field label="Sobrecarga" value={<Badge variant={data.overload_score === 'alto' ? 'destructive' : 'secondary'}>{data.overload_score}</Badge>} />
                <Field label="Consciência" value={data.awareness_level} />
                <Field label="Perfil DISC" value={<Badge>{data.disc_profile}</Badge>} />
                <Field label="Marketing" value={<YesNo v={data.consent_marketing} />} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Respostas</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {data.answers && typeof data.answers === 'object'
                  ? renderQuizAnswers(data.answers as Record<string, string>)
                  : <p className="text-sm text-muted-foreground">Sem respostas detalhadas.</p>}
              </CardContent>
            </Card>
          </>
        )}

        {/* ─── MENTORIA ─── */}
        {type === 'mentoria' && (
          <>
            <Card>
              <CardHeader><CardTitle className="text-lg">Dados da Inscrição</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Field label="Nome completo" value={data.nome_completo} />
                <Field label="Data de nascimento" value={fmtDate(data.data_nascimento)} />
                <Field label="Email" value={data.email} />
                <Field label="Contato" value={data.contato} />
                <Field label="Forma de pagamento" value={
                  <Badge>{data.forma_pagamento === 'pix' ? 'PIX' : data.forma_pagamento === 'remitly' ? 'Remitly' : 'Cartão'}</Badge>
                } />
                <Field label="Origem" value={<Badge variant="outline">{data.source_page === 'gosix' ? 'GoSix (EUA)' : 'Brasil'}</Badge>} />
                <Field label="Consentimento" value={<YesNo v={data.consent_privacy} />} />
                <Field label="Data" value={fmt(data.created_at)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Expectativa</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{data.expectativa}</p>
              </CardContent>
            </Card>
          </>
        )}

        {/* ─── RODA DA VIDA ─── */}
        {type === 'roda' && (
          <>
            <Card>
              <CardHeader><CardTitle className="text-lg">Dados do Lead</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Field label="Nome" value={`${data.user_name} ${data.user_lastname}`} />
                <Field label="Idade" value={data.age} />
                <Field label="Email" value={data.email} />
                <Field label="WhatsApp" value={data.whatsapp} />
                <Field label="Data" value={fmt(data.created_at)} />
                <Field label="Clicou WhatsApp CTA" value={<YesNo v={data.whatsapp_clicked} />} />
              </CardContent>
            </Card>

            {data.scores && typeof data.scores === 'object' && Object.keys(data.scores).length > 0 && (
              <Card>
                <CardHeader><CardTitle className="text-lg">Pontuações</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(data.scores as Record<string, number>).map(([area, score]) => (
                    <ScoreBar key={area} label={area} score={Number(score)} />
                  ))}
                </CardContent>
              </Card>
            )}

            {renderAIReport(data.ai_report)}
          </>
        )}
      </div>
    </div>
  );
};

export default LeadDetail;
