import { WhatsAppInteractiveMessage } from './client'

export enum ChatState {
  WELCOME = 'welcome',
  MAIN_MENU = 'main_menu',
  QUOTE_PROJECT_TYPE = 'quote_project_type',
  QUOTE_ROOM_SIZE = 'quote_room_size',
  QUOTE_TIMELINE = 'quote_timeline',
  QUOTE_BUDGET = 'quote_budget',
  QUOTE_PHOTOS = 'quote_photos',
  QUOTE_CONTACT = 'quote_contact',
  QUOTE_CONFIRM = 'quote_confirm',
  SERVICE_INFO = 'service_info',
  PORTFOLIO = 'portfolio',
  HUMAN_HANDOFF = 'human_handoff',
  FAQ = 'faq'
}

export const WELCOME_MESSAGE = `Olá! 👋 Bem-vindo à *Pisos Pró*!

Sou o assistente virtual e estou aqui para ajudar você com soluções profissionais em pisos. 

Temos mais de 15 anos de experiência em instalação, reforma e manutenção de pisos de todos os tipos!

Como posso ajudá-lo hoje?`

export const MAIN_MENU_BUTTONS: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'button',
    body: {
      text: WELCOME_MESSAGE
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id: 'request_quote',
            title: '📋 Solicitar Orçamento'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'view_services',
            title: '🏠 Ver Serviços'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'view_portfolio',
            title: '📸 Ver Portfólio'
          }
        }
      ]
    }
  }
}

export const SECONDARY_MENU_BUTTONS: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'button',
    body: {
      text: 'Outras opções disponíveis:'
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id: 'talk_human',
            title: '💬 Falar com Atendente'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'faq',
            title: '❓ Perguntas Frequentes'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'main_menu',
            title: '🏠 Menu Principal'
          }
        }
      ]
    }
  }
}

export const PROJECT_TYPE_MENU: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'list',
    body: {
      text: 'Perfeito! Vamos começar seu orçamento. 📋\n\nPrimeiro, qual tipo de projeto você tem em mente?'
    },
    action: {
      button: 'Selecionar Projeto',
      sections: [
        {
          title: 'Tipos de Piso',
          rows: [
            {
              id: 'madeira',
              title: 'Madeira',
              description: 'Instalação de pisos de madeira'
            },
            {
              id: 'acabamento',
              title: 'Acabamento',
              description: 'Serviços de acabamento em pisos'
            },
            {
              id: 'laminado',
              title: 'Laminado',
              description: 'Pisos laminados'
            },
            {
              id: 'vinílico',
              title: 'Vinílico/LVT',
              description: 'Pisos vinílicos e LVT'
            }
          ]
        },
        {
          title: 'Serviços',
          rows: [
            // {
            //   id: 'carpet',
            //   title: 'Carpete',
            //   description: 'Instalação de carpetes'
            // },
            {
              id: 'reacabamentoing',
              title: 'Restauração',
              description: 'Restauração de pisos existentes'
            },
            {
              id: 'reparo',
              title: 'Reparo',
              description: 'Reparos em pisos'
            },
            {
              id: 'multiple',
              title: 'Vários Serviços',
              description: 'Combinação de serviços'
            }
          ]
        }
      ]
    }
  }
}

export const TIMELINE_MENU: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'button',
    body: {
      text: 'Ótimo! Agora me conte sobre o cronograma.\n\nQuando você gostaria de iniciar o projeto?'
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id: 'asap',
            title: '🚀 O mais rápido'
          }
        },
        {
          type: 'reply',
          reply: {
            id: '1-2weeks',
            title: '📅 1-2 semanas'
          }
        },
        {
          type: 'reply',
          reply: {
            id: '1month',
            title: '🗓️ Em 1 mês'
          }
        }
      ]
    }
  }
}

export const TIMELINE_EXTENDED_MENU: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'button',
    body: {
      text: 'Outras opções de cronograma:'
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id: '2-3months',
            title: '📊 2-3 meses'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'planning',
            title: '💭 Apenas planejando'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'back_timeline',
            title: '⬅️ Voltar'
          }
        }
      ]
    }
  }
}

