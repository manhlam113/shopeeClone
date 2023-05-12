export default function SortProduct() {
  return (
    <div className='py-5'>
      <div className='bg-[rgba(0,0,0,.03)] p-2'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <div>Sản phẩm theo</div>
            <button className=' bg-orange px-4 py-2 text-white hover:bg-orange/80'>Liên quan </button>
            <button className=' bg-white/80 px-4 py-2 hover:bg-slate-100'>Mới nhất</button>
            <button className=' bg-white/80 px-4 py-2  hover:bg-slate-100'>Bán chạy</button>
            <select
              className='bg-white px-4 py-2 text-left capitalize text-black outline-none hover:bg-slate-100'
              defaultValue=''
            >
              <option value='' disabled>
                Giá
              </option>
              <option value='price:asc'>Giá: Thấp đến cao</option>
              <option value='price:desc'>Giá: Cao đến thấp</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-red-500'>
              1<span className='text-black'>/2</span>
            </span>
            <div>
              <button className='h-8 cursor-not-allowed rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </button>
              <button className='h-8 cursor-not-allowed rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
