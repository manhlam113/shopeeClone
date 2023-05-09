import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Schema, schema } from '../../utils/rules'
// eslint-disable-next-line import/no-unresolved
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '../../components/Input'
export type ErrorForm = Schema

export default function Register() {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<ErrorForm>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log('Data', data)
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                className='mt-8'
                name='email'
                register={register}
                type='email'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
                className='mt-3'
                placeholder='Password'
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                errorMessage={errors.confirm_password?.message}
                className='mt-3'
                placeholder='Confirm Password'
              />
              <div className='mt-3'>
                <button className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
