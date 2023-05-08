import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="text-4xl font-bold text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span
          className="
          text-orange-500
          text-center
         "
        >
          AI-Powred Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Promptopio is an open source project AI prompting tool for modern world
        to discover, create and share prompts.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
