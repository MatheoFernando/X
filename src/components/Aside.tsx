import { faker } from '@faker-js/faker';
import { DotsThree, MagnifyingGlass } from '@phosphor-icons/react';

function Aside() {
  return (
    <aside className=' text-white space-y-6 flex-1 hidden medium:block w-[280px] px-4 py-4'>
      <div className='relative'>
        <MagnifyingGlass
          size={16}
          className='absolute top-1/2 left-3 -translate-y-1/2 '
        />
        <input
          type='text'
          placeholder='Buscar'
          className='w-full py-2 pl-10 pr-4 rounded-full  text-sm border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          aria-label='Search'
        />
      </div>

      <div className='p-4 rounded-2xl  border border-gray-600 space-y-4'>
        <h2 className='font-bold text-xl mb-4'>Assine o Premium</h2>

        <p className='text-white font-normal text-sm'>
          Assine para desbloquear novos recursos e, se elegível, receba uma
          parte da receita.
        </p>

        <button className='rounded-full bg-blue-400 px-4 py-2 text-white font-semibold'>
          Inscrever-se
        </button>
      </div>

      <div className='p-4 rounded-2xl  border border-gray-600'>
        <h2 className='font-bold text-xl mb-4'>O que está acontecendo</h2>
        {[
          {
            title: 'Assunto do Momento em Angola',
            tag: '#Angola',
            posts: '4 mil posts',
          },
          {
            title: 'Assunto do Momento em Tecnologia',
            tag: '#DeepSeek',
            posts: '93,4 mil posts',
          },
        ].map((trend, index) => (
          <div
            key={index}
            className='flex justify-between items-start mb-4 last:mb-0'
          >
            <article>
              <h3 className='text-gray-400 font-medium text-sm'>
                {trend.title}
              </h3>
              <p className='text-white font-semibold text-base'>{trend.tag}</p>
              <p className='text-gray-400 font-medium text-xs'>{trend.posts}</p>
            </article>
            <DotsThree
              size={24}
              className='text-gray-400 cursor-pointer hover:text-gray-300'
            />
          </div>
        ))}
        <span className='text-blue-400 cursor-pointer'>Mostrar mais</span>
      </div>

      <div className='p-4 rounded-2xl  border border-gray-600'>
        <h2 className='font-bold text-xl mb-4'>Quem seguir</h2>
        {[
          {
            avatar: faker.image.avatar(),
            name: faker.person.fullName(),
            username: faker.internet.username(),
          },
          {
            avatar: faker.image.avatar(),
            name: faker.person.fullName(),
            username: faker.internet.username(),
          },
          {
            avatar: faker.image.avatar(),
            name: faker.person.fullName(),
            username: faker.internet.username(),
          },
        ].map((user, index) => (
          <div
            key={index}
            className='flex justify-between items-start mb-4 last:mb-0'
          >
            <article className='flex gap-3'>
              <img
                src={user.avatar}
                alt={user.name}
                className='w-10 h-10 rounded-full'
              />
              <div className='hidden lg:flex flex-col space-y-0'>
                <span className=' text-white font-semibold text-base'>
                  {user.name}
                </span>
                <span className='text-gray-100 text-sm'>@{user.username}</span>
              </div>
            </article>
            <button className='px-2 py-1 text-black text-sm font-semibold bg-white rounded-full'>
              Seguir
            </button>
          </div>
        ))}
        <span className='text-blue-400 cursor-pointer'>Mostrar mais</span>
      </div>
    </aside>
  );
}

export default Aside;
