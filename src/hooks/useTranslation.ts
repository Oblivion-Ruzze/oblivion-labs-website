import { useAppStore } from '@/stores/useAppStore'
import { translations } from '@/lib/translations'

export const useTranslation = () => {
  const language = useAppStore((state) => state.language)
  
  const t = translations[language]
  
  return { t, language }
}