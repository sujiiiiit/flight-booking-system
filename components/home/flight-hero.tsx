export default function FlightHero() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-800">
      <div className=" relative z-10 flex h-full flex-col items-start justify-center px-4 text-white">
        <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Fly to your dreams with SkyWay
        </h1>
        <p className="mb-8 max-w-lg text-lg md:text-xl">
          Book your flights at the best prices and travel with comfort and ease
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1122462/pexels-photo-1122462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
    </div>
  );
}