import dynamic from 'next/dynamic';

const Dynamic = dynamic(() => import('@/components/Geo.jsx'), {
  ssr: false
});

export default function page() {
  return (
    <div>
      <Dynamic />
    </div>
  )
}
