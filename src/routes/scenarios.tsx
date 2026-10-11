import { createFileRoute } from '@tanstack/react-router';
import { GuidePage } from '@/components/guide-page';
export const Route = createFileRoute('/scenarios')({
 head: () => ({ meta: [{ title: 'Modguard — Common scenarios' }, { name: 'description', content: 'Clear steps for the moments that need a steady hand.' }, { property: 'og:title', content: 'Modguard — Common scenarios' }, { property: 'og:description', content: 'Clear steps for the moments that need a steady hand.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GuidePage kind="scenarios" title="Common scenarios" description="Clear steps for the moments that need a steady hand."/>,
});
