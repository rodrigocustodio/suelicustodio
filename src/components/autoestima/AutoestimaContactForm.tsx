import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { autoestimaContactFormSchema, AutoestimaContactFormData } from '@/lib/validation';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { track } from '@/lib/analytics';
import { trackFacebookEvent } from '@/lib/facebook';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export const AutoestimaContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<AutoestimaContactFormData>({
    resolver: zodResolver(autoestimaContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      consent_contact: false,
      consent_privacy: false,
    },
  });

  const onSubmit = async (data: AutoestimaContactFormData) => {
    setIsSubmitting(true);
    track('autoestima_form_submit');


    try {
      const { data: insertedData, error } = await supabase
        .from('contact_messages')
        .insert({
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          message: 'Contato via landing page Autoestima Inabalável',
          consent_contact: data.consent_contact,
          consent_privacy: data.consent_privacy,
          source_page: 'autoestima',
        })
        .select();

      if (error) {
        throw new Error('Database error');
      }

      if (!insertedData || insertedData.length === 0) {
        throw new Error('Failed to save data');
      }
      
      // Fire browser-side Facebook Pixel Lead event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Autoestima Inabalável',
          content_category: 'Contact Form',
        });
      }

      // Track Facebook Lead event via Conversion API (non-blocking)
      trackFacebookEvent('Lead', {
        content_name: 'Autoestima Inabalável',
        content_category: 'Contact Form',
      }, {
        email: data.email,
        phone: data.whatsapp.replace(/\D/g, ''),
      }).catch(() => {});

      // Show success message
      toast({
        title: '✅ Dados salvos com sucesso!',
        description: 'Redirecionando para WhatsApp em 2 segundos...',
        duration: 5000,
      });

      // Reset form
      form.reset();
      
      // Redirect to WhatsApp after confirmed successful submission
      setTimeout(() => {
        window.open('https://wa.me/5511945300128?text=Seja%20bem-vinda%20%F0%9F%8C%B7%0A%0AQue%20bom%20que%20voc%C3%AA%20decidiu%20falar%20comigo.%0A%0APara%20eu%20te%20entender%20melhor%2C%20me%20conta%20uma%20coisa%3A%0A%0AO%20que%20hoje%20est%C3%A1%20mais%20pesado%20emocionalmente%20para%20voc%C3%AA%3F', '_blank');
      }, 2000);
      
    } catch (error) {
      toast({
        title: 'Erro ao salvar dados',
        description: 'Não foi possível salvar suas informações. Por favor, tente novamente.',
        variant: 'destructive',
        duration: 7000,
      });

      // Keep form data so user doesn't lose their input
      // Don't reset the form on error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
          <FormItem>
              <FormLabel className="text-base">Nome Completo *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Como você gostaria de ser chamada?" 
                  {...field}
                  onFocus={() => track('autoestima_form_start')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
          <FormItem>
              <FormLabel className="text-base">Email *</FormLabel>
              <FormControl>
                <Input 
                  type="email"
                  placeholder="seu@email.com" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
          <FormItem>
              <FormLabel className="text-base">WhatsApp *</FormLabel>
              <FormControl>
                <Input 
                  type="tel"
                  placeholder="(11) 99999-9999"
                  {...field}
                  onChange={(e) => {
                    // Format phone number as user types
                    const value = e.target.value.replace(/\D/g, '');
                    let formatted = '';
                    if (value.length > 0) {
                      formatted = '(' + value.substring(0, 2);
                      if (value.length >= 3) {
                        formatted += ') ' + value.substring(2, 7);
                      }
                      if (value.length >= 7) {
                        formatted += '-' + value.substring(7, 11);
                      }
                    }
                    field.onChange(formatted);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent_contact"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-normal text-base">
                  Concordo em receber contato via WhatsApp e email *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent_privacy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-normal text-base">
                  Li e aceito a Política de Privacidade *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <p className="text-sm text-ink-600">* Campos obrigatórios</p>

        <Button 
          type="submit" 
          className="w-full text-lg" 
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Agende o Seu Horário'}
        </Button>
      </form>
    </Form>
  );
};
