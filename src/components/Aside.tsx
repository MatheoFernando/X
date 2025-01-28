import { DotsThree, MagnifyingGlass } from "@phosphor-icons/react";

function Aside() {
  return (
    <aside className=" text-white">
      {/* Search Bar */}
      <div className="relative">
        <MagnifyingGlass size={20} className="absolute top-1/2 left-3 -translate-y-1/2 " />
        <input
          type="text"
          placeholder="Search"
          className="w-full py-2 pl-10 pr-4 rounded-full  text-sm border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search"
        />
      </div>

      {/* Trends Section */}
      <div className="mt-6 p-4 rounded-2xl  border border-gray-600">
        <h2 className="font-bold text-lg mb-4">Trends for you</h2>
        {[
          { title: "Stripe", posts: "4,377 posts" },
          { title: "Notion", posts: "23.7K posts" },
        ].map((trend, index) => (
          <div key={index} className="flex justify-between items-start mb-4 last:mb-0">
            <article>
              <p className="text-gray-400 text-xs">Trending</p>
              <h3 className="font-medium">{trend.title}</h3>
              <p className="text-gray-400 text-xs">{trend.posts}</p>
            </article>
            <DotsThree size={24} className="text-gray-400 cursor-pointer hover:text-gray-300" />
          </div>
        ))}
      </div>

       
      
    </aside>
  );
}

export default Aside;
