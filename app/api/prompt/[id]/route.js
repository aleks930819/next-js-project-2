import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.findById(params.id).populate('creator');

    if (!prompts) {
      return new Response(JSON.stringify({ error: 'Error fetching prompts' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: 'Error fetching prompts' }), {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response(JSON.stringify({ error: 'Prompt not found' }), {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: 'Error updating prompt' }), {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response(JSON.stringify({ error: 'Prompt not found' }), {
        status: 404,
      });
    }

    await existingPrompt.remove();

    return new Response(JSON.stringify({ message: 'Prompt deleted' }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: 'Error deleting prompt' }), {
      status: 500,
    });
  }
};
