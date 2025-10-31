import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Section } from '@/components/Section';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade - Sueli Custódio</title>
        <meta name="description" content="Política de Privacidade da Sueli Custódio - Coach e Mentora de Desenvolvimento Emocional" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-paper-50">
        <Section>
          <div className="max-w-container-small mx-auto px-4">
            <Link 
              to="/autoestima-inabalavel" 
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>

            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-ink-900 mb-6">
              Política de Privacidade
            </h1>

            <div className="prose prose-lg max-w-none space-y-6 text-ink-700">
              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  1. Coleta de Informações
                </h2>
                <p>
                  Coletamos informações que você nos fornece diretamente ao preencher formulários em nosso site,
                  incluindo nome, email e número de WhatsApp. Essas informações são utilizadas exclusivamente para
                  entrar em contato com você sobre nossos serviços de mentoria e coaching.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  2. Uso das Informações
                </h2>
                <p>
                  Utilizamos suas informações pessoais para:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Responder às suas solicitações de contato</li>
                  <li>Enviar informações sobre nossos serviços</li>
                  <li>Processar agendamentos de sessões</li>
                  <li>Melhorar nossos serviços e experiência do usuário</li>
                </ul>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  3. Compartilhamento de Informações
                </h2>
                <p>
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de
                  marketing. Podemos compartilhar suas informações apenas quando:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Você nos autorizar expressamente</li>
                  <li>For necessário para prestação dos serviços solicitados</li>
                  <li>For exigido por lei ou ordem judicial</li>
                </ul>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  4. Cookies e Tecnologias Similares
                </h2>
                <p>
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site,
                  incluindo o Facebook Pixel para análise de tráfego e otimização de campanhas publicitárias.
                  Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade
                  do site.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  5. Segurança
                </h2>
                <p>
                  Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações
                  pessoais contra acesso não autorizado, perda ou destruição. No entanto, nenhum método de
                  transmissão pela internet é 100% seguro.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  6. Seus Direitos
                </h2>
                <p>
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir dados incompletos ou desatualizados</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Revogar seu consentimento a qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  7. Contato
                </h2>
                <p>
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política de privacidade,
                  entre em contato conosco:
                </p>
                <ul className="list-none space-y-2">
                  <li>Email: contato@suelicustodio.com.br</li>
                  <li>WhatsApp: (11) 94530-0128</li>
                </ul>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  8. Alterações
                </h2>
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente
                  estará sempre disponível nesta página.
                </p>
                <p className="text-sm text-ink-600 mt-4">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
              </section>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
