'use client'

// import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  // const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-950/50 to-secondary-950/50 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold gradient-text-static">Privacy Policy</h1>
          <p className="text-gray-300 mt-4">Last updated: December 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              When you contact us through our website, we collect the following information:
            </p>
            <ul className="text-gray-300 space-y-2 ml-6">
              <li>• <strong>Personal Information:</strong> Name, email address, company name (optional)</li>
              <li>• <strong>Project Information:</strong> Project details, budget range, and any other information you provide in your message</li>
              <li>• <strong>Technical Information:</strong> IP address, browser type, and device information for security and analytics purposes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use the information you provide to:
            </p>
            <ul className="text-gray-300 space-y-2 ml-6">
              <li>• Respond to your inquiries and provide project quotes</li>
              <li>• Communicate about potential projects and services</li>
              <li>• Improve our website and services</li>
              <li>• Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="text-gray-300 space-y-2 ml-6">
              <li>• With your explicit consent</li>
              <li>• To comply with legal requirements or court orders</li>
              <li>• To protect our rights, property, or safety</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law. Contact form submissions are typically retained for up to 2 years for business purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="text-gray-300 space-y-2 ml-6">
              <li>• Access the personal information we hold about you</li>
              <li>• Request correction of inaccurate information</li>
              <li>• Request deletion of your personal information</li>
              <li>• Object to the processing of your personal information</li>
              <li>• Request data portability</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-300 leading-relaxed">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">8. International Data Transfers</h2>
            <p className="text-gray-300 leading-relaxed">
              As we operate from Cuba, your information may be processed and stored in Cuba. By using our services, you consent to the transfer of your information to Cuba, which may have different data protection laws than your country of residence.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="bg-dark-800/50 p-6 rounded-lg border border-white/10">
              <p className="text-white font-medium mb-2">Oblivion Development</p>
              <p className="text-gray-300">Email: contact@oblivion.dev</p>
              <p className="text-gray-300">Location: Cuba</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}