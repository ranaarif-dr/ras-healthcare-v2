// PrivacyPolicy.js
import React from 'react';
import { Globe, Shield, Users, ShoppingBag, ExternalLink } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-[800px] mx-auto p-5 font-sans leading-relaxed">
      <h1 className="text-center mb-5 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-6">
        This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from <a href="https://www.rashealthcare.com.pk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Ras Healthcare</a>.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4"><Users size={24} /> Personal Information We Collect</h2>
        <p className="mb-4">
          When you visit the site, we automatically collect information about your device, including your web browser, IP address, time zone, and cookies. Additionally, we track web pages or products viewed, referral sites, and interactions with our site. This is referred to as <strong>&quot;Device Information&quot;</strong>.
        </p>
        <h4 className="text-lg font-medium mb-2">We collect Device Information using:</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>&quot;Cookies&quot; - Data files stored on your device. More about cookies: <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">All About Cookies</a>.</li>
          <li>&quot;Log files&quot; - Track actions and collect IP address, browser type, ISP, and timestamps.</li>
          <li>&quot;Web beacons&quot;, &quot;tags&quot;, and &quot;pixels&quot; - Monitor browsing behavior.</li>
        </ul>
        <p>
          When making a purchase or attempting to do so, we collect <strong>Order Information</strong>, including your name, billing and shipping address, payment details, email, and phone number.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4"><ShoppingBag size={24} /> How Do We Use Your Information?</h2>
        <p className="mb-2">We use your Order Information to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Process orders and arrange for shipping.</li>
          <li>Communicate with you about your order.</li>
          <li>Screen for fraud risks.</li>
          <li>Provide information and marketing communications (based on preferences).</li>
        </ul>
        <p>
          Device Information helps us detect fraud (via IP address) and improve the site&apos;s performance through analytics.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4"><Globe size={24} /> Sharing Your Personal Information</h2>
        <p className="mb-4">
          We share information with third parties to enhance your experience. For example:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>We use Shopify for our store. Read their privacy policy: <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Shopify Privacy</a>.</li>
          <li>We use Google Analytics to understand usage. More info: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Google Privacy</a>. You can opt-out: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Google Opt-out</a>.</li>
        </ul>
        <p>
          We may also share your information to comply with laws or protect our rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4"><Shield size={24} /> Behavioural Advertising</h2>
        <p className="mb-4">
          We use your information to provide relevant ads. Learn more about targeted ads: <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">NAI</a>.
        </p>
        <h4 className="text-lg font-medium mb-2">Opt-out Links:</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Facebook Ads</a></li>
          <li><a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Google Ads</a></li>
          <li><a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Bing Ads</a></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4"><Users size={24} /> Your Rights</h2>
        <p>
          If you are a European resident, you have the right to access, update, or delete personal data we hold about you. Contact us if you wish to exercise these rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4"><ExternalLink size={24} /> Data Retention & Changes</h2>
        <p>
          We retain order information unless you request deletion. Our privacy policy may change over time to reflect new practices or legal requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          For questions or complaints, contact us via email at <a href="mailto:info@rashealthcare.com.pk" className="text-blue-600 hover:text-blue-800">info@rashealthcare.com.pk</a> or by mail at:
        </p>
        <address className="not-italic">
          RAS Healthcare<br />
          74-C, First Floor, 10th Commercial Street,<br />
          Phase-4, D.H.A, Karachi
        </address>
      </section>
    </div>
  )
}

export default PrivacyPolicy;
