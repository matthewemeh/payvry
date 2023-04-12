import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

import eyeImage from '../../assets/svgs/eye.svg';
import eyeSlashImage from '../../assets/svgs/eye-slash.svg';

import { HistoryData, Student } from '../../interfaces';
import { showAlert, togglePassword } from '../../utils';

import BackButton from '../../components/BackButton';

interface Props {
  studentBaseUrl: string;
}

const Profile: React.FC<Props> = ({ studentBaseUrl }) => {
  const navigate = useNavigate();

  const [pwdHidden, setPwdHidden] = useState(true);
  const [pinHidden, setPinHidden] = useState(true);

  const pinRef = useRef<HTMLInputElement>(null);
  const matricRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const update = () => {
    const generalInfoConfig: AxiosRequestConfig = {
      baseURL: studentBaseUrl,
    };

    const payload = {
      pin: pinRef.current!.value,
      fullName: fullNameRef.current!.value,
      password: passwordRef.current!.value,
      phoneNumber: phoneNumberRef.current!.value,
      matricNumber: matricRef.current!.value.toLowerCase(),
    };

    // implement update of student's details using axios here
    navigate('/student');
  };

  // componentDidMount
  useEffect(() => {
    const generalInfoConfig: AxiosRequestConfig = {
      baseURL: studentBaseUrl,
    };
    const token: string | undefined = Cookies.get('token-payvry');

    if (!token) {
      showAlert('An error occured while accessing your details');
      navigate('/student');
      return;
    }

    const payload = { token };

    axios
      .post('/user', payload, generalInfoConfig)
      .then(res => {
        const response: { studentTransaction: HistoryData[]; student: Student; message: string } =
          res.data;

        pinRef.current!.defaultValue = response.student.pin;
        fullNameRef.current!.defaultValue = response.student.fullName;
        passwordRef.current!.defaultValue = response.student.password;
        matricRef.current!.defaultValue = response.student.matricNumber;
        phoneNumberRef.current!.defaultValue = response.student.phoneNumber;
      })
      .catch((error: AxiosError) => showAlert(error.message));
  }, []);

  return (
    <main className='min-h-screen px-5 pt-14 pb-[100px] flex flex-col items-center'>
      <h1 className='font-semibold text-[20px] leading-[26px]'>Profile</h1>
      <BackButton />

      <div className='font-semibold text-[13px] leading-4 tracking-[0.06em] mt-[57px] max-w-[400px] flex flex-col gap-y-5'>
        <label htmlFor='matric'>
          <span className='mx-5'>Matric number</span>
          <input
            id='matric'
            type='text'
            ref={matricRef}
            autoCorrect='off'
            autoComplete='off'
            placeholder='Matric number'
            className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5 mt-[10px] uppercase'
          />
        </label>

        <label htmlFor='full-name'>
          <span className='mx-5'>Full name</span>
          <input
            id='full-name'
            type='text'
            ref={fullNameRef}
            autoCorrect='off'
            autoComplete='off'
            placeholder='Full name'
            className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5 mt-[10px]'
          />
        </label>

        <label htmlFor='phone'>
          <span className='mx-5'>Phone number</span>
          <input
            id='phone'
            type='text'
            ref={phoneNumberRef}
            autoCorrect='off'
            autoComplete='off'
            placeholder='Phone number'
            className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5 mt-[10px]'
          />
        </label>

        <label htmlFor='password' className='relative'>
          <span className='mx-5'>Password</span>
          <input
            id='password'
            type='password'
            ref={passwordRef}
            autoCorrect='off'
            autoComplete='off'
            placeholder='Password'
            className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5 mt-[10px]'
          />
          <img
            alt=''
            onClick={() => {
              togglePassword(passwordRef);
              setPwdHidden(!pwdHidden);
            }}
            src={pwdHidden ? eyeImage : eyeSlashImage}
            className='w-5 h-5 absolute top-[55%] right-[17px] cursor-pointer'
          />
        </label>

        <label htmlFor='pin' className='relative'>
          <span className='mx-5'>Pin</span>
          <input
            id='pin'
            type='password'
            ref={pinRef}
            autoCorrect='off'
            autoComplete='off'
            placeholder='Enter your 6-digit pin'
            className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5 mt-[10px]'
          />
          <img
            alt=''
            onClick={() => {
              togglePassword(pinRef);
              setPinHidden(!pinHidden);
            }}
            src={pinHidden ? eyeImage : eyeSlashImage}
            className='w-5 h-5 absolute top-[55%] right-[17px] cursor-pointer'
          />
        </label>

        <button
          onClick={update}
          className='bg-mine-shaft text-white w-full py-[15px] rounded-[100px] mt-[10px] font-medium text-[15px] leading-[18px]'
        >
          Update
        </button>
      </div>
    </main>
  );
};

export default Profile;
