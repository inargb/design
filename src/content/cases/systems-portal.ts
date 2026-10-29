// Systems Portal. Text is Inaiá's, from the current case on inasilva.com
// (EN and PT-BR versions), with small typo fixes in the Portuguese.
import type { CaseStudy } from './types';
import before from '../../assets/cases/systems-portal/before.png';
import after from '../../assets/cases/systems-portal/after.png';
import browse from '../../assets/cases/systems-portal/screen-browse.png';
import mostAccessed from '../../assets/cases/systems-portal/screen-most-accessed.png';
import system from '../../assets/cases/systems-portal/screen-system.png';

const l = (en: string, pt: string) => ({ en, pt });
const nielsen6 = l('Nielsen #6 · recognition', 'Nielsen #6 · reconhecimento');

export const systemsPortal: CaseStudy = {
  slug: 'systems-portal',
  tools: l('Figma, qualitative research, gov.br design system', 'Figma, pesquisa qualitativa, design system gov.br'),
  live: { href: 'https://www.gov.br/agricultura/pt-br/acesso-a-informacao/tecnologia-da-informacao/sistemas', label: l('see it live', 'abrir online') },
  sections: [
    {
      id: 'overview',
      label: l('overview', 'contexto'),
      title: l('A portal for all Brazil', 'Um portal para todo o Brasil'),
      blocks: [
        {
          type: 'text',
          body: [
            l(
              'The Ministry of Agriculture and Livestock Systems Portal serves as a national gateway. There is no single user profile, as the same portal is used by an artisanal fisherman in Pará seeking registration through PesqBrasil and by an administrative employee looking for the time-tracking system. More than 100 systems coexist on a single page without any categorization, search functionality, or even alphabetical organization.',
              'O Portal de Sistemas do Ministério da Agricultura e Pecuária é um ponto de entrada nacional. Não existe um perfil único de usuário, porque o mesmo portal serve ao pescador artesanal do Pará buscando seu registro no PesqBrasil e ao servidor administrativo procurando o sistema de ponto. São mais de 100 sistemas convivendo em uma única página sem nenhuma categorização, sem busca e nem mesmo uma organização em ordem alfabética.',
            ),
          ],
        },
        {
          type: 'stats',
          items: [
            { value: l('100+', '100+'), label: l('Systems cataloged in the database', 'Sistemas catalogados na base') },
            { value: l('3', '3'), label: l('Ministries served (MAPA, MDA and MPA)', 'Ministérios atendidos (MAPA, MDA e MPA)') },
            { value: l('National', 'Nacional'), label: l('A user base made of many different audiences', 'Base de usuários com públicos muito diferentes') },
          ],
        },
      ],
    },
    {
      id: 'problem',
      label: l('the problem', 'o problema'),
      title: l('Even if you know what you’re looking for, finding it is difficult', 'Você pode até saber o que quer, mas não consegue encontrar'),
      blocks: [
        {
          type: 'text',
          body: [
            l(
              'By analyzing the user flow, we found that even users who knew exactly which system they needed were often unable to locate it. The list was overwhelming, with no apparent logical structure. Inactive systems were mixed with active ones, and outdated contact information pointed to people who no longer worked at the ministry. The result? Wasted time, increased support requests due to access issues, and frustration, especially for users with limited digital literacy.',
              'Ao analisar o fluxo de uso, percebemos que até os usuários que sabiam qual sistema precisavam não conseguiam localizá-lo. A lista era interminável, sem ordem lógica aparente, com sistemas inativos misturados aos ativos e contatos desatualizados de pessoas que nem trabalhavam mais no órgão. O resultado? Tempo perdido, chamados no suporte por erro de acesso e frustração para usuários com baixo letramento digital.',
            ),
          ],
        },
        {
          type: 'question',
          text: l(
            'How might we reorganize more than 100 systems within a national access portal so that any user, regardless of their profile, can find what they need in under 30 seconds?',
            'Como reorganizar mais de 100 sistemas em um portal de acesso nacional de forma que qualquer usuário, independentemente do perfil, encontre o que precisa em menos de 30 segundos?',
          ),
        },
        {
          type: 'figure',
          image: {
            src: before,
            alt: l(
              'The old portal on a laptop: a long blue-and-white list of system names grouped only by department.',
              'O portal antigo em um notebook: uma longa lista azul e branca de nomes de sistemas, agrupada apenas por departamento.',
            ),
          },
          caption: l(
            'Previous interface: an uncategorized list with no search and many inactive systems, even after the first iteration, which only reorganized the list alphabetically.',
            'Interface anterior: lista não categorizada, sem busca e repleta de sistemas inativos, mesmo depois da primeira iteração, que só a reorganizou em ordem alfabética.',
          ),
        },
      ],
    },
    {
      id: 'process',
      label: l('process', 'processo'),
      title: l('You can’t categorize what you don’t understand', 'Não dá para categorizar o que você não conhece'),
      blocks: [
        {
          type: 'text',
          body: [
            l(
              'Before making any design decisions, we first needed to understand what actually existed on the portal. We conducted interviews and workshops with department managers and directors across the Ministry, as they were the only people who truly knew which systems were still active, which had been discontinued, and how each department organized its day-to-day work.',
              'Antes de qualquer decisão de design, era preciso entender o que existia na página. Conduzimos entrevistas e reuniões com líderes de setor e diretores de cada área do Ministério, as únicas pessoas que sabiam, na prática, quais sistemas ainda estavam ativos, quais tinham sido descontinuados e como cada setor realmente organizava seu trabalho.',
            ),
            l(
              'The process was collaborative and iterative, with every system reviewed individually. Inactive systems were removed, and undocumented systems were identified and properly documented.',
              'O processo foi colaborativo e iterativo, com cada sistema avaliado individualmente. Sistemas inativos foram removidos e sistemas sem descrição foram documentados.',
            ),
          ],
        },
        {
          type: 'steps',
          items: [
            { title: l('Discovery', 'Levantamento'), body: l('Mapping existing systems through forms and meetings with department leaders.', 'Mapeamento dos sistemas existentes via formulário e reuniões com lideranças.') },
            { title: l('Audit', 'Auditoria'), body: l('System-by-system check of status, broken links and outdated contact information.', 'Verificação sistema a sistema: ativo, inativo, link quebrado, contato desatualizado.') },
            { title: l('Collaborative categorization', 'Categorização colaborativa'), body: l('Categories defined together with each department: Plant Production, Animal Production, Administration, IT, Budget and others.', 'Categorias definidas com as equipes de cada setor: Vegetal, Animal, Administrativo, TI, Orçamento e outros.') },
            { title: l('Prioritization', 'Priorização'), body: l('A “most accessed” section, updated monthly with real usage data.', 'Conceito de “mais acessados”: seção dinâmica atualizada mensalmente com dados reais de uso.') },
          ],
        },
      ],
    },
    {
      id: 'solution',
      label: l('solution', 'solução'),
      title: l('A system redesigned for every user', 'Um sistema reorganizado para todos os usuários'),
      blocks: [
        {
          type: 'decisions',
          intro: l('Every design decision was made to reduce user effort.', 'Cada decisão de design foi tomada para reduzir o esforço do usuário.'),
          items: [
            {
              icon: 'layout',
              title: l('Category-based information architecture', 'Arquitetura por categorias'),
              body: l('More than 100 systems organized into eight thematic categories, defined together with teams from each department.', 'Mais de 100 sistemas organizados em 8 categorias temáticas, definidas em conjunto com as equipes de cada setor.'),
              tag: nielsen6,
            },
            {
              icon: 'search',
              title: l('Persistent search', 'Barra de busca persistente'),
              body: l('For users who already know what they are looking for, search removes the need for Ctrl+F (a shortcut not everyone knows) or prior knowledge of the portal’s structure.', 'Para quem já sabe o que quer, a busca elimina a necessidade do Ctrl+F (atalho que nem todo usuário conhece) ou de conhecer a estrutura do portal.'),
              tag: l('Nielsen #7 · efficiency', 'Nielsen #7 · eficiência'),
            },
            {
              icon: 'star',
              title: l('“Most accessed” section', 'Seção “Mais acessados”'),
              body: l('A dynamic section designed to update monthly from usage data, so the interface follows seasonal demand (fishing systems rise during the fishing season).', 'Seção dinâmica atualizada mensalmente com dados de uso, adaptando a interface à sazonalidade (sistemas de pesca em alta durante a temporada).'),
              note: l('The proposal was approved during the project but was not implemented in the final version.', 'Proposta aprovada no projeto, mas não implementada na versão final.'),
              tag: nielsen6,
            },
          ],
        },
        {
          type: 'figure',
          image: {
            src: after,
            alt: l(
              'The redesigned portal on a laptop: a search bar and a grid of the most accessed systems.',
              'O portal redesenhado em um notebook: uma barra de busca e uma grade com os sistemas mais acessados.',
            ),
          },
          caption: l(
            'Updated interface, with a category-based structure defined together with teams across the Ministry.',
            'Interface atualizada, com a estrutura de categorias definida em conjunto com as equipes do Ministério.',
          ),
        },
        {
          type: 'gallery',
          images: [
            { src: browse, alt: l('Browse by agency (three ministries) and by category (Administrative, Plant, Regulations, Animal), each with an icon.', 'Navegar por órgão (três ministérios) e por categoria (Administrativo, Vegetal, Normativos, Animal), cada um com um ícone.') },
            { src: mostAccessed, alt: l('The “most accessed systems” grid under a persistent search bar.', 'A grade de “sistemas mais acessados” abaixo da busca persistente.') },
            { src: system, alt: l('A system page: description, manuals and guides, and a contacts panel with an “Open” button.', 'A página de um sistema: descrição, manuais e guias, e um painel de contatos com o botão “Abrir”.') },
          ],
        },
      ],
    },
    {
      id: 'result',
      label: l('result', 'resultado'),
      title: l('Finally, a portal that works!', 'Finalmente, um portal que funciona!'),
      blocks: [
        {
          type: 'text',
          body: [
            l(
              'The project’s collaborative process aligned teams across the Ministry and established a maintenance workflow so the portal stays accurate and continuously updated.',
              'O processo colaborativo do projeto criou alinhamento entre as equipes e estabeleceu um fluxo de manutenção para que o portal seja constantemente atualizado.',
            ),
          ],
        },
        {
          type: 'stats',
          items: [
            { value: l('100+', '100+'), label: l('Systems reorganized into eight thematic groups', 'Sistemas reorganizados em oito temas') },
            { value: l('< 1 min', '< 1 min'), label: l('Users now find what they’re looking for in less than a minute', 'O usuário agora leva menos de 1 minuto para encontrar o que procura') },
            { value: l('−35%', '−35%'), label: l('Access-related errors in the first quarter (IT team’s internal assessment)', 'Erros de acesso no primeiro trimestre (pesquisa interna da equipe de TI)') },
          ],
        },
      ],
    },
  ],
};
