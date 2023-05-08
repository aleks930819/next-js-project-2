import PromptCard from './PromptCard';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <span className="flex items-center justify-between w-full px-4 py-8 bg-gray-100 rounded-lg">
        <h1>{name} Profile</h1>
      </span>
      <p className="w-full h-12 px-3 mt-4 text-lg  focus:outline-none focus:border-blue-500">
        {desc}
      </p>
      <div className="flex flex-col items-center justify-center w-full h-full mt-8">
        {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => handleEdit && handleEdit(prompt)}
            handleDelete={() => handleDelete && handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
