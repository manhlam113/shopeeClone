import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Schema, schema } from '../../utils/rules'
// eslint-disable-next-line import/no-unresolved
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import Input from '../../components/Input'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntity } from '../../utils/utils'
import { ResponseApiFail } from '../../types/utils.type'
import { useContext } from 'react'
import { AppContext } from '../../context/authenticated.context'
import Button from '../../components/Button/Button'
import { path } from '../../constants/path'
import authApi from '../../apis/auth.api'
import { Helmet } from 'react-helmet-async'

export type FormState = Schema

export default function Register() {
  const { setIsAuthenticated } = useContext(AppContext)
  const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
  const {
    formState: { errors },
    register,
    setError,
    handleSubmit
  } = useForm<FormState>({
    resolver: yupResolver(registerSchema)
  })
  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormState, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body, {
      onSuccess: () => {
        setIsAuthenticated(true)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ResponseApiFail<Omit<FormState, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormState, 'confirm_password'>, {
                type: 'Server',
                message: formError[key as keyof Omit<FormState, 'confirm_password'>]
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Đăng Ký | Register</title>
        <meta name='description' content='Đây là trang Đăng ký' />
      </Helmet>
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
                className='relative mt-3 '
                placeholder='Password'
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                errorMessage={errors.confirm_password?.message}
                className='relative mt-3 '
                placeholder='Confirm Password'
              />
              <div className='mt-3'>
                <Button
                  isLoading={registerMutation.isLoading}
                  // isLoading={true}
                  disabled={registerMutation.isLoading}
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={path.login}>
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
