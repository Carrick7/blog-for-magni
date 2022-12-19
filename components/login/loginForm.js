import Link from 'next/link';
import { useForm } from 'react-hook-form';
const { validateUserName, validateEmail, validatePassword } = require('../../utils/regex');

const LoginForm = () => {

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = ({ email, userName, password }) => {
    console.log(email, userName, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        {/* Email */}
        <label htmlFor="email"> Email </label>
        <input
         type="email"
         {...register('email', {
           required: 'Please enter email',
           pattern: {
             value: validateEmail,
             message: 'Please enter valid email',
           },
         })}
         id='email'
         autoFocus>     
        </input>
        {errors.email && (
            <div>{errors.email.message}</div>
          )
        }
        <br />

         {/* userName */}
        <label htmlFor="userName"> Username </label>
        <input
         {...register('userName', {
           required: 'Please enter username',
           pattern: {
             value: validateUserName,
             message: 'Please enter a valid username',
           },
         })}
         id='userName'
         autoFocus>     
        </input>
        {errors.userName && (
            <div>{errors.userName.message}</div>
          )
        }
        <br />

        {/* Password */}
        <label htmlFor="password"> Password </label>
        <input
         type="password"
         {...register('password', {
           required: 'Please enter password',
           pattern: {
             value: validatePassword,
             message: 'Please enter a valid password',
           },
         })}
         id='password'
         autoFocus>
        </input>
        {errors.password && (
            <div>{errors.password.message}</div>
          )
        }
        <br />

        <button> Login </button>
      </form>
    </div>
  )
}

export default LoginForm