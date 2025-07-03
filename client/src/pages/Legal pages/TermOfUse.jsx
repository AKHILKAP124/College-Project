import React from "react";

const TermsOfUse = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-6">
        Last Updated: 01 January 2025
      </p>

      <p className="mb-4">
        Welcome to <strong>INFRA</strong> (the “Platform”), a task management
        system owned and operated by <strong>Akhil Thakur</strong>. These Terms of Use ("Terms") govern your access to and
        use of the Platform, including all related tools, features, and content.
      </p>

      <p className="mb-4">
        By accessing or using the Platform, you agree to be bound by these Terms
        and our{" "}
        <a href="/legal/privacy-policy" className="text-blue-600 underline">
          Privacy Policy
        </a>
        . If you do not agree, please do not use the Platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
      <p className="mb-4">
        You must be at least 13 years old (or the age of majority in your
        jurisdiction) to use the Platform. By using the Platform, you represent
        and warrant that you meet this requirement.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>
          You are responsible for maintaining the confidentiality of your
          account credentials.
        </li>
        <li>
          You agree to provide accurate and complete information when
          registering.
        </li>
        <li>
          You are fully responsible for all activities under your account.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Use of the Platform
      </h2>
      <p className="mb-2">
        You agree to use the Platform in accordance with all applicable laws and
        these Terms. You will not:
      </p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>
          Use the Platform for any unlawful, harmful, or fraudulent purpose.
        </li>
        <li>
          Attempt to gain unauthorized access to the Platform or related
          systems.
        </li>
        <li>
          Copy, modify, or distribute any part of the Platform without prior
          written permission.
        </li>
        <li>Upload viruses or malicious code.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Content</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>
          <strong>User Content:</strong> You retain ownership of all content
          (tasks, notes, attachments) you submit. You grant us a limited license
          to use, host, and process this content to provide the service.
        </li>
        <li>
          <strong>Our Content:</strong> All software, design, and intellectual
          property on the Platform remain the property of INFRA.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Subscriptions and Payments (if applicable)
      </h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>You agree to pay all applicable fees.</li>
        <li>
          Subscriptions renew automatically unless canceled before the billing
          date.
        </li>
        <li>No refunds are provided unless required by law.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Termination</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>
          We reserve the right to suspend or terminate your access to the
          Platform at our discretion, with or without notice.
        </li>
        <li>
          You may also terminate your account at any time via your account
          settings.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Disclaimer</h2>
      <p className="mb-4">
        The Platform is provided <strong>"as is"</strong> and{" "}
        <strong>"as available"</strong> without warranties of any kind. We do
        not guarantee that the Platform will be error-free, uninterrupted, or
        secure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        8. Limitation of Liability
      </h2>
      <p className="mb-4">
        To the fullest extent permitted by law, INFRA is not
        liable for any indirect, incidental, consequential, or punitive damages
        arising out of or related to your use of the Platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        9. Modifications to the Terms
      </h2>
      <p className="mb-4">
        We may update these Terms from time to time. We will notify you of
        material changes via email or within the Platform. Continued use after
        changes means you accept the revised Terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by the laws of INFRA, without
        regard to its conflict of laws principles.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">11. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns, please contact us at:
        <br />
        📧 Email:{" "}
        <a
          href="mailto:support@yourcompany.com"
          className="text-blue-600 underline"
        >
          akhilkapur0@gmail.com
        </a>
        <br />
        📍 Address: Dharamshala, Himachal Pradesd, IN.
      </p>
    </div>
  );
};

export default TermsOfUse;
