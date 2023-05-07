function Store(props) {
  const {
    store
  } = props;

  return (
    <div>
      <div 
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <div
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          <div
            key={store.id} 
          >
            <a   
              href={`/stores/${store.slug}`} 
              className="group"
            >
              <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
              >
                <img
                  src={`/stores/${store.slug}.png`}
                  alt={store.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3
                className="mt-4 text-sm"
              >
                {store.name}
              </h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export async function getServerSideProps(ctx) {
  const store = require(`../../config/stores/${ctx.query.id}`)
  
  return { props: { store } };
}
 
export default Store;