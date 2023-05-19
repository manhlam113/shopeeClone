import Input from '../../../../components/Input'
import { useForm } from 'react-hook-form'
import { UserSchema, userSchema } from '../../../../utils/rules'
import Button from '../../../../components/Button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { userApi } from '../../../../apis/user.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntity } from '../../../../utils/utils'
import { ResponseApiFail } from '../../../../types/utils.type'
type FormData = Pick<UserSchema, 'confirm_password' | 'password' | 'new_password'>
const passwordSchema = userSchema.pick(['confirm_password', 'new_password', 'password'])
export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
    watch
  } = useForm<FormData>({
    defaultValues: {
      confirm_password: '',
      new_password: '',
      password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const updateProfileMutation = useMutation(userApi.updateProfile)
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntity<ResponseApiFail<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='mt-6 flex-grow md:mt-0 md:pr-12' onSubmit={onSubmit}>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className='relative'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='password'
                type='password'
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className='relative'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                type='password'
                name='new_password'
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Nhập lại mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className='relative'
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='confirm_password'
                type='password'
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
