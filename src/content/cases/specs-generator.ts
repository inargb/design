// Responsive Specs & Accessibility Generator. Text is Inaiá's, from the
// current case on inasilva.com (EN and PT-BR), with small fixes.
import type { CaseStudy } from './types';
import presets from '../../assets/cases/specs-generator/viewport-presets.png';
import exportSummary from '../../assets/cases/specs-generator/export-summary.png';
import componentSpec from '../../assets/cases/specs-generator/component-spec.png';

const l = (en: string, pt: string) => ({ en, pt });

export const specsGenerator: CaseStudy = {
  slug: 'responsive-specs-and-accessibility-generator',
  tools: l(
    'Figma Make, design-oriented prompting, prototyping, design systems, documentation',
    'Figma Make, prompt orientado por design, protótipo, design systems, documentação',
  ),
  sections: [
    {
      id: 'overview',
      label: l('overview', 'contexto'),
      title: l('A week lost to the same problem in every sprint', 'Uma semana sempre perdida em um problema que acontecia toda sprint'),
      blocks: [
        {
          type: 'text',
          body: [
            l(
              'Redesigning the POS system required documenting the responsive behavior and accessibility requirements of every component before the development handoff.',
              'O redesign de um sistema de PDV exigia documentar o comportamento responsivo e os requisitos de acessibilidade de cada componente antes do handoff com desenvolvimento.',
            ),
            l(
              'Manually calculating viewport units, checking color contrast, and formatting specifications for developers was a repetitive task that resurfaced every sprint for each new or updated component.',
              'Calcular manualmente unidades de viewport, verificar contraste de cores e formatar as specs para os devs era uma tarefa recorrente, que aparecia toda sprint para cada componente novo ou atualizado.',
            ),
            l(
              'On large projects, this step alone consumed nearly a full week of the design team’s time. A week spent on documentation while the sprint waited.',
              'Em projetos grandes, essa etapa sozinha consumia quase uma semana de trabalho da equipe de design. Uma semana parada em documentação, enquanto a sprint esperava.',
            ),
          ],
        },
        {
          type: 'stats',
          items: [
            { value: l('~1 week', '~1 semana'), label: l('Documentation time per major delivery (before the tool)', 'Tempo de documentação por entrega grande (antes da ferramenta)') },
            { value: l('Every sprint', 'Toda sprint'), label: l('How often the problem came back', 'Frequência com que o problema reaparecia') },
            { value: l('Internal use', 'Uso interno'), label: l('A tool built by the team, for the team living the problem', 'Ferramenta criada pela própria equipe, por quem sofria o problema') },
          ],
        },
      ],
    },
    {
      id: 'problem',
      label: l('the problem', 'o problema'),
      title: l('Manual, repetitive, and prone to human error', 'Manual, repetitivo e com margem de erro humano'),
      blocks: [
        {
          type: 'list',
          intro: l('The documentation workflow involved:', 'O fluxo de documentação envolvia:'),
          items: [
            l('Opening the frame in Figma manually', 'Abrir o frame no Figma manualmente'),
            l('Recording every width, height, padding, spacing and icon size', 'Anotar cada valor de largura, altura, padding, espaçamento e tamanho de ícone'),
            l('Converting values into viewport units (vw/vh) and rem by hand', 'Calcular à mão as conversões para unidades de viewport (vw/vh) e rem'),
            l('Checking the contrast ratio of every foreground/background pair in external tools', 'Verificar o contraste de cada par de cores (fundo/superfície) em ferramentas externas'),
            l('Formatting all of it into documentation developers could easily read', 'Formatar tudo isso em documentação legível para o dev'),
          ],
        },
        {
          type: 'text',
          body: [
            l(
              'Native Figma plugins were tested too, but none solved the problem end to end. When a developer needed to verify a specific component value, updating the documentation, validating the information and confirming the right value could take up to an hour.',
              'Até plugins nativos do Figma foram testados, mas nenhum resolvia o problema por completo. E quando um dev precisava confirmar um valor específico de um componente, levava cerca de 1 hora para atualizar, verificar e confirmar a informação.',
            ),
            l(
              'The whole process was repetitive, which made it prone to mistakes. A single wrong calculation at the start of a sprint could easily turn into rework by the end of it.',
              'O processo era repetitivo, e isso o tornava suscetível a erros. Um valor calculado errado no início de uma sprint se transformava em retrabalho no final.',
            ),
          ],
        },
        {
          type: 'question',
          text: l(
            'How might we eliminate manual documentation time without sacrificing accuracy, and do it directly within Figma, without disrupting the team’s existing workflow?',
            'Como eliminar o tempo de documentação manual sem abrir mão da precisão, e fazer isso de dentro do Figma, sem mudar o fluxo de trabalho da equipe?',
          ),
        },
      ],
    },
    {
      id: 'process',
      label: l('process', 'processo'),
      title: l('The solution was the API.\nThe challenge was the prompt.', 'A solução estava na API.\nO desafio estava no prompt.'),
      blocks: [
        {
          type: 'text',
          body: [
            l(
              'The idea came from realizing that all the necessary information already existed in Figma. The real problem was extracting, calculating and formatting that data.',
              'A ideia surgiu quando percebemos que todas as informações necessárias já existiam no Figma. O problema era de extração, cálculo e formatação.',
            ),
            l(
              'The approach was to build an automation layer with Figma Make, connected directly to the Figma API: it extracts layout data from a selected frame and applies viewport calculations and color-contrast validation automatically.',
              'A abordagem foi construir com o Figma Make uma camada de automação conectada diretamente à Figma API, extraindo os dados de layout de um frame selecionado e aplicando o cálculo de viewport e a validação de contraste de forma automática.',
            ),
            l(
              'This project began well before MCPs (Model Context Protocol servers) were widely available in today’s leading AI agents. A fast, practical solution was needed, and Figma already provided the connectors to build it.',
              'Vale lembrar que esse projeto começou muito antes de os MCPs estarem amplamente disponíveis nos principais agentes de IA. Uma solução rápida era necessária, e o Figma já tinha os conectores para construí-la.',
            ),
            l(
              'The biggest challenge was writing design-oriented prompts that guided the tool to understand not only the component values but the design logic behind them. The goal wasn’t just to generate documentation: it was to make the tool document and reason like a designer.',
              'O maior desafio foi escrever prompts orientados por design que guiassem a ferramenta a entender os valores e a lógica por trás deles. O objetivo não era só gerar documentação: era fazer a ferramenta documentar e raciocinar como um designer.',
            ),
          ],
        },
        {
          type: 'steps',
          items: [
            { title: l('Diagnosis', 'Diagnóstico'), body: l('Mapped the manual workflow to find where time was lost and where errors happened most.', 'Mapeamento do fluxo manual para entender onde o tempo era perdido e onde os erros aconteciam com mais frequência.') },
            { title: l('Exploration', 'Exploração'), body: l('Evaluated native Figma plugins and ruled them out: none covered the full scope of the problem.', 'Teste de plugins nativos do Figma, descartados por não cobrirem o escopo completo do problema.') },
            { title: l('Prototyping', 'Prototipação'), body: l('Built the first version with Figma Make and the Figma API to extract layout data and automate viewport calculations.', 'Primeira versão com Figma Make + Figma API, com extração de dados de layout e cálculo de viewport.') },
            { title: l('Refinement', 'Refinamento'), body: l('Iterated on design-oriented prompts until the output was accurate, structured and easy for developers to use.', 'Iteração nos prompts orientados por design até o output ficar preciso, estruturado e legível para os devs.') },
            { title: l('Adoption', 'Adoção'), body: l('Integrated into the team’s recurring workflow, where it became part of every sprint delivery.', 'Ferramenta integrada ao fluxo recorrente da equipe e usada ativamente em cada entrega de sprint.') },
          ],
        },
      ],
    },
    {
      id: 'solution',
      label: l('solution', 'solução'),
      title: l('Select the frame. Run the tool. Documentation ready.', 'Selecionar o frame. Rodar a ferramenta. Documentação pronta.'),
      blocks: [
        {
          type: 'decisions',
          intro: l(
            'The generator is a translation layer between design and development, automating the repetitive work so designers can spend more time on what matters: creating.',
            'O Gerador funciona como uma camada de tradução entre design e desenvolvimento, automatizando o que era repetitivo para liberar tempo para o que é criativo.',
          ),
          items: [
            { icon: 'frame', title: l('Reads directly from Figma', 'Lê diretamente do Figma'), body: l('Connected to the Figma API, it extracts width, height, padding, spacing and icon sizes from the selected frame. No copying values by hand.', 'Conectada à Figma API, a ferramenta extrai largura, altura, padding, espaçamento e tamanhos de ícones do frame selecionado, sem ninguém copiar valores à mão.') },
            { icon: 'contrast', title: l('Checks contrast automatically', 'Verifica contraste automaticamente'), body: l('Reads the applied color tokens and evaluates contrast between foreground and background, flagging whether each pair meets accessibility standards.', 'Coleta os tokens de cor aplicados e avalia o contraste entre fundo e superfície, sinalizando conformidade ou falha com os padrões de acessibilidade.') },
            { icon: 'ruler', title: l('Calculates vw, vh and rem', 'Calcula vw, vh e rem'), body: l('Converts absolute dimensions into viewport and rem units, so layouts scale correctly across screen sizes and zoom levels.', 'Converte as dimensões absolutas para unidades de viewport e rem, garantindo que os layouts escalem corretamente em diferentes telas e níveis de zoom.') },
            { icon: 'doc', title: l('Developer-ready documentation', 'Documentação pronta para dev'), body: l('Outputs text, a prompt or a Figma frame, ready to paste into docs, share with engineers, or use in AI-powered FigJam workflows.', 'O resultado sai como texto, prompt ou frame no Figma, pronto para colar na documentação, compartilhar com engenheiros ou usar em fluxos de IA no FigJam.') },
          ],
        },
        {
          type: 'gallery',
          images: [
            { src: presets, alt: l('Viewport presets: HD laptop, Full HD, MacBook and WXGA, plus custom sizes saved by the team, like two kiosk screens.', 'Presets de viewport: HD laptop, Full HD, MacBook e WXGA, além de tamanhos salvos pela equipe, como duas telas de totem.') },
            { src: exportSummary, alt: l('Export and handoff options (place on the Figma canvas, copy as Markdown, download JSON) above a summary of components documented, token coverage, hardcoded values and contrast failures.', 'Opções de exportação (colocar no canvas do Figma, copiar como Markdown, baixar JSON) acima de um resumo com componentes documentados, cobertura de tokens, valores fixos e falhas de contraste.') },
            { src: componentSpec, alt: l('A generated spec for an order summary card: layout in vw and vh, typography, color tokens, and a 16:1 contrast check passing WCAG AA and AAA.', 'Uma spec gerada para um card de resumo do pedido: layout em vw e vh, tipografia, tokens de cor e uma verificação de contraste 16:1 aprovada em WCAG AA e AAA.') },
          ],
          caption: l('The tool in action: extraction, calculation and documentation output in under 5 minutes.', 'Ferramenta em uso: extração, cálculo e output em menos de 5 minutos.'),
        },
      ],
    },
    {
      id: 'result',
      label: l('result', 'resultado'),
      title: l('From one week to two days.\nFrom one hour to five minutes.', 'De uma semana para dois dias.\nDe uma hora para cinco minutos.'),
      blocks: [
        {
          type: 'text',
          body: [
            l(
              'The tool was integrated into the team’s recurring workflow and has been used in every sprint since.',
              'A ferramenta foi integrada ao fluxo recorrente da equipe e é usada ativamente em cada sprint desde então.',
            ),
            l(
              'The impact showed in delivery speed and in the team’s capacity: instead of getting stuck in documentation, the design team delivered both projects and their documentation within the same sprint.',
              'O impacto apareceu na velocidade de entrega e na capacidade da equipe: em vez de ficar travada em documentação, a equipe de design voltou a entregar projetos e documentação dentro do mesmo ciclo.',
            ),
          ],
        },
        {
          type: 'compare',
          before: {
            label: l('before', 'antes'),
            rows: [
              { key: l('Full documentation per major delivery', 'Documentação completa por entrega'), value: l('~1 week', '~1 semana') },
              { key: l('Single-component check', 'Verificação pontual por componente'), value: l('~1 hour', '~1 hora') },
              { key: l('Process', 'Processo'), value: l('Manual, linear, needing constant attention', 'Manual, linear, dependente de atenção contínua') },
              { key: l('Risk', 'Risco'), value: l('Human error in repetitive calculations', 'Erro humano em cálculos repetitivos') },
              { key: l('Sprint impact', 'Impacto na sprint'), value: l('Recurring delivery delays', 'Atraso recorrente') },
            ],
          },
          after: {
            label: l('after', 'depois'),
            rows: [
              { key: l('Full documentation per major delivery', 'Documentação completa por entrega'), value: l('2 days', '2 dias') },
              { key: l('Single-component check', 'Verificação pontual por componente'), value: l('Under 5 minutes', 'Menos de 5 minutos') },
              { key: l('Process', 'Processo'), value: l('Automated, repeatable, auditable', 'Automatizado, repetível, auditável') },
              { key: l('Risk', 'Risco'), value: l('Eliminated for viewport calculations and contrast checks', 'Eliminado nos cálculos de viewport e de contraste') },
              { key: l('Sprint impact', 'Impacto na sprint'), value: l('Delivered within the sprint', 'Entrega dentro do ciclo') },
            ],
          },
        },
        {
          type: 'stats',
          items: [
            { value: l('5× faster', '5× mais rápido'), label: l('Full documentation per major delivery (1 week → 2 days)', 'Na documentação completa por entrega (1 semana → 2 dias)') },
            { value: l('12× faster', '12× mais rápido'), label: l('Single-component verification (1 hour → 5 minutes)', 'Em verificações pontuais por componente (1 hora → 5 minutos)') },
            { value: l('0 plugins', '0 plugins'), label: l('External plugins needed: everything runs inside Figma', 'Plugins externos: tudo dentro do ecossistema Figma') },
          ],
        },
      ],
    },
  ],
};
