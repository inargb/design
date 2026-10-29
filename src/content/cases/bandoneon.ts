// Bandoneón Initiative. Text and structure are Inaiá's, from the current case
// on inasilva.com (EN and PT-BR): the Double Diamond up top, then
// discover_ · define_ · develop_ · delivery_ · outcome_. Small fixes only.
import type { CaseStudy } from './types';
import ia from '../../assets/cases/bandoneon/information-architecture.png';
import iaMobile from '../../assets/cases/bandoneon/information-architecture-mobile.png';
import wireframes from '../../assets/cases/bandoneon/wireframes.png';
import designSystem from '../../assets/cases/bandoneon/design-system-preview.png';
import uiSteps from '../../assets/cases/bandoneon/ui-recipe-steps.png';
import uiHome from '../../assets/cases/bandoneon/ui-onboarding-home.png';
import uiProfile from '../../assets/cases/bandoneon/ui-recipe-profile.png';

const l = (en: string, pt: string) => ({ en, pt });

export const bandoneon: CaseStudy = {
  slug: 'bandoneon-iniciative',
  tools: l('Figma, quantitative research, prototyping, design system', 'Figma, pesquisa quantitativa, prototipação, design system'),
  facts: [{ label: l('Type', 'Tipo'), value: l('Academic', 'Acadêmico') }],
  intro: [
    {
      type: 'diamond',
      problem: l('problem', 'problema'),
      solution: l('solution', 'solução'),
      phases: [
        { title: l('Discover', 'Descobrir'), body: l('Briefing · Survey · Quantitative research', 'Briefing · Survey · Pesquisa quantitativa') },
        { title: l('Define', 'Definir'), body: l('Personas · SMART requirements · AI', 'Personas · Requisitos SMART · IA') },
        { title: l('Develop', 'Desenvolver'), body: l('Wireframes · Design system · Prototype', 'Wireframes · Design system · Protótipo') },
        { title: l('Delivery', 'Entregar'), body: l('Final UI · Usability test', 'UI final · Teste de usabilidade') },
      ],
      note: l('Methodology: Double Diamond, British Design Council, 2005', 'Metodologia: Double Diamond, British Design Council, 2005'),
    },
  ],
  sections: [
    {
      id: 'discover',
      label: l('discover', 'descobrir'),
      blocks: [
        {
          type: 'text',
          body: [
            l(
              'The project began with a direct briefing from the creator of the Bandoneón Initiative, a social project focused on itinerant culinary education for people in vulnerable situations. The mission was to transform this in-person work into an accessible, practical and engaging digital product.',
              'O projeto começou com um briefing direto com o criador da Iniciativa Bandoneón, um projeto social de educação gastronômica itinerante para pessoas em situação de vulnerabilidade. A missão era transformar esse trabalho presencial em um produto digital acessível, prático e engajante.',
            ),
            l(
              'To understand who the users would be, we conducted a quantitative survey with the target audience. The data revealed behaviors and preferences that challenged the initial assumptions.',
              'Para entender quem seriam os usuários, conduzimos uma pesquisa quantitativa com o público-alvo. Os dados revelaram comportamentos e preferências que desafiaram as suposições iniciais.',
            ),
          ],
        },
        {
          type: 'stats',
          items: [
            { value: l('62%', '62%'), label: l('prefer recipes with short videos and subtitles', 'preferem receitas com vídeos curtos e legendas') },
            { value: l('64%', '64%'), label: l('want to learn more than the basics', 'querem aprender mais do que o básico') },
          ],
        },
        {
          type: 'text',
          body: [
            l(
              'The apps respondents used most were social networks, which pointed to the need for some interaction and dynamism. With this, it was clear that the content needed to be fast, visual and progressive.',
              'Os apps mais usados pelos respondentes eram redes sociais, o que acabou indicando a necessidade de alguma abordagem de interação e dinâmica. Com isso, foi observado que o conteúdo precisava ser rápido, visual e progressivo.',
            ),
          ],
        },
      ],
    },
    {
      id: 'define',
      label: l('define', 'definir'),
      blocks: [
        { type: 'heading', text: l('Personas', 'Personas') },
        {
          type: 'decisions',
          intro: l(
            'With the research data, we built three personas that represented the distinct profiles identified. The challenge was to design for all of them without compromising the experience of any. They are:',
            'Com os dados da pesquisa, construímos três personas que representavam os perfis distintos identificados. O desafio era projetar para todos eles sem comprometer a experiência de nenhum. São eles:',
          ),
          items: [
            { icon: 'person', title: l('Pedro, 20, streamer', 'Pedro, 20, streamer'), body: l('Wants basic kitchen autonomy and a healthier eating routine. Consumes everything via social media, has limited time and prefers quick, visual content.', 'Quer autonomia básica na cozinha e uma rotina alimentar mais saudável. Consome tudo via redes sociais, tem tempo limitado e prefere conteúdo rápido e visual.') },
            { icon: 'person', title: l('Anna, 24, journalism student', 'Anna, 24, estudante de jornalismo'), body: l('Intense routine. Needs to find recipes quickly, practical for everyday use, prepared on weekends. Wants complete descriptions, without interruptions.', 'Rotina intensa. Precisa encontrar receitas rapidamente, práticas para o dia a dia, elaboradas no fim de semana. Quer descrições completas, sem interrupções.') },
            { icon: 'person', title: l('Jackeline, 41, hotel manager', 'Jackeline, 41, gerente de hotel'), body: l('Cooks for the family in large quantities, with a focus on health. Wants to involve the children in the process and avoid waste.', 'Cozinha para a família em grandes quantidades, com foco em saúde. Quer envolver os filhos no processo e evitar desperdício.') },
          ],
        },
        { type: 'heading', text: l('Requirements · SMART criteria', 'Requisitos · Critérios SMART') },
        {
          type: 'groups',
          intro: l(
            'To consolidate the findings and avoid ambiguity in the development stage, the requirements were organized into four dimensions and evaluated against SMART criteria, making sure each product decision was Specific, Measurable, Achievable, Relevant and Time-bound.',
            'Para consolidar as descobertas e evitar ambiguidade na etapa de desenvolvimento, os requisitos foram organizados em quatro dimensões e avaliados segundo critérios SMART, garantindo que cada decisão de produto fosse Específica, Mensurável, Atingível, Relevante e Temporal.',
          ),
          items: [
            { title: l('Product goals', 'Metas do produto'), points: [l('Teach culinary techniques and terms', 'Ensinar técnicas e termos gastronômicos'), l('Encourage healthy eating and waste reduction', 'Incentivar alimentação saudável e redução de desperdício'), l('Organize recipes and chef content', 'Organizar receitas e conteúdo do chef'), l('Stimulate culinary creativity', 'Estimular criatividade culinária')] },
            { title: l('User’s needs', 'Necessidades do usuário'), points: [l('Learn to cook with progression', 'Aprender a cozinhar com progressão'), l('Practical recipes for everyday life', 'Receitas práticas para o cotidiano'), l('Follow a healthy diet', 'Seguir uma dieta saudável'), l('Have autonomy in the kitchen', 'Ter autonomia na cozinha'), l('Follow the initiative’s itinerary', 'Acompanhar o itinerário da iniciativa')] },
            { title: l('Content', 'Conteúdos'), points: [l('Recipes with text and illustrative images', 'Receitas com texto e imagens ilustrativas'), l('Personalized user profile', 'Perfil de usuário personalizado'), l('Project presentation and updates', 'Apresentação do projeto e novidades'), l('User feedback about their results', 'Feedback dos usuários sobre seus resultados')] },
            { title: l('Functional specifications', 'Especificações funcionais'), points: [l('Save recipes in personalized folders', 'Salvar receitas em pastas personalizadas'), l('Filter by difficulty (easy → difficult)', 'Filtrar por dificuldade (fácil → difícil)'), l('Mark ingredients to buy', 'Marcar ingredientes a comprar'), l('Recipes with reader, sounds, timer and images', 'Receitas com leitor, sons, cronômetro e imagens')] },
          ],
        },
        { type: 'heading', text: l('Information architecture', 'Arquitetura da informação') },
        {
          type: 'text',
          body: [
            l(
              'With the requirements defined, we mapped the complete structure of the app, from onboarding to the profile area, going through the recipe flows, filtering, shopping list and social interaction.',
              'Com os requisitos definidos, mapeamos a estrutura completa do app, desde o onboarding até a área de perfil, passando pelos fluxos de receita, filtragem, lista de compras e interação social.',
            ),
          ],
        },
        {
          type: 'figure',
          image: { src: ia, mobile: iaMobile, alt: l('The information architecture: sign up, login or continue without an account, then home, recipes with filters and social actions, news, and the profile with saved recipes and a shopping list.', 'A arquitetura da informação: cadastro, login ou continuar sem conta, depois home, receitas com filtros e ações sociais, notícias e o perfil com receitas salvas e lista de compras.') },
          caption: l('Information architecture: complete structure of the Bandoneón app.', 'Arquitetura da informação: estrutura completa do aplicativo Bandoneón.'),
        },
      ],
    },
    {
      id: 'develop',
      label: l('develop', 'desenvolver'),
      blocks: [
        {
          type: 'text',
          body: [
            l(
              'With the architecture defined, the process began in low fidelity, drawing the critical flows on paper before any visual decision. This stage was essential to validate navigation without the aesthetic weight of the UI.',
              'Com a arquitetura definida, o processo começou em baixa fidelidade, desenhando em papel os fluxos críticos antes de qualquer decisão visual. Essa etapa foi essencial para validar a navegação sem o peso estético da interface.',
            ),
          ],
        },
        { type: 'heading', text: l('Wireframes', 'Wireframes'), sub: l('Paper wireframes: exploring the flows before any visual decision.', 'Wireframes em papel: exploração de fluxos antes de qualquer decisão visual.') },
        {
          type: 'text',
          body: [
            l(
              'The wireframes covered the priority flows: account creation, home with the recipe of the day, navigation by categories, the individual recipe screen and the notifications area. The bottom tab navigation with 4 sections (Home, Recipes, News, Profile) was defined at this stage and kept until the final version.',
              'Os wireframes cobriram os fluxos prioritários: criação de conta, home com receita do dia, navegação por categorias, tela de receita individual e área de notificações. A navegação bottom tab com 4 seções (Home, Receitas, Notícias, Perfil) foi definida nesta etapa e mantida até a versão final.',
            ),
          ],
        },
        {
          type: 'marquee',
          height: 290,
          speed: 30,
          rows: [{ src: wireframes, alt: l('Six paper wireframes: sign-up, home with the recipe of the day, notifications, recipe categories, and a recipe screen with ingredients and comments.', 'Seis wireframes em papel: cadastro, home com a receita do dia, notificações, categorias de receitas e a tela de receita com ingredientes e comentários.') }],
        },
        { type: 'heading', text: l('Design system', 'Design system') },
        {
          type: 'text',
          body: [
            l(
              'The design system was built in Figma from the Bandoneón Initiative’s visual identity: green and wine as primary colors, Nunito as the main typeface, and rounded shapes. Medium-stroke icons without fill; rounded cards and buttons; reusable components for recipes, categories, notifications and profile.',
              'O design system foi construído no Figma a partir da identidade visual da Iniciativa Bandoneón: verde e vinho como cores primárias, Nunito como tipografia principal e formatos arredondados. Iconografia com traço médio sem preenchimento; cards e botões arredondados; componentes reutilizáveis para receitas, categorias, notificações e perfil.',
            ),
          ],
        },
        {
          type: 'figure',
          image: { src: designSystem, alt: l('Design system preview: Nunito weights, the five brand colours from dark green to wine, icons, lime and wine buttons, tags, form fields, an ingredient checklist, a timer, and components like the recipe-of-the-day card, a notification, categories and the tab bar.', 'Prévia do design system: pesos da Nunito, as cinco cores da marca do verde ao vinho, ícones, botões verde-limão e vinho, tags, campos de formulário, checklist de ingredientes, temporizador e componentes como o card da receita do dia, notificação, categorias e a barra de abas.') },
          caption: l('Design system: palette, typography and components of the Bandoneón app.', 'Design system: paleta, tipografia e componentes do aplicativo Bandoneón.'),
        },
      ],
    },
    {
      id: 'delivery',
      label: l('delivery', 'entregar'),
      blocks: [
        {
          type: 'text',
          body: [
            l(
              'With the design system established, the final screens were developed by applying each component decision and color token consistently. The result was a navigable prototype, tested with classmates, professors and the initiative’s creator himself.',
              'Com o design system estabelecido, as telas finais foram desenvolvidas aplicando cada decisão de componente e token de cor de forma consistente. O resultado foi um protótipo navegável testado com colegas, professores e com o próprio criador da iniciativa.',
            ),
          ],
        },
        { type: 'heading', text: l('Final UI', 'UI final') },
        {
          type: 'marquee',
          height: 260,
          speed: 40,
          background: '#88b40c',
          rows: [
            { src: uiSteps, alt: l('A recipe in step-by-step mode: ingredients, numbered steps with illustrations, a timer, the finished dish and comments.', 'Uma receita no modo passo a passo: ingredientes, etapas numeradas com ilustrações, temporizador, o prato pronto e comentários.') },
            { src: uiHome, alt: l('Login, interest-based onboarding, notifications, news, home with the recipe of the day, categories and a category list.', 'Login, onboarding por interesses, notificações, notícias, home com a receita do dia, categorias e uma lista de categoria.') },
            { src: uiProfile, alt: l('The recipe with checkable ingredients, the profile, saved recipes in folders, liked recipes and the shopping list.', 'A receita com ingredientes marcáveis, o perfil, receitas salvas em pastas, receitas curtidas e a lista de compras.') },
          ],
        },
        { type: 'heading', text: l('Usability test', 'Teste de usabilidade') },
        {
          type: 'list',
          intro: l(
            'The prototype was tested with classmates, professors and the creator of the Bandoneón Initiative. The most praised points:',
            'O protótipo foi testado com colegas, professores e com o criador da Iniciativa Bandoneón. Os pontos mais elogiados:',
          ),
          items: [
            l('The step-by-step mode with a timer answers the preference for guided content found in the research', 'O modo passo a passo com temporizador responde à preferência por conteúdo guiado identificada na pesquisa'),
            l('Organization by categories with difficulty filters serves both beginners and those who want to go further', 'A organização por categorias com filtros por dificuldade atende tanto ao iniciante quanto a quem quer avançar'),
            l('Onboarding by interest personalizes the experience from the first visit', 'O onboarding por interesse personaliza a experiência desde o primeiro acesso'),
          ],
        },
        {
          type: 'text',
          body: [
            l(
              'The creator of the initiative recognized in the product a faithful representation of the project’s mission.',
              'O criador da iniciativa reconheceu no produto uma representação fiel da missão do projeto.',
            ),
          ],
        },
      ],
    },
    {
      id: 'outcome',
      label: l('outcome', 'resultado'),
      blocks: [
        {
          type: 'stats',
          items: [
            { value: l('End to end', 'Ponta a ponta'), label: l('Research → personas → AI → wireframes → UI → DS → prototype → test', 'Pesquisa → personas → IA → wireframes → UI → DS → protótipo → teste') },
            { value: l('Real client', 'Cliente real'), label: l('Briefing and final validation with the founder of the Bandoneón Initiative', 'Briefing e validação final com o fundador da Iniciativa Bandoneón') },
            { value: l('Scalable system', 'Sistema escalável'), label: l('Design system with typography, palette and components ready for the product to evolve', 'Design system com tipografia, paleta e componentes prontos para a evolução do produto') },
          ],
        },
        {
          type: 'text',
          body: [
            l(
              'This was the project where I learned that UX begins long before Figma is opened. The quality of the final product was directly proportional to the quality of the questions asked at the beginning: in the research, in the briefing, in defining the requirements.',
              'Este foi o projeto onde aprendi que UX começa muito antes do Figma ser aberto. A qualidade do produto final foi diretamente proporcional à qualidade das perguntas feitas no início: na pesquisa, no briefing, na definição de requisitos.',
            ),
            l('Each screen existed because there was a real need behind it.', 'Cada tela existia porque havia uma necessidade real por trás dela.'),
          ],
        },
      ],
    },
  ],
};
