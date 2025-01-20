


export const Box = ({ data }) => {
  return (
    <>

      {
        data.length > 0 ? (

          <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 p-2 mt-24">
            {data.map((product, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center border rounded-lg px-4 py-2 shadow-md bg-gray-50 hover:shadow-lg hover:-translate-y-2 duration-1000"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-auto w-auto object-cover mb-4 rounded-lg"
                />
                <p className="text-lg  text-gray-800">{product.name}</p>
                <p className="font-medium">{product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-semibold text-xl font-serif text-center flex items-center justify-center">
            Sorry! no data in our products list currently
          </p>
        )
      }
    </>
  );
};
