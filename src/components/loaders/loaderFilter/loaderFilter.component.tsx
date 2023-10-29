import '@/styles/loaderSkeleton.styles.scss'

export default function LoaderFIlter() {
  return (
    <ul className='p-0 m-0 flex flex-col gap-3 '>
      <li className='w-full py-3  rounded-sm animated-background'><p className="m-0 background-masker"></p></li>
      <li className='w-full py-3  rounded-sm animated-background'><p className="m-0 background-masker"></p></li>
      <li className='w-full py-3  rounded-sm animated-background'><p className="m-0 background-masker"></p></li>
      <li className='w-full py-3  rounded-sm animated-background'><p className="m-0 background-masker"></p></li>
    </ul>
  )
}