export const BUDGET_MENU: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'list',
    body: {
      text: 'Perfeito! Para fornecer o melhor orçamento, qual seria a faixa de investimento que você tem em mente? 💰'
    },
    action: {
      button: 'Selecionar Orçamento',
      sections: [
        {
          title: 'Faixas de Orçamento',
          rows: [
            {
              id: 'under15k',
              title: 'Até R$ 15.000',
              description: 'Projetos menores'
            },
            {
              id: '15k-30k',
              title: 'R$ 15.000 - R$ 30.000',
              description: 'Projetos médios'
            },
            {
              id: '30k-60k',
              title: 'R$ 30.000 - R$ 60.000',
              description: 'Projetos grandes'
            },
            {
              id: '60k-150k',
              title: 'R$ 60.000 - R$ 150.000',
              description: 'Projetos premium'
            },
            {
              id: 'over150k',
              title: 'Acima de R$ 150.000',
              description: 'Projetos exclusivos'
            }
          ]
        }
      ]
    }
  }
}

export const SERVICES_INFO = `🏠 *Nossos Serviços Especializados*

✨ *Instalação de Pisos*
• Madeira maciça e engenheirada
• Cerâmica e porcelanato
• Laminados de alta qualidade
• Vinílicos e LVT
• Carpetes residenciais e comerciais

🔧 *Restauração e Manutenção*
• Restauração de pisos de madeira
• Lixamento e envernizamento
• Reparos e substituições
• Limpeza profissional

💎 *Diferenciais Pisos Pró*
• +15 anos de experiência
• Garantia em todos os serviços
• Orçamento gratuito e sem compromisso
• Materiais de primeira qualidade
• Equipe especializada

📞 *Entre em contato:*
• WhatsApp: (11) 94014-7157
• Email: contato@pisospro.com.br`

export const FAQ_INFO = `❓ *Perguntas Frequentes*

*🕐 Qual o prazo de execução?*
Varia conforme o projeto, de 2-5 dias para ambientes pequenos até 2-3 semanas para projetos maiores.

*💰 Como funciona o orçamento?*
Fazemos uma visita gratuita para medir e avaliar. O orçamento é detalhado e sem surpresas.

*🛡️ Vocês oferecem garantia?*
Sim! Garantia de 1 ano para instalação e até 5 anos para alguns materiais.

*🎨 Posso ver amostras dos materiais?*
Claro! Levamos amostras na visita ou você pode visitar nossa loja.

*🏠 Atendem toda São Paulo?*
Sim, atendemos toda a Grande São Paulo e região.

*💳 Quais formas de pagamento?*
Cartão, boleto, PIX. Parcelamos em até 12x sem juros.`

export function getProjectTypeDescription(projectType: string): string {
  const descriptions: Record<string, string> = {
    madeira: 'Instalação de Pisos de Madeira - Elegância e durabilidade para sua casa',
    //tile: 'Cerâmica e Pedra - Resistência e beleza para todos os ambientes',  
    laminado: 'Piso Laminado - Praticidade e economia sem abrir mão do estilo',
    vinílico: 'Vinílico e LVT - Tecnologia e conforto para ambientes modernos',
    other: 'Outros Serviços - Soluções especializadas para suas necessidades',
    reacabamentoing: 'Restauração de Pisos - Renovamos seus pisos como novos',
    reparo: 'Reparo de Pisos - Soluções rápidas para pequenos problemas',
    multiple: 'Vários Serviços - Soluções completas para seu projeto'
  }
  return descriptions[projectType] || 'Serviço de pisos profissional'
}

export function getBudgetDescription(budget: string): string {
  const descriptions: Record<string, string> = {
    'under15k': 'Até R$ 15.000',
    '15k-30k': 'R$ 15.000 - R$ 30.000', 
    '30k-60k': 'R$ 30.000 - R$ 60.000',
    '60k-150k': 'R$ 60.000 - R$ 150.000',
    'over150k': 'Acima de R$ 150.000'
  }
  return descriptions[budget] || budget
}

export function getTimelineDescription(timeline: string): string {
  const descriptions: Record<string, string> = {
    'asap': 'O mais rápido possível',
    '1-2weeks': '1 a 2 semanas',
    '1month': 'Em até 1 mês',
    '2-3months': '2 a 3 meses',
    'planning': 'Apenas planejando'
  }
  return descriptions[timeline] || timeline
}