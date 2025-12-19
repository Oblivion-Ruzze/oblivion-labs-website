import { useAppContext } from '@/contexts/AppContext'
import { translations } from '@/lib/translations'

export const useTranslation = () => {
  const { language } = useAppContext()
  
  const t = translations[language]
  
  return { t, language }
}