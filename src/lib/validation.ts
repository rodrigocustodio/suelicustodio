import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Nome é obrigatório" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  email: z.string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  message: z.string()
    .trim()
    .min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" })
    .max(2000, { message: "Mensagem deve ter no máximo 2000 caracteres" })
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const autoestimaContactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Nome é obrigatório" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  email: z.string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  whatsapp: z.string()
    .trim()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, { 
      message: "WhatsApp inválido. Use o formato (11) 99999-9999" 
    }),
  consent_contact: z.boolean()
    .refine(val => val === true, { 
      message: "Você precisa concordar em receber contato" 
    }),
  consent_privacy: z.boolean()
    .refine(val => val === true, { 
      message: "Você precisa aceitar a Política de Privacidade" 
    })
});

export type AutoestimaContactFormData = z.infer<typeof autoestimaContactFormSchema>;
