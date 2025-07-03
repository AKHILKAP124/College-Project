import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-6">
        Last Updated: 01 January 2025
      </p>

      <p className="mb-4">
        At <strong>INFRA</strong>, your privacy is important
        to us. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you use our task management system
        ("Platform").
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>
          <strong>Personal Information:</strong> Name, email address, and
          contact details.
        </li>
        <li>
          <strong>Account Data:</strong> Login credentials, account settings.
        </li>
        <li>
          <strong>Task Data:</strong> Tasks, notes, files you create or upload.
        </li>
        <li>
          <strong>Usage Data:</strong> IP address, device information, browser
          type, usage logs.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>To provide and maintain our Platform.</li>
        <li>To personalize your user experience.</li>
        <li>To send administrative updates and service notifications.</li>
        <li>To detect, prevent, and address technical or security issues.</li>
        <li>For analytics and performance monitoring.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Sharing of Information
      </h2>
      <p className="mb-4">
        We do not sell or rent your personal data. We may share your information
        with:
      </p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>
          Trusted service providers who assist us in operating the Platform.
        </li>
        <li>Legal or regulatory authorities when required by law.</li>
        <li>
          In connection with a merger, sale, or acquisition of all or part of
          our company.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Retention</h2>
      <p className="mb-4">
        We retain your information for as long as your account is active or as
        needed to comply with legal obligations, resolve disputes, and enforce
        our agreements.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Your Rights and Choices
      </h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>You may update or delete your account information at any time.</li>
        <li>You can opt out of non-essential communications.</li>
        <li>
          Residents of certain regions (e.g., EU) may have additional rights
          under local laws (e.g., GDPR).
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Data Security</h2>
      <p className="mb-4">
        We implement appropriate security measures to protect your data.
        However, no method of transmission or storage is 100% secure, and we
        cannot guarantee absolute security.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        7. Third-Party Services
      </h2>
      <p className="mb-4">
        Our Platform may contain links to third-party services or websites. We
        are not responsible for their privacy practices.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Children's Privacy</h2>
      <p className="mb-4">
        Our Platform is not intended for children under 13 (or under the minimum
        age required by your jurisdiction). We do not knowingly collect personal
        data from children.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        9. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with a revised effective date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
      <p className="mb-4">
        If you have questions or concerns about this policy, contact us at:
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

export default PrivacyPolicy;
