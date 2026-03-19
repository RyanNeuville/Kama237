import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Home237',
  description: 'Politique de confidentialité de Home237. Comment nous protégeons vos données personnelles.',
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
