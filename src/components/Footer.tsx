'use client'

import { useTranslation } from '@/hooks/useTranslation'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-dark-950 border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            {t.common.madeWith}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer