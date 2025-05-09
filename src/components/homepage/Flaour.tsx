export default function FlavorExplorer() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="flex-grow border-t border-black/40"></div>
        <h2 className="text-4xl font-bold font-integral uppercase ">
          Explore Flavours
        </h2>
        <div className="flex-grow border-t border-black/40"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Bakery and Desserts Column */}
        <div className="flex flex-col transform transition-all duration-300 hover:scale-[1.02]">
          <div className="bg-black text-white py-4 text-center font-bold rounded-t-lg shadow-md">
            <h3 className="tracking-wider font-integral">BAKERY AND DESSERTS</h3>
          </div>
          <div className="bg-gray-100 h-72 overflow-y-auto rounded-b-lg shadow-md border border-gray-200 font-satoshi font-semibold">
            <ul className="divide-y divide-gray-300">
              {[
                "Apple pie",
                "Crumble",
                "Donut",
                "Fresh Tost",
                "Honey",
                "Ice cream",
              ].map((item, index) => (
                <li
                  key={index}
                  className="py-3 px-5 transition-all duration-200 hover:bg-white cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Berry Fruits Column */}
        <div className="flex flex-col transform transition-all duration-300 hover:scale-[1.02]">
          <div className="bg-black text-white py-4 text-center font-bold rounded-t-lg shadow-md">
            <h3 className="tracking-wider font-integral">BERRY FRUITS</h3>
          </div>
          <div className="bg-gray-100 h-72 overflow-y-auto rounded-b-lg shadow-md border border-gray-200 font-satoshi font-semibold">
            <ul className="divide-y divide-gray-300">
              {[
                "Akai",
                "Blueberry",
                "Blackberry",
                "Blackcurrent",
                "Cherry",
                "Strawberry",
              ].map((item, index) => (
                <li
                  key={index}
                  className="py-3 px-5 transition-all duration-200 hover:bg-white cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Other Fruits Column */}
        <div className="flex flex-col transform transition-all duration-300 hover:scale-[1.02]">
          <div className="bg-black text-white py-4 text-center font-bold rounded-t-lg shadow-md">
            <h3 className="tracking-wider font-integral">OTHER FRUITS</h3>
          </div>
          <div className="bg-gray-100 h-72 overflow-y-auto rounded-b-lg shadow-md border border-gray-200 font-satoshi font-semibold">
            <ul className="divide-y divide-gray-300">
              {[
                "Banana",
                "Apple",
                "Kiwi",
                "Grape",
                "Coconut",
                "Dragon Fruit",
              ].map((item, index) => (
                <li
                  key={index}
                  className="py-3 px-5 transition-all duration-200 hover:bg-white cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
