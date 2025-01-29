import { useRef, useState } from 'react';
import {
  Smiley,
  SlidersHorizontal,
  Image,
  Gif,
  CalendarBlank,
  Circle,
  GlobeHemisphereEast,
  X,
} from '@phosphor-icons/react';
import { useAutosizeTextArea } from '../hooks/useAutosizeTextArea';

interface XFormProps {
  onTweet: (text: string, imageTweet: string | null) => void;
}

const Xform: React.FC<XFormProps> = ({ onTweet }) => {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [imageTweet, setImageTweet] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textareaRef.current, text);

  const maxCharacters = 280;

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setImageTweet(fileUrl);
    }
  };

  const handleImageRemove = () => {
    setImageTweet(null);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (textareaRef.current) {
      onTweet(textareaRef.current.value, imageTweet);
    }
    setTimeout(() => {
      setProgress(100);
    }, 3000);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
    setText('');
    setImageTweet(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxCharacters) {
      setText(value);
      setLoading(true);
      setTimeout(() => setLoading(false), 300);
    }
  };

  const remainingCharacters = maxCharacters - text.length;

  return (
    <>
      {isSubmitting && (
        <div
          className='w-full h-[2px] bg-blue-600 transition-all duration-500'
          style={{ width: `${progress}%` }}
        ></div>
      )}
      <div className='p-4 border-b border-[#3A444C] space-y-4'>
        <div className='flex gap-4'>
          <img
            src='/icon.svg'
            alt='User avatar'
            className='size-12 rounded-full'
          />
          <textarea
            className='w-full text-xl bg-transparent text-white border-none focus:outline-none overflow-y-hidden resize-none'
            rows={1}
            placeholder='O que está acontecendo?'
            maxLength={maxCharacters}
            value={text}
            onChange={handleChange}
            ref={textareaRef}
          />
        </div>
        {imageTweet && (
          <div className='relative'>
            <button className='absolute left-2 top-2 text-sm bg-gray-900 hover:bg-gray-800/80 px-3 py-1.5 rounded-full cursor-pointer'>
              Editar
            </button>
            <button
              onClick={handleImageRemove}
              className='absolute right-2 top-2 bg-gray-900 hover:bg-gray-800/80 p-1.5 rounded-full cursor-pointer'
            >
              <X size={20} className='text-white' />
            </button>
            <img
              src={imageTweet}
              alt='Tweet'
              className='rounded-2xl max-w-full h-auto mt-3'
            />
          </div>
        )}
        <button className='flex mb-2 gap-1 items-center text-blue-400 font-medium cursor-pointer hover:bg-blue-950/40 px-2 rounded-full'>
          <GlobeHemisphereEast size={18} weight='fill' />
          <span>Qualquer pessoa pode responder</span>
        </button>
        <div className='flex justify-between items-center border-t border-[#3A444C] pt-2'>
          <div className='flex space-x-2 items-center'>
            <button onClick={handleButtonClick}>
              <input
                type='file'
                name='image'
                id=''
                className='hidden'
                onChange={handleFileChange}
                ref={inputFileRef}
              />
              <Image size={20} className='text-blue-400 cursor-pointer' />
            </button>
            <Gif size={20} className='text-blue-400 cursor-pointer' />
            <SlidersHorizontal
              size={20}
              className='text-blue-400 cursor-pointer'
            />
            <Smiley size={20} className='text-blue-400 cursor-pointer' />
            <CalendarBlank size={20} className='text-blue-400 cursor-pointer' />
          </div>
          <div className='flex items-center space-x-2'>
            {loading && (
              <Circle size={20} className='text-blue-500 animate-spin' />
            )}
            <span
              className={`text-sm ${
                remainingCharacters <= 20
                  ? remainingCharacters <= 0
                    ? 'text-red-500'
                    : 'text-yellow-500'
                  : 'text-gray-400'
              }`}
            >
              {remainingCharacters}
            </span>
            <button
              disabled={text.length === 0 || text.length > maxCharacters}
              className={`transition duration-200 text-lg font-semibold py-1 px-4 text-black rounded-full ${
                text.length === 0 || text.length > maxCharacters
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-white cursor-pointer'
              }`}
              onClick={handleSubmit}
            >
              Postar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Xform;
