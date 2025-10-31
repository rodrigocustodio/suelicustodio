import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Section } from '@/components/Section';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Termos de Uso - Sueli Custódio</title>
        <meta name="description" content="Termos de Uso dos serviços da Sueli Custódio - Coach e Mentora de Desenvolvimento Emocional" />
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
              Termos de Uso
            </h1>

            <div className="prose prose-lg max-w-none space-y-6 text-ink-700">
              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  1. Aceitação dos Termos
                </h2>
                <p>
                  Ao acessar e usar este site, você aceita e concorda em cumprir estes Termos de Uso.
                  Se você não concordar com qualquer parte destes termos, não deverá usar nosso site ou serviços.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  2. Serviços Oferecidos
                </h2>
                <p>
                  Sueli Custódio oferece serviços de mentoria, coaching e desenvolvimento emocional.
                  Os serviços incluem, mas não se limitam a:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sessões individuais de mentoria</li>
                  <li>Mentoria em grupo</li>
                  <li>Palestras corporativas</li>
                  <li>Cursos gravados</li>
                </ul>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  3. Responsabilidades do Cliente
                </h2>
                <p>
                  Ao contratar nossos serviços, você concorda em:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fornecer informações verdadeiras e atualizadas</li>
                  <li>Participar ativamente das sessões agendadas</li>
                  <li>Respeitar os horários marcados</li>
                  <li>Comunicar cancelamentos com pelo menos 24 horas de antecedência</li>
                  <li>Manter a confidencialidade de materiais exclusivos compartilhados</li>
                </ul>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  4. Política de Cancelamento e Reembolso
                </h2>
                <p>
                  Cancelamentos feitos com menos de 24 horas de antecedência podem não ser reembolsados.
                  Para sessões individuais, reagendamentos podem ser feitos com antecedência mínima de 24 horas.
                  Cursos gravados e produtos digitais não são reembolsáveis após o acesso ao conteúdo.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  5. Propriedade Intelectual
                </h2>
                <p>
                  Todo o conteúdo disponibilizado, incluindo textos, imagens, vídeos, áudios e materiais de apoio,
                  são de propriedade exclusiva de Sueli Custódio e estão protegidos por leis de direitos autorais.
                  É proibida a reprodução, distribuição ou uso comercial sem autorização prévia por escrito.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  6. Limitação de Responsabilidade
                </h2>
                <p>
                  Os serviços de mentoria e coaching não substituem tratamento médico, psicológico ou psiquiátrico.
                  Sueli Custódio não se responsabiliza por decisões tomadas com base nas orientações fornecidas.
                  Em casos de questões de saúde mental, recomenda-se buscar profissionais da área da saúde.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  7. Confidencialidade
                </h2>
                <p>
                  Todas as informações compartilhadas durante as sessões são tratadas com confidencialidade,
                  exceto quando houver risco iminente à vida ou quando exigido por lei.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  8. Modificações dos Termos
                </h2>
                <p>
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento.
                  As alterações entrarão em vigor imediatamente após a publicação no site.
                  O uso continuado do site após as alterações constitui aceitação dos novos termos.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  9. Lei Aplicável
                </h2>
                <p>
                  Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa será resolvida
                  nos tribunais competentes da comarca de São Paulo/SP.
                </p>
              </section>

              <section>
                <h2 className="font-playfair text-2xl font-bold text-ink-900 mt-8 mb-4">
                  10. Contato
                </h2>
                <p>
                  Para dúvidas sobre estes Termos de Uso, entre em contato:
                </p>
                <ul className="list-none space-y-2">
                  <li>Email: contato@suelicustodio.com.br</li>
                  <li>WhatsApp: (11) 94530-0128</li>
                </ul>
              </section>

              <p className="text-sm text-ink-600 mt-8">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};

export default TermsOfService;
