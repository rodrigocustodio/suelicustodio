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
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [quizResponses, setQuizResponses] = useState<QuizResponse[]>([]);
  const [mentoriaInscricoes, setMentoriaInscricoes] = useState<MentoriaInscricao[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

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
    } catch (error) {
      
      toast({
        title: 'Erro ao carregar mensagens',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchMentoriaInscricoes = async () => {
    try {
      const { data, error } = await supabase
        .from('mentoria_inscricoes')
        .select('id, created_at, nome_completo, data_nascimento, email, contato, expectativa, forma_pagamento')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMentoriaInscricoes(data || []);
    } catch {
      toast({
        title: 'Erro ao carregar inscrições da mentoria',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    }
  };

  const fetchQuizResponses = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .select('id, created_at, name, email, whatsapp, overload_score, awareness_level, disc_profile, consent_marketing')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuizResponses(data || []);
    } catch {
      toast({
        title: 'Erro ao carregar respostas do quiz',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
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

      setMessages(messages.map(msg =>
        msg.id === id ? { ...msg, read: !currentReadStatus } : msg
      ));

      toast({
        title: 'Status atualizado',
      });
    } catch (error) {
      
      toast({
        title: 'Erro ao atualizar',
        variant: 'destructive',
      });
    }
  };

  if (loading || loadingMessages) {
    return (
      <div className="min-h-screen bg-paper-50 flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-paper-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold mb-2">Painel Administrativo</h1>
            <p className="text-ink-600">Bem-vindo, {user?.email}</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sair
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mensagens de Contato</CardTitle>
            <CardDescription>
              Total de {messages.length} mensagens
            </CardDescription>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <p className="text-center text-ink-500 py-8">
                Nenhuma mensagem recebida ainda.
              </p>
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
                      <TableHead>Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>
                          {format(new Date(message.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </TableCell>
                        <TableCell className="font-medium">{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.whatsapp || '-'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{message.source_page || 'N/A'}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={message.read ? 'secondary' : 'default'}>
                            {message.read ? 'Lida' : 'Nova'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleRead(message.id, message.read)}
                          >
                            {message.read ? 'Marcar como nova' : 'Marcar como lida'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Respostas do Quiz</CardTitle>
            <CardDescription>
              Total de {quizResponses.length} cadastros do teste de sobrecarga
            </CardDescription>
          </CardHeader>
          <CardContent>
            {quizResponses.length === 0 ? (
              <p className="text-center text-ink-500 py-8">
                Nenhuma resposta recebida ainda.
              </p>
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
                      <TableHead>Perfil DISC</TableHead>
                      <TableHead>Marketing</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizResponses.map((resp) => (
                      <TableRow key={resp.id}>
                        <TableCell>
                          {format(new Date(resp.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </TableCell>
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
                          <Badge variant={resp.consent_marketing ? 'default' : 'outline'}>
                            {resp.consent_marketing ? 'Sim' : 'Não'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Inscrições da Mentoria</CardTitle>
            <CardDescription>
              Total de {mentoriaInscricoes.length} inscrições — Reconstruindo a Mulher Interior
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mentoriaInscricoes.length === 0 ? (
              <p className="text-center text-ink-500 py-8">
                Nenhuma inscrição recebida ainda.
              </p>
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
                      <TableHead>Expectativa</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mentoriaInscricoes.map((insc) => (
                      <TableRow key={insc.id}>
                        <TableCell>
                          {format(new Date(insc.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </TableCell>
                        <TableCell className="font-medium">{insc.nome_completo}</TableCell>
                        <TableCell>
                          {format(new Date(insc.data_nascimento + 'T00:00:00'), 'dd/MM/yyyy', { locale: ptBR })}
                        </TableCell>
                        <TableCell>{insc.email}</TableCell>
                        <TableCell>{insc.contato}</TableCell>
                        <TableCell>
                          <Badge variant={insc.forma_pagamento === 'pix' ? 'default' : 'secondary'}>
                            {insc.forma_pagamento === 'pix' ? 'PIX' : 'Cartão'}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={insc.expectativa}>
                          {insc.expectativa}
                        </TableCell>
                      </TableRow>
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
  );
};

export default Admin;
