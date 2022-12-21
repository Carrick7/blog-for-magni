import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '../../utils/error';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import login_validate from '../../utils/loginValidation';

const LoginForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email:'',
      password:''
    },
    validate : login_validate,
    onSubmit
  })

   async function onSubmit(values){
    const status = await signIn('credentials',
    {
      redirect:false,
      email:values.email,
      password:values.password,
      callbackUrl: "/admin/adminDashboard"
    })
    console.log(status)
    if(status.ok)router.push(status.url)
    if(status.error){
      alert(error)
    }
  }
  
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label> Email </label>
        <input
          type='email'
          name='email'
          placeholder='Enter Email'
          {...formik.getFieldProps('email')}
        >
        </input>
        <br/>
        {formik.errors.email && formik.touched.email? <span>{formik.errors.email}</span>:<></>}
        <br/>

        <label> Password </label>
        <input
          type='password'
          name='password'
          placeholder='Enter Password'
          {...formik.getFieldProps('password')}
        >
        </input>
        <br/>
        {formik.errors.password && formik.touched.password? <span>{formik.errors.password}</span>:<></>}
        <br/>

        <button type='submit'>
          Login
        </button>

      </form>
    </div>
  )
}

export default LoginForm