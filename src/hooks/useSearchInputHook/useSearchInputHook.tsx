import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Schema, schema } from '../../utils/rules'

import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { useQueryConfig } from '../useQueryConfig/useQueryConfig'
import { path } from '../../constants/path'
type FormData = Pick<Schema, 'name'>
export default function useSearchInputHook() {
  const queryConfig = useQueryConfig()
  const navigator = useNavigate()
  const nameSchema = schema.pick(['name'])
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const onSubmit = handleSubmit((data) => {
    const config = queryConfig.order
      ? createSearchParams(
          omit(
            {
              ...queryConfig,
              name: data.name
            },
            ['order'],
            ['sort_by']
          )
        ).toString()
      : createSearchParams({
          ...queryConfig,
          name: data.name
        }).toString()

    navigator({
      pathname: path.home,
      search: config
    })
  })

  return { register, onSubmit }
}
