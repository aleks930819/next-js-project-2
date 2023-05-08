import Link from 'next/link';

const Form = ({ type, post, setPost, submiting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1
        className="
      text-3xl font-bold text-left 
      mb-4
      "
      >
        <span className="text-blue-500">{type} Post</span>
      </h1>
      <p className="text-left max-w-md">
        {type} a post to share with your friends and family.{' '}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full max-w-md"
      >
        <label htmlFor="prompt" className="flex flex-col gap-1">
          <span
            className="text-left 
             font-satoshi font-semibold text-base text-gray-600
           "
          >
            Your AI Prompt
          </span>
          <textarea
            name="prompt"
            id="prompt"
            cols="30"
            rows="10"
            className="border border-gray-300 rounded-md p-2"
            value={post.prompt}
            placeholder="Enter your prompt here..."
            required
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          ></textarea>
        </label>
        <label htmlFor="prompt" className="flex flex-col gap-1">
          <span
            className="text-left 
             font-satoshi font-semibold text-base text-gray-600
           "
          >
            Tag {` `}
            <span>(#product, #webdevelopment, #idea, ect...)</span>
          </span>
          <input
            type="text"
            name="tag"
            id="tag"
            className="border border-gray-300 rounded-md p-2"
            value={post.tag}
            placeholder="Enter your tag here..."
            required
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
          ></input>
        </label>
        <div className="flex-end flex justify-between  mx-3 mb-5 mt-5 gap-4 text-center">
          <Link
            href="/"
            className="flex gap-2 flex-center justify-center   bg-red-400 text-white px-4 mg-4 rounded-md"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submiting}
            className="flex gap-2 flex-center justify-center   bg-green-400 text-white px-4 mg-4 rounded-md"
          >
            {submiting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
