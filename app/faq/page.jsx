import dynamic from 'next/dynamic';

const Geo = dynamic(() => import('@/components/geo'), {
  ssr: false
});

export default function page() {
  return (
    <div>
      <Geo />
    </div>
  )
}
