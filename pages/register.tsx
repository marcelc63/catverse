import * as React from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'

import { register as registerUser, resetResponse } from '~/store/user'
import { schema, ISchema } from '~/interfaces/Register'
import { RootState, useAppSelector, useAppDispatch } from '~/store/store'

import Layout from '~/layouts/Centered'
import Input from '~/components/base/Input'
import ResponseHandler from '~/components/base/ResponseHandler'

type FormValues = ISchema

const Register = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const responses = useAppSelector((state: RootState) => state.user.responses)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const payload = data
    let res = await dispatch(registerUser(payload))
    if (registerUser.fulfilled.match(res)) {
      router.push('/login')
    }
  }

  return (
    <Layout>
      <div className="flex flex-col bg-white p-2 rounded shadow max-w-xl w-full">
        <ResponseHandler
          responses={responses}
          type={registerUser.typePrefix}
          reset={resetResponse}
        />
        <p className="mb-2 font-bold">Registrasi</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="mb-1">Email</p>
          <Input
            className="mb-2"
            placeholder="Email"
            type="email"
            name="email"
            register={register}
            errors={errors}
          />
          <p className="mb-1">Password</p>
          <Input
            className="mb-4"
            placeholder="Password"
            type="password"
            name="password"
            register={register}
            errors={errors}
          />
          <p className="mb-1">Name</p>
          <Input
            className="mb-4"
            placeholder="Name"
            name="name"
            register={register}
            errors={errors}
          />
          <p className="mb-1">Phone</p>
          <Input
            className="mb-4"
            placeholder="Phone"
            name="phone"
            register={register}
            errors={errors}
          />
          <button className="bg-blue-500 px-2 py-1 mb-2 rounded text-white w-full">
            Create Account
          </button>
        </form>
        <Link href="/">
          <button className="text-gray-500">Back to Home</button>
        </Link>
      </div>
    </Layout>
  )
}

export default Register
