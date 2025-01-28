import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Tweet from './components/Tweet';
import Xform from './components/Xform';
import { v4 as uuidv4 } from 'uuid';
import { ImagemContent } from './utils/generateImg';
import { motion, AnimatePresence } from 'framer-motion';
import Aside from './components/Aside';
import { faker } from '@faker-js/faker';
import moment from 'moment';
interface Tweet {
  id: string;
  name: string;
  username: string;
  avatar: string;
  content: string;
  time: string | Date;
  image: string | null;
  likes: number;
  retweets: number;
  comments: number;
}

const App: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const shouldLoadRef = useRef<boolean>(true);

  useEffect(() => {
    addInitialTweets();
    setupIntersectionObserver();

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (loadingRef.current && observerRef.current) {
      observerRef.current.observe(loadingRef.current);
    }
  }, [tweets]);

  const setupIntersectionObserver = () => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          !isLoading &&
          !isWaiting &&
          shouldLoadRef.current
        ) {
          shouldLoadRef.current = false;
          loadMoreTweets();
        }
      },
      { threshold: 0.1 }
    );
  };

  // Configura o Moment.js para usar localização em português
  moment.locale('pt-br');

  // Função para formatar a data de maneira personalizada
  function formatarData(data: any) {
    const agora = moment();
    const dataMoment = moment(data);

    const segundos = agora.diff(dataMoment, 'seconds');
    const minutos = agora.diff(dataMoment, 'minutes');
    const horas = agora.diff(dataMoment, 'hours');

    if (segundos < 60) {
      return `${segundos}s`;
    } else if (minutos < 60) {
      return `${minutos}m`;
    } else if (horas < 24) {
      return `${horas}h`;
    } else {
      // Formata a data como "16 de jan"
      return dataMoment.format('D [de] MMM');
    }
  }

  // Gera uma data fictícia com o Faker
  const dataFicticia = faker.date.between({
    from: '2024-06-01',
    to: new Date(),
  });

  const randomName = faker.person.fullName();
  const user = {
    name: 'Moco',
    username: 'moco.finance',
    avatar: '/Moco.jpg',
  };

  const createTweet = (content: string, isnewPost: boolean): Tweet => {
    return {
      id: uuidv4(),
      name: isnewPost ? user.name : randomName,
      username: isnewPost ? user.username : faker.internet.username(),
      avatar: isnewPost ? user.avatar : faker.image.avatar(),
      content: content ? content : '',
      time: isnewPost ? new Date().toString() : dataFicticia,
      image: isnewPost ? null : ImagemContent(),
      likes: 0,
      retweets: 0,
      comments: 0,
    };
  };

  const addInitialTweets = () => {
    const initialTweets = [
      'Acabei de entrar no clone do Twitter! Estou animado para me conectar com todos aqui. 👋 #NovoUsuário',
      'Mais um dia, mais uma linha de código. Continuem avançando, colegas desenvolvedores! 💻 #VidaDeCodificação',
      'Quem mais vai ficar acordado até tarde para assistir à chuva de meteoros hoje à noite? 🌠 #CéuNoturno',
      'Lembrete: seja gentil consigo mesmo e com os outros. Um pouco de compaixão faz toda a diferença. ❤️ #Positividade',
    ];

    const newTweets = initialTweets.map((content) =>
      createTweet(content, false)
    );
    setTweets(newTweets);
  };

  const loadMoreTweets = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const randomTweets = [
      'Dica técnica do dia: sempre faça backup dos seus dados! 💾 ​​#ConselhoTecnológico',
      'Você já sorriu hoje? Um pequeno gesto pode melhorar o seu dia. 😊 #BemEstar',
      'Explorando o mundo do React! Cada componente é uma nova aventura. ⚛️ #Desenvolvimento',
      'Alguém mais está empolgado com as novidades tecnológicas que estão por vir? 🚀 #Inovação',
      'Café e código: a combinação perfeita para um desenvolvedor. ☕💻 #DevLife',
    ];

    const newTweets: Tweet[] = [];
    for (let i = 0; i < 2; i++) {
      const randomTweet =
        randomTweets[Math.floor(Math.random() * randomTweets.length)];
      newTweets.push(createTweet(randomTweet, false));
    }

    setTweets((prevTweets) => [...prevTweets, ...newTweets]);

    setIsLoading(false);
    setIsWaiting(true);

    setTimeout(() => {
      setIsWaiting(false);
      shouldLoadRef.current = true;
      const entry = observerRef.current?.takeRecords()[0];
      if (entry?.isIntersecting) {
        loadMoreTweets();
      }
    }, 1000);
  };

  const handleTweetCreation = (content: string) => {
    const newTweet = createTweet(content, true);
    setTweets((prevTweets) => [newTweet, ...prevTweets]);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTweets([...tweets]);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [tweets]);

  return (
    <div className='md:mx-auto flex flex-col md:flex-row text-white md:max-w-5xl'>
      <Navbar />
      <main className='flex-grow border-x border-[#3A444C] max-w-xl'>
        <header className='sticky top-0 z-10 bg-black bg-opacity-90 border-b border-[#3A444C] backdrop-blur-lg pb-6 '>
          <a className='px-4 pt-4 font-bold cursor-pointer'>Home</a>
        </header>
        <Xform onTweet={handleTweetCreation} />
        <AnimatePresence>
          <div className='flex flex-col gap-4'>
            {tweets.map((tweet) => (
              <motion.div
                key={tweet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Tweet tweet={tweet} formatarData={formatarData} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
        <div ref={loadingRef} className='h-20 flex items-center justify-center'>
          <AnimatePresence mode='wait'>
            {isLoading ? (
              <motion.div
                key='loading'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='loading-spinner'
              >
                Carregando mais tweets...
              </motion.div>
            ) : isWaiting ? (
              <motion.div
                key='waiting'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='text-gray-500'
              >
                Aguarde para carregar mais tweets...
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>
      <aside className='hidden md:block w-96 px-4 mt-4 '>
        <Aside />
      </aside>
    </div>
  );
};

export default App;
