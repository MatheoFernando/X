import { useRef, useState } from "react";
import {
  Smiley,
  SlidersHorizontal,
  Image,
  Gif,
  CalendarBlank,
  Circle,
} from "@phosphor-icons/react";
import logo from "/Moco.jpg";

interface XFormProps {
  onTweet: (text: string) => void; 
}

const Xform: React.FC<XFormProps> = ({ onTweet  }) => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const maxCharacters = 280;

  const handleSubmit = () => {
    if (textareaRef.current) {
      onTweet(textareaRef.current.value );
    }
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
    <div
      className={`p-4 border-b ${
        text.length > 0 ? "border-blue-500" : "border-[#3A444C]"
      }`}
    >
      <div className="flex gap-4">
        <img src={logo} alt="User avatar" className="size-12 rounded-full" />
        <textarea
          className="w-full text-base bg-transparent text-white border-none focus:outline-none  resize-none"
          rows={5}
          placeholder="What's happening?"
          maxLength={maxCharacters}
          value={text}
          onChange={handleChange}
          ref={textareaRef}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="text-[1DA1F2] cursor-pointer flex space-x-2">
          <Image size={20} className="text-blue-400" />
          <Gif size={20} className="text-blue-400" />
          <SlidersHorizontal size={20} className="text-blue-400" />
          <Smiley size={20} className="text-blue-400" />
          <CalendarBlank size={20} className="text-blue-400" />
        </div>
        <div className="flex items-center space-x-2">
          {loading && (
            <Circle size={20} className="text-blue-500 animate-spin" />
          )}
          <span
            className={`text-sm ${
              remainingCharacters <= 20
                ? remainingCharacters <= 0
                  ? "text-red-500"
                  : "text-yellow-500"
                : "text-gray-400"
            }`}
          >
            {remainingCharacters}
          </span>
          <button
            disabled={text.length === 0 || text.length > maxCharacters}
            className={`transition duration-200 text-lg font-semibold py-1 px-4 rounded-full ${
              text.length === 0 || text.length > maxCharacters
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#1D9BF0]"
            }`}
            onClick={handleSubmit}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Xform;
