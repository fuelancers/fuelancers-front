import '@/styles/loaderSkeleton.styles.scss'

export default function CardExpert() {

  return (
    <article className="rounded-lg bg-white w-full max-w-[300px] lg:max-w-[280px]  border-text-30 border-2  ">
      <div className="top w-full  h-64 ">
        <div className="w-full  h-full rounded-lg ">
          <div className="w-full h-64 animated-background">
            <div className="background-masker"></div>
          </div>

        </div>
      </div>
      <div className="info  p-4 pb-6 relative">
        <div className="price-day rounded-xl bg-white shadow-strong w-fit absolute left-4 -top-4">
          <div className="animated-background py-3 w-32 rounded-xl">
            <div className="background-masker"></div>
          </div>
        </div>
        <div className="data relative">
          <div className="w-10/12 py-4 animated-background">
            <div className="background-masker"></div>
          </div>


        </div>
        <div className="mt-4">
          <div className="w-full h-24 animated-background">
            <div className="background-masker"></div>
          </div>
        </div>

      </div>
    </article>
  );
}
