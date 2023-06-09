import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from '../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import { isAxiosUnprocessableEntity } from '../../utils/utils'
import { ResponseApiFail } from '../../types/utils.type'
import Input from '../../components/Input'
import { useContext } from 'react'
import { AppContext } from '../../context/authenticated.context'
import Button from '../../components/Button/Button'
import { path } from '../../constants/path'
import authApi from '../../apis/auth.api'
import { Helmet } from 'react-helmet-async'

type FormState = Omit<Schema, 'confirm_password'>
export default function Login() {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const loginSchema = schema.pick(['email', 'password'])
  const {
    formState: { errors },
    register,
    setError,
    handleSubmit
  } = useForm<FormState>({
    resolver: yupResolver(loginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: FormState) => authApi.loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    //data này là data trả về khi thành công

    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ResponseApiFail<FormState>>(error)) {
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
        <title>Đăng nhập | Login</title>
        <meta name='description' content='Đây là trang login' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                className='relative mt-8'
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
                className='relative mt-3'
                placeholder='Password'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-white'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={path.register}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
