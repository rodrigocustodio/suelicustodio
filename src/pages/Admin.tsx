import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  whatsapp: string | null;
  message: string;
  read: boolean;
  consent_contact: boolean;
  consent_privacy: boolean;
  source_page: string | null;
}

interface QuizResponse {
  id: string;
  created_at: string;
  name: string;
  email: string;
  whatsapp: string;
  overload_score: string;
  awareness_level: string;
  disc_profile: string;
  consent_marketing: boolean;
  answers: Record<string, any>;
}

interface MentoriaInscricao {
  id: string;
  created_at: string;
  nome_completo: string;
  data_nascimento: string;
  email: string;
  contato: string;
  expectativa: string;
  forma_pagamento: string;
  source_page: string;
}

interface RodaVidaResponse {
  id: string;
  created_at: string;
  user_name: string;
  user_lastname: string;
  email: string;
  age: number;
  whatsapp: string;
  scores: Record<string, number>;
  whatsapp_clicked: boolean;
  ai_report: any;
}

const ExpandButton = ({ expanded, onClick }: { expanded: boolean; onClick: () => void }) => (
  <Button size="sm" variant="ghost" onClick={onClick} className="gap-1">
    {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    {expanded ? 'Fechar' : 'Ver'}
  </Button>
);

const DetailRow = ({ expanded, colSpan, children }: { expanded: boolean; colSpan: number; children: React.ReactNode }) => {
  if (!expanded) return null;
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="bg-muted/30 p-6">
        {children}
      </TableCell>
    </TableRow>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [quizResponses, setQuizResponses] = useState<QuizResponse[]>([]);
  const [mentoriaInscricoes, setMentoriaInscricoes] = useState<MentoriaInscricao[]>([]);
  const [rodaVidaResponses, setRodaVidaResponses] = useState<RodaVidaResponse[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const [expandedMsg, setExpandedMsg] = useState<string | null>(null);
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);
  const [expandedMentoria, setExpandedMentoria] = useState<string | null>(null);
  const [expandedGoSix, setExpandedGoSix] = useState<string | null>(null);
  const [expandedRoda, setExpandedRoda] = useState<string | null>(null);

  const toggle = (current: string | null, id: string, setter: (v: string | null) => void) => {
    setter(current === id ? null : id);
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!loading && !isAdmin && user) {
      toast({
        title: 'Acesso negado',
        description: 'Você não tem permissão para acessar esta página.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [isAdmin, loading, user, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchMessages();
      fetchQuizResponses();
      fetchMentoriaInscricoes();
      fetchRodaVidaResponses();
    }
  }, [isAdmin]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMessages(data || []);
    } catch {
      toast({ title: 'Erro ao carregar mensagens', variant: 'destructive' });
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchMentoriaInscricoes = async () => {
    try {
      const { data, error } = await supabase
        .from('mentoria_inscricoes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMentoriaInscricoes(data || []);
    } catch {
      toast({ title: 'Erro ao carregar inscrições', variant: 'destructive' });
    }
  };

  const fetchQuizResponses = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setQuizResponses(data || []);
    } catch {
      toast({ title: 'Erro ao carregar respostas do quiz', variant: 'destructive' });
    }
  };

  const fetchRodaVidaResponses = async () => {
    try {
      const { data, error } = await supabase
        .from('roda_vida_responses')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setRodaVidaResponses((data as any[]) || []);
    } catch {
      toast({ title: 'Erro ao carregar Roda da Vida', variant: 'destructive' });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleRead = async (id: string, currentReadStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: !currentReadStatus })
        .eq('id', id);
      if (error) throw error;
      setMessages(messages.map(msg => msg.id === id ? { ...msg, read: !currentReadStatus } : msg));
      toast({ title: 'Status atualizado' });
    } catch {
      toast({ title: 'Erro ao atualizar', variant: 'destructive' });
    }
  };

  if (loading || loadingMessages) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-playfair font-bold mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">Bem-vindo, {user?.email}</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">Sair</Button>
        </div>

        {/* Contact Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Mensagens de Contato</CardTitle>
            <CardDescription>Total de {messages.length} mensagens</CardDescription>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhuma mensagem recebida ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Página</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((msg) => (
                      <>
                        <TableRow key={msg.id}>
                          <TableCell>{format(new Date(msg.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                          <TableCell className="font-medium">{msg.name}</TableCell>
                          <TableCell>{msg.email}</TableCell>
                          <TableCell>{msg.whatsapp || '-'}</TableCell>
                          <TableCell><Badge variant="outline">{msg.source_page || 'N/A'}</Badge></TableCell>
                          <TableCell>
                            <Badge variant={msg.read ? 'secondary' : 'default'}>{msg.read ? 'Lida' : 'Nova'}</Badge>
                          </TableCell>
                          <TableCell className="flex gap-1">
                            <ExpandButton expanded={expandedMsg === msg.id} onClick={() => toggle(expandedMsg, msg.id, setExpandedMsg)} />
                            <Button size="sm" variant="ghost" onClick={() => toggleRead(msg.id, msg.read)}>
                              {msg.read ? 'Nova' : 'Lida'}
                            </Button>
                          </TableCell>
                        </TableRow>
                        <DetailRow expanded={expandedMsg === msg.id} colSpan={7}>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-semibold text-muted-foreground mb-1">Mensagem:</p>
                              <p className="whitespace-pre-wrap">{msg.message}</p>
                            </div>
                            <div className="flex gap-4 text-sm">
                              <span>Consentimento contato: <Badge variant={msg.consent_contact ? 'default' : 'outline'}>{msg.consent_contact ? 'Sim' : 'Não'}</Badge></span>
                              <span>Consentimento privacidade: <Badge variant={msg.consent_privacy ? 'default' : 'outline'}>{msg.consent_privacy ? 'Sim' : 'Não'}</Badge></span>
                            </div>
                          </div>
                        </DetailRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quiz Responses */}
        <Card>
          <CardHeader>
            <CardTitle>Respostas do Quiz</CardTitle>
            <CardDescription>Total de {quizResponses.length} cadastros do teste de sobrecarga</CardDescription>
          </CardHeader>
          <CardContent>
            {quizResponses.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhuma resposta recebida ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Sobrecarga</TableHead>
                      <TableHead>Consciência</TableHead>
                      <TableHead>DISC</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizResponses.map((resp) => (
                      <>
                        <TableRow key={resp.id}>
                          <TableCell>{format(new Date(resp.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                          <TableCell className="font-medium">{resp.name}</TableCell>
                          <TableCell>{resp.email}</TableCell>
                          <TableCell>{resp.whatsapp}</TableCell>
                          <TableCell>
                            <Badge variant={resp.overload_score === 'alto' ? 'destructive' : resp.overload_score === 'moderado' ? 'default' : 'secondary'}>
                              {resp.overload_score}
                            </Badge>
                          </TableCell>
                          <TableCell>{resp.awareness_level}</TableCell>
                          <TableCell>{resp.disc_profile}</TableCell>
                          <TableCell>
                            <ExpandButton expanded={expandedQuiz === resp.id} onClick={() => toggle(expandedQuiz, resp.id, setExpandedQuiz)} />
                          </TableCell>
                        </TableRow>
                        <DetailRow expanded={expandedQuiz === resp.id} colSpan={8}>
                          <div className="space-y-3">
                            <p className="text-sm font-semibold text-muted-foreground">Respostas do Quiz:</p>
                            {resp.answers && typeof resp.answers === 'object' ? (
                              <div className="grid gap-2">
                                {Object.entries(resp.answers).map(([key, value]) => (
                                  <div key={key} className="flex gap-2 text-sm">
                                    <span className="font-medium min-w-[120px]">{key}:</span>
                                    <span>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">Sem respostas detalhadas.</p>
                            )}
                            <div className="text-sm">
                              Marketing: <Badge variant={resp.consent_marketing ? 'default' : 'outline'}>{resp.consent_marketing ? 'Sim' : 'Não'}</Badge>
                            </div>
                          </div>
                        </DetailRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mentoria Brasil */}
        <Card>
          <CardHeader>
            <CardTitle>Inscrições da Mentoria (Brasil)</CardTitle>
            <CardDescription>Total de {mentoriaInscricoes.filter(i => i.source_page !== 'gosix').length} inscrições</CardDescription>
          </CardHeader>
          <CardContent>
            {mentoriaInscricoes.filter(i => i.source_page !== 'gosix').length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhuma inscrição recebida ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Nascimento</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Pagamento</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mentoriaInscricoes.filter(i => i.source_page !== 'gosix').map((insc) => (
                      <>
                        <TableRow key={insc.id}>
                          <TableCell>{format(new Date(insc.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                          <TableCell className="font-medium">{insc.nome_completo}</TableCell>
                          <TableCell>{format(new Date(insc.data_nascimento + 'T00:00:00'), 'dd/MM/yyyy', { locale: ptBR })}</TableCell>
                          <TableCell>{insc.email}</TableCell>
                          <TableCell>{insc.contato}</TableCell>
                          <TableCell>
                            <Badge variant={insc.forma_pagamento === 'pix' ? 'default' : 'secondary'}>
                              {insc.forma_pagamento === 'pix' ? 'PIX' : 'Cartão'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <ExpandButton expanded={expandedMentoria === insc.id} onClick={() => toggle(expandedMentoria, insc.id, setExpandedMentoria)} />
                          </TableCell>
                        </TableRow>
                        <DetailRow expanded={expandedMentoria === insc.id} colSpan={7}>
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">Expectativa:</p>
                            <p className="whitespace-pre-wrap">{insc.expectativa}</p>
                          </div>
                        </DetailRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* GoSix USA */}
        <Card>
          <CardHeader>
            <CardTitle>Inscrições GoSix (EUA)</CardTitle>
            <CardDescription>Total de {mentoriaInscricoes.filter(i => i.source_page === 'gosix').length} inscrições</CardDescription>
          </CardHeader>
          <CardContent>
            {mentoriaInscricoes.filter(i => i.source_page === 'gosix').length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhuma inscrição recebida ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Nascimento</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone (US)</TableHead>
                      <TableHead>Pagamento</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mentoriaInscricoes.filter(i => i.source_page === 'gosix').map((insc) => (
                      <>
                        <TableRow key={insc.id}>
                          <TableCell>{format(new Date(insc.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                          <TableCell className="font-medium">{insc.nome_completo}</TableCell>
                          <TableCell>{format(new Date(insc.data_nascimento + 'T00:00:00'), 'dd/MM/yyyy', { locale: ptBR })}</TableCell>
                          <TableCell>{insc.email}</TableCell>
                          <TableCell>{insc.contato}</TableCell>
                          <TableCell>
                            <Badge variant={insc.forma_pagamento === 'remitly' ? 'default' : 'secondary'}>
                              {insc.forma_pagamento === 'remitly' ? 'Remitly' : 'Cartão'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <ExpandButton expanded={expandedGoSix === insc.id} onClick={() => toggle(expandedGoSix, insc.id, setExpandedGoSix)} />
                          </TableCell>
                        </TableRow>
                        <DetailRow expanded={expandedGoSix === insc.id} colSpan={7}>
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">Expectativa:</p>
                            <p className="whitespace-pre-wrap">{insc.expectativa}</p>
                          </div>
                        </DetailRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Roda da Vida */}
        <Card>
          <CardHeader>
            <CardTitle>Roda da Vida — Análise Emocional</CardTitle>
            <CardDescription>
              Total de {rodaVidaResponses.length} análises | {rodaVidaResponses.filter(r => r.whatsapp_clicked).length} clicaram no WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            {rodaVidaResponses.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhuma análise realizada ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Idade</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>WA CTA</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rodaVidaResponses.map((resp) => (
                      <>
                        <TableRow key={resp.id}>
                          <TableCell>{format(new Date(resp.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                          <TableCell className="font-medium">{resp.user_name} {resp.user_lastname}</TableCell>
                          <TableCell>{resp.email}</TableCell>
                          <TableCell>{resp.age}</TableCell>
                          <TableCell>{resp.whatsapp}</TableCell>
                          <TableCell>
                            <Badge variant={resp.whatsapp_clicked ? 'default' : 'outline'}>
                              {resp.whatsapp_clicked ? 'Sim' : 'Não'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <ExpandButton expanded={expandedRoda === resp.id} onClick={() => toggle(expandedRoda, resp.id, setExpandedRoda)} />
                          </TableCell>
                        </TableRow>
                        <DetailRow expanded={expandedRoda === resp.id} colSpan={7}>
                          <div className="space-y-4">
                            {resp.scores && typeof resp.scores === 'object' && Object.keys(resp.scores).length > 0 && (
                              <div>
                                <p className="text-sm font-semibold text-muted-foreground mb-2">Pontuações:</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                  {Object.entries(resp.scores).map(([area, score]) => (
                                    <div key={area} className="flex justify-between bg-background rounded p-2 text-sm">
                                      <span className="font-medium">{area}</span>
                                      <span>{String(score)}/10</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {resp.ai_report && typeof resp.ai_report === 'object' && Object.keys(resp.ai_report).length > 0 && (
                              <div>
                                <p className="text-sm font-semibold text-muted-foreground mb-1">Relatório IA:</p>
                                <div className="whitespace-pre-wrap text-sm bg-background rounded p-3">
                                  {typeof resp.ai_report === 'string'
                                    ? resp.ai_report
                                    : JSON.stringify(resp.ai_report, null, 2)}
                                </div>
                              </div>
                            )}
                          </div>
                        </DetailRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
