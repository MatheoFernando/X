import React, { useState } from "react";
import {
  ChartBar,
  ChatCircle,
  DotsThree,
  Heart,
  Repeat,
  UploadSimple,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";


interface TweetProps {
  tweet: {
    avatar: string;
    name: string;
    username: string;
    time: string;
    content: string;
    image?: string; 
    comments: number;
    likes: number;
    retweets: number;
  };
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const [comments, setComments] = useState<number>(tweet.comments);
  const [likes, setLikes] = useState<number>(tweet.likes);
  const [retweets, setRetweets] = useState<number>(tweet.retweets);
  const [liked, setLiked] = useState<boolean>(false);

  const handleAction = (action: "like" | "comments" | "retweet"): void => {
    switch (action) {
      case "like":
        setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
        setLiked(!liked);
        break;
      case "comments":
        setComments((prevComments) => prevComments + 1);
        break;
      case "retweet":
        setRetweets((prevRetweets) => prevRetweets + 1);
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b p-4 w-full transition duration-200 border-[#3A444C] hover:bg-gray-950/90 cursor-pointer"
    >
      <div className="flex space-x-3">
        <img
          src={tweet.avatar}
          alt={tweet.name}
          className="rounded-full w-10 h-10"
        />
        <div className="flex-1 flex-col">
          <div className="flex justify-between items-center">
            <a href="#">
              <a href="" className="font-bold hover:underline">{tweet.name}</a>
              <span className="ml-1 text-gray-500">@{tweet.username}</span>
              <span className="ml-2 text-gray-500 hover:underline ">{tweet.time}</span>
            </a>
            <DotsThree size={24} />
          </div>
          <p className="mt-2 ">{tweet.content}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt="Tweet"
              className="rounded-2xl max-w-full h-auto mt-3"
            />
          )}
          <div className="flex justify-between mt-4 text-gray-500">
            <div
              className="flex items-center cursor-pointer hover:text-[#1D9BF0]"
              onClick={() => handleAction("comments")}
            >
              <ChatCircle size={20} />
              <span className="ml-1">{comments}</span>
            </div>
            <div
              className="flex items-center cursor-pointer hover:text-[#1D9B]"
              onClick={() => handleAction("retweet")}
            >
              <Repeat size={20} />
              <span className="ml-1">{retweets}</span>
            </div>
            <motion.div
              whileTap={{ scale: 1.2 }}
              className="flex items-center cursor-pointer hover:text-red-400  "
              onClick={() => handleAction("like")}
            >
              <Heart
                size={20}
                className={`${
                  liked ? "text-red-400" : "hover:text-red-400 "
                }`}
              />
              <span className="ml-1">{likes}</span>
            </motion.div>
            <div className="flex items-center cursor-pointer hover:text-[#1D9BF0]">
              <ChartBar size={20} className="" />
            </div>
            <div className="flex items-center cursor-pointer hover:text-[#1D9BF0]">
              <UploadSimple size={20} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Tweet;
